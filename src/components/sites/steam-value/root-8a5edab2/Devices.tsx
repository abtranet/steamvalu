"use client";

import Image from "next/image";
import { LaptopDemo } from "@/components/demos/LaptopDemo";
import { cn } from "@/lib/utils";
import { ProjectVideo } from "@/components/sites/steam-value/shared/ProjectVideo";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { ASSET_BASE, BOOK_DEMO_URL, TRY_FREE_URL } from "./constants";

const COPY = {
  fr: {
    words: ["Observer", "Comprendre", "Composer"],
    description: "Explorez le fonctionnement déjà implémenté : télémétrie, scénarios de défaut, propagation de la santé, registre, graphe de composition et usine 3D.",
    platformCta: "Découvrir la plateforme",
    demoCta: "Explorer le démonstrateur",
    timeTitle: "Gain de temps",
    timeBody: "Prenez des décisions beaucoup plus rapidement grâce aux données en temps réel.",
    roiTitle: "Mois de retour sur investissement",
    roiBody: "Des informations directes pour un retour rapide sur votre investissement.",
  },
  en: {
    words: ["Observe", "Understand", "Compose"],
    description: "Explore the implemented workflow: telemetry, fault scenarios, health propagation, registry, composition graph, and a 3D plant.",
    platformCta: "Discover the platform",
    demoCta: "Explore the demonstrator",
    timeTitle: "Time savings",
    timeBody: "Make decisions much faster thanks to real-time data.",
    roiTitle: "Months ROI",
    roiBody: "Direct insights leading to fast return of your invested money.",
  },
} as const;

function DeviceComposition({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[912px]" data-device-stage={mobile ? "mobile" : "desktop"}>
      <LaptopDemo />
      <div className={mobile ? "absolute top-[49%] left-1/2 z-[3] w-[54%] -translate-x-1/2" : "absolute top-[49%] left-1/2 z-[3] w-[54%] -translate-x-1/2"}>
        <div className="relative aspect-[1136/560] w-full">
          <Image
            width={1200}
            height={800}
            src={`${ASSET_BASE}/images/phone-mockup-horizontal.png`}
            alt="Jumeau numérique industriel composé STEAM VALUE"
            className="pointer-events-none relative z-[3] h-full w-full object-contain"
          />
          <div className="absolute inset-[2%] z-[2] overflow-hidden rounded-[9%]">
            <ProjectVideo />
          </div>
        </div>
      </div>
    </div>
  );
}

