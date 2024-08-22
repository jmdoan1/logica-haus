import { BlogPosts } from "app/components/posts";
import "./page.css";
import VideoHero from "./components/video-hero";
import Script from "next/script";
import Why from "./components/why";

export default function Page() {
  return (
    <>
      <style>{`
        html {
          overflow-x: hidden;
        }
        body {
          max-width: unset;
        }
        aside {
          margin-left: 9%;
          color: white;
        }
        @media (max-width: 820px) {
          aside {
            margin-left: 0;
          }
        }
      `}</style>
      <Script src="../hacker.js" strategy="afterInteractive" />
      <section>
        {/* <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1> */}
        <div style={{ marginTop: -120 }} />
        <VideoHero src="/assets/landing/into-the-grid.mp4">
          <div
            className="content hero-bottom-right"
            style={{ textAlign: "right" }}
          >
            <h1 className="logica-haus hacker " data-value="LogicaHaus">
              LogicaHaus
            </h1>
            <p
              className="sub-logica  hacker wait"
              data-value="The logical home for your technical solutions"
              style={{ opacity: 0 }}
            >
              The logical home for your technical solutions
            </p>
          </div>
          <img
            src="/assets/logo/logo-1-light-no-bg.svg"
            className="content logo 2"
          />
        </VideoHero>
        <Why />
        <p className="mb-4">{`wip`}</p>
        <div className="my-8">
          <BlogPosts />
        </div>
        <div style={{ height: 1000 }} />
      </section>
    </>
  );
}
