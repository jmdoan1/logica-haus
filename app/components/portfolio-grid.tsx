import "./portfolio-grid.css";

interface Project {
  name: string;
  slug: string;
}

export default function PortfolioGrid() {
  const projects: Project[] = [
    {
      name: "Trivia Pal",
      slug: "trivia-pal",
    },
    {
      name: "Spirated",
      slug: "spirated",
    },
    {
      name: "iOS SDK",
      slug: "ios-sdk",
    },
  ];

  return (
    <section>
      <div className="grid">
        {projects.map(({ name, slug }) => (
          <a href={`/projects/${slug}`} className="item" key={slug}>
            <img alt={slug} src={`assets/projects/${slug}/preview.png`} />
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
