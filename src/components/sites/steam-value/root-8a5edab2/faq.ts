/**
 * Homepage FAQ. Every answer restates what the site already says elsewhere;
 * the French list also feeds the FAQPage structured data, so keep both in sync
 * with what is shown.
 */
export type FaqItem = { question: string; answer: string };

export const FAQ: Record<"fr" | "en", FaqItem[]> = {
  fr: [
    {
      question: "Qu’est-ce que STEAM VALUE™ ?",
      answer: "STEAM VALUE™ est une plateforme de composition de jumeaux numériques industriels développée par GFID. Elle compose les jumeaux de vos équipements, rassemble les données opérationnelles et révèle la santé globale de votre système.",
    },
    {
      question: "Faut-il remplacer nos outils et systèmes existants ?",
      answer: "Non. La plateforme est conçue comme une couche de composition au-dessus des environnements industriels existants : elle complète vos systèmes au lieu de les remplacer, et chaque jumeau reste identifiable.",
    },
    {
      question: "Comment se déroule un déploiement ?",
      answer: "En quatre étapes : auditer un système représentatif et documenter ses sources, ses actifs et ses objectifs ; prototyper les jumeaux unitaires et une première vue composée ; valider la valeur face à une référence de départ ; puis étendre par ligne, zone ou site lorsque les preuves soutiennent la décision.",
    },
    {
      question: "Peut-on voir la plateforme avant de s’engager ?",
      answer: "Oui. Deux démonstrations interactives sont accessibles en ligne : une huilerie de palme en 3D et le compresseur C-02. Elles fonctionnent sur des données simulées.",
    },
    {
      question: "À quelles équipes s’adresse STEAM VALUE™ ?",
      answer: "À la direction industrielle, à la production, à la maintenance et à la fiabilité, aux équipes IT / OT et au pilotage multi-site, qui partagent ainsi une même lecture opérationnelle.",
    },
    {
      question: "STEAM VALUE™ est-elle certifiée ISO 23247 ?",
      answer: "La plateforme est conçue en alignement avec la série ISO 23247 et ISO 23247-6:2026. Aucune certification ISO n’est revendiquée.",
    },
    {
      question: "Comment démarrer ?",
      answer: "Écrivez-nous sur WhatsApp ou via le formulaire de contact en décrivant votre site, vos équipements et ce que vous cherchez à observer. Le premier pas consiste à choisir un système représentatif.",
    },
  ],
  en: [
    {
      question: "What is STEAM VALUE™?",
      answer: "STEAM VALUE™ is an industrial digital-twin composition platform developed by GFID. It composes the twins of your equipment, brings operational data together, and reveals the overall health of your system.",
    },
    {
      question: "Do we need to replace our existing tools and systems?",
      answer: "No. The platform is designed as a composition layer above existing industrial environments: it complements your systems instead of replacing them, and each twin remains identifiable.",
    },
    {
      question: "How does a deployment work?",
      answer: "In four steps: audit a representative system and document its sources, assets, and objectives; prototype the individual twins and an initial composed view; validate the value against a baseline; then extend by line, zone, or site when the evidence supports the decision.",
    },
    {
      question: "Can we see the platform before committing?",
      answer: "Yes. Two interactive demos are available online: a palm-oil mill in 3D and the C-02 compressor. They run on simulated data.",
    },
    {
      question: "Which teams is STEAM VALUE™ for?",
      answer: "Industrial leadership, production, maintenance and reliability, IT / OT teams, and multi-site operations, who then share one operational view.",
    },
    {
      question: "Is STEAM VALUE™ ISO 23247 certified?",
      answer: "The platform is designed in alignment with the ISO 23247 series and ISO 23247-6:2026. No ISO certification is claimed.",
    },
    {
      question: "How do we get started?",
      answer: "Message us on WhatsApp or through the contact form, describing your site, your equipment, and what you want to see. The first step is choosing a representative system.",
    },
  ],
};
