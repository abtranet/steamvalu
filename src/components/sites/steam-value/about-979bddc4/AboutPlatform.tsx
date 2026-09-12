import { ControlRoomDemo } from "./ControlRoomDemo";
import { gradientText } from "./gradientText";


export function AboutPlatform() {
  return (
    <section className="sv-about-platform px-2 sm:px-6">
      <div className="relative mx-auto flex w-full max-w-[1424px] flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-black pt-8 sm:pt-12">
        <div className="relative w-full max-w-[1100px] px-0 pb-4 sm:px-8 sm:pb-8">
          <ControlRoomDemo />
        </div>

        <div className="relative z-10 mx-6 flex w-[calc(100%-3rem)] flex-col gap-6 border-t border-white/15 py-6 sm:mx-0 sm:w-full sm:max-w-[1300px] sm:px-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-8">
          <p className="shrink-0 text-xl font-bold text-white md:text-2xl">
            Jumeau numérique industriel composé
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <StatBlock
              value="13"
              label="Jumeaux modélisés"
              description="Composition multi-niveaux"
            />
            <StatBlock
              value="4"
              label="Zones opérationnelles"
              description="Stérilisation, Pressage, Clarification, Énergie"
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
      <div className="flex flex-col items-start gap-1">
        <p className="text-lg font-medium text-white">{label}</p>
        <p className="text-sm text-[#b2b2b2]">{description}</p>
      </div>
    </div>
  );
}
