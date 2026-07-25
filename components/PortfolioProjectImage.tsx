// Shared placeholder "photo" renderer for the detailed portfolio dataset
// (lib/portfolio.ts) — an abstract teal/navy gradient with the project's
// industry icon watermarked on top. No real project photography exists for
// this dummy data; the gradient/icon pair comes straight from each
// project's `image` field.

import { industryIcons } from "@/lib/industryIcons";
import type { PortfolioProjectImage as PortfolioProjectImageData } from "@/lib/portfolio";

const GRADIENT_CLASSES: Record<PortfolioProjectImageData["gradient"], string> = {
  "teal-to-navy": "from-teal via-navy to-navy",
  "navy-to-teal": "from-navy via-teal to-light-teal",
  "light-teal-to-navy": "from-light-teal via-teal to-navy",
};

type PortfolioProjectImageProps = {
  image: PortfolioProjectImageData;
  className?: string;
};

export default function PortfolioProjectImage({
  image,
  className = "",
}: PortfolioProjectImageProps) {
  const Icon = industryIcons[image.icon];
  const gradient = GRADIENT_CLASSES[image.gradient];

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br ${gradient} ${className}`}
    >
      <div className="absolute -left-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 -right-6 h-48 w-48 rounded-full bg-navy/20 blur-2xl" />
      {Icon && (
        <Icon className="relative h-16 w-16 text-white/25" strokeWidth={1.25} />
      )}
    </div>
  );
}
