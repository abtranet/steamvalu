import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { AboutCta } from "@/components/sites/steamvalu/about-979bddc4/AboutCta";
import { AboutFounder } from "@/components/sites/steamvalu/about-979bddc4/AboutFounder";
import { AboutHero } from "@/components/sites/steamvalu/about-979bddc4/AboutHero";
import { AboutStory } from "@/components/sites/steamvalu/about-979bddc4/AboutStory";
import { AboutTeam } from "@/components/sites/steamvalu/about-979bddc4/AboutTeam";
import { HistoryTimeline } from "@/components/sites/steamvalu/about-979bddc4/HistoryTimeline";

export const metadata: Metadata = {
  title: { absolute: "About SteamValu: Building Live 3D Digital Twins" },
  description:
    "Meet the team behind SteamValu. From a 2018 idea to digital twins running in plants across Europe -- our story, our people and the milestones so far.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: { absolute: "About SteamValu: Building Live 3D Digital Twins" },
    description:
      "Meet the team behind SteamValu -- our story, our people and the milestones so far.",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-black text-white">
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
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
