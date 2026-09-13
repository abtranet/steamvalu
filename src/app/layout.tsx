import type { Metadata } from "next";
import { Fraunces, Geist, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteChrome } from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/site";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
  "title": "STEAM VALUE™ | Jumeaux numériques industriels composés",
  "description": "STEAM VALUE™ compose les jumeaux de vos équipements, rassemble les données opérationnelles et révèle la santé globale de votre système sans remplacer vos outils existants."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} ${fraunces.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
