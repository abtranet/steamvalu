"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/sites/steam-value/shared/Header";
import { Footer } from "@/components/sites/steam-value/shared/Footer";
import { LanguageProvider } from "@/components/sites/steam-value/shared/LanguageProvider";
import { SmoothScroll } from "@/components/sites/steam-value/shared/SmoothScroll";
import { ContactWidget } from "@/components/contact/ContactWidget";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/demo" || pathname.startsWith("/demo/")) {
    return <LanguageProvider>{children}</LanguageProvider>;
  }
  return (
    <LanguageProvider>
      <a className="skip-link" href="#main-content">Aller au contenu / Skip to content</a>
      <SmoothScroll />
      <Header />
      <main id="main-content" tabIndex={-1} className="site-main flex-1">{children}</main>
      <Footer />
      {/* Deliberately not on /demo/*: the viewer's own controls own that corner. */}
      <ContactWidget />
    </LanguageProvider>
  );
}
