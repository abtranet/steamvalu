import type { Metadata } from "next";
import { FeaturesHero } from "@/components/sites/twinzo-com-ca6666c1/features-de335934/FeaturesHero";
import { FeatureCardsGrid } from "@/components/sites/twinzo-com-ca6666c1/features-de335934/FeatureCardsGrid";
import { SupportedDataSources } from "@/components/sites/twinzo-com-ca6666c1/features-de335934/SupportedDataSources";
import { ComingNext } from "@/components/sites/twinzo-com-ca6666c1/features-de335934/ComingNext";
import { FeaturesCTA } from "@/components/sites/twinzo-com-ca6666c1/features-de335934/FeaturesCTA";

export const metadata: Metadata = {
  title: "Features | Twinzo - Digital Twin",
  description:
    "A 3D digital twin app for real-time view. Detailed web analysis for a deep dive. And if something goes wrong, get notified.",
};

export default function FeaturesPage() {
  return (
    <main>
      <FeaturesHero />
      <FeatureCardsGrid />
      <SupportedDataSources />
      <ComingNext />
      <FeaturesCTA />
    </main>
  );
}
