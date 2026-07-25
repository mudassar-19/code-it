import { renderOgImage, OG_SIZE } from "@/lib/ogImage";
import { getIndustryBySlug, industries } from "@/lib/industries";

export const alt = "Industry solutions overview | CodeIT";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug);
  const title = industry ? `${industry.name} Solutions` : "CodeIT";

  return renderOgImage({
    title,
    subtitle: industry?.teaser,
  });
}
