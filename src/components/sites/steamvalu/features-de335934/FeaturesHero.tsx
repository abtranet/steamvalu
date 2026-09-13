import { FeaturesGlyphIcon } from "./icons";

export function FeaturesHero() {
  return (
    <section className="pt-[140px] pb-[80px] text-center md:pt-[160px] lg:pt-[220px] lg:pb-[120px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-3.5">
            <FeaturesGlyphIcon className="size-12 shrink-0 lg:size-[60px]" />
            <h1 className="text-[40px] font-bold leading-[1.2] tracking-[-1.6px] text-foreground sm:text-[48px] lg:text-[56px] lg:leading-[67.2px] lg:tracking-[-2.24px]">
              Features
            </h1>
          </div>
          <p
            className="max-w-[640px] text-[20px] leading-[26px] tracking-[-0.8px] lg:text-[24px] lg:leading-[30px] lg:tracking-[-0.96px]"
            style={{
              backgroundImage: "linear-gradient(#333, #252525)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            A 3D digital twin app for real-time view. Detailed web analysis for a deep
            dive. And if something goes wrong, get notified.
          </p>
        </div>
      </div>
    </section>
  );
}
