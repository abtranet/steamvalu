import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  blogPosts,
  getPostBySlug,
  getRelatedPosts,
  isIndexable,
} from "@/components/sites/steamvalu/blog-8caafe43/data";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/schema";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const canonical = `/blog-post/${post.slug}`;
  const indexable = isIndexable(post);

  return {
    title: post.title,
    description: post.excerpt.slice(0, 158),
    alternates: { canonical },
    // Excerpt-only posts stay crawlable and keep passing link equity, but are
    // withheld from the index until they carry a real article body.
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(post.date).toISOString(),
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post.slug);
  const published = new Date(post.date);

  return (
    <>
      <JsonLd
        data={blogPostingSchema({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          image: post.image,
          datePublished: published.toISOString(),
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog-post/${post.slug}` },
        ])}
      />

      <article className="pt-[140px] pb-24 md:pt-[160px]">
        <div className="mx-auto max-w-[720px] px-6">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-black/50">
            <Link href="/" className="hover:text-black">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-black">
              Blog
            </Link>
          </nav>

          <h1 className="text-[32px] leading-[1.15] font-bold tracking-[-0.04em] text-black md:text-[48px]">
            {post.title}
          </h1>

          <time
            dateTime={published.toISOString()}
            className="mt-4 block text-base text-[#808080]"
          >
            {post.date}
          </time>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[20px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(max-width: 768px) 92vw, 720px"
              className="object-cover"
              preload
            />
          </div>

          <p className="mt-8 text-xl leading-relaxed text-black">
            {post.excerpt}
          </p>

          {post.body?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="mt-6 text-lg leading-relaxed text-black/80"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-black/10 py-16">
          <div className="mx-auto max-w-[1132px] px-6">
            <h2 className="mb-8 text-[26px] font-bold tracking-[-0.04em] text-black">
              Keep reading
            </h2>
            <ul className="grid gap-8 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog-post/${item.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[16px]">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 92vw, 360px"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-black group-hover:underline">
                      {item.title}
                    </h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
