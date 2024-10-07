import { githubUrl } from "app/global";
import PageInPage from "./page-in-page";
import "./portfolio-grid.css";

interface Project {
  name: string;
  slug: string;
  scale: number;
  rotate?: number;
}

export const projects: Project[] = [
  {
    name: "ScenePin",
    slug: "scenepin",
    scale: 1.45,
  },
  {
    name: "Spirated",
    slug: "spirated",
    scale: 1.45,
    rotate: 10,
  },
  {
    name: "KeepAwayk",
    slug: "keepawayk",
    scale: 1,
  },
  {
    name: "Mileage Quest",
    slug: "mileage-quest",
    scale: 1.65,
  },
  {
    name: "iOS SDK",
    slug: "ios-sdk",
    scale: 1.55,
  },
  {
    name: "Trivia Pal",
    slug: "trivia-pal",
    scale: 1.75,
    rotate: 10,
  },
  {
    name: "Basket Counter",
    slug: "basket-counter",
    scale: 1.7,
  },
  {
    name: "Dashr",
    slug: "dashr",
    scale: 1.7,
  },
  {
    name: "HiLo",
    slug: "hilo",
    scale: 1.7,
  },
  {
    name: "Memboard",
    slug: "memboard",
    scale: 1.7,
  },
  {
    name: "WatchFlippers",
    slug: "watchflippers",
    scale: 1.7,
  },
  {
    name: "Pharmacy Quotes",
    slug: "pharmacy-quotes",
    scale: 1.7,
  },
  {
    name: "MPG Tracker",
    slug: "mpg-tracker",
    scale: 1.7,
  },
  {
    name: "QwickWeights",
    slug: "qwickweights",
    scale: 1.7,
  },
  {
    name: "Swipper",
    slug: "swipper",
    scale: 1.7,
  },
];

interface Props {
  ignoreProject?: string;
}

export default function PortfolioGrid({ ignoreProject }: Props) {
  return (
    <section>
      <div className="grid">
        <a
          href={githubUrl}
          className="item"
          key={"this-website"}
          target="_blank"
          rel="noopener noreferrer"
        >
          <PageInPage
            className="pip"
            style={{ objectFit: "cover", objectPosition: "50% 0%" }}
          />
          <p>THIS WEBSITE</p>
        </a>
        {projects
          .filter((x) => x.slug !== ignoreProject)
          .map(({ name, slug, scale, rotate }) => (
            <a href={`/projects/${slug}`} className="item" key={slug}>
              <img
                alt={slug}
                src={`assets/projects/${slug}/preview.png`}
                style={{
                  transform: `scale(${scale}) ${
                    rotate ? `rotate(${rotate}deg)` : ""
                  }`,
                }}
              />
              <p>{name.toUpperCase()}</p>
            </a>
          ))}
      </div>
    </section>
  );
}
