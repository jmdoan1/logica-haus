// components/AnimatedBackground.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, Circ } from "gsap";
import "./animated-background.css"; // Ensure this CSS file exists and is properly styled

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  speed?: number;
}

interface Point {
  x: number;
  originX: number;
  y: number;
  originY: number;
  closest?: Point[];
  circle?: Circle;
  active?: number;
}

class Circle {
  pos: Point;
  radius: number;
  color: string;
  active: number;

  constructor(pos: Point, rad: number, color: string) {
    this.pos = pos || { x: 0, originX: 0, y: 0, originY: 0 };
    this.radius = rad || 0;
    this.color = color || "rgba(255,255,255,0.3)";
    this.active = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.active === 0) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(156,217,249,${this.active})`;
    ctx.fill();
  }
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  speed = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const largeHeaderRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [height, setHeight] = useState<number>(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const pointsRef = useRef<Point[]>([]);
  const targetRef = useRef<{ x: number; y: number }>({
    x: typeof window !== "undefined" ? window.innerWidth / 2 : 0,
    y: typeof window !== "undefined" ? window.innerHeight / 2 : 0,
  });
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !largeHeaderRef.current) return;

    let animateHeader = true;

    // Initialize Header and Points
    const initHeader = () => {
      largeHeaderRef.current!.style.height = `${height}px`;

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
      }

      // Create points
      const points: Point[] = [];
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          const px = x + (Math.random() * width) / 20;
          const py = y + (Math.random() * height) / 20;
          const p: Point = { x: px, originX: px, y: py, originY: py };
          points.push(p);
        }
      }

      // Find the 5 closest points for each point
      for (let i = 0; i < points.length; i++) {
        const closest: Point[] = [];
        const p1 = points[i];
        for (let j = 0; j < points.length; j++) {
          const p2 = points[j];
          if (p1 === p2) continue;

          if (closest.length < 5) {
            closest.push(p2);
          } else {
            let maxDistance = -1;
            let maxIndex = -1;
            for (let k = 0; k < closest.length; k++) {
              const distance = getDistance(p1, closest[k]);
              if (distance > maxDistance) {
                maxDistance = distance;
                maxIndex = k;
              }
            }
            const currentDistance = getDistance(p1, p2);
            if (currentDistance < maxDistance) {
              closest[maxIndex] = p2;
            }
          }
        }
        p1.closest = closest;
      }

      // Assign a circle to each point
      for (let i = 0; i < points.length; i++) {
        const c = new Circle(
          points[i],
          2 + Math.random() * 2,
          "rgba(255,255,255,0.3)"
        );
        points[i].circle = c;
      }

      pointsRef.current = points;
    };

    // Event handling
    const addListeners = () => {
      if (!("ontouchstart" in window)) {
        window.addEventListener("mousemove", mouseMove);
      }
      window.addEventListener("scroll", scrollCheck);
      window.addEventListener("resize", resize);
    };

    const removeListeners = () => {
      if (!("ontouchstart" in window)) {
        window.removeEventListener("mousemove", mouseMove);
      }
      window.removeEventListener("scroll", scrollCheck);
      window.removeEventListener("resize", resize);
    };

    const mouseMove = (e: MouseEvent) => {
      let posx = 0,
        posy = 0;
      if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
      } else if (e.clientX || e.clientY) {
        posx =
          e.clientX +
          (document.body.scrollLeft || document.documentElement.scrollLeft);
        posy =
          e.clientY +
          (document.body.scrollTop || document.documentElement.scrollTop);
      }
      targetRef.current.x = posx;
      targetRef.current.y = posy;
    };

    const scrollCheck = () => {
      if (
        document.body.scrollTop > height ||
        document.documentElement.scrollTop > height
      )
        animateHeader = false;
      else animateHeader = true;
    };

    const resize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      initHeader();
      initAnimation();
    };

    // Animation
    const initAnimation = () => {
      animate();
      for (let i = 0; i < pointsRef.current.length; i++) {
        shiftPoint(pointsRef.current[i]);
      }
    };

    const animate = () => {
      if (animateHeader) {
        const ctx = canvasRef.current!.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < pointsRef.current.length; i++) {
          const p = pointsRef.current[i];
          // Detect points in range
          const distance = getDistance(targetRef.current, p);
          if (distance < 4000) {
            p.active = 0.3;
            p.circle!.active = 0.6;
          } else if (distance < 20000) {
            p.active = 0.1;
            p.circle!.active = 0.3;
          } else if (distance < 40000) {
            p.active = 0.02;
            p.circle!.active = 0.1;
          } else {
            p.active = 0;
            p.circle!.active = 0;
          }

          drawLines(p, ctx);
          p.circle!.draw(ctx);
        }
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const shiftPoint = (p: Point) => {
      gsap.to(p, 1 + 1 * Math.random(), {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        ease: Circ.easeInOut,
        onComplete: () => {
          shiftPoint(p);
        },
      });
    };

    // Canvas manipulation
    const drawLines = (p: Point, ctx: CanvasRenderingContext2D) => {
      if (!p.active) return;
      for (let i = 0; i < p.closest!.length; i++) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.closest![i].x, p.closest![i].y);
        ctx.strokeStyle = `rgba(156,217,249,${p.active})`;
        ctx.stroke();
      }
    };

    // Util
    const getDistance = (
      p1: { x: number; y: number },
      p2: { x: number; y: number }
    ) => {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    };

    // Initialize everything
    initHeader();
    initAnimation();
    addListeners();

    // Cleanup on unmount
    return () => {
      removeListeners();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Kill all tweens related to points
      gsap.killTweensOf(pointsRef.current);
    };
  }, [width, height, speed]);

  return (
    <div
      id="large-header"
      ref={largeHeaderRef}
      className="video-background-container"
    >
      <canvas id="hero-canvas" ref={canvasRef}></canvas>
      {children}
    </div>
  );
};

export default AnimatedBackground;
