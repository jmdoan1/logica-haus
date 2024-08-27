"use client";

import {
  useState,
  useEffect,
  DetailedHTMLProps,
  ImgHTMLAttributes,
  createRef,
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
  const [imageSrc, setImageSrc] = useState(
    "/assets/logo/logo-1-light-w-bg.svg"
  );
  const [didFirstLoad, setDidFirstLoad] = useState(false);
  const imageRef = createRef<HTMLImageElement>();

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !didFirstLoad) {
          captureVisibleWindow();
        }
      },
      {
        root: null, // viewport
        rootMargin: "-50px 0px 0px 0px", // no margin
        threshold: 0, // 50% of target visible
      }
    );

    const currentImageRef = imageRef.current;

    if (currentImageRef) {
      observer.observe(currentImageRef);
    }

    window.addEventListener("resize", captureVisibleWindow);

    return () => {
      if (currentImageRef) {
        observer.unobserve(currentImageRef);
      }
      window.removeEventListener("resize", captureVisibleWindow);
      observer.disconnect();
    };
  }, [didFirstLoad]);

  return (
    <img ref={imageRef} src={imageSrc} alt={alt ?? "Live View"} {...rest} />
  );
};

export default PageInPage;
