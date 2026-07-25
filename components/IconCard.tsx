"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type IconCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
};

export default function IconCard({
  icon,
  title,
  description,
  index = 0,
}: IconCardProps) {
  const tilt = index % 2 === 0 ? -1.5 : 1.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
      whileHover={{ y: -8, rotate: tilt, scale: 1.02 }}
      className="group rounded-2xl border border-light-teal/60 bg-white p-6 shadow-soft transition-shadow duration-300 hover:border-teal hover:shadow-glow"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-light-teal text-teal transition-all duration-300 group-hover:-rotate-6 group-hover:bg-teal group-hover:text-white">
        {icon}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-navy">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-navy/70">{description}</p>
    </motion.div>
  );
}
