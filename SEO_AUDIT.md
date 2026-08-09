# SEO Audit — CodeIT (codeitdevs.com)

**Scope:** Next.js 14 App Router codebase. Audit only — no code was changed.
**Date:** 2026-08-09
**Target domain:** `codeitdevs.com` (env currently set to `https://www.codeitdevs.com`)

> All findings reference actual files and current values in the codebase. Admin
> routes (`/admin/*`) and API routes (`/api/*`) are intentionally excluded from
> indexing and from most of this audit except where noted.

---

## 1. Technical SEO Foundations

### robots — `app/robots.ts` ✅ (with one caveat)
Exists and uses the Next.js metadata API. Current rules:
```
userAgent: "*"
allow: "/"
disallow: ["/admin", "/admin/*", "/api/admin", "/api/admin/*", "/api/"]
sitemap: `${SITE_URL}/sitemap.xml`
host: SITE_URL
```
- ✅ `/admin` and admin APIs are disallowed; public routes are allowed.
- ⚠️ The broad `/api/` disallow also blocks `/api/products` (the public JSON
  endpoint). That endpoint isn't meant to be crawled, so this is acceptable, but
  worth being aware of.
- ⚠️ `host` is a non-standard directive (only Yandex honors it) — harmless.
- ⚠️ Both `sitemap` and `host` derive from `SITE_URL`, which has a **stale
  fallback** (see §1 canonical caveat and the Critical row in the summary).

### sitemap — `app/sitemap.ts` ✅ (dynamic, DB-backed)
Async sitemap. Includes:
| Route type | Source | Notes |
|---|---|---|
| `/` | static | priority 1.0 |
| `/portfolio` | static | priority 0.8 |
| `/privacy` | static | priority 0.3 |
| `/terms` | static | priority 0.3 |
| `/services/{slug}` (×8) | `industries` array (`lib/industries.ts`) | priority 0.9 |
| `/portfolio/{slug}` | **`getPublishedProductSlugs()` — live DB query** | priority 0.7, **published only** |

- ✅ Portfolio detail URLs are pulled live from the database via
  `getPublishedProductSlugs()` (`lib/products.ts:103`), which filters
  `status: "published"` — **not stale/hardcoded**. Drafts are excluded.
- ✅ `getPublishedProductSlugs()` swallows DB errors and returns `[]`, so a DB
  hiccup can't break sitemap generation.
- ⚠️ Every entry uses `lastModified: now` (build/request time), not real
  content-modified dates. Low impact, but not fully accurate.
- ⚠️ No `/services` hub URL exists (services are only `/services/{slug}`) — not
  a bug, just noting there's no index page for that section.

### Canonicals — `lib/seo.ts` `buildMetadata()` + `app/layout.tsx` ✅ (with Critical caveat)
- Every page that uses `buildMetadata({ path })` sets `alternates.canonical: path`
  and a matching `openGraph.url` (`lib/seo.ts:95,101`). Self-referencing canonicals
  are present on `/`, `/portfolio`, `/portfolio/[slug]`, `/services/[slug]`,
  `/privacy`, `/terms`.
- `metadataBase: new URL(SITE_URL)` (`app/layout.tsx:34`) makes canonicals/OG URLs
  absolute. ✅
- `trailingSlash` is **not** set in `next.config.mjs` → defaults to `false`,
  consistent (no trailing-slash duplicate-content risk). ✅
- **🔴 CRITICAL — stale domain fallback.** `lib/seo.ts:12-14`:
  ```ts
  export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.codeit.com"
  ).replace(/\/+$/, "");
  ```
  If `NEXT_PUBLIC_SITE_URL` is not set at build/runtime, **every canonical,
  OG URL, sitemap URL, robots host, and JSON-LD `url` points to
  `https://www.codeit.com`** — the wrong (old) domain, not `codeitdevs.com`.
