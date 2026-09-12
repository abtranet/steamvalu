import type { Metadata } from "next";
import { BlogHero } from "@/components/sites/steam-value/blog-8caafe43/BlogHero";
import { BlogPostGrid } from "@/components/sites/steam-value/blog-8caafe43/BlogPostGrid";

export const metadata: Metadata = {
  "title": "Ressources | STEAM VALUE™",
  "description": "De la donnée isolée à l’intelligence du système."
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogPostGrid />
    </>
  );
}
