import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { getPublishedProductBySlug } from "@/lib/products";

type PortfolioProjectPageProps = { params: { slug: string } };

// Published projects change through the admin panel, so render on demand
// rather than statically pre-generating slugs.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: PortfolioProjectPageProps): Promise<Metadata> {
  let project = null;
  try {
    project = await getPublishedProductBySlug(params.slug);
  } catch {
    project = null;
  }

  if (!project) {
    return buildMetadata({
      title: "Our Portfolio — Web, Mobile & AI Projects | CodeIT",
      description:
        "Browse real web development, mobile app, and AI automation work by CodeIT across the industries we serve.",
      path: "/portfolio",
    });
  }

  return buildMetadata({
    title: `${project.title} | CodeIT`,
    description: project.shortDesc,
    path: `/portfolio/${project.slug}`,
  });
}

export default async function PortfolioProjectPage({
  params,
}: PortfolioProjectPageProps) {
  let project = null;
  try {
    project = await getPublishedProductBySlug(params.slug);
  } catch {
    project = null;
  }

  if (!project) notFound();

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
      <ProductDetail product={project} />
    </main>
  );
}
