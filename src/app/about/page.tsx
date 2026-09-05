import type { Metadata } from "next";
import { AboutCta } from "@/components/sites/twinzo-com-ca6666c1/about-979bddc4/AboutCta";
import { AboutFounder } from "@/components/sites/twinzo-com-ca6666c1/about-979bddc4/AboutFounder";
import { AboutHero } from "@/components/sites/twinzo-com-ca6666c1/about-979bddc4/AboutHero";
import { AboutStory } from "@/components/sites/twinzo-com-ca6666c1/about-979bddc4/AboutStory";
import { AboutTeam } from "@/components/sites/twinzo-com-ca6666c1/about-979bddc4/AboutTeam";
import { HistoryTimeline } from "@/components/sites/twinzo-com-ca6666c1/about-979bddc4/HistoryTimeline";

export const metadata: Metadata = {
  title: "About | Twinzo - Digital Twin",
};

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      <AboutHero />
      <AboutFounder />
      <AboutStory />
      <AboutTeam />
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
