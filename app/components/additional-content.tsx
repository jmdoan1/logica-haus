import "./additional-content.css";
import PortfolioGrid from "./portfolio-grid";
import { BlogPosts } from "./posts";

interface Props {
  ignoreSection?: "projects" | "blog";
  ignoreProject?: string;
}

export default function AdditionalContent({
  ignoreSection,
  ignoreProject,
}: Props) {
  return (
    <div>
      {/* <div className="container"> */}
      {ignoreSection !== "projects" ? (
        <>
          <h1 className="h1" style={{ textAlign: "left", marginTop: 20 }}>
            Projects
          </h1>
          <PortfolioGrid ignoreProject={ignoreProject} />
        </>
      ) : null}
      {ignoreSection !== "projects" ? (
        <>
          <h1 className="h1" style={{ textAlign: "left", marginTop: 20 }}>
            Blog Posts
          </h1>
          <div style={{ height: 25 }} />
          <BlogPosts />
        </>
      ) : null}
    </div>
  );
}
