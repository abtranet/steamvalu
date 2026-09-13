import Image from "next/image";

const ASSET_BASE = "/sites/steamvalu/about-979bddc4/people";

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

const team: TeamMember[] = [
  { name: "Michal Ukropec", role: "CEO", image: "michal-ukropec-2.jpg" },
  { name: "Lubomira Bosanska", role: "COO", image: "lubomira-bosanska-2.jpg" },
  { name: "Patrik Pasko", role: "CTO", image: "pasko-cb2.png" },
  { name: "Tomas Vojtek", role: "CSO", image: "tomas-vojtek.jpg" },
  {
    name: "Michal Celeng",
    role: "Chief MacGyver Officer",
    image: "michal-celeng.jpg",
  },
  { name: "Jiri Zila", role: "Head of Sales", image: "jiri-zila.jpg" },
];

// Spec: docs/research/steamvalu/about-979bddc4/components/AboutTeam.spec.md
export function AboutTeam() {
  return (
    <section className="bg-white/[0.03] px-6 py-24">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="mb-12 text-[32px] font-bold text-white">Our team</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {team.map((member) => (
            <div key={member.name}>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                <Image
                  src={`${ASSET_BASE}/${member.image}`}
                  alt={member.name}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
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