- **🟠 www vs non-www.** Env is `https://www.codeitdevs.com` (www), but the domain
  was described as `codeitdevs.com`. The code will consistently use whatever
  `NEXT_PUBLIC_SITE_URL` says, but the host itself must **redirect the other
  variant** (e.g. non-www → www) at the hosting/DNS layer, or both will be
  reachable and compete. No code enforces this.

### 404 page — ❌ no custom `app/not-found.tsx`
- There is **no `app/not-found.tsx`**. Next.js serves its built-in default 404.
- ✅ HTTP status: App Router's `notFound()` and unmatched routes **do return a
  real HTTP 404**, so this is technically correct for crawlers.
- ⚠️ UX/branding gap: the default 404 has no nav, no branding, and no links back
  into the site (a missed internal-linking/recovery opportunity).
- Note: `app/portfolio/[slug]/page.tsx` and `app/services/[slug]/page.tsx` both
  call `notFound()` for unknown/draft slugs → correct 404s.

### Redirects — `next.config.mjs` ✅
```
/products      → /portfolio        (permanent / 308)
/products/:slug → /portfolio/:slug (permanent / 308)
```
- ✅ Permanent 308s preserve SEO equity from the old `/products` route.
- ✅ Destinations are final routes — **no redirect chains or loops**.
- ⚠️ Minor: `/products/:slug` where the slug maps to a draft/nonexistent portfolio
  item will 308 → `/portfolio/:slug` → 404. Acceptable (old dead links 404 rather
  than soft-redirecting to a wrong page).

### HTTPS enforcement ✅
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` is set
  for all routes (`next.config.mjs:14-16`).
- No hardcoded `http://` internal links found. The only `http://` occurrences are
  a Zod validation message string (`lib/productSchema.ts:41`) and `schema.org`
  namespace URIs — neither is an internal link.

---

## 2. Metadata Audit (page by page)

All titles/descriptions flow through `buildMetadata()` (`lib/seo.ts:82`), which
emits `<title>`, `meta description`, canonical, OG (`type/siteName/title/
description/url`), and Twitter (`summary_large_image/title/description`).
`og:image`/`twitter:image` come from the `opengraph-image.tsx` route files
(Next auto-wires them; Twitter falls back to the OG image).

| Route | `<title>` (source) | ~len | Description | OG | Twitter | OG image |
|---|---|---|---|---|---|---|
| `/` | `CodeIT \| Web, Mobile & AI Software Development Agency` (`app/page.tsx:16`) | 52 ✅ | present, ~150 ✅ | ✅ | ✅ | `app/opengraph-image.tsx` ✅ |
| `/portfolio` | `Our Portfolio — Web, Mobile & AI Projects \| CodeIT` (`app/portfolio/page.tsx`) | ~50 ✅ | present ✅ | ✅ | ✅ | root OG ✅ |
| `/portfolio/[slug]` | `${product.title} \| CodeIT` (`app/portfolio/[slug]/page.tsx:35`) | **varies** ⚠️ | `product.shortDesc` (**varies**) ⚠️ | ✅ | ✅ | `app/portfolio/[slug]/opengraph-image.tsx` ✅ |
| `/services/[slug]` | per-industry from `INDUSTRY_SEO` (`lib/seo.ts:36-77`) | 50–58 ✅ | hand-tuned 140–160 ✅ | ✅ | ✅ | `app/services/[slug]/opengraph-image.tsx` ✅ |
| `/privacy` | `Privacy Policy \| CodeIT — Data, Cookie & Security Practices` | ~58 ✅ | present ✅ | ✅ | ✅ | root OG ✅ |
| `/terms` | `Terms of Service \| CodeIT` (`app/terms/page.tsx:7`) | 25 ⚠️ short | present ✅ | ✅ | ✅ | root OG ✅ |
| Site default | `CodeIT \| Web, Mobile & AI Software Development Agency` (`app/layout.tsx`) | 52 | present | ✅ | ✅ | root OG |

