import "./portfolio-grid.css";

export default function PortfolioGrid() {
  return (
    <section>
      <div className="grid">
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
