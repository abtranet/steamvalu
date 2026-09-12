"use client";

import Image from "next/image";
import { ProjectVideo } from "@/components/sites/steam-value/shared/ProjectVideo";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/sites/steam-value/shared/LanguageProvider";

export function TypesSection() {
  const { language } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const [showWarehouse, setShowWarehouse] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      setShowWarehouse(progress > 0.5);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !wrapperRef.current || !deviceRef.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(deviceRef.current,
          { rotationY: -32, rotationX: 10, y: 48, scale: 0.86, transformPerspective: 1200 },
          {
            rotationY: 0, rotationX: 0, y: 0, scale: 1, ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 35%",
              end: "top -40%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        );
      });
      cleanup = () => media.revert();
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return (
    <section className="sv-types bg-white">
      <div ref={wrapperRef} className="relative h-[140vh] lg:h-[180vh]">
        <div className="sticky top-[108px] flex h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center lg:h-[calc(100vh-108px)] lg:gap-8">
          <h2 className="relative h-[1.2em] w-full text-[32px] leading-[1.2] font-bold tracking-[-0.04em] text-foreground md:text-[56px]">
            <span
              aria-hidden={showWarehouse}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                showWarehouse ? "opacity-0" : "opacity-100",
              )}
            >
            {language === "fr" ? "Vos équipements" : "Your equipment"}
          </span>
            <span
              aria-hidden={!showWarehouse}
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                showWarehouse ? "opacity-100" : "opacity-0",
              )}
            >
            {language === "fr" ? "Votre usine" : "Your plant"}
          </span>
          </h2>

          <div
            ref={deviceRef}
            aria-label={language === "fr" ? "Jumeau numérique STEAM VALUE sur iPad blanc" : "STEAM VALUE digital twin on a white iPad"}
            className="relative aspect-[4/3] w-full max-w-[min(1000px,78vh)] shrink-0 rounded-[2%/2.65%] border-2 border-[#cecece] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.12)]"
          >
            <div className="absolute inset-[1.6%_1.2%] overflow-hidden rounded-[0.7%/0.95%]">
              <ProjectVideo clip={showWarehouse ? "warehouse" : "factory"} />
              <Image
                src="/steam-value/images/ipad-hand.png"
                alt=""
                aria-hidden="true"
                width={1024}
                height={1536}
                sizes="(max-width: 768px) 45vw, 450px"
                className="pointer-events-none absolute right-[-4%] bottom-[-16%] z-[5] h-auto w-[46%] select-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 pb-16 text-center md:pb-32">
        <h2 className="text-[32px] leading-[1.2] font-bold tracking-[-0.04em] text-foreground md:text-[56px]">
            {language === "fr" ? "Une vue composée" : "A composed view"}
          </h2>
      </div>
    </section>
  );
}
