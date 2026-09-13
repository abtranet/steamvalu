import type { MetadataRoute } from "next";
import {
  blogPosts,
  isIndexable,
} from "@/components/sites/steamvalu/blog-8caafe43/data";
import { absoluteUrl } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

const staticRoutes: ReadonlyArray<{
  path: string;
  changeFrequency: Entry["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/features", changeFrequency: "monthly", priority: 0.9 },
  { path: "/monitor-production", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/about", changeFrequency: "yearly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    })),
    // Excerpt-only posts are noindex, so they stay out of the sitemap too.
    ...blogPosts.filter(isIndexable).map((post) => ({
      url: absoluteUrl(`/blog-post/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
