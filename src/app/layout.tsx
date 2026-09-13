import type { Metadata } from "next";
import { Fraunces, Geist, Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SiteChrome } from "@/components/SiteChrome";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID, SITE_URL } from "@/lib/site";
import { pageMetadata, SITE_JSON_LD } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

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

// Defaults for pages without their own metadata; each public page overrides these.
export const metadata: Metadata = {
  ...pageMetadata("home"),
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "./" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geist.variable} ${fraunces.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <JsonLd data={SITE_JSON_LD} />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
      {/* Production deployments only, so local runs, tests and previews stay out of the reports. */}
      {process.env.VERCEL_ENV === "production" && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
    </html>
  );
}
