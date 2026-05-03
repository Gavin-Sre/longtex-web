# Longtex Web — Claude Code Instructions

## Project Overview

Corporate B2B marketing website for **Longtex Rubber Industry Co., Ltd.**, a Thailand-based manufacturer of extruded natural rubber threads. The site is a product catalog and technical reference hub targeting international B2B buyers.

- **Deployed at:** `https://gavin-sre.github.io/longtex-rubber/`
- **Repository:** `gavin-sre/longtex-rubber` on GitHub Pages

## Primary Goal: SEO Optimization

**Every code change must be evaluated against its SEO impact.** This is the single most important objective for this project. When in doubt between two approaches, always choose the one that is better for search engine discoverability, crawlability, and ranking.

## Tech Stack

- **Framework:** Astro 5 (static site generator — no React, no server-side rendering)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT the traditional `tailwind.config.js`)
- **Carousel:** Embla Carousel 8 (used in `ProductSection.astro`)
- **Package manager:** pnpm
- **Deployment:** GitHub Pages via GitHub Actions

## Dev Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build
pnpm preview    # preview built output
```

## Project Structure

```
src/
  components/    # reusable Astro components
  layouts/       # Layout.astro — shared <head> and page shell
  pages/         # index.astro, products.astro, reference.astro
public/          # static assets, images, robots.txt, og-image.jpg
astro.config.mjs
```

## SEO Rules — Always Apply

These are non-negotiable. Apply them to every file you touch or create.

### Meta Tags & Head

- Every page must pass `title`, `description`, and `ogImage` to `Layout.astro`
- Title format: `[Page Topic] | Longtex — [Differentiator]`, 50–60 characters
- Description: 150–160 characters, keyword-rich, describes the specific page content
- `og:image` must always be set — default to `/public/og-image.jpg` (1200×630px)
- `og:site_name` must be `"Longtex Rubber Industry Co., Ltd."`
- Twitter/X card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`) must be present in Layout
- `<link rel="sitemap">` must be in `<head>` pointing to `sitemap-index.xml`
- `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">` must be in Layout
- Canonical URL is derived from `Astro.url` — never hardcode it

### Structured Data (JSON-LD)

- **Organization schema** must appear on every page (in Layout.astro)
- **Product schema** must appear on product detail sections (in `ProductSection.astro`)
- **BreadcrumbList schema** must appear on all non-homepage pages
- **WebSite schema** must appear on the homepage only
- Always validate new schemas with Google Rich Results Test before considering work done
- Use `set:html={JSON.stringify({...})}` pattern for Astro JSON-LD injection

### Sitemap & Crawlability

- `@astrojs/sitemap` must be installed and configured in `astro.config.mjs`
- `site` in `astro.config.mjs` must be `'https://gavin-sre.github.io/longtex-rubber'` (full path, no trailing slash)
- `trailingSlash: 'always'` must be set for canonical consistency
- `public/robots.txt` must exist, reference the sitemap, and allow all major crawlers

### Images

- **Never** use `loading="lazy"` on the LCP/hero image (the first above-fold image per page)
- **Always** use `fetchpriority="high"` on the single LCP image per page
- **Always** set explicit `width` and `height` on every `<img>` tag to prevent CLS
- Use the Astro `<Image>` component from `astro:assets` for all non-hero images — it auto-generates WebP and `srcset`
- Alt text must be descriptive and keyword-relevant:
  - Bad: `alt="rubber thread"`
  - Good: `alt="Talcum-coated natural rubber thread count 30-75, produced in Thailand"`
  - Purely decorative images: `alt=""`
- Never leave `alt` attributes empty on product images

### URLs & Routing

- All internal links must include the base path (use `import.meta.env.BASE_URL` where needed)
- No duplicate content — ensure canonical URLs resolve to exactly one URL per page
- Consistent trailing slashes — use `trailingSlash: 'always'` setting

### Performance (Core Web Vitals)

- **LCP target < 2.5s:** Preload the above-fold Google Font woff2 with `<link rel="preload" as="font">`, add `crossorigin`. Keep `font-display: swap`.
- **CLS target < 0.1:** Every image must have `width` and `height`. Never animate layout-affecting properties above the fold without `prefers-reduced-motion` guards.
- **INP target < 200ms:** Minimize JavaScript. Keep Embla Carousel as-is. Do not add heavy hydration.
- Google Analytics `<script async>` tag is acceptable — `async` prevents render-blocking.

### Content & Keywords

Keyword tiers for this project:

**Tier 1 — Core (high volume):**
- "rubber thread manufacturer Thailand"
- "natural latex rubber thread supplier"
- "extruded rubber thread"

**Tier 2 — Application-specific (medium volume, higher intent):**
- "food grade rubber thread for textiles"
- "silicone coated rubber thread wholesale"
- "talcum rubber thread export"

**Tier 3 — Technical spec (low volume, highest B2B conversion):**
- "rubber thread count 30 elongation 680%"
- "natural latex thread ISO certified"
- "rubber thread Thailand OEM supplier"

When writing headings, descriptions, or alt text, prefer phrasing that naturally includes these terms.

## Code Style

- Default to writing **no comments** — only comment when the WHY is non-obvious
- No unused imports or dead code
- Tailwind utility classes only — no custom CSS unless Tailwind cannot achieve it
- Astro components are the default — do not introduce React/Vue/Svelte unless explicitly requested
- Keep components single-responsibility

## Known SEO Gaps (Priority Order)

These are known issues. Fix them proactively when working in nearby files:

1. `og:image` meta tag is missing from `Layout.astro`
2. `robots.txt` does not exist in `/public/`
3. `@astrojs/sitemap` is not installed
4. No JSON-LD structured data anywhere in the project
5. `site` in `astro.config.mjs` is missing the `/longtex-rubber` base path (canonical URLs are wrong)
6. Google Fonts are not preloaded (LCP impact)
7. Carousel images in `ProductSection.astro` have empty alt text
8. Product images use plain `<img>` instead of Astro `<Image>` (no WebP conversion)
9. Twitter/X card meta tags are absent
10. `<link rel="sitemap">` is not in `<head>`

## Validation Checklist

After making SEO-related changes, verify with:
- **PageSpeed Insights** — target 90+ on both mobile and desktop
- **Google Rich Results Test** — validate all JSON-LD schemas
- **Google Search Console** — submit sitemap after any new pages
- **Facebook OG Debugger** — verify og:image renders correctly
- **LinkedIn Post Inspector** — B2B audience is primarily LinkedIn
