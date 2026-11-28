# SEO, AEO and GEO setup

## What the site now generates

- `/sitemap-index.xml` and the sitemap files, from `@astrojs/sitemap`.
- `/robots.txt`, allowing search engines and the main AI crawlers, with the sitemap reference.
- `/llms.txt`, with the approved company facts, key definitions and key pages.
- `/404.html`, with `noindex`.
- `Organization` and `WebSite` JSON-LD on every page.
- `Organization.knowsAbout` for the core topics.
- `BreadcrumbList` and `dateModified` on blog posts.
- `FAQPage` JSON-LD on `/contact`, `/technology`, `/experience-centre` and `/guides/picking-cell`.
- `DefinedTermSet` JSON-LD on `/glossary`.
- `TechArticle` JSON-LD on `/guides/picking-cell`.
- `TechArticle` and `BreadcrumbList` JSON-LD on the whitepaper landing page.
- One `H1` on the home page.
- An answer-first "In short" block on the home page.

## Content map

| Page | AEO / GEO job |
|---|---|
| `/` | Answer-first summary: what Spatia is, who it is for, how it works, where to see it |
| `/technology` | Technical FAQ with FAQPage schema |
| `/experience-centre` | Visit FAQ with FAQPage schema |
| `/glossary` | Quotable definitions with DefinedTermSet schema |
| `/guides/picking-cell` | Buyer guide with comparison tables, FAQPage and TechArticle schema |
| `/whitepaper/vision-guided-robotic-quality-inspection` | Gated whitepaper landing page with TechArticle and BreadcrumbList schema |
| `/blog/your-robot-can-pick-can-it-finish-the-job` | Field note with Article, BreadcrumbList and dateModified |
| `/llms.txt` | Approved facts, key definitions and canonical links for AI crawlers |

## One server change is required

The site currently returns the home page with HTTP 200 for missing paths, including `/robots.txt`, `/sitemap.xml` and `/llms.txt` before these files existed. That is a soft 404 and it wastes crawl budget.

In the nginx server block that serves `/var/www/spatia-v2`, replace the SPA fallback with:

```nginx
location / {
    try_files $uri $uri/ =404;
}

error_page 404 /404.html;

location = /404.html {
    internal;
}
```

Then:

```sh
sudo nginx -t
sudo systemctl reload nginx
```

Check after the deploy:

```sh
curl -I https://www.spatia.sg/robots.txt
curl -I https://www.spatia.sg/sitemap-index.xml
curl -I https://www.spatia.sg/llms.txt
curl -I https://www.spatia.sg/this-page-does-not-exist
```

Expected: `text/plain`, `application/xml`, `text/plain`, and `404` for the missing page.

## Accounts and measurement

- Google Search Console: verify the domain with DNS, then submit `https://www.spatia.sg/sitemap-index.xml`.
- Bing Webmaster Tools: import the site from Search Console.
- Analytics: add GA4, Plausible or Umami. Track referrals from `chatgpt.com`, `perplexity.ai`, `gemini.google.com` and `copilot.microsoft.com`.
- Monthly check: branded queries, pages with impressions but low clicks, AI citations, and inbound leads.

## Maintenance

- Update `public/llms.txt` when the approved facts change. Keep the same facts as the claims file.
- New pages are picked up by the sitemap automatically.
- Keep the nginx 404 rule. Without it, missing paths return the home page with 200.
- Keep one `H1` per page.
- Add `FAQPage` markup to any page that gains a real FAQ section.

## What is not done yet

- Organization `sameAs` covers LinkedIn, Instagram and YouTube. Add other profiles as they become canonical.
- No author byline on the older blog posts. Add one only where authorship is confirmed.
- No analytics IDs or Search Console verification in the code yet.
- More comparison pages, case studies and original data will strengthen GEO further.
