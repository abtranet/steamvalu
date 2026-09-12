"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/sites/steam-value/shared/icons";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";

const SLIDES = {
  fr: [
  {
    "quote": "Choisir un système représentatif et documenter les sources, les actifs et les objectifs.",
    "author": "01 · Auditer"
  },
  {
    "quote": "Construire les jumeaux unitaires, leurs relations et une première vue composée.",
    "author": "02 · Prototyper"
  },
  {
    "quote": "Comparer le fonctionnement observé à une référence de départ et qualifier la valeur.",
    "author": "03 · Valider"
  },
  {
    "quote": "Déployer par ligne, zone ou site seulement lorsque les preuves soutiennent la décision.",
    "author": "04 · Étendre"
  }
  ],
  en: [
    { quote: "Choose a representative system and document the sources, assets, and objectives.", author: "01 · Audit" },
    { quote: "Build the individual twins, their relationships, and an initial composed view.", author: "02 · Prototype" },
    { quote: "Compare observed operation with a baseline and qualify the value.", author: "03 · Validate" },
    { quote: "Deploy by line, zone, or site only when the evidence supports the decision.", author: "04 · Expand" },
  ],
} as const;

export function Rollout() {
  const { language } = useLanguage();
  const slides = SLIDES[language];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <section className="sv-rollout bg-black py-10 text-white md:py-16">
      <div className="mx-auto max-w-[1132px] px-6 md:px-10">
        <h2 className="mb-8 text-center text-[28px] leading-[1.2] font-bold tracking-[-0.03em] md:mb-10 md:text-[42px]">
          {language === "fr" ? "Une trajectoire maîtrisée" : "A controlled path"}
        </h2>

        <div className="flex items-center justify-center gap-4 md:gap-8">
          <button
            type="button"
            aria-label={language === "fr" ? "Étape précédente" : "Previous step"}
            onClick={prev}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <ChevronRightIcon className="h-3.5 w-3.5 rotate-180" />
          </button>

          <div className="relative min-h-[180px] w-full max-w-[640px] md:min-h-[100px]">
            {slides.map((slide, i) => (
              <div
                key={slide.author}
                aria-hidden={i !== index}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center gap-2 text-center transition-opacity duration-300",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <p className="text-base leading-snug text-white/90 md:text-xl">
                  {slide.quote}
                </p>
                <p className="text-xs font-medium tracking-wide text-white/50 md:text-sm">
                  {slide.author}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label={language === "fr" ? "Étape suivante" : "Next step"}
            onClick={next}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
