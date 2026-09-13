import Link from "next/link";

type CtaBannerProps = {
  headline: string;
  buttonLabel: string;
  href: string;
  external?: boolean;
};

export function CtaBanner({
  headline,
  buttonLabel,
  href,
  external,
}: CtaBannerProps) {
  const buttonClasses =
    "shrink-0 rounded-full border border-black px-6 py-4 text-[15px] text-black transition-colors duration-200 hover:bg-black hover:text-white";

  return (
    <section className="pt-10 pb-20">
      <div className="mx-auto max-w-[1132px] px-6">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand p-8 text-center sm:flex-row sm:justify-between sm:p-8 sm:text-left lg:rounded-full lg:py-6 lg:pl-12 lg:pr-6">
          <p className="text-2xl font-medium text-black">{headline}</p>
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClasses}
            >
              {buttonLabel}
            </a>
          ) : (
            <Link href={href} className={buttonClasses}>
              {buttonLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
