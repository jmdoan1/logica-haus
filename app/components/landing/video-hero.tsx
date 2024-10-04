"use client";
import { useEffect } from "react";
import "./video-hero.css";

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
  }, []);

  return (
    <div className="video-background-container">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
        id={src}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {children}
    </div>
  );
}
