import { z } from "zod";
import { industries } from "@/lib/industries";

const industrySlugs = industries.map((industry) => industry.slug) as [
  string,
  ...string[],
];

// Sentinel used when a submission isn't tied to one of our real industries
// (e.g. the general Contact form). Kept out of lib/industries.ts since it's
// not an industry we serve — just a catch-all tag for lead triage.
export const GENERAL_INQUIRY = "general-inquiry" as const;

const industryValues = [...industrySlugs, GENERAL_INQUIRY] as [
  string,
  ...string[],
];

const PHONE_PATTERN = /^[0-9+()\-.\s]{7,}$/;

// Shared validation for a lead submission — used server-side by
// /app/api/lead/route.ts for both the "Get Started" form and the simpler
// Contact form (see `source`). Industry-specific question answers are
// validated loosely (a bag of trimmed strings) since the question set
// varies per industry; see lib/industryQuestions.ts for what's actually
// asked.
export const leadSchema = z
  .object({
    industry: z
      .enum(industryValues, { message: "Select a valid industry." })
      .default(GENERAL_INQUIRY),
    fullName: z
      .string()
      .trim()
      .min(2, "Enter your full name.")
      .max(120, "That name is too long."),
    email: z
      .string()
      .trim()
      .min(1, "Enter your email.")
      .email("Enter a valid email address."),
    // Only required for the Get Started form — the Contact form doesn't
    // collect phone/business name at all. See the superRefine below.
    phone: z
      .string()
      .trim()
      .max(30, "That phone number is too long.")
      .optional()
      .default(""),
    businessName: z
      .string()
      .trim()
      .max(150, "That business name is too long.")
      .optional()
      .default(""),
    description: z
      .string()
      .trim()
      .min(10, "Give us a few more details (at least 10 characters).")
      .max(2000, "Please keep this under 2000 characters."),
    answers: z.record(z.string(), z.string().trim().max(500)).default({}),
    // Which form this came in through — determines which fields are
    // actually required (see superRefine) and gets stored/forwarded so
    // leads can be triaged by origin.
    source: z
      .enum(["get-started-form", "contact-form"])
      .default("get-started-form"),
    // Honeypot: real users never see or fill this field (hidden via CSS).
    // Any non-empty value here means the submission is almost certainly a bot.
    honeypot: z.string().optional().default(""),
  })
  .superRefine((data, ctx) => {
    if (data.source !== "get-started-form") return;

    if (!PHONE_PATTERN.test(data.phone)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Enter a valid phone number.",
      });
    }
    if (data.businessName.length < 1) {
      ctx.addIssue({
        code: "custom",
        path: ["businessName"],
        message: "Enter your business name.",
      });
    }
    if (data.industry === GENERAL_INQUIRY) {
      ctx.addIssue({
        code: "custom",
        path: ["industry"],
        message: "Select a valid industry.",
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
