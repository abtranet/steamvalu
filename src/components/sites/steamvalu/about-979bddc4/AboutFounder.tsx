import Image from "next/image";
import { gradientText } from "./gradientText";

const ASSET_BASE = "/sites/steamvalu/about-979bddc4/people";

// Spec: docs/research/steamvalu/about-979bddc4/components/AboutFounder.spec.md
export function AboutFounder() {
  return (
    <section className="px-6">
      <div className="relative mx-auto flex w-full max-w-[1424px] flex-col items-center overflow-hidden rounded-3xl bg-[#333] pt-16">
        <div className="relative aspect-square w-4/5 sm:w-[600px] sm:max-w-full">
          <Image
            src={`${ASSET_BASE}/michal-ukropec.jpg`}
            alt="Michal Ukropec"
            fill
            sizes="(max-width: 640px) 80vw, 600px"
            className="object-cover"
            priority
          />
        </div>

        <div className="relative -mt-24 mx-6 flex w-[calc(100%-3rem)] flex-col gap-6 border-t border-white/20 py-6 sm:mt-0 sm:mx-0 sm:absolute sm:inset-x-16 sm:bottom-0 sm:w-auto sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-10">
          <p className="shrink-0 text-2xl font-bold text-white">
            Michal Ukropec, CEO
          </p>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
            <StatBlock
              value="100k+"
              label="Followers"
              description="Michal is the #15 influencer in innovation worldwide."
            />
            <StatBlock
              value="25+"
              label="Years of experience"
              description="Ups and downs teach what has value and what does not. Get in touch to find out more."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  value,
  label,
  description,
}: {
  value: string;
  label: string;
  description: string;
}) {
  return (
    <div className="flex max-w-[450px] items-center gap-2 sm:gap-6">
      <p className={`text-[56px] leading-none font-bold ${gradientText}`}>
        {value}
      </p>
      <div className="flex flex-col items-start gap-2">
        <p className="text-lg text-white">{label}</p>
        <p className="text-sm text-[#b2b2b2]">{description}</p>
      </div>
    </div>
  );
}
