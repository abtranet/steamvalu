"use client";

import Image from "next/image";
import { ChevronRightIcon } from "@/components/sites/steam-value/shared/icons";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";

const CASES = [
  {
    image: "/images/use-case-asset-reliability.jpg",
    alt: "Fiabilité des actifs",
    title: "Fiabilité des actifs",
    text: "Relier vibration, température, pression et historique pour comprendre l’effet d’un écart sur l’ensemble du système.",
    linkText: "Fiabilité des actifs",
    href: "/demo",
  },
  {
    image: "/images/use-case-process-performance.jpg",
    alt: "Performance du procédé",
    title: "Performance du procédé",
    text: "Mettre en regard la santé des équipements, les zones de production et les indicateurs du processus dans une lecture commune.",
    linkText: "Performance du procédé",
    href: "/monitor-production",
  },
  {
    image: "/images/use-case-multi-level-composition.jpg",
    alt: "Composition multi-niveaux",
    title: "Composition multi-niveaux",
    text: "Assembler des jumeaux d’équipement, de zone et d’usine sans perdre leur identité ni leurs relations.",
    linkText: "Composition multi-niveaux",
    href: "/features#architecture",
  },
];

const CASES_EN = [
  {
    image: "/images/use-case-asset-reliability.jpg",
    alt: "Asset reliability",
    title: "Asset reliability",
    text: "Connect vibration, temperature, pressure, and history to understand how a deviation affects the entire system.",
    linkText: "Asset reliability",
    href: "/demo",
  },
  {
    image: "/images/use-case-process-performance.jpg",
    alt: "Process performance",
    title: "Process performance",
    text: "Bring equipment health, production zones, and process indicators together in one shared view.",
    linkText: "Process performance",
    href: "/monitor-production",
  },
  {
    image: "/images/use-case-multi-level-composition.jpg",
    alt: "Multi-level composition",
    title: "Multi-level composition",
    text: "Assemble equipment, zone, and plant twins without losing their identity or relationships.",
    linkText: "Multi-level composition",
    href: "/features#architecture",
  },
];

export function UseCases() {
  const { language } = useLanguage();
  const cases = language === "fr" ? CASES : CASES_EN;
  return (
    <section className="sv-use-cases bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1132px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <h2 className="mb-4 text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
            {language === "fr" ? "Cas d’usage" : "Use cases"}
          </h2>
          <p className="text-foreground/60">
            {language === "fr"
              ? "Le parcours recommandé reste volontairement pragmatique : un périmètre représentatif, une référence de départ, puis une décision d’extension fondée sur les résultats du pilote."
              : "The recommended path remains deliberately pragmatic: a representative scope, a baseline, then a decision to expand based on pilot results."}
          </p>
        </div>

        <div className="sv-use-case-grid mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {cases.map((item) => (
            <div key={item.href} className="flex flex-col gap-6 sm:flex-row">
              <a
                href={item.href}
                className="block h-[220px] w-full flex-none overflow-hidden rounded-xl sm:h-[180px] sm:w-[180px] shadow-sm"
              >
                <Image
                  width={600}
                  height={600}
                  src={item.image}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </a>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="text-foreground/60">{item.text}</p>
                <a
                  href={item.href}
                  className="mt-1 inline-flex items-center gap-2 text-foreground transition hover:opacity-70"
                >
                  <span>{item.linkText}</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="sv-use-case-story mt-20 max-w-[760px] md:mt-24">
          <h2 className="mb-4 text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
            {language === "fr" ? "Commencer par un système. Étendre avec des preuves." : "Start with one system. Expand with evidence."}
          </h2>
          <div className="flex flex-col gap-4 text-foreground/60">
            <p>
            {language === "fr" ? "STEAM VALUE™ compose les jumeaux de vos équipements, rassemble les données opérationnelles et révèle la santé globale de votre système sans remplacer vos outils existants." : "STEAM VALUE™ composes your equipment twins, brings operational data together, and reveals the overall health of your system without replacing your existing tools."}
          </p>
            <p>
            {language === "fr" ? "La plateforme est conçue comme une couche de composition au-dessus des environnements industriels existants. Chaque jumeau reste identifiable, puis contribue à une lecture système." : "The platform is designed as a composition layer over existing industrial environments. Each twin remains identifiable, then contributes to a system-level view."}
          </p>
          </div>
          <h3 className="mt-8 mb-4 text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
            {language === "fr" ? "Observer, contextualiser, composer, agir" : "Observe, contextualize, compose, act"}
          </h3>
          <div className="flex flex-col gap-4 text-foreground/60">
            <p>
            {language === "fr" ? "Pression, vibration, température, débit et état des actifs deviennent lisibles ensemble, avec leur contexte opérationnel." : "Pressure, vibration, temperature, flow, and asset health become readable together, with their operational context."}
          </p>
            <p>
            {language === "fr" ? "Le registre conserve l’identité, les relations, les sources et l’historique de chaque jumeau au lieu d’isoler les données dans des silos." : "The registry preserves each twin’s identity, relationships, sources, and history instead of isolating data in silos."}
          </p>
            <p>
            {language === "fr" ? "Les jumeaux unitaires alimentent les jumeaux de zone, puis une vue composée de l’usine qui révèle les effets en cascade." : "Individual twins feed zone twins, then a composed plant view that reveals cascading effects."}
          </p>
            <p>
            {language === "fr" ? "Seuils, tendances, événements et recommandations aident les équipes à examiner le bon actif avant que la situation ne se propage." : "Thresholds, trends, events, and recommendations help teams examine the right asset before the situation spreads."}
          </p>
          </div>
        </div>
      </div>
    </section>
  );
}
