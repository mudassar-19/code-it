// ---------------------------------------------------------------------------
// GoHighLevel outbound sync — basic one-way lead export via an Inbound Webhook.
//
// GHL-side setup: create a Workflow with an "Inbound Webhook" trigger. GHL
// generates a unique URL for that trigger the moment you add it — paste that
// URL into GHL_WEBHOOK_URL. That's the entire setup: no API key, no OAuth,
// no app to register in GHL. The workflow itself owns whatever should happen
// next in GoHighLevel (create/update the contact, tag it, enter a pipeline,
// notify a rep, etc.) — this code only has to deliver the payload.
//
// Our own database remains the system of record for every lead (see
// prisma/schema.prisma). This is a one-way, best-effort export: a lead is
// already considered "saved" the moment prisma.lead.create() resolves in
// the API route, before this ever runs. If this fails, times out, or
// GHL_WEBHOOK_URL isn't configured yet, nothing about the main lead-save /
// confirmation-email flow is affected — leads can always be resynced later
// from the Lead table.
// ---------------------------------------------------------------------------

export type GhlLeadPayload = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  industry: string;
  message: string;
  source: string;
};

export async function syncLeadToGoHighLevel(
  leadId: string,
  payload: GhlLeadPayload,
): Promise<void> {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log(
      `[ghlSync] GHL_WEBHOOK_URL not configured — skipping GoHighLevel sync for lead ${leadId} (expected until the GHL workflow is set up).`,
    );
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      // Inbound Webhook triggers should respond almost instantly; don't let
      // a stalled request hang around indefinitely.
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error(
        `[ghlSync] GoHighLevel webhook responded with ${response.status} for lead ${leadId}.`,
      );
      return;
    }

    console.log(`[ghlSync] Lead ${leadId} forwarded to GoHighLevel.`);
  } catch (error) {
    // Never rethrow — callers treat this as fire-and-forget and must not
    // have the lead-save/email flow fail because of it.
    console.error(
      `[ghlSync] Failed to forward lead ${leadId} to GoHighLevel:`,
      error,
    );
  }
}
