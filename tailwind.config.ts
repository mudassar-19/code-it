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
        navy: "#1B2A4A",
        "navy-deep": "#121D36",
        teal: "#16A6A0",
        "light-teal": "#D6F0EE",
        mist: "#EFF9F8",
        orange: "#F5821F",
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
        soft: "0 4px 24px -4px rgba(27, 42, 74, 0.08)",
        card: "0 8px 30px -8px rgba(27, 42, 74, 0.12)",
        glow: "0 0 0 3px rgba(22, 166, 160, 0.18), 0 12px 32px -8px rgba(27, 42, 74, 0.18)",
        "glow-dark": "0 0 0 3px rgba(22, 166, 160, 0.25), 0 12px 32px -8px rgba(0, 0, 0, 0.4)",
      },
      scrollMarginTop: {
        header: "5rem",
      },
      backgroundImage: {
        "dot-grid":
          "radial-gradient(circle, rgba(255,255,255,0.14) 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 18s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
