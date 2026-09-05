const BOOK_DEMO_URL =
  "https://calendly.com/d/cr2r-cbx-n66/twinzo-introduction?utm_content=twinzo_introduction";
const TRY_FREE_URL =
  "https://calendly.com/d/crvw-993-zd8/twinzo-trial-setup-call-30-days-free?utm_content=try_for_free";

// Spec: docs/research/twinzo-com-ca6666c1/about-979bddc4/components/AboutCta.spec.md
export function AboutCta() {
  return (
    <section id="get-in-control-cta" className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-6 text-[32px] font-bold text-white sm:text-[56px]">
          Get in control
        </h2>
        <p className="mb-12 text-lg text-[#808080]">
          It&rsquo;s simple. To see all the possibilities, go to the App
          Store or Google Play and download the &quot;twinzo—digital
          twin&quot; app.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={TRY_FREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/20 px-7 py-4 text-lg font-medium text-white transition-colors hover:border-white/60"
          >
            Try for free
          </a>
          <a
            href={BOOK_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-brand px-7 py-4 text-lg font-medium text-brand-foreground"
          >
            Book Demo
          </a>
        </div>
      </div>
    </section>
  );
}
