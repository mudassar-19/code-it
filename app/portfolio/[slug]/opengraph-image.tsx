import { renderOgImage, OG_SIZE } from "@/lib/ogImage";
import { getPublishedProductBySlug } from "@/lib/products";

export const alt = "Portfolio project overview | CodeIT";
export const size = OG_SIZE;
export const contentType = "image/png";

// Rendered on demand from the database — projects change through the admin
// panel, so there are no static params to pre-generate.
export const dynamic = "force-dynamic";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  let project = null;
  try {
    project = await getPublishedProductBySlug(params.slug);
  } catch {
    project = null;
  }

  return renderOgImage({
    title: project ? project.title : "Portfolio",
    subtitle: project
      ? `${project.categoryName} · ${project.shortDesc}`
      : undefined,
  });
}
