"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Box, Factory, FlaskConical, Gauge, Play } from "lucide-react";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { PLANT_3D_HREF } from "@/components/palm-oil/view";

const COPY = {
  fr: {
    eyebrow: "LES DÉMOS STEAM VALUE™",
    title: "Explorez les démos interactives.",
    intro: "Explorez un jumeau numérique, changez les conditions et observez ce qui se passe. Choisissez votre point de départ.",
    disclosure: "Données simulées · Accès libre",
    plant: {
      scale: "À L’ÉCHELLE D’UNE USINE",
      title: "Huilerie de palme",
      body: "Suivez le procédé, de la réception au stockage. Déclenchez un défaut et observez son effet sur la production.",
      tags: ["7 unités de procédé", "Scénarios de défaut", "Tableau de bord + 3D"],
      cta: "Explorer l’usine",
      alt: "Aperçu du jumeau numérique de l’huilerie de palme et de ses indicateurs de production",
      language: "Démo en français",
    },
    compressor: {
      scale: "À L’ÉCHELLE D’UN ÉQUIPEMENT",
      title: "Compresseur C-02",
      body: "Faites varier la charge. Inspectez les composants et comparez la température, la pression et la consommation.",
      tags: ["3 composants", "Vue thermique", "Vue éclatée"],
      cta: "Inspecter le compresseur",
      alt: "Aperçu de la salle de contrôle interactive du compresseur C-02",
      language: "Démo en anglais",
    },
  },
  en: {
    eyebrow: "STEAM VALUE™ DEMOS",
    title: "Explore the interactive demos.",
    intro: "Explore a digital twin, change the conditions and see what happens. Choose where to start.",
    disclosure: "Simulated data · Open access",
    plant: {
      scale: "EXPLORE A WHOLE PLANT",
      title: "Palm-oil mill",
      body: "Follow the process from reception to storage. Trigger a fault and see its effect on production.",
      tags: ["7 process units", "Fault scenarios", "Dashboard + 3D"],
      cta: "Explore the plant",
      alt: "Preview of the palm-oil mill digital twin and its production indicators",
      language: "Demo in French",
    },
    compressor: {
      scale: "INSPECT A SINGLE ASSET",
      title: "Compressor C-02",
      body: "Adjust the operating load. Inspect components and compare temperature, pressure and power draw.",
      tags: ["3 components", "Thermal view", "Exploded view"],
      cta: "Inspect the compressor",
      alt: "Preview of the interactive Compressor C-02 control room",
      language: "Demo in English",
    },
  },
} as const;

export function DemoSection() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const demos = [
    { id: "plant", ...copy.plant, href: PLANT_3D_HREF, image: "/steam-value/videos/plant-landscape-v2.jpg", icon: Factory },
    { id: "compressor", ...copy.compressor, href: "/demo/compressor", image: "/images/about-control-room.png", icon: Gauge },
  ];

  return (
    <div className="bg-[#f3f6f8] text-[#0d2b3a]">
      <section aria-labelledby="demos-heading" id="demos" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-16 md:py-24 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.1em] text-[#0d4a72]"><Box size={17} aria-hidden="true" />{copy.eyebrow}</p>
          <p className="flex items-center gap-2 text-sm text-[#52677a]"><FlaskConical size={15} aria-hidden="true" />{copy.disclosure}</p>
        </div>
        <h2 id="demos-heading" className="max-w-4xl text-[clamp(2.1rem,4.3vw,3.5rem)] leading-[1.12] font-semibold tracking-[-0.045em]">{copy.title}</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#52677a] sm:text-lg">{copy.intro}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {demos.map((demo) => (
            <article key={demo.id} className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#d8e3eb] bg-white shadow-[0_5px_20px_rgba(13,43,58,0.035)]">
              <Link href={demo.href} aria-label={demo.cta} className="group relative block aspect-[2/1] focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-[#00c0e8] overflow-hidden border-b border-[#d8e3eb] bg-[#081a41]">
                <Image src={demo.image} alt={demo.alt} fill sizes="(min-width: 1280px) 588px, (min-width: 768px) 46vw, 92vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.035] motion-reduce:transition-none" />

                <span className="absolute bottom-4 right-4 flex min-h-11 items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-white/40 bg-[#082b40]/85 text-white backdrop-blur-sm"><Play size={16} fill="currentColor" aria-hidden="true" /><span>{demo.cta}</span></span>
              </Link>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#567084]"><demo.icon size={15} aria-hidden="true" />{demo.scale}</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-[1.75rem]">{demo.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#52677a]">{demo.body}</p>
                <ul className="mb-6 mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#38566b]">
                  {demo.tags.map((tag) => <li key={tag} className="border-l-2 border-[#36c2d9] pl-2">{tag}</li>)}
                </ul>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-[#e5ecf1] pt-5">
                  <Link href={demo.href} className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#0d4a72] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#083450] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#007d98]">{demo.cta}<ArrowRight size={16} aria-hidden="true" /></Link>
                  <span className="text-xs text-[#647b8d]">{demo.language}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
