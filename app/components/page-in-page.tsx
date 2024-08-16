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
  const [didFirstLoad, setDidFirstLoad] = useState(false);

  const captureVisibleWindow = useDebouncedCallback(async () => {
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    html2canvas(document.getElementById("canvas") ?? document.body, {
      backgroundColor: null,
      width:
        document.getElementById("canvas")?.clientWidth ?? window.innerWidth,
      height: document.body.clientHeight,
      scrollX: -scrollX,
      scrollY: -scrollY,
    }).then((canvas) => {
      setImageSrc(canvas.toDataURL("image/png"));
      if (!didFirstLoad) {
        setDidFirstLoad(true);
        captureVisibleWindow();
      }
    });
  }, 300);

  useEffect(() => {
    captureVisibleWindow();

    window.addEventListener("resize", captureVisibleWindow);

    return () => {
      window.removeEventListener("resize", captureVisibleWindow);
    };
  }, []);

  return imageSrc ? (
    <img src={imageSrc} alt={alt ?? "Live View"} {...rest} />
  ) : null;
};

export default PageInPage;
