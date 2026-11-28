/**
 * Shared client for the lead forms.
 * Handles reCAPTCHA v3, UTM capture, submit state and errors.
 * Each form supplies its own payload shape and success behaviour.
 */
import { LEAD_ENDPOINT, RECAPTCHA_SITE_KEY } from '../config/leads';

type Utm = { source: string; medium: string; campaign: string };

interface LeadFormOptions {
  buildPayload: (data: FormData) => Record<string, unknown>;
  onSuccess: (form: HTMLFormElement) => void;
}

let recaptchaLoader: Promise<void> | null = null;

function loadRecaptcha(siteKey: string): Promise<void> {
  if (recaptchaLoader) return recaptchaLoader;
  recaptchaLoader = new Promise<void>((resolve) => {
    if ((window as any).grecaptcha) return resolve();
    const script = document.createElement('script');
    script.id = 'recaptcha-v3';
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
  return recaptchaLoader;
}

async function getRecaptchaToken(siteKey: string): Promise<string> {
  if (!siteKey) return '';
  await loadRecaptcha(siteKey);
  const grecaptcha = (window as any).grecaptcha;
  if (!grecaptcha) return '';

  return new Promise<string>((resolve) => {
    grecaptcha.ready(() => {
      grecaptcha.execute(siteKey, { action: 'lead' }).then(resolve).catch(() => resolve(''));
    });
  });
}

function readUtm(): Utm {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {
    source: params.get('utm_source') || '',
    medium: params.get('utm_medium') || '',
    campaign: params.get('utm_campaign') || '',
  };

  try {
    if (fromUrl.source || fromUrl.medium || fromUrl.campaign) {
      sessionStorage.setItem('spatia_utm', JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem('spatia_utm');
    if (stored) return { ...fromUrl, ...(JSON.parse(stored) as Utm) };
  } catch {
    // private mode, ignore
  }
  return fromUrl;
}

function setStatus(form: HTMLFormElement, message: string, tone: 'error' | 'info') {
  const el = form.querySelector<HTMLElement>('[data-lead-status]');
  if (!el) return;
  el.textContent = message;
  el.classList.remove('hidden', 'text-red-600', 'text-sp-body/60');
  el.classList.add(tone === 'error' ? 'text-red-600' : 'text-sp-body/60');
}

export function initLeadForm(form: HTMLFormElement, options: LeadFormOptions) {
  const siteKey = RECAPTCHA_SITE_KEY;
  if (siteKey) void loadRecaptcha(siteKey);
  const utm = readUtm();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const status = form.querySelector<HTMLElement>('[data-lead-status]');
    if (status) {
      status.textContent = '';
      status.classList.add('hidden');
    }

    const data = new FormData(form);

    // Honeypot. Pretend it worked and send nothing.
    if (String(data.get('website') || '').trim() !== '') {
      options.onSuccess(form);
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const label = form.querySelector<HTMLElement>('[data-lead-button-label]');
    const originalLabel = label?.textContent || '';

    if (button) button.disabled = true;
    if (label) label.textContent = 'Sending...';
    setStatus(form, 'Sending your details...', 'info');

    try {
      const recaptchaToken = await getRecaptchaToken(siteKey);

      const response = await fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...options.buildPayload(data),
          utm,
          recaptchaToken,
          website: data.get('website'),
        }),
      });

      const result = await response.json().catch(() => ({ ok: false }));

      if (!response.ok || !result.ok) {
        const message =
          result.error === 'captcha_low_score' || result.error === 'captcha_failed'
            ? 'We could not verify that this is a human submission. Please try again, or email people@spatia.sg.'
            : 'Something went wrong. Please try again, or email people@spatia.sg.';
        setStatus(form, message, 'error');
        if (button) button.disabled = false;
        if (label) label.textContent = originalLabel;
        return;
      }

      options.onSuccess(form);
    } catch {
      setStatus(
        form,
        'Could not reach the server. Check your connection, or email people@spatia.sg.',
        'error',
      );
      if (button) button.disabled = false;
      if (label) label.textContent = originalLabel;
    }
  });
}
