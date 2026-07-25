// ---------------------------------------------------------------------------
// A small library of reusable, abstract UI mockups — one per general
// project type (listing/grid apps, booking/calendar apps, chat/support
// apps, dashboard/analytics apps, e-commerce/ordering apps, portal/document
// apps). No real product screenshots exist for this dummy portfolio dataset
// (see lib/portfolio.ts); these are brand-palette (teal/navy) abstractions
// of each UI's actual shape — property cards with price tags and map pins,
// a calendar grid with a selected date, chat bubbles, a bar chart, product
// cards, a document table — so a project's mockup at least *reads* as the
// right kind of product, not a generic dashboard.
//
// `getMockupStyle()` in lib/portfolio.ts decides which screen a project
// gets; `MockupFrame.tsx` decides which device chrome wraps it.
// ---------------------------------------------------------------------------

import { ChevronLeft, ChevronRight, FileText, MapPin, Plus, Send, TrendingUp } from "lucide-react";
import type { PortfolioMockupStyle, PortfolioProjectImage } from "@/lib/portfolio";

const GRADIENT_CLASSES: Record<PortfolioProjectImage["gradient"], string> = {
  "teal-to-navy": "from-teal via-navy to-navy",
  "navy-to-teal": "from-navy via-teal to-light-teal",
  "light-teal-to-navy": "from-light-teal via-teal to-navy",
};

type ScreenProps = { gradient: PortfolioProjectImage["gradient"] };

function ScreenBase({ gradient, children }: ScreenProps & { children: React.ReactNode }) {
  return (
    <div
      className={`relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-br p-3 ${GRADIENT_CLASSES[gradient]}`}
    >
      <div className="pointer-events-none absolute -left-6 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-4 h-36 w-36 rounded-full bg-navy/20 blur-2xl" />
      <div className="relative flex h-full w-full flex-col">{children}</div>
    </div>
  );
}

function PropertyCard() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-md bg-white/15">
      <div className="relative h-2/3 w-full bg-white/20">
        <span className="absolute right-1 top-1 rounded bg-white/90 px-1.5 py-0.5 text-[6px] font-bold text-navy">
          $—
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-1 px-1.5">
        <div className="flex items-center gap-1">
          <MapPin className="h-2 w-2 flex-none text-white/70" strokeWidth={2.5} />
          <div className="h-1 w-3/4 rounded-full bg-white/50" />
        </div>
        <div className="h-1 w-1/2 rounded-full bg-white/30" />
      </div>
    </div>
  );
}

export function ListingGridScreen({ gradient }: ScreenProps) {
  return (
    <ScreenBase gradient={gradient}>
      <div className="flex items-center gap-2">
        <div className="h-3 flex-1 rounded-full bg-white/20" />
        <div className="h-3 w-3 flex-none rounded-full bg-white/30" />
        <div className="h-3 w-3 flex-none rounded-full bg-white/30" />
      </div>
      <div className="mt-2 grid flex-1 grid-cols-2 gap-2">
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
        <PropertyCard />
      </div>
    </ScreenBase>
  );
}

