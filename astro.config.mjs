import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.spatia.sg',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/index-1') &&
        !page.includes('/whitepaper/thank-you'),
    }),
  ],
});
