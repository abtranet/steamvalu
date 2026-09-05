"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ASSET_BASE } from "./constants";

export function TypesSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
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

  return (
    <section className="bg-white">
      <div ref={wrapperRef} className="relative h-[180vh]">
        <div className="sticky top-[108px] flex h-[calc(100vh-108px)] flex-col items-center justify-center gap-8 px-6 text-center">
          <h2 className="relative h-[1.2em] w-full text-[32px] leading-[1.2] font-bold tracking-[-0.04em] text-foreground md:text-[56px]">
            <span
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                showWarehouse ? "opacity-0" : "opacity-100",
              )}
            >
              Your factory
            </span>
            <span
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                showWarehouse ? "opacity-100" : "opacity-0",
              )}
            >
              Your warehouse
            </span>
          </h2>

          <div className="relative aspect-[896/1818] h-[50vh] max-h-[520px] w-auto">
            <img
              src={`${ASSET_BASE}/images/phone-mockup.png`}
              alt="factory and warehouse digital twin on a smartphone"
              className="relative z-[5] h-full w-full object-contain"
            />
            <div className="absolute inset-[1%_2%] z-[4] overflow-hidden rounded-[9%]">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={`${ASSET_BASE}/images/poster-factory.jpg`}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  showWarehouse ? "opacity-0" : "opacity-100",
                )}
              >
                <source src={`${ASSET_BASE}/videos/factory.mp4`} type="video/mp4" />
              </video>
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={`${ASSET_BASE}/images/poster-warehouse.jpg`}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
                  showWarehouse ? "opacity-100" : "opacity-0",
                )}
              >
                <source src={`${ASSET_BASE}/videos/warehouse.mp4`} type="video/mp4" />
              </video>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[60%] bg-gradient-to-b from-white/0 to-white" />
          </div>
        </div>
      </div>

      <div className="px-6 pt-4 pb-24 text-center md:pb-32">
        <h2 className="text-[32px] leading-[1.2] font-bold tracking-[-0.04em] text-foreground md:text-[56px]">
          In your pocket
        </h2>
      </div>
    </section>
  );
}