**Notes & flags:**
- **`about`, `contact`, `get-started` are NOT separate routes.** They are homepage
  sections (`#about`, `#contact`, `#get-started` in `sections/*`). They therefore
  have **no dedicated title/description/canonical** and inherit the homepage's.
  This is fine architecturally, but means those keywords rank only via the home
  page.
- ⚠️ **`/portfolio/[slug]` title length is unbounded.** It's `${product.title} |
  CodeIT`. If an admin enters a long product title, the tag can exceed the 60-char
  guideline and get truncated in SERPs. (The old static portfolio had a
  `projectPageTitle()` truncation helper; the DB-backed version doesn't.)
- ⚠️ **`/portfolio/[slug]` description = `shortDesc`**, which the admin controls
  and is validated only as 10–300 chars (`lib/productSchema.ts`), not the 150–160
  SERP sweet spot.
- ⚠️ `/terms` title (25 chars) is short/thin vs the 50–60 guideline.
- ✅ No two *distinct* real pages share identical titles. The homepage title
  intentionally equals the layout `DEFAULT_TITLE` (`app/layout.tsx`) — expected.
- ⚠️ `app/services/[slug]/page.tsx:26-33` falls back to the **homepage title** if a
  slug isn't in `INDUSTRY_SEO`. Only reachable for non-generated slugs (all 8 real
  slugs are covered), so low risk, but it's a generic fallback.
- ✅ Robots meta is index-friendly: `app/layout.tsx:38` sets
  `robots: { index: true, follow: true, googleBot: { index: true, follow: true,
  "max-image-preview": "large", "max-snippet": -1 } }`.

---

## 3. Structured Data (JSON-LD)

Rendered via `components/JsonLd.tsx` (escapes `<` defensively). Schema builders
live in `lib/seo.ts`.

### Currently implemented
| Schema type | Where | Emitted on |
|---|---|---|
| `Organization` | `organizationJsonLd()` (`lib/seo.ts:117`) | Homepage (`app/page.tsx:30`) |
| `Service` | `serviceJsonLd()` (`lib/seo.ts:127`) | Each `/services/[slug]` (`app/services/[slug]/page.tsx`) |
| `BreadcrumbList` | `breadcrumbJsonLd()` (`lib/seo.ts:157`) | `/services/[slug]` and `/portfolio/[slug]` |

**Organization** currently emits `@type`, `name`, `url`, `logo` only.

### Gaps / opportunities
- ✅ **Organization on homepage** — present.
- ✅ **Service schema** — present per industry page (good).
- ❌ **No `Product`/`CreativeWork`/`Service` schema on `/portfolio/[slug]`** — these
  are real DB "Products" rendered as case studies but only carry a BreadcrumbList.
  Adding `CreativeWork`/`Service` (title, description, image, provider) would enrich
  them.
- ❌ **No `WebSite` schema** (optional `SearchAction`/sitelinks-searchbox) — minor.
- ❌ **No `FAQPage`** — there is **no FAQ content** anywhere in the codebase, so this
  is an opportunity only *if* FAQ content is added later. Do not add empty FAQ
  markup.
- ➖ **LocalBusiness** — correctly **omitted**. There is no physical address (a
  deliberate decision), and the only contact info is phone/email/WhatsApp
  (`lib/contact.ts`). Don't add LocalBusiness without an address.
- ❌ **No `Review`/`AggregateRating`** — correct, because **no real reviews exist**
  in the codebase. Do **not** fabricate any.
- 💡 Optional: add `contactPoint` (the real email `info@codeitdevs.com`) to
  Organization for richer entity data.

### Validation vs. removed data ✅ (mostly clean)
- ✅ **No `sameAs`** in Organization — social links were intentionally removed and
  the field is omitted, not left pointing at `#` (`lib/seo.ts:20-28`). Correct.
- ✅ **No `address` / `LocalBusiness`** referencing removed address fields.
- ✅ **No `/products` URLs** in any JSON-LD (breadcrumbs on portfolio detail use
  `/portfolio/...`). Consolidation is clean.
