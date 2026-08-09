"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, Loader2, Mail, Search } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type LeadStatus,
} from "@/lib/leadStatus";

export type LeadRow = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  industryLabel: string;
  source: string;
  description: string;
  answers: { label: string; value: string }[];
  status: LeadStatus;
  createdAt: string; // ISO string
};

type StatusFilter = "all" | LeadStatus;

const dateFmt = new Intl.DateTimeFormat("en-US", {
  dateStyle: "medium",
  timeStyle: "short",
});

const STATUS_BADGE: Record<LeadStatus, string> = {
  new: "bg-primary-blue/15 text-primary-blue",
  contacted: "bg-warning/15 text-warning",
  closed: "bg-success/15 text-success",
};

// wa.me needs the number with no +, spaces, or dashes.
function whatsappHref(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 ? `https://wa.me/${digits}` : null;
}

function truncate(text: string, max = 90): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export default function LeadsTable({
  initialLeads,
}: {
  initialLeads: LeadRow[];
}) {
  const [leads, setLeads] = useState(initialLeads);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(
    () => ({
      all: leads.length,
      new: leads.filter((l) => l.status === "new").length,
      contacted: leads.filter((l) => l.status === "contacted").length,
      closed: leads.filter((l) => l.status === "closed").length,
    }),
    [leads],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter !== "all" && lead.status !== statusFilter) return false;
      if (!q) return true;
      return (
        lead.fullName.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q)
      );
    });
  }, [leads, statusFilter, query]);

  async function updateStatus(lead: LeadRow, nextStatus: LeadStatus) {
    if (nextStatus === lead.status) return;
    const previous = lead.status;
    setBusyId(lead.id);
    setError(null);
    // Optimistic update.
    setLeads((prev) =>
      prev.map((l) => (l.id === lead.id ? { ...l, status: nextStatus } : l)),
    );
    try {
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (!response.ok) {
        // Revert on failure.
        setLeads((prev) =>
          prev.map((l) => (l.id === lead.id ? { ...l, status: previous } : l)),
        );
        const result = await response.json().catch(() => null);
        setError(result?.error ?? "Could not update the lead status.");
      }
    } catch {
      setLeads((prev) =>
        prev.map((l) => (l.id === lead.id ? { ...l, status: previous } : l)),
      );
      setError("Network error — please try again.");
    } finally {
      setBusyId(null);
    }
  }

  const filterTabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    ...LEAD_STATUSES.map((s) => ({ key: s, label: LEAD_STATUS_LABELS[s] })),
  ];

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter leads by status">
          {filterTabs.map((tab) => {
            const isActive = statusFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setStatusFilter(tab.key)}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-250 ${
                  isActive
                    ? "border-primary-blue bg-brand-gradient text-white shadow-glow"
                    : "border-light-teal bg-card text-text-secondary hover:bg-soft-blue hover:text-navy"
                }`}
              >
                {tab.label}
                <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "text-text-muted"}`}>
                  {counts[tab.key]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email…"
            className="w-64 max-w-full rounded-xl border border-light-teal bg-card py-2 pl-9 pr-3 text-sm text-navy outline-none placeholder:text-text-disabled focus:border-primary-blue focus:ring-4 focus:ring-light-cyan/40"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-light-teal bg-card p-10 text-center text-text-secondary shadow-soft">
          No leads match this view.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-light-teal bg-card shadow-soft">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-light-teal text-xs uppercase tracking-wide text-text-muted">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Reach out</th>
                <th className="px-5 py-3 font-medium">Service</th>
                <th className="px-5 py-3 font-medium">Received</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const expanded = expandedId === lead.id;
                const wa = whatsappHref(lead.phone);
                return (
                  <Fragment key={lead.id}>
                    <tr className="border-b border-light-teal/60 align-top last:border-0">
                      <td className="px-5 py-3.5">
                        <div className="font-medium text-navy">{lead.fullName}</div>
                        {lead.businessName && (
                          <div className="text-xs text-text-muted">{lead.businessName}</div>
                        )}
                        <button
                          type="button"
                          onClick={() => setExpandedId(expanded ? null : lead.id)}
                          className="mt-1 inline-flex items-center gap-1 text-left text-xs text-text-secondary hover:text-navy"
                          aria-expanded={expanded}
                        >
                          <ChevronDown
                            className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-180" : ""}`}
                          />
                          {expanded ? "Hide message" : truncate(lead.description)}
                        </button>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-col gap-1.5">
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1.5 text-primary-blue hover:underline"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {lead.email}
                          </a>
                          {lead.phone && (
                            <span className="text-xs text-text-secondary">{lead.phone}</span>
                          )}
                          {wa && (
                            <a
                              href={wa}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-success hover:underline"
                            >
                              <FaWhatsapp className="h-3.5 w-3.5" />
                              WhatsApp
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-text-secondary">
                        <div>{lead.industryLabel}</div>
                        <div className="text-xs text-text-muted">{lead.source}</div>
                      </td>
                      <td className="px-5 py-3.5 text-text-secondary">
                        {dateFmt.format(new Date(lead.createdAt))}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE[lead.status]}`}
                          >
                            {LEAD_STATUS_LABELS[lead.status]}
                          </span>
                          <div className="relative">
                            <select
                              value={lead.status}
                              disabled={busyId === lead.id}
                              onChange={(e) =>
                                updateStatus(lead, e.target.value as LeadStatus)
                              }
                              aria-label={`Update status for ${lead.fullName}`}
                              className="rounded-lg border border-light-teal bg-card py-1 pl-2 pr-6 text-xs text-navy outline-none focus:border-primary-blue focus:ring-2 focus:ring-light-cyan/40 disabled:opacity-50"
                            >
                              {LEAD_STATUSES.map((s) => (
                                <option key={s} value={s}>
                                  {LEAD_STATUS_LABELS[s]}
                                </option>
                              ))}
                            </select>
                            {busyId === lead.id && (
                              <Loader2 className="pointer-events-none absolute right-1 top-1/2 h-3.5 w-3.5 -translate-y-1/2 animate-spin text-primary-blue" />
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                    {expanded && (
                      <tr className="border-b border-light-teal/60 bg-mist/40">
                        <td colSpan={5} className="px-5 py-4">
                          <p className="whitespace-pre-wrap text-sm leading-relaxed text-navy/80">
                            {lead.description}
                          </p>
                          {lead.answers.length > 0 && (
                            <ul className="mt-3 space-y-1 text-sm text-navy/80">
                              {lead.answers.map((answer) => (
                                <li key={answer.label}>
                                  <span className="font-medium text-navy">{answer.label}:</span>{" "}
                                  {answer.value}
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
