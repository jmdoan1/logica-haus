import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export function BlogPage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">
        Blog Posts
      </h1>
      <BlogPosts />
    </section>
  );
}

export default function Page() {
  return <BlogPage />;
}
