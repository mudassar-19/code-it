"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  title: string;
  eyebrow?: string;
  className?: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export default function SectionShell({
  id,
  title,
  eyebrow,
  className = "",
  align = "left",
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`scroll-mt-header px-6 py-24 ${className}`}
    >
      <motion.div
        // "center" only positions each child block on a shared center
        // axis (flex + items-center) — it deliberately doesn't force
        // text-align, so left-aligned content nested deeper (e.g. form
        // labels/inputs) isn't dragged along. Sections wanting centered
        // *text* add text-center on their own paragraphs.
        className={`mx-auto max-w-7xl ${align === "center" ? "flex flex-col items-center" : ""}`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        // amount is a fraction of THIS element's own height, not the
        // viewport's. A fixed fraction (e.g. 0.3) is fine for short
        // sections, but a section whose content stacks to one column on
        // mobile (Portfolio's card grid, most notably) can end up taller
        // than viewportHeight / amount, making that fraction impossible to
        // satisfy — the observer never fires and the section stays stuck
        // at opacity: 0 forever. "some" (threshold 0) fires as soon as any
        // part enters view, independent of element height.
        viewport={{ once: true, amount: "some" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {eyebrow && <span className="eyebrow text-teal">{eyebrow}</span>}
        <h2 className="mt-3 font-display text-display-md font-semibold tracking-tight text-navy">
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}
