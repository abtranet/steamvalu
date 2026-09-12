"use client";

import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { BOOK_DEMO_URL, TRY_FREE_URL } from "./constants";

export function GetInControlCta() {
  const { language } = useLanguage();
  const copy = language === "fr" ? {
    title: "Entrez dans le jumeau. Testez le système.",
    body: "Suivez un défaut simulé depuis le signal d’un équipement jusqu’à la santé de la zone et de l’usine composée.",
    platform: "Découvrir la plateforme",
    demo: "Explorer le démonstrateur",
  } : {
    title: "Step into the twin. Test the system.",
    body: "Follow a simulated fault from an equipment signal to the health of the zone and the composed plant.",
    platform: "Discover the platform",
    demo: "Explore the demonstrator",
  };
  return (
    <section className="sv-closing-cta bg-white py-12 md:py-32">
      <div className="mx-auto flex max-w-[500px] flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground md:text-[56px]">
            {copy.title}
          </h2>
        <p className="text-foreground/60">
            {copy.body}
          </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={TRY_FREE_URL}
            
            className="rounded-full border border-black/15 bg-white px-6 py-4 text-[15px] font-medium text-black transition hover:border-black/30"
          >
            {copy.platform}
          </a>
          <a
            href={BOOK_DEMO_URL}
            
            className="rounded-full bg-brand px-6 py-4 text-[15px] font-medium text-brand-foreground"
          >
            {copy.demo}
          </a>
        </div>
      </div>
    </section>
  );
}
