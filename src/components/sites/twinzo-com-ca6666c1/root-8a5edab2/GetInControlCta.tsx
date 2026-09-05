import { BOOK_DEMO_URL, TRY_FREE_URL } from "./constants";

export function GetInControlCta() {
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto flex max-w-[500px] flex-col items-center gap-6 px-6 text-center">
        <h2 className="text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground md:text-[56px]">
          Get in control
        </h2>
        <p className="text-foreground/60">
          It&apos;s simple. To see all the possibilities, go to the App
          Store or Google Play and download the &quot;twinzo—digital
          twin&quot; app.
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <a
            href={TRY_FREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/15 bg-white px-6 py-4 text-[15px] font-medium text-black transition hover:border-black/30"
          >
            Try for free
          </a>
          <a
            href={BOOK_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand px-6 py-4 text-[15px] font-medium text-brand-foreground"
          >
            Book Demo
          </a>
        </div>
      </div>
    </section>
  );
}
