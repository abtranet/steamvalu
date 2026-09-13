"use client";

import Image from "next/image";
import { ProjectVideo } from "@/components/sites/steam-value/shared/ProjectVideo";
import { useEffect, useRef, useState } from "react";

import { ChevronRightIcon } from "@/components/sites/steam-value/shared/icons";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";
import { cn } from "@/lib/utils";
import { PLANT_3D_HREF } from "@/components/palm-oil/view";
import { openContact } from "@/lib/analytics";
import { ASSET_BASE } from "./constants";
import { WORKFLOW_STEPS } from "./workflow";

const HERO_COPY = {
  fr: {
    heading: "Voyez l’usine entière. Agissez sur chaque détail.",
    body: "Le jumeau numérique industriel qui compose vos équipements, rassemble les données opérationnelles et révèle la santé globale de l’usine, sans remplacer vos outils existants.",
    cta: "Explorer l’usine",
    compressorCta: "Inspecter le compresseur",
    expertCta: "Parler à un expert",
    allDemos: "Comparer les deux démos",
    allPlatform: "Toute la plateforme",
    tagline: "Une même lecture opérationnelle",
    audiences: ["Direction industrielle", "Production", "Maintenance & fiabilité", "IT / OT", "Pilotage multi-site"],
  },
  en: {
    heading: "See the entire plant. Act on every detail.",
    body: "The industrial digital twin that composes your equipment, brings operational data together, and reveals the overall health of the plant, without replacing your existing tools.",
    cta: "Explore the plant",
    compressorCta: "Inspect the compressor",
    expertCta: "Talk to an expert",
    allDemos: "Compare both demos",
    allPlatform: "The entire platform",
    tagline: "One shared operational view",
    audiences: ["Industrial leadership", "Production", "Maintenance & reliability", "IT / OT", "Multi-site operations"],
  },
} as const;

