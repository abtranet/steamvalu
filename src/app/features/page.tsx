import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/schema";
import { FeaturesHero } from "@/components/sites/steamvalu/features-de335934/FeaturesHero";
import { FeatureCardsGrid } from "@/components/sites/steamvalu/features-de335934/FeatureCardsGrid";
import { SupportedDataSources } from "@/components/sites/steamvalu/features-de335934/SupportedDataSources";
import { ComingNext } from "@/components/sites/steamvalu/features-de335934/ComingNext";
import { FeaturesCTA } from "@/components/sites/steamvalu/features-de335934/FeaturesCTA";

export const metadata: Metadata = {
  title: "Digital Twin Features: Live 3D & RTLS Tracking",
  description:
    "Live 3D factory view, RTLS asset tracking, web analytics and threshold alerts. See every SteamValu digital twin feature and the data sources it connects.",
  alternates: { canonical: "/features" },
  openGraph: {
    type: "website",
    url: "/features",
    title: "Digital Twin Features: Live 3D & RTLS Tracking",
    description:
      "Live 3D factory view, RTLS asset tracking, web analytics and threshold alerts. See every SteamValu digital twin feature.",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <JsonLd data={softwareApplicationSchema} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Features", path: "/features" }])}
      />
      <FeaturesHero />
      <FeatureCardsGrid />
      <SupportedDataSources />
      <ComingNext />
      <FeaturesCTA />
    </>
  );
}
