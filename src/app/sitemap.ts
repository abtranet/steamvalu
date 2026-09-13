import type { MetadataRoute } from "next";
import { PAGE_SEO } from "@/lib/seo-pages";
import { SITE_URL } from "@/lib/site";

// Public pages only: /demo/embed is an iframe target marked noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return Object.values(PAGE_SEO).map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
