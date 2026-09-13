import Image from "next/image";
import { BOOK_DEMO_URL, TRY_FREE_URL } from "@/lib/site";
import { ASSET_BASE } from "./constants";

const CUSTOMER_LOGOS = [
  { src: "logo-skoda.svg", alt: "Skoda", width: 92 },
  { src: "logo-whirlpool.svg", alt: "Whirlpool", width: 89 },
  { src: "logo-benteler.svg", alt: "Benteler", width: 106 },
] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Visual half: full-bleed warehouse photo + floating phone mockup with looping product video */}
      <div className="relative order-1 h-[50vh] w-full overflow-hidden bg-black md:order-none md:h-auto md:w-1/2">
        <Image
          src={`${ASSET_BASE}/images/hero-bg.jpg`}
          alt="3D digital twin of a factory floor"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-50"
          preload
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-[560/1136] h-[64%] w-auto md:h-[72%]">
            <Image
              src={`${ASSET_BASE}/images/phone-mockup.png`}
              alt="SteamValu 3D digital twin on a smartphone"
              width={896}
              height={1818}
              sizes="(max-width: 768px) 40vw, 22vw"
              className="relative z-[5] h-full w-full object-contain"
              preload
            />
            <div className="absolute inset-[2%] z-[4] overflow-hidden rounded-[9%]">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster={`${ASSET_BASE}/images/hero-5-poster.jpg`}
                className="h-full w-full object-cover"
              >
                <source src={`${ASSET_BASE}/videos/hero-5.mp4`} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Content half */}
      <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-10 px-6 pt-[140px] pb-10 text-center md:w-1/2 md:px-12 md:pt-[108px] md:pb-16">
        <div className="flex max-w-[460px] flex-col items-center gap-4 md:gap-6">
          <h1 className="text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground md:text-[44px]">
            See your factory floor live in a 3D digital twin
          </h1>
          <p className="text-[18px] leading-[1.3] tracking-[-0.03em] text-foreground/70">
            Track forklifts, assets and people in real time. Plants running
            SteamValu cut a fifth of their forklift fleet within six months.
          </p>
          <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <a
              href={BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-brand px-7 py-4 text-[15px] font-semibold text-brand-foreground shadow-sm transition hover:brightness-95 sm:w-auto"
            >
              Book a free demo
            </a>
            <a
              href={TRY_FREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-black/15 px-7 py-4 text-[15px] font-medium text-black transition hover:border-black/40 sm:w-auto"
            >
              Start 30-day trial
            </a>
          </div>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4 md:gap-6">
          <p className="text-[15px] tracking-[-0.02em] text-foreground/40">
            Trusted on the floor at
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {CUSTOMER_LOGOS.map((logo) => (
              <li key={logo.alt}>
                <Image
                  src={`${ASSET_BASE}/images/${logo.src}`}
                  alt={logo.alt}
                  width={logo.width}
                  height={32}
                  unoptimized
                  className="h-6 w-auto object-contain opacity-70 md:h-8"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
