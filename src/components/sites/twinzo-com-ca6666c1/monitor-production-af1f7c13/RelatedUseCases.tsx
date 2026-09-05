import Link from "next/link";
import { ChevronRightIcon } from "@/components/sites/twinzo-com-ca6666c1/shared/icons";

const CASES = [
  {
    href: "/material-order-automation",
    image:
      "/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/images/production-monitoring.jpg",
    alt: "automated material ordering",
    title: "Logistics management",
    description:
      "Avoid production micro-stoppages via an Automated Ordering System (AOS). It's Uber, just for a factory.",
  },
  {
    href: "/optimize-internal-logistics",
    image:
      "/sites/twinzo-com-ca6666c1/monitor-production-af1f7c13/images/logistics-optimization.jpg",
    alt: "internal logistics optimization",
    title: "Logistics optimization",
    description:
      "RTLS (real-time location service) data show you logistics from a new perspective. Identify waste, utilize your fleet, and save.",
  },
] as const;

export function RelatedUseCases() {
  return (
    <section className="pt-0 pb-[120px]">
      <div className="mx-auto max-w-[1132px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {CASES.map((item) => (
            <div key={item.href} className="flex items-center gap-6">
              <Link
                href={item.href}
                aria-label={item.title}
                className="block shrink-0 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt}
                  className="h-40 w-40 object-cover transition-opacity duration-200 hover:opacity-90 sm:h-[210px] sm:w-[210px]"
                />
              </Link>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-black">
                  {item.title}
                </h3>
                <p className="text-lg leading-snug text-black">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="group mt-1 inline-flex items-center gap-1 text-[15px] text-black transition-all duration-200 hover:gap-2 hover:underline"
                >
                  {item.title}
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
