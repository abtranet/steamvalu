import { blogPosts } from "./data";
import { BlogPostCard } from "./BlogPostCard";

export function BlogPostGrid() {
  return (
    <section className="sv-blog-grid -mt-24 rounded-t-[24px] bg-white pt-16 pb-24 md:-mt-32 md:pt-20 lg:-mt-36 lg:pt-24">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-6 sm:px-7 md:grid-cols-2 md:gap-x-12 md:gap-y-16 lg:gap-x-12">
        {blogPosts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