- ⚠️ **`serviceJsonLd().areaServed` is hardcoded to `{"@type":"Country","name":"United
  States"}`** (`lib/seo.ts:148-151`). The business is Pakistan-based (contact phone
  `+92`, per `lib/contact.ts`). This geo signal likely **misrepresents the served
  market** — review whether it should be Pakistan, global, or removed.

---

## 4. Heading Structure & Content

| Page | H1 | H2s | Nesting |
|---|---|---|---|
| `/` (home) | ✅ one — `sections/Hero.tsx:90` "Where Technology Meets Growth." | About, Services, Industries, Portfolio, Get Started, Book a Call, Contact (each via `SectionShell` `<h2>` or own `<h2>`) | ✅ H3s nested under H2 (e.g. `sections/About.tsx:88`) |
| `/portfolio` | ✅ `app/portfolio/page.tsx:29` "Our Portfolio" | product cards (H3) | ✅ |
| `/portfolio/[slug]` | ✅ `components/ProductDetail.tsx:37` (product title) | "Overview", "What's included", "Gallery", etc. (H2) | ✅ |
| `/services/[slug]` | ✅ `components/IndustryPageTemplate.tsx:39` | section H2s | ✅ |
| `/privacy` | ✅ `app/privacy/page.tsx:26` | section H2s | ✅ |
| `/terms` | ✅ `app/terms/page.tsx:25` | section H2s | ✅ |

- ✅ **Exactly one H1 per page**; `SectionShell` (`components/SectionShell.tsx:49`)
  renders section titles as `<h2>`, and `sections/About.tsx`/`Industries.tsx` use
  their own `<h2>`. No multiple-H1 or skipped-level issues found.
- ✅ **Content is crawlable text**, not image-only. Homepage hero has real copy
  (`sections/Hero.tsx:99-106`); `/services/[slug]` renders substantial unique text
  from `lib/industryDetails.ts`; `/privacy` and `/terms` are full text documents.
- ⚠️ **Homepage H1 is a brand tagline** ("Where Technology Meets Growth."), not
  keyword-bearing. The keyword-rich phrasing ("software development agency") lives
  only in the `<title>` and the hero paragraph, not the H1.
- ⚠️ **`/portfolio` list content is thin when the catalog is small.** With few
  published products, the page is a hero + a small grid; the copy is generic. It's
  client-filtered (`components/ProductsExplorer.tsx`) but SSR'd with initial props,
  so cards are in the HTML.

---

## 5. Image SEO

- ✅ **All public images use `next/image`.** `next/image` is imported in
  `Navbar.tsx`, `Footer.tsx`, `ProductCard.tsx`, `ProductDetail.tsx`. **No raw
  `<img>`** in `app/`, `components/`, or `sections/` public UI. (One raw `<img>`
  exists in `components/admin/ImageUploader.tsx:122` for upload previews — admin
  only, noindex, not an SEO concern.)
- Alt text status:
  | File | alt | Verdict |
  |---|---|---|
  | `components/Navbar.tsx:34,42` | `` `${brand.name} logo` `` → "CodeIT logo" | ✅ |
  | `components/Footer.tsx:22` | "CodeIT logo" | ✅ |
  | `components/ProductCard.tsx:38` | `{product.title}` | ✅ descriptive |
  | `components/ProductDetail.tsx:76` (cover) | `{product.title}` | ✅ |
  | `components/ProductDetail.tsx:156` (gallery) | `alt=""` | ⚠️ empty — gallery images get no alt |
- ⚠️ **`ProductDetail` gallery images use `alt=""`** — for case-study gallery shots,
  descriptive alt (e.g. `` `${product.title} — screenshot ${i+1}` ``) would help
  image search and accessibility.
- 🖼️ File naming: logo assets are reasonably named (`/images/codeit-web-logo.png`,
  referenced in `lib/seo.ts:27`). Uploaded product media is hosted on Cloudinary
  with generated public IDs (`next.config.mjs` allows `res.cloudinary.com`) — file
  names aren't SEO-controllable there; rely on alt text instead.
