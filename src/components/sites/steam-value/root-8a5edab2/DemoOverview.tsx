"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";

const COPY = {
  fr: {
    title: "Notre approche",
    body: "STEAM VALUE™ est développée par GFID autour d'une conviction simple : sur un site industriel, la valeur ne vient pas de centraliser toutes les données au même endroit, mais de composer les jumeaux numériques des équipements et des zones pour lire le système dans son ensemble. La plateforme complète les outils existants et reste alignée sur la série ISO 23247.",
    versionNumber: "V3.1",
    versionTitle: "Version du démonstrateur",
    versionBody: "Télémétrie, propagation de la santé, registre, graphe de composition et usine 3D déjà implémentés.",
    scenariosNumber: "4",
    scenariosTitle: "Scénarios de défaut",
    scenariosBody: "Usure roulement, cavitation, blocage vanne et dérive capteur, rejouables à la demande sur des données simulées.",
    ourStory: "Notre histoire",
    features: "Fonctionnalités",
  },
  en: {
    title: "Our approach",
    body: "STEAM VALUE™ is developed by GFID around a simple conviction: on an industrial site, value does not come from centralizing all data in one place, but from composing the digital twins of equipment and areas to read the system as a whole. The platform complements existing tools and remains aligned with the ISO 23247 series.",
    versionNumber: "V3.1",
    versionTitle: "Demonstrator version",
    versionBody: "Telemetry, health propagation, registry, composition graph, and 3D plant already implemented.",
    scenariosNumber: "4",
    scenariosTitle: "Fault scenarios",
    scenariosBody: "Bearing wear, cavitation, valve blockage, and sensor drift, replayable on demand with simulated data.",
    ourStory: "Our story",
    features: "Features",
  },
} as const;

export function OurApproach() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section className="sv-approach bg-white py-12 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 md:px-10 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 xl:gap-20">
          {/* Left Column */}
          <div className="flex flex-col">
            <h2 className="text-[38px] leading-[1.1] font-bold tracking-[-0.03em] text-[#0a0a0a] md:text-[46px] lg:text-[52px]">
              {copy.title}
            </h2>

            <p className="mt-6 max-w-[540px] text-[16px] leading-[1.7] text-[#4a5568] md:text-[17px]">
              {copy.body}
            </p>

            <div className="mt-12 space-y-10">
              {/* Stat 1: V3.1 */}
              <div className="flex items-start gap-6 md:gap-8">
                <span className="min-w-[120px] flex-none text-[48px] leading-none font-bold tracking-tight text-[#0a0a0a] md:min-w-[140px] md:text-[56px]">
                  {copy.versionNumber}
                </span>
                <div className="space-y-1 pt-1">
                  <h3 className="text-[16px] font-semibold text-[#0a0a0a] md:text-[17px]">
                    {copy.versionTitle}
                  </h3>
                  <p className="max-w-[420px] text-[14px] leading-[1.6] text-[#4a5568] md:text-[15px]">
                    {copy.versionBody}
                  </p>
                </div>
              </div>

              {/* Stat 2: 4 */}
              <div className="flex items-start gap-6 md:gap-8">
                <span className="min-w-[120px] flex-none text-[48px] leading-none font-bold tracking-tight text-[#0a0a0a] md:min-w-[140px] md:text-[56px]">
                  {copy.scenariosNumber}
                </span>
                <div className="space-y-1 pt-1">
                  <h3 className="text-[16px] font-semibold text-[#0a0a0a] md:text-[17px]">
                    {copy.scenariosTitle}
                  </h3>
                  <p className="max-w-[420px] text-[14px] leading-[1.6] text-[#4a5568] md:text-[15px]">
                    {copy.scenariosBody}
                  </p>
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="mt-12 flex flex-wrap items-center gap-8 text-[15px] font-medium text-[#0a0a0a]">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#06bed4]"
              >
                <span>{copy.ourStory}</span>
                <span aria-hidden="true" className="text-base text-[#4a5568]">
                  ›
                </span>
              </Link>
              <Link
                href="/features"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-[#06bed4]"
              >
                <span>{copy.features}</span>
                <span aria-hidden="true" className="text-base text-[#4a5568]">
                  ›
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Founder Portrait */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] overflow-hidden rounded-[32px] bg-[#f2f2f3]">
              <Image
                src="/images/founder-portrait.png"
                alt="STEAM VALUE™ - GFID"
                width={700}
                height={870}
                priority
                className="h-auto w-full rounded-[32px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Backwards compatibility export
export const DemoOverview = OurApproach;

