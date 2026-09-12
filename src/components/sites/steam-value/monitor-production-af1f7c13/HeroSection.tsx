import Image from "next/image";
import { ProjectVideo } from "@/components/sites/steam-value/shared/ProjectVideo";
export function HeroSection() {
  return (
    <section className="sv-process-hero relative pt-[110px] pb-[85px] md:pt-[160px] md:pb-[130px] lg:pt-[220px] lg:pb-[170px]">
      <div className="absolute inset-x-0 top-0 bottom-[85px] md:bottom-[130px] lg:bottom-[170px] rounded-3xl bg-black" />
      <div className="relative mx-auto max-w-[1132px] px-6">
        <div className="flex flex-col items-center gap-10 text-center lg:gap-14">
          <div className="flex max-w-3xl flex-col items-center gap-4">
            <p className="text-lg text-white/40">
            Cas d’usage
          </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[1.2] lg:tracking-[-0.04em]">
            Performance du procédé
          </h1>
            <p className="text-lg text-white sm:text-2xl sm:leading-[1.25]">
            Mettre en regard la santé des équipements, les zones de production et les indicateurs du processus dans une lecture commune.
          </p>
          </div>

          <div className="flex w-full flex-col items-center gap-14 lg:gap-14">
            <div className="relative aspect-[1136/560] w-full max-w-[670px] -mb-[20vw] lg:-mb-40">
              <div className="absolute inset-0">
                
                <Image width={1200} height={800}
                  src="/steam-value/images/phone-mockup-horizontal.png"
                  alt="Jumeau numérique industriel composé STEAM VALUE"
                  className="pointer-events-none absolute inset-0 z-[3] h-full w-full object-contain"
                />
                <div className="absolute inset-[1.5%] z-[2] overflow-hidden rounded-[9%] bg-black">
                  <div className="h-full w-full">
                    <ProjectVideo clip="factory" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
