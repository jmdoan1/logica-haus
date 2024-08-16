import PortfolioGrid from "app/components/portfolio-grid";
import { BlogPosts } from "app/components/posts";
import { BlogPage } from "app/blog/page";

export default function Page() {
  return (
    <>
      <PortfolioGrid />
      <div style={{ height: 50 }} />
      {/* <BlogPage /> */}
    </>
  );
}
