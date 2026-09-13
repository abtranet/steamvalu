import Image from "next/image";
import { ChevronRightIcon } from "@/components/sites/steamvalu/shared/icons";
import { ASSET_BASE } from "./constants";

const CASES = [
  {
    image: "usecase-logistics-optimization.jpg",
    alt: "internal logistics optimization",
    title: "Logistics optimization",
    text: "RTLS (real-time location service) data show you logistics from a new perspective. Identify waste, utilize your fleet, and save.",
    linkText: "Logistics optimization",
    href: "/features",
  },
  {
    image: "usecase-production-monitoring.jpg",
    alt: "automated material ordering",
    title: "Logistics management",
    text: "Avoid production micro-stoppages via an Automated Ordering System (AOS). It's Uber, just for a factory.",
    linkText: "Logistics management",
    href: "/features",
  },
  {
    image: "usecase-order-automation.jpg",
    alt: "gemba walk in 3D",
    title: "Gemba, in 3D",
    text: "Have your Gemba Board 24/7 in your pocket. Production, quality, and logistics for all levels of command.",
    linkText: "Gemba in 3D",
    href: "/monitor-production",
  },
];

export function UseCases() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1132px] px-6 md:px-10">
        <div className="max-w-[680px]">
          <h2 className="mb-4 text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
            Use cases
          </h2>
          <p className="text-foreground/60">
            An operational digital twin has an endless list of use
            cases—the low-hanging fruit lies in logistics and process
            optimization. Connect your existing data sources, or use our
            RTLS (real-time location system), and gain real-time visibility
            of your factory&apos;s material ordering workflow.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {CASES.map((item) => (
            <div key={item.href} className="flex flex-col gap-6 sm:flex-row">
              <a
                href={item.href}
                className="block h-[220px] w-full flex-none overflow-hidden rounded-lg sm:h-[180px] sm:w-[180px]"
              >
                <Image
                  src={`${ASSET_BASE}/images/${item.image}`}
                  alt={item.alt}
                  width={424}
                  height={424}
                  sizes="(max-width: 640px) 92vw, 180px"
                  className="h-full w-full object-cover"
                />
              </a>
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-medium text-foreground">
                  {item.title}
                </h3>
                <p className="text-foreground/60">{item.text}</p>
                <a
                  href={item.href}
                  className="mt-1 inline-flex items-center gap-2 text-foreground transition hover:opacity-70"
                >
                  <span>{item.linkText}</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-[760px] md:mt-24">
          <h2 className="mb-4 text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
            Live 3D digital twin software for factories and warehouses
          </h2>
          <div className="flex flex-col gap-4 text-foreground/60">
            <p>
              SteamValu is a live 3D digital twin of your facility. It combines
              RTLS location data, IoT sensors, production KPIs, and material
              flow in one spatially accurate model that runs on phone,
              tablet, and desktop. Operations, logistics, and plant managers
              use it to see the shop floor in real time, find waste in
              internal transport, and act before micro-stoppages hit the
              line.
            </p>
            <p>
              Connect the systems you already run, or deploy SteamValu RTLS.
              Typical first use cases are forklift fleet utilization,
              automated material ordering, and a 3D Gemba board for
              production, quality, and logistics. Plants using live location
              and 3D context cut decision time with always-on data and reach
              ROI in 3–8 months.
            </p>
          </div>
          <h3 className="mt-8 mb-4 text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
            See, know, and manage in 3D — anytime, anywhere
          </h3>
          <div className="flex flex-col gap-4 text-foreground/60">
            <p>
              See: Industry 4.0 in its essence. 24/7, all your data,
              available on any device, is visible under one roof. And in 3D.
              Data about logistics, production, quality, energy consumption,
              or environment.
            </p>
            <p>
              Know: Seeing is knowing. A real-time spatially oriented
              dataset within a digital twin software shows your data in a
              new, previously unknown context. You don&apos;t need to
              combine different data sources in an Excel table.
            </p>
            <p>
              Manage: Recognize risks in time. SteamValu&apos;s digital twin
              notification system lets you know about the coming dangers.
              Just set the parameter thresholds or special zones for your
              material ordering processes and act without delay.
            </p>
            <p>
              Your factory and your warehouse, in your pocket — on phone,
              tablet, and desktop.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
