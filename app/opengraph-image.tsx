import { renderOgImage, OG_SIZE } from "@/lib/ogImage";

export const alt = "CodeIT — Web, Mobile & AI Software Development Agency";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    title: "Web, Mobile & AI Software Built to Grow Your Business",
    subtitle: "Full-spectrum technology partner — custom development meets automation.",
  });
}
