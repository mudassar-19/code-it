"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { industries } from "@/lib/industries";
import { industryIcons } from "@/lib/industryIcons";

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 text-sm font-medium text-navy transition-colors hover:text-teal"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        Services
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[36rem] max-w-[90vw] -translate-x-1/2 rounded-2xl border border-light-teal bg-white p-6 shadow-card"
          >
            <p className="mb-4 font-display text-xs font-semibold uppercase tracking-wide text-teal">
              Industries We Serve
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1">
              {industries.map((industry) => {
                const Icon = industryIcons[industry.icon];
                return (
                  <Link
                    key={industry.slug}
                    href={`/services/${industry.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-2 py-2.5 text-sm font-medium text-navy transition-colors hover:bg-light-teal/60 hover:text-teal"
                  >
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-xl bg-light-teal text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                      {Icon && <Icon className="h-4 w-4" strokeWidth={2} />}
                    </span>
                    {industry.name}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 border-t border-light-teal pt-4">
              <Link
                href="/#industries"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold text-teal hover:text-navy"
              >
                View all industries →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
