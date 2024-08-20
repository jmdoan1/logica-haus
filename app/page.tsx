import { BlogPosts } from "app/components/posts";
import "./page.css";
import VideoHero from "./components/video-hero";
import Script from "next/script";

export default function Page() {
  return (
    <>
      <style>{`
        html {
          overflow-x: hidden;
        }
      `}</style>
      <Script src="../hacker.js" strategy="afterInteractive" />
      <section>
        {/* <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        My Portfolio
      </h1> */}
        <div style={{ marginTop: -120 }} />
        <VideoHero src="/assets/landing/into-the-grid.mp4">
          <div className="content hero-top-left">
            <h1 className="logica-haus hacker" data-value="LogicaHaus">
              LogicaHaus
            </h1>
            <p
              className="mt-5 text-2xl font-semibold hacker"
              data-value="The logical home for your technical solutions"
              style={{ opacity: 0 }}
            >
              The logical home for your technical solutions
            </p>
          </div>
          <div
            className="content hero-bottom-right"
            // style={{ width: 250, height: 250 }}
          >
            <img src="/assets/logo/logo-1-light-no-bg.svg" className="logo" />
          </div>
        </VideoHero>
        <p className="mb-4">{`wip`}</p>
        <div className="my-8">
          <BlogPosts />
        </div>
      </section>
    </>
  );
}
