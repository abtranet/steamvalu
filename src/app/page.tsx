import { DemoSection } from "@/components/demos/DemoSection";
import { Devices } from "@/components/sites/steam-value/root-8a5edab2/Devices";
import { GetInControlCta } from "@/components/sites/steam-value/root-8a5edab2/GetInControlCta";
import { Hero } from "@/components/sites/steam-value/root-8a5edab2/Hero";
import { OurApproach } from "@/components/sites/steam-value/root-8a5edab2/DemoOverview";
import { Rollout } from "@/components/sites/steam-value/root-8a5edab2/Rollout";
import { TypesSection } from "@/components/sites/steam-value/root-8a5edab2/TypesSection";
import { UseCases } from "@/components/sites/steam-value/root-8a5edab2/UseCases";

export default function Home() {
  return (
    <>
      <Hero />
      <Devices />
      <TypesSection />
      <DemoSection />
      <UseCases />
      <Rollout />
      <OurApproach />
      <GetInControlCta />
    </>
  );
}
