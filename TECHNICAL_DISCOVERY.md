# CodeIT Website — Technical Discovery Report

**Purpose:** Engineering-level picture of the codebase to support planning a major feature expansion.
**Scope:** Technical only. No business/marketing recommendations.
**Reviewed:** 2026-08-08. All paths are repo-relative.

---

## 1. Project Structure

### 1.1 Framework & runtime

- **Next.js 14.2.35**, **App Router** (`app/` directory), React 18, TypeScript 5 (`strict: true`).
- Path alias `@/*` → repo root (`tsconfig.json`), `moduleResolution: "bundler"`.
- `next.config.mjs` is **empty** (`const nextConfig = {}`) — no custom webpack, image, redirect, or header config.
- No `middleware.ts` anywhere. No `src/` directory (everything at root).
- Rendering: pages are Server Components by default; **17 files** carry `"use client"` (all interactive UI — forms, carousels, nav, theme toggle, animated sections). Portfolio and services detail pages are statically generated via `generateStaticParams`.

### 1.2 Folder / file tree (excluding `node_modules`, `.git`, `.next`)

```
app/
  api/lead/route.ts              # the ONLY API route (POST)
  portfolio/
    page.tsx                     # /portfolio index (filterable explorer)
    [slug]/page.tsx              # 97 static project pages
    [slug]/opengraph-image.tsx   # per-project OG image
  services/
    [slug]/page.tsx              # 8 static industry pages
    [slug]/opengraph-image.tsx   # per-industry OG image
  privacy/page.tsx               # static privacy policy (template)
  layout.tsx                     # root layout (fonts, Navbar, Footer, ThemeScript)
  page.tsx                       # homepage (composes sections/*)
  globals.css                    # Tailwind + theme CSS variables (150 lines)
  sitemap.ts / robots.ts         # dynamic SEO routes
  opengraph-image.tsx            # sitewide default OG image
  icon.png / favicon.ico

sections/                        # homepage sections (composed by app/page.tsx)
  Hero.tsx  About.tsx  Services.tsx  Industries.tsx
  Portfolio.tsx  GetStarted.tsx  BookACall.tsx  Contact.tsx

components/                      # 25 components (+ mockups/)
  Navbar.tsx  Footer.tsx  ServicesDropdown.tsx
  ThemeToggle.tsx  ThemeScript.tsx
  SectionShell.tsx  IconCard.tsx  IndustryCard.tsx  ShapeDivider.tsx  JsonLd.tsx
  GetStartedForm.tsx  ContactForm.tsx  CalendarPlaceholder.tsx
  HeroScene.tsx  HeroFallback.tsx          # Three.js hero + static fallback
  PortfolioExplorer.tsx  PortfolioProjectCard.tsx  PortfolioProjectImage.tsx
  PortfolioDetail.tsx  PortfolioMockup.tsx  RelatedProjects.tsx
  RelevantProjectsSection.tsx  IndustryPageTemplate.tsx
  mockups/MockupFrame.tsx  mockups/MockupScreens.tsx

lib/                             # data + business logic (all TypeScript modules)
  portfolio.ts (4709 lines)      # 97 portfolio projects (mock data)
  industryDetails.ts (282)       # per-industry service/case-study content
  industryQuestions.ts (180)     # per-industry form questions
  seo.ts (209)                   # metadata/JSON-LD helpers
  industries.ts (69)             # 8 industry definitions
  email.ts (113)  ghlSync.ts (69)  airtable.ts (78)   # lead integrations
  leadSchema.ts (98)             # Zod validation
  theme.ts (81)  socialIcons.ts (12)  industryIcons.ts (22)
  contact.ts (15)  ogImage.tsx  prisma.ts (13)         # prisma.ts ORPHANED

prisma/
  schema.prisma                  # Lead model (SQLite) — ORPHANED (see §2.2)
  dev.db                         # committed SQLite file
  migrations/*                   # 2 migrations

public/images/                   # logos only (png). public/models/.gitkeep (empty)
assets/                          # source logo pngs (not served)
docs/airtable-setup.md           # Airtable "Leads" table spec

Config: next.config.mjs, tailwind.config.ts, postcss.config.mjs,
        tsconfig.json, .eslintrc.json, .prettierrc.json, .env.example
```

### 1.3 `package.json` dependency breakdown

