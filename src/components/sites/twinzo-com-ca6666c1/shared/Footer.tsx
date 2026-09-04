import Image from "next/image";
import { ExternalLinkIcon, TwinzoLogo } from "./icons";

type LinkItem = {
  text: string;
  href: string;
  external?: boolean;
};

const useCasesLinks: LinkItem[] = [
  { text: "Logistics optimization", href: "/optimize-internal-logistics" },
  { text: "Logistics management", href: "/material-order-automation" },
  { text: "Gemba, in 3D", href: "/monitor-production" },
];

const twinzoLinks: LinkItem[] = [
  { text: "Partners", href: "/partner" },
  { text: "Pricing", href: "/pricing" },
  { text: "Our story", href: "/about" },
  { text: "Contact", href: "/contact-us" },
];

const resourcesLinks: LinkItem[] = [
  { text: "Customers portal", href: "https://partner.twinzo.eu/", external: true },
  { text: "Partners portal", href: "https://partner.twinzo.eu/", external: true },
  {
    text: "Documentation",
    href: "https://twinzo.atlassian.net/wiki/spaces/PUBD/overview",
    external: true,
  },
  {
    text: "Helpdesk",
    href: "https://partner.twinzo.eu/helpdesk/customer-care-1",
    external: true,
  },
  { text: "Sign In", href: "https://platform.twinzo.com/login", external: true },
];

const socialLinks: LinkItem[] = [
  { text: "LinkedIn", href: "https://www.linkedin.com/company/twinzo", external: true },
  {
    text: "YouTube",
    href: "https://www.youtube.com/@twinzo-digitaltwin",
    external: true,
  },
];

const badges = [
  {
    href: "https://apps.apple.com/us/app/twinzo-digital-twin/id1561970281",
    src: "/sites/twinzo-com-ca6666c1/shared/images/badges/app-store.svg",
    alt: "Download on the App Store",
  },
  {
    href: "https://play.google.com/store/apps/details?id=eu.twinzo.digitaltwin",
    src: "/sites/twinzo-com-ca6666c1/shared/images/badges/google-play.svg",
    alt: "Get it on Google Play",
  },
  {
    href: "https://twinzo.sharepoint.com/:f:/s/Publicdocumentation/EtQS6MEQ9IJNroIfJ6sxFt4BrWAGMDey1pyOUO2AZtGNyQ?e=vjzCOV",
    src: "/sites/twinzo-com-ca6666c1/shared/images/badges/windows.svg",
    alt: "Download twinzo for Windows",
  },
];

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: LinkItem[];
}) {
  return (
    <div>
      <p className="mb-3 text-lg font-medium text-white/50">{heading}</p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.text}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-2 text-lg text-white hover:opacity-80"
            >
              {link.text}
              {link.external && (
                <ExternalLinkIcon className="h-1.5 w-1.5 text-white/50" />
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-black py-[67px] pb-36 text-white">
      <div className="mx-auto max-w-[1280px] px-6">
        <TwinzoLogo className="mb-12 h-5 w-auto" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn heading="Use cases" links={useCasesLinks} />
          <FooterColumn heading="Twinzo" links={twinzoLinks} />
          <FooterColumn heading="Resources" links={resourcesLinks} />
          <div>
            <FooterColumn heading="Links" links={socialLinks} />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {badges.map((badge) => (
                <a
                  key={badge.alt}
                  href={badge.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={badge.alt}
                >
                  <Image src={badge.src} alt={badge.alt} width={120} height={36} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 text-white/50 lg:grid-cols-6">
          <div className="lg:col-span-1">
            <p className="text-[15.6px]">© Twinzo 2026</p>
            <button type="button" className="mt-3 block text-[15.6px] underline">
              Cookie Settings
            </button>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15.6px]">
              Through collaborative efforts with our inaugural customers,
              we&apos;ve systematically devised an expanding suite of
              solutions aimed at addressing commonplace challenges in
              manufacturing. Our relentless pursuit pivots towards an
              intensified emphasis on the tridimensional visualization
              paradigm. In 2019, this dedicated initiative bore fruit in the
              form of &apos;twinzo&apos;—a groundbreaking 3D live digital
              twin, seamlessly operational on any device.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
