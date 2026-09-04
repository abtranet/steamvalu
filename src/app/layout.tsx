import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "@/components/sites/twinzo-com-ca6666c1/shared/Footer";
import { Header } from "@/components/sites/twinzo-com-ca6666c1/shared/Header";
import { SmoothScroll } from "@/components/sites/twinzo-com-ca6666c1/shared/SmoothScroll";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "twinzo | Real-time 3D Digital Twin for Manufacturing & Logistics",
  description:
    "twinzo is a real-time 3D digital twin platform that visualizes your factory, tracks assets, and optimizes internal logistics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
