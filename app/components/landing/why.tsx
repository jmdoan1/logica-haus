import ApiAnim from "./api-anim";
import Data from "./data";
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
            <p className="details">
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
            <p className="details">
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
        <div className="benefit left-first">
          <div
            className="c-left"
            style={{ justifyContent: "center", padding: 5 }}
          >
            <Data />
          </div>
          <div className="c-right column">
            <h2 className="h2">Tackle Your Data</h2>
            <br />
            <p className="details">
              Efficiently managing your data is crucial for any growing
              business. We specialize in developing custom, scalable backends
              and databases tailored to your specific needs. Whether you're
              managing a vast amount of data or need a solution that grows with
              your business, our backends are robust built for and flexibility.
              We ensure that your data infrastructure is not only secure and
              reliable but also optimized for performance, allowing you to focus
              on what matters most—your business. From real-time analytics to
              complex data relationships, we design systems that can handle it
              all, ensuring your operations run smoothly now and in the future.
            </p>
          </div>
        </div>
        <div className="benefit right-first">
          <div className="c-left column" style={{ padding: 0 }}>
            <h2 className="h2">Seamless API Integrations</h2>
            <br />
            <p className="details">
              Whether you need to authenticate users, process payments, get
              shipping updates, or even reference pokedex data, 3rd party APIs
              often lay at the center of your business operations. We ensure
              these integrations are smooth, reliable, and secure, allowing your
              application to connect effortlessly with external services. By
              expertly managing API connections, we help you extend the
              capabilities of your application without the need for extensive
              in-house development, allowing you to focus on your core business
              while leveraging the power of best-in-class third-party services.
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
            <ApiAnim />
          </div>
        </div>
      </div>
    </section>
  );
}
