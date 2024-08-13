import "./portfolio-grid.css";

interface Project {
  name: string;
  slug: string;
  scale?: number;
}

export default function PortfolioGrid() {
  const projects: Project[] = [
    {
      name: "ScenePin",
      slug: "scenepin",
      scale: 1.45,
    },
    {
      name: "Spirated",
      slug: "spirated",
      scale: 1.45,
    },
    {
      name: "Trivia Pal",
      slug: "trivia-pal",
      scale: 1.75,
    },
    {
      name: "iOS SDK",
      slug: "ios-sdk",
      scale: 1.55,
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
      name: "Swipper",
      slug: "swipper",
      scale: 1.7,
    },
  ];

  return (
    <section>
      <div className="grid">
        {projects.map(({ name, slug, scale }) => (
          <a href={`/projects/${slug}`} className="item" key={slug}>
            <img
              alt={slug}
              src={`assets/projects/${slug}/preview.png`}
              style={scale ? { transform: `scale(${scale})` } : {}}
            />
            <div>
              <p>{name.toUpperCase()}</p>
            </div>
          </a>
        ))}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x) => (
          <div className="item" key={x}>
            <img
              src={`https://picsum.photos/500?random=${x}`}
              alt={x.toString()}
            />
            <div>
              <p>Project {x}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
