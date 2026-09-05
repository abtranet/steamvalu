"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/sites/twinzo-com-ca6666c1/shared/icons";
import { ASSET_BASE } from "./constants";

const STEPS = [
  {
    key: "see",
    label: "See",
    video: "see.mp4",
    poster: "poster-see.jpg",
    text: "Industry 4.0 in its essence. 24/7, all your data, available on any device, is visible under one roof. And in 3D. Smart manufacturing, data about logistics, production, quality, energy consumption, or environment.",
  },
  {
    key: "know",
    label: "Know",
    video: "know.mp4",
    poster: "poster-know.jpg",
    text: "Seeing is knowing. A real-time spatially oriented dataset within a digital twin software shows your data in a new, previously unknown context. You don't need to combine different data sources in an Excel table.",
  },
  {
    key: "manage",
    label: "Manage",
    video: "manage.mp4",
    poster: "poster-manage.jpg",
    text: "Recognize risks in time. twinzo's digital twin notification system lets you know about the coming dangers. Just set the parameter thresholds or special zones for your material ordering processes and act without delay.",
  },
];

function StepBadge({ index, active }: { index: number; active: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 transition-opacity duration-300",
        active ? "opacity-100" : "opacity-20",
      )}
    >
      <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
        {index + 1}
      </span>
      <span className="text-lg font-medium tracking-tight text-white uppercase lg:text-[32px]">
        {STEPS[index].label}
      </span>
    </div>
  );
}

function AllFeaturesLink() {
  return (
    <a
      href="/features"
      className="inline-flex items-center gap-2 text-white/70 transition hover:text-white"
    >
      <span>All features</span>
      <ChevronRightIcon className="h-4 w-4" />
    </a>
  );
}

export function StepsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    let triggerInstance: { kill: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !wrapperRef.current || !innerRef.current) return;
      gsap.registerPlugin(ScrollTrigger);

      triggerInstance = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: innerRef.current,
        pinSpacing: false,
        onUpdate: (self) => {
          const idx = Math.min(STEPS.length - 1, Math.floor(self.progress * STEPS.length));
          setActive(idx);
        },
      });
    })();

    return () => {
      cancelled = true;
      triggerInstance?.kill();
    };
  }, []);

  return (
    <section className="bg-black">
      {/* Desktop: pinned scroll-driven version */}
      <div ref={wrapperRef} className="relative hidden lg:block lg:h-[300vh]">
        <div
          ref={innerRef}
          className="flex h-screen w-full flex-col items-center justify-center gap-10 px-10 text-center"
        >
          <div className="flex items-center gap-8">
            {STEPS.map((step, i) => (
              <StepBadge key={step.key} index={i} active={i === active} />
            ))}
          </div>

          <div className="relative aspect-[1819/897] w-full max-w-[560px]">
            <img
              src={`${ASSET_BASE}/images/phone-mockup-horizontal.png`}
              alt="twinzo logistics analytics on a phone"
              className="relative z-[3] h-full w-full object-contain"
            />
            <div className="absolute inset-[1.5%] z-[2] overflow-hidden rounded-[9%] bg-black">
              {STEPS.map((step, i) => (
                <video
                  key={step.key}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`${ASSET_BASE}/images/${step.poster}`}
                  className={cn(
                    "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                >
                  <source src={`${ASSET_BASE}/videos/${step.video}`} type="video/mp4" />
                </video>
              ))}
            </div>
          </div>

          <p className="max-w-[720px] text-2xl leading-snug text-white/90">
            {STEPS[active].text}
          </p>

          <AllFeaturesLink />
        </div>
      </div>

      {/* Mobile/tablet: stacked, non-pinned fallback */}
      <div className="flex flex-col gap-16 px-6 py-16 lg:hidden">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex flex-col items-center gap-6 text-center">
            <StepBadge index={i} active />
            <div className="relative aspect-[1819/897] w-full max-w-[420px]">
              <img
                src={`${ASSET_BASE}/images/phone-mockup-horizontal.png`}
                alt="twinzo logistics analytics on a phone"
                className="relative z-[3] h-full w-full object-contain"
              />
              <div className="absolute inset-[1.5%] z-[2] overflow-hidden rounded-[9%] bg-black">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`${ASSET_BASE}/images/${step.poster}`}
                  className="h-full w-full object-cover"
                >
                  <source src={`${ASSET_BASE}/videos/${step.video}`} type="video/mp4" />
                </video>
              </div>
            </div>
            <p className="text-base leading-snug text-white/90">{step.text}</p>
            {i === STEPS.length - 1 && <AllFeaturesLink />}
          </div>
        ))}
      </div>
    </section>
  );
}