| Package | Version | Purpose in this codebase |
|---|---|---|
| `next` | 14.2.35 | Framework (App Router, RSC, static generation, metadata API) |
| `react` / `react-dom` | ^18 | UI runtime |
| `typescript` | ^5 | Types (strict) |
| `@prisma/client` / `prisma` | ^6.19.3 | ORM + SQLite client. **Currently orphaned** — no runtime code calls it (see §2.2, §10) |
| `airtable` | ^0.12.2 | Lead system-of-record client (`lib/airtable.ts`) |
| `resend` | ^6.17.2 | Transactional email (`lib/email.ts`) |
| `zod` | ^4.4.3 | Request validation (`lib/leadSchema.ts`) |
| `framer-motion` | ^12.42.2 | Animations (sections, forms, carousels) |
| `three` | ^0.180.0 | 3D engine for Hero |
| `@react-three/fiber` | ^8.18.0 | React renderer for Three.js (`HeroScene.tsx`) |
| `@react-three/drei` | ^9.122.0 | Three.js helpers |
| `@types/three` | ^0.180.0 | Three.js types (in `dependencies`, not devDeps) |
| `lucide-react` | ^1.25.0 | Primary icon set (industry/service/UI icons) |
| `react-icons` | ^5.7.0 | Social icons (`lib/socialIcons.ts`) |
| `tailwindcss` | ^3.4.1 | Styling |
| `postcss` / `eslint` / `prettier` / `eslint-config-next` / `prettier-plugin-tailwindcss` | (dev) | Tooling |

**Scripts:** `dev`, `build`, `start`, `lint` (standard Next.js), plus `postinstall: prisma generate` — this still runs Prisma codegen on every install even though the client is unused at runtime.

---

## 2. Data Layer

**Key architectural fact:** *All site content is hardcoded as typed TypeScript modules in `lib/`. There is no CMS, no content database, and no local JSON. Editing any content requires a code change and redeploy.* The only runtime data store is Airtable, used exclusively for outbound lead capture (write-only).

### 2.1 Content data models (in-code, `lib/`)

**`Industry`** — `lib/industries.ts` (8 records):
```ts
type Industry = { slug: string; name: string; icon: string; teaser: string }
```
Consumed by: homepage `Industries` section, `/services/[slug]`, sitemap, form industry picker, Zod enum in `leadSchema.ts`.

**`IndustryDetail`** — `lib/industryDetails.ts` (keyed by slug; `servicePool` shared vocabulary):
```ts
type IndustryDetail = {
  slug: string; positioning: string; challenges: string[];
  services: string[]; innovativeIdeas: string[];
  caseStudy: { title: string; result: string; summary: string };
}
```

**`IndustryQuestion`** — `lib/industryQuestions.ts` (per-industry form questions):
```ts
type IndustryQuestion = { id: string; label: string; type: "text" | "select"; options?: string[]; placeholder?: string }
```

**`PortfolioProject`** — `lib/portfolio.ts` (4709 lines, **97 projects** built from 8 per-industry arrays, then flattened into `portfolioProjects`). This is the single largest and most structured content model — the closest thing to a "product catalog" already present:
```ts
type PortfolioProject = {
  slug: string; title: string; industry: string;          // industry = Industry.name
  techCategory: "Web App"|"Mobile App"|"AI/ML"|"Computer Vision"|"Automation"|"Chatbot"|"Custom Software";
  description: string; impact: string; timeline: string;
  orderValueBand: "$500-$2,500"|...|"$25,000+";            // priced in bands, not exact numbers
  image: { icon: string; gradient: "teal-to-navy"|"navy-to-teal"|"light-teal-to-navy" };
  // optional deep-dive fields (populated for some industries):
  problemStatement?, solution?, features?[], businessBenefits?[],
  prosAndCons?: { pros: string[]; cons: string[] },
  technologies?[], approach?, results?
}
```
Notes: `slug` is the route param for `/portfolio/[slug]`. `image` carries **no real photography** — it's a gradient key + a Lucide icon watermark (see §6). The file header explicitly labels all 97 records as fabricated placeholder data.

**Contact** — `lib/contact.ts`: a single `contactInfo` object (phone/email/address/socials), all placeholder values.

### 2.2 Prisma schema (orphaned)

