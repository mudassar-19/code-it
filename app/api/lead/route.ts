import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/leadSchema";
import { getIndustryBySlug } from "@/lib/industries";
import { getIndustryQuestions } from "@/lib/industryQuestions";
import {
  sendInternalLeadNotification,
  sendLeadConfirmationEmail,
} from "@/lib/email";
import { prisma } from "@/lib/prisma";

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
  // don't learn the check exists, but skip persistence and both emails.
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

  // 1. Persist the lead. The database is the single source of truth, so this
  // is the PRIMARY write: if it fails we return a real error instead of
  // pretending the submission succeeded. `answers` is JSON-encoded to match
  // the Lead.answers field (see prisma/schema.prisma).
  let createdLead;
  try {
    createdLead = await prisma.lead.create({
      data: {
        industry: data.industry,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        businessName: data.businessName,
        description: data.description,
        answers: JSON.stringify(data.answers),
        source: data.source,
      },
    });
  } catch (error) {
    console.error("[api/lead] Failed to save lead to database:", error);
    return NextResponse.json(
      {
        error:
          "We couldn't save your submission. Please try again in a moment.",
      },
      { status: 500 },
    );
  }

  const leadId = createdLead.id;

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
    submittedAt: createdLead.createdAt,
  };

  // 2 & 3. Internal notification + submitter confirmation. Best-effort: the
  // lead is already saved, so an email provider outage should never make an
  // otherwise-successful submission look like a failure to the user.
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

  return NextResponse.json({ success: true, leadId }, { status: 201 });
}
