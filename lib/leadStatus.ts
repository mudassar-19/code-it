// Follow-up lifecycle for a lead, tracked from the admin Leads panel. Shared
// by the status-update API (app/api/admin/leads/[id]) and the admin UI so the
// allowed values and their labels stay in one place.
export const LEAD_STATUSES = ["new", "contacted", "closed"] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};

// A lead created before the `status` field existed reads back as null — treat
// that as "new" everywhere so the UI never shows a blank status.
export function normalizeLeadStatus(value: string | null | undefined): LeadStatus {
  return value === "contacted" || value === "closed" ? value : "new";
}
