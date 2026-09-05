const TRY_FREE_URL =
  "https://calendly.com/d/crvw-993-zd8/twinzo-trial-setup-call-30-days-free?utm_content=try_for_free";
const BOOK_DEMO_URL =
  "https://calendly.com/d/cr2r-cbx-n66/twinzo-introduction?utm_content=twinzo_introduction";

export function FeaturesCTA() {
  return (
    <section className="py-10 lg:py-[120px]">
      <div className="mx-auto max-w-[1132px] px-4">
        <div className="mx-auto flex max-w-[560px] flex-col items-center gap-8 text-center">
          <h2 className="text-[40px] font-bold leading-[1.2] tracking-[-1.6px] sm:text-[48px] lg:text-[56px] lg:leading-[67.2px] lg:tracking-[-2.24px]">
            Get in control
          </h2>
          <p className="max-w-[400px] text-[18px] leading-[21.96px] tracking-[-0.72px] text-foreground/50">
            It&apos;s simple. To see all the possibilities, go to the App Store or Google
            Play and download the &quot;twinzo—digital twin&quot; app.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={TRY_FREE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-foreground/20 px-6 py-4 text-[15px] font-medium tracking-[-0.6px] transition-colors hover:bg-foreground/5"
            >
              Try for free
            </a>
            <a
              href={BOOK_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-brand px-6 py-4 text-[15px] font-medium tracking-[-0.6px] text-brand-foreground transition-opacity hover:opacity-90"
            >
              Book Demo
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
