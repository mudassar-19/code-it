import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries";
import { SITE_URL } from "@/lib/seo";
import { getPublishedProductSlugs } from "@/lib/products";

// Static pages + every industry route + every published portfolio project,
// with the project slugs read live from the database (the single source of
// truth), so the sitemap can never drift from what's actually published.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${SITE_URL}/services/${industry.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  // Published portfolio projects from the database. getPublishedProductSlugs()
  // swallows errors and returns [] so a DB hiccup can never fail sitemap
  // generation.
  const projectSlugs = await getPublishedProductSlugs();
  const portfolioRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/portfolio/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...industryRoutes, ...portfolioRoutes];
}
