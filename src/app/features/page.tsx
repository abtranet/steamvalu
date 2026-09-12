import type { Metadata } from "next";
import { FeaturesHero } from "@/components/sites/steam-value/features-de335934/FeaturesHero";
import { FeaturesVideoShowcase } from "@/components/sites/steam-value/features-de335934/FeaturesVideoShowcase";
import { FeatureCardsGrid } from "@/components/sites/steam-value/features-de335934/FeatureCardsGrid";
import { SupportedDataSources } from "@/components/sites/steam-value/features-de335934/SupportedDataSources";
import { ComingNext } from "@/components/sites/steam-value/features-de335934/ComingNext";
import { FeaturesCTA } from "@/components/sites/steam-value/features-de335934/FeaturesCTA";

export const metadata: Metadata = {
  "title": "Plateforme | STEAM VALUE™",
  "description": "STEAM VALUE™ compose les jumeaux de vos équipements, rassemble les données opérationnelles et révèle la santé globale de votre système sans remplacer vos outils existants."
};

export default function FeaturesPage() {
  return (
    <div>
      <div className="sv-features-intro">
        <FeaturesHero />
        <FeaturesVideoShowcase />
      </div>
      <FeatureCardsGrid />
      <SupportedDataSources />
      <ComingNext />
      <FeaturesCTA />
    </div>
  );
}
