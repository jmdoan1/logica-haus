import Responsive from "./responsive";
import Swatch from "./swatch";
import "./why.css";

export default function Why() {
  return (
    <section className="w-container">
      <div className="w-inner-container">
        <h1 className="why">Why choose us?</h1>
        <br />
        <div className="benefit">
          <div className="c-left">
            <Responsive />
          </div>
          <div className="c-right column">
            <h2 className="h2">Reach your audience on any platform</h2>
            <br />
            <p>
              We specialize in fully responsive hybrid applications, which means
              a single codebase can deliver a website, iOS app, Android app, and
              more. This approach not only guarantees a beautiful, seamless
              experience on any screen size but also accelerates your time to
              market. Whether you're launching a new product or expanding an
              existing one, hybrid applications offer the best way to maximize
              reach and engage your audience across all pltforms.
            </p>
          </div>
        </div>
        <div className="benefit">
          <div className="c-left column">
            <h2 className="h2">hello</h2>
            <p>hey there</p>
          </div>
          <div className="c-right" style={{ justifyContent: "center" }}>
            <Swatch />
          </div>
        </div>
        <div className="benefit">
          <div className="c-left" style={{ justifyContent: "center" }}>
            <Swatch />
          </div>
          <div className="c-right column">
            <h2 className="h2">hello</h2>
            <p>hey there</p>
          </div>
        </div>
      </div>
    </section>
  );
}
