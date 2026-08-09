# CodeIT

Marketing site **and** database-backed admin platform, built with Next.js 14
(App Router, TypeScript), Tailwind, Prisma + MongoDB, and NextAuth.

An admin can manage **Products** (services/offerings) and **Categories**
through a protected dashboard at `/admin`, and review captured **Leads** — no
code changes or redeploys required.

## Getting started

```bash
cp .env.example .env      # then fill in the values below
npm install               # runs `prisma generate` automatically
npm run db:push           # push the Prisma schema to your MongoDB database
npm run seed:admin        # create the first admin user from .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, and
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the
admin panel.

## Environment variables

See `.env.example` for the full annotated list. The ones added for the admin
platform:

| Variable              | What it is                                                                                     |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| `DATABASE_URL`        | MongoDB Atlas connection string (`mongodb+srv://…`) with a database name in the path.          |
| `NEXTAUTH_SECRET`     | Secret that signs session JWTs. Generate with `openssl rand -base64 32`.                        |
| `NEXTAUTH_URL`        | App base URL — `http://localhost:3000` in dev, the real HTTPS origin in production.            |
| `ADMIN_EMAIL`         | Email for the seeded admin user (used by `npm run seed:admin`).                                 |
| `ADMIN_PASSWORD_HASH` | **bcrypt hash** of the admin password — never a plaintext password. Generate it (see below).   |
| `ADMIN_NAME`          | Optional display name for the admin (defaults to `Admin`).                                      |

Phase 2 adds (all optional — the app runs without them, features degrade gracefully):

| Variable                 | What it is                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `CLOUDINARY_CLOUD_NAME`  | Cloudinary cloud name (free account). Enables product image uploads.                         |
| `CLOUDINARY_API_KEY`     | Cloudinary API key. Server-side only.                                                         |
| `CLOUDINARY_API_SECRET`  | Cloudinary API secret. Server-side only — never exposed to the browser.                       |
| `NEXT_PUBLIC_CAL_LINK`   | Your Cal.com booking link (full URL or `slug`). Enables the "Book a Consultation" embed.      |

> Never commit real credentials, connection strings, or secrets. `.env` is
> git-ignored; `.env.example` holds placeholders only.

## First-time setup in detail

