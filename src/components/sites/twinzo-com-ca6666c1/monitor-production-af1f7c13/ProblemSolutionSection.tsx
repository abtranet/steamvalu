const ROWS = [
  {
    label: "Problem",
    text: "Large manufacturing sites face challenges in achieving a comprehensive overview of production, logistics, safety, quality, and maintenance processes. Supervisors, maintenance crews, and other roles struggle to assess the current status and identify issues in real time, often necessitating phone calls and extensive walks across the facility. This inefficiency directly results in prolonged breakdowns and increased production idle times.",
  },
  {
    label: "Solution",
    text: "Integrate all systems, such as ERP, MES, SAP, Quality, Breakdowns, PLC readouts, Environmental sensors, and more, into the twinzo digital twin. This information can then be accessed through our 3D digital twin app on various devices, including phones, tablets, TVs, and large touch screens. The data is presented in an easy-to-understand 3D format, providing every employee on the shop floor with instant access to critical information. This not only streamlines decision-making but also enhances data transparency throughout the manufacturing facility.",
  },
] as const;

export function ProblemSolutionSection() {
  return (
    <section className="pt-10 pb-[120px]">
      <div className="mx-auto max-w-[1132px] px-6">
        <ul className="flex flex-col gap-16">
          {ROWS.map((row) => (
            <li
              key={row.label}
              className="flex flex-col gap-6 text-center lg:flex-row lg:gap-16 lg:text-left"
            >
              <h2 className="shrink-0 text-2xl font-medium text-black lg:w-[160px]">
                {row.label}
              </h2>
              <p className="text-2xl leading-[1.25] text-black lg:flex-1 lg:text-center">
                {row.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
