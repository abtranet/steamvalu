import type { Metadata } from "next";
import { HeroSection } from "@/components/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/HeroSection";
import { ProblemSolutionSection } from "@/components/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/ProblemSolutionSection";
import { CtaBanner } from "@/components/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/CtaBanner";
import { StatsSection } from "@/components/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/StatsSection";
import { RelatedUseCases } from "@/components/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/RelatedUseCases";

export const metadata: Metadata = {
  title: "Monitor production | twinzo - Digital Twin",
  description:
    "Monitor your facility in the operational digital twin.  Try it for FREE!",
};

export default function MonitorProductionPage() {
  return (
    <>
      <HeroSection />
      <ProblemSolutionSection />
      <CtaBanner
        headline="Book Your Free Expert Session"
        buttonLabel="Book now"
        href="https://calendly.com/d/cv66-765-hyx/book-your-free-expert-session?utm_content=expert_session"
        external
      />
      <StatsSection />
      <CtaBanner
        headline="Get free Whitepaper for step-by-step instructions"
        buttonLabel="Download now"
        href="/get-whitepaper"
      />
      <RelatedUseCases />
    </>
  );
}
