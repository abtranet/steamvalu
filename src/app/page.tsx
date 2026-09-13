import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { Devices } from "@/components/sites/steamvalu/root-8a5edab2/Devices";
import {
  FAQ_ENTRIES,
  Faq,
} from "@/components/sites/steamvalu/root-8a5edab2/Faq";
import { GetInControlCta } from "@/components/sites/steamvalu/root-8a5edab2/GetInControlCta";
import { Hero } from "@/components/sites/steamvalu/root-8a5edab2/Hero";
import { Michal } from "@/components/sites/steamvalu/root-8a5edab2/Michal";
import { StepsSection } from "@/components/sites/steamvalu/root-8a5edab2/StepsSection";
import { Testimonials } from "@/components/sites/steamvalu/root-8a5edab2/Testimonials";
import { TypesSection } from "@/components/sites/steamvalu/root-8a5edab2/TypesSection";
import { UseCases } from "@/components/sites/steamvalu/root-8a5edab2/UseCases";
import { faqSchema, softwareApplicationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "SteamValu | 3D Digital Twin for Factories & Warehouses",
  description:
    "See your factory floor live in 3D. SteamValu tracks forklifts, assets and people in real time so you can cut fleet costs and idle time. Book a free demo.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd data={faqSchema(FAQ_ENTRIES)} />
      <Hero />
      <StepsSection />
      <Devices />
      <TypesSection />
      <UseCases />
      <Testimonials />
      <Michal />
      <Faq />
      <GetInControlCta />
    </>
  );
}
