import type { Metadata } from "next";
import { PalmOilDemo } from "@/components/palm-oil/PalmOilDemo";
import { parseDemoView } from "@/components/palm-oil/view";

export const metadata: Metadata = {
  title: "Huilerie de palme · Jumeau numérique 3D | STEAM VALUE™",
  description: "Explorez une usine d’huile de palme en 3D : réception, stérilisation, égrappage, pressage, clarification et stockage. Démonstration interactive avec données simulées.",
};

/**
 * `?view=3d` selects the immersive view on the server, so an "Explorer l’usine"
 * entry renders the 3D workspace on the very first paint instead of showing the
 * dashboard and switching afterwards. Refreshing or sharing the URL keeps it.
 */
export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <PalmOilDemo initialView={parseDemoView(params.view) ?? "dashboard"} />;
}
