import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

// Custom branded 404. Rendered inside the root layout, so the Navbar and
// Footer wrap it automatically. App Router returns a real HTTP 404 status for
// not-found.tsx — nothing here overrides that.
export default function NotFound() {
  return (
    <main className="bg-section px-6 pb-24 pt-32">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <span className="eyebrow text-teal">Error 404</span>
        <p className="mt-4 font-display text-display-hero font-semibold leading-none text-navy">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-bold text-navy sm:text-4xl">
          This page wandered off.
        </h1>
        <p className="mt-4 text-lg text-navy/70">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-8 py-4 text-center font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.03] hover:brightness-110 sm:w-auto"
          >
            <Home className="h-4 w-4" strokeWidth={2} />
            Back to Home
          </Link>
          <Link
            href="/portfolio"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary-blue bg-card px-8 py-4 text-center font-semibold text-primary-blue transition-colors duration-250 hover:bg-soft-blue dark:border-white dark:bg-transparent dark:text-white sm:w-auto"
          >
            View Portfolio
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <p className="mt-8 text-sm text-navy/60">
          Or explore our{" "}
          <Link
            href="/#services"
            className="link-underline font-semibold text-teal hover:text-bright-cyan"
          >
            services
          </Link>{" "}
          and{" "}
          <Link
            href="/#contact"
            className="link-underline font-semibold text-teal hover:text-bright-cyan"
          >
            get in touch
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
