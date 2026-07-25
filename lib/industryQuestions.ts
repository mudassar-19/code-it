// Default industry-specific question sets shown in step 2 of the
// "Get Started" form, in addition to the common fields every industry shares
// (full name, email, phone, business name, description). Keyed by the same
// slugs used in lib/industries.ts.

export type IndustryQuestion = {
  id: string;
  label: string;
  type: "text" | "select";
  options?: string[];
  placeholder?: string;
};

export const industryQuestions: Record<string, IndustryQuestion[]> = {
  "real-estate": [
    {
      id: "activeListings",
      label: "How many active listings do you manage?",
      type: "text",
      placeholder: "e.g. 12",
    },
    {
      id: "clientFocus",
      label: "Do you work with buyers, sellers, or both?",
      type: "select",
      options: ["Buyers", "Sellers", "Both"],
    },
    {
      id: "currentCrm",
      label: "What CRM or software are you currently using, if any?",
      type: "text",
      placeholder: "e.g. Follow Up Boss, spreadsheets, none",
    },
  ],
  medical: [
    {
      id: "hasOnlineBooking",
      label: "Do you currently use an online booking system?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      id: "weeklyPatients",
      label: "Approximately how many patients do you see per week?",
      type: "text",
      placeholder: "e.g. 150",
    },
    {
      id: "schedulingChallenge",
      label: "What's your biggest scheduling or intake challenge?",
      type: "text",
      placeholder: "e.g. too many no-shows, phone tag",
    },
  ],
  "cleaning-janitorial": [
    {
      id: "locationsServiced",
      label: "How many locations do you service?",
      type: "text",
      placeholder: "e.g. 8",
    },
    {
      id: "contractType",
      label: "Do you offer recurring contracts, one-time jobs, or both?",
      type: "select",
      options: ["Recurring contracts", "One-time jobs", "Both"],
    },
    {
      id: "quoteProcess",
      label: "How do you currently handle quote requests?",
      type: "text",
      placeholder: "e.g. phone calls, a contact form, texts",
    },
  ],
  consultants: [
    {
      id: "primaryOffering",
      label: "What's your primary service offering?",
      type: "text",
      placeholder: "e.g. financial advisory, marketing strategy",
    },
    {
      id: "leadSource",
      label: "How do most new clients currently find you?",
      type: "text",
      placeholder: "e.g. referrals, LinkedIn, cold outreach",
    },
    {
      id: "usesCrm",
      label: "Do you currently use a CRM to track leads?",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
  "food-drinks": [
    {
      id: "establishmentType",
      label: "What type of establishment do you run?",
      type: "select",
      options: ["Restaurant", "Café", "Bar", "Other"],
    },
    {
      id: "takesOnlineReservations",
      label: "Do you currently take reservations online?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      id: "reviewCollection",
      label: "How do you currently collect customer reviews?",
      type: "text",
      placeholder: "e.g. we don't, ask in person, follow-up texts",
    },
  ],
  "hotels-hospitality": [
    {
      id: "roomCount",
      label: "How many rooms or units do you manage?",
      type: "text",
      placeholder: "e.g. 40",
    },
    {
      id: "usesPms",
      label: "Do you use a property management system (PMS)?",
      type: "select",
      options: ["Yes", "No"],
    },
    {
      id: "guestCommsChallenge",
      label: "What's your biggest guest-communication challenge?",
      type: "text",
      placeholder: "e.g. slow response times, missed pre-arrival info",
    },
  ],
  travel: [
    {
      id: "tripType",
      label: "Do you sell packaged trips, custom itineraries, or both?",
      type: "select",
      options: ["Packaged trips", "Custom itineraries", "Both"],
    },
    {
      id: "travelerContactMethod",
      label: "How do travelers currently reach you with questions?",
      type: "text",
      placeholder: "e.g. phone, email, WhatsApp",
    },
    {
      id: "bookingSystem",
      label: "What booking or payment system do you currently use, if any?",
      type: "text",
      placeholder: "e.g. none, a booking platform, invoices",
    },
  ],
  "high-security-websites": [
    {
      id: "complianceRequirements",
      label:
        "What industry or compliance requirements apply to you? (e.g. HIPAA, PCI, SOC 2)",
      type: "text",
      placeholder: "e.g. HIPAA",
    },
    {
      id: "siteStatus",
      label: "Do you currently have a website, or is this a new build?",
      type: "select",
      options: ["Existing site", "New build"],
    },
    {
      id: "securityConcern",
      label: "What's your biggest security concern right now?",
      type: "text",
      placeholder: "e.g. data breaches, downtime, compliance audits",
    },
  ],
};

export function getIndustryQuestions(slug: string): IndustryQuestion[] {
  return industryQuestions[slug] ?? [];
}
