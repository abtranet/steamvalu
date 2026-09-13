import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { BlogHero } from "@/components/sites/steamvalu/blog-8caafe43/BlogHero";
import { BlogPostGrid } from "@/components/sites/steamvalu/blog-8caafe43/BlogPostGrid";

export const metadata: Metadata = {
  title: "Digital Twin & Industry 4.0 Blog",
  description:
    "Expert guides on digital twins, RTLS, indoor tracking and Industry 4.0. Practical how-tos for factory and warehouse teams, updated weekly.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Digital Twin & Industry 4.0 Blog | SteamValu",
    description:
      "Expert guides on digital twins, RTLS, indoor tracking and Industry 4.0 for factory and warehouse teams.",
  },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />
      <BlogHero />
      <BlogPostGrid />
    </>
  );
}
