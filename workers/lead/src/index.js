/**
 * Spatia lead endpoint.
 *
 * POST /api/lead
 * Body: {
 *   form: "whitepaper" | "contact",
 *   firstName, lastName, email, phone, company, message,
 *   utm: { source, medium, campaign },
 *   recaptchaToken,
 *   website   // honeypot, must stay empty
 * }
 *
 * Flow: reCAPTCHA, find lead by email, create or update, then email the team
 * and (for the whitepaper) the visitor from people@spatia.sg.
 */

const LIMITS = {
  name: 80,
  email: 254,
  company: 200,
  phone: 40,
  message: 5000,
  utm: 200,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

let cachedToken = null;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('Origin') || '';
    const cors = corsHeaders(origin, env);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, cors);
    }

    if (url.pathname !== '/api/lead' && url.pathname !== '/') {
      return json({ ok: false, error: 'not_found' }, 404, cors);
    }

    if (origin && !isAllowedOrigin(origin, env)) {
      return json({ ok: false, error: 'origin_not_allowed' }, 403, cors);
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ ok: false, error: 'invalid_json' }, 400, cors);
    }

    // Honeypot. Bots fill it, humans never see it. Pretend it worked.
    if (typeof payload.website === 'string' && payload.website.trim() !== '') {
      return json({ ok: true, id: null, created: false, emailSent: false }, 200, cors);
    }

    const parsed = parseLead(payload);
    if (!parsed.ok) {
      return json({ ok: false, error: parsed.error, field: parsed.field }, 400, cors);
    }
    const lead = parsed.value;

    const captcha = await verifyRecaptcha(env, payload.recaptchaToken, request.headers.get('CF-Connecting-IP'));
    if (!captcha.ok) {
      return json({ ok: false, error: captcha.reason }, captcha.status, cors);
    }

    try {
      const { id, action } = await upsertLead(env, buildLeadRecord(env, lead));
      const created = action === 'insert';

      if (created) {
        await updateLead(env, id, {
          Lead_Source: lead.leadSource,
          Description: descriptionFor(lead, null),
        });
      } else {
        const existing = await getLead(env, id);
        await updateLead(env, id, {
          Description: descriptionFor(lead, existing.Description),
        });
      }

      const emails = { team: false, visitor: false };
      emails.team = await sendEmail(env, {
        to: env.TEAM_EMAIL,
        subject: `New Spatia lead: ${lead.formLabel} - ${lead.company}`,
        html: teamEmail(lead, id),
      });

      if (lead.form === 'whitepaper') {
        emails.visitor = await sendEmail(env, {
          to: lead.email,
          subject: 'Your copy: Vision-guided robotic quality inspection',
          html: visitorEmail(lead.firstName, env.PDF_URL),
        });
      }

      return json({ ok: true, id, created, emailSent: emails }, 200, cors);
    } catch (error) {
      console.error('lead_failed', String(error && error.message ? error.message : error));
      return json({ ok: false, error: 'lead_failed' }, 502, cors);
    }
  },
};

/* ------------------------------------------------------------------ */
/* Validation                                                         */
/* ------------------------------------------------------------------ */

