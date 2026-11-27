#!/usr/bin/env node
/**
 * One-time Self Client exchange.
 *
 * Reads .env, posts the grant code to Zoho Accounts, and writes the refresh
 * token back into .env. Nothing secret is printed.
 *
 * Usage:
 *   1. Fill ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET and ZOHO_GRANT_CODE in .env
 *   2. npm run zoho:auth
 *
 * The grant code is single use and expires in 10 minutes.
 */
import { readFileSync, writeFileSync, chmodSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envPath = resolve(root, '.env');

const HINTS = {
  invalid_code: 'The grant code is expired or already used. Generate a new one.',
  invalid_client: 'Client ID or Client Secret is wrong. Check both in the Self Client tab.',
  invalid_client_secret: 'Client Secret is wrong. Copy it again from the Self Client tab.',
  invalid_scope: 'One of the scopes is not valid for this client. Tell me which one Zoho names.',
  invalid_redirect_uri: 'This client is not a Self Client. Recreate it as Self Client.',
};

function readEnv(text) {
  const map = new Map();
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (match) map.set(match[1], match[2]);
  }
  return map;
}

function setEnv(text, key, value) {
  const pattern = new RegExp(`^\\s*${key}\\s*=.*$`, 'm');
  if (pattern.test(text)) return text.replace(pattern, `${key}=${value}`);
  return `${text.replace(/\s*$/, '')}\n${key}=${value}\n`;
}

function fail(message, details) {
  console.error(`\n✗ ${message}`);
  if (details) console.error(`  ${details}`);
  process.exit(1);
}

const raw = readFileSync(envPath, 'utf8');
const env = readEnv(raw);

const clientId = (env.get('ZOHO_CLIENT_ID') || '').trim();
const clientSecret = (env.get('ZOHO_CLIENT_SECRET') || '').trim();
const grantCode = (env.get('ZOHO_GRANT_CODE') || '').trim();
const accountsBase = (env.get('ZOHO_ACCOUNTS_BASE') || 'https://accounts.zoho.in').trim();

if (!clientId) fail('ZOHO_CLIENT_ID is empty in .env');
if (!clientSecret) fail('ZOHO_CLIENT_SECRET is empty in .env');
if (!grantCode) fail('ZOHO_GRANT_CODE is empty in .env');

console.log('Exchanging grant code with', accountsBase);

const response = await fetch(`${accountsBase}/oauth/v2/token`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: grantCode,
  }),
});

let data;
try {
  data = await response.json();
} catch {
  fail(`Zoho returned HTTP ${response.status} with a non-JSON body.`);
}

if (data.error) {
  fail(`Zoho refused the exchange: ${data.error}`, HINTS[data.error]);
}

if (!data.refresh_token) {
  fail('No refresh token in the response. Zoho returns one only on the first consent.');
}

let updated = raw;
updated = setEnv(updated, 'ZOHO_REFRESH_TOKEN', data.refresh_token);
updated = setEnv(updated, 'ZOHO_GRANT_CODE', '');
if (data.scope) updated = setEnv(updated, 'ZOHO_SCOPES', data.scope);
if (data.api_domain) updated = setEnv(updated, 'ZOHO_API_DOMAIN', data.api_domain);

writeFileSync(envPath, updated, { mode: 0o600 });
chmodSync(envPath, 0o600);

console.log('\n✓ Refresh token saved to .env and the grant code cleared.');
if (data.scope) console.log('  Scopes granted:', data.scope);
if (data.api_domain) console.log('  API domain:', data.api_domain);
console.log('  Next: check the scopes above include CRM leads and Zoho Mail.');
