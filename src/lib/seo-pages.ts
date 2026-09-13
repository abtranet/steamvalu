/**
 * Search titles and descriptions for every indexable page, in French (the
 * site's indexed language). Kept free of runtime imports so tests can check
 * lengths directly: titles at most 60 characters, descriptions 150–160.
 */
export type PageSeo = {
  path: string;
  title: string;
  description: string;
  /** Label of the page in breadcrumb structured data. */
  breadcrumb: string;
  priority: number;
};

export const PAGE_SEO = {
  home: {
    path: "/",
    title: "Jumeau numérique industriel composé | STEAM VALUE™",
    description: "Composez les jumeaux numériques de vos équipements et suivez la santé de toute l’usine, sans remplacer vos outils. Explorez la démo 3D ou parlez à un expert.",
    breadcrumb: "Accueil",
    priority: 1,
  },
  features: {
    path: "/features",
    title: "Plateforme de jumeau numérique industriel | STEAM VALUE™",
    description: "Observer, contextualiser, composer, agir : STEAM VALUE™ relie équipements, données et procédés dans une vue système de l’usine. Découvrez la plateforme.",
    breadcrumb: "Plateforme",
    priority: 0.8,
  },
  monitorProduction: {
    path: "/monitor-production",
    title: "Performance du procédé industriel | STEAM VALUE™",
    description: "Reliez santé des équipements, zones de production et indicateurs du procédé dans une vue commune pour agir avant qu’un écart ne se propage. Voir la démo.",
    breadcrumb: "Performance du procédé",
    priority: 0.7,
  },
  about: {
    path: "/about",
    title: "À propos de STEAM VALUE™, par GFID",
    description: "STEAM VALUE™, développée par GFID, compose les jumeaux numériques au-dessus de vos systèmes industriels existants. Découvrez notre démarche et nos démos.",
    breadcrumb: "À propos",
    priority: 0.6,
  },
  blog: {
    path: "/blog",
    title: "Ressources jumeau numérique industriel | STEAM VALUE™",
    description: "Des repères pour passer de la donnée isolée à une lecture système de l’usine : signaux, équipements, procédés et décisions. Parcourez toutes nos ressources.",
    breadcrumb: "Ressources",
    priority: 0.6,
  },
  demo: {
    path: "/demo",
    title: "Démo 3D : jumeau numérique d’une huilerie | STEAM VALUE™",
    description: "Explorez en 3D une huilerie de palme : réception, stérilisation, pressage, clarification, stockage. Démo interactive de jumeau numérique, données simulées.",
    breadcrumb: "Démo 3D",
    priority: 0.9,
  },
  compressor: {
    path: "/demo/compressor",
    title: "Démo : jumeau numérique d’un compresseur | STEAM VALUE™",
    description: "Inspectez le compresseur C-02 en 3D : faites varier sa charge, passez en vue thermique ou éclatée. Démo interactive de jumeau numérique, données simulées.",
    breadcrumb: "Démo compresseur",
    priority: 0.8,
  },
} satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof PAGE_SEO;
