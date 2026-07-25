import { Resend } from "resend";

// PLACEHOLDER email integration. Resend is used here as a stand-in email
// provider — swap for whatever the business ultimately picks (Resend,
// Postmark, SES, Nodemailer + SMTP, etc.) by rewriting the two send
// functions below. Everything reads its config from env vars so no code
// changes are needed to point at a real account.
//
// If RESEND_API_KEY isn't set (e.g. local dev without credentials), both
// functions log what *would* have been sent and return without throwing —
// a missing email provider should never block a lead from being saved.

export type LeadEmailPayload = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  industryLabel: string;
  description: string;
  answers: { label: string; value: string }[];
  source: "get-started-form" | "contact-form";
};

const SOURCE_LABELS: Record<LeadEmailPayload["source"], string> = {
  "get-started-form": "Get Started form",
  "contact-form": "Contact form",
};

let resendClient: Resend | null | undefined;

function getResendClient(): Resend | null {
  if (resendClient !== undefined) return resendClient;

  const apiKey = process.env.RESEND_API_KEY;
  resendClient = apiKey ? new Resend(apiKey) : null;
  return resendClient;
}

function renderAnswersHtml(answers: LeadEmailPayload["answers"]): string {
  if (answers.length === 0) return "";
  return `<ul>${answers
    .map((answer) => `<li><strong>${answer.label}:</strong> ${answer.value}</li>`)
    .join("")}</ul>`;
}

export async function sendInternalLeadNotification(
  lead: LeadEmailPayload,
): Promise<void> {
  const client = getResendClient();
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM ?? "leads@codeit.com";

  if (!client || !to) {
    console.log(
      "[email] Resend not configured (missing RESEND_API_KEY or LEAD_NOTIFICATION_EMAIL) — " +
        `skipping internal notification for new ${lead.industryLabel} lead: ${lead.email}`,
    );
    return;
  }

  const sourceLabel = SOURCE_LABELS[lead.source];
  const subjectSubject =
    lead.source === "contact-form" ? lead.fullName : lead.businessName;

  await client.emails.send({
    from,
    to,
    subject: `New ${lead.industryLabel} lead (${sourceLabel}): ${subjectSubject}`,
    html: `
      <h2>New ${sourceLabel} submission</h2>
      <p><strong>Name:</strong> ${lead.fullName}</p>
      ${lead.businessName ? `<p><strong>Business:</strong> ${lead.businessName}</p>` : ""}
      <p><strong>Industry:</strong> ${lead.industryLabel}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      ${lead.phone ? `<p><strong>Phone:</strong> ${lead.phone}</p>` : ""}
      <p><strong>Message:</strong> ${lead.description}</p>
      ${renderAnswersHtml(lead.answers)}
    `,
  });
}

export async function sendLeadConfirmationEmail(
  lead: LeadEmailPayload,
): Promise<void> {
  const client = getResendClient();
  const from = process.env.EMAIL_FROM ?? "hello@codeit.com";

  if (!client) {
    console.log(
      `[email] Resend not configured (missing RESEND_API_KEY) — skipping confirmation email to ${lead.email}`,
    );
    return;
  }

  const firstName = lead.fullName.split(" ")[0] || lead.fullName;
  const body =
    lead.source === "contact-form"
      ? `<p>Thanks for reaching out. A member of the CodeIT team will review your message and get back to you shortly.</p>`
      : `<p>Thanks for telling us about ${lead.businessName}. A member of the CodeIT
         team will review your ${lead.industryLabel.toLowerCase()} details
         and reach out shortly to talk through a plan.</p>`;

  await client.emails.send({
    from,
    to: lead.email,
    subject: "We've got your info — CodeIT",
    html: `
      <p>Hi ${firstName},</p>
      ${body}
      <p>— The CodeIT team</p>
    `,
  });
}
