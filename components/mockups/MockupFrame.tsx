// ---------------------------------------------------------------------------
// Reusable device chrome for portfolio mockups. Two frames — BrowserFrame
// (web/desktop work) and PhoneFrame (Mobile App projects) — wrap whichever
// abstract screen content (see MockupScreens.tsx) matches a project's
// business type, so every project gets a frame appropriate to how it's
// actually used, with a consistent, premium chrome around it.
// ---------------------------------------------------------------------------

import type { ReactNode } from "react";

export function BrowserFrame({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-light-teal/60 bg-white shadow-card">
      <div className="flex items-center gap-1.5 border-b border-light-teal/60 bg-light-teal/30 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-navy/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy/20" />
        <span className="ml-2 h-4 flex-1 rounded-full bg-white" />
      </div>
      <div className="aspect-[16/10] w-full">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center py-2">
      <div className="w-[220px] rounded-[2rem] border-[6px] border-navy bg-navy p-1.5 shadow-card sm:w-[260px]">
        <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.5rem]">
          {children}
          <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-navy/60" />
        </div>
      </div>
    </div>
  );
}