`prisma/schema.prisma` defines one model:
```prisma
model Lead {
  id           String   @id @default(cuid())
  industry     String
  fullName     String
  email        String
  phone        String
  businessName String
  description  String
  answers      String              // JSON-encoded Record<string,string>
  source       String   @default("get-started-form")
  crmSyncedAt  DateTime?
  createdAt    DateTime @default(now())
}
```
- Datasource: **SQLite** (`provider = "sqlite"`, `url = env("DATABASE_URL")`); schema comment notes it can be swapped to `postgresql` without model changes.
- Migrations present: `20260720201104_init`, `20260721175544_add_lead_source`. `prisma/dev.db` is committed.
- `lib/prisma.ts` exports a standard hot-reload-safe singleton `PrismaClient`.
- **Status: ORPHANED.** `app/api/lead/route.ts` writes leads to Airtable, **not** Prisma. `grep` confirms `prisma`/`PrismaClient` is imported nowhere except `lib/prisma.ts` itself. Comments in `ghlSync.ts`/`schema.prisma` still refer to the DB as "system of record," but the code path no longer uses it (`.env.example` confirms: *"no longer written to by /app/api/lead/route.ts now that Airtable is the system of record"*).

### 2.3 Airtable structure (current lead store)

Documented in `docs/airtable-setup.md`; field mapping implemented in `lib/airtable.ts`. Table name must be exactly **`Leads`**:

| Airtable field | Type | Written from |
|---|---|---|
| Full Name | Single line text | `payload.fullName` |
| Email | Email | `payload.email` |
| Phone | Phone number | `payload.phone` |
| Business Name | Single line text | `payload.businessName` |
| Industry | Single select (8 options + auto "General Inquiry") | `payload.industryLabel` |
| Message | Long text | `payload.description` |
| Industry Specific Answers | Long text | `JSON.stringify(payload.answers)` |
| Source | Single select (`get-started-form`, `contact-form`) | `payload.source` |
| Submitted At | Created time (auto) | — |

Auth: `AIRTABLE_API_KEY` (personal access token, `data.records:write`) + `AIRTABLE_BASE_ID`. Records created with `typecast: true` so new select options are auto-added. **If unconfigured or on any error, `createLeadInAirtable` logs and returns `null` — never throws** (by design, so email/CRM steps still run). Read/query/update/delete of leads is **not** implemented — the integration is create-only.

### 2.4 Other storage

None. No local JSON content, no headless CMS, no KV/Redis, no object storage. Static assets (logos) live in `public/images/`. `public/models/.gitkeep` reserves a directory for Three.js models but is empty.

---

## 3. API Routes

There is exactly **one** API route.

### `POST /api/lead` — `app/api/lead/route.ts`

- **Runtime:** `nodejs` (declared `export const runtime = "nodejs"`).
- **Method:** POST only (no GET/PUT/DELETE handlers).
- **Purpose:** Single intake endpoint for both the multi-step "Get Started" form and the simpler Contact form (disambiguated by `source`).
- **Input shape:** JSON validated by `leadSchema` (`lib/leadSchema.ts`, Zod):
  ```
  industry: enum(8 slugs | "general-inquiry")   fullName: string(2..120)
  email: valid email                            phone: string (required only if source=get-started-form)
  businessName: string (required only if get-started-form)
  description: string(10..2000)                 answers: Record<string,string(≤500)>
  source: "get-started-form" | "contact-form"   honeypot: string (spam trap)
  ```
  A `superRefine` enforces phone/businessName/real-industry only when `source === "get-started-form"`.
- **Output shape:**
  - `201 { success: true, leadId: string | null }` on success (also returned for honeypot hits, to not reveal the trap).
  - `400 { error: string, fieldErrors?: Record<string,string[]> }` on invalid JSON or validation failure.
- **Processing pipeline (order matters, see route comments):**
  1. `createLeadInAirtable(...)` — primary store, returns record id or `null`.
  2. `Promise.allSettled([sendInternalLeadNotification, sendLeadConfirmationEmail])` — Resend emails, best-effort.
  3. `syncLeadToGoHighLevel(...)` — fire-and-forget `fetch` to a GHL inbound webhook, 8s `AbortSignal.timeout`, never awaited into the response.
