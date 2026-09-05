"use client";

import { useEffect, useRef, useState } from "react";
import { gradientText } from "./gradientText";

// Spec: docs/research/twinzo-com-ca6666c1/about-979bddc4/components/HistoryTimeline.spec.md
// Behavior: docs/research/twinzo-com-ca6666c1/about-979bddc4/BEHAVIORS.md (section 1)
//
// Reproduces the source site's GSAP ScrollTrigger horizontal-scroll timeline
// (scrub: 1, pinned via CSS position:sticky) without adding a gsap
// dependency: a tall "wall" wrapper provides the scroll runway, an inner
// section is `position: sticky; top: 0` to create the pin, and a
// scroll-position-driven, rAF-smoothed translateX moves the row — matching
// the original's easing feel via a simple lerp instead of GSAP's scrub.

type Milestone = {
  year: string;
  label: string;
  description: string;
};

const milestones: Milestone[] = [
  {
    year: "1999",
    label: "INFOTECH establishment",
    description: "Infotech has been established as a bespoke software house.",
  },
  {
    year: "2014",
    label: "Start of RTLS project",
    description:
      "Creation of a new department to create the first product focused on indoor positioning and RTLS.",
  },
  {
    year: "2015",
    label: "First pilots",
    description:
      "The first pilots for the technology were in the manufacturing and hospitality field. Manufacturing proved to be the best fit.",
  },
  {
    year: "2017",
    label: "First customer",
    description:
      "Whirlpool Corporation became the first important customer of our technology.",
  },
  {
    year: "2019",
    label: "Twinzo is born",
    description:
      "Product rebranding and increased focus on 3D live digital twin software as a platform.",
  },
  {
    year: "2021",
    label: "Going public!",
    description:
      "Following our main purpose, to make expert systems accessible for almost anyone, our digital twin platform became publicly accessible for almost any smartphone, making real-time logistics, material ordering, and operational insights more intuitive than ever.",
  },
  {
    year: "2022",
    label: "5.0 Technologies",
    description:
      "Driving digital twin trends, twinzo even accelerated its journey as an independent business.",
  },
  {
    year: "2023",
    label: "Investment announcement",
    description:
      "Consortium of Critical Ventures, Venture to Future Fund, Soulmates Ventures and Depo Ventures invested in twinzo, recognizing its game-changing potential in smart manufacturing and beyond.",
  },
  {
    year: "2024",
    label: "Do-it-yourself platform",
    description:
      "Launch of DIY digital twin platform for all digital twin enthusiasts. Upload your 3D model, connect to live data, and see invisible.",
  },
];

const MOBILE_QUERY = "(max-width: 991px)";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function HistoryTimeline() {
  const wallRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const wall = wallRef.current;
    const row = rowRef.current;
    if (!wall || !row) return;

    let moveDistance = 0;
    let target = 0;
    let current = 0;
    let rafId = 0;

    function measure() {
      if (!wall || !row) return;
      const rowWidth = row.scrollWidth;
      moveDistance = Math.max(rowWidth - window.innerWidth, 0);
      wall.style.minHeight = `${Math.max(window.innerHeight * 2, rowWidth)}px`;
    }

    function onScroll() {
      if (!wall) return;
      const rect = wall.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;
      target = -progress * moveDistance;
    }

    function tick() {
      current += (target - current) * 0.15;
      if (row) row.style.transform = `translate3d(${current}px, 0, 0)`;
      rafId = requestAnimationFrame(tick);
    }

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafId);
      if (row) row.style.transform = "";
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="px-6 py-16">
        <div className="mx-auto flex max-w-[600px] flex-col gap-16">
          {milestones.map((milestone) => (
            <TimelineItem key={milestone.year} milestone={milestone} mobile />
          ))}
        </div>
      </section>
    );
  }

  return (
    <div ref={wallRef} className="relative w-full" style={{ minHeight: "200vh" }}>
      <section className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div
          ref={rowRef}
          className="relative flex will-change-transform"
          style={{
            paddingLeft: "calc(50vw - 23.5rem)",
            paddingRight: "calc(50vw - 23.5rem)",
          }}
        >
          <div className="pointer-events-none absolute top-3 right-0 left-0 h-px bg-white/70" />
          {milestones.map((milestone) => (
            <TimelineItem key={milestone.year} milestone={milestone} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TimelineItem({
  milestone,
  mobile,
}: {
  milestone: Milestone;
  mobile?: boolean;
}) {
  return (
    <div
      className={
        mobile
          ? "flex flex-col items-center text-center"
          : "flex w-[320px] shrink-0 flex-col items-center px-8 text-center sm:w-[360px] lg:w-[470px] lg:px-[70px]"
      }
    >
      <div className="relative z-10 mb-16 h-6 w-6 shrink-0 rounded-full bg-brand" />
      <p
        className={`mb-[76.8px] text-[48px] leading-[0.8] font-bold tracking-[-2px] lg:text-[100px] ${gradientText}`}
      >
        {milestone.year}
      </p>
      <p className="mb-[25.6px] text-sm text-[#b2b2b2]">{milestone.label}</p>
      <p className={gradientText}>{milestone.description}</p>
    </div>
  );
}
