import { CheckIcon } from "@/components/sites/steamvalu/shared/icons";

interface FeatureCard {
  title: string;
  items: string[];
  align: "top" | "bottom";
  /** Fully-literal Tailwind class strings so the JIT scanner can find them. */
  bgClasses: string;
}

const CARDS: FeatureCard[] = [
  {
    title: "Logistics analysis",
    items: [
      "Real-time logistics monitoring",
      "Spaghetti charts with a player",
      "Heatmaps",
      "No-go zones to optimize workflow",
      "Deep-dive analysis on the web",
    ],
    align: "bottom",
    bgClasses:
      "bg-top bg-[url('/sites/steamvalu/features-de335934/images/card-bg-2-re.jpg')] sm:bg-[url('/sites/steamvalu/features-de335934/images/card-bg-2.jpg')]",
  },
  {
    title: "Data analysis",
    items: [
      "Deep-dive analysis on the web",
      "KPIs / OEEs tracking for smart manufacturing",
      "Sensors and production data charts",
      "Customizable status visualisation",
      "Real-time notification watchdog",
    ],
    align: "top",
    bgClasses:
      "bg-bottom bg-[url('/sites/steamvalu/features-de335934/images/card-bg-1.jpg')]",
  },
  {
    title: "Logistics management",
    items: [
      "Material ordering",
      "Avoid micro-stoppages",
      "Order processing analysis",
      "No need for integration",
    ],
    align: "top",
    bgClasses:
      "bg-bottom bg-[url('/sites/steamvalu/features-de335934/images/card-bg-3.jpg')]",
  },
  {
    title: "Multiplatform support",
    items: ["Multi-site support", "Cloud or on-premise deployment", "iOS", "Android", "Windows"],
    align: "bottom",
    bgClasses:
      "bg-top bg-[url('/sites/steamvalu/features-de335934/images/card-bg-4-re.jpg')] sm:bg-[url('/sites/steamvalu/features-de335934/images/card-bg-4.jpg')]",
  },
];

export function FeatureCardsGrid() {
  return (
    <section className="py-6 lg:py-2">
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
      className={`flex min-h-[560px] w-full flex-col items-center rounded-3xl bg-black bg-no-repeat px-0 py-[80px] text-white bg-[length:180%_auto] sm:min-h-[700px] sm:w-[calc(50%-4px)] sm:bg-[length:708px_auto] lg:min-h-[844px] lg:py-[120px] ${card.bgClasses} ${
        card.align === "bottom" ? "justify-end lg:pb-[140px]" : "justify-start"
      }`}
    >
      <div className="w-[90%] max-w-[448px]">
        <h2 className="mb-5 text-[26px] font-bold leading-[1.18] tracking-[-1.04px] lg:text-[32px] lg:leading-[37.76px] lg:tracking-[-1.28px]">
          {card.title}
        </h2>
        <ul className="flex flex-col gap-3">
          {card.items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <CheckIcon className="mt-[3px] size-4 shrink-0 text-brand" />
              <p className="text-[16px] leading-[1.22] tracking-[-0.64px] lg:text-[18px] lg:leading-[21.96px] lg:tracking-[-0.72px]">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
