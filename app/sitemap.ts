import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries";
import { portfolioProjects } from "@/lib/portfolio";
import { SITE_URL } from "@/lib/seo";

// Static pages + every dynamically-generated industry and portfolio-project
// route (same source data generateStaticParams uses in their respective
// page.tsx files, so this can never drift out of sync with what's actually
// deployed).
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${SITE_URL}/services/${industry.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${SITE_URL}/portfolio/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...industryRoutes, ...portfolioRoutes];
}