- ⚠️ The Organization logo in JSON-LD points to `/images/codeit-web-logo.png`
  (`lib/seo.ts:27`) — confirm that asset actually exists at the live domain once
  deployed.

---

## 6. Internal Linking

**Primary nav** (`lib/theme.ts:75-80`, rendered by `components/Navbar.tsx` +
`ServicesDropdown`): Home `/#home`, About `/#about`, **Portfolio `/portfolio`**,
Get Started `/#get-started`, Book a Call `/#book-a-call`, Contact `/#contact`,
plus a **Services dropdown → `/services/{slug}`** (all 8 industries).

**Footer** (`components/Footer.tsx`): repeats nav links, plus **`/privacy`** and
**`/terms`** in the bottom bar (the only links to those two pages).

**In-content links:**
- Homepage `sections/Portfolio.tsx` → `/portfolio` and → `/portfolio/{slug}` (via
  `ProductCard`).
- `components/RelevantProjectsSection.tsx` (on each `/services/[slug]`) → real
  published products in that industry → `/portfolio/{slug}`, plus a "View Full
  Portfolio" → `/portfolio`.
- `ProductDetail` CTAs → `/#get-started`, `/#contact`, `/#book-a-call`.

**Orphan check:**
- ✅ `/privacy`, `/terms` — linked from footer (not orphaned).
- ✅ `/services/{slug}` — linked from the Services dropdown + homepage Industries.
- ✅ `/portfolio/{slug}` — linked from the `/portfolio` grid, homepage showcase, and
  RelevantProjectsSection.
- ✅ No indexable orphan pages found.

**Old `/products` route:** ✅ **No code links directly to `/products`** (grep of
`app/`, `components/`, `sections/` returns nothing outside `/admin/products` and
`/api/products`). The consolidation is clean — nothing relies on the redirect as a
crutch.

---

## 7. Performance / Core Web Vitals Signals

- ✅ **Fonts optimized via `next/font`.** `app/layout.tsx` loads Inter + Fraunces
  through `next/font/google` with CSS variables — self-hosted, no render-blocking
  `<link>` to Google Fonts.
- ✅ **Three.js is handled well.** `sections/Hero.tsx:14-17` loads `HeroScene` via
  `next/dynamic({ ssr: false })` with a `HeroFallback`, and only on **desktop
  widths that are positively confirmed** (`useIsMobile`), and never when
  `prefers-reduced-motion` is set. Mobile never even requests the Three.js chunk.
- ✅ **LCP deliberately protected.** The hero H1's entrance animation starts at
  `opacity: 1` (`sections/Hero.tsx:33-36`) specifically so the LCP element is
  paintable immediately (documented in-code).
- ⚠️ **Three.js/R3F bundle weight on desktop.** `three`, `@react-three/fiber`,
  `@react-three/drei` (`package.json`) are heavy. Even lazy-loaded after paint, they
  add significant JS the desktop client eventually downloads/executes for a
  decorative background — a TBT/INP consideration. It's deferred, so impact is
  moderate, not critical.
- ✅ **Content pages use SSG/ISR appropriately.** `/` and `/services/[slug]` use
  `revalidate = 300` (ISR); `/portfolio` and `/portfolio/[slug]` are dynamic
  (force-dynamic) to reflect live DB — reasonable given DB-backed content.
- ⚠️ **`framer-motion` is used widely** (`SectionShell`, `Hero`, cards, nav) —
  animation JS across most sections. Fine, but it's client-side JS on otherwise
  static marketing content.
- ⚠️ Image dimensions: `ProductCard`/`ProductDetail` use `next/image` with `fill` +
  `sizes`, which is good; ensure Cloudinary source images aren't multi-MB
  originals (uploads are capped at 5MB in the admin route, so worst case a 5MB
  hero image — `next/image` will resize, but the origin fetch is still large).

---

## 8. Mobile & Accessibility (SEO-adjacent)

