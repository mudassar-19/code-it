import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Industries from "@/sections/Industries";
import Portfolio from "@/sections/Portfolio";
import GetStarted from "@/sections/GetStarted";
import BookACall from "@/sections/BookACall";
import Contact from "@/sections/Contact";
import ShapeDivider from "@/components/ShapeDivider";
import { colors } from "@/lib/theme";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ShapeDivider variant="wave" bgColor={colors.white} fillColor={colors.navyDeep} />
      <About />
      <ShapeDivider variant="wave" bgColor={colors.navyDeep} fillColor={colors.white} flip />
      <Services />
      <ShapeDivider variant="angle" bgColor={colors.white} fillColor={colors.navyDeep} />
      <Industries />
      <ShapeDivider variant="angle" bgColor={colors.navyDeep} fillColor={colors.white} flip />
      <Portfolio />
      <GetStarted />
      <BookACall />
      <Contact />
      <ShapeDivider variant="wave" bgColor={colors.mist} fillColor={colors.navyDeep} height="h-10 sm:h-16 lg:h-20" />
    </main>
  );
}
