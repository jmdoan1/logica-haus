"use client";
import { useEffect } from "react";
import "./video-hero.css";
import AnimatedBackground from "./animated-background";

export default function VideoHero({
  children,
  src,
  speed,
}: {
  children: React.ReactNode;
  src: string;
  speed?: number;
}) {
  useEffect(() => {
    const video = document.getElementById(src) as HTMLVideoElement;
    if (video && speed !== undefined) {
      video.playbackRate = speed;
    } else {
    }

    const letters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");

    function hack(element: HTMLElement) {
      let iterations = 0;

      const interval = setInterval(() => {
        element.innerText = element.dataset.value
          ?.split("")
          .map((_, index) => {
            if (index < iterations) {
              return element.dataset.value![index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("") as string;

        if (iterations >= element.innerText.length) {
          clearInterval(interval);
        }

        iterations += 0.5;
      }, 30);
    }

    document.querySelectorAll(".hacker").forEach((element) => {
      element.addEventListener("mouseover", () => hack(element as HTMLElement));

      // Intersection observer logic
      if (
        window.getComputedStyle(element).opacity === "0" &&
        element instanceof HTMLElement
      ) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              element.style.opacity = "1";
              hack(element);
              observer.unobserve(element);
            }
          });
        });

        if (element.classList.contains("wait")) {
          setTimeout(() => {
            observer.observe(element);
            element.classList.remove("wait");
          }, 3000);
        } else {
          observer.observe(element);
        }
      }
    });
  }, []);

  return (
    <div className="video-background-container">
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
        id={src}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
      <AnimatedBackground>{children}</AnimatedBackground>
    </div>
  );
}