- **Integration status (all three degrade gracefully when env is empty):**

  | Integration | Code | Configured? | Behavior when unset |
  |---|---|---|---|
  | Airtable | `lib/airtable.ts` | ❌ (`AIRTABLE_API_KEY`/`AIRTABLE_BASE_ID` empty in `.env.example`) | logs, returns `null` |
  | Resend email | `lib/email.ts` | ❌ (`RESEND_API_KEY` empty) | logs, no-ops |
  | GoHighLevel | `lib/ghlSync.ts` | ❌ (`GHL_WEBHOOK_URL` empty) | logs, skips |

  **Net current state: a submission returns `201 success` but persists nowhere** until env vars are supplied. No other endpoints exist (no auth, no admin, no content, no read APIs).

---

## 4. Component Architecture

25 components + 8 homepage sections. No component library dependency (Radix/shadcn/MUI absent) — everything is hand-built with Tailwind + Framer Motion + Lucide.

### 4.1 Generic / reusable (design-system primitives)
- **`SectionShell.tsx`** — standard section wrapper (eyebrow, title, align, bg). Used by most sections.
- **`IconCard.tsx`**, **`IndustryCard.tsx`** — card primitives.
- **`PortfolioProjectCard.tsx`** — reusable across homepage `Portfolio`, `/portfolio` explorer, and related-projects rails.
- **`PortfolioProjectImage.tsx`** — gradient+icon placeholder renderer for any project.
- **`ShapeDivider.tsx`** — SVG section dividers (wave/angle), theme-color driven.
- **`JsonLd.tsx`** — generic schema.org `<script>` emitter (escapes `<`).
- **`mockups/MockupFrame.tsx`**, **`mockups/MockupScreens.tsx`** — abstract device/UI mockups selected deterministically from project metadata.
- **Layout:** `Navbar.tsx`, `Footer.tsx`, `ServicesDropdown.tsx`, `ThemeToggle.tsx`, `ThemeScript.tsx`.

### 4.2 Page-specific / feature components
- **Forms:** `GetStartedForm.tsx` (485 lines, 3-step wizard with industry-specific questions, progress bar, client validation, honeypot), `ContactForm.tsx` (202 lines, simpler variant). Both POST to `/api/lead`.
- **`CalendarPlaceholder.tsx`** — static stand-in for a booking embed (no real scheduler wired).
- **`PortfolioDetail.tsx`** (391 lines), **`PortfolioExplorer.tsx`** (client-side industry filter/tabs), **`RelatedProjects.tsx`**, **`RelevantProjectsSection.tsx`** — portfolio pages.
- **`IndustryPageTemplate.tsx`** (247 lines) — renders every `/services/[slug]` page from `IndustryDetail`.
- **`HeroScene.tsx`** (Three.js/R3F, 214 lines) + **`HeroFallback.tsx`** — lazy-loaded, desktop-only 3D hero with static fallback.

### 4.3 State management approach
- **No global state library.** `grep` confirms **no** `createContext`/`useContext`, and no Redux/Zustand/Jotai/Recoil.
- All state is **local React hooks** (`useState`/`useMemo`/`useRef`) within client components — e.g. form wizard state in `GetStartedForm`, filter state in `PortfolioExplorer`, carousel drag state in `Industries`.
- **Theme** is managed without React state: `ThemeScript.tsx` sets a `.dark` class on `<html>` pre-hydration from `localStorage`; `ThemeToggle.tsx` toggles the class and writes `localStorage`. No provider/context involved.
- Cross-component data flow is via **props + shared `lib/` module imports**, not runtime state.

---

## 5. Auth & Admin

**None exists. Confirmed by code search.**

- No authentication system: no `next-auth`, Clerk, `getServerSession`, `jsonwebtoken`, `bcrypt`, `iron-session`, cookie/session handling, or login UI anywhere (`grep` across `app/`, `components/`, `sections/`, `lib/` returns nothing).
- No admin panel or dashboard route. Lead review is expected to happen **inside the Airtable UI** (per `docs/airtable-setup.md` §3: *"no separate admin panel needed for now"*).
- No protected routes and **no `middleware.ts`** to enforce any.
- `app/robots.ts` proactively disallows `/admin`, `/admin/*`, `/api/`, but **no `/admin` route actually exists** — it is a forward-looking rule only.

There is zero auth/authorization foundation to build on; any admin/CRUD/user-account feature starts from scratch.

