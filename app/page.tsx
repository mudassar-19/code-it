import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Industries from "@/sections/Industries";
import Portfolio from "@/sections/Portfolio";
import GetStarted from "@/sections/GetStarted";
import BookACall from "@/sections/BookACall";
import Contact from "@/sections/Contact";
import ShapeDivider from "@/components/ShapeDivider";
import JsonLd from "@/components/JsonLd";
import { themeColors } from "@/lib/theme";
import { buildMetadata, organizationJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "CodeIT | Web, Mobile & AI Software Development Agency",
  description:
    "CodeIT is a full-spectrum technology partner building web, mobile, and AI-powered software for growing businesses — custom development meets automation.",
  path: "/",
});

// ISR: the homepage stays static/fast but re-renders at most every 5 minutes,
// so newly published products (see sections/Portfolio.tsx) show up without a
// redeploy. The build renders with a graceful fallback if the DB is offline.
export const revalidate = 300;

export default function HomePage() {
  return (
    <main>
      <JsonLd data={organizationJsonLd()} />
      <Hero />
      <ShapeDivider variant="wave" bgColor={themeColors.background} fillColor={themeColors.navyDeep} />
      <About />
      <ShapeDivider variant="wave" bgColor={themeColors.navyDeep} fillColor={themeColors.section} flip />
      <Services />
      <ShapeDivider variant="angle" bgColor={themeColors.section} fillColor={themeColors.navyDeep} />
      <Industries />
      <ShapeDivider variant="angle" bgColor={themeColors.navyDeep} fillColor={themeColors.section} flip />
      <Portfolio />
      <GetStarted />
      <BookACall />
      <Contact />
      <ShapeDivider variant="wave" bgColor={themeColors.mist} fillColor={themeColors.navyDeep} height="h-10 sm:h-16 lg:h-20" />
    </main>
  );
}
