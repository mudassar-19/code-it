import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPageTemplate from "@/components/IndustryPageTemplate";
import JsonLd from "@/components/JsonLd";
import { getIndustryBySlug, industries } from "@/lib/industries";
import { getIndustryDetail } from "@/lib/industryDetails";
import { getPublishedProductsByIndustry } from "@/lib/products";
import { breadcrumbJsonLd, buildMetadata, INDUSTRY_SEO, serviceJsonLd } from "@/lib/seo";

type IndustryPageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

// ISR: statically rendered but refreshed periodically so the "Relevant
// Projects" block picks up newly published work without a redeploy.
export const revalidate = 300;

export function generateMetadata({ params }: IndustryPageProps): Metadata {
  const industry = getIndustryBySlug(params.slug);
  const seo = INDUSTRY_SEO[params.slug];

  if (!industry || !seo) {
    return buildMetadata({
      title: "CodeIT | Web, Mobile & AI Software Development Agency",
      description:
        "CodeIT is a full-spectrum technology partner building web, mobile, and AI-powered software for growing businesses.",
      path: "/",
    });
  }

  return buildMetadata({
    title: seo.title,
    description: seo.description,
    path: `/services/${industry.slug}`,
  });
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const industry = getIndustryBySlug(params.slug);
  const detail = getIndustryDetail(params.slug);

  if (!industry || !detail) {
    notFound();
  }

  // Real published Products in this industry's category (empty on any DB
  // error — the section simply hides itself, see RelevantProjectsSection).
  const relevantProjects = await getPublishedProductsByIndustry(
    industry.name,
    3,
  );

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          industryName: industry.name,
          description: detail.positioning,
          path: `/services/${industry.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: `${industry.name} Solutions`, path: `/services/${industry.slug}` },
        ])}
      />
      <IndustryPageTemplate
        industry={industry}
        detail={detail}
        relevantProjects={relevantProjects}
      />
    </>
  );
}
