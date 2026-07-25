import Airtable from "airtable";

// ---------------------------------------------------------------------------
// Airtable is the system of record for leads — see /docs/airtable-setup.md
// for the required base structure (a "Leads" table with the field names/
// types this code assumes).
//
// AIRTABLE_API_KEY / AIRTABLE_BASE_ID are left empty in .env.example until a
// real Airtable account and base exist. Until then (or if the API call
// fails for any other reason — bad key, rate limit, network blip), this
// logs and resolves with `null` instead of throwing. The caller
// (app/api/lead/route.ts) must never let an Airtable outage block the GHL
// sync or the confirmation email — those still need to fire.
// ---------------------------------------------------------------------------

export type AirtableLeadPayload = {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  industryLabel: string;
  description: string;
  answers: Record<string, string>;
  source: "get-started-form" | "contact-form";
};

let leadsTable: Airtable.Table<Airtable.FieldSet> | null | undefined;

function getLeadsTable(): Airtable.Table<Airtable.FieldSet> | null {
  if (leadsTable !== undefined) return leadsTable;

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  leadsTable =
    apiKey && baseId ? new Airtable({ apiKey }).base(baseId)("Leads") : null;

  return leadsTable;
}

// Creates a record in the "Leads" table and returns its Airtable record id,
// or `null` if Airtable isn't configured yet or the request failed.
export async function createLeadInAirtable(
  payload: AirtableLeadPayload,
): Promise<string | null> {
  const table = getLeadsTable();

  if (!table) {
    console.log(
      "[airtable] AIRTABLE_API_KEY / AIRTABLE_BASE_ID not configured — skipping lead storage (expected until the Airtable base is set up; see /docs/airtable-setup.md).",
    );
    return null;
  }

  try {
    const record = await table.create(
      {
        "Full Name": payload.fullName,
        Email: payload.email,
        Phone: payload.phone,
        "Business Name": payload.businessName,
        Industry: payload.industryLabel,
        Message: payload.description,
        "Industry Specific Answers": JSON.stringify(payload.answers),
        Source: payload.source,
      },
      // `typecast` lets Airtable add a new single-select option on the fly
      // instead of erroring — e.g. the Contact form's "General Inquiry"
      // industry label isn't one of the 8 predefined industry options.
      { typecast: true },
    );
    console.log(`[airtable] Lead stored as Airtable record ${record.id}.`);
    return record.id;
  } catch (error) {
    console.error("[airtable] Failed to create lead record:", error);
    return null;
  }
}
