import { Resend } from "resend";

// Transactional email via Resend. Two emails fire on a new lead: an internal
// notification to the team (LEAD_NOTIFICATION_EMAIL) and a confirmation to the
// person who submitted the form.
//
// If RESEND_API_KEY isn't set (e.g. local dev without credentials), both
// functions log what *would* have been sent and return without throwing — a
// missing email provider must never block a lead from being saved.

export type LeadEmailPayload = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  industryLabel: string;
  description: string;
  answers: { label: string; value: string }[];
  source: "get-started-form" | "contact-form";
  // When the lead was received — shown in the internal notification.
  submittedAt: Date;
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

// Minimal HTML escaping so lead-supplied text can't break the email markup.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  }).format(date);
}

// One "Label: value" row for the internal notification table.
function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;vertical-align:top;color:#5B6B83;font-size:13px;width:140px;">${label}</td>
      <td style="padding:8px 0;vertical-align:top;color:#102A43;font-size:14px;font-weight:600;">${value}</td>
    </tr>`;
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

  const rows = [
    detailRow("Name", escapeHtml(lead.fullName)),
    detailRow(
      "Email",
      `<a href="mailto:${encodeURIComponent(lead.email)}" style="color:#1F6FFF;text-decoration:none;">${escapeHtml(lead.email)}</a>`,
    ),
    lead.phone ? detailRow("Phone", escapeHtml(lead.phone)) : "",
    lead.businessName ? detailRow("Business", escapeHtml(lead.businessName)) : "",
    detailRow("Service / Industry", escapeHtml(lead.industryLabel)),
    detailRow("Source", escapeHtml(sourceLabel)),
    detailRow("Received", escapeHtml(formatTimestamp(lead.submittedAt))),
  ].join("");

  const answersHtml =
    lead.answers.length > 0
      ? `<h3 style="margin:24px 0 8px;color:#102A43;font-size:14px;">Additional details</h3>
         <ul style="margin:0;padding-left:18px;color:#102A43;font-size:14px;line-height:1.6;">
           ${lead.answers
             .map(
               (answer) =>
                 `<li><strong>${escapeHtml(answer.label)}:</strong> ${escapeHtml(answer.value)}</li>`,
             )
             .join("")}
         </ul>`
      : "";

  await client.emails.send({
    from,
    to,
    // Let the team reply straight to the lead from their inbox.
    replyTo: lead.email,
    subject: `New Lead: ${lead.fullName} — ${lead.industryLabel}`,
    html: `
      <div style="background:#F8FBFF;padding:24px;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #E3EDF8;border-radius:16px;overflow:hidden;">
          <div style="background:#102A43;padding:20px 24px;">
            <p style="margin:0;color:#67E8FF;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;">New lead · ${escapeHtml(sourceLabel)}</p>
            <h1 style="margin:6px 0 0;color:#ffffff;font-size:20px;">${escapeHtml(lead.fullName)}</h1>
          </div>
          <div style="padding:24px;">
            <table style="width:100%;border-collapse:collapse;">${rows}</table>
            <h3 style="margin:24px 0 8px;color:#102A43;font-size:14px;">Message</h3>
            <p style="margin:0;color:#102A43;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(lead.description)}</p>
            ${answersHtml}
          </div>
        </div>
      </div>
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

  const firstName = escapeHtml(lead.fullName.split(" ")[0] || lead.fullName);
  const intro =
    lead.source === "contact-form"
      ? "Thanks for reaching out to CodeIT — we've received your message."
      : `Thanks for telling us about ${escapeHtml(lead.businessName) || "your business"} — we've received your details.`;

  await client.emails.send({
    from,
    to: lead.email,
    subject: "Thanks — we've received your message (CodeIT)",
    html: `
      <div style="background:#F8FBFF;padding:24px;font-family:Arial,Helvetica,sans-serif;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #E3EDF8;border-radius:16px;padding:32px;">
          <h1 style="margin:0 0 16px;color:#102A43;font-size:22px;">Hi ${firstName},</h1>
          <p style="margin:0 0 14px;color:#102A43;font-size:15px;line-height:1.6;">${intro}</p>
          <p style="margin:0 0 14px;color:#102A43;font-size:15px;line-height:1.6;">
            A member of our team will review it and get back to you <strong>within 24 hours</strong>
            (Monday–Friday). If your enquiry is urgent, just reply to this email.
          </p>
          <p style="margin:24px 0 0;color:#5B6B83;font-size:15px;line-height:1.6;">
            Talk soon,<br />
            <strong style="color:#102A43;">The CodeIT team</strong>
          </p>
        </div>
      </div>
    `,
  });
}
