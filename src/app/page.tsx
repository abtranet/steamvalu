import { Devices } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/Devices";
import { GetInControlCta } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/GetInControlCta";
import { Hero } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/Hero";
import { Michal } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/Michal";
import { StepsSection } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/StepsSection";
import { Testimonials } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/Testimonials";
import { TypesSection } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/TypesSection";
import { UseCases } from "@/components/sites/twinzo-com-ca6666c1/root-8a5edab2/UseCases";

export default function Home() {
  return (
    <>
      <Hero />
      <StepsSection />
      <Devices />
      <TypesSection />
      <UseCases />
      <Testimonials />
      <Michal />
      <GetInControlCta />
    </>
  );
}