function parseLead(payload) {
  const form = payload.form === 'whitepaper' || payload.form === 'contact' ? payload.form : null;
  if (!form) return { ok: false, error: 'invalid_form', field: 'form' };

  const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

  const firstName = clean(payload.firstName, LIMITS.name);
  const lastName = clean(payload.lastName, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const phone = clean(payload.phone, LIMITS.phone);
  const company = clean(payload.company, LIMITS.company);
  const message = clean(payload.message, LIMITS.message);

  const utm = {
    source: clean(payload.utm && payload.utm.source, LIMITS.utm),
    medium: clean(payload.utm && payload.utm.medium, LIMITS.utm),
    campaign: clean(payload.utm && payload.utm.campaign, LIMITS.utm),
  };

  if (!firstName) return { ok: false, error: 'first_name_required', field: 'firstName' };
  if (!lastName) return { ok: false, error: 'last_name_required', field: 'lastName' };
  if (!email) return { ok: false, error: 'email_required', field: 'email' };
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'email_invalid', field: 'email' };
  if (!company) return { ok: false, error: 'company_required', field: 'company' };
  if (form === 'contact' && !message) return { ok: false, error: 'message_required', field: 'message' };

  return {
    ok: true,
    value: {
      form,
      formLabel: form === 'whitepaper' ? 'Whitepaper download' : 'Contact enquiry',
      leadSource: form === 'whitepaper' ? 'Website - Whitepaper' : 'Website - Contact',
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
      utm,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Zoho CRM                                                           */
/* ------------------------------------------------------------------ */

async function getAccessToken(env, force = false) {
  if (!force && cachedToken && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.value;
  }

  const response = await fetch(`${env.ZOHO_ACCOUNTS_BASE}/oauth/v2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: env.ZOHO_CLIENT_ID,
      client_secret: env.ZOHO_CLIENT_SECRET,
      refresh_token: env.ZOHO_REFRESH_TOKEN,
    }),
  });

  const data = await response.json();
  if (!data.access_token) {
    throw new Error(`zoho_token:${data.error || response.status}`);
  }

  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.value;
}

async function zohoFetch(env, path, init = {}, retry = true) {
  const token = await getAccessToken(env);
  const response = await fetch(`${env.ZOHO_API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: `Zoho-oauthtoken ${token}`,
    },
  });

  if (response.status === 401 && retry) {
    cachedToken = null;
    await getAccessToken(env, true);
    return zohoFetch(env, path, init, false);
  }

  return response;
}

async function upsertLead(env, record) {
  const response = await zohoFetch(env, '/crm/v8/Leads/upsert', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [record], duplicate_check_fields: ['Email'] }),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const code = data && data.data && data.data[0] && data.data[0].code;
    throw new Error(`zoho_upsert:${response.status}:${code || (data && data.code) || ''}`);
  }

  const row = data.data[0];
  return { id: row.details.id, action: row.action };
}

async function getLead(env, id) {
  const response = await zohoFetch(env, `/crm/v8/Leads/${id}`);
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(`zoho_get:${response.status}`);
  return data.data[0];
}

async function updateLead(env, id, record) {
  const response = await zohoFetch(env, `/crm/v8/Leads/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: [record] }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const code = data && data.data && data.data[0] && data.data[0].code;
    throw new Error(`zoho_update:${response.status}:${code || (data && data.code) || ''}`);
  }
}

function buildLeadRecord(env, lead) {
  const record = {
    First_Name: lead.firstName,
    Last_Name: lead.lastName,
    Email: lead.email,
    Company: lead.company,
    Lead_Form: lead.formLabel,
  };

  if (lead.phone) record.Phone = lead.phone;

  if (lead.form === 'whitepaper') {
    if (lead.message) record.Whitepaper_Interest = lead.message;
    record.Whitepaper_Downloaded = env.WHITEPAPER_TITLE;
  }

  return record;
}

function descriptionFor(lead, previous) {
  const lines = [
    `Form: ${lead.formLabel}`,
    `Received: ${new Date().toISOString().slice(0, 10)}`,
  ];

  if (lead.message) lines.push(`Message: ${lead.message}`);

  const utm = [
    lead.utm.source && `source=${lead.utm.source}`,
    lead.utm.medium && `medium=${lead.utm.medium}`,
    lead.utm.campaign && `campaign=${lead.utm.campaign}`,
  ].filter(Boolean);
  if (utm.length) lines.push(`UTM: ${utm.join('; ')}`);

  const block = lines.join('\n');
  if (!previous) return block;
  return `${previous}\n\n---\n${block}`;
}

/* ------------------------------------------------------------------ */
/* Zoho Mail                                                          */
/* ------------------------------------------------------------------ */

async function sendEmail(env, { to, subject, html }) {
  try {
    const token = await getAccessToken(env);
    const response = await fetch(
      `${env.ZOHO_MAIL_BASE}/api/accounts/${env.ZOHO_MAIL_ACCOUNT_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fromAddress: env.FROM_EMAIL,
          toAddress: to,
          subject,
          content: html,
          mailFormat: 'html',
        }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error('mail_failed', response.status, text.slice(0, 300));
      return false;
    }
    return true;
  } catch (error) {
    console.error('mail_error', String(error && error.message ? error.message : error));
    return false;
  }
}

