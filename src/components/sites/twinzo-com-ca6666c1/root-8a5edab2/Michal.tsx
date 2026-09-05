import { ChevronRightIcon } from "@/components/sites/twinzo-com-ca6666c1/shared/icons";
import { ASSET_BASE } from "./constants";

export function Michal() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-[1132px] grid-cols-1 gap-12 px-6 md:grid-cols-2 md:px-10">
        <div className="order-2 flex flex-col gap-8 md:order-1">
          <h2 className="text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground md:text-[56px]">
            Meet Michal
          </h2>
          <p className="text-foreground/60">
            An entrepreneur by heart. Keynote speaker. A sportsman. Doing
            business since the university, always on top of innovation.
            Previously in software development, now in the Industry 4.0
            field. Bringing digital twins to the world of smart
            manufacturing.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-baseline gap-6">
              <p className="w-[7rem] flex-none text-[64px] font-bold text-foreground md:w-[10rem] md:text-[80px]">
                100k+
              </p>
              <div>
                <p className="mb-2 font-medium text-foreground">Followers</p>
                <p className="text-foreground/60">
                  Michal is the #15 influencer in innovation worldwide.
                </p>
              </div>
            </div>
            <div className="flex items-baseline gap-6">
              <p className="w-[7rem] flex-none text-[64px] font-bold text-foreground md:w-[10rem] md:text-[80px]">
                25+
              </p>
              <div>
                <p className="mb-2 font-medium text-foreground">
                  Years of experience
                </p>
                <p className="text-foreground/60">
                  Ups and downs teach what has value and what does not. Get
                  in touch to find out more.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-6">
            <a
              href="/about"
              className="inline-flex items-center gap-2 text-foreground transition hover:opacity-70"
            >
              <span>About us</span>
              <ChevronRightIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/michalukropec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-foreground transition hover:opacity-70"
            >
              <span>Michal&apos;s LinkedIn</span>
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <img
            src={`${ASSET_BASE}/images/michal-ceo.jpg`}
            alt="Michal Ukropec"
            className="w-full rounded-3xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