---

## 6. Media Handling

### 6.1 How images are handled today
- **`next/image` is used in exactly two places**, both for **local static logos** from `public/images/`:
  - `components/Navbar.tsx` (light + dark logo variants, `priority`).
  - `components/Footer.tsx` (dark logo).
- **Portfolio "images" are not images at all.** `PortfolioProjectImage.tsx` renders a CSS `bg-gradient-to-br` (one of three brand-gradient keys) with a Lucide icon watermark — driven by each project's `image: { icon, gradient }`. No `<img>`/photography for the 97 projects.
- Abstract UI mockups (`components/mockups/`) are pure SVG/JSX, chosen from project metadata — again, no raster assets.
- `PortfolioMockup.tsx` contains a comment noting a real `<img>` screenshot could replace the mockup "once available," but none is wired.

### 6.2 Upload capability
**None. Confirmed.** No `type="file"` inputs, no `multipart/form-data`, no `FormData` construction, no object-storage SDK, no presigned-URL logic, no drag-and-drop uploader anywhere in application code. (The only "upload"/"S3" hits in `grep` are **prose inside the fabricated `lib/portfolio.ts` case-study text** — e.g. "photographers upload raw images," `technologies: ["AWS S3", ...]` — not real functionality.)

### 6.3 Image optimization config
- **No custom image config.** `next.config.mjs` is empty, so there are **no `images.remotePatterns`/`domains`** entries. Consequence: `next/image` can currently only serve **local** `public/` assets; loading any remote/CDN/user-uploaded image URL through `next/image` would be blocked until `remotePatterns` is added.
- No custom loader, no `next/image` device/size overrides — defaults only.

---

## 7. Styling & Design System

- **Tailwind CSS 3.4.1**, `darkMode: "class"` (`tailwind.config.ts`). Content globs cover `app/`, `components/`, `sections/`, `lib/`.
- **Token strategy:** colors are defined as **`R G B` triplets** in CSS custom properties in `app/globals.css` under `:root` (light) and `.dark` (dark), and exposed to Tailwind via a `withOpacity(var)` → `rgb(var(--x) / <alpha-value>)` helper. This lets one className (`bg-navy`, `border-light-teal/60`) both support opacity modifiers **and** auto-repoint between themes. Full light/dark token sets exist for navy/teal/mist/card/section/text tiers, plus `--background`/`--foreground` and `--shadow-ambient`.
- **`lib/theme.ts`** mirrors the palette as raw hex/rgb strings for consumers that can't use Tailwind classes (Three.js materials in `HeroScene`, `ShapeDivider` fill/bg props). Note: `colors` there is static hex (Three.js can't react to the class toggle); `themeColors` uses `rgb(var(--...))` for the few string consumers that should repaint.
- **Typography:** two `next/font/google` families in `app/layout.tsx` — **Inter** (`--font-inter`, body) and **Fraunces** (`--font-fraunces`, display serif, `opsz` axis). Mapped to Tailwind `font-sans` / `font-display`. Custom fluid display sizes `display-hero`/`display-lg`/`display-md` use `clamp()` with tuned line-height/letter-spacing.
- **Other tokens:** custom `borderRadius` (2xl/3xl), `boxShadow` (`soft`, `card`, `glow`, `glow-dark`, `glow-cyan`), `backgroundImage` (`dot-grid`, `brand-gradient`), `spin-slow` animation, `250ms` duration, `scroll-mt-header`. Semantic `success/warning/error` colors are plain hex.
- **Theme switching UX:** parser-blocking inline script (`ThemeScript.tsx`) sets the class before first paint to avoid FOUC; a scoped `body, body *` transition animates only color/bg/border/shadow properties.
- No Tailwind plugins (`plugins: []`). Global CSS is small (150 lines) — mostly tokens plus a few utility layers.

---

## 8. Deployment & Config

