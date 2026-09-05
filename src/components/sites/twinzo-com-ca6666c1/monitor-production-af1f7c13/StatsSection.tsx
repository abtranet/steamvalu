const STATS = [
  { value: "€10K", label: "totally invested" },
  { value: "2 wk.", label: "implementation process" },
  { value: "20%", label: "shorter breakdowns" },
] as const;

export function StatsSection() {
  return (
    <section className="pt-10 pb-[120px]">
      <div className="mx-auto max-w-[1132px] px-6">
        <div className="rounded-3xl bg-black/[0.03] px-8 py-10 sm:px-12 sm:py-14">
          <h2 className="max-w-sm text-3xl font-bold text-black sm:text-4xl">
            Let us talk about the numbers
          </h2>
          <ul className="mt-10 flex flex-col flex-wrap gap-10 sm:flex-row">
            {STATS.map((stat) => (
              <li
                key={stat.label}
                className="flex flex-col gap-2 sm:basis-[47%] lg:basis-auto lg:flex-1"
              >
                <p className="text-5xl font-bold text-black">{stat.value}</p>
                <p className="text-2xl text-black">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
