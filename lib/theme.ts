// Central design-system constants for CodeIT.
// Keep in sync with tailwind.config.ts — this file exists for places
// that need raw values (e.g. Three.js materials, inline SVGs, canvas).

export const brand = {
  name: "CodeIT",
  tagline: "Think, Design, Launch.",
} as const;

export const colors = {
  navy: "#1B2A4A",
  navyDeep: "#121D36",
  teal: "#16A6A0",
  lightTeal: "#D6F0EE",
  mist: "#EFF9F8",
  white: "#FFFFFF",
  orange: "#F5821F",
} as const;

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
  soft: "0 4px 24px -4px rgba(27, 42, 74, 0.08)",
  card: "0 8px 30px -8px rgba(27, 42, 74, 0.12)",
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
