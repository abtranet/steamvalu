import type { Metadata } from "next";
import { HeroSection } from "@/components/sites/steam-value/monitor-production-af1f7c13/HeroSection";
import { ProblemSolutionSection } from "@/components/sites/steam-value/monitor-production-af1f7c13/ProblemSolutionSection";
import { CtaBanner } from "@/components/sites/steam-value/monitor-production-af1f7c13/CtaBanner";
import { StatsSection } from "@/components/sites/steam-value/monitor-production-af1f7c13/StatsSection";
import { RelatedUseCases } from "@/components/sites/steam-value/monitor-production-af1f7c13/RelatedUseCases";

export const metadata: Metadata = {
  "title": "Performance du procédé | STEAM VALUE™",
  "description": "Mettre en regard la santé des équipements, les zones de production et les indicateurs du processus dans une lecture commune."
};

export default function MonitorProductionPage() {
  return (
    <>
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
