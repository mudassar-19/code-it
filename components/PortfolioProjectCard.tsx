"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";
import PortfolioProjectImage from "@/components/PortfolioProjectImage";
import { getProjectSummary, type PortfolioProject } from "@/lib/portfolio";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
  index?: number;
};

// The animated element is a plain motion.div (AnimatePresence in
// PortfolioExplorer needs to attach a ref to it for exit measurement) with
// a real, un-wrapped next/link Link nested inside. Wrapping the Link itself
// in motion.create() breaks click-through to Next's router once nested
// inside AnimatePresence — the click lands but navigation never fires.
const PortfolioProjectCard = forwardRef<
  HTMLDivElement,
  PortfolioProjectCardProps
>(function PortfolioProjectCard({ project, index = 0 }, ref) {
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: (index % 8) * 0.05,
      }}
      whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-light-teal/60 bg-card text-left shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-bright-cyan hover:shadow-glow"
      >
        <div className="relative aspect-[4/3] w-full">
          <PortfolioProjectImage image={project.image} />
          {/* navy-deep, not navy — this scrim must stay dark in both themes
              to dim the thumbnail for the white "View Details" pill; `navy`
              would flip to white in dark mode and wash the image out
              instead of darkening it. */}
          <div className="absolute inset-0 flex items-center justify-center bg-navy-deep/0 opacity-0 transition-all duration-300 group-hover:bg-navy-deep/50 group-hover:opacity-100">
            <span className="translate-y-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-navy-deep shadow-card transition-transform duration-300 group-hover:translate-y-0">
              View Details
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block w-fit rounded-full border border-teal/30 bg-light-teal px-3 py-1 text-xs font-semibold text-teal">
              {project.industry}
            </span>
            <span className="inline-block w-fit rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy/70">
              {project.techCategory}
            </span>
          </div>
          <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-navy">
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
        </div>
      </Link>
    </motion.div>
  );
});

export default PortfolioProjectCard;
