import type { Metadata } from "next";
import { AboutCta } from "@/components/sites/steam-value/about-979bddc4/AboutCta";
import { AboutPlatform } from "@/components/sites/steam-value/about-979bddc4/AboutPlatform";
import { AboutHero } from "@/components/sites/steam-value/about-979bddc4/AboutHero";
import { AboutStory } from "@/components/sites/steam-value/about-979bddc4/AboutStory";
import { AboutAudience } from "@/components/sites/steam-value/about-979bddc4/AboutAudience";
import { HistoryTimeline } from "@/components/sites/steam-value/about-979bddc4/HistoryTimeline";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      <JsonLd data={breadcrumbJsonLd("about")} />
      <AboutHero />
      <AboutPlatform />
      <AboutStory />
      <AboutAudience />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="h-px w-full bg-white/20" />
      </div>
      <HistoryTimeline />
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="h-px w-full bg-white/20" />
      </div>
      <AboutCta />
    </div>
  );
}
