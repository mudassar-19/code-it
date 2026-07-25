"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { industryIcons } from "@/lib/industryIcons";

type IndustryCardProps = {
  slug: string;
  name: string;
  icon: string;
  teaser: string;
  index?: number;
};

export default function IndustryCard({
  slug,
  name,
  icon,
  teaser,
  index = 0,
}: IndustryCardProps) {
  const Icon = industryIcons[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-teal/60 hover:bg-white/10"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-teal transition-all duration-300 group-hover:-rotate-6 group-hover:bg-teal group-hover:text-white">
        {Icon && <Icon className="h-6 w-6" strokeWidth={2} />}
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-white">
        {name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/65">
        {teaser}
      </p>
      <Link
        href={`/services/${slug}`}
        className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors hover:text-light-teal"
      >
        Explore {name} Solutions
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.div>
  );
}
