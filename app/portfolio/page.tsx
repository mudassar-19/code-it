import { Suspense } from "react";
import type { Metadata } from "next";
import PortfolioExplorer from "@/components/PortfolioExplorer";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Portfolio — Web, Mobile & AI Projects | CodeIT",
  description:
    "Browse real-world web development, mobile app, and AI automation projects by CodeIT across real estate, medical, hospitality, and more — filter by industry.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <main>
      <section className="bg-navy-deep px-6 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            Our Portfolio
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            A sample of the kind of web, mobile, AI, and automation systems we
            build — filter by industry to see relevant work.
          </p>
        </div>
      </section>

      <section className="bg-section px-6 py-16">
        <div className="mx-auto max-w-7xl">
          {/* Visually hidden — the filter tabs + grid below don't need a
              second visible heading under the hero, but skipping straight
              from H1 to each card's H3 would break heading hierarchy. */}
          <h2 className="sr-only">All Portfolio Projects</h2>
          <Suspense fallback={null}>
            <PortfolioExplorer />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
