import type { Metadata } from "next";
import { BlogHero } from "@/components/sites/steam-value/blog-8caafe43/BlogHero";
import { BlogPostGrid } from "@/components/sites/steam-value/blog-8caafe43/BlogPostGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("blog");

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("blog")} />
      <BlogHero />
      <BlogPostGrid />
    </>
  );
}
