import { ASSET_BASE } from "./constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Visual half: full-bleed warehouse photo + floating phone mockup with looping product video */}
      <div className="relative order-1 h-[50vh] w-full overflow-hidden bg-black md:order-none md:h-auto md:w-1/2">
        <img
          src={`${ASSET_BASE}/images/hero-bg.jpg`}
          alt="3D digital twin of a factory floor"
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative aspect-[560/1136] h-[64%] w-auto md:h-[72%]">
            <img
              src={`${ASSET_BASE}/images/phone-mockup.png`}
              alt="twinzo 3D digital twin on a smartphone"
              className="relative z-[5] h-full w-full object-contain"
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
        <div className="flex max-w-[420px] flex-col items-center gap-4 md:gap-6">
          <h1 className="text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground">
            Cut 1/5 of your forklift fleet in 6 months, learn how
          </h1>
          <p className="text-[18px] leading-[1.22] tracking-[-0.04em] text-foreground">
            See forklift utilization in a live 3D digital twin so you can cut
            1/5 of your fleet in 6 months.
          </p>
          <a
            href="/get-whitepaper"
            className="rounded-full bg-white px-6 py-4 text-[15px] font-medium text-black shadow-[0_1px_2px_rgba(0,0,0,0.1)] ring-1 ring-black/10 transition hover:ring-black/20"
          >
            Download FREE whitepaper
          </a>
        </div>

        <div className="mt-auto flex flex-col items-center gap-4 md:gap-6">
          <p className="text-[15px] tracking-[-0.02em] text-foreground/30">
            Empowering
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <li>
              <img
                src={`${ASSET_BASE}/images/logo-skoda.svg`}
                alt="Skoda"
                className="h-6 w-auto object-contain opacity-70 md:h-8"
              />
            </li>
            <li>
              <img
                src={`${ASSET_BASE}/images/logo-whirlpool.svg`}
                alt="Whirlpool"
                className="h-6 w-auto object-contain opacity-70 md:h-8"
              />
            </li>
            <li>
              <img
                src={`${ASSET_BASE}/images/logo-benteler.svg`}
                alt="Benteler"
                className="h-6 w-auto object-contain opacity-70 md:h-8"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
