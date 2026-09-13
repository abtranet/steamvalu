import type { Metadata } from "next";
import { HeroSection } from "@/components/sites/steam-value/monitor-production-af1f7c13/HeroSection";
import { ProblemSolutionSection } from "@/components/sites/steam-value/monitor-production-af1f7c13/ProblemSolutionSection";
import { CtaBanner } from "@/components/sites/steam-value/monitor-production-af1f7c13/CtaBanner";
import { StatsSection } from "@/components/sites/steam-value/monitor-production-af1f7c13/StatsSection";
import { RelatedUseCases } from "@/components/sites/steam-value/monitor-production-af1f7c13/RelatedUseCases";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("monitorProduction");

export default function MonitorProductionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("monitorProduction")} />
      <HeroSection />
      <ProblemSolutionSection />
      <CtaBanner
        headline="Commencer par un système. Étendre avec des preuves."
        buttonLabel="Découvrir"
        href="/demo"
      />
      <StatsSection />
      <CtaBanner
        headline="La valeur se mesure avant de se généraliser."
        buttonLabel="Voir la démarche"
        href="/about"
      />
      <RelatedUseCases />
    </>
  );
}
