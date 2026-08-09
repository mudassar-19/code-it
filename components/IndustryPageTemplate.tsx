"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AlertCircle, Check, Lightbulb, TrendingUp } from "lucide-react";
import { industryIcons } from "@/lib/industryIcons";
import type { Industry } from "@/lib/industries";
import type { IndustryDetail } from "@/lib/industryDetails";
import type { PublicProductCard } from "@/lib/products";
import RelevantProjectsSection from "@/components/RelevantProjectsSection";

type IndustryPageTemplateProps = {
  industry: Industry;
  detail: IndustryDetail;
  relevantProjects: PublicProductCard[];
};

export default function IndustryPageTemplate({
  industry,
  detail,
  relevantProjects,
}: IndustryPageTemplateProps) {
  const Icon = industryIcons[industry.icon];
  const getStartedHref = `/?industry=${industry.slug}#get-started`;

  return (
    <main>
      {/* Hero */}
      <section className="bg-navy-deep px-6 pb-20 pt-32 text-white">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal text-white">
            {Icon && <Icon className="h-8 w-8" strokeWidth={2} />}
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">
            {industry.name} Solutions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            {detail.positioning}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={getStartedHref}
              className="w-full rounded-2xl bg-brand-gradient px-8 py-4 text-center font-semibold text-white shadow-glow-dark transition-[filter,transform] duration-250 hover:scale-[1.03] hover:brightness-110 sm:w-auto"
            >
              Get Started for {industry.name}
            </Link>
            <Link
              href="/#book-a-call"
              className="w-full rounded-2xl border-2 border-white px-8 py-4 text-center font-semibold text-white transition-colors duration-250 hover:bg-white hover:text-navy-deep sm:w-auto"
            >
              Book a Consultation
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Common Challenges */}
      <section className="bg-section px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-3xl font-bold text-navy sm:text-4xl"
          >
            Common Challenges
          </motion.h2>

          <div className="mt-10 flex flex-col gap-4">
            {detail.challenges.map((challenge, index) => (
              <motion.div
                key={challenge}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="flex items-start gap-4 rounded-2xl border border-orange/20 bg-orange/5 p-5"
              >
                <span className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-orange/15 text-orange">
                  <AlertCircle className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="text-navy/80">{challenge}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-light-teal/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-display text-3xl font-bold text-navy sm:text-4xl"
          >
            What We Offer
          </motion.h2>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {detail.services.map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                className="flex items-start gap-3 rounded-2xl border border-light-teal/60 bg-card p-5 shadow-soft"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-light-teal text-teal">
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                </span>
                <p className="text-sm text-navy/80">{service}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovative Ideas */}
      <section className="bg-section px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
              Innovative Ideas We Can Build For You
            </h2>
            <p className="mt-4 max-w-2xl text-navy/70">
              Forward-looking concepts we can bring to life for your business —
              starting points for what&apos;s possible, not off-the-shelf
              features.
            </p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {detail.innovativeIdeas.map((idea, index) => (
              <motion.div
                key={idea}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border-2 border-dashed border-teal/40 bg-light-teal/20 p-6 transition-colors duration-300 hover:border-bright-cyan"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-teal text-white">
                  <Lightbulb className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="mt-4 text-navy/80">{idea}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-navy-deep px-6 py-20">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="rounded-2xl bg-card p-8 shadow-card sm:p-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-light-teal px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal">
              Case Study
            </span>
            <h2 className="mt-4 font-display text-2xl font-bold text-navy">
              {detail.caseStudy.title}
            </h2>
            <div className="mt-3 flex items-center gap-2 text-teal">
              <TrendingUp className="h-5 w-5" strokeWidth={2} />
              <span className="font-display text-lg font-semibold">
                {detail.caseStudy.result}
              </span>
            </div>
            <p className="mt-4 text-navy/70">{detail.caseStudy.summary}</p>
            <Link
              href={`/portfolio?industry=${industry.slug}`}
              className="mt-6 inline-block text-sm font-semibold text-teal hover:text-bright-cyan"
            >
              See more in our Portfolio →
            </Link>
          </div>
        </motion.div>
      </section>

      <RelevantProjectsSection industry={industry} projects={relevantProjects} />

      {/* Closing CTA */}
      <section className="bg-light-teal/40 px-6 py-20">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Ready to grow your {industry.name.toLowerCase()} business?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-navy/70">
            Tell us about your business and we&apos;ll put together a plan — no
            obligation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={getStartedHref}
              className="w-full rounded-2xl bg-brand-gradient px-8 py-4 text-center font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.03] hover:brightness-110 sm:w-auto"
            >
              Get Started for {industry.name}
            </Link>
            <Link
              href="/#industries"
              className="text-sm font-semibold text-navy underline-offset-4 hover:text-bright-cyan hover:underline"
            >
              Explore other industries
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
