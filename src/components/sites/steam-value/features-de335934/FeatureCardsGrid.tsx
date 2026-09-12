import Image from "next/image";
import { CheckIcon } from "@/components/sites/steam-value/shared/icons";

interface FeatureCard {
  title: string;
  items: string[];
  align: "top" | "bottom";
  image: string;
  imagePosition: "object-top" | "object-bottom";
}

const CARDS: FeatureCard[] = [
  {
    title: "Observer",
    items: [
      "Réunir les signaux critiques dans une seule vue.",
      "Pression, vibration, température, débit et état des actifs deviennent lisibles ensemble, avec leur contexte opérationnel."
    ],
    align: "bottom",
    image: "/images/feature-card-observer.jpg",
    imagePosition: "object-top"
  },
  {
    title: "Contextualiser",
    items: [
      "Relier chaque mesure au bon équipement et au bon processus.",
      "Le registre conserve l’identité, les relations, les sources et l’historique de chaque jumeau au lieu d’isoler les données dans des silos."
    ],
    align: "top",
    image: "/images/feature-card-contextualiser.jpg",
    imagePosition: "object-bottom"
  },
  {
    title: "Composer",
    items: [
      "Passer de l’état d’une machine à la santé du système.",
      "Les jumeaux unitaires alimentent les jumeaux de zone, puis une vue composée de l’usine qui révèle les effets en cascade."
    ],
    align: "bottom",
    image: "/images/feature-card-composer.jpg",
    imagePosition: "object-top"
  },
  {
    title: "Agir",
    items: [
      "Transformer les écarts en décisions traçables.",
      "Seuils, tendances, événements et recommandations aident les équipes à examiner le bon actif avant que la situation ne se propage."
    ],
    align: "top",
    image: "/images/feature-card-agir.jpg",
    imagePosition: "object-bottom"
  }
];

export function FeatureCardsGrid() {
  return (
    <section className="sv-feature-cards py-6 lg:py-2">
      <div className="mx-auto max-w-[1132px] px-4">
        <ul className="flex flex-wrap justify-center gap-2">
          {CARDS.map((card) => (
            <FeatureCardItem key={card.title} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeatureCardItem({ card }: { card: FeatureCard }) {
  return (
    <li
      className={`group relative flex min-h-[560px] w-full flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-black px-6 py-[60px] text-white sm:min-h-[700px] sm:w-[calc(50%-4px)] sm:py-[80px] lg:min-h-[844px] lg:py-[120px] ${
        card.align === "bottom" ? "justify-end lg:pb-[140px]" : "justify-start"
      }`}
    >
      <Image
        src={card.image}
        alt={card.title}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className={`pointer-events-none object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${card.imagePosition}`}
      />
      {/* Subtle vignette/gradient reinforcement to ensure flawless text contrast */}
      <div
        className={`pointer-events-none absolute inset-0 ${
          card.align === "bottom"
            ? "bg-gradient-to-t from-black via-black/80 to-transparent via-50%"
            : "bg-gradient-to-b from-black via-black/80 to-transparent via-50%"
        }`}
      />
      <div className="relative z-10 w-[90%] max-w-[448px]">
        <h2 className="mb-5 text-[26px] font-bold leading-[1.18] tracking-[-1.04px] lg:text-[32px] lg:leading-[37.76px] lg:tracking-[-1.28px]">
          {card.title}
        </h2>
        <ul className="flex flex-col gap-3">
          {card.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckIcon className="mt-[3px] size-4 shrink-0 text-brand" />
              <p className="text-[16px] leading-[1.22] tracking-[-0.64px] text-white/90 lg:text-[18px] lg:leading-[21.96px] lg:tracking-[-0.72px]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
