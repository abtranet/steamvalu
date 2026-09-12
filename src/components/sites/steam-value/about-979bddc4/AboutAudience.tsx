import Image from "next/image";


type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const team: TeamMember[] = [
  {
    "name": "Direction industrielle",
    "role": "Une même lecture opérationnelle",
    "image": ""
  },
  {
    "name": "Production",
    "role": "Une même lecture opérationnelle",
    "image": ""
  },
  {
    "name": "Maintenance & fiabilité",
    "role": "Une même lecture opérationnelle",
    "image": ""
  },
  {
    "name": "IT / OT",
    "role": "Une même lecture opérationnelle",
    "image": ""
  },
  {
    "name": "Pilotage multi-site",
    "role": "Une même lecture opérationnelle",
    "image": ""
  }
];

export function AboutAudience() {
  return (
    <section className="sv-audiences bg-white/[0.03] px-6 py-24">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-12 text-[32px] font-bold text-white">
            Publics concernés
          </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name}>
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                <Image
                  src="/steam-value-mark.svg"
                  alt={member.name}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <div className="mt-6">
                <p className="mb-2 text-white">{member.name}</p>
                <p className="text-lg text-white/70">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
