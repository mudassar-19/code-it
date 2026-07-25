import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// No /admin route exists yet, but the disallow rule is here proactively so
// nothing has to remember to add it later once one does.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
