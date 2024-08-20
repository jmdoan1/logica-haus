import "./additional-content.css";
import { BlogPosts } from "./posts";

export default function AdditionalContent() {
  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <div style={{ height: 25 }} />
      <BlogPosts />
    </div>
  );
}
