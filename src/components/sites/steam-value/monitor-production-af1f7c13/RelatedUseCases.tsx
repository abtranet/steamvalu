import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@/components/sites/steam-value/shared/icons";
import { PLANT_3D_HREF } from "@/components/palm-oil/view";

const CASES = [
  {
    "image": "/images/use-case-asset-reliability.jpg",
    "alt": "Fiabilité des actifs",
    "title": "Fiabilité des actifs",
    "description": "Relier vibration, température, pression et historique pour comprendre l’effet d’un écart sur l’ensemble du système.",
    "href": PLANT_3D_HREF,
    "cta": "Ouvrir l’usine en 3D"
  },
  {
    "image": "/images/use-case-multi-level-composition.jpg",
    "alt": "Composition multi-niveaux",
    "title": "Composition multi-niveaux",
    "description": "Assembler des jumeaux d’équipement, de zone et d’usine sans perdre leur identité ni leurs relations.",
    "href": "/features#architecture",
    "cta": "Comprendre l’architecture"
  }
];

export function RelatedUseCases() {
  return (
    <section className="sv-related pt-0 pb-[120px]">
      <div className="mx-auto max-w-[1132px] px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {CASES.map((item) => (
            <div key={item.href} className="flex items-center gap-6">
              <Link
                href={item.href}
                aria-label={item.title}
                className="block shrink-0 overflow-hidden"
              >
                
                <Image width={1200} height={800}
                  src={item.image}
                  alt={item.alt}
                  className="h-40 w-40 object-cover transition-opacity duration-200 hover:opacity-90 sm:h-[210px] sm:w-[210px]"
                />
              </Link>
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl font-medium text-black">
                  {item.title}
                </h3>
                <p className="text-lg leading-snug text-black">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="group mt-1 inline-flex items-center gap-1 text-[15px] text-black transition-all duration-200 hover:gap-2 hover:underline"
                >
                  {item.cta}
                  <ChevronRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
