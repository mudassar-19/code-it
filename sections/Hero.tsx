"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroFallback from "@/components/HeroFallback";

const HeroScene = dynamic(() => import("@/components/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

// `opacity` starts at 1, not 0 — this content (the H1 in particular) is
// the page's Largest Contentful Paint candidate, and a JS/inline-style
// opacity animation from 0 means the browser never observes a paintable
// LCP element until Framer Motion's first tick, which measurably drops
// LCP tracking entirely (confirmed via Lighthouse + a live LCP
// PerformanceObserver both reporting no candidate at all). The vertical
// slide-up motion is kept — only the fade is removed.
const itemVariants: Variants = {
  hidden: { opacity: 1, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// `null` until the media query has actually been checked client-side —
// distinct from `false`, so the caller can treat "not yet confirmed
// desktop" the same as "mobile" instead of briefly assuming desktop.
function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  // Defaults to the static fallback and only switches to the 3D scene once
  // the viewport is *positively confirmed* to be desktop-width. Defaulting
  // the other way (assume desktop until proven mobile) would render
  // HeroScene on the very first pass for everyone, including mobile —
  // next/dynamic kicks off the Three.js chunk import as soon as that
  // component is rendered, so mobile visitors would still pay for the
  // fetch (and risk a half-initialized WebGL canvas) even though the
  // isMobile flip moments later swaps it back out. Requiring a positive
  // "this is desktop" signal means the import is never even requested on
  // mobile.
  const useStaticBackground = isMobile !== false || prefersReducedMotion;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="home"
        className="scroll-mt-header relative flex min-h-screen items-center overflow-hidden bg-white pt-20 dark:bg-navy-deep"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:gap-8">
          <motion.div
            className="relative z-10 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.span
              variants={itemVariants}
              className="eyebrow justify-center text-teal lg:justify-start"
            >
              Technology &amp; Growth Partner
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="mt-5 font-display text-display-hero font-semibold text-navy"
            >
              Where Technology
              <br />
              Meets Growth<span className="text-teal">.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mx-auto mt-6 max-w-2xl text-lg text-navy/70 dark:text-text-secondary sm:text-xl lg:mx-0"
            >
              CodeIT is a custom software development agency and growth
              partner — building web, mobile, AI-integration, and cloud systems
              that turn ambitious businesses into market leaders.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <a
                href="#get-started"
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-8 py-4 text-center font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.03] hover:brightness-110 sm:w-auto"
              >
                Get Started
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href="#book-a-call"
                className="w-full rounded-2xl border-2 border-primary-blue bg-white px-8 py-4 text-center font-semibold text-primary-blue transition-colors duration-250 hover:bg-soft-blue dark:border-white dark:bg-transparent dark:text-white sm:w-auto"
              >
                Book a Consultation
              </a>
            </motion.div>
          </motion.div>

          {/* Hidden outright below md, not just swapped for a fallback —
              display:none removes it from layout entirely, so no empty
              placeholder box (and no reserved grid gap) is left behind on
              mobile. The 3D-vs-fallback choice below only matters once
              this is actually visible, at md and up. */}
          <div className="relative hidden h-72 w-full sm:h-96 md:block lg:h-[32rem]">
            {useStaticBackground ? <HeroFallback /> : <HeroScene />}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
