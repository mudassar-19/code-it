import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetail from "@/components/PortfolioDetail";
import RelatedProjects from "@/components/RelatedProjects";
import JsonLd from "@/components/JsonLd";
import { portfolioProjects } from "@/lib/portfolio";
import {
  breadcrumbJsonLd,
  buildMetadata,
  projectPageDescription,
  projectPageTitle,
} from "@/lib/seo";

type PortfolioProjectPageProps = {
  params: { slug: string };
};

// Route slugs are the same hand-curated, title-derived slugs already stored
// per project in lib/portfolio.ts (e.g. "AI-Powered Listing Assistant for a
// Multi-Agent Real Estate Brokerage" -> "ai-listing-assistant-multi-agent-brokerage").
export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
  params,
}: PortfolioProjectPageProps): Metadata {
  const project = portfolioProjects.find((p) => p.slug === params.slug);

  if (!project) {
    return buildMetadata({
      title: "Our Portfolio — Web, Mobile & AI Projects | CodeIT",
      description:
        "Browse real-world web development, mobile app, and AI automation projects by CodeIT across every industry we serve.",
      path: "/portfolio",
    });
  }

  return buildMetadata({
    title: projectPageTitle(project.title),
    description: projectPageDescription(project.description),
    path: `/portfolio/${project.slug}`,
  });
}

export default function PortfolioProjectPage({
  params,
}: PortfolioProjectPageProps) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
      <PortfolioDetail project={project} />
      <RelatedProjects project={project} />
    </main>
  );
}
