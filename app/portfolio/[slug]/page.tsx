import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortfolioDetail from "@/components/PortfolioDetail";
import RelatedProjects from "@/components/RelatedProjects";
import { brand } from "@/lib/theme";
import { getProjectSummary, portfolioProjects } from "@/lib/portfolio";

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
    return { title: `Portfolio | ${brand.name}` };
  }

  return {
    title: `${project.title} | ${brand.name}`,
    description: getProjectSummary(project),
  };
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
      <PortfolioDetail project={project} />
      <RelatedProjects project={project} />
    </main>
  );
}
