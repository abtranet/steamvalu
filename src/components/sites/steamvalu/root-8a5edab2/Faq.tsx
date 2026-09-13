export const FAQ_ENTRIES = [
  {
    question: "What is a digital twin for a factory or warehouse?",
    answer:
      "A digital twin is a live 3D model of your facility that mirrors what is physically happening inside it. SteamValu streams positions of forklifts, assets and people onto that model in real time, so a plant manager can see the floor as it is right now rather than reconstruct it from yesterday's reports.",
  },
  {
    question: "How long does deployment take?",
    answer:
      "A typical pilot runs in four to six weeks: scanning the facility into a 3D model, connecting your existing data sources, and installing RTLS hardware where live positioning is needed. Sites that already have tracking infrastructure connect faster because SteamValu reads from it directly.",
  },
  {
    question: "Do I need new hardware to track forklifts and assets?",
    answer:
      "Not always. SteamValu ingests data from systems you already run, including ERP, MES, SAP, PLC readouts, environmental sensors and existing RTLS installations. Where there is no positioning source yet, SteamValu RTLS tags and anchors, BLE, UWB or AI camera vision can supply it.",
  },
  {
    question: "Which data sources can SteamValu connect to?",
    answer:
      "UWB and BLE RTLS vendors such as Quuppa and Zebra, AI camera feeds, OPC UA, Ignition SCADA and MES, HighByte, and standard ERP and MES platforms. Anything not covered out of the box can be pushed in through the REST API.",
  },
  {
    question: "Can SteamValu run on an isolated or air-gapped network?",
    answer:
      "Yes. SteamValu can be deployed fully on-premise on two Linux VMs inside your own network, with your IT owning DNS, TLS and the VMs. Operators get the same 3D twin, RTLS and alerts with no traffic leaving the plant.",
  },
  {
    question: "How much does SteamValu cost?",
    answer:
      "Pricing depends on facility size, the number of tracked assets and whether you need RTLS hardware. Every engagement starts with a free expert session where we scope your site and give you a concrete figure before you commit.",
  },
] as const;

export function Faq() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[820px] px-6">
        <h2 className="mb-4 text-[32px] leading-[1.18] font-bold tracking-[-0.04em] text-foreground md:text-[48px]">
          Digital twin questions, answered
        </h2>
        <p className="mb-10 text-lg text-foreground/60">
          The things plant and logistics managers ask us before a first demo.
        </p>

        <dl className="divide-y divide-black/10 border-t border-black/10">
          {FAQ_ENTRIES.map(({ question, answer }) => (
            <div key={question} className="py-6">
              <dt className="text-xl font-medium text-foreground">
                {question}
              </dt>
              <dd className="mt-3 text-lg leading-relaxed text-foreground/70">
                {answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
