#!/usr/bin/env node
/**
 * Read-only Zoho probe.
 * Mints an access token from the refresh token in .env, then reports:
 *   - Leads fields and Lead Source picklist values
 *   - Zoho Mail accounts (sender identity)
 * Nothing secret is printed.
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const env = new Map();
for (const line of readFileSync(resolve(root, '.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m) env.set(m[1], m[2]);
}

const accountsBase = env.get('ZOHO_ACCOUNTS_BASE');
const apiBase = env.get('ZOHO_API_BASE');
const mailBase = accountsBase.replace('accounts.', 'mail.');

const tokenResponse = await fetch(`${accountsBase}/oauth/v2/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: env.get('ZOHO_CLIENT_ID'),
    client_secret: env.get('ZOHO_CLIENT_SECRET'),
    refresh_token: env.get('ZOHO_REFRESH_TOKEN'),
  }),
});
const token = await tokenResponse.json();

if (!token.access_token) {
  console.error('Could not mint an access token:', token.error || tokenResponse.status);
  process.exit(1);
}

const auth = { Authorization: `Zoho-oauthtoken ${token.access_token}` };
console.log('Access token OK, expires in', token.expires_in, 'seconds\n');

const fieldsResponse = await fetch(`${apiBase}/crm/v8/settings/fields?module=Leads`, { headers: auth });
const fieldsBody = await fieldsResponse.json();

if (!fieldsResponse.ok) {
  console.error('CRM fields call failed:', fieldsResponse.status, fieldsBody.code || fieldsBody.message);
} else {
  const fields = fieldsBody.fields || [];
  console.log(`Leads fields: ${fields.length} total`);

  const wanted = ['First_Name', 'Last_Name', 'Email', 'Phone', 'Company', 'Description', 'Lead_Source', 'Lead_Status'];
  console.log('\nStandard fields in use:');
  for (const field of fields) {
    if (wanted.includes(field.api_name)) {
      console.log(`  ${field.field_label} | ${field.api_name} | ${field.data_type}`);
    }
  }

  const extra = fields.filter((f) => /whitepaper|utm|lead_form/i.test(`${f.api_name} ${f.field_label}`));
  console.log('\nCustom fields matching whitepaper/utm/lead_form:', extra.length ? '' : 'none');
  for (const field of extra) console.log(`  ${field.field_label} | ${field.api_name} | ${field.data_type}`);

  for (const name of ['Lead_Source', 'Lead_Form', 'Lead_Status']) {
    const field = fields.find((f) => f.api_name === name);
    if (!field) continue;
    console.log(`\n${field.field_label} values:`);
    for (const value of field.pick_list_values || []) console.log(`  - ${value.display_value}`);
  }
}

const mailResponse = await fetch(`${mailBase}/api/accounts`, { headers: auth });
const mailBody = await mailResponse.json();

console.log('\nZoho Mail:');
if (!mailResponse.ok) {
  console.error('  accounts call failed:', mailResponse.status, mailBody.code || mailBody.message);
} else {
  for (const account of mailBody.data || []) {
    console.log(`  accountId ${account.accountId} | ${account.primaryEmailAddress} | ${account.accountName || ''}`);
  }
}
