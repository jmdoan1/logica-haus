"use client";

import {
  useState,
  useEffect,
  DetailedHTMLProps,
  ImgHTMLAttributes,
} from "react";
import { useDebouncedCallback } from "@mantine/hooks";
import html2canvas from "html2canvas";

const PageInPage = ({
  alt,
  ...rest
}: Omit<
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>,
  "src"
>) => {
  const [imageSrc, setImageSrc] = useState("");

  const captureVisibleWindow = useDebouncedCallback(async () => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // html2canvas(document.getElementById("html") ?? document.body, {
    html2canvas(document.getElementById("canvas") ?? document.body, {
      backgroundColor: null,
      width:
        document.getElementById("canvas")?.clientWidth ?? window.innerWidth,
      height: window.innerHeight,
      scrollX: -scrollX,
      scrollY: -scrollY,
    }).then((canvas) => {
      setImageSrc(canvas.toDataURL("image/png"));
    });
  }, 300);

  useEffect(() => {
    captureVisibleWindow();

    window.addEventListener("scroll", captureVisibleWindow);
    window.addEventListener("resize", captureVisibleWindow);

    return () => {
      window.removeEventListener("scroll", captureVisibleWindow);
      window.removeEventListener("resize", captureVisibleWindow);
    };
  }, []);

  return imageSrc ? (
    <img src={imageSrc} alt={alt ?? "Live View"} {...rest} />
  ) : null;
};

export default PageInPage;