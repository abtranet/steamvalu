import { PLANT_3D_HREF } from "@/components/palm-oil/view";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Theme this entry belongs to, shown as an eyebrow above the title. */
  theme: string;
  image: string;
  imageAlt: string;
  href: string;
}

/**
 * The four entries mirror the four platform capabilities, so each one carries
 * its own capability visual and leads to the place where that capability can
 * actually be seen, rather than four identical cards pointing at one page.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "observer",
    title: "Réunir les signaux critiques dans une seule vue.",
    excerpt: "Pression, vibration, température, débit et état des actifs deviennent lisibles ensemble, avec leur contexte opérationnel.",
    theme: "Observer",
    image: "/images/feature-card-observer.jpg",
    imageAlt: "Opérateur observant les signaux d’une ligne de production",
    href: PLANT_3D_HREF,
  },
  {
    slug: "contextualiser",
    title: "Relier chaque mesure au bon équipement et au bon processus.",
    excerpt: "Le registre conserve l’identité, les relations, les sources et l’historique de chaque jumeau au lieu d’isoler les données dans des silos.",
    theme: "Contextualiser",
    image: "/images/feature-card-contextualiser.jpg",
    imageAlt: "Équipement industriel relié à son jumeau numérique",
    href: "/features",
  },
  {
    slug: "composer",
    title: "Passer de l’état d’une machine à la santé du système.",
    excerpt: "Les jumeaux unitaires alimentent les jumeaux de zone, puis une vue composée de l’usine qui révèle les effets en cascade.",
    theme: "Composer",
    image: "/images/feature-card-composer.jpg",
    imageAlt: "Techniciens sur une zone de production composée",
    href: "/features#architecture",
  },
  {
    slug: "agir",
    title: "Transformer les écarts en décisions traçables.",
    excerpt: "Seuils, tendances, événements et recommandations aident les équipes à examiner le bon actif avant que la situation ne se propage.",
    theme: "Agir",
    image: "/images/feature-card-agir.jpg",
    imageAlt: "Salle de contrôle industrielle en cours d’analyse",
    href: "/demo",
  },
];
