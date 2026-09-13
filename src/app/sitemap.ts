import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Public pages only: /demo/embed is an iframe target marked noindex.
const PAGES = ["/", "/features", "/about", "/blog", "/demo", "/demo/compressor", "/monitor-production"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(path => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
