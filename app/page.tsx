import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Industries from "@/sections/Industries";
import Portfolio from "@/sections/Portfolio";
import GetStarted from "@/sections/GetStarted";
import BookACall from "@/sections/BookACall";
import Contact from "@/sections/Contact";
import ShapeDivider from "@/components/ShapeDivider";
import { themeColors } from "@/lib/theme";

export default function HomePage() {
  return (
    <main>
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
