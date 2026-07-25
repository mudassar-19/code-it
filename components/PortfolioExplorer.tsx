"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { industries } from "@/lib/industries";
import { portfolioProjects } from "@/lib/portfolio";
import PortfolioProjectCard from "@/components/PortfolioProjectCard";

const ALL_FILTER = "all";

export default function PortfolioExplorer() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("industry") ?? "";
  const hasValidPreselect = industries.some(
    (industry) => industry.slug === preselected,
  );

  const [activeFilter, setActiveFilter] = useState(
    hasValidPreselect ? preselected : ALL_FILTER,
  );

  const tabs = useMemo(
    () => [
      { slug: ALL_FILTER, name: "All", count: portfolioProjects.length },
      ...industries.map((industry) => ({
        slug: industry.slug,
        name: industry.name,
        count: portfolioProjects.filter(
          (project) => project.industry === industry.name,
        ).length,
      })),
    ],
    [],
  );

  const activeIndustryName = industries.find(
    (industry) => industry.slug === activeFilter,
  )?.name;

  const filteredProjects = useMemo(() => {
    if (activeFilter === ALL_FILTER) return portfolioProjects;
    return portfolioProjects.filter(
      (project) => project.industry === activeIndustryName,
    );
  }, [activeFilter, activeIndustryName]);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by industry"
      >
        {tabs.map((tab) => {
          const isActive = tab.slug === activeFilter;
          return (
            <button
              key={tab.slug}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(tab.slug)}
              className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors duration-300 ${
                isActive
                  ? "border-teal bg-teal text-white"
                  : "border-light-teal bg-white text-navy/70 hover:border-teal/50 hover:text-navy"
              }`}
            >
              {tab.name}
              <span
                className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-navy/40"}`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeFilter}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="mt-4 text-sm text-navy/60"
      >
        Showing {filteredProjects.length} project
        {filteredProjects.length === 1 ? "" : "s"}
        {activeFilter !== ALL_FILTER ? ` in ${activeIndustryName}` : ""}
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <PortfolioProjectCard
              key={project.slug}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
