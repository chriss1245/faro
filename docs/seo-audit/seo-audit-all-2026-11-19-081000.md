# SEO Audit Report

**Project:** faro (manapple.dev)
**Framework:** Astro 6.4.6 (static, Tailwind v4, @astrojs/sitemap), nginx image, Coolify
**Audit Date:** 2026-11-19T08:10:00+01:00
**Auditor:** ai-seo plugin 2.2.0 (skill files from charlesjones-dev/claude-code-plugins-dev @1d959c6)
**Lenses:** SEO, AEO, GEO
**Knowledge Source:** LLM Training Data (fallback). Context7 MCP was not available in this session, so library guidance comes from model knowledge and may lag current docs.
**Scope:** Entire solution (`src/`, `public/`, `nginx.conf`, built `dist/`)
**Live Check:** https://manapple.dev (read-only: robots.txt, sitemap, status codes, AI user agents)
**Web Search:** Not run (offered; skipped to keep the audit read-only and off the owner's brand data)
**Settings:** lenses=all (argument), live URL (user-approved), search=no (default), commit=yes (user asked to keep reports in docs/seo-audit/)

---

## Scores

| Lens | Measures | Score | Grade | Trend | Critical | High | Medium | Low |
|------|----------|-------|-------|-------|----------|------|--------|-----|
| SEO | Search Health | 95/100 | A | first run | 0 | 0 | 5 | 9 |
| AEO | Answer Readiness | 99/100 | A+ | first run | 0 | 0 | 2 | 3 |
| GEO | Citation Readiness | 96/100 | A | first run | 0 | 0 | 4 | 7 |

Each lens is scored on its own. There is no combined score.

**Summary:** The site is a healthy static build: real text in the initial HTML, canonical + hreflang (en/es) on every page, Person/Thesis/SoftwareSourceCode/Service/FAQPage JSON-LD, a clean robots.txt that lets every crawler in, and a thesis page that carries the DOI three times. The biggest gap for being cited is on the writing posts: no `BlogPosting` markup, no byline, no `dateModified`. The scroll-reveal change (commit 70cd4e2) was triaged first. It was mostly a capture artifact, but print output and non-scrolling renderers did hide content; that is fixed in commit 42bfdbd and this audit scores the fixed code.

### Top Critical Issues

None found. Highest-impact items (all Medium): **SEO-1** no `BlogPosting` JSON-LD on posts, **GEO-1** no visible author byline or author markup on posts, **GEO-2** no `dateModified` anywhere (sitemap has no `lastmod`), **SEO-2** no security/cache headers in `nginx.conf`.

---

## SEO: Search Health

### Executive Summary

Overall 95/100 (A). No deprecated tags (`meta keywords`, `rel=prev/next`, `<font>`, `<center>` all absent), one H1 per page, canonical on every indexable page, 0 images without alt. Lighthouse (local, mobile, baseline before design work): SEO 100 on all four sampled pages, accessibility 100/100/94/100, best-practices 100.

#### Score Breakdown

| Category | Score | Weight |
|----------|-------|--------|
| Deprecated Patterns | 100 | 20% |
| Modern Meta Tags | 91 | 15% |
| Semantic HTML | 98 | 10% |
| Structured Data | 91 | 15% |
| Performance Signals | 93 | 15% |
| Accessibility | 95 | 10% |
| URL Structure | 100 | 5% |
| Security Headers | 93 | 5% |
| Framework Best Practices | 98 | 5% |

#### Issue Counts

Critical 0 · High 0 · Medium 5 · Low 9

### 🔴 Critical Issues
None found.

### 🟠 High Priority Issues
None found.

### 🟡 Medium Priority Issues

- **SEO-1 Posts have no structured data** (`src/pages/writing/[...slug].astro`). No `BlogPosting` (headline, datePublished, author, image) and no `BreadcrumbList`. Fix: emit `BlogPosting` from the content frontmatter (`title`, `description`, `date`) with the already-known site Person as author.
- **SEO-2 No security or cache headers at the origin** (`nginx.conf`). No `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame protection, or HTML `Cache-Control`. Only `/_astro/` is cached. Fix: add the safe headers (no CSP yet, see SEO-9).
- **SEO-3 Over-long titles** — `/writing/mobile-first/` title is 102 characters, `/writing/warren-the-67-percent-bug/` 91, `/gollum` es 83, `/writing/warren-investment-analyst/` 80. Google truncates around 60. Fix: shorten the page title, keep the long form as H1.
- **SEO-4 Accessibility 94 on /services** (Lighthouse). Check the failing audit (likely contrast or link names) in the design pass.
- **SEO-5 Home mobile performance 58 in the baseline run** (TBT ~5 s, LCP 3.0 s). The run served uncompressed files from a Python server on a loaded host, so treat it as a ceiling, not a real score. Re-measure with a gzip-capable server before and after the design pass.

### 🔵 Suggestions & Nice-to-Haves (Low)

- **SEO-6** `/writing` index descriptions are 46 and 53 characters; `building-faro` is 75. Lengthen toward 110-155.
- **SEO-7** Stale `theme-color` pair (`#f8f6fb` / `#08080c`, `Layout.astro:94-95`); light is the default theme and the two values follow the OS setting, not the site theme. Align with the current tokens.
- **SEO-8** No RSS/Atom feed or `<link rel="alternate">` for `/writing`.
- **SEO-9** No `Content-Security-Policy`. Needs a nonce/hash plan for the inline scripts first; do not add blindly.
- **SEO-10** Post dates render as plain text, not `<time datetime>`.
- **SEO-11** No `ProfilePage`/`Person` markup on `/cv`.
- **SEO-12** `/writing` and `/cv` lack `BreadcrumbList`.
- **SEO-13** `public/demos/` ships into `dist/` with no canonical, no description and no sitemap entry. Owner said to leave it untouched; noting only that it is crawlable (robots allows everything). Add `noindex` there if it should not rank.
- **SEO-14** `last-modified` on the live home page reads 2026-09-25, so the live deploy is older than main; the poller deploys on push.

### ✅ What's Working Well

Static HTML with full prose; en (unprefixed) + es (`/es/`) with 4 hreflang links (incl. `x-default`) on core pages; canonical on every page; OG + Twitter cards with page-specific OG images; sitemap-index with 22 URLs; 404 returns a real 404; preloaded WOFF2 fonts, no external font host; mobile viewport; Lighthouse SEO 100 across the sampled pages.

### 🏗️ Framework-Specific Recommendations

Astro: use `Astro.site` + content collection data to build the `BlogPosting` and sitemap `lastmod` (the `@astrojs/sitemap` `serialize` hook can set `lastmod` from the frontmatter date). nginx: a small `add_header ... always;` block at server level, remembering that `add_header` inside a `location` replaces the inherited ones (`/_astro/` already has its own).

### 📊 Core Web Vitals Considerations

Baseline (Lighthouse mobile, local): home LCP 3.0 s, CLS 0; academia LCP 3.5 s; services LCP 2.3 s; post LCP 3.0 s. CLS is 0 everywhere. Entrance motion is opacity/transform only, so it does not shift layout.

### Resources
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://developers.google.com/search/docs/appearance/title-link
- https://web.dev/articles/vitals

### Limitations
Lighthouse ran against a local static server, not production behind Cloudflare. No Search Console data. Context7 unavailable.

---

## AEO: Answer Readiness

### Executive Summary

99/100 (A+). Answer pages are `/services` (visible "Questions people ask first" FAQ with FAQPage JSON-LD), `/academia` (thesis abstract, DOI), and the writing posts. Content is in the initial HTML. Content hidden behind the scroll-reveal is now forced visible in print and after 6 s for non-scrolling renderers (commit 42bfdbd); without JS and with reduced motion nothing is hidden.

| Category | Score | Weight |
|----------|-------|--------|
| Answer-First Formatting | 95 | 20% |
| Question Coverage & Headings | 98 | 15% |
| Concise Definitions | 98 | 10% |
| Snippet-Ready Structure | 100 | 15% |
| Snippet Eligibility & Indexing Controls | 100 | 15% |
| FAQ Sections & Structured Data | 95 | 10% |
| Voice & Assistant Readiness | 100 (nothing local to check) | 5% |
| Answer Trust Signals | 98 | 5% |
| Technical Answer Accessibility | 100 | 5% |

Counts: Critical 0 · High 0 · Medium 2 · Low 3.

### Findings

- **AEO-1 (Medium) Posts open with narrative, not a one-sentence answer or key-takeaways block** — the 1,000+ word posts (`case-studies`, `legible-to-machines`, `mobile-first`, `warren-the-67-percent-bug`) have no summary at the top. A two-sentence "what this post shows" line would be quotable. Needs owner-reviewed copy; not auto-fixable without inventing text.
- **AEO-2 (Medium) Posts carry no `BlogPosting`/`BreadcrumbList`** (same root as SEO-1).
- **AEO-3 (Low)** Only `/services` uses question-shaped headings; the rest are descriptive, which is fine for narrative pages.
- **AEO-4 (Low)** Home does not open with a one-sentence definition of who the owner is in the visible H1 area (the Person `description` has it).
- **AEO-5 (Low)** No `dateModified` on posts (see GEO-2).

Snippet controls: no `noindex`, `nosnippet`, `max-snippet` or `data-nosnippet` anywhere; no `X-Robots-Tag`. **Manual check:** Search Console → "Search generative AI" must not be set to Exclude.
Voice: Applebot and Amzn-SearchBot are not blocked (robots is allow-all). No local business, so no `LocalBusiness` needed.
Question map: none; run `/seo-questions` if you want target questions mapped.

### Resources
- https://developers.google.com/search/docs/appearance/ai-features

---

## GEO: Citation Readiness

### Executive Summary

96/100 (A). Strong for the stated goal: the thesis has its own page with the DOI (3 mentions on `/academia`, 1 on home), `Thesis` JSON-LD, ORCID, and a Person entity whose `sameAs` lists GitHub, LinkedIn, ORCID and Kaggle. Gaps are authorship signals on posts and freshness data.

| Category | Score | Weight |
|----------|-------|--------|
| AI Crawler Access | 100 | 15% |
| Technical AI Accessibility | 100 | 10% |
| Topical Authority | 96 | 15% |
| Original Research & Evidence | 97 | 15% |
| Expert Perspectives & Authorship | 93 | 10% |
| External Validation | 95 | 10% |
| Entity Clarity | 91 | 10% |
| Extractable Passages | 98 | 5% |
| Content Freshness | 95 | 5% |
| llms.txt & Markdown Access 🧪 | 99 | 5% |

Counts: Critical 0 · High 0 · Medium 4 · Low 7.

### Category 1: AI Crawler Access

robots.txt (live, identical to `public/robots.txt`): `User-agent: *` / `Allow: /` plus the sitemap line. No named AI bots, no `Content-Signal`.

| Bot | Status |
|-----|--------|
| GPTBot, OAI-SearchBot, ChatGPT-User | ❓ Not specified (falls back to `*`, allowed) |
| ClaudeBot, Claude-SearchBot, Claude-User | ❓ Not specified (allowed) |
| PerplexityBot, Perplexity-User | ❓ Not specified (allowed) |
| Google-Extended, Googlebot, Bingbot, Applebot | ❓ Not specified (allowed) |
| CCBot, Bytespider | ❓ Not specified (allowed) |

Live check with those user agents (`GPTBot`, `ClaudeBot`, `PerplexityBot`, `Googlebot`): HTTP 200 for each, the same HTML as a browser. No edge code treats bots differently. Note SEO.md: Cloudflare's managed robots block was disabled on 2026-07-31; re-check if referrals dry up.

Commentary: training is deliberately allowed ("models should know who Christopher Manzano is", SEO.md) and search indexers and fetchers are allowed. That is a valid setup for being cited and known. No change recommended; any policy change is the owner's call.

### Findings

- **GEO-1 (Medium) No visible byline or author markup on posts.** Posts show a date but no named author; there is no `author` in markup. Fix: byline linking to `/cv` or `/` plus `author` in `BlogPosting` pointing at the existing Person entity (no new facts).
- **GEO-2 (Medium) No freshness data.** No `dateModified`, no `lastmod` in the 22-URL sitemap, no `article:modified_time`. Fix: derive from git commit dates at build.
- **GEO-3 (Medium) No external-validation links beyond the four profiles.** No press/coverage, talks, citations of the thesis from third parties on the site. Manual checklist below. Never invent testimonials.
- **GEO-4 (Medium) No site-level entity for the brand.** Person exists; there is no `WebSite` node (name "manapple", url, publisher/author) and "manapple" collides with the apple/Apple Inc. namespace. Fix: add `WebSite` JSON-LD on home with the name and the Person as author; disambiguation line is the owner's wording.
- **GEO-5 (Low)** Person JSON-LD does not reference the thesis (the `Thesis` entity on `/academia` has no `author` link back). Linking them with `@id` strengthens the thesis↔person association. Uses only existing facts, but touches the headline credential, so flag to the owner.
- **GEO-6 (Low)** `/writing/building-faro` is 177 words (thin).
- **GEO-7 (Low)** Original-research claims (67% bug, Erdős–Gyárfás verification) have the repo link but no `Dataset`/methodology block 🧪.
- **GEO-8 (Low)** No `Organization`/`worksFor` link to a page for WhiteBoxML (only a name).
- **GEO-9 (Low)** Longest posts (~1,300–1,450 words) have sections but no summary block.
- **GEO-10 (Low)** `/cv` has no Wikidata/ORCID `sameAs` of its own beyond the home Person.
- **GEO-11 (Low 🧪)** No `llms.txt`. Deliberately skipped per project memory (low value, experimental).

### Manual checklist (not scored)
Wikidata item for the owner; ORCID record lists the thesis with the Zenodo DOI; Zenodo record links back to manapple.dev; GitHub profile README links the site; Google Scholar/ResearchGate profile; Search Console property verified (SEO.md §1); Bing Webmaster Tools; third-party mentions of the thesis (not searched, web search off).

### Resources
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://llmstxt.org/

---

## 🎯 Prioritized Action Plan

1. **[Quick Win]** SEO-1/AEO-2/GEO-1: `BlogPosting` + `BreadcrumbList` JSON-LD with the existing Person as author, visible byline, `<time datetime>`.
2. **[Quick Win]** GEO-2: `dateModified` from git, sitemap `lastmod`.
3. **[Quick Win]** SEO-2: safe security + HTML cache headers in `nginx.conf`.
4. **[Quick Win]** SEO-3/6/7: shorten long titles, lengthen short descriptions, fix `theme-color`.
5. **[Medium Effort]** GEO-4/5: `WebSite` entity and thesis↔Person `@id` link (ask the owner first).
6. **[Medium Effort]** AEO-1: owner-written one-sentence summaries on long posts.
7. **[Larger Effort]** SEO-9: CSP with nonces; GEO-3: off-site presence per the manual checklist.

---

## 🔧 Remediation

```
/seo-fix              # apply fixes from this report
/seo-fix --dry-run    # preview the diffs without writing
/seo-questions        # build a question map (optional)
```

---

## 📚 Resources

### SEO
- https://developers.google.com/search/docs/appearance/structured-data/article
- https://web.dev/articles/vitals
### AEO
- https://developers.google.com/search/docs/appearance/ai-features
### GEO
- https://llmstxt.org/

---

## 🔍 Audit Methodology

Performed by the `ai-seo` plugin using LLM training data as fallback (Context7 unavailable). Evidence: source tree, built `dist/` (23 pages parsed for title, description, canonical, hreflang, H1, JSON-LD types, image alt), live fetches of `/`, `/robots.txt`, `/sitemap-index.xml`, `/writing/`, a missing path, four user agents, and local Lighthouse baselines in `/tmp/lh/before`. Scores are computed with the per-category deductions in the skill references. Judgments on copy quality (AEO-1, GEO-9) are estimates.
