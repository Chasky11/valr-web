import { FinalCta } from "@/components/sections/final-cta";
import { ForgeProcess } from "@/components/sections/forge-process";
import { Hero } from "@/components/sections/hero";
import { Pillars } from "@/components/sections/pillars";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Pillars />
      <ForgeProcess />
      <FinalCta />
      <SiteFooter />
    </main>
  );
}
