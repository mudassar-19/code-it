"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Industry } from "@/lib/industries";
import type { PublicProductCard } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type RelevantProjectsSectionProps = {
  industry: Industry;
  // Real published Products in this industry's category, fetched server-side
  // in app/services/[slug]/page.tsx and passed down.
  projects: PublicProductCard[];
};

export default function RelevantProjectsSection({
  industry,
  projects,
}: RelevantProjectsSectionProps) {
  // Nothing published for this industry yet — omit the section entirely so the
  // page never shows an empty shell.
  if (projects.length === 0) return null;

  return (
    <section className="bg-section px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
            Relevant Projects
          </h2>
          <p className="mt-4 max-w-2xl text-navy/70">
            A sample of the kind of {industry.name.toLowerCase()} systems we
            build.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProductCard key={project.slug} product={project} index={index} />
          ))}
        </div>

        <Link
          href="/portfolio"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-bright-cyan"
        >
          View Full Portfolio
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
