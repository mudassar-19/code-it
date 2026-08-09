import { prisma } from "@/lib/prisma";
import { getIndustryBySlug } from "@/lib/industries";
import { getIndustryQuestions } from "@/lib/industryQuestions";
import { normalizeLeadStatus } from "@/lib/leadStatus";
import LeadsTable, { type LeadRow } from "@/components/admin/LeadsTable";

export const dynamic = "force-dynamic";

// Parse the JSON-encoded answers blob into labeled { label, value } entries,
// mapping question ids to their human labels for the industry (see
// lib/industryQuestions.ts). Returns [] if the blob is missing or malformed.
function parseAnswers(
  raw: string,
  industrySlug: string,
): { label: string; value: string }[] {
  let record: Record<string, unknown>;
  try {
    record = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return [];
  }
  if (!record || typeof record !== "object") return [];

  const labels = new Map(
    getIndustryQuestions(industrySlug).map((q) => [q.id, q.label]),
  );
  return Object.entries(record)
    .filter(([, value]) => typeof value === "string" && value.length > 0)
    .map(([id, value]) => ({
      label: labels.get(id) ?? id,
      value: String(value),
    }));
}

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 500,
  });

  const rows: LeadRow[] = leads.map((lead) => ({
    id: lead.id,
    fullName: lead.fullName,
    email: lead.email,
    phone: lead.phone,
    businessName: lead.businessName,
    industryLabel: getIndustryBySlug(lead.industry)?.name ?? "General Inquiry",
    source: lead.source,
    description: lead.description,
    answers: parseAnswers(lead.answers, lead.industry),
    status: normalizeLeadStatus(lead.status),
    createdAt: lead.createdAt.toISOString(),
  }));

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-display-md font-semibold text-navy">
          Leads
        </h1>
        <p className="mt-2 text-text-secondary">
          {rows.length} lead{rows.length === 1 ? "" : "s"} · newest first
          {rows.length === 500 ? " (showing latest 500)" : ""}. Reply from your
          own inbox via the email or WhatsApp links.
        </p>
      </header>

      {rows.length === 0 ? (
        <div className="rounded-2xl border border-light-teal bg-card p-10 text-center text-text-secondary shadow-soft">
          No leads captured yet.
        </div>
      ) : (
        <LeadsTable initialLeads={rows} />
      )}
    </div>
  );
}
