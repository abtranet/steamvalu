export function BlogHero() {
  return (
    <section className="sv-blog-intro relative px-2 pt-[140px] pb-16 sm:px-3 md:pt-[160px] lg:pt-[180px]">
      <div className="absolute inset-x-2 inset-y-0 rounded-[24px] bg-black sm:inset-x-3" />
      <div className="relative mx-auto max-w-[684px] px-6 pb-20 text-center sm:pb-28 md:pb-32">
        <p className="mb-3 text-lg text-[#4d4d4d] sm:text-xl">
            Ressources
          </p>
        <h1 className="bg-gradient-to-b from-white to-[#b6b6b6] bg-clip-text text-4xl leading-[1.2] font-bold tracking-[-0.04em] text-transparent sm:text-5xl md:text-6xl lg:text-[67px]">
            De la donnée isolée à l’intelligence du système.
          </h1>
        <h2 className="mt-6 bg-gradient-to-b from-white to-[#b6b6b6] bg-clip-text text-lg leading-[1.25] tracking-[-0.03em] text-transparent sm:text-xl md:text-2xl lg:text-[28.8px]">
            STEAM VALUE™ donne à chaque signal sa place, ses relations et son impact dans une vue composée de l’opération industrielle.
          </h2>
      </div>
    </section>
  );
}
