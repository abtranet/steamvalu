"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BOOK_DEMO_URL,
  DOCS_URL,
  HELPDESK_URL,
  PARTNER_PORTAL_URL,
  TRY_FREE_URL,
} from "@/lib/site";
import { cn } from "@/lib/utils";
import { ContactModal } from "./ContactModal";
import {
  ChevronDownIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  SteamValuLogo,
} from "./icons";


type DropdownLink = {
  text: string;
  href: string;
  external?: boolean;
};

type Dropdown = {
  label: string;
  links: DropdownLink[];
};

const dropdowns: Dropdown[] = [
  {
    label: "Use cases",
    links: [{ text: "Gemba, in 3D", href: "/monitor-production" }],
  },
];

const aboutDropdown = {
  label: "About us",
  ourStoryHref: "/about",
};

const resourcesLinks: DropdownLink[] = [
  { text: "Features", href: "/features" },
  { text: "Blog", href: "/blog" },
  { text: "Customers portal", href: PARTNER_PORTAL_URL, external: true },
  { text: "Partners portal", href: PARTNER_PORTAL_URL, external: true },
  { text: "Documentation", href: DOCS_URL, external: true },
  { text: "Helpdesk", href: HELPDESK_URL, external: true },
];

function NavDropdown({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="flex items-center gap-1.5 text-lg text-black"
      >
        <span>{label}</span>
        <ChevronDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>
      <div className="invisible absolute left-1/2 top-full z-10 w-max min-w-[220px] -translate-x-1/2 translate-y-2 rounded-2xl bg-black p-3 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:translate-y-3 group-hover:opacity-100">
        {children}
      </div>
    </div>
  );
}

export function Header() {
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[1000] h-[108px] bg-transparent font-sans">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
          <Link href="/" aria-label="SteamValu home" className="text-black">
            <SteamValuLogo className="h-5 w-auto" />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {dropdowns.map((dropdown) => (
              <NavDropdown key={dropdown.label} label={dropdown.label}>
                {dropdown.links.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className="block whitespace-nowrap rounded-lg px-4 py-2.5 text-base text-white hover:bg-white/10"
                  >
                    {link.text}
                  </Link>
                ))}
              </NavDropdown>
            ))}

            <NavDropdown label={aboutDropdown.label}>
              <Link
                href={aboutDropdown.ourStoryHref}
                className="block whitespace-nowrap rounded-lg px-4 py-2.5 text-base text-white hover:bg-white/10"
              >
                Our Story
              </Link>
              <button
                type="button"
                onClick={() => setContactOpen(true)}
                className="block w-full whitespace-nowrap rounded-lg px-4 py-2.5 text-left text-base text-white hover:bg-white/10"
              >
                Contact
              </button>
            </NavDropdown>

            <NavDropdown label="Resources">
              {resourcesLinks.map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between gap-3 whitespace-nowrap rounded-lg px-4 py-2.5 text-base text-white hover:bg-white/10"
                >
                  {link.text}
                  {link.external && (
                    <ExternalLinkIcon className="h-1.5 w-1.5 text-white/50" />
                  )}
                </a>
              ))}
            </NavDropdown>

            <div className="ml-2 flex items-center gap-4">
              <a
                href={BOOK_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand px-7 py-4 text-lg font-medium text-brand-foreground"
              >
                Book Demo
              </a>
            </div>
          </nav>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="text-black lg:hidden"
          >
            <HamburgerIcon className="h-6 w-6" />
          </button>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-[1050] flex flex-col bg-white p-6 transition-transform duration-300 lg:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <SteamValuLogo className="h-5 w-auto text-black" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="text-2xl text-black"
          >
            ×
          </button>
        </div>
        <nav className="mt-8 flex flex-1 flex-col gap-5 overflow-y-auto text-lg">
          {dropdowns[0].links.map((link) => (
            <Link key={link.text} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.text}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMobileOpen(false)}>
            Our Story
          </Link>
          <Link href="/features" onClick={() => setMobileOpen(false)}>
            Features
          </Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <a
            href={BOOK_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-brand px-7 py-4 text-center font-medium text-brand-foreground"
          >
            Book Demo
          </a>
          <a
            href={TRY_FREE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/10 px-7 py-4 text-center font-medium"
          >
            Try for free
          </a>
        </nav>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
