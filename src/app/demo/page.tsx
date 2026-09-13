import type { Metadata } from "next";
import { PalmOilDemo } from "@/components/palm-oil/PalmOilDemo";
import { parseDemoView } from "@/components/palm-oil/view";

export const metadata: Metadata = {
  title: "Huilerie de palme · Jumeau numérique 3D | STEAM VALUE™",
  description: "Explorez une usine d’huile de palme en 3D : réception, stérilisation, égrappage, pressage, clarification et stockage. Démonstration interactive avec données simulées.",
};

/**
 * The view is resolved on the server so the first paint is the requested one.
 * Every demo entry lands in the 3D plant: a bare `/demo`, `?view=3d` and any
 * unknown value all open 3D. Only an explicit `?view=dashboard` opens the 2D
 * dashboard. Refreshing or sharing the URL keeps the view.
 */
export default async function DemoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return <PalmOilDemo initialView={parseDemoView(params.view) ?? "3d"} />;
}
