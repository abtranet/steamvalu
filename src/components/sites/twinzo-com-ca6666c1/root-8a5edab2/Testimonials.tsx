"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "@/components/sites/twinzo-com-ca6666c1/shared/icons";

const SLIDES = [
  {
    quote:
      "“After the pilot phase, we performed installation throughout the entire plant. Twinzo has proved to be a flexible partner and has provided us with services that would not be possible to implement through manpower.”",
    author: "Igor Leskanic, Plastic Omnium Auto Exteriors",
  },
  {
    quote:
      "“IPS is one of the solutions that will, in our opinion, build the big future of facility management. Thanks to twinzo, we now have a flexible and reliable partner that managed to implement IPS solution based on our requirements. After offices in Bratislava, we will jointly implement IPS also in other branches.”",
    author: "Karol Michaliak, HB Reavis, Data & Application Teamleader",
  },
  {
    quote:
      "“The deployment of RTLS into the internal logistics process has helped us identify on-site locations from the perspective of technology and human resources.”",
    author: "Peter Pacek, Embraco, Warehousing & internal logistics leader",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % SLIDES.length);

  return (
    <section className="bg-black py-20 text-white md:py-32">
      <div className="mx-auto max-w-[1132px] px-6 md:px-10">
        <h2 className="mb-16 text-center text-[32px] leading-[1.2] font-bold tracking-[-0.04em] md:text-[56px]">
          Testimonials
        </h2>

        <div className="flex items-center justify-center gap-4 md:gap-10">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={prev}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <ChevronRightIcon className="h-4 w-4 rotate-180" />
          </button>

          <div className="relative min-h-[180px] w-full max-w-[700px]">
            {SLIDES.map((slide, i) => (
              <div
                key={slide.author}
                className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center gap-4 text-center transition-opacity duration-300",
                  i === index ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <p className="text-xl leading-snug text-white/90 md:text-2xl">
                  {slide.quote}
                </p>
                <p className="font-medium text-white/50">{slide.author}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={next}
            className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
          >
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
