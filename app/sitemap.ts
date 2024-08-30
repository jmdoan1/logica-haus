import { getBlogPosts } from "app/blog/utils";
import { projects } from "./components/portfolio-grid";

export const baseUrl = "https://www.logica.haus";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  let routes = ["", "/blog", "/contact", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs, ...projectUrls];
}
