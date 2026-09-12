const ROWS = [
  {
    "label": "Approche classique",
    "text": "Silos de données par équipement ou fabricant. Manque de contexte global sur le système. Analytique limitée aux paramètres physiques simples."
  },
  {
    "label": "Approche STEAM VALUE™",
    "text": "Composition logique des jumeaux unitaires via un graphe sémantique. Calculs croisés temps réel pour déterminer la santé globale du système. Détection d’incohérences contextuelles et injection de défauts simulée."
  }
];

export function ProblemSolutionSection() {
  return (
    <section className="sv-comparison pt-10 pb-[120px]">
      <div className="mx-auto max-w-[1132px] px-6">
        <ul className="flex flex-col gap-16">
          {ROWS.map((row) => (
            <li
              key={row.label}
              className="flex flex-col gap-6 text-center lg:flex-row lg:gap-16 lg:text-left"
            >
              <h2 className="shrink-0 text-2xl font-medium text-black lg:w-[160px]">
                {row.label}
              </h2>
              <p className="text-2xl leading-[1.25] text-black lg:flex-1 lg:text-center">
                {row.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
