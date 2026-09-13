import Link from "next/link";
import { PLANT_3D_HREF } from "@/components/palm-oil/view";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[720px] flex-col items-center justify-center gap-6 px-6 pt-[140px] pb-20 text-center">
      <p className="sv-eyebrow">Erreur 404</p>
      <h1 className="text-[40px] leading-[1.15] font-bold tracking-[-0.04em] text-foreground">Cette page n’existe pas.</h1>
      <p className="text-[17px] leading-relaxed text-[#475569]">
        Le lien est peut-être ancien ou incomplet. Explorez l’usine en 3D ou revenez à l’accueil.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href={PLANT_3D_HREF}
          data-cta="plant-3d"
          className="inline-flex min-h-12 items-center rounded-full bg-[#0d4a72] px-6 text-[15px] font-semibold text-white transition-colors hover:bg-[#083450]"
        >
          Explorer l’usine
        </Link>
        <Link
          href="/"
          className="inline-flex min-h-12 items-center rounded-full border border-[#b6c8d3] px-6 text-[15px] font-semibold text-[#123b55] transition-colors hover:border-[#0d4a72]"
        >
          Retour à l’accueil
        </Link>
      </div>
    </section>
  );
}
