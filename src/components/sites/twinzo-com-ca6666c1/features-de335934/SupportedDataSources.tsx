import Link from "next/link";
import {
  CheckIcon,
  ChevronRightSmallIcon,
} from "@/components/sites/twinzo-com-ca6666c1/shared/icons";

interface Category {
  label: string;
  vendors: string[];
}

const CATEGORIES: Category[] = [
  { label: "UWB RTLS", vendors: ["Ubisense", "Unlimited Storage"] },
  { label: "RFID RTLS", vendors: ["RF - Controls", "Siements", "Zebra"] },
  { label: "BLE RTLS", vendors: ["Quuppa", "Zebra", "Twinzo proprietary"] },
  { label: "Man down solution", vendors: ["Quuppa", "Twinzo proprietary"] },
  { label: "Open source multiplatform middleware", vendors: [] },
  { label: "AI-based camera feed twinzo RTLS", vendors: [] },
];

export function SupportedDataSources() {
  return (
    <section className="py-8 lg:py-[120px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <div className="mb-10 flex flex-col gap-3 lg:mb-16">
          <h2 className="text-[26px] font-bold leading-[1.18] tracking-[-1.04px] lg:text-[32px] lg:leading-[37.76px] lg:tracking-[-1.28px]">
            Supported external
            <br />
            data sources
          </h2>
          <p className="text-[20px] leading-[1] tracking-[-0.8px] text-foreground/60 lg:text-[24px] lg:tracking-[-0.96px]">
            General API available for any data-source
          </p>
          <Link
            href="https://twinzo.atlassian.net/wiki/spaces/PUBD/pages/73170950/REST+API"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-[3px] text-[15px] font-medium tracking-[-0.6px] hover:opacity-70"
          >
            More about REST API
            <ChevronRightSmallIcon className="size-3" />
          </Link>
        </div>

        <div className="flex flex-col flex-wrap gap-6 sm:flex-row sm:justify-between lg:flex-nowrap lg:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.label}
              className="flex flex-col gap-6 sm:w-[calc(33%-16px)] lg:w-auto lg:shrink lg:basis-auto"
            >
              <p className="text-[18px] font-bold leading-[21.96px] tracking-[-0.72px]">
                {cat.label}
              </p>
              {cat.vendors.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {cat.vendors.map((vendor) => (
                    <li key={vendor} className="flex items-start gap-1">
                      <CheckIcon className="mt-[3px] size-4 shrink-0 text-foreground/50" />
                      <p className="text-[18px] leading-[21.96px] tracking-[-0.72px] text-foreground/50">
                        {vendor}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
