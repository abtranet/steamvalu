import Image from "next/image";
import {
  APP_STORE_URL,
  BOOK_DEMO_URL,
  DOCS_URL,
  HELPDESK_URL,
  LINKEDIN_URL,
  PARTNER_PORTAL_URL,
  PLATFORM_URL,
  PLAY_STORE_URL,
  WINDOWS_APP_URL,
  YOUTUBE_URL,
} from "@/lib/site";
import { ExternalLinkIcon, SteamValuLogo } from "./icons";

type LinkItem = {
  text: string;
  href: string;
  external?: boolean;
};

const useCasesLinks: LinkItem[] = [
  { text: "Gemba, in 3D", href: "/monitor-production" },
];

const companyLinks: LinkItem[] = [
  { text: "Our story", href: "/about" },
  { text: "Features", href: "/features" },
  { text: "Blog", href: "/blog" },
  { text: "Book a demo", href: BOOK_DEMO_URL, external: true },
];

const resourcesLinks: LinkItem[] = [
  { text: "Customers portal", href: PARTNER_PORTAL_URL, external: true },
  { text: "Partners portal", href: PARTNER_PORTAL_URL, external: true },
  { text: "Documentation", href: DOCS_URL, external: true },
  { text: "Helpdesk", href: HELPDESK_URL, external: true },
  { text: "Sign In", href: PLATFORM_URL, external: true },
];

const socialLinks: LinkItem[] = [
  { text: "LinkedIn", href: LINKEDIN_URL, external: true },
  { text: "YouTube", href: YOUTUBE_URL, external: true },
];

const badges = [
  {
    href: APP_STORE_URL,
    src: "/sites/steamvalu/shared/images/badges/app-store.svg",
    alt: "Download on the App Store",
  },
  {
    href: PLAY_STORE_URL,
    src: "/sites/steamvalu/shared/images/badges/google-play.svg",
    alt: "Get it on Google Play",
  },
  {
    href: WINDOWS_APP_URL,
    src: "/sites/steamvalu/shared/images/badges/windows.svg",
    alt: "Download SteamValu for Windows",
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
        <SteamValuLogo className="mb-12 h-5 w-auto" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn heading="Use cases" links={useCasesLinks} />
          <FooterColumn heading="SteamValu" links={companyLinks} />
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
            <p className="text-[15.6px]">© SteamValu 2026</p>
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
              form of &apos;SteamValu&apos;—a groundbreaking 3D live digital
              twin, seamlessly operational on any device.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
