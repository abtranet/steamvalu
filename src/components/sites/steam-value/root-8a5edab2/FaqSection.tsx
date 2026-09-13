"use client";

import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { openContact } from "@/lib/analytics";
import { FAQ } from "./faq";

const COPY = {
  fr: { eyebrow: "Questions fréquentes", title: "Ce qu’il faut savoir avant de démarrer.", cta: "Parler à un expert" },
  en: { eyebrow: "Frequently asked questions", title: "What to know before you start.", cta: "Talk to an expert" },
} as const;

export function FaqSection() {
  const { language } = useLanguage();
  const copy = COPY[language];

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-[880px]">
        <p className="sv-eyebrow">{copy.eyebrow}</p>
        <h2 id="faq-title" className="mt-3 text-[32px] leading-[1.15] font-bold tracking-[-0.04em] text-foreground md:text-[44px]">
          {copy.title}
        </h2>
        <div className="mt-10 divide-y divide-[#d8e0e8] border-y border-[#d8e0e8]">
          {FAQ[language].map((item) => (
            <details key={item.question} className="group py-2">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-3 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[18px] leading-snug font-semibold tracking-[-0.02em] text-[#0d2b3a]">{item.question}</h3>
                <span aria-hidden="true" className="text-2xl leading-none text-[#0d4a72] transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
              </summary>
              <p className="max-w-[720px] pb-4 text-[16px] leading-relaxed text-[#475569]">{item.answer}</p>
            </details>
          ))}
        </div>
        <button
          type="button"
          onClick={() => openContact("faq")}
          className="mt-10 inline-flex min-h-12 items-center justify-center rounded-full bg-[#0d4a72] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#083450] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d4a72]"
        >
          {copy.cta}
        </button>
      </div>
    </section>
  );
}
