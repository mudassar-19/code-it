// ---------------------------------------------------------------------------
// PLACEHOLDER / DUMMY DATA — PORTFOLIO DATASET
// ---------------------------------------------------------------------------
// `PortfolioProject` and `portfolioProjects` (built from the eight
// per-industry arrays below) cover all 8 industries from lib/industries.ts:
// Real Estate, Medical, Cleaning & Janitorial Services, Consultants, Food &
// Drinks, Hotels & Hospitality, Travel, and High Security Websites.
//
// This is illustrative, dummy content: no real client names, figures, or
// work product. Every project, description, and outcome is a realistic but
// fabricated example meant to demonstrate the kind of work CodeIT
// does and the level of detail a real case study would include. Each
// project's `slug` is the route param for its detail page
// (/app/portfolio/[slug]/page.tsx) — every slug below is unique. Replace
// with real client projects (cleared for publication) once available.
// ---------------------------------------------------------------------------

/** Controlled vocabulary for the kind of work a portfolio project represents. */
export type PortfolioTechCategory =
  | "Web App"
  | "Mobile App"
  | "AI/ML"
  | "Computer Vision"
  | "Automation"
  | "Chatbot"
  | "Custom Software";

/**
 * Deal-size band shown on a project, instead of an exact number — keeps the
 * dataset directionally honest without implying false precision on
 * fabricated figures.
 */
export type PortfolioOrderValueBand =
  | "$500-$2,500"
  | "$2,500-$5,000"
  | "$5,000-$7,000"
  | "$7,000-$10,000"
  | "$10,000-$25,000"
  | "$25,000+";

export type PortfolioProjectImage = {
  /** Lucide icon key (see lib/industryIcons.ts) rendered as a faint watermark over the gradient. */
  icon: string;
  /**
   * One of a small rotation of brand-palette (teal/navy) gradient
   * placeholders. No real project photography exists for this dummy data.
   */
  gradient: "teal-to-navy" | "navy-to-teal" | "light-teal-to-navy";
};

export type PortfolioProjectProsAndCons = {
  pros: string[];
  cons: string[];
};

/** One step in a project's delivery timeline, e.g. "Week 1-2: Discovery & Planning". */
export type PortfolioPhase = {
  title: string;
  duration: string;
  description: string;
};

/**
 * Which reusable abstract UI mockup (see components/mockups) best represents
 * what a project actually does — resolved deterministically from its title,
 * industry, and techCategory rather than stored per project, so every
 * project (old or new) automatically gets a sensibly-matched visual.
 */
export type PortfolioMockupStyle =
  | "listing-grid"
  | "booking-calendar"
  | "chat-support"
  | "dashboard-analytics"
  | "ecommerce-ordering"
  | "portal-document";

export type PortfolioProject = {
  slug: string;
  title: string;
  /** Matches an industry `name` from lib/industries.ts. */
  industry: string;
  techCategory: PortfolioTechCategory;
  /** 3-5 sentence description: what was built, the problem it solved, and the approach taken. */
  description: string;
  /** One-line, outcomes-framed statement of why this mattered to the client's business. */
  impact: string;
  timeline: string;
  orderValueBand: PortfolioOrderValueBand;
  image: PortfolioProjectImage;

  // -------------------------------------------------------------------------
  // Optional deep-dive fields. Populated for the Real Estate, Medical, and
  // Cleaning & Janitorial Services projects; left undefined elsewhere so
  // the other industries continue to type-check without needing the same
  // level of detail yet.
  // -------------------------------------------------------------------------
  /** 2-3 sentences: the business problem that existed before this project. */
  problemStatement?: string;
  /** 2-3 sentences: what was built and why this approach was chosen. */
  solution?: string;
  /** 4-6 short bullet points on what the build does. */
  features?: string[];
  /** 3-4 outcome-focused bullet points, distinct from the one-line `impact`. */
  businessBenefits?: string[];
  /** Honest trade-offs alongside the strengths — not a pure feature list. */
  prosAndCons?: PortfolioProjectProsAndCons;
  /** Realistic technology names matching the project's techCategory. */
  technologies?: string[];
  /** 2-3 sentences: how the team worked — discovery, build, testing, deployment. */
  approach?: string;
  /** 2-3 sentences, outcome-focused, consistent with `impact`. */
  results?: string;
};

