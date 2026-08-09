// ---------------------------------------------------------------------------
// Shared SEO constants/helpers — every page's metadata, the sitemap,
// robots.txt, and JSON-LD structured data all read from here so the site
// domain and org identity only need to be correct in one place.
// ---------------------------------------------------------------------------

import type { Metadata } from "next";
import { brand } from "@/lib/theme";

// PLACEHOLDER until a real production domain exists — see .env.example.
// No trailing slash, so callers can safely do `${SITE_URL}${path}`.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.codeit.com"
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
    areaServed: {
      "@type": "Country",
      name: "United States",
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
