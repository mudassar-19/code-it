// Central design-system constants for CodeIT.
// Keep in sync with tailwind.config.ts — this file exists for places
// that need raw values (e.g. Three.js materials, inline SVGs, canvas).

export const brand = {
  name: "CodeIT",
  tagline: "Think, Design, Launch.",
} as const;

// CodeIT brand palette. Legacy field names are kept so every existing
// consumer (Three.js materials, ShapeDivider color props) repoints to the
// new brand colors automatically — see tailwind.config.ts for the same
// mapping applied to the Tailwind token system.
export const colors = {
  navy: "#102A43", // Primary Text
  navyDeep: "#071326", // Dark Navy (section bg)
  navySection: "#0D1B3D", // Section Navy (cards on dark sections)
  teal: "#1F6FFF", // Primary Blue
  lightTeal: "#E3EDF8", // Border
  mist: "#F8FBFF", // Light Background
  white: "#FFFFFF",
  orange: "#3B82F6", // Electric Blue (repurposed accent)
  darkBlue: "#1A4DFF",
  brightCyan: "#22D3FF",
  lightCyan: "#67E8FF",
  electricBlue: "#3B82F6",
  softBlue: "#EEF8FF",
  textSecondary: "#5B6B83",
  textMuted: "#8796A8",
} as const;

export const brandGradient =
  "linear-gradient(135deg, #22D3FF 0%, #1F6FFF 55%, #1A4DFF 100%)";

export const fonts = {
  body: "var(--font-inter)",
  display: "var(--font-fraunces)",
} as const;

export const radii = {
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem", // rounded-2xl
  xl: "2rem",
} as const;

export const shadows = {
  soft: "0 4px 24px -4px rgba(16, 42, 67, 0.08)",
  card: "0 8px 30px -8px rgba(16, 42, 67, 0.12)",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

// Plain homepage-section anchors shown in the header/footer. "Services" is
// handled separately as a dropdown/mega-menu (see ServicesDropdown) since it
// links out to the dedicated industry pages rather than a homepage anchor.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Get Started", href: "/#get-started" },
  { label: "Book a Call", href: "/#book-a-call" },
  { label: "Contact", href: "/#contact" },
];
