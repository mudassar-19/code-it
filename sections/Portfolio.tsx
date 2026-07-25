// PLACEHOLDER SECTION — the projects rendered here (lib/portfolio.ts) are
// illustrative dummy content, not real client work. Swap them out for
// verified case studies (with client permission to publish) when available.

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionShell from "@/components/SectionShell";
import PortfolioProjectCard from "@/components/PortfolioProjectCard";
import { portfolioProjects } from "@/lib/portfolio";

// One project per industry, hand-picked for variety across techCategory
// (Chatbot, Mobile App, Computer Vision, AI/ML, Automation, Custom
// Software) rather than just taking the first six array entries.
const FEATURED_SLUGS = [
  "ai-listing-assistant-multi-agent-brokerage",
  "physical-therapy-mobile-app",
  "cv-job-completion-verification-janitorial-contractor",
  "predictive-client-churn-model-subscription-advisory-service",
  "automated-loyalty-winback-regional-coffee-shop-chain",
  "channel-manager-integration-hub-independent-hotel-group",
];

const featuredProjects = FEATURED_SLUGS.map((slug) =>
  portfolioProjects.find((project) => project.slug === slug),
).filter((project): project is NonNullable<typeof project> => Boolean(project));

export default function Portfolio() {
  return (
    <SectionShell
      id="portfolio"
      title="Portfolio"
      eyebrow="Proof of Work"
      className="bg-white"
    >
      <p className="mt-4 max-w-3xl text-lg text-navy/70">
        A sample of the kind of systems we build across industries — view a
        project for the full case study.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <PortfolioProjectCard
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>

      <Link
        href="/portfolio"
        className="link-underline group mt-10 inline-flex items-center gap-1.5 font-semibold text-teal hover:text-bright-cyan"
      >
        View Full Portfolio
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
      </Link>
    </SectionShell>
  );
}