- ✅ **Viewport:** `app/layout.tsx` exports no custom `viewport`, so Next.js injects
  the default `<meta name="viewport" content="width=device-width, initial-scale=1">`.
  Correct and mobile-friendly.
- ✅ **Semantic HTML:** pages use `<main>`, `<section>`, `<header>`, `<footer>`,
  `<nav>`, real `<h1>`/`<h2>`/`<h3>`, `<ul>`/`<li>`. Not div-soup.
- ✅ **Form labels:** the Contact form and Get Started form use associated
  `<label htmlFor>`/ids (`components/ContactForm.tsx`, `components/GetStartedForm.tsx`);
  the lead API also has a honeypot with an `aria-hidden` label.
- ⚠️ **Empty gallery alts** (§5) is the main a11y+SEO overlap.
- ⚠️ `components/ProductsExplorer.tsx` filter tabs are buttons with `role="tab"` /
  `aria-selected` — good; confirm keyboard focus styles are visible (not verified
  here).

---

## 9. Indexability Risks

- ✅ **No accidental `noindex`.** The only `robots` metadata is `app/layout.tsx:38`,
  which is index/follow **true**. No page-level `robots: { index: false }` anywhere.
- ✅ **Draft products are NOT exposed.** Every public query filters
  `status: "published"`:
  - `getPublishedProducts()` — `lib/products.ts:68`
  - `getPublishedProductsByIndustry()` — `lib/products.ts:86`
  - `getPublishedProductBySlug()` — `lib/products.ts:103` (drafts → `null` →
    `notFound()` → 404 on `/portfolio/[slug]`)
  - `getPublishedProductSlugs()` — `lib/products.ts:127` (sitemap)
  A draft is therefore invisible on the listing, un-fetchable by slug (404), and
  absent from the sitemap. ✅
- ✅ **Middleware doesn't block crawlers from public routes.** `middleware.ts:24`
  matcher is `["/admin/:path*"]` only — public routes are never gated. `/admin` is
  correctly protected (auth redirect) *and* disallowed in robots.
- ⚠️ The stale `SITE_URL` fallback (§1) is itself an indexability risk: if it ever
  ships pointing at `www.codeit.com`, Google would see canonicals/sitemap for a
  domain you don't control.

---

## 10. Keyword / Content Strategy Gaps (observational)

- ✅ **Homepage `<title>`** targets a strong head term: "Web, Mobile & AI Software
  Development Agency."
