"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";
import { getPortfolioProjectsByIndustry, getProjectSummary, type PortfolioProject } from "@/lib/portfolio";

type RelatedProjectsProps = {
  project: PortfolioProject;
};

const RELATED_COUNT = 3;

export default function RelatedProjects({ project }: RelatedProjectsProps) {
  const related = getPortfolioProjectsByIndustry(project.industry)
    .filter((candidate) => candidate.slug !== project.slug)
    .slice(0, RELATED_COUNT);

  if (related.length === 0) return null;

  return (
    <section className="border-t border-light-teal bg-light-teal/20 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          More {project.industry} Projects
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((relatedProject, index) => (
            <motion.div
              key={relatedProject.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Link
                href={`/portfolio/${relatedProject.slug}`}
                className="flex h-full flex-col rounded-2xl border border-light-teal/60 bg-card p-6 shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-bright-cyan hover:shadow-glow"
              >
                <span className="inline-block w-fit rounded-full border border-teal/30 bg-light-teal px-3 py-1 text-xs font-semibold text-teal">
                  {relatedProject.techCategory}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold leading-snug text-navy">
                  {relatedProject.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-navy/70">
                  {getProjectSummary(relatedProject)}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-light-teal pt-4 text-xs font-medium text-navy/60">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" strokeWidth={2} />
                    {relatedProject.timeline}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5" strokeWidth={2} />
                    {relatedProject.orderValueBand}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
