#!/usr/bin/env node
/**
 * Read one lead and print the fields this project cares about.
 * Usage: node scripts/zoho-lead.mjs <leadId>
 */
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const id = process.argv[2];
if (!id) {
  console.error('Usage: node scripts/zoho-lead.mjs <leadId>');
  process.exit(1);
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const env = new Map();
for (const line of readFileSync(resolve(root, '.env'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
  if (m) env.set(m[1], m[2]);
}

const tokenResponse = await fetch(`${env.get('ZOHO_ACCOUNTS_BASE')}/oauth/v2/token`, {
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
  console.error('token failed:', token.error);
  process.exit(1);
}

const response = await fetch(`${env.get('ZOHO_API_BASE')}/crm/v8/Leads/${id}`, {
  headers: { Authorization: `Zoho-oauthtoken ${token.access_token}` },
});
const body = await response.json();
if (!response.ok) {
  console.error('lead fetch failed:', response.status, body.code || body.message);
  process.exit(1);
}

const lead = body.data[0];
const fields = [
  'First_Name',
  'Last_Name',
  'Email',
  'Phone',
  'Company',
  'Lead_Source',
  'Lead_Form',
  'Whitepaper_Downloaded',
  'Whitepaper_Interest',
  'Description',
];

for (const field of fields) {
  console.log(`${field}: ${lead[field] ?? ''}`);
}
