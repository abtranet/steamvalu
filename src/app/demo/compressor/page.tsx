import type { Metadata } from "next";
import { CompressorDemo } from "@/components/demos/CompressorDemo";

export const metadata: Metadata = {
  title: "Compresseur C-02 · Démo interactive | STEAM VALUE™",
  description: "Inspectez le compresseur C-02, faites varier sa charge et explorez les vues thermique et éclatée sur des données simulées.",
};

export default function CompressorPage() {
  return <CompressorDemo />;
}
