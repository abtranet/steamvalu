"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, FlaskConical } from "lucide-react";
import { ControlRoomDemo } from "@/components/sites/steam-value/about-979bddc4/ControlRoomDemo";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { PLANT_3D_HREF } from "@/components/palm-oil/view";

export function CompressorDemo() {
  const { language } = useLanguage();
  const french = language === "fr";
  return (
    <main className="min-h-screen bg-[#f3f6f8] text-[#0d2b3a]">
      <header className="border-b border-[#d8e3eb] bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-3 sm:px-8 sm:py-4">
          <Link href="/#demos" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-[#007c98]"><ArrowLeft size={17} aria-hidden="true" />{french ? "Toutes les démos" : "All demos"}</Link>
          {/* On one row the three items wrapped into a lopsided two-row header:
              centre the wordmark above the two actions on narrow screens. */}
          <span className="order-first w-full text-center text-sm font-semibold tracking-wide sm:order-none sm:w-auto">STEAM VALUE™</span>
          <Link href={PLANT_3D_HREF} data-cta="plant-3d" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#0d4a72]">{french ? "Explorer l’usine" : "Explore the plant"}<ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </header>
      <div className="mx-auto max-w-[1600px] px-4 pb-8 pt-6 sm:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div><h1 className="text-2xl font-semibold tracking-tight">{french ? "Compresseur C-02" : "Compressor C-02"}</h1><p className="mt-2 max-w-3xl text-base leading-relaxed text-[#52677a]">{french ? "Essayez « High demand », puis « Optimized » pour comparer les indicateurs. Sélectionnez un composant pour l’inspecter." : "Try High demand, then Optimized to compare the readings. Select a component to inspect it."}</p></div>
          <p className="flex items-center gap-2 text-sm text-[#52677a]"><FlaskConical size={15} aria-hidden="true" />{french ? "Données simulées · Démo en anglais" : "Simulated data · Demo in English"}</p>
        </div>
        <ControlRoomDemo />
      </div>
    </main>
  );
}
