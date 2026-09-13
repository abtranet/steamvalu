import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { EXPERT_SESSION_URL } from "@/lib/site";
import { HeroSection } from "@/components/sites/steamvalu/monitor-production-af1f7c13/HeroSection";
import { ProblemSolutionSection } from "@/components/sites/steamvalu/monitor-production-af1f7c13/ProblemSolutionSection";
import { CtaBanner } from "@/components/sites/steamvalu/monitor-production-af1f7c13/CtaBanner";
import { StatsSection } from "@/components/sites/steamvalu/monitor-production-af1f7c13/StatsSection";
import { RelatedUseCases } from "@/components/sites/steamvalu/monitor-production-af1f7c13/RelatedUseCases";

export const metadata: Metadata = {
  title: "Monitor Production in a Live 3D Digital Twin",
  description:
    "Put ERP, MES and PLC data onto a live 3D model of your plant. Spot bottlenecks as they happen and run Gemba walks without leaving your desk. Book a demo.",
  alternates: { canonical: "/monitor-production" },
  openGraph: {
    type: "website",
    url: "/monitor-production",
    title: "Monitor Production in a Live 3D Digital Twin",
    description:
      "Put ERP, MES and PLC data onto a live 3D model of your plant and spot bottlenecks as they happen.",
  },
};

export default function MonitorProductionPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Monitor production", path: "/monitor-production" },
        ])}
      />
      <HeroSection />
      <ProblemSolutionSection />
      <CtaBanner
        headline="Book Your Free Expert Session"
        buttonLabel="Book now"
        href={EXPERT_SESSION_URL}
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
