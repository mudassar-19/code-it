import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Keep the admin panel and all API routes out of search indexes. /admin and
// /api/admin are called out explicitly (per launch checklist); the broad
// /api/ rule also covers the public/internal endpoints, none of which are
// meant to be crawled.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/admin/*",
        "/api/admin",
        "/api/admin/*",
        "/api/",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
