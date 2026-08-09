// Shared Tailwind class recipes for the admin panel, built entirely from the
// existing site design tokens (see app/globals.css / tailwind.config.ts) so
// /admin stays visually consistent with the marketing site and follows the
// same light/dark theme — no separate admin design language.

// Text input / textarea / select. Mirrors the field styling used by
// components/ContactForm.tsx.
export const inputClasses = (hasError = false) =>
  `w-full rounded-xl border bg-card px-4 py-2.5 text-navy outline-none placeholder:text-text-disabled transition-[border-color,box-shadow] duration-250 focus:border-primary-blue focus:ring-4 focus:ring-light-cyan/40 ${
    hasError ? "border-error" : "border-light-teal"
  }`;

export const labelClasses = "text-sm font-medium text-navy";

// Primary CTA — the brand gradient pill used across the site.
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-gradient px-6 py-2.5 text-center font-semibold text-white shadow-glow transition-[filter,transform] duration-250 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 disabled:hover:brightness-100";

// Secondary / neutral action.
export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-light-teal bg-card px-4 py-2 text-sm font-medium text-navy transition-colors duration-250 hover:bg-soft-blue disabled:cursor-not-allowed disabled:opacity-60";

// Destructive action.
export const btnDanger =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-error/40 bg-error/10 px-4 py-2 text-sm font-medium text-error transition-colors duration-250 hover:bg-error/20 disabled:cursor-not-allowed disabled:opacity-60";

// Card/surface wrapper matching the site's elevated panels.
export const cardClasses =
  "rounded-2xl border border-light-teal bg-card shadow-soft";
