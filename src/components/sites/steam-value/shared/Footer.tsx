"use client";

import { PLANT_3D_HREF } from "@/components/palm-oil/view";
import { SteamValueLogo } from "./icons";
import { useLanguage } from "./LanguageProvider";

const FOOTER_COPY = {
  fr: {
    columns: [
      { title: "Plateforme", links: [["Fonctionnement", "/features"], ["Architecture", "/features#architecture"], ["Cas d’usage", "/monitor-production"]] },
      { title: "STEAM VALUE™", links: [["À propos", "/about"], ["Ressources", "/blog"]] },
      { title: "Démonstrateur", links: [["Usine en 3D", PLANT_3D_HREF], ["Tableau de bord", "/demo"], ["Compresseur C-02", "/demo/compressor"]] },
    ],
    description: "Plateforme de composition de jumeaux numériques industriels, conçue pour compléter les systèmes existants et donner une lecture cohérente de l’opération.",
    standards: "Conçue en alignement avec la série ISO 23247 et ISO 23247-6:2026. Aucune certification ISO revendiquée.",
  },
  en: {
    columns: [
      { title: "Platform", links: [["How it works", "/features"], ["Architecture", "/features#architecture"], ["Use cases", "/monitor-production"]] },
      { title: "STEAM VALUE™", links: [["About", "/about"], ["Resources", "/blog"]] },
      { title: "Demonstrator", links: [["Plant in 3D", PLANT_3D_HREF], ["Dashboard", "/demo"], ["Compressor C-02", "/demo/compressor"]] },
    ],
    description: "An industrial digital-twin composition platform designed to complement existing systems and provide a coherent operational view.",
    standards: "Designed in alignment with the ISO 23247 series and ISO 23247-6:2026. No ISO certification is claimed.",
  },
} as const;

export function Footer() {
  const { language } = useLanguage();
  const copy = FOOTER_COPY[language];

  return (
    <footer className="site-footer bg-black py-[67px] pb-36 text-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <SteamValueLogo dark className="mb-12 h-[42px] w-auto" />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {copy.columns.map((column) => (
            <div key={column.title}>
              <p className="mb-3 text-lg font-medium text-white/50">{column.title}</p>
              <ul className="space-y-2.5">
                {column.links.map(([text, href]) => (
                  <li key={text}><a href={href} className="text-lg hover:opacity-80">{text}</a></li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-white/50">{copy.description}</p>
        </div>
        <div className="mt-16 grid gap-8 text-white/50 lg:grid-cols-[1fr_3fr]">
          <p>© 2026 GFID. STEAM VALUE™.</p>
          <p>{copy.standards}</p>
        </div>
      </div>
    </footer>
  );
}
