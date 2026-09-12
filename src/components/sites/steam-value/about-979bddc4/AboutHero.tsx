import { gradientText } from "./gradientText";

export function AboutHero() {
  return (
    <section className="sv-page-intro sv-about-intro pt-56 pb-[102px] md:pb-32 lg:pt-[220px] lg:pb-[170px]">
      <div className="mx-auto max-w-full px-6 text-center lg:max-w-[460px]">
        <p className="mb-3 text-lg text-[#4d4d4d]">
            DÉMONSTRATEUR TECHNOLOGIQUE
          </p>
        <h1
          className={`text-[32px] leading-[1.2] font-bold tracking-[-0.04em] sm:text-[56px] ${gradientText}`}
        >
          {/* Keep the product name intact: balanced wrapping split it as
              "STEAM / VALUE™ V3.1" at phone widths. */}
          <span className="whitespace-nowrap">STEAM VALUE™</span>{" "}
          <strong className="font-bold">
            V3.1
          </strong>
        </h1>
      </div>
    </section>
  );
}
