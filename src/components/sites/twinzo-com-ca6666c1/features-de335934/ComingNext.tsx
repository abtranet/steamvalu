const COLUMN_1 = [
  "Warehouse management system integration",
  "ERP systems module",
  "Skill matrix system integration",
];

const COLUMN_2 = [
  "Turn by turn navigation",
  "Correlation and cuasality analytics",
  "AI anomaly detection",
  "AI correlation detection",
];

export function ComingNext() {
  return (
    <section>
      <div className="mx-auto max-w-[1132px] px-4">
        <div className="border-y border-foreground/20 py-10 lg:py-[120px]">
          <h2 className="mb-8 text-[26px] font-bold leading-[1.18] tracking-[-1.04px] lg:mb-10 lg:text-[32px] lg:leading-[37.76px] lg:tracking-[-1.28px]">
            Coming next
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
            <ul className="flex flex-1 flex-col gap-4">
              {COLUMN_1.map((item) => (
                <li
                  key={item}
                  className="text-[16px] font-bold leading-[21.96px] tracking-[-0.72px] text-foreground/50 lg:text-[18px]"
                >
                  {item}
                </li>
              ))}
            </ul>
            <ul className="flex flex-1 flex-col gap-4">
              {COLUMN_2.map((item) => (
                <li
                  key={item}
                  className="text-[16px] font-bold leading-[21.96px] tracking-[-0.72px] text-foreground/50 lg:text-[18px]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