export const realEstateProjects: PortfolioProject[] = [
  {
    slug: "ai-listing-assistant-multi-agent-brokerage",
    title: "AI-Powered Listing Assistant for a Multi-Agent Real Estate Brokerage",
    industry: "Real Estate",
    techCategory: "Chatbot",
    description:
      "Built a conversational AI assistant embedded directly on the brokerage's listing pages to answer buyer questions about square footage, HOA fees, school zones, and showing availability in real time. The assistant was trained on each listing's data feed so answers stayed accurate as properties came on and off market, and it handed off warm leads to the right agent with full conversation context attached. Previously, agents were fielding the same repetitive questions by phone during evenings and weekends, pulling their attention away from active negotiations. The rollout also included a lightweight agent dashboard for reviewing assistant conversations and adjusting canned responses without engineering support.",
    impact:
      "Freed agents from an estimated 10+ hours per week of repetitive phone inquiries, letting the team take on more active listings without adding headcount.",
    problemStatement:
      "Agents were fielding repetitive buyer questions — square footage, HOA fees, school zones, showing availability — by phone during evenings and weekends, pulling their attention away from active negotiations. Response times outside business hours were inconsistent, and some inquiries went unanswered until the next day.",
    solution:
      "We built a conversational AI assistant trained directly on the brokerage's live listing feed and embedded it on every listing page, so it could answer common buyer questions accurately and hand off qualified leads to the right agent with full context attached.",
    features: [
      "Natural-language Q&A trained on live listing data (price, sqft, HOA, school zones)",
      "Automatic handoff to the assigned agent with full conversation history",
      "Agent dashboard for reviewing conversations and editing canned responses",
      "Showing-availability lookup synced to each agent's calendar",
      "After-hours coverage with no added staffing",
    ],
    businessBenefits: [
      "Freed agents from repetitive phone inquiries during evenings and weekends",
      "Let the team take on more active listings without adding headcount",
      "Delivered a faster, more consistent buyer experience across every listing",
    ],
    prosAndCons: {
      pros: [
        "No-code dashboard means non-technical staff can tune responses",
        "Scales to new listings automatically as the data feed updates",
        "Consistent answers across every agent and listing",
      ],
      cons: [
        "Requires a clean, structured listing data feed to stay accurate",
        "Best suited for brokerages with 5+ active agents to justify the setup",
      ],
    },
    technologies: ["Next.js", "OpenAI API", "Node.js", "PostgreSQL", "Twilio"],
    approach:
      "We began with a two-week discovery phase mapping the brokerage's most common buyer questions and listing data structure, then built and trained the assistant against a staging feed before piloting it on a subset of listings. After a feedback loop with agents, we rolled it out brokerage-wide and handed over the dashboard with a short training session.",
    results:
      "The assistant now handles the majority of routine buyer questions without agent involvement, freeing an estimated 10+ hours per week of phone time. Agents have used that time to take on more active listings without adding headcount.",
    timeline: "8 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Building2", gradient: "teal-to-navy" },
  },
  {
    slug: "property-management-portal-regional-landlord",
    title: "Custom Property Management Portal for a Regional Landlord Group",
    industry: "Real Estate",
    techCategory: "Custom Software",
    description:
      "Designed and built a centralized web portal for a landlord group managing residential units across multiple properties, replacing a patchwork of spreadsheets and email threads. The system tracks lease terms, rent collection status, maintenance requests, and vendor assignments in one place, with role-based access so property managers and owners see only what's relevant to them. We integrated the portal with the client's existing accounting software so rent payments and expenses reconcile automatically instead of being re-entered by hand. The build prioritized a clean, low-friction interface since the team managing it day-to-day had no technical background.",
    impact:
      "Consolidated four disconnected tracking systems into one, cutting the time spent reconciling rent and maintenance records by an estimated 60% each month.",
    problemStatement:
      "The landlord group was managing leases, rent status, maintenance requests, and vendor assignments across a patchwork of spreadsheets and email threads. Nothing was centralized, so property managers and owners often worked from different, out-of-sync versions of the same information.",
    solution:
      "We designed a centralized web portal with role-based access so managers and owners each see only what's relevant to them, and integrated it with the client's existing accounting software so payments and expenses reconcile automatically.",
    features: [
      "Centralized lease, rent, and maintenance tracking per property",
      "Role-based dashboards for owners, managers, and vendors",
      "Automatic sync with existing accounting software",
      "Maintenance request routing to assigned vendors",
      "Audit trail of every status change and payment",
    ],
    businessBenefits: [
      "Replaced four disconnected tracking systems with one source of truth",
      "Cut monthly reconciliation time by an estimated 60%",
      "Gave owners real-time visibility into their properties without calling the office",
    ],
    prosAndCons: {
      pros: [
        "Single system of record eliminates version-conflict spreadsheets",
        "Accounting integration removes manual double-entry",
        "Scales cleanly as new properties are added",
      ],
      cons: [
        "Initial data migration from spreadsheets took real coordination",
        "Full benefit depends on staff consistently logging updates in the portal, not side channels",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js", "QuickBooks API"],
    approach:
      "We spent the first two weeks mapping every field across the client's spreadsheets and email-based workflow before designing the data model. The portal was built and rolled out property-by-property, starting with one building as a pilot, with the accounting integration validated against a full reconciliation cycle before going live everywhere.",
    results:
      "Rent, maintenance, and vendor records now live in one place instead of four. Reconciliation that used to take days each month now takes a fraction of the time, and owners get real-time visibility without calling the office.",
    timeline: "4 months",
    orderValueBand: "$25,000+",
    image: { icon: "Building2", gradient: "navy-to-teal" },
  },
  {
    slug: "luxury-buyer-network-mobile-app",
    title: "Cross-Platform Mobile App for a Luxury Home Buyer's Network",
    industry: "Real Estate",
    techCategory: "Mobile App",
    description:
      "Developed an iOS and Android app for a network connecting high-net-worth buyers with off-market luxury listings before they hit public sites. The app supports curated listing feeds per buyer profile, in-app messaging with agents, and secure document sharing for offers and disclosures. Push notifications alert buyers the moment a matching property becomes available, which was the client's core value proposition but previously ran through manual email blasts. We built it cross-platform from a single codebase to keep the client's ongoing maintenance costs manageable as the buyer network grows.",
    impact:
      "Cut the time between a new listing going live and reaching qualified buyers from days to minutes, directly supporting the client's off-market speed advantage.",
    problemStatement:
      "The buyer network's core value — surfacing off-market luxury listings before they went public — was undercut by a manual email-blast process that was slow and impossible to personalize per buyer.",
    solution:
      "We built a single cross-platform iOS and Android app with curated per-buyer listing feeds, in-app agent messaging, and secure document sharing, so a new listing could reach the right buyers the moment it became available.",
    features: [
      "Curated listing feed personalized to each buyer's profile",
      "Push notifications the instant a matching property is added",
      "In-app messaging directly with the assigned agent",
      "Secure document sharing for offers and disclosures",
      "Cross-platform codebase for iOS and Android",
    ],
    businessBenefits: [
      "Cut the time between a new listing and reaching qualified buyers from days to minutes",
      "Directly reinforced the client's off-market speed advantage",
      "Kept ongoing maintenance costs manageable via a single shared codebase",
    ],
    prosAndCons: {
      pros: [
        "One codebase for both platforms keeps long-term maintenance costs down",
        "Push notifications create genuine urgency for time-sensitive listings",
        "Secure document sharing removes a slow, email-based bottleneck",
      ],
      cons: [
        "Requires buyers to install and keep a dedicated app, unlike a web link",
        "Notification value depends on the network maintaining accurate buyer preference data",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase", "Node.js", "TypeScript"],
    approach:
      "Discovery focused on mapping the founder's existing manual matching process into rules the app could apply automatically. We built the buyer-facing app and agent-side listing tools in parallel, tested the notification and matching logic against historical listing data, then rolled the app out to a pilot group of buyers before opening it to the full network.",
    results:
      "New off-market listings now reach matched buyers within minutes of being added instead of days later through an email blast, giving the network a faster, more personal buying experience that matches its premium positioning.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "Building2", gradient: "light-teal-to-navy" },
  },
  {
    slug: "cv-photo-enhancement-listing-photographer",
    title: "Computer-Vision Photo Enhancement Pipeline for a High-Volume Listing Photographer",
    industry: "Real Estate",
    techCategory: "Computer Vision",
    description:
      "Built an automated image-processing pipeline for a real estate photography studio shooting 40+ properties a week, where manual editing had become the bottleneck between shoot day and listing day. The system uses computer vision to correct exposure and perspective distortion, remove minor clutter, and enhance sky and lighting consistently across an entire shoot in one batch. Photographers upload raw images through a simple web interface and receive listing-ready photos back within minutes instead of the prior next-day turnaround from a manual editing service. The pipeline flags any images needing human review rather than attempting a fully automated finish on every shot.",
    impact:
      "Cut average photo turnaround from next-day to under 30 minutes, letting listings go live the same day they're shot.",
    problemStatement:
      "Manual photo editing had become the bottleneck between shoot day and listing day for a studio shooting 40+ properties a week, with a next-day turnaround from a manual editing service slowing down every listing.",
    solution:
      "We built an automated computer-vision pipeline that corrects exposure and perspective, removes minor clutter, and evens out sky and lighting across an entire shoot in one batch, flagging only the images that genuinely need a human look.",
    features: [
      "Batch exposure and perspective correction across an entire shoot",
      "Automated clutter removal and sky/lighting consistency",
      "Simple web upload interface for photographers",
      "Automatic flagging of images needing human review",
      "Listing-ready output delivered within minutes",
    ],
    businessBenefits: [
      "Cut average photo turnaround from next-day to under 30 minutes",
      "Let listings go live the same day they're shot",
      "Reduced the studio's dependency on a third-party manual editing service",
    ],
    prosAndCons: {
      pros: [
        "Dramatically faster turnaround without adding editing staff",
        "Consistent look across an entire shoot, not photo-by-photo",
        "Human review flag keeps a quality checkpoint in place",
      ],
      cons: [
        "Unusual lighting conditions, like very dark interiors, still benefit from manual review",
        "Best value shows up at higher shoot volume — light users won't see the same ROI",
      ],
    },
    technologies: ["Python", "OpenCV", "PyTorch", "AWS S3", "FastAPI"],
    approach:
      "We started by collecting a large sample of the studio's past raw-to-edited photo pairs to understand their exact editing style, then built and tuned the pipeline against that style rather than a generic preset. After a pilot run alongside the studio's existing manual process, we compared outputs side-by-side before cutting over fully.",
    results:
      "Photo turnaround dropped from a next-day service to under 30 minutes, letting listings go live the same day they're shot instead of waiting on external editing capacity.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Building2", gradient: "teal-to-navy" },
  },
  {
    slug: "predictive-lead-scoring-realty-franchise",
    title: "Predictive Lead-Scoring Model for a Growing Realty Franchise",
    industry: "Real Estate",
    techCategory: "AI/ML",
    description:
      "Built a custom machine learning model that scores inbound buyer and seller leads based on engagement patterns, listing price range, and historical conversion data from the franchise's CRM. The model runs automatically on every new lead and surfaces a priority score directly inside the CRM agents already use, so no new tool was added to their workflow. We trained and validated the model against two years of the client's historical lead data before rollout, then tuned it with agent feedback during a pilot phase. The goal was to help agents spend their limited follow-up time on the leads statistically most likely to close, rather than working every lead with equal effort.",
    impact:
      "Helped agents prioritize the top 20% of leads that historically accounted for the majority of closings, improving average follow-up response time on high-value leads.",
    problemStatement:
      "Agents were working every inbound lead with roughly equal effort, despite the franchise's own historical data showing that a relatively small share of leads accounted for most closings.",
    solution:
      "We built a machine learning model trained on two years of the franchise's CRM history that scores every new lead and surfaces the priority directly inside the CRM agents already use, so no new tool was added to their workflow.",
    features: [
      "Lead scoring based on engagement, price range, and historical conversion data",
      "Priority score surfaced directly inside the existing CRM",
      "Model retrained periodically as new closing data comes in",
      "Pilot-phase tuning based on direct agent feedback",
      "No new software for agents to learn",
    ],
    businessBenefits: [
      "Helped agents focus limited follow-up time on statistically higher-value leads",
      "Improved response time on the leads most likely to close",
      "Delivered without disrupting the CRM agents already used daily",
    ],
    prosAndCons: {
      pros: [
        "Fits directly into the existing CRM workflow, no adoption curve",
        "Model improves over time as more closing data feeds back in",
        "Validated against two years of real historical data before rollout",
      ],
      cons: [
        "Score accuracy depends on consistent CRM data entry across agents",
        "Needs periodic retraining to stay accurate as market conditions shift",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI", "CRM API integration"],
    approach:
      "We trained and validated the model against two years of historical lead and closing data before writing any integration code, then ran a pilot with a small group of agents to tune the score against their real-world judgment. Feedback from that pilot shaped the final scoring thresholds before the model rolled out franchise-wide.",
    results:
      "Agents now prioritize the leads statistically most likely to close instead of spreading equal effort across every inbound lead, improving response time on high-value leads without adding any new software to learn.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Building2", gradient: "navy-to-teal" },
  },
  {
    slug: "automated-showing-scheduler-solo-agent-team",
    title: "Automated Showing Scheduler & Follow-Up System for a Solo Agent Team",
    industry: "Real Estate",
    techCategory: "Automation",
    description:
      "Set up an automated scheduling and follow-up workflow for a small independent agent team that was losing showings to slow response times. Buyers can now request a showing directly from a listing page, get instant confirmation, and receive automated reminders ahead of the appointment, with a follow-up message triggered the day after every showing. The system also flags no-shows and automatically offers alternate times instead of requiring the agent to manually reschedule. Because the team ran lean with no admin support, the priority was a setup that required zero day-to-day maintenance once live.",
    impact:
      "Reduced missed and double-booked showings to near zero and freed up an estimated 5 hours a week the agents were spending on scheduling back-and-forth.",
    problemStatement:
      "A small independent agent team was losing showings to slow response times, with no admin support available to manage scheduling back-and-forth or handle no-shows and rescheduling.",
    solution:
      "We set up an automated scheduling workflow letting buyers request a showing directly from a listing page, with instant confirmation, tiered reminders, and automatic rescheduling offers when a no-show is flagged — built to run with zero day-to-day maintenance.",
    features: [
      "Instant showing requests and confirmations from listing pages",
      "Tiered automated reminders ahead of every appointment",
      "No-show detection with automatic alternate-time offers",
      "Day-after follow-up message triggered automatically",
      "Zero ongoing maintenance required from the agents",
    ],
    businessBenefits: [
      "Reduced missed and double-booked showings to near zero",
      "Freed up an estimated 5 hours a week previously spent on scheduling",
      "Let a lean team compete with larger, better-staffed brokerages on responsiveness",
    ],
    prosAndCons: {
      pros: [
        "Runs unattended, ideal for a lean team with no admin support",
        "Instant confirmation removes the response-time disadvantage against bigger teams",
        "Automatic no-show handling avoids awkward manual rescheduling calls",
      ],
      cons: [
        "Works best paired with accurate, up-to-date listing calendars",
        "Very low-volume teams may not see enough showings to justify the setup",
      ],
    },
    technologies: ["Make (Integromat)", "Twilio", "Google Calendar API", "Node.js"],
    approach:
      "We mapped the team's existing showing request and reschedule process first, then built the automation in stages — starting with confirmations and reminders, then layering in no-show detection once the base flow was stable. The team tested it on live showings for two weeks before we removed the manual fallback process entirely.",
    results:
      "Missed and double-booked showings dropped to near zero, and the agents got back an estimated 5 hours a week previously lost to scheduling back-and-forth — time now spent with buyers and sellers instead.",
    timeline: "5 weeks",
    orderValueBand: "$2,500-$5,000",
    image: { icon: "Building2", gradient: "light-teal-to-navy" },
  },
  {
    slug: "generative-virtual-staging-new-construction-developer",
    title: "Generative Virtual Staging Tool for a New-Construction Developer",
    industry: "Real Estate",
    techCategory: "AI/ML",
    description:
      "Built a virtual staging tool for a new-construction developer that generates photorealistic furnished interiors from empty-room photos, letting model units be marketed before physical staging furniture arrives. The tool lets the marketing team choose from several interior styles per room and generates multiple staged variations to A/B test on listing sites. This replaced a slow, expensive cycle of renting physical staging furniture for each new phase of a development before photos could be taken. We built in version history so the team could compare which staging style performed best across different buyer segments.",
    impact:
      "Let listings go to market an estimated 2-3 weeks earlier per building phase, no longer blocked on physical staging logistics.",
    problemStatement:
      "The developer's marketing team couldn't list model units until physical staging furniture arrived, creating a recurring 2-3 week delay per building phase that pushed back every launch.",
    solution:
      "We built a generative staging tool that produces photorealistic furnished interiors from empty-room photos, letting the team choose from multiple interior styles and generate several variations to test on listing sites — no physical furniture required to get to market.",
    features: [
      "Photorealistic furnished interiors generated from empty-room photos",
      "Multiple interior style options per room",
      "Several staged variations generated for A/B testing",
      "Version history to compare staging performance by buyer segment",
      "No physical staging furniture required to list",
    ],
    businessBenefits: [
      "Let listings go to market an estimated 2-3 weeks earlier per building phase",
      "Removed dependency on physical staging logistics and rental costs",
      "Gave marketing data on which staging styles perform best per segment",
    ],
    prosAndCons: {
      pros: [
        "Eliminates the physical staging bottleneck entirely for model units",
        "A/B testing staging styles is only possible because generation is fast and cheap",
        "Scales across every new building phase without new logistics",
      ],
      cons: [
        "Generated images must be clearly disclosed as virtually staged to buyers",
        "Very unusual room layouts occasionally need a manual style adjustment",
      ],
    },
    technologies: ["Python", "Stable Diffusion", "AWS S3", "Next.js", "FastAPI"],
    approach:
      "We started with the developer's existing empty-unit photography and worked with their marketing team to define acceptable interior styles for the brand. After validating output quality against a pilot phase of units, we built in version history so the team could track which styles converted best before scaling to every new phase.",
    results:
      "Model units now go to market an estimated 2-3 weeks earlier per building phase, no longer blocked on furniture delivery, and the marketing team can now A/B test staging styles in a way physical staging never allowed.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "Building2", gradient: "teal-to-navy" },
  },
  {
    slug: "crm-integration-hub-commercial-real-estate-firm",
    title: "Custom CRM Integration Hub for a Commercial Real Estate Firm",
    industry: "Real Estate",
    techCategory: "Custom Software",
    description:
      "Built a middleware integration layer connecting a commercial real estate firm's CRM, email marketing platform, and deal-tracking spreadsheet into one synchronized system. Previously, updating a deal's status meant manually copying information across three separate tools, which frequently drifted out of sync between brokers. The hub now keeps contact records, deal stages, and marketing engagement data consistent everywhere automatically, with a simple internal dashboard showing pipeline health across the whole brokerage. We worked closely with the firm's ops lead to map every field and edge case in their existing process before writing a line of integration code.",
    impact:
      "Eliminated the weekly manual reconciliation process between systems, giving leadership a real-time view of pipeline health for the first time.",
    problemStatement:
      "Updating a single deal's status meant manually copying information across the firm's CRM, email marketing platform, and a shared deal-tracking spreadsheet, and the three regularly drifted out of sync between brokers.",
    solution:
      "We built a middleware integration hub that keeps contact records, deal stages, and marketing engagement data consistent across all three systems automatically, with a simple internal dashboard showing pipeline health firm-wide.",
    features: [
      "Automatic two-way sync between CRM, email platform, and deal tracker",
      "Firm-wide pipeline health dashboard",
      "Field-level mapping validated against every broker's real workflow",
      "Conflict handling for simultaneous updates across systems",
      "No change required to the tools brokers already use daily",
    ],
    businessBenefits: [
      "Eliminated the weekly manual reconciliation process between systems",
      "Gave leadership a real-time view of pipeline health for the first time",
      "Removed the data drift that had been causing broker confusion on deal status",
    ],
    prosAndCons: {
      pros: [
        "Brokers keep using the same tools, no retraining required",
        "Real-time pipeline visibility didn't exist in any single tool before",
        "Reduces data-entry errors from manual copy-between-systems work",
      ],
      cons: [
        "Any of the three underlying platforms changing their API can require integration updates",
        "Initial field-mapping work requires close collaboration with an ops lead who knows every edge case",
      ],
    },
    technologies: ["Node.js", "PostgreSQL", "REST APIs", "TypeScript"],
    approach:
      "We spent the first stretch of the engagement mapping every field and edge case in the firm's existing three-system process directly with their ops lead before writing integration code. The hub was built and tested against a full sync cycle in a staging environment, then rolled out gradually starting with one broker team before going firm-wide.",
    results:
      "The weekly manual reconciliation process is gone, and leadership now has a real-time view of pipeline health across the whole brokerage for the first time — something no single one of the three original tools could provide on its own.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Building2", gradient: "navy-to-teal" },
  },
  {
    slug: "ai-chatbot-after-hours-inquiries-boutique-brokerage",
    title: "AI Chatbot for After-Hours Buyer Inquiries at a Boutique Brokerage",
    industry: "Real Estate",
    techCategory: "Chatbot",
    description:
      "Deployed a lightweight AI chatbot on a boutique brokerage's website to capture and respond to buyer inquiries outside business hours, when the two-agent team was previously unreachable. The chatbot answers common questions about listings, service areas, and the buying process, and books a callback slot for anything it can't confidently answer itself. It was designed to sound like a natural extension of the brokerage's brand voice rather than a generic bot, based on a short style guide the founders provided. Every conversation is logged and summarized into a morning digest so agents start each day already knowing who reached out overnight.",
    impact:
      "Captured after-hours inquiries that were previously going unanswered until the next business day, an estimated 15% of total inbound leads.",
    problemStatement:
      "A two-agent boutique brokerage was unreachable outside business hours, and buyer inquiries that came in evenings or weekends often weren't followed up until the next business day — if at all.",
    solution:
      "We deployed a lightweight AI chatbot, tuned to the brokerage's brand voice from a short style guide the founders provided, that answers common buyer questions and books a callback slot for anything it can't confidently handle itself.",
    features: [
      "After-hours buyer Q&A on listings, service areas, and the buying process",
      "Automatic callback booking for anything outside its scope",
      "Brand-voice tuning based on the founders' own style guide",
      "Every conversation logged and summarized into a morning digest",
      "No new inbox or dashboard for the two-agent team to check",
    ],
    businessBenefits: [
      "Captured after-hours inquiries that previously went unanswered until the next business day",
      "Recovered an estimated 15% of total inbound leads that were being lost to timing",
      "Let a two-agent team compete with larger brokerages on responsiveness",
    ],
    prosAndCons: {
      pros: [
        "Sounds like the brokerage's own voice rather than a generic bot",
        "Morning digest means agents start each day already informed",
        "Conservative scope avoids over-promising answers on complex questions",
      ],
      cons: [
        "Style guide needs an occasional refresh as the brokerage's messaging evolves",
        "Not a replacement for an agent on genuinely complex or sensitive buyer questions",
      ],
    },
    technologies: ["OpenAI API", "Next.js", "Node.js", "Twilio", "PostgreSQL"],
    approach:
      "We started with a short workshop to capture the founders' brand voice and the most common buyer questions the team already knew by heart. After building and testing the chatbot against real historical inquiry transcripts, we ran a two-week soft launch monitoring every conversation before making it the default after-hours contact point.",
    results:
      "After-hours inquiries — an estimated 15% of total inbound leads — are now captured and answered instead of going unaddressed overnight, and agents start each morning already briefed on who reached out.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Building2", gradient: "light-teal-to-navy" },
  },
  {
    slug: "mobile-open-house-checkin-lead-capture-app",
    title: "Mobile Open-House Check-In & Lead Capture App for a Regional Brokerage",
    industry: "Real Estate",
    techCategory: "Mobile App",
    description:
      "Built a simple, fast mobile app agents use at open houses to check in visitors, capture contact details, and automatically enroll them in a follow-up sequence based on their stated interest level. The app replaced a paper sign-in sheet that visitors often skipped and that required manual data entry back at the office after every event. Because agents needed something they could hand a visitor mid-conversation, the interface was kept to a single screen with minimal typing, using device autofill wherever possible. Lead data syncs instantly to the brokerage's CRM so no visitor information is ever transcribed by hand.",
    impact:
      "Increased open-house sign-in rates by an estimated 35% and eliminated the days-long lag between an event and leads reaching the CRM.",
    problemStatement:
      "A paper sign-in sheet at open houses was frequently skipped by visitors and required manual data entry back at the office, creating a days-long lag before leads reached the CRM.",
    solution:
      "We built a single-screen mobile app agents use at open houses to capture visitor details and automatically enroll them in a follow-up sequence based on stated interest, designed to be handed to a visitor mid-conversation with minimal typing.",
    features: [
      "Single-screen check-in with device autofill support",
      "Automatic follow-up sequence enrollment based on stated interest",
      "Instant sync to the brokerage's CRM, no manual re-entry",
      "Works reliably on a phone or tablet at the door",
      "Visitor interest tagging for smarter follow-up",
    ],
    businessBenefits: [
      "Increased open-house sign-in rates by an estimated 35%",
      "Eliminated the days-long lag between an event and leads reaching the CRM",
      "Removed manual data entry for office staff after every open house",
    ],
    prosAndCons: {
      pros: [
        "Simple enough to hand directly to a visitor without instructions",
        "Instant CRM sync removes a recurring manual data-entry task",
        "Interest tagging makes follow-up sequences more relevant from the start",
      ],
      cons: [
        "Depends on a working internet connection at the venue for instant sync",
        "Some visitors are still more comfortable with a familiar paper sign-in",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase", "CRM API integration"],
    approach:
      "We prototyped the single-screen flow with agents first, since the interface had to work while handed to a stranger mid-conversation. After testing autofill behavior across common phone and tablet models, we piloted the app at a handful of open houses before rolling it out across the brokerage.",
    results:
      "Open-house sign-in rates rose an estimated 35%, and leads now reach the CRM instantly instead of days after the event, giving agents a much faster start on follow-up while visitor interest is still fresh.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Building2", gradient: "teal-to-navy" },
  },
  {
    slug: "automated-rental-application-screening-property-management",
    title: "Automated Rental Application Screening Workflow for a Property Management Company",
    industry: "Real Estate",
    techCategory: "Automation",
    description:
      "Built an automated screening workflow for a property management company processing dozens of rental applications a week across its portfolio. Applicants submit information through a branded online form, which automatically triggers background and credit checks through the client's existing screening vendor and compiles results into a single summary for the leasing team. The workflow enforces the client's existing screening criteria consistently across every applicant rather than relying on individual staff judgment, while still leaving the final decision to a human reviewer. Automated status emails keep applicants informed at each stage without staff needing to send manual updates.",
    impact:
      "Cut average time-to-decision on rental applications from several days to under 24 hours, reducing the number of good applicants lost to faster-moving competitors.",
    problemStatement:
      "A property management company processing dozens of rental applications a week relied on individual staff judgment to apply screening criteria, and good applicants were being lost to faster-moving competitors during multi-day decision waits.",
    solution:
      "We built an automated screening workflow that triggers background and credit checks through the client's existing vendor as soon as an application is submitted, compiling results into a single summary while still leaving the final decision to a human reviewer.",
    features: [
      "Branded online application form",
      "Automatic background and credit check triggering",
      "Consistent application of the client's existing screening criteria",
      "Single compiled summary per applicant for the leasing team",
      "Automated status emails at every stage",
    ],
    businessBenefits: [
      "Cut average time-to-decision from several days to under 24 hours",
      "Reduced good applicants lost to faster-moving competitors",
      "Applied screening criteria consistently across every applicant",
    ],
    prosAndCons: {
      pros: [
        "Consistent criteria application reduces fair-housing risk from ad hoc judgment calls",
        "Applicants get status updates without staff sending manual emails",
        "Keeps a human decision-maker in the loop rather than fully automating approval",
      ],
      cons: [
        "Still dependent on the underlying screening vendor's own turnaround time",
        "Criteria changes need to be updated centrally to stay consistent",
      ],
    },
    technologies: ["Node.js", "PostgreSQL", "Screening vendor API integration", "SendGrid"],
    approach:
      "We reviewed the client's existing screening criteria and vendor contract in detail before building anything, to make sure the automated workflow matched their actual policy rather than a simplified version of it. The workflow was tested against a batch of past applications to confirm results matched manual outcomes before going live.",
    results:
      "Time-to-decision dropped from several days to under 24 hours, and the leasing team now applies the same screening criteria consistently to every applicant instead of relying on individual judgment calls.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Building2", gradient: "navy-to-teal" },
  },
  {
    slug: "cv-property-condition-reports-investment-fund",
    title: "Computer-Vision Property Condition Reports for an Investment Property Fund",
    industry: "Real Estate",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision system for an investment fund that inspects large batches of rental properties, automatically flagging visible damage, wear, and maintenance issues from photos taken during routine walkthroughs. Field inspectors upload photos through a mobile-friendly upload tool, and the system generates a structured condition report highlighting areas that likely need attention, cross-referenced against the property's last inspection. This replaced a fully manual review process where an analyst had to look through hundreds of photos per inspection cycle to catch the same issues. The fund's asset managers use the flagged reports to prioritize maintenance spend across the portfolio.",
    impact:
      "Cut manual photo-review time per inspection cycle by an estimated 70%, letting the same analyst team cover a larger portfolio without added headcount.",
    problemStatement:
      "An investment fund's asset managers relied on an analyst manually reviewing hundreds of walkthrough photos per inspection cycle to catch visible damage and maintenance issues across a large rental property portfolio.",
    solution:
      "We built a computer-vision system that automatically flags likely damage and wear from walkthrough photos and compiles a structured condition report cross-referenced against each property's last inspection, so the analyst reviews flagged issues instead of every photo.",
    features: [
      "Mobile-friendly photo upload for field inspectors",
      "Automatic flagging of likely damage and maintenance issues",
      "Structured condition reports per property",
      "Cross-referencing against each property's last inspection",
      "Analyst review workflow for flagged items",
    ],
    businessBenefits: [
      "Cut manual photo-review time per inspection cycle by an estimated 70%",
      "Let the same analyst team cover a larger portfolio without added headcount",
      "Gave asset managers a consistent basis for prioritizing maintenance spend",
    ],
    prosAndCons: {
      pros: [
        "Analyst time is spent reviewing flagged issues, not every single photo",
        "Consistent flagging criteria across the entire portfolio",
        "Structured reports make maintenance-spend prioritization easier to justify",
      ],
      cons: [
        "Photo quality and lighting at walkthroughs affects detection accuracy",
        "Still requires an analyst to confirm flagged issues, not a fully automated decision",
      ],
    },
    technologies: ["Python", "PyTorch", "OpenCV", "AWS S3", "FastAPI"],
    approach:
      "We trained the detection model against a large set of the fund's own historical walkthrough photos, labeled alongside its analyst team to make sure the flagging criteria matched what they actually cared about. After validating flagged results against a full inspection cycle manually, we rolled the tool out across the whole portfolio.",
    results:
      "Manual photo-review time per inspection cycle dropped by an estimated 70%, letting the same analyst team cover a larger portfolio and giving asset managers a consistent, defensible basis for prioritizing maintenance spend.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "Building2", gradient: "light-teal-to-navy" },
  },
];

export const medicalProjects: PortfolioProject[] = [
  {
    slug: "hipaa-patient-portal-family-medicine-group",
    title: "HIPAA-Aware Patient Portal for a Multi-Location Family Medicine Group",
    industry: "Medical",
    techCategory: "Web App",
    description:
      "Built a secure patient portal for a family medicine group operating across several locations, giving patients one place to book appointments, view visit summaries, and message their care team. The portal was designed around HIPAA-aware data handling practices from day one, including encrypted storage, strict access controls, and audit logging on every record view. Previously, each location ran its own informal scheduling process, which made it hard for patients to book across locations or for staff to get a unified view of a patient's history. We worked with the practice's compliance lead throughout the build to review data-handling decisions before they were implemented, not after.",
    impact:
      "Gave the practice a single, compliant booking and communication system across all locations, cutting front-desk call volume by an estimated 30%.",
    problemStatement:
      "Each location in the family medicine group ran its own informal scheduling process, making it hard for patients to book across locations and impossible for staff to get a unified view of a patient's history.",
    solution:
      "We built a secure patient portal designed around HIPAA-aware data handling from day one — encrypted storage, strict access controls, and audit logging on every record view — giving patients one place to book, view visit summaries, and message their care team.",
    features: [
      "Cross-location appointment booking",
      "Encrypted storage with role-based access controls",
      "Audit logging on every patient record view",
      "Secure messaging with the care team",
      "Unified visit history across all locations",
    ],
    businessBenefits: [
      "Gave the practice one compliant booking and communication system across every location",
      "Cut front-desk call volume by an estimated 30%",
      "Gave staff a unified view of patient history for the first time",
    ],
    prosAndCons: {
      pros: [
        "Compliance reviewed alongside the practice's own compliance lead throughout the build",
        "Single system replaces inconsistent per-location processes",
        "Reduces front-desk phone burden meaningfully",
      ],
      cons: [
        "Requires ongoing attention to compliance as regulations or workflows change",
        "Staff across locations needed a short onboarding period to adjust from informal processes",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js", "AWS (HIPAA-eligible services)", "Twilio"],
    approach:
      "We worked with the practice's compliance lead from the earliest design decisions, reviewing data-handling choices before implementation rather than auditing after the fact. The portal was piloted at one location, then rolled out to the remaining locations once the team confirmed the booking and messaging flows matched real patient behavior.",
    results:
      "The practice now runs one compliant booking and communication system across every location instead of several informal processes, cutting front-desk call volume by an estimated 30% and giving staff a unified view of each patient for the first time.",
    timeline: "4 months",
    orderValueBand: "$25,000+",
    image: { icon: "Stethoscope", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-symptom-intake-chatbot-urgent-care",
    title: "AI Symptom-Intake Chatbot for a Same-Day Urgent Care Clinic",
    industry: "Medical",
    techCategory: "Chatbot",
    description:
      "Built an AI-powered intake chatbot for a same-day urgent care clinic that asks patients structured questions about their symptoms before they arrive, then hands a clean summary to the front desk and clinical staff. The chatbot follows a conservative, clearly-scoped script built with clinical input and always defers to a human for anything outside routine intake — it triages for urgency, not diagnosis. This let the clinic reduce the time front-desk staff spent verbally gathering the same intake information from every walk-in patient during peak hours. The tool also flags red-flag symptoms for immediate staff attention rather than waiting in the standard queue.",
    impact:
      "Cut average front-desk intake time per patient by an estimated 4 minutes during peak hours, shortening the overall walk-in wait experience.",
    problemStatement:
      "Front-desk staff at a same-day urgent care clinic spent significant time during peak hours verbally gathering the same symptom and intake information from every walk-in patient before they could be seen.",
    solution:
      "We built a conservatively-scoped AI intake chatbot, built with clinical input, that asks structured pre-arrival questions and hands a clean summary to staff — triaging for urgency, not diagnosis, and always deferring to a human for anything outside routine intake.",
    features: [
      "Structured pre-arrival symptom intake",
      "Red-flag symptom detection with immediate staff alerts",
      "Clean intake summary delivered to front desk and clinical staff",
      "Clinically-reviewed, conservative question scripting",
      "No diagnostic claims — triage and intake only",
    ],
    businessBenefits: [
      "Cut average front-desk intake time per patient by an estimated 4 minutes during peak hours",
      "Shortened the overall walk-in wait experience",
      "Surfaced red-flag symptoms for immediate attention rather than standard queue wait",
    ],
    prosAndCons: {
      pros: [
        "Clinical input shaped the script, not just a generic chatbot template",
        "Frees front-desk time specifically during the busiest hours",
        "Clear escalation path for anything outside routine intake",
      ],
      cons: [
        "Requires periodic script review with clinical staff as protocols evolve",
        "Not suited for practices wanting an open-ended conversational assistant — scope is intentionally narrow",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "React", "Twilio", "PostgreSQL"],
    approach:
      "We worked directly with clinical staff to define exactly what the chatbot should and shouldn't ask, keeping the scope conservative from the start. After testing the script against a range of real, anonymized intake scenarios, we piloted it during a slower week before rolling it out through peak hours.",
    results:
      "Front-desk intake time per patient dropped by an estimated 4 minutes during peak hours, shortening the overall walk-in wait experience while red-flag symptoms now reach staff immediately instead of waiting in the standard queue.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Stethoscope", gradient: "navy-to-teal" },
  },
  {
    slug: "cv-insurance-card-scanner-pediatric-practice",
    title: "Computer-Vision Insurance Card & ID Scanner for a Pediatric Practice",
    industry: "Medical",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision tool that lets parents photograph their child's insurance card and ID during online check-in, automatically extracting and pre-filling the relevant fields instead of requiring manual entry at the front desk. The system validates that key fields like member ID and group number were captured clearly and prompts a retake if the image quality isn't sufficient for reliable extraction. This was built specifically to fit into the pediatric practice's existing online check-in flow rather than requiring a separate app or portal. Extracted data is reviewed by front-desk staff before being saved to the patient record, keeping a human checkpoint in place.",
    impact:
      "Cut manual insurance data entry time per visit by an estimated 3 minutes, adding up across hundreds of weekly pediatric visits.",
    problemStatement:
      "Front-desk staff at a pediatric practice were manually entering insurance and ID information from every check-in, a repetitive task that added friction to hundreds of weekly visits.",
    solution:
      "We built a computer-vision tool integrated into the practice's existing online check-in flow that lets parents photograph their child's insurance card and ID, automatically extracting and pre-filling the relevant fields with a human review step before saving.",
    features: [
      "Photo-based insurance card and ID capture during online check-in",
      "Automatic field extraction (member ID, group number, etc.)",
      "Image-quality validation with retake prompts",
      "Front-desk review checkpoint before saving to the patient record",
      "Fits directly into the existing check-in flow, no separate app",
    ],
    businessBenefits: [
      "Cut manual insurance data entry time per visit by an estimated 3 minutes",
      "Added up to meaningful time savings across hundreds of weekly visits",
      "Reduced transcription errors from manual entry",
    ],
    prosAndCons: {
      pros: [
        "Built into the existing check-in flow rather than a separate tool to learn",
        "Retake prompts catch bad photos before they reach staff",
        "Keeps a human checkpoint before data is saved to the record",
      ],
      cons: [
        "Extraction accuracy depends on photo quality even with retake prompts",
        "Unusual or non-standard insurance card formats occasionally need manual entry",
      ],
    },
    technologies: ["Python", "OpenCV", "Tesseract OCR", "Next.js", "AWS S3"],
    approach:
      "We tested the extraction accuracy against a wide sample of real insurance card formats before integrating it into the check-in flow, tuning the retake-prompt threshold to balance accuracy against parent friction. The tool launched alongside the existing check-in process with front-desk review built in from day one, not added after the fact.",
    results:
      "Manual insurance data entry time dropped by an estimated 3 minutes per visit, a meaningful savings across hundreds of weekly pediatric visits, while a front-desk review step kept accuracy in check.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Stethoscope", gradient: "light-teal-to-navy" },
  },
  {
    slug: "automated-reminder-recall-dental-group",
    title: "Automated Appointment Reminder & Recall System for a Multi-Provider Dental Group",
    industry: "Medical",
    techCategory: "Automation",
    description:
      "Built an automated reminder and recall system for a multi-provider dental group that was losing revenue to missed appointments and forgotten six-month cleanings. The system sends tiered SMS and email reminders ahead of each appointment and automatically reaches out to patients who are overdue for a recall visit based on their last visit date. Reminder timing and messaging were tuned per provider based on that provider's historical no-show patterns rather than using one blanket schedule for the whole practice. The system integrates directly with the group's existing scheduling software rather than requiring staff to maintain a separate list.",
    impact:
      "Reduced missed appointments by an estimated 35% and re-booked a meaningful share of previously lapsed recall patients within the first quarter.",
    problemStatement:
      "A multi-provider dental group was losing revenue to missed appointments and patients who quietly fell off their six-month cleaning schedule, with no consistent system tracking either.",
    solution:
      "We built an automated reminder and recall system sending tiered SMS and email reminders ahead of appointments and reaching out automatically to overdue recall patients, with timing tuned per provider based on that provider's own historical no-show patterns.",
    features: [
      "Tiered SMS and email appointment reminders",
      "Automatic recall outreach based on last-visit date",
      "Per-provider reminder timing tuned to historical no-show patterns",
      "Direct integration with the group's existing scheduling software",
      "No separate list for staff to maintain",
    ],
    businessBenefits: [
      "Reduced missed appointments by an estimated 35%",
      "Re-booked a meaningful share of previously lapsed recall patients within one quarter",
      "Recovered revenue that had been quietly lost to scheduling gaps",
    ],
    prosAndCons: {
      pros: [
        "Per-provider tuning outperforms one blanket reminder schedule",
        "Recall outreach recovers patients who would otherwise just quietly lapse",
        "Integrates with existing scheduling software, no parallel system to maintain",
      ],
      cons: [
        "Reminder timing needs occasional retuning as provider schedules change",
        "SMS reminders depend on the practice holding accurate, current patient phone numbers",
      ],
    },
    technologies: ["Twilio", "Node.js", "PostgreSQL", "Practice scheduling software API"],
    approach:
      "We analyzed each provider's historical no-show data first to set reminder timing individually rather than applying one schedule practice-wide. The recall logic was tested against a batch of known-lapsed patients before going live, then the full system rolled out across all providers over a two-week period.",
    results:
      "Missed appointments dropped by an estimated 35%, and a meaningful share of previously lapsed recall patients were re-booked within the first quarter — recovering revenue the practice had been losing without realizing the scale of it.",
    timeline: "6 weeks",
    orderValueBand: "$2,500-$5,000",
    image: { icon: "Stethoscope", gradient: "teal-to-navy" },
  },
  {
    slug: "physical-therapy-mobile-app",
    title: "Cross-Platform Patient Mobile App for a Physical Therapy Network",
    industry: "Medical",
    techCategory: "Mobile App",
    description:
      "Built an iOS and Android app for a physical therapy network that gives patients their home exercise program, complete with instructional videos, on their phone instead of a printed handout. Therapists assign exercises from a clinic-side dashboard, and patients log completion and pain levels directly in the app between visits, giving therapists visibility into adherence before the next appointment. This addressed a common problem in physical therapy: patients not following through on home exercises largely because printed handouts get lost or forgotten. The app also sends gentle daily reminders tied to each patient's specific program schedule.",
    impact:
      "Increased patient-reported home exercise adherence and gave therapists visibility into gaps before appointments instead of finding out during them.",
    problemStatement:
      "Patients frequently didn't follow through on home exercise programs because printed handouts got lost or forgotten between visits, and therapists had no visibility into adherence until the next appointment.",
    solution:
      "We built an iOS and Android app where therapists assign exercises from a clinic-side dashboard and patients log completion and pain levels directly, giving therapists visibility into adherence before — not during — the next appointment.",
    features: [
      "Clinic-side dashboard for assigning exercise programs",
      "Instructional videos attached to each exercise",
      "Patient logging of completion and pain levels",
      "Daily reminders tied to each patient's specific schedule",
      "Therapist visibility into adherence gaps before appointments",
    ],
    businessBenefits: [
      "Increased patient-reported home exercise adherence",
      "Gave therapists visibility into gaps before appointments instead of during them",
      "Replaced a printed-handout system prone to being lost or ignored",
    ],
    prosAndCons: {
      pros: [
        "Video instructions reduce ambiguity that printed handouts couldn't address",
        "Therapists can adjust programs proactively instead of reactively",
        "Daily reminders tied to each patient's own schedule, not generic",
      ],
      cons: [
        "Adherence data is self-reported by patients, not independently verified",
        "Requires patients to be comfortable using a mobile app between visits",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase", "Node.js"],
    approach:
      "We shadowed therapist-patient sessions early on to understand exactly how programs were assigned and explained before building the assignment dashboard. The app was piloted with a small group of patients across two therapists, who gave feedback on video clarity and reminder timing before the wider rollout.",
    results:
      "Patient-reported home exercise adherence improved, and therapists now see adherence gaps before the next appointment instead of discovering them during it — letting them adjust programs proactively.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Stethoscope", gradient: "navy-to-teal" },
  },
  {
    slug: "custom-practice-management-dermatology-group",
    title: "Custom Practice-Management Software for a Growing Dermatology Group",
    industry: "Medical",
    techCategory: "Custom Software",
    description:
      "Built custom practice-management software for a dermatology group that had outgrown its off-the-shelf scheduling tool as it expanded to multiple providers and procedure types. The system handles scheduling logic specific to dermatology workflows — like procedure-specific time blocks and provider specialties — that generic scheduling software couldn't accommodate well. It also includes an internal dashboard for tracking procedure volume and provider utilization across the group. We built the system to integrate with the group's existing billing software rather than replacing it, minimizing disruption to an already-working part of their operations.",
    impact:
      "Eliminated the double-booking and scheduling-logic workarounds staff had built manually around the old system's limitations.",
    problemStatement:
      "A growing dermatology group had outgrown its off-the-shelf scheduling tool, which couldn't handle procedure-specific time blocks or multiple provider specialties without constant manual workarounds.",
    solution:
      "We built custom practice-management software handling dermatology-specific scheduling logic directly, plus an internal dashboard for tracking procedure volume and provider utilization, integrated with the group's existing billing software rather than replacing it.",
    features: [
      "Procedure-specific scheduling time blocks",
      "Provider specialty-aware booking logic",
      "Procedure volume and utilization dashboard",
      "Integration with existing billing software",
      "Built to fit the group's actual growth trajectory, not a generic template",
    ],
    businessBenefits: [
      "Eliminated double-booking and manual scheduling workarounds",
      "Gave leadership visibility into procedure volume and provider utilization",
      "Avoided disrupting an already-working billing process",
    ],
    prosAndCons: {
      pros: [
        "Scheduling logic matches actual dermatology workflows, not a generic calendar",
        "Utilization dashboard gives leadership data they never had before",
        "Billing integration minimized disruption to a working system",
      ],
      cons: [
        "Custom scheduling logic requires the original development partner for significant future changes",
        "Onboarding new providers requires configuring their specific time-block rules",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js", "Billing software API"],
    approach:
      "We spent early discovery sessions cataloguing every procedure type and its scheduling quirks directly with the group's office manager and providers. The system was built and tested against a full week of real scheduling scenarios in a staging environment before cutting over from the old tool.",
    results:
      "Double-booking and the manual scheduling workarounds staff had built around the old system's limitations are gone, and leadership now tracks procedure volume and provider utilization in one dashboard instead of not tracking it at all.",
    timeline: "4 months",
    orderValueBand: "$25,000+",
    image: { icon: "Stethoscope", gradient: "light-teal-to-navy" },
  },
  {
    slug: "ai-noshow-prediction-behavioral-health-clinic",
    title: "AI-Powered No-Show Prediction Model for a Behavioral Health Clinic",
    industry: "Medical",
    techCategory: "AI/ML",
    description:
      "Built a machine learning model that predicts the likelihood of a patient missing an upcoming behavioral health appointment, based on historical attendance patterns, appointment type, and time since booking. The clinic uses the prediction score to decide which appointments get an extra personal reminder call versus a standard automated text, focusing limited staff time where it matters most. This mattered because behavioral health no-shows are both a revenue issue and, more importantly, a continuity-of-care issue for patients who benefit from consistent sessions. We validated the model against a year of the clinic's own appointment history before it went live, and it continues to retrain periodically as new data comes in.",
    impact:
      "Helped staff focus manual outreach on the highest-risk appointments, contributing to an estimated 20% reduction in no-shows for flagged sessions.",
    problemStatement:
      "A behavioral health clinic's no-shows were both a revenue issue and a continuity-of-care problem, and staff had no way to know in advance which appointments were most at risk.",
    solution:
      "We built a machine learning model predicting no-show likelihood based on attendance history, appointment type, and time since booking, so staff could direct a personal reminder call to the highest-risk appointments instead of treating every booking the same.",
    features: [
      "No-show risk scoring per upcoming appointment",
      "Personal-call vs. automated-text routing based on risk score",
      "Model validated against a full year of appointment history",
      "Periodic retraining as new attendance data comes in",
      "No change to the clinic's existing booking process",
    ],
    businessBenefits: [
      "Helped staff focus manual outreach on the highest-risk appointments",
      "Contributed to an estimated 20% reduction in no-shows for flagged sessions",
      "Protected continuity of care for patients who benefit from consistent sessions",
    ],
    prosAndCons: {
      pros: [
        "Focuses limited staff time on the appointments that need it most",
        "Directly supports continuity-of-care goals, not just revenue",
        "Retrains periodically rather than staying static as patterns shift",
      ],
      cons: [
        "Prediction is probabilistic — some flagged patients still attend, some unflagged ones still miss",
        "Requires enough historical appointment data to train reliably",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI"],
    approach:
      "We validated the model against a full year of the clinic's own appointment history before it went anywhere near a live schedule, then ran a pilot period comparing its flagged sessions against actual outcomes. Staff feedback on false positives shaped the final risk threshold before it became part of daily operations.",
    results:
      "Staff now direct personal outreach to the highest-risk appointments instead of spreading effort evenly, contributing to an estimated 20% reduction in no-shows for flagged sessions and helping protect continuity of care.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Stethoscope", gradient: "teal-to-navy" },
  },
  {
    slug: "telehealth-scheduling-portal-rural-primary-care",
    title: "Secure Telehealth Scheduling Portal for a Rural Primary Care Practice",
    industry: "Medical",
    techCategory: "Web App",
    description:
      "Built a telehealth scheduling portal for a rural primary care practice serving patients who often drive long distances for in-person visits. The portal lets patients book video visits directly, complete with an automated pre-visit checklist confirming they have a working camera and stable connection ahead of time. This reduced a common failure point the practice had run into with telehealth: patients booking a slot and then the visit falling apart due to last-minute technical issues. The portal integrates with the practice's existing scheduling system so telehealth and in-person visits live in one calendar, not two separate ones.",
    impact:
      "Reduced telehealth appointment technical failures by catching connectivity issues before the visit instead of during it, protecting provider time.",
    problemStatement:
      "A rural primary care practice's telehealth visits frequently fell apart at the last minute due to patients' camera or connectivity issues discovered only once the visit had already started.",
    solution:
      "We built a telehealth scheduling portal with an automated pre-visit checklist confirming camera and connection readiness ahead of time, unified with in-person scheduling so the practice manages one calendar instead of two.",
    features: [
      "Direct video-visit booking for patients",
      "Automated pre-visit technical readiness checklist",
      "Unified calendar for telehealth and in-person visits",
      "Integration with the practice's existing scheduling system",
      "Early warning of connectivity issues before the visit starts",
    ],
    businessBenefits: [
      "Reduced telehealth appointment technical failures",
      "Caught connectivity issues before the visit instead of during it",
      "Protected provider time that was previously lost to failed visits",
    ],
    prosAndCons: {
      pros: [
        "Pre-visit checklist catches problems before provider time is spent",
        "One unified calendar avoids the confusion of two separate systems",
        "Particularly valuable for patients driving long distances who need telehealth to actually work",
      ],
      cons: [
        "Still depends on the patient's home internet and device, which the checklist can only partially address",
        "Rural connectivity variability means some visits will still need to fall back to in-person",
      ],
    },
    technologies: ["Next.js", "WebRTC", "PostgreSQL", "Node.js"],
    approach:
      "We interviewed front-desk and clinical staff about exactly how past telehealth visits had failed before designing the readiness checklist to target those specific failure points. The portal was piloted with a subset of patients over several weeks, tracking failure rates before and after, ahead of a practice-wide rollout.",
    results:
      "Telehealth technical failures dropped as connectivity and camera issues are now caught before the visit instead of during it, protecting provider time and making telehealth a more reliable option for patients who'd otherwise drive long distances.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Stethoscope", gradient: "navy-to-teal" },
  },
  {
    slug: "automated-insurance-eligibility-verification-orthopedic",
    title: "Automated Insurance Eligibility Verification Workflow for an Orthopedic Practice",
    industry: "Medical",
    techCategory: "Automation",
    description:
      "Built an automated eligibility verification workflow for an orthopedic practice where staff were manually checking insurance coverage for every scheduled procedure, often the day before or even the morning of. The system automatically checks eligibility as soon as a procedure is scheduled and flags any coverage issues early enough for staff to resolve them before the patient arrives. This was especially important for orthopedic procedures, where a coverage surprise on the day of surgery creates real disruption for both the patient and the surgical schedule. The workflow integrates with the client's existing clearinghouse rather than requiring a new insurance-verification vendor.",
    impact:
      "Caught coverage issues an average of several days earlier than the practice's prior day-of verification process, reducing last-minute schedule disruptions.",
    problemStatement:
      "Staff at an orthopedic practice were manually checking insurance coverage for scheduled procedures, often the day before or morning of, so coverage surprises regularly disrupted the surgical schedule.",
    solution:
      "We built an automated eligibility verification workflow that checks coverage as soon as a procedure is scheduled and flags issues early enough for staff to resolve them well before the patient arrives, integrated with the client's existing clearinghouse.",
    features: [
      "Automatic eligibility check triggered at scheduling time",
      "Early coverage-issue flagging, days ahead of the procedure",
      "Integration with the existing insurance clearinghouse",
      "No new insurance-verification vendor required",
      "Clear staff task queue for flagged issues",
    ],
    businessBenefits: [
      "Caught coverage issues an average of several days earlier than the prior process",
      "Reduced last-minute schedule disruptions",
      "Protected the surgical schedule from day-of coverage surprises",
    ],
    prosAndCons: {
      pros: [
        "Catches issues days ahead instead of the morning of a procedure",
        "Uses the existing clearinghouse relationship, no new vendor contract",
        "Reduces a specific, high-stress day-of disruption for both staff and patients",
      ],
      cons: [
        "Verification speed is ultimately bounded by the clearinghouse's own response times",
        "Complex multi-payer cases still sometimes need manual follow-up",
      ],
    },
    technologies: ["Node.js", "PostgreSQL", "Clearinghouse API integration"],
    approach:
      "We mapped the practice's exact procedure-scheduling workflow and clearinghouse relationship first, then built the automated check to trigger at the same point scheduling already happened, requiring no new step for staff. It was tested against a batch of upcoming procedures in parallel with the manual process before fully replacing it.",
    results:
      "Coverage issues are now caught an average of several days earlier than the practice's prior day-of process, meaningfully reducing last-minute schedule disruptions for both staff and patients.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Stethoscope", gradient: "light-teal-to-navy" },
  },
  {
    slug: "multilingual-intake-chatbot-community-health-center",
    title: "AI Intake Chatbot with Multi-Language Support for a Community Health Center",
    industry: "Medical",
    techCategory: "Chatbot",
    description:
      "Built a multi-language AI intake chatbot for a community health center serving a patient population where a significant share of patients are more comfortable in a language other than English. The chatbot conducts pre-visit intake in the patient's preferred language and translates the structured summary into English for clinical staff, reducing reliance on scheduling live interpreters for routine intake questions. It was built with a conservative scope, focused on structured intake information rather than open-ended medical conversation, and always escalates to staff for anything ambiguous. The center's front-desk team was involved throughout the build to make sure the tone and question set matched how they actually talk to patients.",
    impact:
      "Reduced dependence on live interpreter scheduling for routine intake, freeing interpreter time for visits where it's genuinely needed.",
    problemStatement:
      "A community health center serving a large non-English-speaking patient population relied heavily on scheduling live interpreters just for routine pre-visit intake questions, tying up interpreter time needed elsewhere.",
    solution:
      "We built a multi-language AI intake chatbot, scoped conservatively to structured intake rather than open-ended medical conversation, that conducts pre-visit intake in the patient's preferred language and translates a clean summary into English for clinical staff.",
    features: [
      "Structured pre-visit intake in the patient's preferred language",
      "Automatic English-language summary for clinical staff",
      "Conservative scope with escalation for anything ambiguous",
      "Tone and question set shaped directly by front-desk staff input",
      "Reduced dependence on live interpreter scheduling for routine intake",
    ],
    businessBenefits: [
      "Freed interpreter time for visits where it's genuinely needed",
      "Reduced dependence on live interpreter scheduling for routine intake",
      "Made pre-visit intake more accessible for non-English-speaking patients",
    ],
    prosAndCons: {
      pros: [
        "Front-desk team shaped the tone and questions, not a generic translation bot",
        "Frees scarce interpreter time for higher-need visits",
        "Conservative scope avoids overreaching into clinical conversation",
      ],
      cons: [
        "Limited to the languages it was explicitly built and tested for",
        "Complex or sensitive intake situations still require a live interpreter",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "React", "PostgreSQL"],
    approach:
      "We worked closely with the center's front-desk team to make sure the chatbot's tone and question set matched how they actually talk to patients, not a generic script. After testing translation accuracy across the center's most common languages, we piloted it with one language before expanding to the full set.",
    results:
      "Routine pre-visit intake no longer requires scheduling a live interpreter, freeing that time for visits where it's genuinely needed while keeping non-English-speaking patients well-served at intake.",
    timeline: "10 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Stethoscope", gradient: "teal-to-navy" },
  },
  {
    slug: "cv-wound-documentation-wound-care-clinic",
    title: "Computer-Vision-Assisted Wound Documentation Tool for a Wound Care Clinic",
    industry: "Medical",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision tool for a wound care clinic that measures wound size and tracks visual healing progress from photos taken at each visit, standardizing what had previously been an inconsistent manual measurement process. The tool overlays a reference scale on each photo to calculate approximate dimensions and stores a visual timeline per patient so clinicians can see healing trends across visits at a glance. This addressed a real clinical documentation challenge: manual measurements varied between staff members, making it hard to objectively track whether a treatment plan was working. All measurements remain clearly marked as clinician-reviewable estimates rather than a diagnostic replacement.",
    impact:
      "Standardized wound-progress documentation across providers, making it easier to objectively justify treatment plan changes to insurers.",
    problemStatement:
      "Manual wound measurements varied between staff members at a wound care clinic, making it hard to objectively track whether a treatment plan was working or defend treatment decisions to insurers.",
    solution:
      "We built a computer-vision tool that overlays a reference scale on wound photos to calculate approximate dimensions and stores a visual timeline per patient, standardizing documentation while keeping every measurement clearly marked as clinician-reviewable.",
    features: [
      "Reference-scale overlay for approximate wound measurement",
      "Visual healing timeline per patient across visits",
      "Standardized documentation across every provider",
      "Clinician-reviewable estimates, not automated diagnosis",
      "Easy comparison of measurements between visits",
    ],
    businessBenefits: [
      "Standardized wound-progress documentation across providers",
      "Made it easier to objectively justify treatment plan changes to insurers",
      "Reduced measurement variability between staff members",
    ],
    prosAndCons: {
      pros: [
        "Consistent measurement approach across every provider, not just one",
        "Visual timeline makes healing trends immediately clear at a glance",
        "Clearly scoped as clinician-reviewable, not a diagnostic replacement",
      ],
      cons: [
        "Photo angle and lighting consistency affects measurement accuracy",
        "Requires clinicians to adopt a consistent photo-taking routine at each visit",
      ],
    },
    technologies: ["Python", "OpenCV", "AWS S3", "Next.js"],
    approach:
      "We worked with clinical staff to agree on a standard photo-taking approach before building the measurement logic, since consistent input mattered as much as the computer-vision model itself. The tool was validated against a set of manually-measured wounds to confirm its estimates lined up with clinician judgment before rolling out clinic-wide.",
    results:
      "Wound-progress documentation is now standardized across every provider instead of varying by who took the measurement, making it easier to objectively track healing trends and justify treatment plan changes to insurers.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Stethoscope", gradient: "navy-to-teal" },
  },
  {
    slug: "referral-management-system-multi-specialty-group",
    title: "Custom Referral Management System for a Multi-Specialty Medical Group",
    industry: "Medical",
    techCategory: "Custom Software",
    description:
      "Built a custom referral management system for a multi-specialty medical group that was tracking incoming and outgoing patient referrals across a mix of spreadsheets and sticky notes. The system logs every referral's status from initial request through completed consult, automatically notifying staff when a referral has been sitting without action for too long. It gives group leadership a clear view of referral volume between specialties, which the group had never been able to see before. We built the system to be simple enough for front-desk staff to use without training beyond a single onboarding session.",
    impact:
      "Gave leadership visibility into referral bottlenecks between specialties for the first time, and cut the number of referrals that fell through the cracks.",
    problemStatement:
      "A multi-specialty medical group tracked incoming and outgoing patient referrals across a mix of spreadsheets and sticky notes, with no visibility into referral volume or bottlenecks between specialties.",
    solution:
      "We built a custom referral management system logging every referral's status from initial request through completed consult, automatically notifying staff when a referral has been sitting without action too long, simple enough to use with a single onboarding session.",
    features: [
      "End-to-end referral status tracking",
      "Automatic stale-referral alerts to staff",
      "Referral volume visibility between specialties",
      "Minimal-training interface for front-desk staff",
      "Single source of truth replacing spreadsheets and sticky notes",
    ],
    businessBenefits: [
      "Gave leadership visibility into referral bottlenecks between specialties for the first time",
      "Cut the number of referrals that fell through the cracks",
      "Removed reliance on spreadsheets and sticky notes for referral tracking",
    ],
    prosAndCons: {
      pros: [
        "Simple enough for front-desk staff to use after one onboarding session",
        "Stale-referral alerts catch what sticky notes never could",
        "Gives leadership cross-specialty visibility they never had before",
      ],
      cons: [
        "Requires staff discipline to log referral status updates promptly for alerts to stay accurate",
        "Doesn't yet integrate directly with every specialty's own scheduling system",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js"],
    approach:
      "We shadowed front-desk staff to understand how referrals were actually being tracked, and lost, in the existing sticky-note-and-spreadsheet process before designing the system. It launched with one specialty pair first to validate the alert timing, then expanded across the full multi-specialty group.",
    results:
      "Leadership now has visibility into referral bottlenecks between specialties for the first time, and the number of referrals that fell through the cracks has dropped meaningfully since staff no longer rely on sticky notes and spreadsheets.",
    timeline: "3 months",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Stethoscope", gradient: "light-teal-to-navy" },
  },
];

export const cleaningJanitorialProjects: PortfolioProject[] = [
  {
    slug: "field-service-mobile-app-commercial-cleaning-network",
    title: "Field-Service Mobile App for a Regional Commercial Cleaning Crew Network",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Mobile App",
    description:
      "Built a mobile app for cleaning crews working across a regional commercial cleaning company's client sites, replacing a mix of text messages and paper checklists for daily job tracking. Crew leads check in and out of each site through the app, work through a digital checklist specific to that client's contract, and flag any supply or maintenance issues directly from the job site with a photo attached. Office staff get a real-time dashboard showing which sites are complete for the day instead of waiting for end-of-day phone check-ins. The app works offline and syncs once a connection is available, since several client sites had unreliable Wi-Fi.",
    impact:
      "Gave office staff real-time visibility into daily job completion across every site, cutting end-of-day status calls to essentially zero.",
    problemStatement:
      "Office staff at a regional commercial cleaning company had no visibility into daily job completion across sites, relying on a mix of text messages and paper checklists that only converged into a clear picture through end-of-day phone check-ins.",
    solution:
      "We built a mobile app for crew leads to check in and out of sites, work through client-specific digital checklists, and flag supply or maintenance issues with a photo — built to work offline and sync once connectivity is available, since several sites had unreliable Wi-Fi.",
    features: [
      "Site check-in/check-out with real-time status",
      "Client-specific digital checklists",
      "Photo-based issue flagging from the job site",
      "Offline mode with automatic sync",
      "Real-time office dashboard of daily job completion",
    ],
    businessBenefits: [
      "Gave office staff real-time visibility into daily job completion across every site",
      "Cut end-of-day status calls to essentially zero",
      "Replaced inconsistent text-message and paper-based tracking",
    ],
    prosAndCons: {
      pros: [
        "Offline mode means unreliable site Wi-Fi doesn't block crew workflow",
        "Photo-based issue flagging gives office staff context, not just a text description",
        "Real-time dashboard removes the need for end-of-day check-in calls",
      ],
      cons: [
        "Crew members need a company or personal smartphone to use the app",
        "Initial rollout required a brief training session per crew to build the check-in habit",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase", "Node.js"],
    approach:
      "We shadowed crews on-site to understand exactly how checklists varied by client contract before building the digital version. Offline sync was tested specifically at the sites with known Wi-Fi issues, and the app rolled out to one crew as a pilot before expanding across the full network.",
    results:
      "Office staff now see daily job completion across every site in real time instead of waiting for end-of-day phone calls, which have dropped to essentially zero since the app went live.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "SprayCan", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-quote-chatbot-residential-cleaning-franchise",
    title: "AI Quote-Generation Chatbot for a Residential Cleaning Franchise",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Chatbot",
    description:
      "Built a chatbot for a residential cleaning franchise that asks visitors a short set of questions about home size, cleaning frequency, and add-on services, then generates an instant price estimate on the spot. Previously, every quote request required a callback from the office during business hours, and a meaningful share of visitors never converted into a booked job because of the delay. The chatbot hands off qualified, price-aware leads directly into the booking calendar, so the only manual step left is final confirmation. Pricing logic was built directly from the franchise's existing rate card so estimates stay accurate as pricing changes.",
    impact:
      "Converted an estimated 25% more website visitors into booked jobs by removing the wait for a callback quote.",
    problemStatement:
      "Every quote request at a residential cleaning franchise required a callback from the office during business hours, and a meaningful share of visitors never converted into a booked job because of the delay.",
    solution:
      "We built a chatbot that asks a short set of questions about home size, frequency, and add-ons, then generates an instant price estimate using the franchise's own rate card, handing off qualified, price-aware leads directly into the booking calendar.",
    features: [
      "Instant price estimate from a short Q&A flow",
      "Pricing logic built directly from the franchise's rate card",
      "Direct handoff into the booking calendar",
      "Add-on service selection built into the quote flow",
      "Works around the clock, not just business hours",
    ],
    businessBenefits: [
      "Converted an estimated 25% more website visitors into booked jobs",
      "Removed the wait for a callback quote entirely",
      "Captured quote requests outside business hours",
    ],
    prosAndCons: {
      pros: [
        "Instant pricing removes the single biggest drop-off point in the funnel",
        "Rate card logic keeps estimates accurate as pricing changes",
        "Works 24/7, capturing demand outside office hours",
      ],
      cons: [
        "Rate card updates need to be kept in sync when pricing changes",
        "Unusually large or nonstandard properties still need a follow-up call for an exact quote",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "React", "Booking calendar API integration"],
    approach:
      "We built the pricing logic directly from the franchise's existing rate card and tested it against a batch of past manually-quoted jobs to confirm accuracy before launch. The chatbot went live on the website with a two-week monitoring period comparing chatbot-sourced bookings against the prior callback process.",
    results:
      "An estimated 25% more website visitors converted into booked jobs once the wait for a callback quote was removed, with the chatbot now capturing demand around the clock instead of only during business hours.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "SprayCan", gradient: "navy-to-teal" },
  },
  {
    slug: "automated-route-dispatch-optimization-janitorial-company",
    title: "Automated Route & Dispatch Optimization System for a Multi-Crew Janitorial Company",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Automation",
    description:
      "Built an automated dispatch system for a janitorial company running multiple crews across a metro area, replacing a manual process where the office manager built each day's routes by hand every morning. The system factors in each site's service window, crew location, and job duration to generate efficient daily routes automatically, with the office manager able to make quick manual adjustments when needed. This freed up a task that was eating the first hour of every workday and often produced less efficient routes than the automated version. The system also tracks actual versus planned time per site, giving management visibility into which jobs are running over or under estimate.",
    impact:
      "Cut daily route-planning time from roughly an hour to a few minutes and reduced overall crew windshield time by an estimated 15%.",
    problemStatement:
      "An office manager at a multi-crew janitorial company spent the first hour of every workday manually building that day's routes, often producing less efficient routing than an automated system could.",
    solution:
      "We built an automated dispatch system factoring in each site's service window, crew location, and job duration to generate efficient daily routes automatically, while still letting the office manager make quick manual adjustments when needed.",
    features: [
      "Automatic daily route generation across multiple crews",
      "Service-window and job-duration-aware scheduling",
      "Manual override for quick adjustments",
      "Actual-vs-planned time tracking per site",
      "Management visibility into which jobs run over or under estimate",
    ],
    businessBenefits: [
      "Cut daily route-planning time from roughly an hour to a few minutes",
      "Reduced overall crew windshield time by an estimated 15%",
      "Gave management visibility into job-time overruns for the first time",
    ],
    prosAndCons: {
      pros: [
        "Frees the office manager's first hour of every workday",
        "Consistently more efficient routing than manual planning",
        "Actual-vs-planned tracking surfaces problem sites automatically",
      ],
      cons: [
        "Route quality depends on accurate site location and job-duration data being kept current",
        "Last-minute schedule changes still need a manual override, not fully hands-off",
      ],
    },
    technologies: ["Node.js", "Google Maps API", "PostgreSQL", "React"],
    approach:
      "We started by shadowing the office manager's manual routing process for a week to understand the real constraints being juggled — service windows, crew skill matching, and traffic patterns. The automated system was run in parallel with manual routing for two weeks to validate output quality before becoming the primary process.",
    results:
      "Daily route planning now takes a few minutes instead of roughly an hour, and overall crew windshield time dropped by an estimated 15%, while management can now see which jobs are consistently running over estimate.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "SprayCan", gradient: "light-teal-to-navy" },
  },
  {
    slug: "self-service-booking-portal-boutique-house-cleaning",
    title: "Client Self-Service Booking Portal for a Boutique House-Cleaning Business",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Web App",
    description:
      "Built a simple booking portal for a boutique house-cleaning business that let clients see available time slots and book recurring or one-time cleanings themselves, instead of calling or texting the owner directly. The portal handles recurring scheduling logic — weekly, biweekly, or monthly — and sends automatic confirmations and reminders without any manual input from the owner. Because the business was a small, owner-operated shop, the priority was keeping the system simple enough that the owner could manage bookings from her phone between jobs. The portal was built to look and feel like a natural extension of the business's existing brand and website.",
    impact:
      "Gave a solo business owner back an estimated 5+ hours a week previously spent on booking calls and texts.",
    problemStatement:
      "A solo business owner running a boutique house-cleaning business was fielding every booking request by phone or text personally, with no way for clients to see availability or manage recurring schedules without direct back-and-forth.",
    solution:
      "We built a simple, mobile-friendly booking portal handling recurring scheduling logic — weekly, biweekly, monthly — with automatic confirmations and reminders, kept intentionally simple so the owner could manage it from her phone between jobs.",
    features: [
      "Self-service booking for one-time and recurring cleanings",
      "Weekly, biweekly, and monthly scheduling logic",
      "Automatic booking confirmations and reminders",
      "Mobile-friendly management for the owner on the go",
      "Branded to match the business's existing website",
    ],
    businessBenefits: [
      "Gave a solo business owner back an estimated 5+ hours a week",
      "Eliminated most booking calls and texts",
      "Let clients self-serve recurring schedule changes without owner involvement",
    ],
    prosAndCons: {
      pros: [
        "Simple enough for a solo owner to manage entirely from her phone",
        "Recurring scheduling logic removes a common manual pain point",
        "Feels like a natural part of the existing brand, not a bolted-on tool",
      ],
      cons: [
        "Very small client bases may not see dramatic time savings right away",
        "Owner still needs to handle occasional edge-case requests outside the standard scheduling logic",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Twilio", "Stripe"],
    approach:
      "We kept discovery short and focused, given the scale of the business, mapping exactly how the owner currently handled recurring bookings before simplifying it into a self-service flow. The portal launched quietly to existing clients first, with the owner reviewing early bookings closely before promoting it more broadly.",
    results:
      "The owner got back an estimated 5+ hours a week previously spent on booking calls and texts, with clients now managing their own recurring schedules directly through the portal.",
    timeline: "4 weeks",
    orderValueBand: "$2,500-$5,000",
    image: { icon: "SprayCan", gradient: "teal-to-navy" },
  },
  {
    slug: "cv-job-completion-verification-janitorial-contractor",
    title: "Computer-Vision Job-Completion Verification Tool for a Commercial Janitorial Contractor",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision verification tool for a commercial janitorial contractor that needed objective proof of completed work for large facility clients with strict service-level agreements. Crew members photograph key areas at the end of each shift, and the system flags obviously incomplete work — like visible trash or unclean floors — for a supervisor to review before the client sees it. This gave the contractor a way to catch quality issues internally before a client complaint came in, rather than finding out about a problem after the fact. The tool doesn't replace supervisor judgment; it simply surfaces likely problem photos so supervisors aren't reviewing hundreds of images per shift by hand.",
    impact:
      "Cut client-reported quality complaints by catching an estimated majority of issues internally before the client ever saw them.",
    problemStatement:
      "A commercial janitorial contractor serving large facility clients with strict service-level agreements had no objective way to verify completed work, often learning about quality issues only after a client complaint.",
    solution:
      "We built a computer-vision verification tool where crew members photograph key areas at shift end, and the system flags likely quality issues — visible trash, unclean floors — for a supervisor to review before the client ever sees a problem.",
    features: [
      "End-of-shift photo capture of key facility areas",
      "Automatic flagging of likely quality issues",
      "Supervisor review queue for flagged photos only",
      "Objective documentation for SLA compliance",
      "No change to crew's existing end-of-shift routine beyond photos",
    ],
    businessBenefits: [
      "Cut client-reported quality complaints by catching most issues internally first",
      "Gave the contractor objective proof of completed work for SLA clients",
      "Reduced supervisor time spent reviewing photos manually",
    ],
    prosAndCons: {
      pros: [
        "Supervisors review only flagged photos, not hundreds per shift",
        "Creates objective documentation for strict SLA clients",
        "Catches issues internally before they become client complaints",
      ],
      cons: [
        "Flagging accuracy depends on consistent, well-lit end-of-shift photos",
        "Doesn't replace supervisor judgment — it surfaces candidates for review, not final verdicts",
      ],
    },
    technologies: ["Python", "PyTorch", "OpenCV", "AWS S3"],
    approach:
      "We trained the flagging model on a set of the contractor's own past photos, labeled together with supervisors to match what they actually consider a quality issue. The tool ran alongside manual supervisor review for several weeks to confirm flagging accuracy before supervisors began relying on it as the primary review queue.",
    results:
      "Client-reported quality complaints dropped as the contractor now catches an estimated majority of issues internally before the client ever sees them, giving supervisors objective, photo-backed proof of completed work for strict SLA clients.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "SprayCan", gradient: "navy-to-teal" },
  },
  {
    slug: "custom-crm-recurring-contracts-cleaning-company",
    title: "Custom CRM & Recurring Contract Management Software for a Growing Cleaning Company",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Custom Software",
    description:
      "Built custom CRM software for a cleaning company managing a growing base of recurring commercial contracts that had outgrown a generic CRM never designed for service-schedule-based businesses. The system tracks each contract's service frequency, renewal date, and pricing terms alongside standard contact and communication history, with automatic alerts when a contract is approaching renewal or contract terms need review. This replaced a combination of a basic CRM and a separate spreadsheet the office manager maintained to track contract-specific details the CRM couldn't handle. Sales staff now have one place to see a client's full history and contract status before every renewal conversation.",
    impact:
      "Eliminated missed contract renewals entirely in the first two quarters after launch, protecting recurring revenue that had previously slipped through the cracks.",
    problemStatement:
      "A growing cleaning company's generic CRM was never designed for service-schedule-based contracts, forcing the office manager to maintain a separate spreadsheet just to track contract-specific renewal and pricing details.",
    solution:
      "We built custom CRM software tracking each contract's service frequency, renewal date, and pricing terms alongside standard contact history, with automatic alerts when a contract nears renewal or terms need review.",
    features: [
      "Contract-specific service frequency and pricing tracking",
      "Automatic renewal-approaching alerts",
      "Unified contact and communication history per client",
      "Sales-ready view of full client history before renewal conversations",
      "Replaces a generic CRM plus a manual spreadsheet workaround",
    ],
    businessBenefits: [
      "Eliminated missed contract renewals entirely in the first two quarters after launch",
      "Protected recurring revenue that had previously slipped through the cracks",
      "Gave sales staff one place to see full client and contract history",
    ],
    prosAndCons: {
      pros: [
        "Purpose-built for service-schedule contracts, not adapted from a generic CRM",
        "Renewal alerts directly protect recurring revenue",
        "One system replaces a CRM-plus-spreadsheet workaround",
      ],
      cons: [
        "Migrating existing contract data out of spreadsheets required careful validation",
        "Sales staff needed a short transition period moving fully off the old spreadsheet habit",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js"],
    approach:
      "We reviewed the office manager's spreadsheet in detail to capture every contract-specific field the generic CRM couldn't handle, then designed the data model around actual contract terms rather than a generic template. Data migration was validated contract-by-contract before the spreadsheet was retired.",
    results:
      "Missed contract renewals dropped to zero in the first two quarters after launch, protecting recurring revenue that had previously slipped through the cracks, with sales staff now working from one unified view of each client.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "SprayCan", gradient: "light-teal-to-navy" },
  },
  {
    slug: "automated-review-referral-local-cleaning-business",
    title: "Automated Review & Referral Request System for a Local Cleaning Business",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Automation",
    description:
      "Set up an automated review and referral request system for a local cleaning business that relied heavily on word-of-mouth but had no consistent process for asking happy clients for reviews or referrals. The system sends a simple, well-timed request after each completed job, routing satisfied clients to the business's Google review page and flagging any negative feedback privately to the owner before it becomes a public review. It also includes a lightweight referral offer clients can share with friends, tracked automatically so the owner knows which reviews turned into new business. The entire setup runs without any ongoing manual work from the owner.",
    impact:
      "Grew the business's Google review count by an estimated 3x within the first few months, directly supporting its word-of-mouth growth model.",
    problemStatement:
      "A local cleaning business relied heavily on word-of-mouth but had no consistent process for asking happy clients for reviews or referrals, leaving growth largely to chance.",
    solution:
      "We set up an automated system sending a well-timed review request after each completed job, routing happy clients to Google reviews while flagging negative feedback privately to the owner first, plus a tracked referral offer clients can share.",
    features: [
      "Automatically-timed post-job review requests",
      "Private negative-feedback routing before it becomes a public review",
      "Trackable referral offer for clients to share",
      "Zero ongoing manual work for the owner",
      "Direct support for the business's word-of-mouth growth model",
    ],
    businessBenefits: [
      "Grew the business's Google review count by an estimated 3x within a few months",
      "Directly supported the word-of-mouth growth model the business already relied on",
      "Gave the owner visibility into which referrals turned into new business",
    ],
    prosAndCons: {
      pros: [
        "Runs entirely without ongoing manual work from the owner",
        "Catches negative feedback privately before it becomes a public review",
        "Referral tracking shows which happy clients are actually driving new business",
      ],
      cons: [
        "Review request timing needs occasional adjustment if job types or client expectations change",
        "Relies on clients actually following through on review/referral prompts, which won't be 100%",
      ],
    },
    technologies: ["Twilio", "Zapier", "Google My Business API", "Node.js"],
    approach:
      "We mapped the owner's existing, informal approach to asking for reviews first, then designed request timing around when clients were happiest — right after a completed job. The negative-feedback routing was tested with the owner's direct input on wording before the system went fully automated.",
    results:
      "The business's Google review count grew an estimated 3x within the first few months, directly supporting its word-of-mouth growth model, while the owner now knows which referrals are actually converting into new clients.",
    timeline: "3 weeks",
    orderValueBand: "$500-$2,500",
    image: { icon: "SprayCan", gradient: "teal-to-navy" },
  },
  {
    slug: "crew-scheduling-app-multi-city-janitorial-franchise",
    title: "Cross-Platform Crew Scheduling App for a Multi-City Janitorial Franchise",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Mobile App",
    description:
      "Built a crew scheduling app for a janitorial franchise operating in several cities, giving each location's manager a simple way to build weekly schedules and giving crew members a mobile view of their own shifts and site assignments. Crew members can request shift swaps directly in the app, which routes to their manager for approval instead of being handled over group text messages. This addressed a recurring headache across the franchise's locations: schedule changes getting lost in messaging threads and crews showing up confused about assignments. The app was built to work the same way across every franchise location while still letting each manager set their own scheduling rules.",
    impact:
      "Reduced scheduling-related no-shows and confusion across locations, giving franchise managers a consistent tool instead of ad hoc group chats.",
    problemStatement:
      "Schedule changes at a multi-city janitorial franchise regularly got lost in group text message threads, leaving crews showing up confused about assignments across different locations.",
    solution:
      "We built a crew scheduling app giving each location's manager a simple way to build weekly schedules and giving crew members a mobile view of their own shifts, with shift-swap requests routed for manager approval instead of handled over group text.",
    features: [
      "Weekly schedule building per location manager",
      "Mobile shift and site-assignment view for crew members",
      "In-app shift-swap requests with manager approval",
      "Consistent tool across every franchise location",
      "Manager-level flexibility to set local scheduling rules",
    ],
    businessBenefits: [
      "Reduced scheduling-related no-shows and confusion across locations",
      "Gave franchise managers a consistent tool instead of ad hoc group chats",
      "Replaced lost-in-the-thread schedule changes with a trackable approval flow",
    ],
    prosAndCons: {
      pros: [
        "Consistent experience across every franchise location",
        "Shift-swap approvals leave a clear record instead of buried text threads",
        "Managers keep flexibility to set their own local scheduling rules",
      ],
      cons: [
        "Requires every crew member to have a smartphone and use the app consistently",
        "Franchise-wide consistency depends on each location manager actually adopting it over old habits",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase", "Node.js"],
    approach:
      "We interviewed managers across several franchise locations to understand where group-text scheduling was breaking down most, then designed the swap-approval flow around those specific failure points. The app launched in two pilot locations before rolling out franchise-wide with a short manager training session.",
    results:
      "Scheduling-related no-shows and confusion dropped across locations, and franchise managers now have a consistent scheduling tool instead of relying on ad hoc group chats that regularly lost information.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "SprayCan", gradient: "navy-to-teal" },
  },
  {
    slug: "ai-quote-estimator-property-size-cleaning-startup",
    title: "AI-Powered Quote Estimator Based on Property Size for a Cleaning Services Startup",
    industry: "Cleaning & Janitorial Services",
    techCategory: "AI/ML",
    description:
      "Built a machine learning-based quote estimator for an early-stage cleaning services startup, trained on the founder's historical job data to predict accurate pricing based on property size, layout, and requested service level. This let the startup offer instant, consistent online quotes from day one rather than the founder manually pricing every request based on gut feeling, which didn't scale as inquiry volume grew. The model was intentionally kept simple and interpretable so the founder could understand and adjust its pricing logic as the business's costs changed. It was built to retrain periodically as more completed jobs added real pricing data to learn from.",
    impact:
      "Gave a pre-revenue-scale startup consistent, defensible pricing from its very first customers instead of ad hoc guesswork.",
    problemStatement:
      "An early-stage cleaning services startup relied on the founder manually pricing every request based on gut feeling, which didn't scale as inquiry volume grew and produced inconsistent quotes.",
    solution:
      "We built a machine learning-based quote estimator trained on the founder's historical job data, predicting accurate pricing from property size, layout, and requested service level — kept simple and interpretable so the founder could adjust its logic as costs changed.",
    features: [
      "Instant online quotes based on property size and service level",
      "Model trained directly on the founder's own historical job data",
      "Interpretable pricing logic the founder can review and adjust",
      "Periodic retraining as new completed jobs add data",
      "Consistent quotes across every inquiry, not case-by-case guesswork",
    ],
    businessBenefits: [
      "Gave a pre-revenue-scale startup consistent, defensible pricing from its first customers",
      "Removed founder time spent manually estimating every request",
      "Improved pricing consistency as the business scaled",
    ],
    prosAndCons: {
      pros: [
        "Interpretable model lets the founder understand and adjust pricing logic directly",
        "Retrains as more real job data comes in, improving over time",
        "Removes founder bottleneck on every single quote",
      ],
      cons: [
        "Accuracy is limited early on by a small initial training dataset",
        "Highly unusual properties still benefit from a founder gut-check before final pricing",
      ],
    },
    technologies: ["Python", "scikit-learn", "FastAPI", "Next.js"],
    approach:
      "We started with the limited historical job data the founder already had, deliberately choosing an interpretable model type over a black-box approach given the small dataset. The estimator launched with the founder still spot-checking quotes for the first few weeks before letting it run fully unsupervised.",
    results:
      "The startup now offers consistent, defensible pricing from its very first customers instead of ad hoc guesswork, with the model improving as more completed jobs feed back into it.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "SprayCan", gradient: "light-teal-to-navy" },
  },
  {
    slug: "invoicing-payment-integration-commercial-cleaning-contractor",
    title: "Custom Invoicing & Payment Integration System for a Commercial Cleaning Contractor",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Custom Software",
    description:
      "Built a custom invoicing system for a commercial cleaning contractor that automatically generates and sends invoices based on completed jobs logged in the field, then tracks payment status against each client's terms. The system integrates directly with the contractor's payment processor so clients can pay online with one click instead of mailing checks, which had been slowing down cash flow. Overdue invoices trigger automatic, appropriately-worded reminder emails instead of the office manager tracking down late payments by hand. We built the system around the contractor's existing job-tracking process rather than asking them to change how crews log completed work.",
    impact:
      "Shortened average time-to-payment by an estimated two weeks by removing manual invoicing delays and making online payment the default option.",
    problemStatement:
      "A commercial cleaning contractor's cash flow was slowed by manual invoicing and clients who paid by mailed check, with the office manager tracking down late payments by hand.",
    solution:
      "We built a custom invoicing system that automatically generates and sends invoices from completed jobs logged in the field, integrated with the client's payment processor for one-click online payment and automatic reminder emails for overdue invoices.",
    features: [
      "Automatic invoice generation from completed field jobs",
      "One-click online payment via integrated processor",
      "Automatic, appropriately-worded overdue payment reminders",
      "Payment status tracking against each client's terms",
      "Built around the contractor's existing job-tracking process",
    ],
    businessBenefits: [
      "Shortened average time-to-payment by an estimated two weeks",
      "Removed manual invoicing delays entirely",
      "Made online payment the default instead of mailed checks",
    ],
    prosAndCons: {
      pros: [
        "Built around the existing job-tracking process, no new step for crews",
        "Automatic reminders remove an awkward manual collections task",
        "One-click online payment noticeably speeds up cash flow",
      ],
      cons: [
        "Some long-standing clients preferred mailed checks and needed encouragement to switch",
        "Payment processor fees are a new, if modest, cost compared to checks",
      ],
    },
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Node.js"],
    approach:
      "We mapped the contractor's existing job-completion logging process first so invoicing could trigger automatically from data already being captured, rather than asking crews to log anything extra. The reminder email wording was refined with the office manager's input before automated reminders went live.",
    results:
      "Average time-to-payment shortened by an estimated two weeks as manual invoicing delays disappeared and online payment became the default option for clients.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "SprayCan", gradient: "teal-to-navy" },
  },
  {
    slug: "automated-supply-inventory-tracking-janitorial-company",
    title: "Automated Supply Inventory Tracking System for a Multi-Location Janitorial Company",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Automation",
    description:
      "Built an automated inventory tracking system for a janitorial company managing cleaning supplies across multiple storage locations and client sites, replacing a manual restocking process based on visual checks and guesswork. Crew leads log supply usage through a simple mobile form after each shift, and the system automatically generates restock alerts and purchase suggestions before a site runs out of critical supplies. This addressed a recurring operational problem where crews would arrive on-site to discover they were out of a key product, delaying the job. Restock thresholds were set per supply item based on the client's own historical usage patterns rather than a generic default.",
    impact:
      "Reduced supply-related job delays significantly and gave management a clear view of consumption trends across every site.",
    problemStatement:
      "Crews at a janitorial company managing supplies across multiple locations and client sites regularly arrived to discover they were out of a key product, delaying jobs, because restocking relied on visual checks and guesswork.",
    solution:
      "We built an automated inventory tracking system where crew leads log supply usage through a simple mobile form after each shift, generating restock alerts and purchase suggestions before a site runs out — with thresholds set per item based on that client's own usage patterns.",
    features: [
      "Simple mobile supply-usage logging per shift",
      "Automatic restock alerts before supplies run out",
      "Purchase suggestions based on historical usage",
      "Per-client, per-item restock thresholds",
      "Management-level consumption trend visibility across sites",
    ],
    businessBenefits: [
      "Reduced supply-related job delays significantly",
      "Gave management a clear view of consumption trends across every site",
      "Replaced guesswork-based restocking with data-driven thresholds",
    ],
    prosAndCons: {
      pros: [
        "Thresholds are tuned per client's actual usage, not a generic default",
        "Crews log usage in seconds through a simple mobile form",
        "Consumption trend visibility helps management plan purchasing ahead of time",
      ],
      cons: [
        "Depends on crews consistently logging usage after every shift for alerts to stay accurate",
        "New sites need a short data-collection period before thresholds are reliable",
      ],
    },
    technologies: ["React Native", "Node.js", "PostgreSQL"],
    approach:
      "We reviewed several months of the company's past supply-shortage incidents to understand which products caused the most disruption before designing threshold logic around those specific items first. The mobile logging form was kept deliberately short to encourage consistent crew use, tested with one region before expanding company-wide.",
    results:
      "Supply-related job delays dropped significantly, and management now has a clear view of consumption trends across every site instead of relying on visual checks and guesswork.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "SprayCan", gradient: "navy-to-teal" },
  },
  {
    slug: "ai-chatbot-after-hours-quote-requests-facility-services",
    title: "AI Chatbot for After-Hours Quote Requests at a 24/7 Facility Services Company",
    industry: "Cleaning & Janitorial Services",
    techCategory: "Chatbot",
    description:
      "Built an AI chatbot for a facility services company offering round-the-clock commercial cleaning and maintenance, designed to capture and qualify quote requests that came in overnight when no staff were available to answer. The chatbot gathers the essentials — facility type, size, service needed, and urgency — and routes emergency requests to an on-call manager immediately while queuing routine requests for the next business day. This mattered because the company's 24/7 positioning was undercut by a quote process that only actually ran during business hours. The chatbot's tone and escalation rules were built around the company's existing on-call protocols rather than a generic support script.",
    impact:
      "Ensured overnight and weekend inquiries were captured and triaged immediately, aligning the sales process with the company's round-the-clock brand promise.",
    problemStatement:
      "A 24/7 facility services company's round-the-clock positioning was undercut by a quote process that only actually ran during business hours, leaving overnight and weekend inquiries unanswered until the next business day.",
    solution:
      "We built an AI chatbot gathering facility type, size, service, and urgency, routing emergency requests to an on-call manager immediately while queuing routine requests for the next business day — with tone and escalation rules built around the company's existing on-call protocols.",
    features: [
      "Structured overnight and weekend quote intake",
      "Immediate on-call manager routing for emergency requests",
      "Routine-request queuing for next-business-day follow-up",
      "Escalation rules matched to existing on-call protocols",
      "Consistent quote intake regardless of time of day",
    ],
    businessBenefits: [
      "Ensured overnight and weekend inquiries were captured and triaged immediately",
      "Aligned the sales process with the company's round-the-clock brand promise",
      "Removed the gap between 24/7 positioning and business-hours-only quoting",
    ],
    prosAndCons: {
      pros: [
        "Escalation rules mirror the company's real on-call protocols, not a generic script",
        "Emergency requests reach a manager immediately, any hour",
        "Closes the gap between 24/7 marketing and business-hours-only reality",
      ],
      cons: [
        "On-call manager availability still ultimately determines emergency response speed",
        "Escalation rules need updating if the company's on-call structure changes",
      ],
    },
    technologies: ["OpenAI API", "Twilio", "Node.js", "PostgreSQL"],
    approach:
      "We reviewed the company's existing on-call protocols in detail to make sure escalation rules matched real operational practice rather than a generic urgency scale. The chatbot was tested against a range of simulated overnight scenarios, including genuine emergencies, before going live as the primary after-hours contact point.",
    results:
      "Overnight and weekend inquiries are now captured and triaged immediately instead of waiting until the next business day, finally aligning the company's sales process with its round-the-clock brand promise.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "SprayCan", gradient: "light-teal-to-navy" },
  },
];

export const consultantsProjects: PortfolioProject[] = [
  {
    slug: "branded-client-portal-multi-practice-consulting-firm",
    title: "Branded Client Portal for a Multi-Practice Management Consulting Firm",
    industry: "Consultants",
    techCategory: "Custom Software",
    description:
      "Built a branded client portal for a management consulting firm running multiple concurrent engagements across different practice areas, replacing scattered email threads and shared drive folders as the way clients received deliverables. Each client gets a private, password-protected space showing project timeline, uploaded deliverables, and open action items, with consultants able to post updates without leaving their existing project-tracking tools. The portal was built to reflect the firm's brand rather than feel like a generic file-sharing tool, reinforcing the premium positioning the firm markets to prospective clients. We also added a simple activity log so partners could see at a glance which clients hadn't logged in recently and might need a check-in call.",
    impact:
      "Gave the firm a consistent, professional client experience across every engagement, and cut the \"where's my deliverable\" emails partners were fielding by an estimated 50%.",
    problemStatement:
      "Clients received deliverables and updates through scattered email threads and shared drive folders, giving the firm no consistent, professional way to keep multiple concurrent engagements organized across different practice areas.",
    solution:
      "We built a branded client portal giving each client a private, password-protected space with project timeline, deliverables, and open action items, reinforcing the firm's premium positioning instead of feeling like a generic file-sharing tool.",
    features: [
      "Private, password-protected space per client",
      "Project timeline and deliverable tracking",
      "Consultant updates posted without leaving existing project tools",
      "Client activity log showing recent logins",
      "Firm-branded look and feel throughout",
    ],
    businessBenefits: [
      "Gave the firm a consistent, professional client experience across every engagement",
      "Cut \"where's my deliverable\" emails by an estimated 50%",
      "Let partners spot disengaged clients early via the activity log",
    ],
    prosAndCons: {
      pros: [
        "Reinforces premium brand positioning instead of a generic file-share tool",
        "Activity log flags disengaged clients before it becomes a relationship problem",
        "Consultants keep using their existing project-tracking tools",
      ],
      cons: [
        "Requires consultants to remember to post client-facing updates through the portal, not just internally",
        "Best suited for firms running several concurrent engagements — overkill for a single-engagement practice",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js"],
    approach:
      "We started by shadowing how partners currently shared updates and deliverables across a sample of engagements, then designed the portal's information architecture around what clients actually asked for status on. It launched with one practice area as a pilot before rolling out firm-wide.",
    results:
      "The firm now delivers a consistent, professional client experience across every engagement instead of ad hoc email threads, and partners report a meaningful drop in status-check emails since clients can see progress themselves.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Briefcase", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-proposal-document-generation-solo-strategy-consultant",
    title: "AI-Powered Proposal & Document Generation Tool for a Solo Strategy Consultant",
    industry: "Consultants",
    techCategory: "AI/ML",
    description:
      "Built an AI-assisted proposal generation tool for a solo strategy consultant who was spending several hours drafting a custom proposal after every discovery call. The tool takes the consultant's raw call notes and generates a structured first-draft proposal — scope, timeline, and pricing options — formatted in the consultant's existing template and tone. The consultant reviews and edits every draft before sending; the tool is explicitly positioned as a first-pass writing aid, not an autonomous proposal-sender. We trained the prompt structure against a dozen of the consultant's best historical proposals so the output matched their actual voice rather than reading generically.",
    impact:
      "Cut average proposal turnaround from same-week to same-day, letting the consultant respond to hot leads while their interest was still highest.",
    problemStatement:
      "A solo strategy consultant was spending several hours drafting a custom proposal after every discovery call, which delayed follow-up and risked losing momentum with hot leads.",
    solution:
      "We built an AI-assisted tool that takes raw call notes and generates a structured first-draft proposal — scope, timeline, and pricing — formatted in the consultant's own template and tone, explicitly as a first-pass writing aid the consultant reviews before sending.",
    features: [
      "First-draft proposal generation from raw call notes",
      "Scope, timeline, and pricing sections auto-populated",
      "Output formatted in the consultant's existing template",
      "Trained on the consultant's own historical best proposals",
      "Consultant review step before anything is sent",
    ],
    businessBenefits: [
      "Cut average proposal turnaround from same-week to same-day",
      "Let the consultant respond to hot leads while interest was highest",
      "Freed hours per week previously spent on first-draft writing",
    ],
    prosAndCons: {
      pros: [
        "Matches the consultant's actual voice instead of reading generically",
        "Keeps a human review step, not an autonomous proposal-sender",
        "Dramatically shortens time-to-follow-up after a strong call",
      ],
      cons: [
        "Draft quality depends on how clearly call notes are captured",
        "Best suited to consultants who already have a consistent proposal structure to train against",
      ],
    },
    technologies: ["OpenAI API", "Python", "Next.js"],
    approach:
      "We trained the prompt structure against a dozen of the consultant's best historical proposals to match their actual voice, then tested output against a batch of past real discovery-call notes to confirm quality before going live. The consultant used it alongside the old manual process for two weeks before fully switching over.",
    results:
      "Proposal turnaround dropped from same-week to same-day, letting the consultant respond to hot leads while interest was still highest instead of losing momentum during a multi-day drafting delay.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Briefcase", gradient: "navy-to-teal" },
  },
  {
    slug: "crm-calendar-automation-financial-advisory-practice",
    title: "CRM & Calendar Automation System for a Growing Financial Advisory Practice",
    industry: "Consultants",
    techCategory: "Automation",
    description:
      "Set up a CRM and calendar automation system for a financial advisory practice that had grown to a point where manual pipeline tracking in spreadsheets was starting to drop leads. New inquiries are automatically logged, tagged by referral source, and assigned a follow-up sequence based on where they are in the client journey, from first contact through onboarding paperwork. Meeting scheduling was connected directly to advisors' calendars so prospects can book a consultation without a round of back-and-forth emails. The system was built around the practice's existing CRM rather than requiring a costly platform migration.",
    impact:
      "Eliminated the lead-tracking gaps that came from spreadsheet-based pipeline management, recovering an estimated 15% of inquiries that had previously gone unanswered.",
    problemStatement:
      "A financial advisory practice had grown to the point where manual pipeline tracking in spreadsheets was starting to drop leads, with no consistent follow-up sequence based on where a prospect actually was in the client journey.",
    solution:
      "We set up a CRM and calendar automation system that logs and tags new inquiries by referral source, assigns a follow-up sequence automatically, and connects meeting scheduling directly to advisors' calendars — built around the practice's existing CRM rather than a costly platform migration.",
    features: [
      "Automatic inquiry logging and referral-source tagging",
      "Journey-stage-based follow-up sequences",
      "Direct advisor calendar booking, no back-and-forth emails",
      "Built around the existing CRM, no platform migration",
      "Onboarding paperwork tracked through to completion",
    ],
    businessBenefits: [
      "Eliminated lead-tracking gaps from spreadsheet-based pipeline management",
      "Recovered an estimated 15% of inquiries that had previously gone unanswered",
      "Removed manual scheduling back-and-forth for prospects",
    ],
    prosAndCons: {
      pros: [
        "No costly CRM migration required",
        "Direct calendar booking removes a common friction point for prospects",
        "Journey-stage sequencing replaces one-size-fits-all follow-up",
      ],
      cons: [
        "Requires referral-source tagging to be set up accurately at intake for reporting to stay useful",
        "Sequence timing needs occasional review as the practice's typical sales cycle shifts",
      ],
    },
    technologies: ["Node.js", "CRM API integration", "Calendar API integration", "Twilio"],
    approach:
      "We audited a sample of the practice's spreadsheet-tracked pipeline to find exactly where leads were falling through before designing the automated sequence. The system was piloted on new inquiries for one month, tracked against the old spreadsheet in parallel, before becoming the sole tracking method.",
    results:
      "Lead-tracking gaps from spreadsheet-based pipeline management are gone, and the practice recovered an estimated 15% of inquiries that had previously gone unanswered — now moving automatically through a consistent follow-up sequence.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Briefcase", gradient: "light-teal-to-navy" },
  },
  {
    slug: "branded-mobile-app-leadership-coaching-consultancy",
    title: "Branded Mobile App for a Leadership Coaching Consultancy",
    industry: "Consultants",
    techCategory: "Mobile App",
    description:
      "Built an iOS and Android app for a leadership coaching consultancy so clients could access session recordings, between-session exercises, and progress notes from their phone instead of a shared document. Coaches can push new exercises and resources directly to individual clients or entire cohorts, and clients can log reflections that sync automatically for the coach to review before the next session. This gave the consultancy a differentiated, premium-feeling client experience that supported the higher price point of its executive coaching packages. Push notifications remind clients of upcoming sessions and encourage them to complete exercises before their next call.",
    impact:
      "Strengthened the consultancy's premium positioning with a branded client experience, supporting its move upmarket into higher-priced executive coaching packages.",
    problemStatement:
      "Clients of a leadership coaching consultancy accessed session recordings, exercises, and progress notes through a shared document, which felt inconsistent with the premium positioning of its executive coaching packages.",
    solution:
      "We built an iOS and Android app where coaches push exercises and resources to individual clients or cohorts, and clients log reflections that sync automatically for the coach to review before the next session.",
    features: [
      "Session recordings and resources accessible from a client's phone",
      "Coach-to-client and coach-to-cohort resource pushing",
      "Client reflection logging that syncs before each session",
      "Push notifications for upcoming sessions and exercises",
      "Branded, premium-feeling client experience",
    ],
    businessBenefits: [
      "Strengthened the consultancy's premium positioning with a branded experience",
      "Supported its move upmarket into higher-priced executive coaching packages",
      "Gave coaches visibility into client reflections before each session",
    ],
    prosAndCons: {
      pros: [
        "Reinforces the premium positioning that justifies higher-priced packages",
        "Coaches walk into sessions already aware of client reflections",
        "Cohort-level pushing supports group coaching programs, not just 1:1",
      ],
      cons: [
        "Clients need to be comfortable adopting a dedicated app rather than a shared doc",
        "Ongoing content updates require the coach to keep exercise libraries current",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase", "Node.js"],
    approach:
      "We interviewed a handful of the consultancy's existing clients about what they wished the shared-document experience did better before designing the app's core flows. It launched with a pilot cohort before rolling out to the full client base.",
    results:
      "The consultancy now offers a branded, premium client experience that supports its move upmarket into higher-priced executive coaching packages, with coaches walking into sessions already informed by client reflections.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Briefcase", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-lead-qualification-chatbot-b2b-marketing-consultancy",
    title: "AI Lead-Qualification Chatbot for a B2B Marketing Consultancy",
    industry: "Consultants",
    techCategory: "Chatbot",
    description:
      "Built an AI chatbot for a B2B marketing consultancy's website that qualifies inbound leads by asking about budget range, team size, and current marketing challenges before offering a discovery call booking link. Previously, the founder was taking an initial call with every inquiry regardless of fit, which ate into time better spent on paying clients. The chatbot politely redirects clearly unqualified leads to free resources instead of a sales call, while fast-tracking a booking link for leads that match the consultancy's ideal client profile. Conversation summaries are sent to the founder ahead of every booked call so they walk in already knowing the prospect's context.",
    impact:
      "Cut the number of low-fit discovery calls by an estimated 40%, giving the founder more time for qualified prospects and existing client work.",
    problemStatement:
      "A B2B marketing consultancy's founder was taking an initial call with every inbound inquiry regardless of fit, eating into time better spent on paying clients.",
    solution:
      "We built an AI chatbot that qualifies leads by asking about budget, team size, and current marketing challenges, redirecting clearly unqualified leads to free resources while fast-tracking a booking link for leads matching the ideal client profile.",
    features: [
      "Structured qualification Q&A (budget, team size, challenges)",
      "Automatic redirect to free resources for unqualified leads",
      "Fast-tracked booking link for ideal-fit leads",
      "Conversation summaries sent ahead of every booked call",
      "No change to the founder's existing calendar tool",
    ],
    businessBenefits: [
      "Cut the number of low-fit discovery calls by an estimated 40%",
      "Gave the founder more time for qualified prospects and existing clients",
      "Delivered pre-call context so calls start faster",
    ],
    prosAndCons: {
      pros: [
        "Politely filters unqualified leads instead of ignoring them entirely",
        "Founder walks into every booked call already briefed on context",
        "Directly protects a solo founder's most limited resource — time",
      ],
      cons: [
        "Qualification criteria need periodic review as the consultancy's ideal client profile evolves",
        "Very early-stage inquiries with vague answers still sometimes need a human judgment call",
      ],
    },
    technologies: ["OpenAI API", "Next.js", "Node.js"],
    approach:
      "We defined the ideal client profile directly with the founder first, translating it into specific qualifying questions rather than a generic lead-scoring template. The chatbot was tested against a batch of past inquiries to confirm it would have correctly routed them before going live.",
    results:
      "Low-fit discovery calls dropped by an estimated 40%, giving the founder more time for qualified prospects and existing client work instead of taking every inbound call by default.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Briefcase", gradient: "navy-to-teal" },
  },
  {
    slug: "client-onboarding-intake-portal-hr-consulting-firm",
    title: "Client Onboarding & Intake Web Portal for an HR Consulting Firm",
    industry: "Consultants",
    techCategory: "Web App",
    description:
      "Built a client onboarding portal for an HR consulting firm that handles employee handbook reviews, policy audits, and compliance projects for small and mid-sized businesses. New clients complete a structured intake questionnaire through the portal instead of a lengthy back-and-forth email exchange, giving consultants the information they need to scope a project accurately from day one. The portal organizes each client's documents, questionnaire responses, and project status in one place, replacing a folder structure that had become hard for the growing consulting team to navigate consistently. We built the intake questions to branch based on company size and industry so clients only answer what's relevant to their situation.",
    impact:
      "Cut the average time from signed contract to project kickoff by an estimated one week by front-loading the information-gathering that used to happen over several email threads.",
    problemStatement:
      "New clients of an HR consulting firm completed intake through a lengthy back-and-forth email exchange, delaying accurate project scoping and slowing the growing team's ability to navigate a document folder structure consistently.",
    solution:
      "We built an onboarding portal with a structured, branching intake questionnaire based on company size and industry, organizing each client's documents, responses, and project status in one place.",
    features: [
      "Branching intake questionnaire by company size and industry",
      "Centralized document and response storage per client",
      "Project status visibility for the consulting team",
      "Replaces ad hoc folder structures",
      "Front-loads scoping information before kickoff",
    ],
    businessBenefits: [
      "Cut average time from signed contract to project kickoff by an estimated one week",
      "Gave consultants accurate scoping information from day one",
      "Made client information consistently organized as the team grew",
    ],
    prosAndCons: {
      pros: [
        "Branching logic means clients only answer what's relevant to them",
        "Consultants scope projects accurately from day one instead of guessing",
        "Consistent structure scales as the consulting team grows",
      ],
      cons: [
        "Questionnaire branches need updates as new engagement types are added",
        "Clients unfamiliar with online intake occasionally still call with questions",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js"],
    approach:
      "We mapped the firm's existing intake questions across several past engagement types to design branching logic that covered real scenarios rather than a generic form. The portal was piloted with new clients for one engagement type before covering the full service line.",
    results:
      "Time from signed contract to project kickoff dropped by an estimated one week, with consultants now scoping projects from complete information instead of assembling it from scattered email threads.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Briefcase", gradient: "light-teal-to-navy" },
  },
  {
    slug: "cv-document-digitization-compliance-consulting-firm",
    title: "Computer-Vision Document Digitization Tool for a Compliance Consulting Firm",
    industry: "Consultants",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision document digitization tool for a compliance consulting firm that regularly receives boxes of paper records from clients undergoing an audit. The tool scans and classifies incoming documents by type, extracts key fields like dates and reference numbers, and organizes everything into a searchable digital case file instead of consultants manually sorting through physical paperwork. This was particularly valuable during time-boxed audit engagements, where the firm's consultants were previously losing days of billable engagement time to manual document sorting before the actual analysis could begin. Extracted data is flagged for consultant review rather than treated as final, keeping a human check on anything the system isn't confident about.",
    impact:
      "Cut document-sorting time at the start of a typical audit engagement from several days to under a day, giving consultants more billable time for actual analysis.",
    problemStatement:
      "A compliance consulting firm's consultants were losing days of billable engagement time manually sorting through boxes of paper records during time-boxed audit engagements before analysis could even begin.",
    solution:
      "We built a computer-vision tool that scans and classifies incoming documents by type, extracts key fields, and organizes everything into a searchable digital case file, flagging low-confidence extractions for consultant review.",
    features: [
      "Automatic document scanning and classification",
      "Key field extraction (dates, reference numbers)",
      "Searchable digital case file per engagement",
      "Confidence-based flagging for consultant review",
      "Built for time-boxed audit engagement workflows",
    ],
    businessBenefits: [
      "Cut document-sorting time at the start of an audit from several days to under a day",
      "Gave consultants more billable time for actual analysis",
      "Reduced reliance on manual physical paperwork sorting",
    ],
    prosAndCons: {
      pros: [
        "Frees days of billable time per engagement previously lost to sorting",
        "Confidence-based flagging keeps a human check on uncertain extractions",
        "Searchable case files replace boxes of loose paperwork",
      ],
      cons: [
        "Handwritten or poor-quality scanned documents still need manual handling",
        "Classification accuracy depends on the range of document types trained on",
      ],
    },
    technologies: ["Python", "OpenCV", "Tesseract OCR", "AWS S3"],
    approach:
      "We trained the classification model on a sample of the firm's own past engagement documents across several document types, then validated extraction accuracy against a full completed audit's paperwork before rolling it out on a live engagement.",
    results:
      "Document-sorting time at the start of a typical audit dropped from several days to under a day, giving consultants meaningfully more billable time for actual analysis instead of manual paperwork sorting.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Briefcase", gradient: "teal-to-navy" },
  },
  {
    slug: "engagement-retainer-billing-system-multi-consultant-advisory-group",
    title: "Custom Engagement & Retainer Billing System for a Multi-Consultant Advisory Group",
    industry: "Consultants",
    techCategory: "Custom Software",
    description:
      "Built a custom billing system for a multi-consultant advisory group juggling a mix of hourly engagements, fixed-fee projects, and monthly retainers that its off-the-shelf invoicing tool couldn't cleanly handle. The system tracks billable time and project milestones per consultant, automatically generates the correct invoice type based on each client's contract terms, and flags retainer clients approaching their monthly hour cap. This replaced a process where the office manager was manually reconciling three different billing structures in a single spreadsheet every month. Partners now get a real-time view of billable utilization across the whole team instead of finding out at month-end.",
    impact:
      "Cut month-end billing reconciliation time by an estimated 70% and gave partners real-time visibility into consultant utilization for the first time.",
    problemStatement:
      "A multi-consultant advisory group's office manager was manually reconciling three different billing structures — hourly, fixed-fee, and retainer — in a single spreadsheet every month, with partners finding out about utilization only at month-end.",
    solution:
      "We built a custom billing system tracking billable time and milestones per consultant, automatically generating the correct invoice type per contract terms and flagging retainer clients approaching their monthly hour cap.",
    features: [
      "Per-consultant billable time and milestone tracking",
      "Automatic invoice-type generation by contract terms",
      "Retainer hour-cap approaching alerts",
      "Real-time billable utilization view for partners",
      "Replaces manual multi-structure spreadsheet reconciliation",
    ],
    businessBenefits: [
      "Cut month-end billing reconciliation time by an estimated 70%",
      "Gave partners real-time visibility into consultant utilization for the first time",
      "Reduced billing errors from manual cross-structure reconciliation",
    ],
    prosAndCons: {
      pros: [
        "Handles three distinct billing structures in one system instead of three workarounds",
        "Partners see utilization in real time instead of at month-end",
        "Hour-cap alerts prevent retainer client surprises",
      ],
      cons: [
        "Initial setup requires migrating and validating every active contract's terms",
        "New contract types outside the three original structures need configuration work",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js"],
    approach:
      "We reviewed every current contract type with the office manager to understand exactly how each billing structure's edge cases were being handled manually, then modeled the system around all three rather than picking one and forcing the others to fit. It was validated against a full month of past billing data before going live.",
    results:
      "Month-end billing reconciliation time dropped by an estimated 70%, and partners now have real-time visibility into consultant utilization across the whole team instead of finding out at month-end.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "Briefcase", gradient: "navy-to-teal" },
  },
  {
    slug: "predictive-client-churn-model-subscription-advisory-service",
    title: "Predictive Client Churn Model for a Subscription-Based Advisory Service",
    industry: "Consultants",
    techCategory: "AI/ML",
    description:
      "Built a machine learning model for a subscription-based advisory service that predicts which retainer clients are at elevated risk of canceling, based on engagement signals like meeting attendance, response times, and usage of the service's resources. The model surfaces an early warning to account managers weeks before a client would typically give notice, giving the team time to proactively address concerns rather than reacting to a cancellation email. We trained the model on the service's own historical churn data and validated it against a holdout period before it went live in the account team's workflow. The score is presented as a simple risk indicator inside the tool account managers already use daily, not a separate dashboard they'd have to remember to check.",
    impact:
      "Gave account managers weeks of advance warning on at-risk clients instead of finding out at cancellation, contributing to a measurable improvement in retainer retention.",
    problemStatement:
      "A subscription-based advisory service had no early warning system for retainer clients at risk of canceling, typically only finding out when a cancellation notice arrived.",
    solution:
      "We built a machine learning model predicting churn risk from engagement signals like meeting attendance and response times, surfacing an early warning to account managers weeks before a client would typically give notice, inside the tool they already use daily.",
    features: [
      "Churn risk scoring based on engagement signals",
      "Early-warning alerts weeks ahead of typical cancellation notice",
      "Score surfaced inside the account manager's existing tool",
      "Trained and validated on the service's own historical churn data",
      "No separate dashboard for account managers to remember to check",
    ],
    businessBenefits: [
      "Gave account managers weeks of advance warning on at-risk clients",
      "Contributed to a measurable improvement in retainer retention",
      "Let the team proactively address concerns instead of reacting to cancellations",
    ],
    prosAndCons: {
      pros: [
        "Surfaces inside the existing daily tool, no new habit to build",
        "Weeks of advance warning allows real proactive intervention",
        "Validated against the service's own historical churn data, not generic assumptions",
      ],
      cons: [
        "Risk score is probabilistic — not every flagged client will actually churn",
        "Requires enough historical churn data to train reliably, which limited early-stage accuracy",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI"],
    approach:
      "We trained the model on the service's own historical churn data and validated it against a holdout period to confirm real predictive value before it touched the account team's live workflow. Account managers gave feedback on early false positives, which shaped the final risk threshold.",
    results:
      "Account managers now get weeks of advance warning on at-risk clients instead of finding out at cancellation, contributing to a measurable improvement in retainer retention through proactive outreach.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Briefcase", gradient: "light-teal-to-navy" },
  },
  {
    slug: "automated-discovery-call-scheduling-independent-consultant",
    title: "Automated Discovery-Call Scheduling & Reminder System for an Independent Consultant",
    industry: "Consultants",
    techCategory: "Automation",
    description:
      "Set up an automated scheduling and reminder workflow for an independent consultant who was losing a noticeable share of booked discovery calls to no-shows. Prospects now book directly from a link that only shows genuinely open slots, receive an immediate confirmation, and get a reminder sequence timed at 24 hours and one hour before the call. No-shows are automatically offered a one-click rebooking link instead of requiring the consultant to chase them down manually. The entire setup runs on tools the consultant was already comfortable using, keeping the day-to-day workflow familiar.",
    impact:
      "Cut discovery-call no-shows by an estimated 45%, recovering calendar time that was previously blocked off and going unused.",
    problemStatement:
      "An independent consultant was losing a noticeable share of booked discovery calls to no-shows, with no automated reminder or rebooking process in place.",
    solution:
      "We set up a scheduling workflow where prospects book only genuinely open slots, get immediate confirmation and a two-stage reminder sequence, and no-shows receive an automatic one-click rebooking link — built entirely on tools the consultant already used.",
    features: [
      "Real-time available-slot booking link",
      "Immediate booking confirmation",
      "24-hour and 1-hour reminder sequence",
      "Automatic one-click rebooking offer for no-shows",
      "Built on the consultant's existing familiar tools",
    ],
    businessBenefits: [
      "Cut discovery-call no-shows by an estimated 45%",
      "Recovered calendar time previously blocked off and unused",
      "Removed manual no-show chasing from the consultant's workflow",
    ],
    prosAndCons: {
      pros: [
        "Built entirely on tools the consultant was already comfortable using",
        "Two-stage reminders meaningfully reduce no-shows without being intrusive",
        "One-click rebooking removes an awkward manual chase-down step",
      ],
      cons: [
        "Reminder cadence may need tuning for prospects in different time zones",
        "Doesn't address no-shows caused by a poor lead-qualification fit upstream",
      ],
    },
    technologies: ["Calendly API", "Twilio", "Zapier"],
    approach:
      "We reviewed the consultant's actual no-show patterns over recent months to time reminders around the specific drop-off points, rather than a generic reminder cadence. The new booking flow ran alongside the old process for two weeks before fully replacing it.",
    results:
      "Discovery-call no-shows dropped by an estimated 45%, recovering calendar time that was previously blocked off and going unused — time now filled with calls that actually happen.",
    timeline: "4 weeks",
    orderValueBand: "$2,500-$5,000",
    image: { icon: "Briefcase", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-faq-resource-chatbot-online-business-coaching-program",
    title: "AI FAQ & Resource Chatbot for an Online Business Coaching Program",
    industry: "Consultants",
    techCategory: "Chatbot",
    description:
      "Built an AI chatbot for an online business coaching program's private community site that answers common student questions about course content, homework deadlines, and where to find specific resources. Before the chatbot, the coach and a part-time assistant were answering the same handful of questions dozens of times a week across community posts and direct messages. The chatbot draws its answers directly from the program's existing course materials and FAQ documentation, and clearly hands off to the coach for anything outside that scope rather than guessing. It's available around the clock, which mattered given the program's students span multiple time zones.",
    impact:
      "Cut repetitive support questions reaching the coach directly by an estimated 60%, freeing time for higher-value coaching interactions with students.",
    problemStatement:
      "A coach and part-time assistant were answering the same handful of student questions dozens of times a week across community posts and direct messages, with students spanning multiple time zones needing answers outside normal hours.",
    solution:
      "We built an AI chatbot drawing answers directly from the program's existing course materials and FAQ documentation, available around the clock, that clearly hands off to the coach for anything outside its scope rather than guessing.",
    features: [
      "Answers drawn directly from existing course materials and FAQs",
      "Available around the clock across time zones",
      "Clear hand-off to the coach for out-of-scope questions",
      "No separate content to maintain beyond existing materials",
      "Reduces repetitive load on the coach and assistant",
    ],
    businessBenefits: [
      "Cut repetitive support questions reaching the coach directly by an estimated 60%",
      "Freed time for higher-value coaching interactions with students",
      "Gave students round-the-clock answers regardless of time zone",
    ],
    prosAndCons: {
      pros: [
        "Draws from materials the coach already created, no separate content to maintain",
        "Frees the coach's time for higher-value coaching, not repetitive Q&A",
        "Available across every student time zone, not just business hours",
      ],
      cons: [
        "Answer quality depends on how well-organized the underlying course materials are",
        "Coach still needs to review and update source materials for the chatbot to stay accurate",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "React"],
    approach:
      "We indexed the program's existing course materials and FAQ documentation directly rather than asking the coach to write new content, then tested the chatbot against a list of the most commonly asked questions before launch. It ran for two weeks under active coach monitoring before becoming the default first point of contact.",
    results:
      "Repetitive support questions reaching the coach directly dropped by an estimated 60%, freeing meaningful time for higher-value coaching interactions with students.",
    timeline: "4 weeks",
    orderValueBand: "$500-$2,500",
    image: { icon: "Briefcase", gradient: "navy-to-teal" },
  },
  {
    slug: "roi-calculator-lead-magnet-growth-marketing-consultancy",
    title: "Interactive ROI Calculator & Lead Magnet Tool for a Growth Marketing Consultancy",
    industry: "Consultants",
    techCategory: "Web App",
    description:
      "Built an interactive ROI calculator for a growth marketing consultancy to use as a lead magnet on its website, letting visitors input their current marketing spend and conversion metrics to see a personalized projection of potential improvement. Capturing an email address to unlock the detailed results, the tool feeds qualified leads directly into the consultancy's CRM tagged with the inputs they provided, giving the sales team useful context before the first call. This replaced a generic downloadable PDF lead magnet that wasn't generating meaningful engagement or differentiating the consultancy from competitors offering the same kind of content. The calculator's underlying assumptions were built directly from the consultancy's own client benchmark data.",
    impact:
      "Became the consultancy's top-converting lead magnet, generating an estimated 3x more qualified inquiries than its previous downloadable PDF offer.",
    problemStatement:
      "A growth marketing consultancy's generic downloadable PDF lead magnet wasn't generating meaningful engagement or differentiating it from competitors offering similar content.",
    solution:
      "We built an interactive ROI calculator, using the consultancy's own client benchmark data, that lets visitors input their marketing spend and metrics to see a personalized improvement projection, capturing an email to unlock detailed results and feeding qualified leads directly into the CRM with context attached.",
    features: [
      "Interactive marketing-spend and conversion input flow",
      "Personalized ROI improvement projection",
      "Email capture gating detailed results",
      "Direct CRM handoff tagged with input context",
      "Calculations grounded in the consultancy's own benchmark data",
    ],
    businessBenefits: [
      "Became the consultancy's top-converting lead magnet",
      "Generated an estimated 3x more qualified inquiries than the previous PDF offer",
      "Gave the sales team useful context before the first call",
    ],
    prosAndCons: {
      pros: [
        "Personalized results outperform a generic static PDF meaningfully",
        "Sales team starts calls with real context instead of a blank slate",
        "Differentiates from competitors offering the same generic lead-magnet content",
      ],
      cons: [
        "Benchmark data needs periodic refreshing to stay credible and accurate",
        "Some visitors still drop off rather than provide an email to unlock results",
      ],
    },
    technologies: ["Next.js", "CRM API integration", "PostgreSQL"],
    approach:
      "We built the calculator's underlying assumptions directly from the consultancy's own client benchmark data rather than generic industry averages, then tested the projection logic against several real past client outcomes for credibility. It launched as an A/B test against the existing PDF offer before fully replacing it.",
    results:
      "The calculator became the consultancy's top-converting lead magnet, generating an estimated 3x more qualified inquiries than its previous downloadable PDF offer, with the sales team now starting calls already informed by each lead's own inputs.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Briefcase", gradient: "light-teal-to-navy" },
  },
];

export const foodDrinksProjects: PortfolioProject[] = [
  {
    slug: "online-ordering-reservation-platform-casual-dining-chain",
    title: "Online Ordering & Reservation Web Platform for a Multi-Location Casual Dining Chain",
    industry: "Food & Drinks",
    techCategory: "Web App",
    description:
      "Built a unified online ordering and reservation platform for a casual dining chain operating several locations, replacing a mix of third-party ordering widgets and phone-only reservations that varied location to location. Guests can now order pickup or delivery and book a table from the same site, with the platform automatically routing orders to the correct location's kitchen display system. This gave the chain a consistent brand experience across every location instead of the inconsistent one their prior patchwork of tools created. We also built in a simple admin view so each location's manager could adjust hours, availability, and menu items without needing help from corporate.",
    impact:
      "Consolidated ordering and reservations under one consistent brand experience across every location, and cut third-party ordering platform fees by bringing volume onto the chain's own site.",
    problemStatement:
      "A casual dining chain's ordering and reservation experience varied location to location, relying on a mix of third-party ordering widgets and phone-only reservations that gave guests an inconsistent brand experience.",
    solution:
      "We built a unified web platform where guests order pickup or delivery and book a table from the same site, with orders automatically routed to the correct location's kitchen display system and a simple admin view for managers to adjust hours and menus.",
    features: [
      "Unified ordering and reservation flow per location",
      "Automatic routing to the correct kitchen display system",
      "Location-manager admin panel for hours, availability, and menu",
      "Consistent branded experience across every location",
      "Reduced dependence on third-party ordering widgets",
    ],
    businessBenefits: [
      "Consolidated ordering and reservations under one consistent brand experience",
      "Cut third-party ordering platform fees by bringing volume onto the chain's own site",
      "Gave location managers self-service control without needing corporate help",
    ],
    prosAndCons: {
      pros: [
        "One consistent brand experience across every location instead of a patchwork",
        "Reduces ongoing third-party platform fees as volume shifts",
        "Manager self-service reduces corporate support requests",
      ],
      cons: [
        "Migrating existing third-party reservation data required a careful cutover plan",
        "Some guests still default to familiar third-party apps out of habit",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js", "Stripe"],
    approach:
      "We mapped how ordering and reservations varied across each location's prior patchwork of tools before designing one unified flow flexible enough for every location's operational quirks. The platform launched at one location as a pilot before rolling out chain-wide.",
    results:
      "Ordering and reservations now run under one consistent brand experience across every location, and the chain has meaningfully reduced third-party platform fees by shifting volume onto its own site.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "UtensilsCrossed", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-menu-upsell-chatbot-craft-cocktail-bar-group",
    title: "AI Menu & Upsell Chatbot for a Craft Cocktail Bar Group",
    industry: "Food & Drinks",
    techCategory: "Chatbot",
    description:
      "Built an AI chatbot embedded in a cocktail bar group's website and table QR menus that answers questions about ingredients, suggests pairings, and recommends a premium upgrade or add-on based on what a guest is already considering. The chatbot was trained on the group's actual menu and seasonal specials, and updates automatically whenever the menu changes rather than requiring a manual refresh. This addressed a real revenue opportunity the group had identified: guests often didn't know about premium spirit upgrades or shareable appetizers unless a server happened to mention them during a busy shift. The tone was tuned to match the group's upscale-but-approachable brand voice rather than sounding like a generic ordering bot.",
    impact:
      "Increased average check size on orders that used the chatbot by an estimated 12%, largely through upgrade and add-on suggestions servers didn't always have time to make.",
    problemStatement:
      "Guests at a cocktail bar group often didn't know about premium spirit upgrades or shareable appetizers unless a server happened to mention them during a busy shift, leaving real revenue on the table.",
    solution:
      "We built an AI chatbot on the website and table QR menus, trained on the group's actual menu and specials, that answers ingredient questions and recommends a relevant upgrade or add-on based on what a guest is already considering.",
    features: [
      "Ingredient and pairing Q&A trained on the real menu",
      "Contextual upgrade and add-on suggestions",
      "Automatic updates whenever the menu changes",
      "Brand-voice-tuned tone matching the group's positioning",
      "Available on both website and table QR menus",
    ],
    businessBenefits: [
      "Increased average check size on chatbot-assisted orders by an estimated 12%",
      "Surfaced premium upgrades servers didn't always have time to mention",
      "Kept menu information accurate without manual refreshes",
    ],
    prosAndCons: {
      pros: [
        "Surfaces upsell opportunities consistently, even during the busiest shifts",
        "Menu updates automatically, no manual refresh needed",
        "Tone matches the group's upscale-but-approachable brand voice",
      ],
      cons: [
        "Suggestion relevance depends on keeping menu and specials data current",
        "Best value shows up on higher-traffic nights — quiet shifts see a smaller lift",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "React"],
    approach:
      "We trained the chatbot directly on the group's live menu feed and worked with management to tune suggestion tone so it felt like a knowledgeable server, not a generic upsell bot. It launched at one location first to validate suggestion relevance before rolling out group-wide.",
    results:
      "Average check size on orders that used the chatbot rose an estimated 12%, largely through upgrade and add-on suggestions servers didn't always have time to make themselves.",
    timeline: "6 weeks",
    orderValueBand: "$2,500-$5,000",
    image: { icon: "UtensilsCrossed", gradient: "navy-to-teal" },
  },
  {
    slug: "cv-inventory-tracking-high-volume-bakery",
    title: "Computer-Vision Inventory Tracking System for a High-Volume Bakery",
    industry: "Food & Drinks",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision inventory system for a high-volume bakery that tracks shelf and case stock levels throughout the day using cameras already installed for security, avoiding the need for staff to manually count product during busy shifts. The system flags when a popular item is running low so staff can start a new batch before it actually sells out, and it logs end-of-day waste by comparing what was baked against what was sold or discarded. This gave the bakery real production data it never had before, replacing guesswork-based baking schedules built on the owner's intuition. The system was tuned specifically to recognize the bakery's own product line rather than using a generic retail object-detection model.",
    impact:
      "Reduced end-of-day unsold product waste by an estimated 20% by giving staff real-time visibility into stock levels instead of relying on periodic manual counts.",
    problemStatement:
      "A high-volume bakery relied on the owner's intuition for baking schedules, with no real production data, leading to both stockouts of popular items and significant unsold waste on slower days.",
    solution:
      "We built a computer-vision system using the bakery's existing security cameras to track shelf and case stock levels throughout the day, flagging low stock before items sell out and logging end-of-day waste automatically.",
    features: [
      "Shelf and case stock-level tracking via existing cameras",
      "Low-stock flagging before items sell out",
      "Automatic end-of-day waste logging",
      "Tuned specifically to the bakery's own product line",
      "No new hardware required beyond existing cameras",
    ],
    businessBenefits: [
      "Reduced end-of-day unsold product waste by an estimated 20%",
      "Gave staff real-time stock visibility instead of periodic manual counts",
      "Replaced guesswork-based baking schedules with real production data",
    ],
    prosAndCons: {
      pros: [
        "Uses cameras already installed for security, no new hardware cost",
        "Tuned to the bakery's specific product line, not a generic retail model",
        "Gives the owner real data to plan baking schedules instead of gut feel",
      ],
      cons: [
        "Detection accuracy depends on camera angle and lighting at each shelf",
        "New products need to be added to the recognition model before they're tracked accurately",
      ],
    },
    technologies: ["Python", "OpenCV", "PyTorch", "AWS S3"],
    approach:
      "We trained the detection model specifically on the bakery's own product photos rather than a generic retail dataset, then validated stock-level accuracy against manual counts over a two-week pilot before relying on it for baking decisions.",
    results:
      "End-of-day unsold product waste dropped by an estimated 20%, with staff now working from real-time stock visibility instead of periodic manual counts and guesswork-based baking schedules.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "UtensilsCrossed", gradient: "light-teal-to-navy" },
  },
  {
    slug: "automated-loyalty-winback-regional-coffee-shop-chain",
    title: "Automated Loyalty & Win-Back Campaign System for a Regional Coffee Shop Chain",
    industry: "Food & Drinks",
    techCategory: "Automation",
    description:
      "Built an automated loyalty and win-back system for a regional coffee shop chain that had a punch-card loyalty program but no way to re-engage customers who quietly stopped coming in. The system tracks purchase frequency per customer through the chain's point-of-sale integration and automatically sends a personalized offer when a regular customer hasn't visited in longer than their usual pattern. Loyalty rewards are tracked digitally instead of on paper cards that customers regularly lost or forgot to bring. The win-back offers were tuned to be modest enough to protect margin while still being compelling enough to bring lapsed customers back.",
    impact:
      "Brought back an estimated 18% of lapsed regular customers within the first quarter, recovering revenue that was previously lost silently.",
    problemStatement:
      "A regional coffee shop chain's punch-card loyalty program gave it no way to notice, or re-engage, customers who quietly stopped coming in.",
    solution:
      "We built an automated system tracking purchase frequency through the chain's POS integration, sending a personalized win-back offer when a regular customer's visit pattern breaks, with rewards tracked digitally instead of on easily-lost paper cards.",
    features: [
      "POS-integrated purchase frequency tracking per customer",
      "Automatic personalized win-back offers on pattern breaks",
      "Digital loyalty reward tracking, no paper cards",
      "Margin-conscious, modest win-back incentive tuning",
      "No manual campaign work required from staff",
    ],
    businessBenefits: [
      "Brought back an estimated 18% of lapsed regular customers within one quarter",
      "Recovered revenue that was previously lost silently",
      "Removed the friction and loss risk of physical punch cards",
    ],
    prosAndCons: {
      pros: [
        "POS integration means tracking happens automatically at every purchase",
        "Digital rewards remove the lost-punch-card problem entirely",
        "Win-back offers are tuned to protect margin, not just chase volume",
      ],
      cons: [
        "Offer effectiveness depends on POS data accurately capturing every visit",
        "Requires periodic review of what counts as a customer's usual visit pattern as it naturally shifts",
      ],
    },
    technologies: ["Node.js", "POS API integration", "Twilio", "PostgreSQL"],
    approach:
      "We analyzed historical POS data to define what a normal visit pattern looked like per customer segment before setting win-back trigger thresholds. Offer messaging and incentive size were tested against a control group for one month before rolling out chain-wide.",
    results:
      "The chain brought back an estimated 18% of lapsed regular customers within the first quarter, recovering revenue that had previously been lost silently with no follow-up at all.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "UtensilsCrossed", gradient: "teal-to-navy" },
  },
  {
    slug: "cross-platform-ordering-app-fast-casual-franchise",
    title: "Cross-Platform Ordering App for a Fast-Casual Restaurant Franchise",
    industry: "Food & Drinks",
    techCategory: "Mobile App",
    description:
      "Built an iOS and Android ordering app for a fast-casual restaurant franchise so customers could order ahead, customize items, and pay before arriving at any franchise location. Orders route automatically to the correct location's kitchen based on the customer's selected pickup spot, and the app remembers favorite orders to speed up repeat purchases. This gave the franchise its own branded ordering channel instead of relying entirely on third-party delivery apps that took a meaningful cut of every order and owned the customer relationship. We built the app to support the franchise's growing number of locations without requiring a rebuild each time a new location opens.",
    impact:
      "Shifted a meaningful share of order volume onto the franchise's own branded app, reducing third-party delivery platform fees and rebuilding direct customer relationships.",
    problemStatement:
      "A fast-casual restaurant franchise relied entirely on third-party delivery apps for online orders, which took a meaningful cut of every order and owned the customer relationship instead of the franchise.",
    solution:
      "We built an iOS and Android app supporting order-ahead, customization, and payment before arrival, with orders routed automatically to the correct location's kitchen and built to scale to new locations without a rebuild each time.",
    features: [
      "Order-ahead with item customization and pre-payment",
      "Automatic routing to the correct location's kitchen",
      "Favorite-order memory for faster repeat purchases",
      "Scalable architecture supporting new locations without rebuilds",
      "Franchise-owned, branded ordering channel",
    ],
    businessBenefits: [
      "Shifted a meaningful share of order volume onto the franchise's own branded app",
      "Reduced third-party delivery platform fees",
      "Rebuilt direct customer relationships the franchise had been missing",
    ],
    prosAndCons: {
      pros: [
        "Removes a meaningful ongoing fee paid to third-party delivery platforms",
        "Franchise owns the customer relationship and data directly",
        "Scales to new locations without a rebuild each time",
      ],
      cons: [
        "Requires ongoing marketing effort to shift habitual third-party-app users",
        "New locations still need to be onboarded into the kitchen-routing configuration",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase", "Stripe"],
    approach:
      "We designed the location-routing architecture first, since the franchise's growth plans meant new locations would be added regularly after launch. The app launched at a handful of locations as a pilot, validating kitchen-routing accuracy before rolling out to the full franchise network.",
    results:
      "The franchise shifted a meaningful share of order volume onto its own branded app, reducing third-party delivery platform fees and rebuilding the direct customer relationships those platforms had been standing between.",
    timeline: "4 months",
    orderValueBand: "$25,000+",
    image: { icon: "UtensilsCrossed", gradient: "navy-to-teal" },
  },
  {
    slug: "ai-demand-forecasting-multi-location-bakery-chain",
    title: "AI-Powered Demand Forecasting Model for a Multi-Location Bakery Chain",
    industry: "Food & Drinks",
    techCategory: "AI/ML",
    description:
      "Built a demand forecasting model for a multi-location bakery chain that predicts how much of each product to bake per location per day, based on historical sales, day of week, and seasonal patterns. Store managers had previously been estimating production quantities by feel, which led to both stockouts of popular items and significant unsold waste on slower days. The model's daily recommendations are delivered directly into the production planning sheet managers already use each morning, requiring no new software to learn. We validated the model against a full year of historical sales data across all locations before rolling it out chain-wide.",
    impact:
      "Reduced total unsold product waste across locations by an estimated 18% while also cutting mid-day stockouts of the chain's best-selling items.",
    problemStatement:
      "Store managers at a multi-location bakery chain were estimating production quantities by feel, leading to both stockouts of popular items and significant unsold waste on slower days.",
    solution:
      "We built a demand forecasting model predicting how much of each product to bake per location per day, based on historical sales, day of week, and seasonal patterns, delivering recommendations directly into the production planning sheet managers already use.",
    features: [
      "Per-location, per-product daily production recommendations",
      "Historical sales, day-of-week, and seasonal pattern modeling",
      "Delivered into the existing production planning sheet",
      "Validated against a full year of historical sales data",
      "No new software for managers to learn",
    ],
    businessBenefits: [
      "Reduced total unsold product waste across locations by an estimated 18%",
      "Cut mid-day stockouts of best-selling items",
      "Replaced feel-based estimation with data-backed recommendations",
    ],
    prosAndCons: {
      pros: [
        "Delivers into the existing planning sheet, no new tool for managers to learn",
        "Validated against a full year of real sales data before rollout",
        "Reduces both waste and stockouts simultaneously, not a trade-off between them",
      ],
      cons: [
        "Accuracy is lower for brand-new products without historical sales data",
        "Unusual one-off events, like weather or local happenings, can still throw off a day's forecast",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI"],
    approach:
      "We validated the model against a full year of historical sales data across all locations before rolling it out, comparing its recommendations against what managers had actually baked and sold historically. Managers used it alongside their own judgment for a few weeks before relying on it as the primary planning input.",
    results:
      "Total unsold product waste across locations dropped by an estimated 18%, while mid-day stockouts of the chain's best-selling items also fell — improving on both fronts rather than trading one for the other.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "UtensilsCrossed", gradient: "light-teal-to-navy" },
  },
  {
    slug: "catering-order-event-management-software-specialty-catering",
    title: "Custom Catering Order & Event Management Software for a Specialty Catering Company",
    industry: "Food & Drinks",
    techCategory: "Custom Software",
    description:
      "Built custom event and order management software for a specialty catering company handling everything from small private dinners to large corporate events, a business generic restaurant software wasn't designed to support. The system tracks each event's menu selections, staffing needs, equipment rentals, and delivery logistics in one place, replacing a combination of spreadsheets and printed event sheets that made last-minute changes error-prone. It generates a consolidated kitchen prep list and a separate logistics checklist automatically from each event's details, cutting down on manual cross-referencing between documents. We built the system around the specific event types and menu structure the caterer actually offers rather than adapting generic restaurant software.",
    impact:
      "Eliminated the manual cross-referencing between menu, staffing, and logistics documents that had caused costly last-minute event-day errors.",
    problemStatement:
      "A specialty catering company relied on a combination of spreadsheets and printed event sheets to track menu selections, staffing, equipment, and delivery logistics, making last-minute changes error-prone across events ranging from small dinners to large corporate functions.",
    solution:
      "We built custom event and order management software tracking every event's details in one place, generating a consolidated kitchen prep list and a separate logistics checklist automatically, built around the caterer's specific event types rather than adapted restaurant software.",
    features: [
      "Centralized menu, staffing, and logistics tracking per event",
      "Automatic kitchen prep list generation",
      "Automatic logistics checklist generation",
      "Built around the caterer's actual event types and menu structure",
      "Replaces spreadsheets and printed event sheets",
    ],
    businessBenefits: [
      "Eliminated manual cross-referencing between menu, staffing, and logistics documents",
      "Reduced costly last-minute event-day errors",
      "Gave the team one system of record instead of scattered documents",
    ],
    prosAndCons: {
      pros: [
        "Built around the caterer's actual event types, not generic restaurant software",
        "Auto-generated prep and logistics lists remove manual cross-referencing",
        "Scales from small dinners to large corporate events in one system",
      ],
      cons: [
        "Event-type templates need updates as the caterer adds new offering categories",
        "Staff needed a short transition period moving off printed event sheets",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js"],
    approach:
      "We reviewed a range of past events, from small dinners to large corporate functions, to understand every recurring logistics detail before designing the data model. The system launched on upcoming events of one type first, validating generated prep lists against what the kitchen actually needed, before covering every event type.",
    results:
      "The manual cross-referencing between menu, staffing, and logistics documents that had caused costly last-minute event-day errors is gone, replaced by automatically generated, consistent prep and logistics lists for every event.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "UtensilsCrossed", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-chatbot-social-media-orders-boutique-restaurant",
    title: "AI Chatbot for Social Media Order & Reservation Requests at a Boutique Restaurant",
    industry: "Food & Drinks",
    techCategory: "Chatbot",
    description:
      "Built an AI chatbot that monitors a boutique restaurant's social media direct messages and automatically handles order and reservation requests that were previously answered manually, often hours later, by the owner between shifts. The chatbot pulls current availability and menu information in real time so its answers never go stale, and it confirms reservations directly rather than just pointing customers to call the restaurant. Anything outside its scope, like large group bookings or special dietary accommodations, gets flagged for the owner to handle personally. This mattered because a growing share of the restaurant's inquiries were arriving through social media rather than phone calls, a channel the small team wasn't set up to monitor consistently.",
    impact:
      "Cut average response time to social media inquiries from several hours to under a minute, recovering bookings that were previously lost to slow replies.",
    problemStatement:
      "A growing share of a boutique restaurant's order and reservation inquiries arrived through social media direct messages, a channel the small team wasn't set up to monitor consistently, often answered hours later by the owner between shifts.",
    solution:
      "We built an AI chatbot that monitors social media DMs and handles order and reservation requests directly, pulling real-time availability and menu information so answers never go stale, flagging anything outside its scope for the owner.",
    features: [
      "Automated monitoring of social media direct messages",
      "Real-time availability and menu-aware responses",
      "Direct reservation confirmation, not just a phone-call redirect",
      "Escalation for large groups or special dietary requests",
      "No manual monitoring required from the owner between shifts",
    ],
    businessBenefits: [
      "Cut average response time to social media inquiries from hours to under a minute",
      "Recovered bookings previously lost to slow replies",
      "Freed the owner from monitoring DMs between shifts",
    ],
    prosAndCons: {
      pros: [
        "Confirms reservations directly instead of just redirecting to a phone call",
        "Real-time availability means answers are never stale",
        "Frees the owner from checking DMs between shifts",
      ],
      cons: [
        "Complex requests like large groups or special dietary needs still need the owner's personal attention",
        "Requires the restaurant's availability and menu data to stay current in the source system",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "Social media API integration"],
    approach:
      "We connected the chatbot to the restaurant's real-time availability and menu data first, since stale information would undermine trust immediately. It ran alongside the owner's manual replies for two weeks, with every conversation reviewed, before becoming the primary responder.",
    results:
      "Average response time to social media inquiries dropped from several hours to under a minute, recovering bookings that were previously lost to slow replies during busy shifts.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "UtensilsCrossed", gradient: "navy-to-teal" },
  },
  {
    slug: "automated-review-reputation-monitoring-restaurant-group",
    title: "Automated Review Request & Reputation Monitoring System for a Restaurant Group",
    industry: "Food & Drinks",
    techCategory: "Automation",
    description:
      "Built an automated review and reputation monitoring system for a restaurant group operating several locations, each with its own listing across multiple review platforms that no one was consistently tracking. The system sends a timed review request after a completed visit, routes happy guests toward public review platforms, and privately flags dissatisfied guests to the location manager before frustration turns into a public complaint. It also pulls new reviews from every platform into a single daily digest, so ownership no longer has to check five different apps to know how each location is doing. Response-time alerts flag any negative review that hasn't been addressed within a set window.",
    impact:
      "Increased average review volume across locations by an estimated 45% while cutting the time to respond to negative reviews from days to hours.",
    problemStatement:
      "A restaurant group operating several locations had reviews scattered across multiple platforms that no one was consistently tracking, with ownership needing to check five different apps just to know how each location was doing.",
    solution:
      "We built an automated system sending timed review requests after visits, routing happy guests to public platforms while privately flagging dissatisfied guests to the location manager, and pulling every platform's new reviews into a single daily digest.",
    features: [
      "Timed post-visit review requests",
      "Private routing of dissatisfied guest feedback to managers",
      "Single daily digest pulling reviews from every platform",
      "Response-time alerts for unaddressed negative reviews",
      "No manual platform-checking required from ownership",
    ],
    businessBenefits: [
      "Increased average review volume across locations by an estimated 45%",
      "Cut time to respond to negative reviews from days to hours",
      "Gave ownership one consolidated view instead of five separate apps",
    ],
    prosAndCons: {
      pros: [
        "One daily digest replaces checking five separate review platforms",
        "Catches dissatisfied guests privately before a public complaint",
        "Response-time alerts keep negative reviews from sitting unaddressed",
      ],
      cons: [
        "Review platform API changes occasionally require digest integration updates",
        "Still relies on managers actually acting on flagged negative feedback promptly",
      ],
    },
    technologies: ["Node.js", "Review platform API integrations", "Twilio", "PostgreSQL"],
    approach:
      "We connected each location's review platforms into the digest one at a time, validating that pulled reviews matched what was actually posted before adding the next platform. Response-time alert thresholds were set with management input on how quickly they realistically wanted to respond.",
    results:
      "Average review volume across locations rose an estimated 45%, while the time to respond to negative reviews dropped from days to hours, giving ownership a real handle on reputation across every location.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "UtensilsCrossed", gradient: "light-teal-to-navy" },
  },
  {
    slug: "cv-plating-consistency-checker-multi-location-restaurant-brand",
    title: "Computer-Vision Food Quality & Plating Consistency Checker for a Multi-Location Restaurant Brand",
    industry: "Food & Drinks",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision quality-check tool for a multi-location restaurant brand concerned that signature dishes weren't looking consistent across different kitchens and shifts. Line cooks photograph a finished plate at pass, and the system compares it against the brand's reference presentation standard, flagging noticeable deviations in portioning or plating for a manager to review before the dish goes out. This gave brand leadership an objective way to monitor plating consistency across locations instead of relying on periodic in-person visits that only caught a small sample of service. The tool was scoped as a quality-assurance aid for managers, not a replacement for chef judgment on the line.",
    impact:
      "Gave brand leadership visibility into plating consistency across every location for the first time, catching drift from brand standards before customers noticed it.",
    problemStatement:
      "A multi-location restaurant brand's signature dishes weren't looking consistent across different kitchens and shifts, and periodic in-person visits only caught a small sample of service, missing most instances of plating drift.",
    solution:
      "We built a computer-vision tool where line cooks photograph a finished plate at pass, comparing it against the brand's reference presentation standard and flagging noticeable deviations for a manager to review before the dish goes out.",
    features: [
      "Photo-based comparison against brand reference presentation",
      "Automatic flagging of portioning or plating deviations",
      "Manager review step before a flagged dish leaves the kitchen",
      "Coverage across every shift, not just periodic visits",
      "Scoped as a QA aid, not a replacement for chef judgment",
    ],
    businessBenefits: [
      "Gave brand leadership visibility into plating consistency across every location for the first time",
      "Caught drift from brand standards before customers noticed it",
      "Extended quality oversight beyond periodic in-person visits",
    ],
    prosAndCons: {
      pros: [
        "Covers every shift instead of relying on occasional in-person visits",
        "Catches plating drift before it reaches a customer's table",
        "Scoped explicitly as a QA aid, not overriding chef judgment",
      ],
      cons: [
        "Requires consistent camera angle and lighting at the pass for reliable comparisons",
        "Some genuinely creative plating variation can trigger a flag that isn't actually a problem",
      ],
    },
    technologies: ["Python", "OpenCV", "PyTorch", "AWS S3"],
    approach:
      "We built the reference presentation standards directly from the brand's own signature-dish photography, then tuned deviation thresholds with head chef input to distinguish real drift from acceptable variation. It launched at a few locations first to calibrate sensitivity before expanding brand-wide.",
    results:
      "Brand leadership now has visibility into plating consistency across every location for the first time, catching drift from brand standards before customers ever noticed it.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "UtensilsCrossed", gradient: "teal-to-navy" },
  },
  {
    slug: "digital-menu-qr-ordering-quick-service-chain",
    title: "Digital Menu & QR Ordering Platform for a Quick-Service Restaurant Chain",
    industry: "Food & Drinks",
    techCategory: "Web App",
    description:
      "Built a digital menu and QR ordering platform for a quick-service restaurant chain looking to speed up table service without adding staff during peak hours. Guests scan a code at their table to view the full menu with photos and order directly, with orders routing straight to the kitchen display system and payment handled in the same flow. This reduced the bottleneck at the counter during rush periods and gave the chain a way to test menu changes and pricing instantly across every location from one admin panel. The platform was built to also support easy translation into the chain's most commonly requested languages given its diverse customer base.",
    impact:
      "Reduced average counter wait time during peak hours by an estimated 30% and gave the chain a single place to update menu pricing across every location instantly.",
    problemStatement:
      "A quick-service restaurant chain needed to speed up table service without adding staff during peak hours, with the counter becoming a bottleneck during rush periods.",
    solution:
      "We built a digital menu and QR ordering platform where guests scan a code to view the full menu with photos and order and pay directly, with orders routing straight to the kitchen display system, and an admin panel letting the chain test menu and pricing changes instantly across every location.",
    features: [
      "QR-code table ordering with photo menu",
      "Integrated payment in the same flow",
      "Direct routing to the kitchen display system",
      "Instant chain-wide menu and pricing updates from one admin panel",
      "Built-in support for common requested languages",
    ],
    businessBenefits: [
      "Reduced average counter wait time during peak hours by an estimated 30%",
      "Gave the chain a single place to update pricing across every location instantly",
      "Reduced staffing pressure at the counter during rush periods",
    ],
    prosAndCons: {
      pros: [
        "Speeds up service during peak hours without adding counter staff",
        "One admin panel updates pricing everywhere instantly, no per-location work",
        "Multi-language support serves the chain's diverse customer base",
      ],
      cons: [
        "Guests less comfortable with QR ordering sometimes still prefer counter service",
        "Depends on reliable in-store Wi-Fi or cellular coverage at every table",
      ],
    },
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Node.js"],
    approach:
      "We piloted the QR ordering flow at one high-traffic location during peak hours first, measuring counter wait times before and after, before rolling it out chain-wide. Multi-language support was added based on the chain's most commonly requested languages from customer feedback.",
    results:
      "Average counter wait time during peak hours dropped by an estimated 30%, and the chain can now update menu pricing across every location instantly from one admin panel instead of location-by-location changes.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "UtensilsCrossed", gradient: "navy-to-teal" },
  },
  {
    slug: "loyalty-rewards-mobile-app-independent-pizzeria-group",
    title: "Loyalty Rewards Mobile App for an Independent Pizzeria Group",
    industry: "Food & Drinks",
    techCategory: "Mobile App",
    description:
      "Built a loyalty rewards mobile app for a small independent pizzeria group looking to compete with the loyalty programs of larger chains without the budget of a major franchise. Customers earn points on every order made through the app, redeemable for free items, and receive push notifications about limited-time specials and their point balance. The app replaced a punch-card system that was easy for customers to lose and gave the pizzeria group actual data on customer ordering habits for the first time. We kept the build intentionally simple and low-maintenance so the small team could run it without ongoing technical support.",
    impact:
      "Increased repeat order frequency among app users by an estimated 25%, giving a small independent group a loyalty experience competitive with much larger chains.",
    problemStatement:
      "An independent pizzeria group wanted to compete with the loyalty programs of larger chains but had no budget for a major franchise-scale platform, relying on an easily-lost punch-card system with no data on customer ordering habits.",
    solution:
      "We built a loyalty rewards app where customers earn points on every app order, redeemable for free items, with push notifications for specials and point balances — kept intentionally simple and low-maintenance for a small team to run.",
    features: [
      "Points earned on every in-app order",
      "Redeemable rewards for free items",
      "Push notifications for specials and point balances",
      "Actual customer ordering-habit data for the first time",
      "Low-maintenance build suited to a small team",
    ],
    businessBenefits: [
      "Increased repeat order frequency among app users by an estimated 25%",
      "Gave a small independent group a loyalty experience competitive with larger chains",
      "Provided real customer ordering data for the first time",
    ],
    prosAndCons: {
      pros: [
        "Gives a small independent group loyalty features competitive with big chains",
        "Digital points replace an easily-lost punch-card system",
        "Kept intentionally low-maintenance for a small team to run without support",
      ],
      cons: [
        "Requires customers to order through the app specifically to earn points",
        "Reward redemption rules need occasional review to keep margins healthy",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase"],
    approach:
      "We kept the build deliberately simple given the group's small team and budget, focusing on the core points-and-rewards loop rather than a broad feature set. It launched to existing regular customers first, who gave feedback on the reward structure before it opened to all customers.",
    results:
      "Repeat order frequency among app users rose an estimated 25%, giving a small independent pizzeria group a loyalty experience competitive with much larger chains at a fraction of the cost.",
    timeline: "8 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "UtensilsCrossed", gradient: "light-teal-to-navy" },
  },
];

export const hotelsHospitalityProjects: PortfolioProject[] = [
  {
    slug: "direct-booking-engine-independent-boutique-hotel",
    title: "Direct Booking Engine Web Platform for an Independent Boutique Hotel",
    industry: "Hotels & Hospitality",
    techCategory: "Web App",
    description:
      "Built a direct booking engine for an independent boutique hotel that had been relying almost entirely on third-party travel sites, paying steep commission on nearly every reservation. The platform shows real-time room availability and rates pulled from the hotel's existing property management system, letting guests book directly on the hotel's own branded website. We built in a rate-parity-aware pricing display so the hotel could offer a modest direct-booking incentive without violating its listing agreements with other channels. The booking flow was designed to be fast and mobile-friendly, since a majority of the hotel's site traffic was coming from phones.",
    impact:
      "Shifted an estimated 20% of bookings away from commission-based third-party sites onto the hotel's own direct channel within the first two quarters.",
    problemStatement:
      "An independent boutique hotel relied almost entirely on third-party travel sites for reservations, paying steep commission on nearly every booking with no meaningful direct-booking channel of its own.",
    solution:
      "We built a direct booking engine pulling real-time availability and rates from the hotel's existing property management system, with a rate-parity-aware pricing display letting the hotel offer a modest direct-booking incentive without violating other channel agreements.",
    features: [
      "Real-time availability and rate sync with the existing PMS",
      "Rate-parity-aware direct-booking incentive display",
      "Fast, mobile-friendly booking flow",
      "Hotel-branded booking experience",
      "No disruption to existing third-party channel agreements",
    ],
    businessBenefits: [
      "Shifted an estimated 20% of bookings onto the hotel's own direct channel within two quarters",
      "Reduced commission paid to third-party travel sites",
      "Gave the hotel a mobile-friendly booking experience matching its majority-mobile traffic",
    ],
    prosAndCons: {
      pros: [
        "Reduces ongoing commission costs on a growing share of bookings",
        "Rate-parity-aware design avoids conflict with other channel agreements",
        "Mobile-first flow matches how most guests actually browse and book",
      ],
      cons: [
        "Third-party channels remain an important discovery source and won't be fully replaced",
        "Requires the PMS integration to stay reliable for rates to display accurately",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "PMS API integration", "Stripe"],
    approach:
      "We reviewed the hotel's existing channel agreements closely to design an incentive structure that wouldn't violate rate-parity terms, then built the booking flow mobile-first given the majority of site traffic. It launched quietly before being promoted more heavily once availability sync was confirmed reliable.",
    results:
      "An estimated 20% of bookings shifted away from commission-based third-party sites onto the hotel's own direct channel within the first two quarters, meaningfully reducing commission costs.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "BedDouble", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-concierge-chatbot-full-service-resort",
    title: "AI Concierge Chatbot for a Full-Service Resort",
    industry: "Hotels & Hospitality",
    techCategory: "Chatbot",
    description:
      "Built an AI concierge chatbot for a full-service resort that handles guest questions about amenity hours, restaurant reservations, spa availability, and local recommendations around the clock. Before the chatbot, these requests all funneled through the front desk phone line, which became a bottleneck during check-in and check-out rushes. The chatbot connects to the resort's actual amenity booking systems so it can check real availability rather than giving generic answers, and it escalates anything requiring staff judgment — like a service complaint — directly to the relevant department. It was built to reflect the resort's warm, upscale brand voice rather than sounding like a generic customer service bot.",
    impact:
      "Reduced front-desk call volume for routine amenity and information requests by an estimated 35%, freeing staff to focus on guests actually at the desk.",
    problemStatement:
      "Guest questions about amenity hours, restaurant reservations, spa availability, and local recommendations all funneled through the front desk phone line at a full-service resort, becoming a bottleneck during check-in and check-out rushes.",
    solution:
      "We built an AI concierge chatbot connected to the resort's actual amenity booking systems, so it checks real availability rather than giving generic answers, escalating anything requiring staff judgment directly to the relevant department.",
    features: [
      "Real-time amenity, spa, and restaurant availability lookup",
      "Local recommendation suggestions",
      "Direct escalation to the right department for complaints",
      "Around-the-clock availability",
      "Brand-voice-tuned to the resort's upscale tone",
    ],
    businessBenefits: [
      "Reduced front-desk call volume for routine requests by an estimated 35%",
      "Freed staff to focus on guests actually at the desk",
      "Gave guests instant answers regardless of time of day",
    ],
    prosAndCons: {
      pros: [
        "Checks real amenity availability, not generic scripted answers",
        "Frees front-desk staff during check-in and check-out rushes specifically",
        "Escalates judgment calls to the right department instead of guessing",
      ],
      cons: [
        "Depends on amenity booking systems staying integrated and accurate",
        "Complex, high-touch guest requests still benefit from a human concierge",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "Amenity booking system API integration"],
    approach:
      "We connected the chatbot to the resort's real amenity booking systems first, since inaccurate availability answers would erode guest trust immediately. It launched during a lower-occupancy period to validate escalation routing before covering peak season.",
    results:
      "Front-desk call volume for routine amenity and information requests dropped by an estimated 35%, freeing staff to focus on guests actually at the desk during the busiest arrival and departure periods.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "BedDouble", gradient: "navy-to-teal" },
  },
  {
    slug: "dynamic-pricing-model-seasonal-beachfront-hotel",
    title: "Dynamic Pricing Model for a Seasonal Beachfront Hotel",
    industry: "Hotels & Hospitality",
    techCategory: "AI/ML",
    description:
      "Built a dynamic pricing model for a seasonal beachfront hotel that had been setting room rates manually based on the owner's experience and a rough sense of the local event calendar. The model adjusts recommended rates daily based on booking pace, remaining inventory, day of week, and nearby events, presenting suggestions the revenue manager can accept or override rather than changing prices automatically without oversight. This addressed real revenue left on the table during high-demand weekends that were being priced the same as an average weekday, as well as slow periods that stayed priced too high to fill remaining rooms. We validated the model's suggestions against a full prior season of the hotel's actual booking data before it went live.",
    impact:
      "Increased average revenue per available room by an estimated 12% over the following peak season compared to the hotel's prior manual pricing approach.",
    problemStatement:
      "A seasonal beachfront hotel set room rates manually based on the owner's experience and a rough sense of the local event calendar, leaving revenue on the table during high-demand weekends priced the same as an average weekday.",
    solution:
      "We built a dynamic pricing model adjusting recommended rates daily based on booking pace, remaining inventory, day of week, and nearby events, presenting suggestions the revenue manager can accept or override rather than changing prices automatically without oversight.",
    features: [
      "Daily rate recommendations based on booking pace and inventory",
      "Local event-calendar awareness",
      "Human-in-the-loop accept-or-override workflow",
      "Validated against a full prior season of booking data",
      "No fully automatic price changes without oversight",
    ],
    businessBenefits: [
      "Increased average revenue per available room by an estimated 12% over peak season",
      "Captured demand spikes that manual pricing missed",
      "Kept a revenue manager in control of final pricing decisions",
    ],
    prosAndCons: {
      pros: [
        "Keeps a human decision-maker in control rather than fully automated pricing",
        "Captures high-demand weekend pricing opportunities manual rates missed",
        "Validated against a full prior season before going live",
      ],
      cons: [
        "Recommendation quality depends on the event-calendar data staying current",
        "Requires the revenue manager to actually review and act on suggestions daily",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI"],
    approach:
      "We validated the model's suggestions against a full prior season of the hotel's actual booking data before it went live, comparing what it would have recommended against what was actually charged. The revenue manager reviewed and could override every suggestion during a full season before the model's accuracy was fully trusted.",
    results:
      "Average revenue per available room rose an estimated 12% over the following peak season compared to the hotel's prior manual pricing approach, capturing demand the old approach was leaving on the table.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "BedDouble", gradient: "light-teal-to-navy" },
  },
  {
    slug: "guest-mobile-app-digital-key-boutique-hotel-group",
    title: "Guest Mobile App with Digital Room Key for a Boutique Hotel Group",
    industry: "Hotels & Hospitality",
    techCategory: "Mobile App",
    description:
      "Built an iOS and Android guest app for a boutique hotel group that lets guests check in remotely, unlock their room with a digital key, and message the front desk directly from their phone. The app integrates with the group's existing smart-lock hardware and property management system so digital keys activate automatically the moment a reservation is confirmed for arrival. This gave tech-forward guests the contactless, self-service experience they increasingly expect from boutique properties, while still keeping a traditional front-desk option available for guests who prefer it. In-app messaging routes requests to the correct department automatically based on keywords, rather than everything landing in one general inbox.",
    impact:
      "Reduced average front-desk check-in wait time during peak arrival hours by an estimated 40% for guests who used the app's remote check-in option.",
    problemStatement:
      "A boutique hotel group's tech-forward guests increasingly expected a contactless, self-service experience, but check-in and room access still required a traditional front-desk interaction for everyone.",
    solution:
      "We built an iOS and Android app letting guests check in remotely and unlock their room with a digital key, integrated with the group's existing smart-lock hardware and PMS so keys activate automatically on confirmed arrival, while keeping a traditional front-desk option available.",
    features: [
      "Remote check-in from the guest's phone",
      "Digital room key via existing smart-lock integration",
      "Automatic key activation on confirmed arrival",
      "In-app messaging routed to the correct department automatically",
      "Traditional front-desk option preserved for guests who prefer it",
    ],
    businessBenefits: [
      "Reduced average front-desk check-in wait time during peak hours by an estimated 40% for app users",
      "Gave tech-forward guests the contactless experience they expect",
      "Kept a traditional option for guests who prefer it",
    ],
    prosAndCons: {
      pros: [
        "Integrates with existing smart-lock hardware, no lock replacement needed",
        "Keyword-based message routing gets requests to the right department automatically",
        "Preserves a traditional front-desk path, not an all-or-nothing switch",
      ],
      cons: [
        "Requires reliable smart-lock connectivity to activate keys on time",
        "Guests unfamiliar with digital keys still need front-desk support occasionally",
      ],
    },
    technologies: ["React Native", "Expo", "Smart-lock API integration", "PMS API integration"],
    approach:
      "We worked closely with the group's smart-lock vendor to confirm reliable key activation timing before building the guest-facing app around it. The app launched at one property first to validate the full remote check-in flow before expanding across the group.",
    results:
      "Average front-desk check-in wait time during peak arrival hours dropped by an estimated 40% for guests who used the app's remote check-in option, delivering the contactless experience tech-forward guests increasingly expect.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "BedDouble", gradient: "teal-to-navy" },
  },
  {
    slug: "automated-pre-arrival-post-stay-messaging-multi-property-hotel-group",
    title: "Automated Pre-Arrival & Post-Stay Guest Messaging System for a Multi-Property Hotel Group",
    industry: "Hotels & Hospitality",
    techCategory: "Automation",
    description:
      "Built an automated guest messaging system for a multi-property hotel group that sends timed pre-arrival information — parking, check-in instructions, local tips — and a post-stay follow-up sequence after every checkout. Previously, this kind of guest communication happened inconsistently across properties, dependent on whether a particular front-desk shift remembered to send it. The system pulls reservation data directly from each property's PMS so messaging is automatically personalized to guest names, room types, and length of stay without staff needing to manually customize anything. Post-stay messages route naturally into a review request, timed a day or two after checkout rather than immediately at departure.",
    impact:
      "Standardized guest communication quality across every property in the group and contributed to a meaningful increase in post-stay review submissions.",
    problemStatement:
      "Pre-arrival and post-stay guest communication at a multi-property hotel group happened inconsistently, dependent on whether a particular front-desk shift remembered to send it.",
    solution:
      "We built an automated messaging system pulling reservation data directly from each property's PMS to send personalized pre-arrival information and a post-stay follow-up sequence, timed naturally into a review request a day or two after checkout.",
    features: [
      "Automatic pre-arrival information (parking, check-in, local tips)",
      "PMS-personalized messaging by guest name, room type, and stay length",
      "Post-stay follow-up sequence",
      "Naturally timed review request after checkout",
      "Consistent messaging across every property",
    ],
    businessBenefits: [
      "Standardized guest communication quality across every property in the group",
      "Contributed to a meaningful increase in post-stay review submissions",
      "Removed dependence on individual shifts remembering to send messages",
    ],
    prosAndCons: {
      pros: [
        "Removes reliance on individual staff remembering to send guest communication",
        "Personalization comes directly from PMS data, no manual customization needed",
        "Review request timing is tuned rather than immediate and easy to ignore",
      ],
      cons: [
        "Message quality depends on PMS data being accurate and complete per reservation",
        "Message templates need periodic refreshing to avoid feeling generic over time",
      ],
    },
    technologies: ["Node.js", "PMS API integration", "Twilio", "SendGrid"],
    approach:
      "We pulled a sample of past guest communications across properties to identify what was being sent inconsistently before designing a single standardized sequence. It launched at one property, comparing review submission rates before and after, before rolling out group-wide.",
    results:
      "Guest communication quality is now standardized across every property in the group, contributing to a meaningful increase in post-stay review submissions compared to the group's prior inconsistent approach.",
    timeline: "6 weeks",
    orderValueBand: "$2,500-$5,000",
    image: { icon: "BedDouble", gradient: "navy-to-teal" },
  },
  {
    slug: "cv-housekeeping-verification-multi-property-hotel-group",
    title: "Computer-Vision Housekeeping Verification Tool for a Multi-Property Hotel Group",
    industry: "Hotels & Hospitality",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision verification tool for a multi-property hotel group's housekeeping team to confirm rooms meet cleaning and staging standards before being marked ready for the next guest. Housekeepers photograph a finished room, and the system checks against the brand's standard setup — checking key areas like made beds, cleared surfaces, and properly arranged amenities — flagging likely misses for a supervisor to double-check. This gave the group an objective, consistent quality layer across properties with different housekeeping teams and turnover rates, rather than relying entirely on spot-check inspections. The tool was explicitly scoped to flag likely issues for human review, not to certify a room ready on its own.",
    impact:
      "Cut guest complaints related to room readiness by catching an estimated majority of housekeeping misses before a guest ever checked in.",
    problemStatement:
      "A multi-property hotel group relied entirely on spot-check inspections to catch housekeeping quality issues, with different teams and turnover rates across properties leading to inconsistent room readiness.",
    solution:
      "We built a computer-vision tool where housekeepers photograph a finished room, checking it against the brand's standard setup — beds, surfaces, amenities — and flagging likely misses for a supervisor to double-check, explicitly scoped to flag issues for human review rather than certify a room on its own.",
    features: [
      "Photo-based comparison against brand cleaning standards",
      "Automatic flagging of likely misses (beds, surfaces, amenities)",
      "Supervisor double-check workflow for flagged rooms",
      "Consistent standard applied across properties with different teams",
      "Scoped as a flagging aid, not an automatic certification",
    ],
    businessBenefits: [
      "Cut guest complaints related to room readiness",
      "Caught an estimated majority of housekeeping misses before check-in",
      "Gave the group a consistent quality layer across properties with different teams",
    ],
    prosAndCons: {
      pros: [
        "Consistent standard applied across every property regardless of local team turnover",
        "Catches issues before a guest ever checks in, not after a complaint",
        "Explicitly scoped as a flagging aid, keeping supervisor judgment in the loop",
      ],
      cons: [
        "Requires housekeepers to consistently photograph rooms for the system to catch anything",
        "Flagging accuracy depends on photo angle and lighting consistency",
      ],
    },
    technologies: ["Python", "OpenCV", "AWS S3"],
    approach:
      "We defined the brand's standard room setup criteria together with housekeeping leadership, then trained the flagging model against a set of known-good and known-flawed room photos. It ran alongside manual spot-checks at one property for several weeks before supervisors relied on it as the primary review trigger.",
    results:
      "Guest complaints related to room readiness dropped as the group now catches an estimated majority of housekeeping misses before a guest ever checks in, instead of relying on periodic spot-check inspections.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "BedDouble", gradient: "light-teal-to-navy" },
  },
  {
    slug: "channel-manager-integration-hub-independent-hotel-group",
    title: "Custom Channel Manager Integration Hub for an Independent Hotel Group",
    industry: "Hotels & Hospitality",
    techCategory: "Custom Software",
    description:
      "Built a custom integration hub connecting an independent hotel group's property management system, channel manager, and direct booking engine so availability and rates stay synchronized across every platform automatically. Before this, staff were manually updating rates and blocking inventory across several booking sites whenever availability changed, which occasionally led to overbooking when updates lagged behind actual demand. The hub pushes updates in near real time and includes an alert system that flags any platform that stops syncing correctly, so staff catch integration issues before they turn into a double-booked room. We built the system around the group's existing vendor stack rather than requiring a switch to new booking or channel management software.",
    impact:
      "Eliminated the overbooking incidents that had been happening from manual rate and availability updates lagging across booking channels.",
    problemStatement:
      "Staff at an independent hotel group were manually updating rates and blocking inventory across several booking sites whenever availability changed, occasionally leading to overbooking when updates lagged behind actual demand.",
    solution:
      "We built a custom integration hub connecting the group's PMS, channel manager, and direct booking engine so availability and rates sync automatically in near real time, with an alert system flagging any platform that stops syncing correctly.",
    features: [
      "Near-real-time rate and availability sync across all platforms",
      "Automatic alerting when a platform's sync fails",
      "Built around the group's existing vendor stack",
      "No requirement to switch booking or channel-management software",
      "Reduced manual rate and inventory updates across sites",
    ],
    businessBenefits: [
      "Eliminated overbooking incidents caused by manual update lag",
      "Removed the need to manually update rates across multiple booking sites",
      "Gave staff early warning before a sync issue became a double-booked room",
    ],
    prosAndCons: {
      pros: [
        "Built around the group's existing vendor stack, no costly platform switch",
        "Sync-failure alerts catch problems before they become overbookings",
        "Near-real-time sync closes the lag window that caused prior incidents",
      ],
      cons: [
        "Still dependent on each connected platform's own API reliability",
        "Adding a new booking channel requires configuring a new integration",
      ],
    },
    technologies: ["Node.js", "PostgreSQL", "Channel manager API integration", "PMS API integration"],
    approach:
      "We mapped every platform in the group's existing vendor stack and how rate updates actually flowed, and sometimes stalled, between them before building the sync layer. The hub ran in parallel with manual updates for two weeks, comparing outcomes, before staff fully trusted it as the sole update method.",
    results:
      "The overbooking incidents that had been happening from manual rate and availability updates lagging across booking channels are gone, replaced by near-real-time sync with automatic alerts if anything stops working.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "BedDouble", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-guest-review-sentiment-dashboard-multi-location-hotel-brand",
    title: "AI-Powered Guest-Review Sentiment Analysis Dashboard for a Multi-Location Hotel Brand",
    industry: "Hotels & Hospitality",
    techCategory: "AI/ML",
    description:
      "Built an AI-powered dashboard for a multi-location hotel brand that pulls guest reviews from every major platform and analyzes sentiment across common themes — cleanliness, staff friendliness, room comfort, value — instead of leadership reading through hundreds of individual reviews. The dashboard highlights which specific themes are trending negative at which property, giving regional managers an early signal of an operational issue before it shows up as a falling overall rating. This replaced a manual quarterly review process where issues were often identified months after guests first started noticing them. The model was trained to handle the brand's specific terminology and property types rather than using a generic sentiment classifier.",
    impact:
      "Cut the time to detect an emerging property-level issue from a full quarter down to within a couple of weeks, based on real guest feedback trends.",
    problemStatement:
      "Leadership at a multi-location hotel brand relied on a manual quarterly review process to catch guest-feedback issues, often identifying problems months after guests first started noticing them.",
    solution:
      "We built an AI-powered dashboard pulling guest reviews from every major platform and analyzing sentiment across common themes — cleanliness, staff friendliness, room comfort, value — highlighting which themes are trending negative at which property before it shows up as a falling overall rating.",
    features: [
      "Cross-platform review aggregation",
      "Theme-level sentiment analysis (cleanliness, staff, comfort, value)",
      "Property-level early-warning trend highlighting",
      "Trained on the brand's specific terminology and property types",
      "Replaces manual quarterly review reading",
    ],
    businessBenefits: [
      "Cut the time to detect an emerging property-level issue from a quarter to within weeks",
      "Gave regional managers an early signal before ratings actually fell",
      "Removed the need to manually read through hundreds of individual reviews",
    ],
    prosAndCons: {
      pros: [
        "Detects issues within weeks instead of a full quarter later",
        "Theme-level breakdown pinpoints exactly what's driving sentiment, not just an overall score",
        "Trained on the brand's own terminology, not a generic sentiment classifier",
      ],
      cons: [
        "Sentiment analysis can occasionally misread sarcasm or unusual phrasing",
        "Still requires a regional manager to act on the early warning for it to matter",
      ],
    },
    technologies: ["Python", "OpenAI API", "PostgreSQL", "FastAPI"],
    approach:
      "We trained the sentiment model on a large sample of the brand's own historical reviews to handle its specific terminology and property types, then validated theme classifications against a manual quarterly review for accuracy before replacing that process entirely.",
    results:
      "The time to detect an emerging property-level issue dropped from a full quarter to within a couple of weeks, giving regional managers a real early-warning signal based on actual guest feedback trends instead of a lagging quarterly snapshot.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "BedDouble", gradient: "navy-to-teal" },
  },
  {
    slug: "multilingual-ai-concierge-chatbot-airport-hotel",
    title: "Multi-Language AI Concierge Chatbot for an Airport Hotel",
    industry: "Hotels & Hospitality",
    techCategory: "Chatbot",
    description:
      "Built a multi-language AI concierge chatbot for an airport hotel serving a highly international guest base, many of whom weren't comfortable communicating in English with the front desk over the phone. The chatbot handles common requests — shuttle schedules, late checkout, wake-up calls — in each guest's preferred language, automatically detected from how they write in, and escalates anything ambiguous to a human agent. This addressed a recurring pain point for both guests and staff: language barriers slowing down what should be simple, routine requests during already-stressful travel days. The chatbot's shuttle-schedule answers pull live data so information stays accurate even when flight delays shift the schedule.",
    impact:
      "Reduced miscommunication-related complaints from international guests and cut average response time on routine requests during peak arrival hours.",
    problemStatement:
      "Many guests at an airport hotel weren't comfortable communicating in English with the front desk over the phone, slowing down simple, routine requests during already-stressful travel days.",
    solution:
      "We built a multi-language AI concierge chatbot handling common requests — shuttle schedules, late checkout, wake-up calls — in each guest's preferred language, automatically detected, escalating anything ambiguous to a human agent, with shuttle answers pulling live data to stay accurate through flight delays.",
    features: [
      "Automatic language detection from guest messages",
      "Common request handling (shuttle, checkout, wake-up calls)",
      "Live shuttle-schedule data accounting for flight delays",
      "Escalation to a human agent for anything ambiguous",
      "Coverage for a highly international guest base",
    ],
    businessBenefits: [
      "Reduced miscommunication-related complaints from international guests",
      "Cut average response time on routine requests during peak arrival hours",
      "Removed language barriers from simple, routine guest requests",
    ],
    prosAndCons: {
      pros: [
        "Automatic language detection removes friction for international guests",
        "Live shuttle data stays accurate even as flight delays shift schedules",
        "Reduces stress for guests already dealing with travel-day friction",
      ],
      cons: [
        "Limited to the languages it was explicitly built and tested for",
        "Ambiguous requests in less common languages still need human escalation",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "Live transit/shuttle API integration"],
    approach:
      "We tested language detection and response accuracy across the hotel's most common guest languages before launch, connecting shuttle-schedule answers to live data given how often flight delays shifted timing. It launched during a moderate-traffic period to validate escalation handling before covering peak arrival season.",
    results:
      "Miscommunication-related complaints from international guests dropped, and average response time on routine requests during peak arrival hours improved, removing a real source of friction during already-stressful travel days.",
    timeline: "8 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "BedDouble", gradient: "light-teal-to-navy" },
  },
  {
    slug: "automated-abandoned-booking-recovery-boutique-hotel-group",
    title: "Automated Abandoned-Booking Recovery System for a Boutique Hotel Group",
    industry: "Hotels & Hospitality",
    techCategory: "Automation",
    description:
      "Built an automated abandoned-booking recovery system for a boutique hotel group that noticed a meaningful share of visitors were starting the booking process on its website and leaving without confirming a reservation. The system detects an incomplete booking, waits a short window in case the guest simply got distracted, then sends a gentle reminder email with their selected dates and room still held, along with a direct link back to finish booking. A small number of these recovery emails include a modest, time-limited incentive to complete the reservation, tuned carefully to avoid training guests to always abandon bookings for a discount. This gave the group a way to recapture revenue that had previously just disappeared with no follow-up at all.",
    impact:
      "Recovered an estimated 15% of abandoned bookings that would otherwise have gone to a competing property, directly adding incremental room revenue.",
    problemStatement:
      "A boutique hotel group noticed a meaningful share of website visitors were starting the booking process and leaving without confirming a reservation, with no follow-up process to recapture that lost interest.",
    solution:
      "We built an automated system detecting incomplete bookings, waiting a short window in case the guest simply got distracted, then sending a gentle reminder email with their selected dates and room still held, with a small number of emails including a modest, carefully-tuned incentive.",
    features: [
      "Automatic incomplete-booking detection",
      "Timed reminder with dates and room still held",
      "Direct link back to finish booking",
      "Modest, carefully-tuned incentive on select emails",
      "Designed to avoid training guests to expect a discount",
    ],
    businessBenefits: [
      "Recovered an estimated 15% of abandoned bookings that would otherwise have gone to a competitor",
      "Added incremental room revenue directly",
      "Gave the group a way to recapture previously invisible lost interest",
    ],
    prosAndCons: {
      pros: [
        "Recaptures revenue that previously disappeared with zero follow-up",
        "Incentive use is carefully tuned to avoid training guests to always abandon for a discount",
        "Runs automatically with no staff time required",
      ],
      cons: [
        "Some guests still won't return even with a reminder and incentive",
        "Incentive tuning requires ongoing attention to avoid margin erosion",
      ],
    },
    technologies: ["Node.js", "SendGrid", "PostgreSQL"],
    approach:
      "We analyzed the booking flow to pinpoint exactly where visitors were dropping off before designing the detection window and reminder timing around that specific behavior. Incentive inclusion and sizing were tested carefully over several weeks to find a level that recovered bookings without becoming an expected discount.",
    results:
      "The group recovered an estimated 15% of abandoned bookings that would otherwise have gone to a competing property, adding incremental room revenue that had previously just disappeared.",
    timeline: "5 weeks",
    orderValueBand: "$500-$2,500",
    image: { icon: "BedDouble", gradient: "teal-to-navy" },
  },
  {
    slug: "event-group-booking-management-portal-conference-hotel",
    title: "Event & Group Booking Management Portal for a Conference Hotel",
    industry: "Hotels & Hospitality",
    techCategory: "Web App",
    description:
      "Built an event and group booking management portal for a conference hotel that handles a steady stream of corporate meeting and group room-block inquiries alongside its regular leisure bookings. Meeting planners can check room-block availability, request event space, and submit catering preferences through the portal instead of a lengthy email exchange with the sales team. The portal automatically calculates group rate holds against the hotel's inventory and flags conflicts with existing reservations before a sales manager confirms anything, reducing costly double-booked space. This gave the sales team a single system of record for group business that had previously lived across email threads and a shared spreadsheet.",
    impact:
      "Cut the average time to confirm a group booking request from several days to under 24 hours, helping the sales team win more competitive corporate bids.",
    problemStatement:
      "A conference hotel's group business — corporate meetings and room-block inquiries — lived across email threads and a shared spreadsheet, making it easy for costly double-booked space to slip through.",
    solution:
      "We built a group booking management portal where meeting planners check room-block availability, request event space, and submit catering preferences directly, with automatic rate-hold calculations and conflict flagging before a sales manager confirms anything.",
    features: [
      "Self-service room-block availability checking for planners",
      "Direct event space and catering preference requests",
      "Automatic group rate-hold calculation against inventory",
      "Conflict flagging before sales manager confirmation",
      "Single system of record for group business",
    ],
    businessBenefits: [
      "Cut average time to confirm a group booking request from days to under 24 hours",
      "Helped the sales team win more competitive corporate bids",
      "Removed the double-booked-space risk from manual email-and-spreadsheet tracking",
    ],
    prosAndCons: {
      pros: [
        "Single system of record replaces email threads and a shared spreadsheet",
        "Automatic conflict flagging catches double-booking risk before confirmation",
        "Faster turnaround helps win competitive corporate bids",
      ],
      cons: [
        "Meeting planners need a brief orientation to the self-service portal instead of calling sales directly",
        "Complex, highly customized events still need direct sales-team involvement",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js"],
    approach:
      "We reviewed a batch of past group booking requests to understand exactly what information planners provided and where conflicts had previously slipped through, then built the conflict-checking logic around those specific failure points. It launched alongside the existing email process for one month before becoming the primary intake method.",
    results:
      "Average time to confirm a group booking request dropped from several days to under 24 hours, helping the sales team respond faster and win more competitive corporate bids.",
    timeline: "10 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "BedDouble", gradient: "navy-to-teal" },
  },
  {
    slug: "staff-task-maintenance-app-multi-property-hotel-group",
    title: "Staff Task & Maintenance Request App for a Multi-Property Hotel Group",
    industry: "Hotels & Hospitality",
    techCategory: "Mobile App",
    description:
      "Built a mobile app for a multi-property hotel group's maintenance and housekeeping staff to receive, update, and close out task requests in real time instead of relying on radio calls and handwritten logs. Front-desk staff submit a maintenance request directly from a guest complaint, which routes automatically to the right property's maintenance team with photos and room details attached. Managers get a live view of open requests across every property, including how long each has been outstanding, which surfaced recurring maintenance issues that had gone unnoticed before. The app was built to work reliably in the basements and back-of-house areas of older properties where Wi-Fi coverage was inconsistent.",
    impact:
      "Cut average maintenance request resolution time by an estimated 40% and gave regional managers visibility into recurring issues across properties for the first time.",
    problemStatement:
      "Maintenance and housekeeping staff at a multi-property hotel group relied on radio calls and handwritten logs to track task requests, giving managers no live view of open issues or which problems kept recurring.",
    solution:
      "We built a mobile app where front-desk staff submit maintenance requests directly from a guest complaint with photos and room details attached, routing automatically to the right property's team, with a live manager view across every property — built to work reliably even in Wi-Fi-weak back-of-house areas.",
    features: [
      "Direct maintenance request submission with photos and room details",
      "Automatic routing to the correct property's team",
      "Live open-request view across every property",
      "Recurring-issue visibility for managers",
      "Reliable performance in Wi-Fi-weak back-of-house areas",
    ],
    businessBenefits: [
      "Cut average maintenance request resolution time by an estimated 40%",
      "Gave regional managers visibility into recurring issues across properties for the first time",
      "Replaced radio calls and handwritten logs with a trackable system",
    ],
    prosAndCons: {
      pros: [
        "Photos and room details attached automatically speed up diagnosis",
        "Recurring-issue visibility across properties didn't exist before at all",
        "Built to work reliably in older properties' weak-Wi-Fi back-of-house areas",
      ],
      cons: [
        "Requires maintenance staff to have a device and adopt the app over radio habits",
        "Older properties with especially poor connectivity still need occasional workarounds",
      ],
    },
    technologies: ["React Native", "Expo", "Firebase"],
    approach:
      "We tested the app specifically in the basements and back-of-house areas of older properties where connectivity was known to be weakest, since that's exactly where maintenance staff needed it to work. It launched at one property first, with managers reviewing resolution-time data before expanding to the full group.",
    results:
      "Average maintenance request resolution time dropped by an estimated 40%, and regional managers gained visibility into recurring issues across properties for the first time instead of each one going unnoticed in a handwritten log.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "BedDouble", gradient: "light-teal-to-navy" },
  },
];

export const travelProjects: PortfolioProject[] = [
  {
    slug: "itinerary-builder-platform-boutique-tour-operator",
    title: "Custom Itinerary Builder Web Platform for a Boutique Tour Operator",
    industry: "Travel",
    techCategory: "Web App",
    description:
      "Built a custom itinerary builder for a boutique tour operator specializing in multi-stop custom trips, replacing a slow process of assembling day-by-day plans manually in shared documents for every client. Travel consultants can drag and drop activities, accommodations, and transport segments into a day-by-day timeline, with the platform automatically flagging scheduling conflicts like overlapping bookings or unrealistic transfer times between stops. Clients receive a polished, branded itinerary they can view and reference throughout their trip instead of a plain document email attachment. The platform also stores a library of the operator's most-used activities and partners so consultants aren't rebuilding common trip components from scratch every time.",
    impact:
      "Cut the average time to assemble a custom multi-stop itinerary by an estimated 50%, letting consultants take on more custom trip requests without adding staff.",
    problemStatement:
      "A boutique tour operator specializing in custom multi-stop trips assembled day-by-day plans manually in shared documents for every client, a slow process that limited how many custom trip requests consultants could take on.",
    solution:
      "We built a custom itinerary builder where consultants drag and drop activities, accommodations, and transport into a day-by-day timeline, with automatic conflict flagging for overlapping bookings or unrealistic transfers, and a reusable library of the operator's most-used trip components.",
    features: [
      "Drag-and-drop day-by-day itinerary timeline",
      "Automatic scheduling-conflict flagging",
      "Reusable library of frequently used activities and partners",
      "Polished, branded client-facing itinerary output",
      "Faster rebuilding of common trip components",
    ],
    businessBenefits: [
      "Cut average time to assemble a custom multi-stop itinerary by an estimated 50%",
      "Let consultants take on more custom trip requests without adding staff",
      "Gave clients a polished, referenceable itinerary instead of a plain document",
    ],
    prosAndCons: {
      pros: [
        "Reusable component library avoids rebuilding common trip pieces from scratch",
        "Conflict flagging catches scheduling problems before a client ever sees them",
        "Consultants can take on more requests without adding headcount",
      ],
      cons: [
        "Building out the initial component library took real upfront effort",
        "Highly unusual, one-off destinations still require manual research the first time",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js"],
    approach:
      "We catalogued the operator's most frequently used activities, accommodations, and partners first to seed the reusable library, then built the drag-and-drop timeline around real past itineraries as test cases. Consultants used it alongside the old manual process for a few trips before switching over fully.",
    results:
      "Average time to assemble a custom multi-stop itinerary dropped by an estimated 50%, letting consultants take on more custom trip requests without adding staff.",
    timeline: "10 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Plane", gradient: "teal-to-navy" },
  },
  {
    slug: "multilingual-ai-travel-assistant-international-tour-agency",
    title: "Multi-Language AI Travel Assistant Chatbot for an International Tour Agency",
    industry: "Travel",
    techCategory: "Chatbot",
    description:
      "Built a multi-language AI chatbot for an international tour agency serving travelers from several countries who previously had to email or call during limited business hours to get itinerary and booking questions answered. The chatbot detects the traveler's language automatically and answers common questions about itinerary details, included excursions, and payment deadlines directly from each traveler's actual booking record. Anything involving a change to the itinerary or a refund request escalates to a human agent rather than being handled automatically. This let the agency offer round-the-clock support across time zones without staffing a 24-hour multilingual call center.",
    impact:
      "Reduced average response time on routine itinerary questions from over a day to under a minute, across every language the agency's travelers speak.",
    problemStatement:
      "Travelers at an international tour agency previously had to email or call during limited business hours to get itinerary and booking questions answered, a poor fit for a traveler base spanning several countries and time zones.",
    solution:
      "We built a multi-language AI chatbot that automatically detects a traveler's language and answers common itinerary, excursion, and payment-deadline questions directly from their actual booking record, escalating anything involving a change or refund to a human agent.",
    features: [
      "Automatic language detection",
      "Booking-record-aware answers to itinerary and payment questions",
      "Escalation to a human for changes or refund requests",
      "Round-the-clock coverage across time zones",
      "No multilingual call center required",
    ],
    businessBenefits: [
      "Reduced average response time on routine itinerary questions from over a day to under a minute",
      "Delivered support across every language the agency's travelers speak",
      "Let the agency offer round-the-clock support without staffing a 24-hour center",
    ],
    prosAndCons: {
      pros: [
        "Answers pull from each traveler's actual booking record, not generic FAQ text",
        "Covers every language the agency's traveler base speaks",
        "Avoids the cost of staffing a 24-hour multilingual call center",
      ],
      cons: [
        "Escalation still requires human agents to be reasonably responsive during business hours",
        "New destinations or excursion types need their information added to stay accurate",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "Booking system API integration"],
    approach:
      "We connected the chatbot directly to the agency's booking system so answers reflected each traveler's real itinerary rather than generic information, then tested language detection accuracy across the agency's most common traveler languages before launch.",
    results:
      "Average response time on routine itinerary questions dropped from over a day to under a minute, across every language the agency's travelers speak, without adding a single new support staff member.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "Plane", gradient: "navy-to-teal" },
  },
  {
    slug: "automated-payment-booking-reminders-adventure-travel-company",
    title: "Automated Payment & Booking Reminder System for an Adventure Travel Company",
    industry: "Travel",
    techCategory: "Automation",
    description:
      "Built an automated payment and booking reminder system for an adventure travel company that sells trips booked months in advance with multiple deposit and balance payment deadlines. The system automatically reminds travelers ahead of each payment due date and flags overdue balances for staff follow-up before a trip's final payment deadline puts a reserved spot at risk. This replaced a manual tracking spreadsheet that occasionally let a payment deadline slip past unnoticed, creating awkward last-minute conversations with travelers. Reminder timing and tone were tuned specifically for the long booking windows adventure travel involves, rather than reusing a generic e-commerce reminder cadence.",
    impact:
      "Reduced missed payment deadlines to near zero and cut the staff time spent manually tracking payment schedules across active bookings by an estimated 60%.",
    problemStatement:
      "An adventure travel company selling trips booked months in advance tracked multiple deposit and balance payment deadlines on a manual spreadsheet that occasionally let a deadline slip past unnoticed, creating awkward last-minute conversations.",
    solution:
      "We built an automated reminder system that alerts travelers ahead of each payment due date and flags overdue balances for staff follow-up, with reminder timing and tone specifically tuned for the long booking windows adventure travel involves.",
    features: [
      "Automatic reminders ahead of each deposit and balance deadline",
      "Overdue-balance staff follow-up flagging",
      "Reminder tone tuned for long, multi-month booking windows",
      "Replaces manual spreadsheet payment tracking",
      "Protects reserved spots from last-minute payment lapses",
    ],
    businessBenefits: [
      "Reduced missed payment deadlines to near zero",
      "Cut staff time spent manually tracking payment schedules by an estimated 60%",
      "Removed awkward last-minute payment conversations with travelers",
    ],
    prosAndCons: {
      pros: [
        "Tuned specifically for long, multi-month booking windows, not generic e-commerce reminders",
        "Removes the manual spreadsheet tracking that had let deadlines slip",
        "Frees staff time for actual trip planning instead of payment chasing",
      ],
      cons: [
        "Requires accurate deposit and balance schedules to be set correctly per trip type",
        "Doesn't replace staff judgment on genuinely difficult payment situations",
      ],
    },
    technologies: ["Twilio", "SendGrid", "Node.js", "PostgreSQL"],
    approach:
      "We mapped the company's actual multi-month payment schedules across different trip types before setting reminder timing, since a generic e-commerce cadence wouldn't fit trips booked months out. The system ran alongside the old spreadsheet for one full booking cycle before fully replacing it.",
    results:
      "Missed payment deadlines dropped to near zero, and staff time spent manually tracking payment schedules across active bookings fell by an estimated 60%.",
    timeline: "6 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Plane", gradient: "light-teal-to-navy" },
  },
  {
    slug: "trip-companion-app-group-travel-agency",
    title: "Cross-Platform Trip Companion App for a Group Travel Agency",
    industry: "Travel",
    techCategory: "Mobile App",
    description:
      "Built an iOS and Android trip companion app for a group travel agency so travelers on a shared tour could access their itinerary, group announcements, and emergency contact information from their phone instead of a printed packet. The tour guide can push real-time updates — a changed meeting time, a gate change, a weather-related schedule shift — directly to every traveler on the trip at once. This addressed a recurring problem for group trips: important last-minute changes not reaching every traveler in time because they relied on word-of-mouth or a bulletin board in the hotel lobby. The app works offline once itinerary data is downloaded, since travelers often lose signal in more remote destinations.",
    impact:
      "Eliminated missed group meeting times caused by travelers not receiving last-minute schedule changes, a recurring complaint in post-trip surveys.",
    problemStatement:
      "Important last-minute changes on group trips — a changed meeting time, a gate change, a weather shift — often didn't reach every traveler in time because updates relied on word-of-mouth or a hotel lobby bulletin board.",
    solution:
      "We built an offline-capable iOS and Android trip companion app where tour guides push real-time updates to every traveler on a trip at once, with itinerary, group announcements, and emergency contacts accessible even without signal.",
    features: [
      "Real-time push updates to the entire group at once",
      "Offline access to itinerary and emergency contacts",
      "Emergency contact information always accessible",
      "Guide-to-group broadcast for schedule changes",
      "Works reliably in remote, low-signal destinations",
    ],
    businessBenefits: [
      "Eliminated missed group meeting times from undelivered last-minute changes",
      "Reduced a recurring complaint from post-trip surveys",
      "Gave every traveler equal, reliable access to trip information",
    ],
    prosAndCons: {
      pros: [
        "Offline access solves the exact problem that caused missed meeting times before",
        "Guide can update the whole group instantly instead of word-of-mouth",
        "Addressed a documented recurring complaint from real post-trip surveys",
      ],
      cons: [
        "Requires travelers to download itinerary data before losing signal",
        "Guides need a brief habit change to push updates through the app instead of verbally",
      ],
    },
    technologies: ["React Native", "Expo", "Offline-first local storage"],
    approach:
      "We reviewed past post-trip survey complaints specifically about missed updates to understand exactly where communication broke down before designing the offline-first architecture. It was piloted on one group trip to a remote destination, the toughest real-world test, before rolling out to all group trips.",
    results:
      "Missed group meeting times caused by travelers not receiving last-minute schedule changes — a recurring complaint in post-trip surveys — are now eliminated, thanks to reliable offline access and instant guide-to-group broadcasts.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Plane", gradient: "teal-to-navy" },
  },
  {
    slug: "ai-destination-recommendation-engine-luxury-travel-advisory",
    title: "AI-Powered Destination Recommendation Engine for a Luxury Travel Advisory",
    industry: "Travel",
    techCategory: "AI/ML",
    description:
      "Built a destination recommendation engine for a luxury travel advisory that matches client preferences — travel style, past trips, budget range, and stated interests — against a curated database of destinations and experiences the advisory represents. Advisors use the tool's suggestions as a starting point for client conversations rather than a fully automated booking flow, since the advisory's value proposition rests on personal expertise, not self-service. The model was trained on the advisory's own historical client preference and booking data rather than generic travel trend data, so recommendations reflected the advisory's actual curated network of properties and experiences. This gave newer advisors on the team a way to draw on the firm's collective expertise from day one.",
    impact:
      "Cut the time newer advisors spent researching destination options per client by an estimated 30%, letting them draw on the firm's collective expertise immediately.",
    problemStatement:
      "Newer advisors at a luxury travel advisory had no efficient way to draw on the firm's collective expertise when researching destination options for a client, relying entirely on their own individual experience.",
    solution:
      "We built a recommendation engine matching client preferences against the advisory's own curated destination and experience database, trained on the firm's historical client preference and booking data, positioned as a conversation starting point rather than a self-service booking flow.",
    features: [
      "Preference-based destination and experience matching",
      "Trained on the advisory's own historical client and booking data",
      "Curated network of properties and experiences, not generic travel data",
      "Designed as an advisor conversation starter, not self-service",
      "Immediate access to collective firm expertise for newer advisors",
    ],
    businessBenefits: [
      "Cut time newer advisors spent researching destination options by an estimated 30%",
      "Let newer advisors draw on the firm's collective expertise immediately",
      "Preserved the advisory's personal-expertise value proposition",
    ],
    prosAndCons: {
      pros: [
        "Trained on the advisory's own curated network, not generic travel trend data",
        "Preserves the personal-expertise positioning central to the advisory's brand",
        "Gives newer advisors an immediate head start instead of a long ramp-up",
      ],
      cons: [
        "Recommendation quality depends on the curated database staying current with the firm's actual offerings",
        "Not intended as a client-facing self-service tool by design",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI"],
    approach:
      "We trained the model on the advisory's own historical client preference and booking data rather than generic travel trend data, since the firm's real value was in its own curated network. Senior advisors reviewed the tool's early suggestions against their own judgment before it was rolled out to newer team members.",
    results:
      "Newer advisors cut the time spent researching destination options per client by an estimated 30%, letting them draw on the firm's collective expertise from their very first client conversations.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Plane", gradient: "navy-to-teal" },
  },
  {
    slug: "cv-passport-document-verification-visa-assistance-service",
    title: "Computer-Vision Passport & Travel Document Verification Tool for a Visa Assistance Service",
    industry: "Travel",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision document verification tool for a visa assistance service that processes passport and supporting document uploads from clients applying for travel visas. The tool automatically checks that scanned passports and photos meet common formatting requirements — visible expiration dates, correct photo dimensions, unobstructed machine-readable zones — and flags issues before a caseworker spends time on a submission likely to be rejected. This replaced a fully manual review process where caseworkers frequently caught formatting issues only after already starting to process an application. All final judgment on document acceptability stays with the caseworker; the tool only pre-screens for common, objectively identifiable issues.",
    impact:
      "Cut the rate of visa applications rejected for preventable document formatting issues by an estimated 35%, avoiding costly delays for clients.",
    problemStatement:
      "Caseworkers at a visa assistance service frequently caught passport and document formatting issues only after already starting to process an application, wasting time on submissions likely to be rejected.",
    solution:
      "We built a computer-vision tool automatically checking scanned passports and photos against common formatting requirements — expiration dates, photo dimensions, machine-readable zones — flagging issues before a caseworker invests time, with final judgment always staying with the caseworker.",
    features: [
      "Automatic passport and photo formatting checks",
      "Expiration date, photo dimension, and MRZ validation",
      "Pre-screening before caseworker processing begins",
      "Human caseworker retains final acceptability judgment",
      "Reduces time spent on submissions likely to be rejected",
    ],
    businessBenefits: [
      "Cut visa applications rejected for preventable document formatting issues by an estimated 35%",
      "Avoided costly delays for clients",
      "Saved caseworker time on submissions destined to fail",
    ],
    prosAndCons: {
      pros: [
        "Catches preventable formatting issues before a caseworker invests processing time",
        "Keeps final document-acceptability judgment with the human caseworker",
        "Reduces costly delays for clients caused by avoidable rejections",
      ],
      cons: [
        "Only screens for objectively identifiable formatting issues, not content judgment calls",
        "Requires clear photo scans — poor phone photos still sometimes need a retake request",
      ],
    },
    technologies: ["Python", "OpenCV", "AWS S3"],
    approach:
      "We catalogued the most common formatting rejection reasons from the service's own past applications, then built pre-screening checks specifically targeting those failure modes. The tool ran alongside manual review for several weeks to confirm it caught the same issues caseworkers already knew to look for.",
    results:
      "The rate of visa applications rejected for preventable document formatting issues dropped by an estimated 35%, avoiding costly delays for clients and saving caseworker time on submissions likely to fail.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Plane", gradient: "light-teal-to-navy" },
  },
  {
    slug: "multi-vendor-booking-backend-destination-wedding-planning-company",
    title: "Custom Multi-Vendor Booking Backend for a Destination Wedding Planning Company",
    industry: "Travel",
    techCategory: "Custom Software",
    description:
      "Built a custom booking backend for a destination wedding planning company that coordinates venues, accommodations, transport, and multiple local vendors for every event, a level of coordination no off-the-shelf travel booking tool was designed to handle. The system tracks every vendor booking, deposit, and confirmation status tied to a specific wedding date in one place, automatically flagging any vendor booking that's still unconfirmed as the event date approaches. Planners previously tracked this across a mix of vendor emails and a master spreadsheet per event, which became error-prone once the company was running several weddings at once. The system generates a consolidated vendor confirmation checklist for planners to review before every event.",
    impact:
      "Eliminated the vendor-confirmation gaps that had previously caused last-minute scrambles before wedding weekends, even while running multiple simultaneous events.",
    problemStatement:
      "A destination wedding planning company tracked vendor bookings, deposits, and confirmations across a mix of vendor emails and a master spreadsheet per event, which became error-prone once running several weddings simultaneously.",
    solution:
      "We built a custom booking backend tracking every vendor booking, deposit, and confirmation status tied to a specific wedding date in one place, automatically flagging any unconfirmed vendor booking as the event date approaches, with a consolidated confirmation checklist per event.",
    features: [
      "Per-event vendor booking, deposit, and confirmation tracking",
      "Automatic flagging of unconfirmed bookings as dates approach",
      "Consolidated vendor confirmation checklist per event",
      "Support for running multiple simultaneous events",
      "Replaces vendor emails and per-event spreadsheets",
    ],
    businessBenefits: [
      "Eliminated vendor-confirmation gaps that caused last-minute scrambles",
      "Supported running multiple simultaneous events reliably",
      "Gave planners one consolidated checklist instead of scattered emails",
    ],
    prosAndCons: {
      pros: [
        "Purpose-built for multi-vendor coordination, not adapted travel booking software",
        "Automatic flagging catches unconfirmed vendors before it becomes a crisis",
        "Scales cleanly to running several weddings at once",
      ],
      cons: [
        "Vendors themselves still need to confirm through email or phone, which the system tracks but can't force",
        "Initial setup required migrating active event data from existing spreadsheets",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Node.js"],
    approach:
      "We reviewed several past events' vendor-coordination spreadsheets to understand exactly which confirmations tended to slip through, then built flagging logic targeting those specific gaps. The system launched on new bookings first, running in parallel with existing spreadsheets during a busy multi-wedding season, before fully replacing them.",
    results:
      "The vendor-confirmation gaps that had previously caused last-minute scrambles before wedding weekends are eliminated, even while the company runs multiple simultaneous events.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "Plane", gradient: "teal-to-navy" },
  },
  {
    slug: "automated-pretrip-document-packing-reminders-group-tour-operator",
    title: "Automated Pre-Trip Document & Packing Reminder System for a Group Tour Operator",
    industry: "Travel",
    techCategory: "Automation",
    description:
      "Built an automated pre-trip reminder system for a group tour operator that sends travelers a personalized checklist of required documents, vaccinations, and packing recommendations specific to their destination and trip dates. Previously, this information was buried in a long welcome PDF that many travelers never fully read, leading to avoidable day-of-departure issues like a missing visa or an unpacked adapter. Reminders are staged at logical intervals before departure — 60 days out for visa and vaccination requirements, a week out for packing — rather than a single overwhelming email. The system pulls destination-specific requirements from a maintained reference table so the operator can update guidance in one place as requirements change.",
    impact:
      "Reduced day-of-departure document and preparation issues significantly, cutting the number of last-minute traveler support calls the operator's small team had to handle.",
    problemStatement:
      "Required documents, vaccinations, and packing guidance for a group tour operator's trips were buried in a long welcome PDF that many travelers never fully read, leading to avoidable day-of-departure issues like a missing visa or unpacked adapter.",
    solution:
      "We built an automated reminder system sending a personalized checklist staged at logical intervals before departure — 60 days out for visas and vaccinations, a week out for packing — pulling destination-specific requirements from a maintained reference table.",
    features: [
      "Personalized, destination-specific pre-trip checklist",
      "Staged reminders at logical intervals (60 days, 1 week)",
      "Centrally maintained destination requirement reference table",
      "Replaces a rarely-read welcome PDF",
      "Reduces avoidable day-of-departure issues",
    ],
    businessBenefits: [
      "Reduced day-of-departure document and preparation issues significantly",
      "Cut last-minute traveler support calls for the operator's small team",
      "Made destination requirement updates a one-place change",
    ],
    prosAndCons: {
      pros: [
        "Staged timing matches when each requirement actually needs action, not one overwhelming email",
        "Centralized reference table means one update reflects everywhere it's needed",
        "Meaningfully reduces last-minute support calls for a small team",
      ],
      cons: [
        "Requires the reference table to be kept current as destination requirements change",
        "Travelers who ignore all reminders will still occasionally arrive unprepared",
      ],
    },
    technologies: ["Twilio", "SendGrid", "PostgreSQL", "Node.js"],
    approach:
      "We reviewed which specific issues came up most often in day-of-departure support calls before designing the staged reminder intervals around those failure points. The reference table was built and validated against the operator's most popular destinations first before covering the full trip catalog.",
    results:
      "Day-of-departure document and preparation issues dropped significantly, cutting the number of last-minute traveler support calls the operator's small team had to handle.",
    timeline: "6 weeks",
    orderValueBand: "$2,500-$5,000",
    image: { icon: "Plane", gradient: "navy-to-teal" },
  },
  {
    slug: "ai-chatbot-after-hours-rebooking-regional-travel-agency",
    title: "AI Chatbot for After-Hours Rebooking Requests at a Regional Travel Agency",
    industry: "Travel",
    techCategory: "Chatbot",
    description:
      "Built an AI chatbot for a regional travel agency to handle rebooking and itinerary change requests that came in outside business hours, a common occurrence given flight disruptions don't wait for office hours. The chatbot checks the traveler's existing booking, explains available rebooking options and any associated fees, and either confirms a straightforward change or queues an urgent flag for an agent to handle first thing the next business day. This addressed real anxiety for travelers dealing with a disrupted trip who previously had no way to get even basic information until the agency reopened. The chatbot was scoped conservatively, only confirming changes that fit clearly within airline and agency rebooking policy on its own.",
    impact:
      "Gave travelers immediate answers during travel disruptions instead of an overnight wait, directly reducing anxious follow-up calls the next morning.",
    problemStatement:
      "Travelers dealing with flight disruptions outside business hours had no way to get even basic rebooking information until a regional travel agency reopened, adding real anxiety during an already stressful situation.",
    solution:
      "We built an AI chatbot that checks a traveler's existing booking, explains available rebooking options and fees, and either confirms straightforward changes or queues an urgent flag for an agent — scoped conservatively to only confirm changes clearly within airline and agency policy.",
    features: [
      "Existing-booking lookup and rebooking option explanation",
      "Automatic confirmation of policy-compliant straightforward changes",
      "Urgent flagging for anything outside clear policy",
      "Available outside business hours when disruptions actually happen",
      "Conservative scope avoiding unauthorized changes",
    ],
    businessBenefits: [
      "Gave travelers immediate answers during travel disruptions instead of an overnight wait",
      "Directly reduced anxious follow-up calls the next morning",
      "Resolved straightforward rebooking without waiting for office hours",
    ],
    prosAndCons: {
      pros: [
        "Available exactly when disruptions actually happen, not just business hours",
        "Conservative scope avoids making changes outside clear policy",
        "Directly reduces next-morning call volume from anxious travelers",
      ],
      cons: [
        "Complex multi-leg or multi-passenger changes still require an agent",
        "Policy scope needs updates whenever airline rebooking rules change",
      ],
    },
    technologies: ["OpenAI API", "Node.js", "Booking system API integration"],
    approach:
      "We defined exactly which rebooking scenarios were clearly within policy versus needing agent judgment together with the agency's team, keeping the chatbot's autonomous scope deliberately narrow. It was tested against a range of real past disruption scenarios before going live as the after-hours contact point.",
    results:
      "Travelers now get immediate answers during travel disruptions instead of an overnight wait, directly reducing the anxious follow-up calls the agency used to field the next morning.",
    timeline: "8 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Plane", gradient: "light-teal-to-navy" },
  },
  {
    slug: "predictive-trip-cancellation-risk-model-travel-insurance-broker",
    title: "Predictive Trip-Cancellation Risk Model for a Travel Insurance Broker",
    industry: "Travel",
    techCategory: "AI/ML",
    description:
      "Built a predictive model for a travel insurance broker that estimates the likelihood of a booked trip resulting in a cancellation claim, based on destination, trip timing, traveler history, and broader travel disruption patterns. The broker uses the model's output to inform proactive customer outreach — like reminding travelers to review coverage details ahead of a high-risk travel period — rather than to deny or price individual policies differently. This gave the broker's small operations team an early signal of which upcoming trips were more likely to generate claims and support requests, letting them staff and prepare accordingly. The model was trained and validated against several years of the broker's own historical claims data before being used operationally.",
    impact:
      "Gave the operations team advance visibility into likely claim volume spikes, improving staffing and response time during high-risk travel periods.",
    problemStatement:
      "A travel insurance broker's small operations team had no early signal for which upcoming trips were more likely to generate cancellation claims, making staffing and support preparation reactive rather than proactive.",
    solution:
      "We built a predictive model estimating cancellation-claim likelihood from destination, trip timing, traveler history, and broader disruption patterns, used to inform proactive outreach — like coverage reminders ahead of high-risk periods — rather than pricing or denying individual policies.",
    features: [
      "Cancellation-claim likelihood scoring per booked trip",
      "Destination, timing, and traveler-history-based modeling",
      "Proactive outreach triggers for high-risk periods",
      "Trained on multiple years of the broker's own claims data",
      "Not used to price or deny individual policies",
    ],
    businessBenefits: [
      "Gave the operations team advance visibility into likely claim volume spikes",
      "Improved staffing and response time during high-risk travel periods",
      "Enabled proactive customer outreach instead of reactive handling",
    ],
    prosAndCons: {
      pros: [
        "Used for proactive outreach and staffing, not to deny or reprice policies",
        "Trained on multiple years of the broker's own real claims data",
        "Gives a small operations team advance warning instead of reacting after the fact",
      ],
      cons: [
        "Prediction is probabilistic and won't flag every eventual claim",
        "Broader disruption events, like sudden global travel restrictions, can still outpace the model's assumptions",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL"],
    approach:
      "We trained and validated the model against several years of the broker's own historical claims data before it was used operationally, comparing predicted risk periods against what actually happened historically. The operations team used its output alongside their own judgment for a full quarter before relying on it for staffing decisions.",
    results:
      "The operations team now has advance visibility into likely claim volume spikes, improving staffing and response time during high-risk travel periods instead of reacting after claims already started coming in.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Plane", gradient: "teal-to-navy" },
  },
  {
    slug: "offline-mobile-itinerary-app-adventure-trekking-tour-company",
    title: "Offline-Ready Mobile Itinerary App for an Adventure & Trekking Tour Company",
    industry: "Travel",
    techCategory: "Mobile App",
    description:
      "Built an offline-capable mobile app for an adventure and trekking tour company whose trips regularly take travelers to remote areas with no reliable cell signal. Travelers download their full itinerary, maps, emergency contacts, and safety briefings before departure, so everything remains accessible throughout the trip without needing a connection. Guides can log check-ins and basic incident notes directly in the app, which sync back to the home office automatically once a connection becomes available again. This replaced printed briefing packets that were bulky to carry and impossible to update once a trip was underway.",
    impact:
      "Gave travelers and guides reliable access to safety-critical trip information in areas with no connectivity, addressing a real safety and liability concern for remote itineraries.",
    problemStatement:
      "An adventure and trekking tour company's trips regularly took travelers to remote areas with no reliable cell signal, relying on bulky printed briefing packets that were impossible to update once a trip was underway.",
    solution:
      "We built an offline-capable mobile app where travelers download their full itinerary, maps, emergency contacts, and safety briefings before departure, with guides logging check-ins and incident notes that sync automatically once connectivity returns.",
    features: [
      "Full offline itinerary, maps, and safety briefing access",
      "Emergency contact information always available offline",
      "Guide check-in and incident note logging",
      "Automatic sync once connectivity returns",
      "Replaces bulky printed briefing packets",
    ],
    businessBenefits: [
      "Gave travelers and guides reliable access to safety-critical information with no connectivity",
      "Addressed a real safety and liability concern for remote itineraries",
      "Replaced printed packets that couldn't be updated mid-trip",
    ],
    prosAndCons: {
      pros: [
        "Addresses a genuine safety and liability concern, not just convenience",
        "Works fully offline where printed packets were the only prior option",
        "Guide incident logs sync automatically instead of being written up after the fact",
      ],
      cons: [
        "Travelers must remember to download data before losing signal",
        "Device battery life becomes a real consideration on multi-day remote treks",
      ],
    },
    technologies: ["React Native", "Offline-first local storage", "Expo"],
    approach:
      "We tested the offline data package and sync behavior specifically in low-connectivity conditions similar to the company's actual trekking routes, since that's the exact environment it needed to work reliably in. It was piloted on one remote trek before becoming standard across all trip itineraries.",
    results:
      "Travelers and guides now have reliable access to safety-critical trip information in areas with no connectivity, addressing a real safety and liability concern that printed briefing packets never fully solved.",
    timeline: "3 months",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "Plane", gradient: "navy-to-teal" },
  },
  {
    slug: "quote-package-builder-independent-travel-agency",
    title: "Custom Quote & Package Builder Web Tool for an Independent Travel Agency",
    industry: "Travel",
    techCategory: "Web App",
    description:
      "Built a quote and package builder tool for an independent travel agency that assembles flight, hotel, and activity components into a single branded quote for prospective clients within minutes instead of the half-day it previously took to manually research and price a custom package. Agents select from a pre-loaded library of preferred suppliers and rates, and the tool automatically calculates a package price with the agency's markup applied consistently rather than varying by which agent built the quote. Clients receive a polished, branded PDF or web link they can review and approve, replacing quotes that had previously been sent as plain-text emails. This gave the small agency a noticeably more professional first impression against larger competitors.",
    impact:
      "Cut average quote turnaround time from half a day to under 30 minutes, letting the agency respond to inquiries while client interest was still highest.",
    problemStatement:
      "An independent travel agency spent roughly half a day manually researching and pricing each custom flight, hotel, and activity package, with quotes sent as plain-text emails that varied by which agent built them.",
    solution:
      "We built a quote and package builder assembling components from a pre-loaded library of preferred suppliers and rates into a single branded quote within minutes, calculating package price with the agency's markup applied consistently regardless of which agent builds it.",
    features: [
      "Pre-loaded preferred supplier and rate library",
      "Consistent markup calculation across every agent",
      "Branded PDF or web-link quote delivery",
      "Minutes-not-hours quote assembly",
      "Professional, consistent client-facing presentation",
    ],
    businessBenefits: [
      "Cut average quote turnaround from half a day to under 30 minutes",
      "Let the agency respond to inquiries while client interest was highest",
      "Gave the agency a more professional first impression against larger competitors",
    ],
    prosAndCons: {
      pros: [
        "Consistent markup application regardless of which agent builds the quote",
        "Branded presentation competes with much larger agencies",
        "Dramatically faster turnaround while client interest is still hot",
      ],
      cons: [
        "Supplier and rate library needs regular maintenance to stay accurate",
        "Highly unusual custom requests still need some manual research outside the library",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js"],
    approach:
      "We built the initial supplier and rate library from the agency's existing preferred vendor list, then tested the pricing and markup logic against a batch of past manually-built quotes to confirm accuracy. Agents used it alongside manual quoting for a couple of weeks before switching over fully.",
    results:
      "Average quote turnaround time dropped from half a day to under 30 minutes, letting the agency respond to inquiries while client interest was still highest and present a noticeably more professional first impression against larger competitors.",
    timeline: "8 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "Plane", gradient: "light-teal-to-navy" },
  },
];

export const highSecurityWebsitesProjects: PortfolioProject[] = [
  {
    slug: "hardened-web-app-rebuild-regulated-financial-services-firm",
    title: "Hardened Web Application Rebuild for a Regulated Financial Services Firm",
    industry: "High Security Websites",
    techCategory: "Web App",
    description:
      "Rebuilt the public and client-facing web application for a regulated financial services firm whose existing site had accumulated years of technical debt and hadn't been architected with today's security expectations in mind. The rebuild followed secure-by-default practices throughout — strict input validation, hardened session handling, and a minimized attack surface on every public-facing endpoint — reviewed against the compliance requirements the firm's industry demands. We worked from a security-first checklist agreed with the firm's compliance officer before writing any application code, rather than treating security as a final review step. The rebuild also included a staged migration plan so the firm could move traffic over without a disruptive cutover.",
    impact:
      "Closed several longstanding security gaps identified in the firm's prior compliance audit, giving them a clean foundation heading into their next review cycle.",
    problemStatement:
      "A regulated financial services firm's public and client-facing web application had accumulated years of technical debt and hadn't been architected with today's security expectations in mind, creating real compliance exposure.",
    solution:
      "We rebuilt the application following secure-by-default practices throughout — strict input validation, hardened session handling, minimized attack surface — reviewed against the firm's compliance requirements from a security-first checklist agreed before any code was written.",
    features: [
      "Secure-by-default architecture across every endpoint",
      "Strict input validation and hardened session handling",
      "Minimized public-facing attack surface",
      "Security checklist agreed with compliance before development",
      "Staged migration plan for a non-disruptive cutover",
    ],
    businessBenefits: [
      "Closed several longstanding security gaps identified in a prior compliance audit",
      "Gave the firm a clean foundation heading into its next review cycle",
      "Avoided a disruptive cutover through staged migration",
    ],
    prosAndCons: {
      pros: [
        "Security reviewed against compliance checklist from day one, not as a final step",
        "Staged migration avoided a disruptive all-at-once cutover",
        "Directly closed gaps flagged in a real prior compliance audit",
      ],
      cons: [
        "Full rebuild required a meaningful multi-month engagement rather than incremental patches",
        "Ongoing compliance still requires periodic re-review as requirements evolve",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js", "AWS"],
    approach:
      "We agreed a security-first checklist with the firm's compliance officer before writing any application code, treating it as a design input rather than a final review step. The rebuild was migrated in stages, validating each piece against the checklist before moving traffic over.",
    results:
      "The rebuild closed several longstanding security gaps identified in the firm's prior compliance audit, giving them a clean foundation heading into their next review cycle instead of carrying forward the same flagged issues.",
    timeline: "4 months",
    orderValueBand: "$25,000+",
    image: { icon: "ShieldCheck", gradient: "teal-to-navy" },
  },
  {
    slug: "custom-rbac-system-healthcare-data-platform",
    title: "Custom Role-Based Access Control System for a Healthcare Data Platform",
    industry: "High Security Websites",
    techCategory: "Custom Software",
    description:
      "Built a custom role-based access control system for a healthcare data platform that needed far more granular permission logic than its off-the-shelf authentication provider supported. The system lets administrators define access rules down to the level of which specific data fields a given role can view, edit, or export, with every access event logged for audit purposes. This addressed a real compliance gap: the platform's prior all-or-nothing permission model meant staff often had access to more sensitive data than their role actually required. We built the system to integrate with the platform's existing identity provider rather than replacing its authentication layer entirely.",
    impact:
      "Closed a data-access compliance gap flagged in the client's own internal security review, giving them field-level access control they previously couldn't offer.",
    problemStatement:
      "A healthcare data platform's off-the-shelf authentication provider only supported an all-or-nothing permission model, meaning staff often had access to more sensitive data than their role actually required.",
    solution:
      "We built a custom role-based access control system letting administrators define access rules down to specific data fields per role, with every access event logged for audit purposes, integrated with the platform's existing identity provider rather than replacing authentication entirely.",
    features: [
      "Field-level permission rules per role",
      "Full audit logging of every access event",
      "Integration with the existing identity provider",
      "Administrator-configurable access rules",
      "No replacement of the existing authentication layer",
    ],
    businessBenefits: [
      "Closed a data-access compliance gap flagged in the client's own internal security review",
      "Gave field-level access control the platform previously couldn't offer",
      "Reduced unnecessary staff access to sensitive data",
    ],
    prosAndCons: {
      pros: [
        "Field-level granularity goes well beyond the prior all-or-nothing model",
        "Integrates with existing identity provider, no authentication migration needed",
        "Full audit logging directly supports compliance requirements",
      ],
      cons: [
        "Defining field-level rules for every role required detailed upfront mapping work",
        "New data fields need explicit permission rules added as the platform grows",
      ],
    },
    technologies: ["Node.js", "PostgreSQL", "Identity provider API integration"],
    approach:
      "We mapped every role's actual data-access needs against what the old all-or-nothing model was granting, working directly with the client's security team to define correct field-level rules. The new system ran in shadow mode, logging what it would have restricted, before being enforced live.",
    results:
      "The system closed a data-access compliance gap flagged in the client's own internal security review, giving them field-level access control they previously couldn't offer at all.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "ShieldCheck", gradient: "navy-to-teal" },
  },
  {
    slug: "ai-fraud-anomaly-detection-online-payments-company",
    title: "AI-Based Fraud & Anomaly Detection Model for an Online Payments Company",
    industry: "High Security Websites",
    techCategory: "AI/ML",
    description:
      "Built a machine learning model for an online payments company that flags transactions showing patterns associated with fraud, based on velocity, device fingerprinting signals, and deviation from a customer's typical behavior. Flagged transactions are routed to a manual review queue rather than being automatically declined, keeping a human decision-maker in the loop for anything the model isn't highly confident about. This gave the company's small trust-and-safety team a way to focus manual review time on the transactions most likely to be fraudulent, instead of either reviewing everything or relying on static rule-based thresholds that were increasingly easy to work around. The model was trained on the company's own historical transaction and confirmed-fraud data and is retrained on a regular cadence as fraud patterns evolve.",
    impact:
      "Reduced confirmed fraud losses by an estimated 25% while cutting the volume of legitimate transactions incorrectly flagged for manual review.",
    problemStatement:
      "An online payments company's small trust-and-safety team was either reviewing every transaction manually or relying on static rule-based thresholds that were increasingly easy for fraudsters to work around.",
    solution:
      "We built a machine learning model flagging transactions showing fraud-associated patterns — velocity, device fingerprinting, behavioral deviation — routing flagged transactions to manual review rather than automatically declining them, keeping a human decision-maker in the loop.",
    features: [
      "Velocity and device-fingerprinting pattern detection",
      "Behavioral deviation scoring per customer",
      "Manual review routing instead of automatic declines",
      "Trained on the company's own historical fraud data",
      "Regular retraining as fraud patterns evolve",
    ],
    businessBenefits: [
      "Reduced confirmed fraud losses by an estimated 25%",
      "Cut the volume of legitimate transactions incorrectly flagged for review",
      "Focused manual review time on the transactions most likely to be fraudulent",
    ],
    prosAndCons: {
      pros: [
        "Keeps a human decision-maker in the loop rather than auto-declining transactions",
        "Focuses limited trust-and-safety review time where it matters most",
        "Retrains regularly as fraud patterns evolve, not a static rule set",
      ],
      cons: [
        "Fraud patterns evolve, so retraining cadence needs ongoing attention",
        "Some legitimate edge-case transactions will still occasionally be flagged",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI"],
    approach:
      "We trained the model on the company's own historical transaction and confirmed-fraud data, validating flagged results against known past fraud cases before it touched live transactions. It ran in parallel with the existing rule-based system for several weeks, comparing outcomes, before becoming the primary detection method.",
    results:
      "Confirmed fraud losses dropped by an estimated 25%, while the volume of legitimate transactions incorrectly flagged for manual review also fell — improving accuracy in both directions rather than trading one for the other.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "ShieldCheck", gradient: "light-teal-to-navy" },
  },
  {
    slug: "automated-compliance-documentation-audit-trail-soc2-saas-company",
    title: "Automated Compliance Documentation & Audit Trail System for a SOC 2-Bound SaaS Company",
    industry: "High Security Websites",
    techCategory: "Automation",
    description:
      "Built an automated compliance documentation system for a SaaS company preparing for its first SOC 2 audit, where evidence of security controls had previously been gathered manually from multiple systems right before each audit cycle. The system continuously pulls and timestamps evidence — access logs, configuration snapshots, policy acknowledgments — from the company's existing tools into an organized, audit-ready repository instead of a last-minute scramble. This freed the engineering team from spending days assembling evidence manually every audit cycle and gave leadership ongoing visibility into control status between audits, not just at audit time. The system was built around the specific control set the company's auditor had outlined, not a generic compliance template.",
    impact:
      "Cut audit preparation time from roughly two weeks of manual evidence-gathering to a few hours of review, directly reducing the engineering time diverted from product work.",
    problemStatement:
      "A SaaS company preparing for its first SOC 2 audit had previously gathered evidence of security controls manually from multiple systems right before each audit cycle, a last-minute scramble that diverted engineering time from product work.",
    solution:
      "We built a system continuously pulling and timestamping evidence — access logs, configuration snapshots, policy acknowledgments — from existing tools into an organized, audit-ready repository, built around the specific control set the company's auditor outlined.",
    features: [
      "Continuous evidence pulling from existing tools",
      "Automatic timestamping into an audit-ready repository",
      "Built around the specific auditor-defined control set",
      "Ongoing control-status visibility between audits",
      "Eliminates last-minute manual evidence gathering",
    ],
    businessBenefits: [
      "Cut audit preparation time from roughly two weeks to a few hours of review",
      "Directly reduced engineering time diverted from product work",
      "Gave leadership ongoing visibility into control status between audits",
    ],
    prosAndCons: {
      pros: [
        "Built around the actual auditor-defined control set, not a generic template",
        "Frees engineering time previously lost to last-minute evidence gathering every cycle",
        "Gives leadership visibility between audits, not just a point-in-time snapshot",
      ],
      cons: [
        "Requires updates if the auditor's control set changes between review cycles",
        "Initial setup required connecting evidence sources across multiple existing tools",
      ],
    },
    technologies: ["Node.js", "PostgreSQL", "AWS", "Various API integrations"],
    approach:
      "We reviewed the specific control set the company's auditor had outlined and mapped each control back to where evidence actually lived across the company's tools, rather than building a generic compliance template. The system ran for a full month collecting evidence before the team relied on it as the primary audit-prep source.",
    results:
      "Audit preparation time dropped from roughly two weeks of manual evidence-gathering to a few hours of review, directly reducing the engineering time diverted from product work every audit cycle.",
    timeline: "8 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "ShieldCheck", gradient: "teal-to-navy" },
  },
  {
    slug: "secure-ai-intake-chatbot-legal-services-firm",
    title: "Secure AI Intake Chatbot for a Legal Services Firm Handling Sensitive Client Data",
    industry: "High Security Websites",
    techCategory: "Chatbot",
    description:
      "Built a secure AI intake chatbot for a legal services firm that needed to qualify and gather initial case details from prospective clients without exposing sensitive information to third-party AI tools not vetted for confidentiality. The chatbot runs on infrastructure the firm controls, with conversation data encrypted and access strictly limited to authorized staff, and it's scoped to gather only the intake information needed to route a case to the right attorney. This addressed a genuine tension the firm faced: wanting the responsiveness of an AI intake tool without the confidentiality risk of sending prospective client details through a general-purpose consumer AI service. Every conversation is logged for the firm's own records but never used to train any external, shared model.",
    impact:
      "Let the firm offer instant, always-available intake without compromising the client confidentiality obligations central to their legal practice.",
    problemStatement:
      "A legal services firm wanted the responsiveness of an AI intake tool but couldn't risk sending prospective client details through a general-purpose consumer AI service not vetted for confidentiality.",
    solution:
      "We built a secure AI intake chatbot running on infrastructure the firm controls, with conversation data encrypted and access strictly limited to authorized staff, scoped to gather only the intake information needed to route a case to the right attorney.",
    features: [
      "Firm-controlled infrastructure, no third-party AI data exposure",
      "Encrypted conversation data",
      "Access strictly limited to authorized staff",
      "Scoped intake information gathering only",
      "Conversations never used to train any external shared model",
    ],
    businessBenefits: [
      "Let the firm offer instant, always-available intake without confidentiality compromise",
      "Preserved the client confidentiality obligations central to the practice",
      "Avoided exposing prospective client details to general-purpose consumer AI tools",
    ],
    prosAndCons: {
      pros: [
        "Runs on infrastructure the firm controls, not a third-party consumer AI service",
        "Scoped narrowly to intake only, reducing unnecessary data exposure",
        "Never used to train any external, shared model",
      ],
      cons: [
        "Self-hosted infrastructure requires more ongoing maintenance than a third-party API",
        "Narrow scope means genuinely complex questions still need direct attorney contact",
      ],
    },
    technologies: ["Self-hosted LLM infrastructure", "Node.js", "PostgreSQL (encrypted at rest)"],
    approach:
      "We worked with the firm's own confidentiality requirements as the primary design constraint, choosing infrastructure the firm could fully control before considering any feature beyond that. The chatbot was tested extensively for data-handling correctness before being made available to prospective clients.",
    results:
      "The firm now offers instant, always-available intake without compromising the client confidentiality obligations central to their legal practice — resolving a real tension between responsiveness and confidentiality.",
    timeline: "10 weeks",
    orderValueBand: "$7,000-$10,000",
    image: { icon: "ShieldCheck", gradient: "navy-to-teal" },
  },
  {
    slug: "secure-mobile-app-biometric-auth-financial-advisory-platform",
    title: "Secure Mobile App with Biometric Authentication for a Financial Advisory Platform",
    industry: "High Security Websites",
    techCategory: "Mobile App",
    description:
      "Built a secure iOS and Android app for a financial advisory platform giving clients access to account statements, portfolio performance, and secure messaging with their advisor from their phone. The app uses device-level biometric authentication alongside encrypted local storage, so sensitive account data never sits unprotected on a client's device. This mattered because the platform's clients expected the same convenience as consumer banking apps, but the advisory's compliance obligations meant convenience couldn't come at the expense of data protection. We worked with the platform's compliance team to define exactly what data could be cached locally versus what always required a live, authenticated connection.",
    impact:
      "Gave clients the mobile convenience they were requesting while satisfying the platform's compliance team that sensitive data remained appropriately protected.",
    problemStatement:
      "Clients of a financial advisory platform expected the same mobile convenience as consumer banking apps, but the platform's compliance obligations meant that convenience couldn't come at the expense of data protection.",
    solution:
      "We built a secure iOS and Android app using device-level biometric authentication and encrypted local storage, working with the platform's compliance team to define exactly what data could be cached locally versus what always required a live, authenticated connection.",
    features: [
      "Device-level biometric authentication",
      "Encrypted local storage for cached data",
      "Compliance-defined boundaries on locally cached vs. live-only data",
      "Account statements, performance, and secure messaging access",
      "No sensitive data left unprotected on-device",
    ],
    businessBenefits: [
      "Gave clients the mobile convenience they were requesting",
      "Satisfied the compliance team that sensitive data remained appropriately protected",
      "Balanced convenience and regulatory obligation without compromising either",
    ],
    prosAndCons: {
      pros: [
        "Biometric authentication matches the convenience of consumer banking apps clients expect",
        "Compliance team involved in defining data-handling rules from the start",
        "Encrypted local storage protects data even if a device is lost",
      ],
      cons: [
        "Biometric authentication ties access to a specific device's hardware capabilities",
        "Live-only data requirements mean some views require a network connection",
      ],
    },
    technologies: ["React Native", "Biometric authentication APIs", "Encrypted local storage"],
    approach:
      "We worked with the platform's compliance team early to define exactly what data could be cached locally versus what always required a live connection, before designing the app's data architecture around those rules. It was tested against the compliance team's own review criteria before release.",
    results:
      "Clients got the mobile convenience they were requesting while the platform's compliance team confirmed sensitive data remained appropriately protected — proving the two goals didn't have to be in tension.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "ShieldCheck", gradient: "light-teal-to-navy" },
  },
  {
    slug: "cv-identity-verification-kyc-compliance-provider",
    title: "Computer-Vision Identity Verification Tool for a Know-Your-Customer (KYC) Compliance Provider",
    industry: "High Security Websites",
    techCategory: "Computer Vision",
    description:
      "Built a computer-vision identity verification tool for a KYC compliance provider that checks submitted government ID photos against a live selfie to help confirm an applicant is who they claim to be. The tool checks for common signs of tampering or a photo of a photo, and flags any submission that doesn't clearly pass automated checks for manual review by the client's compliance team rather than approving or denying identity claims on its own. This let the provider handle a growing volume of verification requests without proportionally growing its manual review team. Every automated pass or fail decision is logged with the specific signals behind it, since the client's own regulatory obligations required an explainable audit trail, not a black-box result.",
    impact:
      "Let the provider scale verification volume significantly without a proportional increase in manual review staff, while keeping a fully auditable decision trail.",
    problemStatement:
      "A KYC compliance provider needed to handle a growing volume of identity verification requests without proportionally growing its manual review team, while still meeting regulatory requirements for an explainable audit trail.",
    solution:
      "We built a computer-vision tool checking submitted ID photos against a live selfie, flagging tampering signs or photo-of-a-photo attempts, routing anything that doesn't clearly pass to manual review rather than approving or denying identity claims on its own, with every decision logged with its specific signals.",
    features: [
      "ID-to-selfie photo matching",
      "Tampering and photo-of-a-photo detection",
      "Manual review routing for unclear cases",
      "Fully explainable, auditable decision logging",
      "No autonomous approve/deny decisions",
    ],
    businessBenefits: [
      "Let the provider scale verification volume without proportionally growing manual review staff",
      "Kept a fully auditable decision trail for regulators",
      "Maintained explainability requirements the client's regulatory obligations demanded",
    ],
    prosAndCons: {
      pros: [
        "Scales verification volume without a proportional headcount increase",
        "Every decision is logged with specific signals, not a black-box result",
        "Never autonomously approves or denies an identity claim, keeping human oversight",
      ],
      cons: [
        "Detection accuracy depends on photo and selfie image quality",
        "Sophisticated spoofing attempts require ongoing model updates to keep pace",
      ],
    },
    technologies: ["Python", "OpenCV", "PyTorch", "AWS S3"],
    approach:
      "We built the detection and logging pipeline around the client's specific regulatory audit-trail requirements from the start, since an unexplainable result would have been a non-starter for their compliance obligations. It was validated against a large batch of known-legitimate and known-fraudulent submissions before deployment.",
    results:
      "The provider now scales verification volume significantly without a proportional increase in manual review staff, while keeping a fully auditable decision trail that satisfies its regulatory obligations.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "ShieldCheck", gradient: "teal-to-navy" },
  },
  {
    slug: "custom-mfa-government-contractor-internal-portal",
    title: "Custom Multi-Factor Authentication System for a Government Contractor's Internal Portal",
    industry: "High Security Websites",
    techCategory: "Custom Software",
    description:
      "Built a custom multi-factor authentication system for a government contractor's internal project portal, where off-the-shelf MFA options didn't meet the specific authentication requirements the contractor was obligated to follow. The system layers hardware-token support alongside standard app-based authentication, with configurable enforcement rules based on the sensitivity level of the project a user is accessing. Login attempts, especially failed ones, are logged in detail to support the contractor's own security audit requirements. We worked closely with the contractor's internal security team throughout the build, since the requirements were dictated by contractual obligations rather than general best practice alone.",
    impact:
      "Brought the contractor's internal authentication system into alignment with its contractual security obligations ahead of a scheduled compliance review.",
    problemStatement:
      "A government contractor's internal project portal had specific multi-factor authentication requirements dictated by contractual obligations that no off-the-shelf MFA option fully met.",
    solution:
      "We built a custom MFA system layering hardware-token support alongside standard app-based authentication, with configurable enforcement rules based on project sensitivity level, logging login attempts in detail to support the contractor's own security audit requirements.",
    features: [
      "Hardware-token support alongside app-based authentication",
      "Sensitivity-level-based enforcement rules",
      "Detailed login attempt logging, including failures",
      "Built to contractual security obligations, not generic best practice",
      "Close alignment with internal security team requirements",
    ],
    businessBenefits: [
      "Brought the contractor's authentication system into alignment with contractual security obligations",
      "Prepared the contractor ahead of a scheduled compliance review",
      "Gave the security team the detailed audit logging its obligations required",
    ],
    prosAndCons: {
      pros: [
        "Built specifically to contractual obligations, not generic MFA best practice",
        "Sensitivity-based enforcement avoids one-size-fits-all friction",
        "Detailed logging directly supports the contractor's own audit requirements",
      ],
      cons: [
        "Hardware-token distribution and management adds an operational overhead",
        "Contractual requirements changing in the future may require system updates",
      ],
    },
    technologies: ["Node.js", "Hardware token API integration", "PostgreSQL"],
    approach:
      "We worked closely with the contractor's internal security team throughout the build, since the specific requirements were dictated by contractual obligations rather than general best practice alone. The system was validated against the contractor's own audit checklist before the scheduled compliance review.",
    results:
      "The contractor's internal authentication system is now aligned with its contractual security obligations ahead of a scheduled compliance review, closing a gap that had been flagged internally.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "ShieldCheck", gradient: "navy-to-teal" },
  },
  {
    slug: "automated-vulnerability-scanning-alerting-healthcare-saas-provider",
    title: "Automated Vulnerability Scanning & Alerting Pipeline for a Healthcare SaaS Provider",
    industry: "High Security Websites",
    techCategory: "Automation",
    description:
      "Built an automated vulnerability scanning pipeline for a healthcare SaaS provider that previously relied on periodic manual security reviews to catch outdated dependencies and misconfigurations. The pipeline runs automated scans against the codebase and infrastructure configuration on every deployment, immediately alerting the engineering team to newly introduced vulnerabilities rather than waiting for the next scheduled review. Findings are automatically triaged by severity, so the team isn't overwhelmed by low-priority alerts and can focus on issues that actually pose meaningful risk. This gave the provider continuous visibility into its security posture instead of a periodic snapshot that could be weeks out of date by the time it was reviewed.",
    impact:
      "Cut the average time to detect and patch a newly introduced vulnerability from weeks to under a day, closing a real gap in the provider's prior review cadence.",
    problemStatement:
      "A healthcare SaaS provider relied on periodic manual security reviews to catch outdated dependencies and misconfigurations, meaning its security posture could be weeks out of date by the time an issue was actually reviewed.",
    solution:
      "We built an automated vulnerability scanning pipeline running against the codebase and infrastructure configuration on every deployment, alerting the engineering team immediately to newly introduced vulnerabilities and automatically triaging findings by severity.",
    features: [
      "Automated scanning on every deployment",
      "Immediate alerting on newly introduced vulnerabilities",
      "Automatic severity-based triage",
      "Continuous visibility instead of periodic snapshots",
      "Covers both codebase and infrastructure configuration",
    ],
    businessBenefits: [
      "Cut time to detect and patch a newly introduced vulnerability from weeks to under a day",
      "Closed a real gap in the provider's prior review cadence",
      "Gave continuous, not periodic, visibility into security posture",
    ],
    prosAndCons: {
      pros: [
        "Runs on every deployment instead of a periodic manual snapshot",
        "Severity triage keeps the team from being overwhelmed by low-priority alerts",
        "Covers both code and infrastructure configuration in one pipeline",
      ],
      cons: [
        "Requires the team to actually act promptly on high-severity alerts to realize the benefit",
        "New scan rule updates are needed as new vulnerability classes emerge",
      ],
    },
    technologies: ["Node.js", "CI/CD pipeline integration", "Vulnerability scanning tools"],
    approach:
      "We integrated scanning directly into the existing deployment pipeline so it required no extra step for engineers, then tuned severity triage rules with the team to avoid alert fatigue from low-priority findings. It ran in observation mode for two weeks before alerts became a blocking part of the deployment process.",
    results:
      "The average time to detect and patch a newly introduced vulnerability dropped from weeks to under a day, closing a real gap in the provider's prior periodic review cadence.",
    timeline: "8 weeks",
    orderValueBand: "$5,000-$7,000",
    image: { icon: "ShieldCheck", gradient: "light-teal-to-navy" },
  },
  {
    slug: "adaptive-risk-based-authentication-online-banking-platform",
    title: "Adaptive Risk-Based Authentication Model for an Online Banking Platform",
    industry: "High Security Websites",
    techCategory: "AI/ML",
    description:
      "Built an adaptive authentication model for an online banking platform that adjusts login and transaction verification requirements based on real-time risk signals like device history, location consistency, and behavioral patterns, rather than applying the same fixed authentication rules to every login regardless of risk. Low-risk logins from a recognized device and location proceed smoothly, while unusual activity automatically triggers additional verification steps before a transaction is allowed to proceed. This reduced friction for the platform's legitimate customers on routine logins while tightening scrutiny exactly where risk was actually elevated. The model was built to log its reasoning for every step-up decision, since the platform's regulators required decisions to be explainable, not just accurate.",
    impact:
      "Reduced unnecessary authentication friction for the vast majority of low-risk logins while measurably tightening security around genuinely suspicious activity.",
    problemStatement:
      "An online banking platform applied the same fixed authentication rules to every login regardless of actual risk, creating unnecessary friction for legitimate customers while not specifically tightening scrutiny where risk was genuinely elevated.",
    solution:
      "We built an adaptive authentication model adjusting login and transaction verification requirements based on real-time risk signals — device history, location consistency, behavioral patterns — with every step-up decision logged and explainable to satisfy regulatory requirements.",
    features: [
      "Real-time risk-signal-based authentication adjustment",
      "Device history and location consistency scoring",
      "Behavioral pattern analysis",
      "Explainable, logged reasoning for every step-up decision",
      "Reduced friction for low-risk, routine logins",
    ],
    businessBenefits: [
      "Reduced unnecessary authentication friction for the vast majority of low-risk logins",
      "Measurably tightened security around genuinely suspicious activity",
      "Met regulatory requirements for explainable authentication decisions",
    ],
    prosAndCons: {
      pros: [
        "Reduces friction for legitimate customers instead of treating every login identically",
        "Tightens scrutiny specifically where risk signals are actually elevated",
        "Logs explainable reasoning for every decision, satisfying regulatory requirements",
      ],
      cons: [
        "Requires ongoing tuning as legitimate customer behavior patterns naturally shift",
        "Novel attack patterns not yet reflected in risk signals could initially be under-scored",
      ],
    },
    technologies: ["Python", "scikit-learn", "PostgreSQL", "FastAPI"],
    approach:
      "We built the model's reasoning to be logged and explainable from the outset, since the platform's regulators required decisions to be justifiable, not just accurate. It ran in shadow mode comparing its recommendations against the platform's existing fixed rules for a full month before making live authentication decisions.",
    results:
      "Unnecessary authentication friction dropped for the vast majority of low-risk logins, while security measurably tightened around genuinely suspicious activity — improving the experience and the protection at the same time.",
    timeline: "3 months",
    orderValueBand: "$25,000+",
    image: { icon: "ShieldCheck", gradient: "teal-to-navy" },
  },
  {
    slug: "hardened-client-portal-rebuild-cybersecurity-consulting-firm",
    title: "Hardened Client Portal Rebuild for a Cybersecurity Consulting Firm",
    industry: "High Security Websites",
    techCategory: "Web App",
    description:
      "Rebuilt the client portal for a cybersecurity consulting firm — an unusually high-stakes rebuild, given that the firm's own credibility depends on practicing what it advises clients to do. The new portal was architected around a minimal attack surface, strict access controls per client engagement, and hardened session and file-upload handling for the sensitive security assessment reports clients access through it. We conducted our own internal security review of the rebuild before handoff, given the firm's justifiably high bar for anything hosting its own client deliverables. The rebuild also replaced an aging portal that had itself become a liability the firm's own team had flagged internally.",
    impact:
      "Gave the firm a client portal that reflects the security standard it holds its own clients to, removing a liability its team had flagged as reputationally risky.",
    problemStatement:
      "A cybersecurity consulting firm's own client portal had become an aging liability its team had flagged internally, an uncomfortable position for a firm whose credibility depends on practicing what it advises clients to do.",
    solution:
      "We rebuilt the portal architected around a minimal attack surface, strict per-engagement access controls, and hardened session and file-upload handling for sensitive security assessment reports, with our own internal security review conducted before handoff given the firm's justifiably high bar.",
    features: [
      "Minimal attack surface architecture",
      "Strict per-client-engagement access controls",
      "Hardened session and file-upload handling",
      "Internal security review conducted before handoff",
      "Replaces an aging, internally-flagged liability",
    ],
    businessBenefits: [
      "Gave the firm a portal reflecting the security standard it holds its own clients to",
      "Removed a liability its own team had flagged as reputationally risky",
      "Reinforced the firm's credibility as a security practitioner, not just an advisor",
    ],
    prosAndCons: {
      pros: [
        "Held to the same standard the firm itself advises clients to meet",
        "Internal security review conducted before handoff, not just at the client's request",
        "Removes a liability the firm's own team had already flagged internally",
      ],
      cons: [
        "The unusually high security bar required more review cycles than a typical client portal",
        "Strict per-engagement access controls require careful configuration for each new client",
      ],
    },
    technologies: ["Next.js", "PostgreSQL", "Node.js"],
    approach:
      "We treated this rebuild with an unusually high bar given the firm's own business depends on credibility in exactly this area, conducting our own internal security review before handoff rather than waiting for the client to request one. The rebuild replaced the aging portal in a staged migration to avoid disrupting active client engagements.",
    results:
      "The firm now has a client portal that reflects the security standard it holds its own clients to, removing a liability its team had flagged as reputationally risky.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "ShieldCheck", gradient: "navy-to-teal" },
  },
  {
    slug: "custom-encryption-secure-file-exchange-legal-document-management-company",
    title: "Custom Data Encryption & Secure File Exchange System for a Legal Document Management Company",
    industry: "High Security Websites",
    techCategory: "Custom Software",
    description:
      "Built a custom encryption and secure file exchange system for a legal document management company handling highly sensitive case files on behalf of law firm clients. The system encrypts documents both at rest and in transit, with granular, time-limited access links replacing the practice of emailing sensitive documents as plain attachments. Every file access and download is logged, giving the company's law firm clients an audit trail they could point to if a document's handling was ever questioned. We built the system to integrate with the company's existing document management workflow rather than requiring staff to learn an entirely new tool for day-to-day work.",
    impact:
      "Eliminated the practice of sensitive case documents being emailed as unencrypted attachments, closing a real liability exposure for both the company and its law firm clients.",
    problemStatement:
      "A legal document management company was emailing sensitive case files as plain attachments on behalf of law firm clients, a real liability exposure for both the company and the firms it served.",
    solution:
      "We built a custom encryption and secure file exchange system encrypting documents at rest and in transit, replacing email attachments with granular, time-limited access links, logging every file access and download for an audit trail law firm clients could point to.",
    features: [
      "Encryption at rest and in transit for all documents",
      "Time-limited, granular access links replacing email attachments",
      "Full access and download logging",
      "Integration with the existing document management workflow",
      "Audit trail available to law firm clients",
    ],
    businessBenefits: [
      "Eliminated the practice of sensitive case documents being emailed as unencrypted attachments",
      "Closed a real liability exposure for both the company and its law firm clients",
      "Gave law firm clients an audit trail for document handling",
    ],
    prosAndCons: {
      pros: [
        "Eliminates unencrypted email attachments as a liability exposure entirely",
        "Time-limited access links reduce risk of documents lingering in old inboxes",
        "Full audit trail gives law firm clients concrete proof of proper handling",
      ],
      cons: [
        "Recipients unfamiliar with secure links occasionally need a brief explanation of the new process",
        "Integration required careful mapping to the company's existing document workflow to avoid disruption",
      ],
    },
    technologies: ["Node.js", "AWS KMS", "PostgreSQL"],
    approach:
      "We built the system to integrate with the company's existing document management workflow rather than requiring staff to learn an entirely new tool, mapping every existing file-handling step first. It launched with one law firm client's documents as a pilot before expanding to the full client base.",
    results:
      "The practice of sensitive case documents being emailed as unencrypted attachments is eliminated, closing a real liability exposure for both the company and its law firm clients.",
    timeline: "10 weeks",
    orderValueBand: "$10,000-$25,000",
    image: { icon: "ShieldCheck", gradient: "light-teal-to-navy" },
  },
];

/**
 * Combined dataset across all industries currently covered. Not imported by
 * any component yet — see the file header comment.
 */
export const portfolioProjects: PortfolioProject[] = [
  ...realEstateProjects,
  ...medicalProjects,
  ...cleaningJanitorialProjects,
  ...consultantsProjects,
  ...foodDrinksProjects,
  ...hotelsHospitalityProjects,
  ...travelProjects,
  ...highSecurityWebsitesProjects,
];

export function getPortfolioProjectsByIndustry(
  industry: string,
): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.industry === industry);
}

/** First sentence of a project's full description — used for compact card previews. */
export function getProjectSummary(project: PortfolioProject): string {
  const [firstSentence] = project.description.split(". ");
  return firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`;
}

// ---------------------------------------------------------------------------
// MOCKUP STYLE RESOLUTION
// ---------------------------------------------------------------------------
// Rather than hand-picking one of ~96 mockup styles per project (and having
// it silently go stale as titles change), the style is derived from the
// project's title/industry/techCategory every time it's rendered. Keyword
// groups are checked in priority order — most specific/reliable signal
// first — before falling back to a per-industry default. See
// /tmp (dev notes) or the classifier walkthrough in the PR description for
// how this was validated against the full dataset.
// ---------------------------------------------------------------------------

const BOOKING_PATTERN =
  /\b(book\w*|reservation\w*|schedul\w*|appointment\w*|itinerary|calendar\w*|check-?in|concierge|remind\w*)\b/i;
const ECOMMERCE_PATTERN =
  /\b(order\w*|menu|loyalty|catering|checkout|cart|upsell)\b/i;
const DASHBOARD_PATTERN =
  /\b(predict\w*|forecast\w*|scor\w*|sentiment|anomaly|risk[- ]?based|risk model|churn|dynamic pricing|demand forecast\w*|fraud|vulnerab\w*|monitor\w*|alert\w*|dispatch|route optim\w*|inventory|checker|inspection|quality check\w*|recommend\w*)\b/i;
const PORTAL_PATTERN =
  /\b(portal\w*|management|integration hub|crm|onboarding|intake|document\w*|compliance|vendor\w*|invoic\w*|billing|audit\w*|encrypt\w*|file exchange|access control|role-based|authentication|multi-factor|mfa|task\w*|maintenance|request\w*|ticket\w*|quote\w*|estimat\w*|calculator|builder|proposal\w*|contract\w*|application\w*|screening|workflow|report\w*|housekeeping|scan\w*)\b/i;

function mockupStyleFromIndustry(project: PortfolioProject): PortfolioMockupStyle {
  if (project.industry === "Real Estate") return "listing-grid";
  if (["Medical", "Hotels & Hospitality", "Travel"].includes(project.industry)) {
    return "booking-calendar";
  }
  if (project.industry === "Food & Drinks") return "ecommerce-ordering";
  if (["AI/ML", "Computer Vision", "Automation"].includes(project.techCategory)) {
    return "dashboard-analytics";
  }
  return "portal-document";
}

export function getMockupStyle(project: PortfolioProject): PortfolioMockupStyle {
  if (project.techCategory === "Chatbot") return "chat-support";
  if (BOOKING_PATTERN.test(project.title)) return "booking-calendar";
  if (ECOMMERCE_PATTERN.test(project.title)) return "ecommerce-ordering";
  if (DASHBOARD_PATTERN.test(project.title)) return "dashboard-analytics";
  if (PORTAL_PATTERN.test(project.title)) return "portal-document";
  return mockupStyleFromIndustry(project);
}

/** Mobile App projects render inside a phone frame; everything else inside a browser frame. */
export function getMockupDevice(project: PortfolioProject): "browser" | "phone" {
  return project.techCategory === "Mobile App" ? "phone" : "browser";
}

// ---------------------------------------------------------------------------
// PROJECT PHASES
// ---------------------------------------------------------------------------
// Every project's `timeline` field is one of a small fixed set of realistic
// engagement lengths (see the literal map below). Phases are generated
// rather than hand-authored per project so the breakdown always sums
// exactly to the stated timeline and stays consistent across the dataset;
// only the per-techCategory phase *descriptions* are hand-written, since
// those genuinely differ by the kind of work being delivered.
// ---------------------------------------------------------------------------

type PhaseKey = "discovery" | "design" | "development" | "testing" | "deployment" | "support";

const PHASE_DESCRIPTIONS: Record<PortfolioTechCategory, Record<PhaseKey, string>> = {
  "Web App": {
    discovery: "Mapped user flows, technical requirements, and success metrics with stakeholders before any design work began.",
    design: "Designed wireframes and a high-fidelity UI covering every core screen, refined through a client review round.",
    development: "Built the frontend and backend in parallel, wiring up the database, APIs, and core application logic.",
    testing: "Ran cross-browser and device testing, fixing edge cases and load-testing key pages before launch.",
    deployment: "Deployed to production infrastructure with monitoring and analytics in place from day one.",
    support: "Provided a short training session and stayed on for post-launch bug fixes and tuning.",
  },
  "Mobile App": {
    discovery: "Defined the app's core user journeys and confirmed platform scope (iOS, Android, or both) with the client.",
    design: "Designed native-feeling UI screens and an interaction flow validated against target app store guidelines.",
    development: "Built the app across the target platforms, integrating device features and backend services as needed.",
    testing: "Tested across real devices and OS versions, fixing performance issues before store submission.",
    deployment: "Submitted to the App Store and/or Google Play and managed the review process through to approval.",
    support: "Monitored crash reports and user feedback post-launch, shipping a stabilization update.",
  },
  "AI/ML": {
    discovery: "Audited available data sources and defined the specific prediction or classification problem to solve.",
    design: "Designed the modeling approach and feature set, and agreed on what 'success' looked like in measurable terms.",
    development: "Built and trained the model, iterating on features and evaluation metrics against held-out data.",
    testing: "Validated model accuracy against real-world scenarios and stress-tested edge cases before rollout.",
    deployment: "Deployed the model behind a production API with monitoring for drift and performance.",
    support: "Set up a retraining cadence and handed over documentation for ongoing model maintenance.",
  },
  "Computer Vision": {
    discovery: "Reviewed sample imagery and defined exactly what the system needed to detect, verify, or measure.",
    design: "Selected the detection approach and designed the review workflow for flagged results.",
    development: "Built and trained the computer vision pipeline against a labeled dataset drawn from real conditions.",
    testing: "Validated accuracy against held-out footage and tuned thresholds to cut false positives.",
    deployment: "Deployed the pipeline into the client's existing workflow with a review dashboard.",
    support: "Monitored real-world accuracy post-launch and retrained the model against edge cases.",
  },
  Automation: {
    discovery: "Mapped the existing manual workflow end-to-end to find where automation would save the most time.",
    design: "Designed the automated workflow and defined handoff points where a human still needed to step in.",
    development: "Built the automation, connecting the client's existing tools and systems via API integrations.",
    testing: "Ran the automation in parallel with the manual process to confirm it matched expected results.",
    deployment: "Cut over from the manual process to the automated workflow with a monitored rollout.",
    support: "Trained the team on the new workflow and stayed on to tune edge cases as they came up.",
  },
  Chatbot: {
    discovery: "Catalogued the most common questions and conversations the assistant would need to handle.",
    design: "Designed the conversation flows and handoff rules for when a human needed to take over.",
    development: "Built and trained the assistant against real data sources so its answers stayed accurate.",
    testing: "Ran the assistant through real conversation scenarios and tuned responses that missed the mark.",
    deployment: "Embedded the assistant live and monitored early conversations closely.",
    support: "Handed over a dashboard for reviewing conversations and updating responses without engineering help.",
  },
  "Custom Software": {
    discovery: "Mapped the client's existing process end-to-end to define exactly what the system needed to replace.",
    design: "Designed the data model and core workflows, validated against how the team actually works day-to-day.",
    development: "Built the system's core modules and integrated it with the client's existing tools and data.",
    testing: "Tested the system against real operational scenarios with the team before rollout.",
    deployment: "Migrated existing data and rolled the system out to the full team.",
    support: "Trained the team on the new system and stayed on for tuning during the first weeks of use.",
  },
};

const PHASE_TITLES: Record<PhaseKey, string> = {
  discovery: "Discovery & Planning",
  design: "Design",
  development: "Development",
  testing: "Testing & QA",
  deployment: "Deployment & Launch",
  support: "Support & Handoff",
};

/**
 * Week-by-week breakdown per distinct `timeline` value in the dataset,
 * expressed as [phaseKey, weeksInPhase] pairs summing to the total. Merged
 * phase keys (e.g. "design+development") combine two archetypes' titles and
 * descriptions for engagements too short to give every phase its own step.
 */
const TIMELINE_PLANS: Record<string, [PhaseKey[], number][]> = {
  "3 weeks": [
    [["discovery"], 1],
    [["design", "development", "testing"], 1],
    [["deployment", "support"], 1],
  ],
  "4 weeks": [
    [["discovery"], 1],
    [["design", "development"], 1],
    [["testing", "deployment"], 1],
    [["support"], 1],
  ],
  "5 weeks": [
    [["discovery"], 1],
    [["design"], 1],
    [["development"], 1],
    [["testing"], 1],
    [["deployment", "support"], 1],
  ],
  "6 weeks": [
    [["discovery"], 1],
    [["design"], 1],
    [["development"], 2],
    [["testing"], 1],
    [["deployment", "support"], 1],
  ],
  "8 weeks": [
    [["discovery"], 1],
    [["design"], 1],
    [["development"], 3],
    [["testing"], 1],
    [["deployment"], 1],
    [["support"], 1],
  ],
  "10 weeks": [
    [["discovery"], 1],
    [["design"], 2],
    [["development"], 3],
    [["testing"], 2],
    [["deployment"], 1],
    [["support"], 1],
  ],
  "3 months": [
    [["discovery"], 2],
    [["design"], 2],
    [["development"], 4],
    [["testing"], 2],
    [["deployment"], 1],
    [["support"], 1],
  ],
  "4 months": [
    [["discovery"], 2],
    [["design"], 3],
    [["development"], 6],
    [["testing"], 3],
    [["deployment"], 1],
    [["support"], 1],
  ],
};

function mergedPhaseTitle(keys: PhaseKey[]): string {
  return keys.map((key) => PHASE_TITLES[key]).join(", ").replace(/, ([^,]*)$/, " & $1");
}

function mergedPhaseDescription(keys: PhaseKey[], techCategory: PortfolioTechCategory): string {
  const descriptions = PHASE_DESCRIPTIONS[techCategory];
  return keys.map((key) => descriptions[key]).join(" ");
}

function formatDuration(startWeek: number, lengthWeeks: number): string {
  return lengthWeeks === 1
    ? `Week ${startWeek}`
    : `Weeks ${startWeek}-${startWeek + lengthWeeks - 1}`;
}

/** Realistic phase-by-phase delivery breakdown, derived from the project's stated timeline and techCategory. */
export function getProjectPhases(project: PortfolioProject): PortfolioPhase[] {
  const plan = TIMELINE_PLANS[project.timeline] ?? TIMELINE_PLANS["8 weeks"];
  let week = 1;

  return plan.map(([keys, length]) => {
    const phase: PortfolioPhase = {
      title: mergedPhaseTitle(keys),
      duration: formatDuration(week, length),
      description: mergedPhaseDescription(keys, project.techCategory),
    };
    week += length;
    return phase;
  });
}
