import Responsive from "./responsive";
import Swatch from "./swatch";
import "./why.css";

export default function Why() {
  return (
    <section className="w-container">
      <div className="w-inner-container">
        <h1 className="why">Why choose us?</h1>
        <br />
        <div className="benefit left-first">
          <div
            className="c-left"
            style={{ justifyContent: "center", overflowX: "clip" }}
          >
            <Responsive />
          </div>
          <div className="c-right column">
            <h2 className="h2">Reach your audience on any platform</h2>
            <br />
            <p style={{ textAlign: "justify" }}>
              We specialize in fully responsive hybrid applications, which means
              a single codebase can deliver a website, iOS app, Android app, and
              more. This approach not only guarantees a seamless and beautiful
              experience on any screen size but also accelerates your time to
              market. Whether you're launching a new product or expanding an
              existing one, hybrid applications offer the best way to maximize
              reach and engage your audience across all platforms.
            </p>
          </div>
        </div>
        <br />
        <div className="benefit right-first">
          <div className="c-left column" style={{ padding: 0 }}>
            <h2 className="h2">Deliver Unmatched Performance</h2>
            <br />
            <p style={{ textAlign: "justify" }}>
              Looking for a more powerful user experience? We also offer native
              applications with unparalleled performance and deep integration
              with platform-specific features, providing a seamless user
              experience across iOS, Android, macOS, and Windows. By leveraging
              the full capabilities of each operating system, native apps
              deliver faster load times, smoother interactions, and access to
              advanced functionalities that cross-platform solutions haven't yet
              caught up to. Whether you're aiming to create a robust mobile app
              or a powerful desktop application, building natively ensures that
              your product is optimized for the platform, offering your users
              the highest level of performance and reliability.
            </p>
          </div>
          <div
            className="c-right"
            style={{
              justifyContent: "center",
              overflowX: "clip",
              padding: 0,
            }}
          >
            <Swatch />
          </div>
        </div>
      </div>
    </section>
  );
}
