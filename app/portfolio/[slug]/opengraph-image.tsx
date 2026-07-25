import { renderOgImage, OG_SIZE } from "@/lib/ogImage";
import { getProjectSummary, portfolioProjects } from "@/lib/portfolio";

export const alt = "Portfolio project overview | CodeIT";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const project = portfolioProjects.find((p) => p.slug === params.slug);

  return renderOgImage({
    title: project ? project.title : "Portfolio",
    subtitle: project ? `${project.industry} · ${getProjectSummary(project)}` : undefined,
  });
}
