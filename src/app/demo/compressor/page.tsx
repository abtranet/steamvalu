import type { Metadata } from "next";
import { CompressorDemo } from "@/components/demos/CompressorDemo";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("compressor");

export default function CompressorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("compressor")} />
      <CompressorDemo />
    </>
  );
}