1. **Create a MongoDB Atlas cluster.** Sign up at
   [cloud.mongodb.com](https://cloud.mongodb.com) and create a **free M0**
   cluster. Add a database user and allow your IP under Network Access.
2. **Get the connection string.** In Atlas, choose **Connect → Drivers** and
   copy the `mongodb+srv://…` string. Add a database name to the path, e.g.
   `…mongodb.net/codeit?retryWrites=true&w=majority`. Put it in `.env` as
   `DATABASE_URL`.
3. **Set the NextAuth vars.** `NEXTAUTH_SECRET=$(openssl rand -base64 32)` and
   `NEXTAUTH_URL=http://localhost:3000`.
4. **Push the schema.** MongoDB has no SQL migrations — apply the Prisma schema
   with:
   ```bash
   npm run db:push
   ```
   Re-run this whenever `prisma/schema.prisma` changes.
5. **Generate the admin password hash** and put it in `.env` as
   `ADMIN_PASSWORD_HASH`:
   ```bash
   npm run hash-password -- "your-strong-password"
   ```
6. **Seed the admin user** (also set `ADMIN_EMAIL`):
   ```bash
   npm run seed:admin
   ```
   Safe to re-run — it upserts on email.
7. **Run the app** and log in at `/admin/login`:
   ```bash
   npm run dev
   ```

## Phase 2 setup (media uploads + booking calendar)

Both are optional and free-tier only. Skip either and the app still runs — the
upload route returns a clear message and the booking section shows a fallback.

1. **Cloudinary (product image uploads).**
   - Create a free account at [cloudinary.com](https://cloudinary.com).
   - From the Dashboard, copy **Cloud name**, **API Key**, and **API Secret**
     into `.env` as `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`,
     `CLOUDINARY_API_SECRET`.
   - In the admin product form, the cover image and gallery are now
     drag-and-drop / click-to-upload fields. Server-side validation accepts
     JPG/PNG/WebP (≤5MB) and MP4 (≤50MB), checking the real file signature —
     not just the extension. Video is still a YouTube embed **URL** field.
2. **Cal.com (booking calendar).**
   - Create a free account at [cal.com](https://cal.com) and set up an event
     type (e.g. a 20-minute intro call).
   - Copy your scheduling link into `.env` as `NEXT_PUBLIC_CAL_LINK` — either
     the full URL (`https://cal.com/your-name/intro-call`) or just the slug
     (`your-name/intro-call`). It appears in the "Book a Consultation" section
     on the homepage.

## Architecture notes

- **Database** — Prisma + MongoDB. `lib/prisma.ts` is the shared client
  singleton. Models: `Lead`, `AdminUser`, `Category`, `Product`
  (`prisma/schema.prisma`). Use `npm run db:push`, not `prisma migrate`.
- **Auth** — NextAuth Credentials provider (admin-only, no OAuth). Config in
  `lib/auth.ts`; route at `app/api/auth/[...nextauth]`. Passwords are bcrypt
  hashes; `passwordHash` never leaves the DB. `middleware.ts` gates `/admin/*`
  page navigation and redirects to `/admin/login`.
- **Admin panel** — `app/admin/`. The login page lives at `app/admin/login`;
  the authenticated shell (sidebar + server-side session check) is the
  `app/admin/(dashboard)/` route group, so `/admin`, `/admin/products`,
  `/admin/categories`, and `/admin/leads` all render inside it without wrapping
  the login page. Styled entirely with the site's existing design tokens and
  light/dark theme (`app/globals.css`).
- **API** — admin routes under `app/api/admin/*` verify the NextAuth session
  server-side (401 if absent) and validate bodies with Zod
  (`lib/productSchema.ts`, following `lib/leadSchema.ts`). Public
  `GET /api/products` returns only `status="published"` products.
- **Leads** — the intake forms write to MongoDB via Prisma, the single source
  of truth (`app/api/lead/route.ts`). On each new lead, Resend sends an internal
  notification to `LEAD_NOTIFICATION_EMAIL` and a confirmation to the submitter
  (`lib/email.ts`); missing email config is skipped gracefully and never blocks
  the save. Leads are managed in the admin **Leads** view (search, status
  tabs, inline status updates, and mailto/WhatsApp reply links).
- **Security** — `next.config.mjs` sets baseline security headers
  (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS) and allows
  Cloudinary / YouTube image hosts. Uploads go through the admin-only
  `app/api/admin/upload` route, which sniffs the real file signature (magic
  bytes) before accepting. Login rate-limiting is still a documented TODO
  (see `app/api/auth/[...nextauth]/route.ts`).
- **Media uploads** — `lib/cloudinary.ts` + `app/api/admin/upload`. The admin
  product form (`components/admin/ImageUploader.tsx`) uploads cover/gallery
  images with progress + preview.
- **Public products** — `/products` (listing with client-side category filter)
  and `/products/[slug]` (detail: cover, gallery, YouTube embed, features, CTA
  into the existing Get Started / Contact flow). Data comes from Prisma via
  `lib/products.ts` (published only). Both are in `sitemap.ts`.
- **Homepage** — the "Proof of Work" section (`sections/Portfolio.tsx`) shows
  real published products when the catalog has any, and falls back to the
  static `lib/portfolio.ts` content otherwise. The homepage uses ISR
  (`revalidate = 300`) so newly published products appear without a redeploy.
- **Booking** — `components/CalendarPlaceholder.tsx` embeds a Cal.com page via
  iframe, with a graceful fallback when `NEXT_PUBLIC_CAL_LINK` is unset.

## Still TODO (future phases)

- Login rate-limiting (suggested: Upstash Redis free tier).
- Direct MP4 upload in the product form (the upload API already accepts MP4;
  the form currently wires image fields + a YouTube URL field).