export function Hero() {
  const { language } = useLanguage();
  const copy = HERO_COPY[language];
  const wrapperRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [flipped, setFlipped] = useState(false);

  // Mobile (<lg): the GSAP scroll-driven flip is desktop-only, so flip the
  // phone once with a CSS transition when the visual scrolls into view.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px) and (prefers-reduced-motion: no-preference)");
    const visual = visualRef.current;
    const phone = phoneRef.current;
    if (!mq.matches || !visual || !phone) return;
    phone.style.transition = "transform 1.1s cubic-bezier(.22,1,.36,1)";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFlipped(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(visual);
    return () => {
      io.disconnect();
      phone.style.transition = "";
      phone.style.transform = "";
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
      if (
        cancelled ||
        !wrapperRef.current ||
        !visualRef.current ||
        !phoneRef.current ||
        !contentRef.current ||
        !overlayRef.current
      ) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const overlayProgress = Math.max(
                  0,
                  Math.min(0.999, (self.progress - 0.32) / 0.68),
                );
                setActiveStep(
                  Math.min(
                    WORKFLOW_STEPS.length - 1,
                    Math.floor(overlayProgress * WORKFLOW_STEPS.length),
                  ),
                );
              },
            },
          });

          timeline
            .to(
              visualRef.current,
              { width: "100%", duration: 1, ease: "none" },
              0,
            )
            .to(
              phoneRef.current,
              { rotation: -90, y: -40, duration: 1, ease: "none" },
              0,
            )
            .to(
              contentRef.current,
              { opacity: 0, yPercent: 20, duration: 1, ease: "none" },
              0,
            )
            .to(
              overlayRef.current,
              { autoAlpha: 1, duration: 0.25, ease: "none" },
              1,
            )
            .to(
              {},
              { duration: 2.2 },
            );

          return () => timeline.kill();
        },
      );

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: reduce)",
        () => {
          // Keep the introductory content and original media visible without scroll motion.
          gsap.set(wrapperRef.current, { height: "auto" });
        },
      );

      cleanupAnimation = () => media.revert();
      setTimeout(() => ScrollTrigger.refresh(), 150);
    })();

    return () => {
      cancelled = true;
      cleanupAnimation?.();
    };
  }, []);

  return (
    <>
    <section
      ref={wrapperRef}
      className="sv-hero relative z-10 min-h-[100dvh] bg-white lg:h-[220dvh]"
    >
      <div className="sv-hero-stage relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-white md:flex-row lg:sticky lg:top-0 lg:h-[100dvh]">
        {/* Visual half: full-bleed warehouse photo + floating phone mockup with looping product video */}
        <div
          ref={visualRef}
          data-hero-visual
          className="relative -order-1 h-[50vh] w-full flex-none overflow-hidden bg-black md:order-none md:h-auto md:w-1/2"
        >
          <Image
            priority
            fetchPriority="high"
            width={1200}
            height={800}
            src="/steam-value-industrial-hero.webp"
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Jumeau numérique industriel composé STEAM VALUE"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              ref={phoneRef}
              data-hero-phone
              data-flipped={flipped ? "true" : undefined}
              className="relative aspect-[560/1136] h-[83.2%] w-auto md:h-[93.6%] lg:h-[81.25%]"
              style={flipped ? { transform: "rotate(-90deg) scale(0.7)" } : undefined}
            >
              <Image
                width={1200}
                height={800}
                src={`${ASSET_BASE}/images/phone-mockup.png`}
                alt="Jumeau numérique industriel composé STEAM VALUE"
                className="pointer-events-none relative z-[5] h-full w-full object-contain"
              />
              <div className="absolute inset-[2%] z-[4] overflow-hidden rounded-[9%]">
                <ProjectVideo clip="hero-5" />
              </div>
            </div>
          </div>
        </div>

        <div
          ref={overlayRef}
          data-hero-overlay
          className="invisible pointer-events-none absolute inset-0 z-10 hidden flex-col items-center px-8 pt-[116px] pb-11 text-white opacity-0 lg:flex"
        >
          <ol
            data-hero-overlay-nav
            className="flex w-full max-w-[920px] items-center justify-center gap-6 xl:gap-9"
          >
            {WORKFLOW_STEPS.map((step, index) => (
              <li
                key={step.key}
                className={cn(
                  "flex items-center gap-3 transition-opacity duration-300",
                  activeStep === index ? "opacity-100" : "opacity-65",
                )}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm font-bold transition-colors duration-300",
                    activeStep === index
                      ? "bg-brand text-brand-foreground"
                      : "bg-brand/40 text-white",
                  )}
                >
                  {index + 1}
                </span>
                <span className="text-[clamp(18px,2vw,32px)] leading-none font-medium tracking-[-0.04em] uppercase">
                  {step.label[language]}
                </span>
              </li>
            ))}
          </ol>


        </div>

        {/* Content half */}
        <div
          ref={contentRef}
          data-hero-content
          className="relative flex w-full flex-1 flex-col items-center justify-center gap-10 px-6 pt-10 pb-10 text-center md:w-1/2 md:flex-none md:px-12 md:pt-[108px] md:pb-16"
        >
          <div className="flex max-w-[420px] flex-col items-center gap-4 md:gap-6">
            <p className="sv-eyebrow">{language === "fr" ? "Jumeaux numériques industriels" : "Industrial digital twins"}</p>
            <h1 className="text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
              {copy.heading}
            </h1>
            <p className="text-[18px] leading-[1.22] tracking-[-0.04em] text-foreground">
              {copy.body}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={PLANT_3D_HREF}
                data-cta="plant-3d"
                className="rounded-full bg-white px-6 py-4 text-[15px] font-medium text-black shadow-[0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 transition hover:ring-black/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d4a72]"
              >
                {copy.cta}
              </a>
              <a
                href="/demo/compressor"
                className="rounded-full bg-[#0d4a72] px-6 py-4 text-[15px] font-medium text-white transition hover:bg-[#083450] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d4a72]"
              >
                {copy.compressorCta}
              </a>
              <button
                type="button"
                onClick={() => openContact("hero")}
                className="rounded-full bg-[#00c0e8] px-6 py-4 text-[15px] font-semibold text-[#062330] transition hover:bg-[#00afd4] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d4a72] max-[639px]:min-h-[52px] max-[639px]:w-full"
              >
                {copy.expertCta}
              </button>
            </div>
            <a href="#demos" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-[#0d4a72] underline decoration-[#b5cad8] underline-offset-4 hover:decoration-[#0d4a72]">
              {copy.allDemos}<ChevronRightIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="sv-hero-audience mt-auto flex flex-col items-center gap-4 md:gap-6">
            <p className="text-[15px] tracking-[-0.02em] text-foreground/30">
              {copy.tagline}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/60">
              {copy.audiences.map((audience) => (
                <li key={audience}>{audience}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
          <div
            data-hero-workflow-copy
            className="relative z-20 flex min-h-[240px] flex-col items-center justify-center gap-8 bg-black px-6 py-12 text-center md:px-8 md:py-16"
          >
            <p
              key={WORKFLOW_STEPS[activeStep].key}
              className="max-w-[760px] animate-in fade-in slide-in-from-bottom-2 text-[clamp(24px,2.6vw,28px)] leading-[1.08] tracking-[-0.035em] text-white duration-300"
            >
              {WORKFLOW_STEPS[activeStep].text[language]}
            </p>
            <a
              href="/features"
              className="pointer-events-auto inline-flex items-center gap-2 text-[15px] text-white/60 transition hover:text-white"
            >
              {copy.allPlatform}
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </div>
    </>
  );
}