export function BookingCalendarScreen({ gradient }: ScreenProps) {
  const cells = Array.from({ length: 21 }, (_, i) => i);
  const selected = 12;
  return (
    <ScreenBase gradient={gradient}>
      <div className="flex items-center justify-between">
        <ChevronLeft className="h-3 w-3 text-white/60" strokeWidth={2.5} />
        <div className="h-1.5 w-16 rounded-full bg-white/50" />
        <ChevronRight className="h-3 w-3 text-white/60" strokeWidth={2.5} />
      </div>
      <div className="mt-2 grid flex-1 grid-cols-7 gap-1">
        {cells.map((cell) => (
          <div
            key={cell}
            className={`rounded-sm ${cell === selected ? "bg-white" : "bg-white/15"}`}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded bg-white/15 px-1.5 py-1">
          <span className="h-1.5 w-6 flex-none rounded-full bg-white/70" />
          <span className="h-1 flex-1 rounded-full bg-white/30" />
        </div>
        <div className="flex items-center gap-2 rounded bg-white/10 px-1.5 py-1">
          <span className="h-1.5 w-6 flex-none rounded-full bg-white/50" />
          <span className="h-1 flex-1 rounded-full bg-white/20" />
        </div>
      </div>
    </ScreenBase>
  );
}

export function ChatSupportScreen({ gradient }: ScreenProps) {
  return (
    <ScreenBase gradient={gradient}>
      <div className="flex items-center gap-2 border-b border-white/15 pb-2">
        <span className="h-4 w-4 flex-none rounded-full bg-white/40" />
        <span className="h-1.5 w-16 rounded-full bg-white/50" />
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
      </div>
      <div className="mt-2 flex flex-1 flex-col justify-end gap-1.5">
        <div className="max-w-[70%] rounded-lg rounded-bl-none bg-white/20 px-2 py-1.5">
          <div className="h-1 w-16 rounded-full bg-white/60" />
          <div className="mt-1 h-1 w-10 rounded-full bg-white/40" />
        </div>
        <div className="ml-auto max-w-[70%] rounded-lg rounded-br-none bg-white/90 px-2 py-1.5">
          <div className="h-1 w-12 rounded-full bg-navy/50" />
        </div>
        <div className="max-w-[70%] rounded-lg rounded-bl-none bg-white/20 px-2 py-1.5">
          <div className="h-1 w-14 rounded-full bg-white/60" />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-full bg-white/15 px-2 py-1.5">
        <div className="h-1 flex-1 rounded-full bg-white/30" />
        <Send className="h-2.5 w-2.5 flex-none text-white" strokeWidth={2.5} />
      </div>
    </ScreenBase>
  );
}

function StatTile() {
  return (
    <div className="flex flex-1 flex-col gap-1 rounded-md bg-white/15 p-1.5">
      <TrendingUp className="h-2.5 w-2.5 text-white/70" strokeWidth={2.5} />
      <div className="h-1.5 w-8 rounded-full bg-white/60" />
    </div>
  );
}

export function DashboardAnalyticsScreen({ gradient }: ScreenProps) {
  const bars = [40, 65, 50, 80, 60, 90];
  return (
    <ScreenBase gradient={gradient}>
      <div className="flex gap-2">
        <StatTile />
        <StatTile />
        <StatTile />
      </div>
      <div className="mt-2 flex flex-1 items-end gap-2 rounded-md bg-white/10 p-2">
        <div className="flex h-full flex-1 items-end gap-1.5">
          {bars.map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-white/50"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <div className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full border-4 border-white/30">
          <div className="absolute inset-0 rounded-full border-4 border-t-white border-r-white border-transparent" />
        </div>
      </div>
    </ScreenBase>
  );
}

function ProductCard() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-md bg-white/15">
      <div className="h-1/2 w-full bg-white/20" />
      <div className="flex flex-1 flex-col justify-center gap-1 px-1.5">
        <div className="h-1 w-3/4 rounded-full bg-white/50" />
        <div className="flex items-center justify-between">
          <div className="h-1 w-6 rounded-full bg-white/40" />
          <Plus className="h-2.5 w-2.5 rounded-full bg-white text-navy" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}

export function EcommerceOrderingScreen({ gradient }: ScreenProps) {
  return (
    <ScreenBase gradient={gradient}>
      <div className="flex gap-1.5">
        <div className="h-3 w-10 rounded-full bg-white/40" />
        <div className="h-3 w-10 rounded-full bg-white/15" />
        <div className="h-3 w-10 rounded-full bg-white/15" />
      </div>
      <div className="mt-2 grid flex-1 grid-cols-2 gap-2">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </ScreenBase>
  );
}

function DocumentRow() {
  return (
    <div className="flex items-center gap-2 rounded bg-white/10 px-2 py-1.5">
      <FileText className="h-2.5 w-2.5 flex-none text-white/60" strokeWidth={2} />
      <div className="flex flex-1 flex-col gap-1">
        <div className="h-1 w-2/3 rounded-full bg-white/50" />
        <div className="h-1 w-1/3 rounded-full bg-white/25" />
      </div>
      <span className="h-2.5 w-6 flex-none rounded-full bg-white/40" />
    </div>
  );
}

export function PortalDocumentScreen({ gradient }: ScreenProps) {
  return (
    <ScreenBase gradient={gradient}>
      <div className="flex flex-1 gap-2">
        <div className="flex w-6 flex-none flex-col items-center gap-2 rounded-md bg-white/10 py-2">
          <span className="h-2 w-2 rounded-full bg-white/50" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
          <span className="h-2 w-2 rounded-full bg-white/30" />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <div className="mb-1 h-3 w-full rounded-full bg-white/15" />
          <DocumentRow />
          <DocumentRow />
          <DocumentRow />
        </div>
      </div>
    </ScreenBase>
  );
}

const SCREEN_BY_STYLE: Record<
  PortfolioMockupStyle,
  (props: ScreenProps) => React.ReactElement
> = {
  "listing-grid": ListingGridScreen,
  "booking-calendar": BookingCalendarScreen,
  "chat-support": ChatSupportScreen,
  "dashboard-analytics": DashboardAnalyticsScreen,
  "ecommerce-ordering": EcommerceOrderingScreen,
  "portal-document": PortalDocumentScreen,
};

export function MockupScreen({
  style,
  gradient,
}: {
  style: PortfolioMockupStyle;
  gradient: PortfolioProjectImage["gradient"];
}) {
  const Screen = SCREEN_BY_STYLE[style];
  return <Screen gradient={gradient} />;
}
