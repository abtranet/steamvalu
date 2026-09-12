export const WORKFLOW_STEPS = [
  {
    key: "observer",
    label: { fr: "Observer", en: "Observe" },
    text: {
      fr: "Réunir les signaux critiques dans une seule vue. Pression, vibration, température, débit et état des actifs deviennent lisibles ensemble, avec leur contexte opérationnel.",
      en: "Bring critical signals into a single view. Pressure, vibration, temperature, flow, and asset health become readable together, with their operational context.",
    },
  },
  {
    key: "contextualiser",
    label: { fr: "Contextualiser", en: "Contextualize" },
    text: {
      fr: "Relier chaque mesure au bon équipement et au bon processus. Le registre conserve l’identité, les relations, les sources et l’historique de chaque jumeau au lieu d’isoler les données dans des silos.",
      en: "Connect every measurement to the right asset and process. The registry preserves each twin’s identity, relationships, sources, and history instead of isolating data in silos.",
    },
  },
  {
    key: "composer",
    label: { fr: "Composer", en: "Compose" },
    text: {
      fr: "Passer de l’état d’une machine à la santé du système. Les jumeaux unitaires alimentent les jumeaux de zone, puis une vue composée de l’usine qui révèle les effets en cascade.",
      en: "Move from the condition of one machine to the health of the system. Individual twins feed zone twins, then a composed plant view that reveals cascading effects.",
    },
  },
  {
    key: "agir",
    label: { fr: "Agir", en: "Act" },
    text: {
      fr: "Transformer les écarts en décisions traçables. Seuils, tendances, événements et recommandations aident les équipes à examiner le bon actif avant que la situation ne se propage.",
      en: "Turn deviations into traceable decisions. Thresholds, trends, events, and recommendations help teams examine the right asset before the situation spreads.",
    },
  },
] as const;