- ✅ **Service pages are well-targeted** — `INDUSTRY_SEO` (`lib/seo.ts:36-77`) has
  specific, intent-matching titles/descriptions per industry (e.g. "Medical
  Practice Software & AI Automation", "Real Estate Web & AI Development Services").
- ⚠️ **Homepage H1 is a slogan**, not a keyword ("Where Technology Meets Growth.").
  Consider whether the visible H1 should carry "software development agency" / "AI
  integration services" intent.
- ⚠️ **No geographic targeting, and a conflicting geo signal.** The business is
  Pakistan-based (contact `+92`), yet `serviceJsonLd` declares `areaServed: United
  States` (`lib/seo.ts:150`). Decide the market: if targeting Pakistan (or "software
  development agency Pakistan"), the content, `areaServed`, and possibly titles
  should reflect it; if global, remove/broaden `areaServed`. Right now the signal is
  contradictory.
- ⚠️ **No standalone `/about` or `/services` hub page.** "About" and the services
  overview are homepage anchors only, so they can't rank independently for
  "about"/"services" style queries or accrue their own links.
- ⚠️ **Thin portfolio detail SEO copy** — `/portfolio/[slug]` descriptions come from
  admin-entered `shortDesc` with no SERP-length guidance; case studies are the best
  organic-traffic asset and currently under-optimized.
- ➖ No blog/resources content — the site has no article surface to target
  long-tail informational queries. Strategic gap, not a bug.

---

## 11. Summary Punch-List (prioritized)

| # | Issue | Severity | Affected Pages / Files | Recommended Fix (one line) |
|---|---|---|---|---|
| 1 | Stale domain fallback `https://www.codeit.com` powers all canonicals/sitemap/robots/JSON-LD if env unset | **Critical** | `lib/seo.ts:12-14` (impacts every page, `robots.ts`, `sitemap.ts`) | Change the fallback to `https://www.codeitdevs.com` and set `NEXT_PUBLIC_SITE_URL` in prod env. |
| 2 | www vs non-www not enforced; both hostnames resolvable | **High** | Hosting/DNS + `NEXT_PUBLIC_SITE_URL` | Pick one canonical host and 301-redirect the other at the platform (e.g. non-www → www). |
| 3 | `areaServed: United States` contradicts a Pakistan-based business | **High** | `lib/seo.ts:148-151` (`/services/[slug]`) | Set `areaServed` to the true market (Pakistan / global) or remove it. |
| 4 | No custom branded 404 with links back into the site | **Medium** | missing `app/not-found.tsx` | Add `app/not-found.tsx` (still returns 404) with nav + key links. |
| 5 | `/portfolio/[slug]` `<title>` unbounded; can exceed 60 chars | **Medium** | `app/portfolio/[slug]/page.tsx:35` | Truncate to ~60 chars (reuse the old `projectPageTitle` pattern). |
| 6 | `/portfolio/[slug]` meta description = raw `shortDesc` (no 150–160 guidance) | **Medium** | `app/portfolio/[slug]/page.tsx`, `lib/productSchema.ts` | Add a dedicated SEO description field or length guidance in the admin form. |
| 7 | No `Product`/`CreativeWork` schema on portfolio detail pages | **Medium** | `app/portfolio/[slug]/page.tsx`, `lib/seo.ts` | Add `CreativeWork`/`Service` JSON-LD (title, image, description, provider). |
| 8 | Portfolio gallery images have `alt=""` | **Medium** | `components/ProductDetail.tsx:156` | Populate descriptive alt (e.g. `"${title} — screenshot N"`). |
| 9 | Homepage H1 is a slogan, not keyword-bearing | **Medium** | `sections/Hero.tsx:90` | Optionally weave core service keywords into H1 or a nearby H2. |
| 10 | `/terms` title thin (25 chars); services fallback uses generic homepage title | **Low** | `app/terms/page.tsx:7`, `app/services/[slug]/page.tsx:26-33` | Lengthen the terms title; give the invalid-slug fallback its own copy. |
| 11 | Three.js/framer-motion desktop JS weight | **Low** | `sections/Hero.tsx`, `package.json` (`three`, R3F) | Monitor INP/TBT; keep the mobile/reduced-motion guards; consider a lighter effect. |
| 12 | Sitemap `lastModified` always = build time | **Low** | `app/sitemap.ts` | Use real `updatedAt` from DB for `/portfolio/{slug}` entries. |
| 13 | No standalone `/about` or `/services` hub, no blog | **Low** | site architecture | Consider dedicated pages/content surfaces for more ranking entry points. |
| 14 | Optional: Organization lacks `contactPoint`; no `WebSite`/`SearchAction` | **Low** | `lib/seo.ts:117` | Add `contactPoint` (real email) and a `WebSite` schema. |

---

### Confirmed healthy (no action needed)
- robots correctly disallows `/admin` + admin APIs; middleware doesn't block public crawl.
- Sitemap is DB-driven and excludes drafts; no stale hardcoded portfolio list.
- Draft products are fully non-indexable (listing, direct URL 404, sitemap).
- `/products → /portfolio` 308 redirects are clean (no chains/loops); nothing links to `/products` directly.
- Self-referencing canonicals + `metadataBase`; `trailingSlash` consistent; HSTS on; no `http://` internal links.
- One H1 per page, logical H2/H3 nesting, semantic HTML, real crawlable copy.
- All public images use `next/image`; fonts via `next/font`; viewport correct.
- JSON-LD contains no removed data (no `sameAs`, no address, no `/products` URLs).
