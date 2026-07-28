# SEO & indexing — manapple.dev

Notes on making the site discoverable on Google. Everything technical is already
in the codebase; the items below need a human (they touch Google's console and
external profiles).

## What was already done (in the code)

- The site is **Astro static (SSG)** — the served HTML already contains the real
  text, so Google can index it without running JS. (This was *not* the problem.)
- Dedicated, indexable pages: **`/warren`** and **`/gollum`** with real prose.
- Per-page `title`, `description`, `canonical`, Open Graph and Twitter cards.
- JSON-LD: `Person` on the home page, `SoftwareApplication` on project pages.
- **`sitemap-index.xml`** generated at build (`@astrojs/sitemap`).
- **`robots.txt`** allowing crawl and pointing at the sitemap.
- OG share images at `public/og/*.png` (regenerate with `node scripts/gen-og.mjs`).

> Note on robots.txt: Cloudflare injects a "Managed content" block into the served
> robots.txt. Googlebot (search) is allowed; only AI-training bots are blocked.
> Our own `Sitemap:` line and `Allow: /` are still served.

## 1. Google Search Console (do this first)

1. Go to <https://search.google.com/search-console> and **Add property**.
2. Choose the **Domain** property type and enter `manapple.dev` (this covers
   `www`, `warren.`, `gollum.` and every subdomain in one shot).
3. Google gives you a **DNS TXT record** to add (looks like
   `google-site-verification=XXturbo...`).
   - Easiest: paste the value here and I'll add the TXT record to Cloudflare for
     you (the DNS automation token is already on the box), then you click Verify.
   - Or add it yourself in Cloudflare DNS: TXT, name `@`, content = the value.
4. Once verified:
   - **Sitemaps** → submit `sitemap-index.xml`.
   - **URL Inspection** → paste `https://manapple.dev/`, then `/warren`, then
     `/gollum` → **Request indexing** for each.
   - Use **URL Inspection → View crawled page / rendered HTML** to confirm Google
     sees the real content (it will — the pages are static).

> Alternative verification if you don't want DNS: add the meta tag Google gives
> you into `src/layouts/Layout.astro` `<head>`, or drop their HTML file into
> `public/`. DNS (domain property) is preferred because it also covers the app
> subdomains.

## 2. Backlinks — the big lever for a new domain (free)

A new domain with zero inbound links barely gets crawled. Create these:

- [ ] **LinkedIn** → Profile → *Contact info* → **Website** = `https://manapple.dev`.
- [ ] **LinkedIn post** introducing the portfolio, linking `manapple.dev`
      (and one follow-up post per project linking `/warren` and `/gollum`).
- [ ] **GitHub profile** (`github.com/chriss1245`) → set the **website** field to
      `https://manapple.dev`, and mention it in the profile README.
- [ ] If you write a technical post (dev.to / Hashnode / Medium), link back to the
      relevant project page.
- [ ] Any hackathon / community / CV/resume PDF: use the `manapple.dev` URL.

## 3. Cross-linking web ↔ GitHub

The project pages currently link to the live apps and the blog write-ups. If the
project repos are **public**, add "Source" links:

- [ ] Confirm which repos are public (e.g. `chriss1245/manapple-gollum`).
- [ ] Add each public repo URL to `src/data/projects.ts` (add a `repo` field and a
      "Source" button on the detail page).
- [ ] In each repo's README, add a link back to `https://manapple.dev/<project>`.

Don't add repo links for private repos (they'd 404 for visitors).

## Verifying after deploy

```bash
curl -s https://manapple.dev/warren   | grep -o '<title>[^<]*</title>'
curl -s https://manapple.dev/robots.txt
curl -s https://manapple.dev/sitemap-index.xml
```
