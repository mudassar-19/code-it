import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Code2,
  DollarSign,
  Lightbulb,
  ListChecks,
  Milestone,
  ThumbsDown,
  ThumbsUp,
  Trophy,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import PortfolioMockup from "@/components/PortfolioMockup";
import { getProjectPhases, type PortfolioProject } from "@/lib/portfolio";

type PortfolioDetailProps = {
  project: PortfolioProject;
};

// Page-level zone heading — one per distinct group of cards below, so the
// page stays skimmable at a glance without reading into every card.
function ZoneHeading({
  title,
  icon: Icon,
}: {
  title: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-light-teal text-teal">
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </span>
      <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}

// The core content unit for this page — a self-contained, bordered card
// with its own icon + title, so dense text reads as distinct, skimmable
// chunks instead of one continuous column. Same border/shadow/radius
// vocabulary as IconCard.tsx elsewhere on the site.
function InfoCard({
  icon: Icon,
  title,
  className = "",
  children,
}: {
  icon: LucideIcon;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex h-full flex-col rounded-2xl border border-light-teal/60 bg-card p-6 shadow-soft transition-shadow duration-300 hover:shadow-glow ${className}`}
    >
      <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-light-teal text-teal">
        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
      </span>
      <h3 className="mt-4 font-display text-base font-bold text-navy sm:text-lg">
        {title}
      </h3>
      <div className="mt-2 flex-1 text-sm leading-relaxed text-navy/80 sm:text-base">
        {children}
      </div>
    </div>
  );
}

function MetaChip({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-light-teal bg-card px-3.5 py-2 text-sm font-medium text-navy shadow-soft">
      <Icon className="h-4 w-4 flex-none text-teal" strokeWidth={2} />
      {label}
    </span>
  );
}

function BulletList({ items, icon: Icon }: { items: string[]; icon: LucideIcon }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Icon
            className="mt-0.5 h-4.5 w-4.5 flex-none text-teal"
            strokeWidth={2}
          />
          <span className="text-sm leading-relaxed text-navy/80 sm:text-base">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// Compact vertical timeline, wrapped in its own card (rather than floating
// bare in the page) so the phase-by-phase breakdown reads as one contained,
// scannable unit instead of another long stack of text.
function PhaseTimeline({ project }: { project: PortfolioProject }) {
  const phases = getProjectPhases(project);

  return (
    <ol className="flex flex-col">
      {phases.map((phase, index) => {
        const isLast = index === phases.length - 1;
        return (
          <li key={phase.title} className="flex gap-4">
            <div className="flex flex-none flex-col items-center">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-teal bg-card text-xs font-bold text-teal">
                {index + 1}
              </span>
              {!isLast && <span className="w-0.5 flex-1 bg-light-teal" />}
            </div>
            <div className={isLast ? "" : "pb-8"}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-display text-base font-semibold text-navy">
                  {phase.title}
                </h3>
                <span className="rounded-full border border-teal/30 bg-light-teal px-2.5 py-0.5 text-xs font-semibold text-teal">
                  {phase.duration}
                </span>
              </div>
              <p className="mt-1.5 text-sm leading-relaxed text-navy/70 sm:text-base">
                {phase.description}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function PortfolioDetail({ project }: PortfolioDetailProps) {
  const {
    title,
    industry,
    techCategory,
    description,
    problemStatement,
    solution,
    features,
    businessBenefits,
    prosAndCons,
    technologies,
    approach,
    timeline,
    orderValueBand,
    impact,
    results,
  } = project;

  // Overview / Problem / Solution share one grid — only the fields that
  // actually exist on this project get a card, and the column count
  // adapts so two cards don't leave an awkward empty third slot.
  const overviewCards = (
    [
      { icon: ListChecks, title: "Project Overview", content: description },
      problemStatement && { icon: AlertCircle, title: "The Problem", content: problemStatement },
      solution && { icon: Lightbulb, title: "The Solution", content: solution },
    ] as const
  ).filter(Boolean) as { icon: LucideIcon; title: string; content: string }[];
  const overviewCols =
    overviewCards.length >= 3 ? "lg:grid-cols-3" : overviewCards.length === 2 ? "lg:grid-cols-2" : "";

  const hasHighlights = Boolean(features?.length || businessBenefits?.length);
  const highlightCols = features?.length && businessBenefits?.length ? "lg:grid-cols-2" : "";

  return (
    <>
      <div className="border-b border-light-teal bg-light-teal/30 px-6 py-5">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy/70 hover:text-teal"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Back to Portfolio
          </Link>
        </div>
      </div>

      <article className="px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Hero: title + at-a-glance facts alongside the visual, instead
              of a full-width title with the mockup stacked below it. */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block w-fit rounded-full border border-teal/30 bg-light-teal px-3 py-1 text-xs font-semibold text-teal">
                  {industry}
                </span>
                <span className="inline-block w-fit rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy/70">
                  {techCategory}
                </span>
              </div>

              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                {title}
              </h1>

              <div className="mt-6 flex flex-wrap gap-3">
                <MetaChip icon={Clock} label={timeline} />
                <MetaChip icon={DollarSign} label={orderValueBand} />
                <MetaChip icon={Code2} label={techCategory} />
              </div>
            </div>

            <div className="mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <PortfolioMockup project={project} />
            </div>
          </div>

          {/* Overview / Problem / Solution */}
          <div className="mt-16">
            <ZoneHeading title="Project Overview" icon={ListChecks} />
            <div className={`mt-6 grid grid-cols-1 gap-6 ${overviewCols}`}>
              {overviewCards.map((card) => (
                <InfoCard key={card.title} icon={card.icon} title={card.title}>
                  <p>{card.content}</p>
                </InfoCard>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-16">
            <ZoneHeading title="Project Phases & Timeline" icon={Milestone} />
            <div className="mt-6 rounded-2xl border border-light-teal/60 bg-card p-6 shadow-soft sm:p-8">
              {approach && (
                <p className="mb-6 text-sm leading-relaxed text-navy/70 sm:text-base">
                  {approach}
                </p>
              )}
              <p className="mb-6 inline-flex items-center gap-2 rounded-full bg-light-teal/50 px-3.5 py-1.5 text-sm font-medium text-navy">
                <Clock className="h-4 w-4 text-teal" strokeWidth={2} />
                Total engagement length: {timeline}
              </p>
              <PhaseTimeline project={project} />
            </div>
          </div>

          {/* Key Features & Business Benefits */}
          {hasHighlights && (
            <div className="mt-16">
              <ZoneHeading title="Key Highlights" icon={CheckCircle2} />
              <div className={`mt-6 grid grid-cols-1 gap-6 ${highlightCols}`}>
                {features && features.length > 0 && (
                  <InfoCard icon={CheckCircle2} title="Key Features Implemented">
                    <BulletList items={features} icon={CheckCircle2} />
                  </InfoCard>
                )}
                {businessBenefits && businessBenefits.length > 0 && (
                  <InfoCard icon={TrendingUp} title="Business Benefits">
                    <BulletList items={businessBenefits} icon={TrendingUp} />
                  </InfoCard>
                )}
              </div>
            </div>
          )}

          {/* Tech Stack & Investment */}
          <div className="mt-16">
            <ZoneHeading title="Tech Stack & Investment" icon={Code2} />
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {technologies && technologies.length > 0 && (
                <div className="rounded-2xl border border-light-teal/60 bg-card p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/60">
                    Technologies Used
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-light-teal bg-mist px-3.5 py-1.5 text-sm font-medium text-navy"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col justify-center rounded-2xl border border-teal/30 bg-light-teal/40 p-6">
                <span className="text-xs font-semibold uppercase tracking-wide text-teal">
                  Project Investment Range
                </span>
                <span className="mt-1 font-display text-2xl font-bold text-navy">
                  {orderValueBand}
                </span>
                <span className="mt-1 text-xs text-navy/60">
                  A directional range, not a fixed quote — final pricing depends on scope.
                </span>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          {prosAndCons && (
            <div className="mt-16">
              <ZoneHeading title="Pros & Cons" icon={CheckCircle2} />
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-light-teal/60 bg-card p-6 shadow-soft">
                  <p className="flex items-center gap-2.5 text-sm font-semibold text-navy">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-light-teal text-teal">
                      <ThumbsUp className="h-4 w-4" strokeWidth={2} />
                    </span>
                    Pros
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {prosAndCons.pros.map((pro) => (
                      <li
                        key={pro}
                        className="text-sm leading-relaxed text-navy/80"
                      >
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-light-teal/60 bg-card p-6 shadow-soft">
                  <p className="flex items-center gap-2.5 text-sm font-semibold text-navy">
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-navy/5 text-navy/50">
                      <ThumbsDown className="h-4 w-4" strokeWidth={2} />
                    </span>
                    Cons
                  </p>
                  <ul className="mt-4 space-y-2.5">
                    {prosAndCons.cons.map((con) => (
                      <li
                        key={con}
                        className="text-sm leading-relaxed text-navy/80"
                      >
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Results / Outcomes */}
          <div className="mt-16">
            <ZoneHeading title="Results & Outcomes" icon={Trophy} />
            <div className="mt-6 rounded-2xl border border-teal/30 bg-light-teal/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-teal text-white">
                  <Trophy className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                    Business Impact
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold leading-snug text-navy">
                    {impact}
                  </p>
                </div>
              </div>
              {results && (
                <p className="mt-4 text-sm leading-relaxed text-navy/80 sm:text-base sm:pl-14">
                  {results}
                </p>
              )}
            </div>
          </div>

          <div className="mt-14 border-t border-light-teal pt-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-bright-cyan"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Back to Portfolio
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
