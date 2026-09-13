import { gradientText } from "./gradientText";

// Spec: docs/research/steamvalu/about-979bddc4/components/AboutHero.spec.md
export function AboutHero() {
  return (
    <section className="pt-56 pb-[102px] md:pb-32 lg:pt-[220px] lg:pb-[170px]">
      <div className="mx-auto max-w-full px-6 text-center lg:max-w-[460px]">
        <p className="mb-3 text-lg text-[#4d4d4d]">Our Story</p>
        <h1
          className={`text-[32px] leading-[1.2] font-bold tracking-[-0.04em] sm:text-[56px] ${gradientText}`}
        >
          Our core value is <strong className="font-bold">innovation</strong>
        </h1>
      </div>
    </section>
  );
}
