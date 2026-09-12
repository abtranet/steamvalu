import type { Metadata } from "next";
import { PalmOilDemo } from "@/components/palm-oil/PalmOilDemo";

export const metadata: Metadata = {
  title: "Huilerie de palme · Démo intégrée | STEAM VALUE™",
  robots: { index: false, follow: false },
};

export default function EmbeddedPlantDemo() {
  return <PalmOilDemo embedded />;
}
