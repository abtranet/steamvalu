import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "./data";

export function BlogPostCard({ post }: { post: BlogPost }) {
  const href = post.href;

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

      <div className="flex w-full max-w-[80%] flex-1 flex-col gap-2 pt-2.5 sm:max-w-none">
        <p className="sv-eyebrow">{post.theme}</p>
        <h3 className="text-2xl leading-tight font-bold tracking-[-0.04em] text-black md:text-[28.8px]">
          <Link href={href}>{post.title}</Link>
        </h3>
        <p className="text-lg leading-relaxed text-black">{post.excerpt}</p>
        <Link
          href={href}
          className="mt-auto flex h-11 w-[180px] items-center justify-center self-center rounded-full bg-black px-[15px] text-base font-semibold text-white transition-colors duration-300 hover:bg-brand hover:text-brand-foreground sm:self-start"
        >
            Découvrir
          </Link>
      </div>
    </article>
  );
}
