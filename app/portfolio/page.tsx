import { Suspense } from "react";
import type { Metadata } from "next";
import { brand } from "@/lib/theme";
import PortfolioExplorer from "@/components/PortfolioExplorer";

export const metadata: Metadata = {
  title: `Portfolio | ${brand.name}`,
  description:
    "Browse example projects across every industry we serve — web, mobile, AI, automation, and more.",
};

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
          <Suspense fallback={null}>
            <PortfolioExplorer />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