- **Hosting target:** Vercel (README references Vercel deployment). **No `vercel.json`** present — relies on Vercel's zero-config Next.js defaults. No Dockerfile, no CI config in-repo.
- **Build/deploy scripts** (`package.json`): `next dev` / `next build` / `next start` / `next lint`; `postinstall: prisma generate` (runs despite Prisma being unused at runtime — see §10).
- **Environment variables** (`.env.example`; `.env` is git-ignored and untracked):

  | Var | Required for | Purpose |
  |---|---|---|
  | `NEXT_PUBLIC_SITE_URL` | SEO correctness | Base URL for `metadataBase`, canonicals, sitemap, robots, absolute OG image URLs (`lib/seo.ts`). Defaults to placeholder `https://www.codeit.com`. |
  | `AIRTABLE_API_KEY` | Lead storage | Airtable PAT (`data.records:write`) |
  | `AIRTABLE_BASE_ID` | Lead storage | Target Airtable base id |
  | `DATABASE_URL` | (Prisma only) | SQLite path `file:./dev.db`; **only used if Prisma migrations/gen run** — not on the request path |
  | `RESEND_API_KEY` | Email | Resend API key; unset → email no-ops |
  | `EMAIL_FROM` | Email | From address (default `hello@codeit.com`) |
  | `LEAD_NOTIFICATION_EMAIL` | Email | Internal inbox for new-lead notifications |
  | `GHL_WEBHOOK_URL` | CRM sync | GoHighLevel inbound-webhook trigger URL |

- **Static generation surface:** `/services/[slug]` (8) and `/portfolio/[slug]` (97) are pre-rendered via `generateStaticParams`; `sitemap.ts` enumerates ~108 URLs from the same `lib/` sources. `/api/lead` is the only dynamic server route.

---

## 9. Extensibility Assessment

Rating each target against the current architecture. Legend: **Reusable as-is** / **Needs modification** / **Needs new build**.

### a) Product catalog with CRUD (products, categories, pricing)
**Verdict: Needs new build (with a strong data-shape precedent to copy).**
The read model already effectively exists: `PortfolioProject` in `lib/portfolio.ts` is a rich, categorized, priced (`orderValueBand`), slug-routed catalog with static detail pages, filtering (`PortfolioExplorer`), and cards — a product catalog's *display* layer is ~90% present and largely reusable in shape. However, **CRUD does not exist**: content is hardcoded TypeScript compiled at build time, so create/edit/delete requires code edits + redeploy. There is no write API, no mutable datastore for content, no category entity (categories are today just string fields / the 8 hardcoded industries). Building true CRUD needs: a datastore, write endpoints, and validation — none of which the content layer currently has.

### b) Admin dashboard to manage products/portfolio/content without code changes
**Verdict: Needs new build (greenfield).**
There is **no admin, no auth, no protected routing, no middleware, no mutable content store** (§2, §5). Every prerequisite is absent. Nothing here is reusable except the visual design tokens/components for building the admin UI. This is the single largest gap for a "manage content without code" goal.

### c) Video upload and playback (showcasing services/products)
**Verdict: Needs new build.**
No upload pipeline exists anywhere (§6.2), no media storage, and `next.config.mjs` has no `images.remotePatterns` (external/uploaded media isn't even permitted through `next/image` yet). No `<video>`/player/streaming (Mux/HLS) code. Requires: storage (object store or a video SaaS), an authenticated upload path, a player component, and Next config changes. The empty `public/models/.gitkeep` shows a media dir was anticipated but nothing was built.

### d) Proper database (replacing Airtable / orphaned Prisma)
**Verdict: Needs modification — with a real head start.**
A **Prisma setup already exists** (`schema.prisma`, migrations, `lib/prisma.ts` singleton) and the schema comment explicitly supports switching `provider` from `sqlite` to `postgresql` with no model change. To adopt it: point `DATABASE_URL` at managed Postgres, re-enable the Prisma write in `app/api/lead/route.ts` (currently Airtable-only), and extend the schema beyond the single `Lead` model to cover catalog/content entities. Because lead creation is already isolated behind `lib/airtable.ts` (a single call site in the route), swapping/adding a persistence layer is localized, not sprawling. The main work is **modeling new entities and wiring reads**, since nothing currently reads from a DB.

### e) User-facing product/service browsing + inquiry or purchase flow
**Verdict: Browsing = reusable as-is / modification; purchase = needs new build.**
Browsing + inquiry is largely present: industry/portfolio browsing, filtering, detail pages, and a validated inquiry pipeline (`/api/lead` + `GetStartedForm`/`ContactForm`) already work and can be repointed to "products." **Purchase/checkout does not exist**: no payments (no Stripe/PayPal), no cart, no order/session state (no global state store, §4.3), no user accounts/auth (§5). A transactional flow is a new build spanning payments, order persistence, and account/session infrastructure.

**Summary matrix:**

| Target | Verdict | Biggest missing piece |
|---|---|---|
| a) Product catalog CRUD | Needs new build | Mutable datastore + write API (display layer reusable) |
| b) Admin dashboard | Needs new build | Auth + protected routes + content store (all absent) |
| c) Video upload/playback | Needs new build | Storage, upload path, player, `next.config` media allow |
| d) Real database | Needs modification | Extend existing Prisma; re-enable DB writes |
| e) Browse + purchase | Browse reusable / purchase new build | Payments, cart, orders, user accounts |