function DevicesCopy({ copy, wordIndex }: { copy: typeof COPY.fr | typeof COPY.en; wordIndex: number }) {
  return (
    <div className="mx-auto flex w-full max-w-[1332px] flex-col items-center px-6 text-center">
      <div className="flex max-w-[680px] flex-col items-center gap-5">
        <h2 className="min-h-[1.2em] text-[32px] leading-[1.2] font-bold tracking-[-0.04em] md:text-[44px] lg:text-[48px]">
          {copy.words[wordIndex]}
        </h2>
        <p className="text-[16px] leading-[1.65] text-white/70 md:text-[17px]">{copy.description}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <a href={TRY_FREE_URL} className="rounded-full bg-white px-6 py-4 text-[15px] font-medium text-black lg:px-5 lg:py-3 lg:text-[13px]">
            {copy.platformCta}
          </a>
          <a href={BOOK_DEMO_URL} className="rounded-full border border-white/30 px-6 py-4 text-[15px] font-medium text-white transition hover:border-white/60 lg:px-5 lg:py-3 lg:text-[13px]">
            {copy.demoCta}
          </a>
        </div>
      </div>

      <div data-device-metrics className="mt-10 grid w-full grid-cols-1 gap-8 border-t border-white/20 pt-8 text-left md:grid-cols-2 md:gap-9 lg:mt-6 lg:pt-6">
        <div className="grid grid-cols-[minmax(150px,306px)_1fr] items-start gap-7">
          <p className="text-[64px] leading-[0.8] font-bold text-white md:text-[76px] lg:text-[clamp(76px,6.45vw,113px)]">35%</p>
          <div>
            <p className="text-[clamp(20px,1.55vw,27px)] leading-none text-white">{copy.timeTitle}</p>
            <p className="mt-3 text-[clamp(16px,1.16vw,20px)] leading-[1.22] text-[#b2b2b2]">{copy.timeBody}</p>
          </div>
        </div>
        <div className="grid grid-cols-[minmax(150px,306px)_1fr] items-start gap-7">
          <p className="text-[64px] leading-[0.8] font-bold text-white md:text-[76px] lg:text-[clamp(76px,6.45vw,113px)]">3-8</p>
          <div>
            <p className="text-[clamp(20px,1.55vw,27px)] leading-none text-white">{copy.roiTitle}</p>
            <p className="mt-3 text-[clamp(16px,1.16vw,20px)] leading-[1.22] text-[#b2b2b2]">{copy.roiBody}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Devices() {
  const { language } = useLanguage();
  const copy = COPY[language];
  const sectionRef = useRef<HTMLElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const mobileCopyRef = useRef<HTMLDivElement>(null);
  const [wordIndex, setWordIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = window.setInterval(() => {
      setWordIndex((index) => (index + 1) % copy.words.length);
    }, 2500);
    return () => window.clearInterval(interval);
  }, [copy.words.length]);

  // Mobile (<lg): the laptop controls hang below the composition with absolute
  // positioning, and their height varies with width (wrapped buttons/caption).
  // Measure the real overflow so the copy below always clears them.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    const section = sectionRef.current;
    const copyBlock = mobileCopyRef.current;
    if (!mq.matches || !section || !copyBlock) return;
    const stage = section.querySelector<HTMLElement>("[data-device-stage='mobile']");
    const controls = stage?.querySelector<HTMLElement>("[data-laptop-controls]");
    if (!stage || !controls) return;
    const update = () => {
      if (!mq.matches) return;
      const overflow = controls.getBoundingClientRect().bottom - stage.getBoundingClientRect().bottom;
      copyBlock.style.marginTop = `${Math.max(0, Math.ceil(overflow)) + 48}px`;
    };
    update();
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (ro) {
      ro.observe(stage);
      ro.observe(controls);
    } else {
      window.addEventListener("resize", update);
    }
    mq.addEventListener("change", update);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
      copyBlock.style.marginTop = "";
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let cleanupAnimation: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !sectionRef.current || !compositionRef.current || !laptopRef.current || !phoneRef.current || !copyRef.current) return;

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(laptopRef.current, { yPercent: 40 });
        gsap.set(phoneRef.current, { top: "8.5%" });
        gsap.set(compositionRef.current, { xPercent: -50, yPercent: -50, autoAlpha: 1 });
        gsap.set(copyRef.current, { autoAlpha: 0, y: 80 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.3,
            invalidateOnRefresh: true,
          },
        });

        // The composition hands over to the copy, then the copy is held for the
        // rest of the scrub. Previously it only reached full opacity at
        // progress 1 — exactly when the sticky stage starts scrolling away —
        // so the statistics and both calls to action were never readable.
        timeline
          .to(laptopRef.current, { yPercent: 0, duration: 1, ease: "none" }, 0)
          .to(phoneRef.current, { top: "49%", duration: 1, ease: "none" }, 0)
          .to({}, { duration: 0.7 }, 1)
          .to(compositionRef.current, { yPercent: -160, autoAlpha: 0, duration: 0.65, ease: "none" }, 1.75)
          .to(copyRef.current, { autoAlpha: 1, y: 0, duration: 0.6, ease: "none" }, 2.4)
          .to({}, { duration: 1.1 }, 3);

        return () => timeline.kill();
      });

      media.add("(min-width: 1024px) and (prefers-reduced-motion: reduce)", () => {
        gsap.set(laptopRef.current, { yPercent: 0 });
        gsap.set(phoneRef.current, { top: "49%" });
        gsap.set(compositionRef.current, { xPercent: -50, yPercent: -72, autoAlpha: 0 });
        gsap.set(copyRef.current, { autoAlpha: 1, y: 0 });
      });

      cleanupAnimation = () => media.revert();
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      cleanupAnimation?.();
    };
  }, []);

  return (
    <section id="laptop-demos" ref={sectionRef} className="sv-devices relative z-20 bg-black text-white lg:h-[200dvh]">
      <div className="hidden h-[100dvh] overflow-hidden lg:sticky lg:top-0 lg:block">
        <div ref={compositionRef} data-device-composition className="pointer-events-none absolute top-1/2 left-1/2 w-full max-w-[912px]">
          <div ref={laptopRef} data-device-laptop className="relative w-full">
            <LaptopDemo interacting={interacting} onInteractingChange={setInteracting} />
          </div>
          <div ref={phoneRef} data-device-phone className={cn("absolute top-[8.5%] left-1/2 z-[3] w-[54%] -translate-x-1/2 transition-opacity duration-300 motion-reduce:transition-none", interacting ? "opacity-0" : "opacity-100")}>
            <div className="relative aspect-[1136/560] w-full">
              <Image width={1200} height={800} src={`${ASSET_BASE}/images/phone-mockup-horizontal.png`} alt="Jumeau numérique industriel composé STEAM VALUE" className="pointer-events-none relative z-[3] h-full w-full object-contain" />
              <div className="absolute inset-[2%] z-[2] overflow-hidden rounded-[9%]">
                <ProjectVideo />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center pt-[80px] pb-10">
          <div ref={copyRef} data-device-copy className="pointer-events-auto w-full">
            <DevicesCopy copy={copy} wordIndex={wordIndex} />
          </div>
        </div>
      </div>

      <div className="px-6 py-20 lg:hidden">
        <DeviceComposition mobile />
        <div ref={mobileCopyRef} className="mt-44">
          <DevicesCopy copy={copy} wordIndex={wordIndex} />
        </div>
      </div>
    </section>
  );
}
