"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "./LanguageProvider";
import {
  ArrowUpRightIcon,
  CloseIcon,
  HamburgerIcon,
  SteamValueLogo,
} from "./icons";

const HEADER_COPY = {
  fr: {
    platform: "Plateforme",
    architecture: "Architecture",
    useCases: "Cas d'usage",
    about: "À propos",
    viewDemo: "Voir la démo",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    navigation: "Navigation principale",
    mobileNavigation: "Navigation mobile",
  },
  en: {
    platform: "Platform",
    architecture: "Architecture",
    useCases: "Use cases",
    about: "About",
    viewDemo: "View demo",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
  },
} as const;

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      aria-label={language === "fr" ? "Choisir la langue" : "Choose language"}
      className="flex h-12 items-center rounded-full border border-[#cbd5e1] bg-white/60 p-0.5 text-xs font-semibold text-[#0d2b3a]"
    >
      {(["fr", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={language === option}
          onClick={() => setLanguage(option)}
          className={cn(
            "flex h-11 min-w-11 items-center justify-center rounded-full px-2 uppercase transition-colors",
            language === option
              ? "bg-[#0d4a72] text-white"
              : "text-[#475569] hover:text-[#0d2b3a]",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { language } = useLanguage();
  const copy = HEADER_COPY[language];
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileOpen(false); menuButton.current?.focus(); }
      if (event.key === "Tab") {
        const items = Array.from(headerRef.current?.querySelectorAll<HTMLElement>('a[href], button') ?? []).filter(el => el.getClientRects().length > 0);
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "site-header fixed top-0 right-0 left-0 z-[1000] flex h-[78px] sm:h-[80px] items-center bg-[#ebf0f4]/95 font-sans backdrop-blur-md transition-shadow duration-300 border-b border-[#d8e0e8]",
          isScrolled ? "shadow-[0_4px_20px_rgba(13,74,114,0.08)]" : "shadow-none",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            aria-label="Accueil STEAM VALUE"
            className="flex items-center transition-opacity duration-200 hover:opacity-85"
          >
            <SteamValueLogo className="h-[52px] sm:h-[58px] w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label={copy.navigation}
            className="hidden items-center gap-8 lg:flex"
          >
            <Link
              href="/features"
              aria-current={pathname === "/features" ? "page" : undefined}
              className="text-[15px] font-medium tracking-[-0.01em] text-[#0d2b3a] transition-colors hover:text-[#06aecd]"
            >
              {copy.platform}
            </Link>
            <Link
              href="/features#architecture"
              className="text-[15px] font-medium tracking-[-0.01em] text-[#0d2b3a] transition-colors hover:text-[#06aecd]"
            >
              {copy.architecture}
            </Link>
            <Link
              href="/monitor-production"
              aria-current={pathname === "/monitor-production" ? "page" : undefined}
              className="text-[15px] font-medium tracking-[-0.01em] text-[#0d2b3a] transition-colors hover:text-[#06aecd]"
            >
              {copy.useCases}
            </Link>
            <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
              className="text-[15px] font-medium tracking-[-0.01em] text-[#0d2b3a] transition-colors hover:text-[#06aecd]"
            >
              {copy.about}
            </Link>

            <div className="ml-2 flex items-center gap-4">
              <LanguageToggle />
              <Link
                href="/demo"
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-[#00c0e8] px-5 text-[14px] font-semibold text-[#062330] shadow-sm transition-all hover:scale-[1.02] hover:bg-[#00afd4] hover:shadow-md active:scale-[0.98]"
              >
                <span>{copy.viewDemo}</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileOpen ? copy.closeMenu : copy.openMenu}
            ref={menuButton}
            aria-controls="site-mobile-navigation"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 touch-manipulation items-center justify-center rounded-lg text-[#0d2b3a] transition-colors hover:bg-black/5 lg:hidden"
          >
            {mobileOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <HamburgerIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <nav
          id="site-mobile-navigation"
          inert={!mobileOpen}
          aria-hidden={!mobileOpen}
          aria-label={copy.mobileNavigation}
          className={cn(
            "absolute top-[78px] sm:top-[80px] right-0 left-0 overflow-hidden border-b border-[#d8e0e8] bg-[#ebf0f4] text-[#0d2b3a] shadow-xl transition-all duration-300 lg:hidden",
            mobileOpen
              ? "max-h-[calc(100vh-80px)] opacity-100 py-6"
              : "pointer-events-none max-h-0 py-0 opacity-0",
          )}
        >
          <div className="flex flex-col gap-4 px-6">
            <Link
              href="/features"
              aria-current={pathname === "/features" ? "page" : undefined}
              onClick={closeMobile}
              className="border-b border-[#d8e0e8]/60 py-2 text-lg font-medium text-[#0d2b3a]"
            >
              {copy.platform}
            </Link>
            <Link
              href="/features#architecture"
              onClick={closeMobile}
              className="border-b border-[#d8e0e8]/60 py-2 text-lg font-medium text-[#0d2b3a]"
            >
              {copy.architecture}
            </Link>
            <Link
              href="/monitor-production"
              aria-current={pathname === "/monitor-production" ? "page" : undefined}
              onClick={closeMobile}
              className="border-b border-[#d8e0e8]/60 py-2 text-lg font-medium text-[#0d2b3a]"
            >
              {copy.useCases}
            </Link>
            <Link
              href="/about"
              aria-current={pathname === "/about" ? "page" : undefined}
              onClick={closeMobile}
              className="border-b border-[#d8e0e8]/60 py-2 text-lg font-medium text-[#0d2b3a]"
            >
              {copy.about}
            </Link>

            <div className="flex items-center justify-between pt-4">
              <LanguageToggle />
              <Link
                href="/demo"
                onClick={closeMobile}
                className="inline-flex h-12 items-center justify-center gap-1.5 rounded-full bg-[#00c0e8] px-5 text-[14px] font-semibold text-[#062330]"
              >
                <span>{copy.viewDemo}</span>
                <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
