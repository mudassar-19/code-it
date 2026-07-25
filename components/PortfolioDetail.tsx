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

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <section className="mt-12">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-light-teal text-teal">
          <Icon className="h-4.5 w-4.5" strokeWidth={2} />
        </span>
        <h2 className="font-display text-xl font-bold text-navy sm:text-2xl">
          {title}
        </h2>
      </div>
      <div className="mt-4 sm:pl-12">{children}</div>
    </section>
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

function PhaseTimeline({ project }: { project: PortfolioProject }) {
  const phases = getProjectPhases(project);

  return (
    <ol className="flex flex-col">
      {phases.map((phase, index) => {
        const isLast = index === phases.length - 1;
        return (
          <li key={phase.title} className="flex gap-4">
            <div className="flex flex-none flex-col items-center">
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border-2 border-teal bg-white text-xs font-bold text-teal">
                {index + 1}
              </span>
              {!isLast && <span className="w-0.5 flex-1 bg-light-teal" />}
            </div>
            <div className={isLast ? "" : "pb-8"}>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-display text-base font-semibold text-navy">
                  {phase.title}
                </h3>
                <span className="rounded-full bg-light-teal px-2.5 py-0.5 text-xs font-semibold text-teal">
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

  return (
    <>
      <div className="border-b border-light-teal bg-light-teal/30 px-6 py-5">
        <div className="mx-auto max-w-5xl">
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
        <div className="mx-auto max-w-5xl">
          {/* 1. Project Overview */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block w-fit rounded-full bg-light-teal px-3 py-1 text-xs font-semibold text-teal">
              {industry}
            </span>
            <span className="inline-block w-fit rounded-full bg-navy/5 px-3 py-1 text-xs font-semibold text-navy/70">
              {techCategory}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            {title}
          </h1>

          <div className="mt-8 max-w-2xl sm:max-w-xl">
            <PortfolioMockup project={project} />
          </div>

          <Section title="Project Overview" icon={ListChecks}>
            <p className="text-sm leading-relaxed text-navy/80 sm:text-base">
              {description}
            </p>
          </Section>

          {/* 2. Problem Statement */}
          <Section title="Problem Statement" icon={AlertCircle}>
            <p className="text-sm leading-relaxed text-navy/80 sm:text-base">
              {problemStatement}
            </p>
          </Section>

          {/* 3. Solution */}
          <Section title="Solution" icon={Lightbulb}>
            <p className="text-sm leading-relaxed text-navy/80 sm:text-base">
              {solution}
            </p>
          </Section>

          {/* 4. Project Phases / Timeline */}
          <Section title="Project Phases & Timeline" icon={Milestone}>
            {approach && (
              <p className="mb-6 text-sm leading-relaxed text-navy/70 sm:text-base">
                {approach}
              </p>
            )}
            <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-navy sm:text-base">
              <Clock className="h-4 w-4 text-teal" strokeWidth={2} />
              Total engagement length: {timeline}
            </p>
            <PhaseTimeline project={project} />
          </Section>

          {/* 5. Key Features Implemented */}
          {features && features.length > 0 && (
            <Section title="Key Features Implemented" icon={CheckCircle2}>
              <BulletList items={features} icon={CheckCircle2} />
            </Section>
          )}

          {/* 6. Business Benefits */}
          {businessBenefits && businessBenefits.length > 0 && (
            <Section title="Business Benefits" icon={TrendingUp}>
              <BulletList items={businessBenefits} icon={TrendingUp} />
            </Section>
          )}

          {/* 7. Project Investment */}
          <Section title="Project Investment" icon={DollarSign}>
            <div className="inline-flex flex-col rounded-2xl border border-teal/30 bg-light-teal/40 px-6 py-4">
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
          </Section>

          {/* 8. Technologies Used */}
          {technologies && technologies.length > 0 && (
            <Section title="Technologies Used" icon={Code2}>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-light-teal bg-white px-3.5 py-1.5 text-sm font-medium text-navy"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Section>
          )}

          {/* 9. Pros & Cons */}
          {prosAndCons && (
            <Section title="Pros & Cons" icon={CheckCircle2}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-light-teal/60 bg-white p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                    <ThumbsUp className="h-4 w-4 text-teal" strokeWidth={2} />
                    Pros
                  </p>
                  <ul className="mt-3 space-y-2">
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
                <div className="rounded-xl border border-light-teal/60 bg-white p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-navy">
                    <ThumbsDown className="h-4 w-4 text-navy/50" strokeWidth={2} />
                    Cons
                  </p>
                  <ul className="mt-3 space-y-2">
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
            </Section>
          )}

          {/* 10. Results / Outcomes */}
          <Section title="Results & Outcomes" icon={Trophy}>
            <div className="rounded-2xl border border-teal/30 bg-light-teal/40 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                Business Impact
              </p>
              <p className="mt-2 font-display text-lg font-semibold leading-snug text-navy">
                {impact}
              </p>
              {results && (
                <p className="mt-3 text-sm leading-relaxed text-navy/80 sm:text-base">
                  {results}
                </p>
              )}
            </div>
          </Section>

          <div className="mt-14 border-t border-light-teal pt-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:text-navy"
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
