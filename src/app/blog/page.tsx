import type { Metadata } from "next";
import { BlogHero } from "@/components/sites/twinzo-com-ca6666c1/blog-8caafe43/BlogHero";
import { BlogPostGrid } from "@/components/sites/twinzo-com-ca6666c1/blog-8caafe43/BlogPostGrid";

export const metadata: Metadata = {
  title: "Latest Industry 4.0 Insights & Digital Twin Trends | Twinzo - Digital Twin",
  description:
    "Stay updated with the latest in Digital Twin, logistics, and Industry 4.0. Read expert insights, latest news and trends.",
};

export default function BlogPage() {
  return (
    <>
      <BlogHero />
      <BlogPostGrid />
    </>
  );
}
