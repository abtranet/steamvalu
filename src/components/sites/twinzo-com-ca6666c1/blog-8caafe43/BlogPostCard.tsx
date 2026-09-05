import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "./data";

export function BlogPostCard({ post }: { post: BlogPost }) {
  const href = `/blog-post/${post.slug}`;

  return (
    <article className="flex flex-col items-center gap-6 rounded-[20px] bg-white px-2.5 text-center sm:items-stretch sm:text-left">
      <Link href={href} className="block w-full">
        <div className="relative aspect-[16/10] w-full max-w-[280px] overflow-hidden rounded-[20px] bg-white sm:max-w-none">
          <Image
            src={post.image}
            alt={post.imageAlt}
            fill
            sizes="(max-width: 767px) 96vw, (max-width: 991px) 45vw, 640px"
            className="object-cover"
          />
        </div>
      </Link>

      <div className="flex w-full max-w-[80%] flex-col gap-1 pt-2.5 sm:max-w-none">
        <h3 className="text-2xl leading-tight font-bold tracking-[-0.04em] text-black md:text-[28.8px]">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="text-lg leading-relaxed text-black">{post.excerpt}</p>
        <p className="mt-1 text-base text-[#808080]">{post.date}</p>
        <Link
          href={href}
          className="mb-5 mt-1 flex h-10 w-[180px] items-center justify-center self-center rounded-full bg-black px-[15px] text-lg text-white transition-colors duration-300 hover:bg-brand hover:text-brand-foreground sm:self-start"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
