import type { Metadata } from "next";
import { PalmOilDemo } from "@/components/palm-oil/PalmOilDemo";
import { parseDemoView } from "@/components/palm-oil/view";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("demo");

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
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("demo")} />
      <PalmOilDemo initialView={parseDemoView(params.view) ?? "3d"} />
    </>
  );
}
