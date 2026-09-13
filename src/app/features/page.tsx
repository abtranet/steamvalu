import type { Metadata } from "next";
import { FeaturesHero } from "@/components/sites/steam-value/features-de335934/FeaturesHero";
import { FeaturesVideoShowcase } from "@/components/sites/steam-value/features-de335934/FeaturesVideoShowcase";
import { FeatureCardsGrid } from "@/components/sites/steam-value/features-de335934/FeatureCardsGrid";
import { SupportedDataSources } from "@/components/sites/steam-value/features-de335934/SupportedDataSources";
import { ComingNext } from "@/components/sites/steam-value/features-de335934/ComingNext";
import { FeaturesCTA } from "@/components/sites/steam-value/features-de335934/FeaturesCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("features");

export default function FeaturesPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd("features")} />
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
