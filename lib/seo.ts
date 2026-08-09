// ---------------------------------------------------------------------------
// Shared SEO constants/helpers — every page's metadata, the sitemap,
// robots.txt, and JSON-LD structured data all read from here so the site
// domain and org identity only need to be correct in one place.
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import { brand } from "@/lib/theme";
import { contactInfo } from "@/lib/contact";

// Canonical production origin. `NEXT_PUBLIC_SITE_URL` should be set in the
// deployment env (see .env.example); the fallback is the real production
// domain so canonicals/sitemap/robots/JSON-LD never point at the wrong host.
// No trailing slash, so callers can safely do `${SITE_URL}${path}`.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.codeitdevs.com"
).replace(/\/+$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// No `sameAs` — there are no real social profiles to cite yet, so the field
// is omitted from the Organization schema entirely rather than pointing at
// placeholder links. Add one back here (and in organizationJsonLd below) once
// real profile URLs exist.
export const ORGANIZATION = {
  name: brand.name,
  url: SITE_URL,
  logo: absoluteUrl("/images/codeit-web-logo.png"),
} as const;

export const DEFAULT_OG_IMAGE_ALT = `${brand.name} — full-spectrum technology and growth partner`;

// Hand-tuned per-industry SEO copy (title 50-60 chars, description 140-160
// chars) — deliberately separate from `industries[].teaser` in
// lib/industries.ts, which is homepage marketing copy written for a
// different purpose (a scannable card, not a search snippet).
export const INDUSTRY_SEO: Record<string, { title: string; description: string }> = {
  "real-estate": {
    title: "Real Estate Web & AI Development Services | CodeIT",
    description:
      "CodeIT builds AI-powered real estate websites, mobile apps, and lead-automation tools — from virtual tour assistants to smart lead scoring for agents.",
  },
  medical: {
    title: "Medical Practice Software & AI Automation | CodeIT",
    description:
      "CodeIT builds HIPAA-aware patient portals, AI intake chatbots, and scheduling automation for medical practices — cutting no-shows, easing front-desk work.",
  },
  "cleaning-janitorial": {
    title: "Cleaning & Janitorial Services Business Software | CodeIT",
    description:
      "CodeIT builds field-service mobile apps, dispatch automation, and AI quoting tools for cleaning and janitorial companies — helping crews win more work.",
  },
  consultants: {
    title: "Web & AI Development Services for Consultants | CodeIT",
    description:
      "CodeIT builds client portals, AI-assisted proposal tools, and lead-qualification automation for consultants — turning expertise into a qualified pipeline.",
  },
  "food-drinks": {
    title: "Restaurant & Food Business Web Development | CodeIT",
    description:
      "CodeIT builds ordering apps, AI menu chatbots, and inventory automation for restaurants and beverage brands — keeping tables full, operations smooth.",
  },
  "hotels-hospitality": {
    title: "Hotel & Hospitality Software Development Services | CodeIT",
    description:
      "CodeIT builds AI concierge chatbots, guest mobile apps, and dynamic pricing automation for hotels — elevating every stay from booking through checkout.",
  },
  travel: {
    title: "Travel & Tour Operator App Development Services | CodeIT",
    description:
      "CodeIT builds itinerary-builder apps, multi-language AI chat, and booking automation for travel companies — keeping travelers informed, bookings on track.",
  },
  "high-security-websites": {
    title: "High-Security Web Development & Compliance | CodeIT",
    description:
      "CodeIT builds hardened, compliance-ready web infrastructure with AI-based anomaly detection for businesses that can't afford downtime, breaches, or lost trust.",
  },
};

// Every page builds its metadata through this one function so title/
// description/canonical/OG/Twitter always stay in sync with each other —
// no page sets a canonical without a matching openGraph.url, etc.
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Route path, e.g. "/", "/portfolio", "/services/real-estate". */
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: brand.name,
      title,
      description,
      url: path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Trims text to a word boundary at/under maxLength and appends an ellipsis —
// used to keep admin-entered portfolio titles/descriptions within SERP-safe
// lengths (see projectPageTitle / projectMetaDescription below).
function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLength - 1).trimEnd()}…`;
}

// Portfolio project titles are admin-entered and unbounded. Keep the full
// "<title> | CodeIT" when it fits a ~60-char budget; otherwise keep the bare
// title if it fits, and only truncate the rare title that exceeds 60 on its
// own — so <title> tags never blow past the SERP display limit.
const TITLE_SUFFIX = " | CodeIT";
export function projectPageTitle(projectTitle: string): string {
  const withSuffix = `${projectTitle}${TITLE_SUFFIX}`;
  if (withSuffix.length <= 60) return withSuffix;
  if (projectTitle.length <= 60) return projectTitle;
  return truncateAtWord(projectTitle, 60);
}

// A project's shortDesc is validated only as 10–300 chars (lib/productSchema.ts),
// so trim it to ~157 chars at a word boundary for the meta description, landing
// in/near the 150–160 SERP sweet spot instead of passing the raw field through.
export function projectMetaDescription(shortDesc: string): string {
  return truncateAtWord(shortDesc.trim(), 157);
}

// ---------------------------------------------------------------------------
// JSON-LD structured data — plain objects consumed by components/JsonLd.tsx.
// Kept here alongside the metadata helpers above since they read from the
// same org/site identity.
// ---------------------------------------------------------------------------

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contactInfo.email,
    },
  };
}

// Minimal WebSite entity for the homepage — no SearchAction (the site has no
// search feature). Helps search engines associate the domain with the brand.
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
  };
}

export function serviceJsonLd({
  industryName,
  description,
  path,
}: {
  industryName: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${industryName} Web, Mobile & AI Development`,
    name: `${industryName} Solutions`,
    description,
    url: absoluteUrl(path),
    provider: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    // No `areaServed` — the business serves a global market, and Schema.org
    // treats an absent areaServed as unrestricted, which is more accurate than
    // naming a single country.
  };
}

// Structured data for a single portfolio project (a published Product rendered
// as a case study). Mirrors serviceJsonLd's provider pattern.
export function creativeWorkJsonLd({
  title,
  description,
  path,
  imageUrl,
  categoryName,
}: {
  title: string;
  description: string;
  path: string;
  imageUrl?: string | null;
  categoryName?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: absoluteUrl(path),
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(categoryName ? { about: categoryName } : {}),
    creator: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
    provider: {
      "@type": "Organization",
      name: ORGANIZATION.name,
      url: ORGANIZATION.url,
    },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
