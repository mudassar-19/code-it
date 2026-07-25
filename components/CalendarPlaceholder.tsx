// PLACEHOLDER scheduling widget. No real calendar is embedded yet — this is
// a stand-in so the "Book a Consultation" section has the right shape and
// visual weight before a real embed exists.
//
// To go live with Calendly once an account/event type is set up:
//   1. Replace the contents of the wrapping <div id="scheduling-embed"> below
//      with Calendly's inline embed snippet, e.g.:
//        <div
//          className="calendly-inline-widget"
//          data-url="https://calendly.com/codeit/intro-call"
//          style={{ minWidth: 320, height: 700 }}
//        />
//   2. Load Calendly's widget script once (e.g. via a <Script> tag in
//      app/layout.tsx): https://assets.calendly.com/assets/external/widget.js
// Any other Calendly-style embed (SavvyCal, Cal.com, etc.) drops in the same
// way — swap the iframe/script, keep the surrounding section unchanged.

import { CalendarClock } from "lucide-react";

export default function CalendarPlaceholder() {
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
        Once connected, you&apos;ll be able to pick an available time and
        book your discovery call instantly, right here.
      </p>
    </div>
  );
}
