"use client";

import { motion } from "framer-motion";
import { Layers, LifeBuoy, Target, Zap } from "lucide-react";

const trustPoints = [
  {
    icon: <Layers className="h-5 w-5" strokeWidth={2} />,
    title: "Full-Stack Delivery",
    description:
      "From strategy to execution, our technical team builds and ships every layer of your growth stack.",
  },
  {
    icon: <Target className="h-5 w-5" strokeWidth={2} />,
    title: "Industry-Specific Solutions",
    description:
      "Playbooks and systems tailored to how your industry actually sells, serves, and operates.",
  },
  {
    icon: <Zap className="h-5 w-5" strokeWidth={2} />,
    title: "Fast Turnaround",
    description:
      "Lean workflows and automation get your campaigns and systems live in days, not months.",
  },
  {
    icon: <LifeBuoy className="h-5 w-5" strokeWidth={2} />,
    title: "Ongoing Support",
    description:
      "We stay on as a partner — monitoring, optimizing, and supporting everything we build.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-header relative overflow-hidden bg-navy-deep px-6 py-24 text-white lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dot-grid opacity-[0.15] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:sticky lg:top-32 lg:self-start"
        >
          <span className="eyebrow text-teal">Who We Are</span>
          <h2 className="mt-4 font-display text-display-lg font-semibold tracking-tight">
            Not a marketing
            <br />
            agency. A build team.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
            CodeIT is a full-service technology company. Our
            in-house team designs and builds across Web, Mobile, AI &amp;
            Machine Learning, Computer Vision, Cloud &amp; SaaS, and
            Automation — then pairs that engineering depth with growth
            strategy, so every platform we ship turns attention into revenue
            from day one.
          </p>
        </motion.div>

        <div className="flex flex-col">
          {trustPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className={`group flex items-start gap-6 border-t border-white/10 py-7 first:border-t-0 sm:gap-8 ${
                index % 2 === 1 ? "lg:pl-12" : ""
              }`}
            >
              <span className="font-display text-3xl font-semibold text-white/15 transition-colors duration-300 group-hover:text-teal/40 sm:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/10 text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                    {point.icon}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {point.title}
                  </h3>
                </div>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/65">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
