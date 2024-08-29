import Booknow from "../book-now";
import ApiAnim from "./api-anim";
import Data from "./data";
import Responsive from "./responsive";
import Scroller from "./scroller";
import Swatch from "./swatch";
import "./why.css";

export default function Why() {
  return (
    <section className="w-container">
      <div className="w-inner-container">
        <h1 className="h1">Why choose us?</h1>
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

        <h1 className="h1 shrink" style={{ textAlign: "left" }}>
          What kinds of projects do we take?
        </h1>
        <p>
          At LogicaHaus, we’re passionate about bringing your ideas to life,
          whether you’re starting from scratch or looking to enhance an existing
          project. We work with both individual clients and businesses of all
          sizes, delivering custom solutions tailored to your unique needs.
        </p>
        <ul className={"list-disc list-inside"}>
          <li>
            <b>New Projects:</b> Ready to turn your vision into reality? We
            specialize in launching new projects, from initial concept to final
            product. Whether it's a cutting-edge frontend website, a
            feature-rich mobile app, or a complex backend API, we’re here to
            guide you every step of the way.
          </li>
          <li>
            <b>Existing Projects:</b> Have an existing project that needs some
            love? We’re experts at stepping in and enhancing your current
            systems, optimizing performance, adding new features, and ensuring
            your technology stack is up-to-date and scalable.
          </li>
          <li>
            <b>Frontend & Backend Development:</b> From sleek, responsive
            websites and mobile apps to robust backend systems and APIs, we
            cover the full spectrum of development. We create user-friendly
            interfaces that engage your audience and powerful backends that
            drive your applications.
          </li>
          <li>
            <b>Databases:</b> Data is the backbone of any modern application. We
            design, implement, and manage scalable databases that ensure your
            data is secure, accessible, and well-organized.
          </li>
          <li>
            <b>Desktop Applications & Automation:</b> Need a desktop solution or
            automation tools? We develop custom desktop applications and scripts
            that streamline your workflow, whether it’s automating routine tasks
            or building powerful standalone software.
          </li>
          <li>
            <b>Bots & Scripts:</b> Efficiency and innovation are at our core. We
            create intelligent bots and automation scripts that handle
            everything from simple tasks to complex workflows, freeing up your
            time to focus on what really matters.
          </li>
        </ul>
        <p style={{ marginTop: 7 }}>
          Whether you’re an individual with a groundbreaking idea or a business
          looking to enhance your digital presence, we’re here to help you
          succeed. Let’s create something amazing together.
        </p>

        <h1 className="h1 shrink" style={{ marginTop: 10 }}>
          Not sure where to start?
        </h1>
        <Scroller />
        <p style={{ textAlign: "center" }}>
          With all the frameworks available these days, countless blog posts,
          and tech evangelists pulling you every which way, it's easy to get
          lost in the sauce.{" "}
          <b>
            <i>
              Deciding on the right technology stack, understanding the best
              practices, and ensuring scalability can feel overwhelming,
            </i>
          </b>{" "}
          especially if you're not deeply entrenched in the tech world.
        </p>
        <p style={{ textAlign: "center", marginTop: 7 }}>
          <b>
            <i>You don't have to navigate these waters alone.</i>
          </b>{" "}
          Whether you're just starting out or need to refine an existing
          project, our expertise can help you cut through the noise and find the
          solution that truly meets your needs.
        </p>
        <p style={{ textAlign: "center", marginTop: 7 }}>
          Let’s simplify the process together.{" "}
          <b>
            <i>Book a free consultation with us today,</i>
          </b>{" "}
          and we'll help you chart the best path forward, ensuring your project
          is built on a solid foundation that aligns with your goals.
        </p>
        <br />
        <Booknow />

        <h1 className="h1 shrink" style={{ marginTop: 10 }}>
          Who are we?
        </h1>
        <p>
          LogicaHaus is a "one-man agency" led by a seasoned professional with
          over a decade of experience across various facets of software
          development. Despite being a solo operation, LogicaHaus leverages a
          robust network of skilled designers and developers to tackle projects
          of any size or complexity. This flexible approach allows us to scale
          our resources to meet your specific needs, whether you're looking for
          the personalized attention of a single freelancer or the comprehensive
          support of a full development team.
        </p>
        <br />
        <p>
          By blending the agility of a freelancer with the collaborative power
          of a broader team, LogicaHaus offers the perfect solution for
          businesses and individuals alike. Whether you're launching a new
          product, enhancing an existing platform, or need ongoing technical
          support, LogicaHaus can adapt to your requirements, delivering
          high-quality results with efficiency and precision.
        </p>
      </div>
    </section>
  );
}