---

## 10. Technical Debt & Risks

### 10.1 Orphaned code
- **Prisma stack is dead weight on the runtime path.** `schema.prisma`, both migrations, committed `prisma/dev.db`, and `lib/prisma.ts` remain, but `app/api/lead/route.ts` uses Airtable. `PrismaClient` is imported nowhere but its own singleton file. `postinstall: prisma generate` still runs on every install. Comments across `ghlSync.ts`/`schema.prisma` still call the DB the "system of record," contradicting `.env.example` and the actual code path → **stale/misleading documentation risk**. (Note: this same Prisma setup is also the fastest path to a real DB — §9d — so "remove vs. revive" is a decision, not automatically deletion.)
- `public/models/.gitkeep` reserves an unused directory.
- `@types/three` sits in `dependencies` rather than `devDependencies` (minor).

### 10.2 Hardcoded / placeholder values that block scaling
- **All content is compile-time TypeScript** (`lib/portfolio.ts` at 4709 lines, `industryDetails.ts`, `industries.ts`, `industryQuestions.ts`). Any content change = code change + redeploy. This is the core structural blocker for any "manage content without code" or catalog-CRUD feature.
- **97 portfolio records are explicitly fabricated placeholder data** (file header) — includes invented outcomes, `orderValueBand`s, and `technologies`. Not a runtime bug, but the dataset is illustrative, not real.
- `lib/contact.ts` ships placeholder phone/email/address and `#` social links.
- `NEXT_PUBLIC_SITE_URL` defaults to placeholder `https://www.codeit.com`; every canonical/sitemap/OG URL derives from it.
- `CalendarPlaceholder.tsx` is a non-functional stand-in for a booking embed.
- All three lead integrations (Airtable/Resend/GHL) ship **unconfigured**, so leads currently persist nowhere in default state (§3).

### 10.3 Architectural decisions that must change for e-commerce-like functionality
- **No persistence layer for content/products.** Content-as-code must be replaced by a datastore (revive Prisma+Postgres, or a headless CMS) before CRUD/admin is possible.
- **No auth/authorization and no `middleware.ts`.** An admin, user accounts, and protected/checkout routes all require introducing an auth system and route protection from zero.
- **Write-only, single-purpose API surface.** Only `POST /api/lead` exists; there is no read/update/delete API and no resource-oriented routing. Catalog/orders/admin need a broader, authenticated API layer.
- **No global/shared client state** (§4.3). A cart, checkout session, or authenticated user context would require introducing a state solution (Context or an external store) that the app currently avoids by design.
- **No payment integration** of any kind.
- **`next.config.mjs` is empty** — no `images.remotePatterns`, headers, or redirects. External/uploaded media, security headers for authenticated areas, and CDN image domains all require config that isn't there yet.
- **Media architecture is placeholder-first** (gradients + icons instead of stored assets). Introducing real product imagery/video requires an actual asset-storage + optimization strategy that doesn't exist today.

### 10.4 Lower-severity notes
- Client-side form validation in `GetStartedForm.tsx` duplicates the Zod rules in `leadSchema.ts` (two sources of truth for the same constraints — e.g. `PHONE_PATTERN` repeated).
- Airtable integration is create-only with no typed schema binding (field names are string literals in `lib/airtable.ts`), so Airtable-side field renames fail silently at runtime.
- No test suite and no CI config present in-repo.
- Lead-pipeline failures surface only via `console.*` (no error monitoring/alerting hook).

---

*End of report. Findings reflect the codebase state as reviewed on 2026-08-08 and are cited to concrete files/paths throughout for verification.*
