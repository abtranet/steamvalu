import type { Metadata } from "next";
import { DemoSection } from "@/components/demos/DemoSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Devices } from "@/components/sites/steam-value/root-8a5edab2/Devices";
import { FAQ } from "@/components/sites/steam-value/root-8a5edab2/faq";
import { FaqSection } from "@/components/sites/steam-value/root-8a5edab2/FaqSection";
import { GetInControlCta } from "@/components/sites/steam-value/root-8a5edab2/GetInControlCta";
import { Hero } from "@/components/sites/steam-value/root-8a5edab2/Hero";
import { OurApproach } from "@/components/sites/steam-value/root-8a5edab2/DemoOverview";
import { Rollout } from "@/components/sites/steam-value/root-8a5edab2/Rollout";
import { TypesSection } from "@/components/sites/steam-value/root-8a5edab2/TypesSection";
import { UseCases } from "@/components/sites/steam-value/root-8a5edab2/UseCases";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home");

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(FAQ.fr)} />
      <Hero />
      <Devices />
      <TypesSection />
      <DemoSection />
      <UseCases />
      <Rollout />
      <OurApproach />
      <FaqSection />
      <GetInControlCta />
    </>
  );
}
