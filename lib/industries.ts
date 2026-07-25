export type Industry = {
  slug: string;
  name: string;
  icon: string;
  teaser: string;
};

export const industries: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "Building2",
    teaser:
      "AI virtual tour assistants and predictive lead scoring keep buyers engaged 24/7, while listing apps and smart routing get every inquiry to the right agent fast.",
  },
  {
    slug: "medical",
    name: "Medical",
    icon: "Stethoscope",
    teaser:
      "HIPAA-aware patient portal apps, AI intake chatbots, and smart scheduling work together to cut no-shows and free up front-desk time.",
  },
  {
    slug: "cleaning-janitorial",
    name: "Cleaning & Janitorial Services",
    icon: "SprayCan",
    teaser:
      "Field-service mobile apps keep crews on track with live routing and job status, paired with AI quoting and dispatch automation that win more work.",
  },
  {
    slug: "consultants",
    name: "Consultants",
    icon: "Briefcase",
    teaser:
      "AI-assisted proposal drafting and lead qualification get the right prospects onto your calendar, backed by client portals that make your expertise easy to showcase.",
  },
  {
    slug: "food-drinks",
    name: "Food & Drinks",
    icon: "UtensilsCrossed",
    teaser:
      "Custom ordering apps, AI menu chatbots, and computer-vision inventory tracking keep tables full, orders accurate, and reviews rolling in.",
  },
  {
    slug: "hotels-hospitality",
    name: "Hotels & Hospitality",
    icon: "BedDouble",
    teaser:
      "AI concierge chatbots and guest mobile apps handle requests and digital check-in around the clock, while dynamic pricing keeps every room booked at the right rate.",
  },
  {
    slug: "travel",
    name: "Travel",
    icon: "Plane",
    teaser:
      "Itinerary-builder apps and multi-language AI chat keep travelers informed day or night, with automated reminders that keep bookings and payments on track.",
  },
  {
    slug: "high-security-websites",
    name: "High Security Websites",
    icon: "ShieldCheck",
    teaser:
      "Hardened web builds, AI-based anomaly detection, and cloud infrastructure engineered for uptime and compliance — built for businesses that can't afford downtime or a breach.",
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
