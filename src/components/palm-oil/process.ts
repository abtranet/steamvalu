export type StageId = 'reception' | 'sterilization' | 'threshing' | 'pressing' | 'clarification' | 'storage' | 'boiler';
export type Scenario = 'normal' | 'steam' | 'press' | 'clarifier';
export type ViewPreset = 'perspective' | 'top' | 'front';
export type Stage = { id: StageId; code: string; name: string; equipment: string; description: string; metric: string; unit: string; nominal: number; position: [number, number, number] };
export const STAGES: Stage[] = [
  { id: 'reception', code: 'REC-01', name: 'Réception', equipment: 'Trémie & convoyeur à régimes', description: 'Les régimes de fruits frais sont réceptionnés puis convoyés vers la stérilisation.', metric: 'Débit de régimes', unit: 't/h', nominal: 30, position: [-28, 2, -8] },
  { id: 'sterilization', code: 'STR-01', name: 'Stérilisation', equipment: 'Autoclaves à vapeur', description: 'La vapeur prépare les régimes et facilite le détachement des fruits. La pression est surveillée à chaque cycle.', metric: 'Pression vapeur', unit: 'bar', nominal: 3, position: [-17, 5, -8] },
  { id: 'threshing', code: 'THR-01', name: 'Égrappage', equipment: 'Tambour égrappeur rotatif', description: 'Le tambour sépare les fruits stérilisés des rafles. Les fruits poursuivent leur trajet vers les digesteurs.', metric: 'Vitesse du tambour', unit: 'tr/min', nominal: 22, position: [-6, 4, -8] },
  { id: 'pressing', code: 'PRS-01', name: 'Digestion & pressage', equipment: 'Digesteurs & presses à vis', description: 'Les fruits sont malaxés puis pressés pour extraire l’huile brute. Les fibres et les noix sont séparées du flux liquide.', metric: 'Charge moteur', unit: '%', nominal: 72, position: [5, 4, -8] },
  { id: 'clarification', code: 'CLR-01', name: 'Clarification', equipment: 'Clarificateurs & séparateurs', description: 'L’huile brute est clarifiée pour séparer l’eau et les matières solides avant son transfert au stockage.', metric: 'Température', unit: '°C', nominal: 88, position: [24, 4, -8] },
  { id: 'storage', code: 'STK-01', name: 'Stockage', equipment: 'Cuves d’huile de palme brute', description: 'L’huile clarifiée rejoint les cuves de stockage. Le niveau et la température permettent de suivre le produit disponible.', metric: 'Niveau cuve', unit: '%', nominal: 64, position: [-12, 3, 13] },
  { id: 'boiler', code: 'BLR-01', name: 'Énergie & vapeur', equipment: 'Chaudière biomasse', description: 'La chaudière fournit la vapeur aux étapes thermiques. Une baisse de pression affecte la stérilisation et le débit de la ligne.', metric: 'Pression chaudière', unit: 'bar', nominal: 18, position: [14, 7, 14] },
];
export const SCENARIOS: { id: Scenario; name: string; description: string }[] = [
  { id: 'normal', name: 'Production nominale', description: 'Tous les équipements fonctionnent dans leur plage de démonstration.' },
  { id: 'steam', name: 'Baisse de pression vapeur', description: 'Chaudière → stérilisation → réduction du débit de la ligne.' },
  { id: 'press', name: 'Surcharge de la presse', description: 'La charge moteur augmente et le débit d’huile diminue.' },
  { id: 'clarifier', name: 'Dérive de clarification', description: 'La température baisse ; le transfert vers le stockage est réduit.' },
];
export function statusFor(id: StageId, scenario: Scenario): 'normal' | 'warning' | 'critical' {
  if ((scenario === 'steam' && id === 'boiler') || (scenario === 'press' && id === 'pressing') || (scenario === 'clarifier' && id === 'clarification')) return 'critical';
  if ((scenario === 'steam' && ['sterilization', 'pressing'].includes(id)) || (scenario === 'press' && ['reception', 'clarification'].includes(id)) || (scenario === 'clarifier' && id === 'storage')) return 'warning';
  return 'normal';
}
export function readingFor(stage: Stage, seconds: number, scenario: Scenario): number {
  let base = stage.nominal;
  if (scenario === 'steam' && stage.id === 'boiler') base = 10.2;
  if (scenario === 'steam' && stage.id === 'sterilization') base = 1.7;
  if (scenario === 'press' && stage.id === 'pressing') base = 96;
  if (scenario === 'clarifier' && stage.id === 'clarification') base = 69;
  if (stage.id === 'reception' && scenario !== 'normal') base = 21;
  return Number((base + Math.sin(seconds / 4 + STAGES.indexOf(stage)) * base * 0.012).toFixed(1));
}
export function plantMetrics(seconds: number, scenario: Scenario) {
  const factor = scenario === 'normal' ? 1 : scenario === 'steam' ? 0.62 : scenario === 'press' ? 0.73 : 0.82;
  return { throughput: (30 + Math.sin(seconds / 7) * 0.3) * factor, oil: (6.6 + Math.sin(seconds / 8) * 0.06) * factor, health: scenario === 'normal' ? 98 : scenario === 'steam' ? 68 : scenario === 'press' ? 74 : 81, steam: (18 + Math.sin(seconds / 5) * 0.12) * (scenario === 'steam' ? 0.57 : 1) };
}
