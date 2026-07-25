"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Clock, DollarSign } from "lucide-react";
import type { Industry } from "@/lib/industries";
import { getPortfolioProjectsByIndustry, getProjectSummary } from "@/lib/portfolio";

type RelevantProjectsSectionProps = {
  industry: Industry;
};

const FEATURED_COUNT = 3;

export default function RelevantProjectsSection({
  industry,
}: RelevantProjectsSectionProps) {
  const projects = getPortfolioProjectsByIndustry(industry.name).slice(
    0,
    FEATURED_COUNT,
  );

  if (projects.length === 0) return null;

  return (
    <section className="bg-white px-6 py-20">
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
            build — illustrative examples of scope, timeline, and investment.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-2xl border border-light-teal/60 bg-white p-6 shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-bright-cyan hover:shadow-glow"
            >
              <span className="inline-block w-fit rounded-full bg-light-teal px-3 py-1 text-xs font-semibold text-teal">
                {project.techCategory}
              </span>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug text-navy">
                {project.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                {getProjectSummary(project)}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-light-teal pt-4 text-xs font-medium text-navy/60">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                  {project.timeline}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" strokeWidth={2} />
                  {project.orderValueBand}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <Link
          href={`/portfolio?industry=${industry.slug}`}
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-bright-cyan"
        >
          View All {industry.name} Projects
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
