import type { Config } from "tailwindcss";

// Every color below is `rgb(var(--x) / <alpha-value>)`, not a plain hex —
// this is what lets a single className (e.g. `text-navy`, `border-light-teal/60`)
// keep working with Tailwind's opacity modifiers AND automatically repoint
// to the dark-theme value once `.dark` is on <html>. The actual R G B
// triplets for both themes live in app/globals.css (:root vs .dark).
function withOpacity(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ---------------------------------------------------------------
        // CodeIT brand palette. The legacy token names (navy, teal, etc.)
        // are kept so every existing className in the codebase repoints
        // to the new brand colors automatically — see lib/theme.ts for
        // the mapping notes. New granular tokens are added alongside for
        // the specific brand moments (gradients, focus rings, hover glow)
        // that need a color the old palette didn't have a slot for.
        // ---------------------------------------------------------------
        navy: withOpacity("--color-navy"), // Primary Text (light) -> white (dark)
        "navy-deep": withOpacity("--color-navy-deep"), // dark accent-section bg, both themes
        teal: withOpacity("--color-teal"), // Primary Blue (primary accent/CTA)
        "light-teal": withOpacity("--color-light-teal"), // Border / soft pale
        mist: withOpacity("--color-mist"), // Light Background / Secondary Background
        orange: withOpacity("--color-orange"), // Electric Blue (repurposed accent)

        "primary-blue": withOpacity("--color-primary-blue"),
        "dark-blue": withOpacity("--color-dark-blue"),
        "bright-cyan": withOpacity("--color-bright-cyan"),
        "light-cyan": withOpacity("--color-light-cyan"),
        "electric-blue": withOpacity("--color-electric-blue"),
        "soft-blue": withOpacity("--color-soft-blue"), // Soft Background -- hover fills
        "text-secondary": withOpacity("--color-text-secondary"),
        "text-muted": withOpacity("--color-text-muted"),
        "text-disabled": withOpacity("--color-text-disabled"),

        card: withOpacity("--color-card"), // card/surface background (was bare `white`)
        "card-elevated": withOpacity("--color-card-elevated"),
        section: withOpacity("--color-section"), // regular section background (was bare `white`)

        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",

        background: withOpacity("--background"),
        foreground: withOpacity("--foreground"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"],
      },
      fontSize: {
        "display-hero": [
          "clamp(2.75rem, 3.4vw + 2rem, 6rem)",
          { lineHeight: "0.98", letterSpacing: "-0.03em" },
        ],
        "display-lg": [
          "clamp(2.25rem, 1.8vw + 1.7rem, 3.75rem)",
          { lineHeight: "1.02", letterSpacing: "-0.025em" },
        ],
        "display-md": [
          "clamp(1.875rem, 1vw + 1.5rem, 2.75rem)",
          { lineHeight: "1.05", letterSpacing: "-0.02em" },
        ],
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgb(var(--shadow-ambient) / 0.08)",
        card: "0 8px 30px -8px rgb(var(--shadow-ambient) / 0.12)",
        glow: "0 0 0 3px rgb(var(--color-primary-blue) / 0.16), 0 12px 32px -8px rgb(var(--shadow-ambient) / 0.18)",
        "glow-dark": "0 0 0 3px rgb(var(--color-primary-blue) / 0.28), 0 12px 32px -8px rgb(var(--shadow-ambient) / 0.4)",
        "glow-cyan": "0 0 0 3px rgb(var(--color-bright-cyan) / 0.22), 0 12px 32px -8px rgb(var(--shadow-ambient) / 0.25)",
      },
      scrollMarginTop: {
        header: "5rem",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
        "brand-gradient":
          "linear-gradient(135deg, #22D3FF 0%, #1F6FFF 55%, #1A4DFF 100%)",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
      },
      transitionDuration: {
        250: "250ms",
      },
    },
  },
  plugins: [],
};
export default config;
