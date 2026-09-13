"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ASSET_BASE, BOOK_DEMO_URL, TRY_FREE_URL } from "./constants";

const WORDS = ["Anytime", "Anywhere"];

export function Devices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={sectionRef} className="bg-black py-20 text-white md:py-32">
      <div className="mx-auto max-w-[1132px] px-6 md:px-10">
        <div className="relative mx-auto flex max-w-[700px] flex-col items-center">
          <div className="relative w-full">
            <Image
              src={`${ASSET_BASE}/images/macbook-device.png`}
              alt="SteamValu digital twin on a laptop"
              width={1823}
              height={1120}
              sizes="(max-width: 768px) 92vw, 700px"
              className="relative z-[2] w-full"
            />
            <div className="absolute inset-[2%_9%_8%_8%] z-[1] overflow-hidden">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={`${ASSET_BASE}/images/poster-manage.jpg`}
                className="h-full w-full object-cover"
              >
                <source src={`${ASSET_BASE}/videos/manage.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>
          <div className="relative -mt-[12%] z-[3] w-[40%] min-w-[140px]">
            <div className="relative aspect-[1136/560] w-full">
              <Image
                src={`${ASSET_BASE}/images/phone-mockup-horizontal.png`}
                alt="SteamValu logistics analytics on a phone"
                width={1819}
                height={897}
                sizes="(max-width: 768px) 37vw, 280px"
                className="relative z-[2] h-full w-full object-contain"
              />
              <div className="absolute inset-[2%] z-[2] overflow-hidden rounded-[9%]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={`${ASSET_BASE}/images/poster-manage.jpg`}
                  className="h-full w-full object-cover"
                >
                  <source src={`${ASSET_BASE}/videos/manage.mp4`} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mx-auto mt-8 flex max-w-[640px] flex-col items-center gap-6 text-center transition-opacity duration-700 md:mt-16",
            inView ? "opacity-100" : "opacity-0",
          )}
        >
          <h2 className="h-[1.2em] text-[32px] leading-[1.2] font-bold tracking-[-0.04em] md:text-[56px]">
            {WORDS[wordIndex]}
          </h2>
          <p className="text-white/70">
            Experience next-gen analytics in stunning 3D with our digital twin
            app. See your logistic data come to life with interactive
            heatmaps. Analyze RTLS localization data from multiple sources.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={TRY_FREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white px-6 py-4 text-[15px] font-medium text-black"
            >
              Try for free
            </a>
            <a
              href={BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-6 py-4 text-[15px] font-medium text-white transition hover:border-white/60"
            >
              Book Demo
            </a>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-white/20 pt-10 md:mt-16 md:grid-cols-2 md:pt-16">
          <div className="flex items-baseline gap-6">
            <p className="w-[7rem] flex-none text-[64px] font-bold text-white md:w-[13rem] md:text-[100px]">
              35%
            </p>
            <div>
              <p className="mb-2 font-medium">Time savings</p>
              <p className="text-white/50">
                Make decisions much faster thanks to real-time data.
              </p>
            </div>
          </div>
          <div className="flex items-baseline gap-6">
            <p className="w-[7rem] flex-none text-[64px] font-bold text-white md:w-[13rem] md:text-[100px]">
              3-8
            </p>
            <div>
              <p className="mb-2 font-medium">Months ROI</p>
              <p className="text-white/50">
                Direct insights leading to fast return of your invested
                money.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
