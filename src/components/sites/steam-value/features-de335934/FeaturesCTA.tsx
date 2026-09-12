const TRY_FREE_URL =
  "/features";
const BOOK_DEMO_URL =
  "/demo";

export function FeaturesCTA() {
  return (
    <section className="sv-closing-cta py-10 lg:py-[120px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <div className="mx-auto flex max-w-[560px] flex-col items-center gap-8 text-center">
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-1.6px] sm:text-[48px] lg:text-[56px] lg:leading-[67.2px] lg:tracking-[-2.24px]">
            Entrez dans le jumeau. Testez le système.
          </h2>
          <p className="max-w-[400px] text-[18px] leading-[21.96px] tracking-[-0.72px] text-foreground/50">
            Suivez un défaut simulé depuis le signal d’un équipement jusqu’à la santé de la zone et de l’usine composée.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={TRY_FREE_URL}
              
              className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-4 text-[15px] font-medium tracking-[-0.6px] transition-colors hover:bg-foreground/5"
            >
            Découvrir la plateforme
          </a>
            <a
              href={BOOK_DEMO_URL}
              
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-4 text-[15px] font-medium tracking-[-0.6px] text-brand-foreground transition-opacity hover:opacity-90"
            >
            Explorer le démonstrateur
          </a>
          </div>
        </div>
      </div>
    </section>
  );
}
