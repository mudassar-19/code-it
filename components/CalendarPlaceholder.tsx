// Booking calendar for the "Book a Consultation" section.
//
// Embeds a free Cal.com scheduling page via a plain iframe (no extra runtime
// dependency, works with the existing server-component setup). Set
// NEXT_PUBLIC_CAL_LINK to your Cal.com link — either a full URL
// ("https://cal.com/your-name/intro-call") or just the slug
// ("your-name/intro-call"). If it's unset, a graceful fallback message is
// shown instead of a broken embed.

import { CalendarClock } from "lucide-react";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK?.trim();

// Turn whatever's in NEXT_PUBLIC_CAL_LINK into an embeddable https URL.
function resolveCalUrl(link: string): string {
  const value = /^https?:\/\//i.test(link)
    ? link
    : `https://cal.com/${link.replace(/^\/+/, "")}`;
  // month_view keeps the embed compact; embed=true tells Cal.com to render
  // the streamlined embed chrome rather than the full marketing page.
  const separator = value.includes("?") ? "&" : "?";
  return `${value}${separator}embed=true&layout=month_view`;
}

export default function CalendarPlaceholder() {
  if (!CAL_LINK) {
    return (
      <div
        id="scheduling-embed"
        className="flex min-h-[420px] flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-teal/40 bg-light-teal/20 p-10 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal text-white">
          <CalendarClock className="h-7 w-7" strokeWidth={2} />
        </div>
        <h3 className="font-display text-lg font-semibold text-navy">
          Live scheduling coming soon
        </h3>
        <p className="max-w-sm text-sm text-navy/70">
          Once connected, you&apos;ll be able to pick an available time and book
          your discovery call instantly, right here.
        </p>
      </div>
    );
  }

  return (
    <div
      id="scheduling-embed"
      className="overflow-hidden rounded-2xl border border-light-teal bg-card shadow-soft"
    >
      <iframe
        src={resolveCalUrl(CAL_LINK)}
        title="Book a consultation"
        className="h-[700px] w-full"
        loading="lazy"
        allow="camera; microphone; autoplay; encrypted-media; fullscreen"
      />
    </div>
  );
}
