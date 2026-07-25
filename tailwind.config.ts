import type { Config } from "tailwindcss";

const config: Config = {
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
        navy: "#102A43", // was #1B2A4A -> brand "Primary Text"
        "navy-deep": "#071326", // was #121D36 -> brand "Dark Navy" (section bg)
        "navy-section": "#0D1B3D", // NEW -> brand "Section Navy" (cards on dark sections)
        teal: "#1F6FFF", // was #16A6A0 -> brand "Primary Blue" (primary accent/CTA)
        "light-teal": "#E3EDF8", // was #D6F0EE -> brand "Border"
        mist: "#F8FBFF", // was #EFF9F8 -> brand "Light Background"
        orange: "#3B82F6", // was #F5821F -> brand "Electric Blue" (repurposed accent)

        "primary-blue": "#1F6FFF",
        "dark-blue": "#1A4DFF",
        "bright-cyan": "#22D3FF",
        "light-cyan": "#67E8FF",
        "electric-blue": "#3B82F6",
        "soft-blue": "#EEF8FF", // brand "Soft Background" -- hover fills
        "text-secondary": "#5B6B83",
        "text-muted": "#8796A8",

        background: "var(--background)",
        foreground: "var(--foreground)",
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
        soft: "0 4px 24px -4px rgba(16, 42, 67, 0.08)",
        card: "0 8px 30px -8px rgba(16, 42, 67, 0.12)",
        glow: "0 0 0 3px rgba(31, 111, 255, 0.16), 0 12px 32px -8px rgba(16, 42, 67, 0.18)",
        "glow-dark": "0 0 0 3px rgba(31, 111, 255, 0.28), 0 12px 32px -8px rgba(0, 0, 0, 0.4)",
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
