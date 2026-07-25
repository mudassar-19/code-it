// ---------------------------------------------------------------------------
// PLACEHOLDER project mockup. No real product screenshots exist yet for
// this dummy portfolio dataset (see lib/portfolio.ts) — this renders a
// device frame (browser window for web/desktop work, phone frame for
// Mobile App projects, see MockupFrame.tsx) around an abstract UI template
// matched to what the project actually does (see MockupScreens.tsx and
// getMockupStyle() in lib/portfolio.ts) — a listing grid for real-estate
// listing tools, a calendar for booking/scheduling tools, chat bubbles for
// chatbots, and so on — instead of a generic, unrelated placeholder.
//
// Swap `<MockupScreen>` below for a real <img> screenshot per project once
// actual client work is available and cleared for publication.
// ---------------------------------------------------------------------------

import { BrowserFrame, PhoneFrame } from "@/components/mockups/MockupFrame";
import { MockupScreen } from "@/components/mockups/MockupScreens";
import { getMockupDevice, getMockupStyle, type PortfolioProject } from "@/lib/portfolio";

export default function PortfolioMockup({
  project,
}: {
  project: PortfolioProject;
}) {
  const style = getMockupStyle(project);
  const device = getMockupDevice(project);
  const screen = <MockupScreen style={style} gradient={project.image.gradient} />;

  if (device === "phone") {
    return <PhoneFrame>{screen}</PhoneFrame>;
  }

  return <BrowserFrame>{screen}</BrowserFrame>;
}
