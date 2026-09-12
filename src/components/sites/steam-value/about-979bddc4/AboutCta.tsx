const BOOK_DEMO_URL =
  "/demo";
const TRY_FREE_URL =
  "/features";

export function AboutCta() {
  return (
    <section id="get-in-control-cta" className="sv-closing-cta px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-6 text-[32px] font-bold text-white sm:text-[56px]">
            Entrez dans le jumeau. Testez le système.
          </h2>
        <p className="mb-12 text-lg text-[#808080]">
            Suivez un défaut simulé depuis le signal d’un équipement jusqu’à la santé de la zone et de l’usine composée.
          </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={TRY_FREE_URL}
            
            className="rounded-full border border-white/20 px-7 py-4 text-lg font-medium text-white transition-colors hover:border-white/60"
          >
            Découvrir la plateforme
          </a>
          <a
            href={BOOK_DEMO_URL}
            
            className="rounded-full bg-brand px-7 py-4 text-lg font-medium text-brand-foreground"
          >
            Explorer le démonstrateur
          </a>
        </div>
      </div>
    </section>
  );
}