function teamEmail(lead, id) {
  const rows = [
    ['Name', `${lead.firstName} ${lead.lastName}`],
    ['Email', lead.email],
    ['Phone', lead.phone || '-'],
    ['Company', lead.company],
    ['Form', lead.formLabel],
    ['Lead Source', lead.leadSource],
    ['Message', lead.message || '-'],
    ['UTM', [lead.utm.source, lead.utm.medium, lead.utm.campaign].filter(Boolean).join(' / ') || '-'],
    ['Lead ID', id],
  ];

  return `
    <h2 style="font-family:Geist,Arial,sans-serif;color:#0E1114;">New Spatia lead: ${escapeHtml(lead.formLabel)}</h2>
    <table style="font-family:Geist,Arial,sans-serif;font-size:14px;border-collapse:collapse;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:6px 12px 6px 0;color:#667;vertical-align:top;">${escapeHtml(
              label,
            )}</td><td style="padding:6px 0;">${escapeHtml(String(value))}</td></tr>`,
        )
        .join('')}
    </table>
  `;
}

function visitorEmail(firstName, pdfUrl) {
  return `
    <div style="font-family:Geist,Arial,sans-serif;font-size:15px;line-height:1.6;color:#0E1114;">
      <p>Hi ${escapeHtml(firstName)}</p>
      <p>Thank you for downloading "Vision-guided robotic quality inspection: from a picture to a decision".</p>
      <p>Here is your copy: <a href="${pdfUrl}">${pdfUrl}</a></p>
      <p>If you have a use case on your shop floor, kindly reply to this email.<br>Happy to have a short call.</p>
      <p>Thank you.</p>
      <p>Balaji<br>Founder, Spatia<br><a href="https://www.spatia.sg">www.spatia.sg</a></p>
    </div>
  `;
}

/* ------------------------------------------------------------------ */
/* reCAPTCHA                                                          */
/* ------------------------------------------------------------------ */

async function verifyRecaptcha(env, token, ip) {
  if (!env.RECAPTCHA_SECRET_KEY) {
    if (env.ALLOW_UNVERIFIED_RECAPTCHA === 'true') return { ok: true };
    return { ok: false, reason: 'captcha_not_configured', status: 500 };
  }

  if (!token || typeof token !== 'string') {
    return { ok: false, reason: 'captcha_missing', status: 400 };
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.RECAPTCHA_SECRET_KEY,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });

  const data = await response.json().catch(() => null);
  if (!data || !data.success) {
    console.error('recaptcha_rejected', JSON.stringify(data));
    return { ok: false, reason: 'captcha_failed', status: 403 };
  }
  if (typeof data.score === 'number' && data.score < 0.5) {
    return { ok: false, reason: 'captcha_low_score', status: 403 };
  }
  if (data.action && data.action !== 'lead') {
    return { ok: false, reason: 'captcha_action_mismatch', status: 403 };
  }
  return { ok: true, score: data.score };
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

function isAllowedOrigin(origin, env) {
  const allowed = String(env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
  return allowed.includes(origin);
}

function corsHeaders(origin, env) {
  const fallback = String(env.ALLOWED_ORIGINS || '').split(',')[0].trim();
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin(origin, env) ? origin : fallback,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function json(body, status, cors) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
