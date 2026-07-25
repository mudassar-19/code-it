import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";
import { getIndustryBySlug } from "@/lib/industries";
import { getIndustryQuestions } from "@/lib/industryQuestions";
import {
  sendInternalLeadNotification,
  sendLeadConfirmationEmail,
} from "@/lib/email";
import { syncLeadToGoHighLevel } from "@/lib/ghlSync";
import { createLeadInAirtable } from "@/lib/airtable";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  // Spam protection: `honeypot` is a hidden field real users never see or
  // fill in (see components/GetStartedForm.tsx). Bots that blindly fill
  // every input trip it. Respond as if the submission succeeded so bots
  // don't learn the check exists, but skip the Airtable write and both
  // emails.
  if (data.honeypot) {
    console.warn(
      "[api/lead] Honeypot field was filled — treating submission as spam.",
    );
    return NextResponse.json({ success: true, leadId: null }, { status: 201 });
  }

  // `industry` is either a real industry slug or the "general-inquiry"
  // sentinel (leadSchema.ts) used by sources like the Contact form that
  // aren't tied to a specific industry — getIndustryBySlug returns
  // undefined for the sentinel, which is expected.
  const industry = getIndustryBySlug(data.industry);
  const industryLabel = industry?.name ?? "General Inquiry";

  // 1. Airtable is the system of record for leads — write it first, before
  // touching any other third-party service. createLeadInAirtable() never
  // throws: a misconfigured or unreachable Airtable base is logged and
  // must not block the GHL sync or confirmation email below (see
  // lib/airtable.ts and /docs/airtable-setup.md).
  const leadId = await createLeadInAirtable({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    businessName: data.businessName,
    industryLabel,
    description: data.description,
    answers: data.answers,
    source: data.source,
  });

  const questionLabels = new Map(
    getIndustryQuestions(data.industry).map((question) => [
      question.id,
      question.label,
    ]),
  );
  const answerEntries = Object.entries(data.answers)
    .filter(([, value]) => value.length > 0)
    .map(([id, value]) => ({ label: questionLabels.get(id) ?? id, value }));

  const emailPayload = {
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    businessName: data.businessName,
    industryLabel,
    description: data.description,
    answers: answerEntries,
    source: data.source,
  };

  // 2 & 3. Internal notification + submitter confirmation. Best-effort: an
  // email provider outage should never make an otherwise-successful
  // submission look like a failure to the user, and must run regardless of
  // whether the Airtable write above succeeded.
  const emailResults = await Promise.allSettled([
    sendInternalLeadNotification(emailPayload),
    sendLeadConfirmationEmail(emailPayload),
  ]);
  emailResults.forEach((result, resultIndex) => {
    if (result.status === "rejected") {
      const step = resultIndex === 0 ? "internal notification" : "confirmation";
      console.error(`[api/lead] Failed to send ${step} email:`, result.reason);
    }
  });

  // 4. Outbound GoHighLevel sync — optional, fire-and-forget, never blocks
  // the response. See lib/ghlSync.ts for the GHL-side setup (an Inbound
  // Webhook trigger) and why this can never affect whether the lead counts
  // as saved.
  syncLeadToGoHighLevel(leadId ?? "unknown", {
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    businessName: data.businessName,
    industry: industryLabel,
    message: data.description,
    source: data.source,
  }).catch((error) => {
    console.error("[api/lead] GHL sync threw unexpectedly:", error);
  });

  return NextResponse.json({ success: true, leadId }, { status: 201 });
}
