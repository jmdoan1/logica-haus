import AdditionalContent from "app/components/additional-content";
import PortfolioGrid from "app/components/portfolio-grid";
import { BlogPosts } from "app/components/posts";
import { baseUrl } from "app/sitemap";

export function generateMetadata({ params }) {
  let title = "Projects",
    description = "LogicaHaus Project Portfolio";
  let ogImage =
    // image ? image :
    `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${baseUrl}/projects`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Page() {
  return (
    <>
      <PortfolioGrid />
      <AdditionalContent />
    </>
  );
}
