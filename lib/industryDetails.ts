// Shared pool of service offerings, spanning the full range of what our
// technical team builds — not just automation. Each industry's `services`
// list below pulls from and rephrases a relevant subset of these for its
// own context — kept here as the canonical reference so new industries
// stay consistent.
export const servicePool = [
  "Custom web application development, including AI-powered web apps",
  "iOS, Android, and cross-platform mobile app development",
  "Full-stack custom software development",
  "AI & machine learning solutions",
  "Computer vision applications",
  "AI agents & conversational chatbots",
  "Business process automation",
  "Browser extension development",
  "API development & third-party integrations",
  "Cloud infrastructure & DevOps",
  "Online booking & scheduling systems",
  "CRM & lead automation",
  "Review & reputation management",
  "Automated follow-up & reminder systems",
  "Custom ordering & booking platforms",
  "Secure client portals",
  "Property & listing showcase tools",
  "Loyalty & rewards automation",
  "AI-powered lead qualification & scoring",
  "Document & intake automation",
] as const;

export type CaseStudy = {
  title: string;
  result: string;
  summary: string;
};

export type IndustryDetail = {
  slug: string;
  positioning: string;
  challenges: string[];
  services: string[];
  innovativeIdeas: string[];
  caseStudy: CaseStudy;
};

