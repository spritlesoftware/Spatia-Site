/**
 * Lead capture configuration.
 *
 * The endpoint is the Cloudflare Worker in /workers/lead.
 * In `astro dev` it points at the local wrangler dev server.
 */
export const LEAD_ENDPOINT = import.meta.env.DEV
  ? 'http://127.0.0.1:8787/api/lead'
  : 'https://spatia-lead.spatia-leads.workers.dev/api/lead';

/**
 * Public reCAPTCHA v3 site key for spatia.sg.
 * Safe to commit. The secret lives only in Cloudflare Worker secrets.
 */
export const RECAPTCHA_SITE_KEY = '6LdQnTUuAAAAABgA_sXaOF85yrK5R9fs6OpLK_nv';

export const WHITEPAPER = {
  title: 'Vision-guided robotic quality inspection: from a picture to a decision',
  slug: 'vision-guided-robotic-quality-inspection',
  pdf: '/downloads/spatia-vision-guided-robotic-quality-inspection.pdf',
  pdfUrl:
    'https://www.spatia.sg/downloads/spatia-vision-guided-robotic-quality-inspection.pdf',
} as const;
