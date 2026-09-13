const STATS = [
  { value: "€10K", label: "totally invested" },
  { value: "2 wk.", label: "implementation process" },
  { value: "20%", label: "shorter breakdowns" },
] as const;

export function HeroSection() {
  return (
    <section className="relative pt-[110px] pb-[85px] md:pt-[160px] md:pb-[130px] lg:pt-[220px] lg:pb-[170px]">
      <div className="absolute inset-x-0 top-0 bottom-[85px] md:bottom-[130px] lg:bottom-[170px] rounded-3xl bg-black" />
      <div className="relative mx-auto max-w-[1132px] px-6">
        <div className="flex flex-col items-center gap-10 text-center lg:gap-14">
          <div className="flex max-w-3xl flex-col items-center gap-4">
            <p className="text-lg text-white/40">Use case</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[56px] lg:leading-[1.2] lg:tracking-[-0.04em]">
              Gemba, in 3D
            </h1>
            <p className="text-lg text-white sm:text-2xl sm:leading-[1.25]">
              Digital GEMBA 24/7 in your pocket. Organize your teams around
              interactive TV screens or evaluate latest notifications with
              ease in digital twin.
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-14 lg:gap-14">
            <ul className="flex w-full max-w-xl flex-col gap-8 sm:max-w-none sm:flex-row sm:justify-center sm:gap-10">
              {STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <p className="text-3xl font-bold text-white sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="text-lg text-white/50">{stat.label}</p>
                </li>
              ))}
            </ul>

            <div className="relative aspect-[1136/560] w-full max-w-[670px] -mb-[20vw] lg:-mb-40">
              <div className="absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/sites/steamvalu/monitor-production-af1f7c13/images/phone-mockup-horizontal.png"
                  alt="SteamValu logistics analytics on a phone"
                  className="absolute inset-0 z-[3] h-full w-full object-contain"
                />
                <div className="absolute inset-[1.5%] z-[2] overflow-hidden rounded-[9%] bg-black">
                  <div className="absolute left-1/2 top-1/2 h-[180%] w-[89%] -translate-x-1/2 -translate-y-1/2 max-sm:h-[200%]">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/ncxY4i55CME?autoplay=1&controls=0&fs=0&modestbranding=1&mute=1&rel=0&iv_load_policy=3&loop=1&playlist=ncxY4i55CME"
                      title="SteamValu digital twin demo"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
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