export const industryDetails: Record<string, IndustryDetail> = {
  "real-estate": {
    slug: "real-estate",
    positioning:
      "Turn every listing into a 24/7 lead-generating, buyer-qualifying machine.",
    challenges: [
      "Leads go cold within minutes if an agent can't respond fast enough",
      "Manually following up on every listing inquiry and open-house lead eats up hours agents don't have",
      "Buyers expect instant answers about listings, even outside business hours",
    ],
    services: [
      "Custom property listing web and mobile apps with AI-powered search, filtering, and saved-listing alerts",
      "AI virtual tour assistants that answer buyer questions and book showings around the clock",
      "Computer-vision photo enhancement and virtual staging that make every listing photo-ready in seconds",
      "CRM and lead-routing automation that gets new inquiries in front of the right agent instantly",
      "Custom lead-scoring ML models that flag which buyers and sellers are most likely to close",
      "Secure API integrations with MLS feeds, e-signature tools, and mortgage pre-qualification services",
      "Review & reputation management to build trust with future clients",
    ],
    innovativeIdeas: [
      "AI virtual tour assistant that answers buyer questions 24/7",
      "Predictive lead scoring that flags which inquiries are most likely to close",
      "A branded buyer/seller mobile app with push alerts the moment a matching listing hits the market",
    ],
    caseStudy: {
      title: "Regional Realty Group",
      result: "43% faster lead response time",
      summary:
        "Automated lead routing and AI chat cut response time from hours to under two minutes, lifting showing bookings.",
    },
  },
  medical: {
    slug: "medical",
    positioning:
      "Fewer no-shows, faster intake, and a front desk that isn't buried in phone calls.",
    challenges: [
      "No-shows and late cancellations quietly drain revenue every week",
      "Front-desk staff spend hours on repetitive scheduling and intake calls",
      "Patients expect quick answers and easy booking, not hold music",
    ],
    services: [
      "HIPAA-aware patient portal web and mobile apps for scheduling, records, and secure messaging",
      "AI symptom-intake chatbots that triage patients and pre-fill forms before they arrive",
      "Computer-vision-assisted intake tools that digitize insurance cards, IDs, and paperwork on the spot",
      "Automated appointment reminders and recall campaigns that cut no-shows and fill last-minute openings",
      "Custom full-stack practice-management software tailored to multi-location clinics",
      "Secure API integrations with EHR systems, labs, and insurance verification services",
      "Cloud infrastructure built for compliance-grade uptime, backups, and audit logging",
    ],
    innovativeIdeas: [
      "AI-powered no-show prediction and automated rebooking",
      "Conversational intake assistant that pre-fills patient forms before arrival",
      "A patient mobile app with computer-vision-assisted photo triage, securely routed to staff for review",
    ],
    caseStudy: {
      title: "Family Wellness Clinic",
      result: "31% drop in no-shows",
      summary:
        "Automated reminders paired with AI rebooking filled cancellations same-day instead of leaving gaps in the schedule.",
    },
  },
  "cleaning-janitorial": {
    slug: "cleaning-janitorial",
    positioning:
      "Book more jobs, dispatch faster, and stop losing quotes to slow follow-up.",
    challenges: [
      "Quote requests go unanswered while crews are out on jobs",
      "Scheduling and dispatch gets juggled manually across texts and phone calls",
      "Getting reviews and referrals after a job is easy to forget",
    ],
    services: [
      "Field-service mobile apps that give crews routes, checklists, and job status in real time",
      "Route and dispatch optimization automation that gets more jobs done with less windshield time",
      "Client self-service booking portals for instant quotes and recurring-service scheduling",
      "AI quote-generation chatbots that size up a job and price it before a human ever calls back",
      "CRM automation that turns one-time jobs into standing recurring contracts",
      "Custom API integrations with payment processors and accounting software for seamless invoicing",
    ],
    innovativeIdeas: [
      "Instant AI quote estimator based on property size and service type",
      "A crew mobile app with live GPS check-in/check-out and photo-verified job completion",
      "Review-to-referral automation that turns a 5-star review into a referral request",
    ],
    caseStudy: {
      title: "ShineRight Commercial Cleaning",
      result: "2x more recurring contracts",
      summary:
        "Automated quote follow-up and recurring-service reminders turned one-off jobs into standing accounts.",
    },
  },
  consultants: {
    slug: "consultants",
    positioning:
      "Turn expertise into a pipeline that qualifies and books itself.",
    challenges: [
      "Inbound interest doesn't always turn into booked discovery calls",
      "Following up on every proposal manually means good leads slip through",
      "Staying visible as an expert takes more content than most consultants have time for",
    ],
    services: [
      "Branded client portal software for sharing proposals, deliverables, and engagement updates",
      "AI-powered proposal and document generation that drafts a strong first pass from your notes",
      "CRM and calendar automation that keeps every prospect and client relationship moving forward",
      "Custom branded mobile apps that give clients on-the-go access to your services",
      "AI-powered lead qualification so only serious prospects reach your calendar",
      "Secure API integrations connecting your CRM, calendar, and billing tools into one workflow",
    ],
    innovativeIdeas: [
      "AI qualification assistant that scores inbound leads before they hit your calendar",
      "AI-assisted proposal and document generation that drafts a first pass from discovery-call notes",
      "A branded client portal that turns one-off projects into an ongoing retainer relationship",
    ],
    caseStudy: {
      title: "Meridian Advisory Partners",
      result: "2.4x more discovery calls booked",
      summary:
        "Lead qualification and automated follow-up filled the calendar with better-fit prospects.",
    },
  },
  "food-drinks": {
    slug: "food-drinks",
    positioning: "Fill more tables, earn more reviews, and stay top of feed.",
    challenges: [
      "No-show reservations cost real revenue on busy nights",
      "Getting happy customers to actually leave a review rarely happens on its own",
      "Standing out on social media takes constant content most teams don't have time for",
    ],
    services: [
      "Custom ordering and reservation web and mobile apps for pickup, delivery, and dine-in",
      "AI-powered menu and upsell chatbots that recommend pairings and boost average order size",
      "Computer-vision inventory tracking that flags low stock and reduces waste automatically",
      "Loyalty and rewards automation that turns first-time guests into regulars",
      "Review & reputation management to keep your rating working for you",
      "Secure API integrations with POS systems, delivery platforms, and payment processors",
    ],
    innovativeIdeas: [
      "AI-driven review-to-loyalty automation",
      "Automated “we miss you” win-back offers for guests who haven't ordered in a while",
      "AI chatbot that takes orders and reservations directly from social media messages",
    ],
    caseStudy: {
      title: "Coastal Table Restaurant Group",
      result: "58% more reviews collected",
      summary:
        "Automated post-visit review requests, paired with a loyalty flow, turned regulars into repeat promoters.",
    },
  },
  "hotels-hospitality": {
    slug: "hotels-hospitality",
    positioning:
      "Make every stay feel personal — before, during, and after checkout.",
    challenges: [
      "Guests expect instant answers, even when the front desk is busy",
      "Abandoned bookings mean lost revenue that's rarely followed up on",
      "Collecting reviews and repeat bookings after checkout is often left to chance",
    ],
    services: [
      "Booking engine web and mobile apps with real-time availability and abandoned-booking recovery",
      "AI concierge chatbots that handle guest requests and local recommendations 24/7",
      "Dynamic pricing automation that adjusts rates to demand without manual spreadsheet work",
      "AI-powered guest-review analysis that surfaces trends across every platform in one dashboard",
      "Custom guest mobile apps for digital check-in, room requests, and mobile keys",
      "Cloud infrastructure and API integrations connecting your PMS, channel manager, and CRM",
    ],
    innovativeIdeas: [
      "AI-powered upsell prompts during booking that suggest room upgrades and add-on experiences",
      "Dynamic pricing automation driven by demand, seasonality, and local events",
      "A guest mobile app with a digital room key, in-stay chat, and one-tap service requests",
    ],
    caseStudy: {
      title: "Bayview Boutique Hotel",
      result: "27% increase in repeat bookings",
      summary:
        "Automated guest messaging and a loyalty follow-up flow brought more guests back for a second stay.",
    },
  },
  travel: {
    slug: "travel",
    positioning:
      "Keep travelers booked, informed, and coming back for the next trip.",
    challenges: [
      "Answering itinerary and booking questions around the clock isn't realistic for a small team",
      "Payment and booking reminders often fall through the cracks",
      "Turning a great trip into a repeat booking rarely happens without a nudge",
    ],
    services: [
      "Itinerary-builder web and mobile apps that keep travelers organized before and during a trip",
      "AI travel-recommendation agents that suggest destinations, add-ons, and rebooking options",
      "Booking and payment-reminder automation that keeps deposits and balances on track",
      "Multi-language AI chatbot support for itinerary questions, day or night",
      "Custom API integrations with airlines, hotels, and payment gateways for real-time booking data",
      "CRM automation that manages every inquiry from first contact to confirmed trip",
    ],
    innovativeIdeas: [
      "AI travel assistant that answers itinerary questions and rebooking requests instantly",
      "A multi-language chatbot that handles itinerary questions for international travelers around the clock",
      "An itinerary-builder mobile app that keeps documents, bookings, and day-by-day plans in one place",
    ],
    caseStudy: {
      title: "Horizon Travel Co.",
      result: "35% fewer abandoned bookings",
      summary:
        "Automated payment reminders and an AI travel assistant kept bookings moving from inquiry to confirmed trip.",
    },
  },
  "high-security-websites": {
    slug: "high-security-websites",
    positioning:
      "Hardened, high-trust web infrastructure for businesses that can't afford downtime or a breach.",
    challenges: [
      "Standard website builds don't meet the security bar for regulated or high-risk industries",
      "Downtime or a breach can mean real financial and reputational damage",
      "Manual monitoring can't catch every threat before it becomes a problem",
    ],
    services: [
      "Hardened, custom web application development built to withstand real-world attack surfaces",
      "Custom authentication and access-control systems, including MFA and role-based permissions",
      "AI-based anomaly and fraud detection that flags suspicious activity before it becomes a breach",
      "Secure API integrations and third-party connections with careful data-handling practices throughout",
      "Compliance-focused custom software for industries with strict regulatory requirements (HIPAA, PCI, SOC 2)",
      "Cloud infrastructure and DevOps practices built around uptime, monitoring, and rapid incident response",
    ],
    innovativeIdeas: [
      "Adaptive access-control that automatically steps up authentication when risk signals spike",
      "Automated compliance documentation that keeps audit trails current without manual upkeep",
      "Secure AI chat intake that qualifies leads without exposing sensitive data to third-party tools",
    ],
    caseStudy: {
      title: "Sentinel Financial Services",
      result: "Zero downtime across 18 months",
      summary:
        "A hardened web build with automated monitoring gave a compliance-sensitive client a site they could trust.",
    },
  },
};

export function getIndustryDetail(slug: string): IndustryDetail | undefined {
  return industryDetails[slug];
}
