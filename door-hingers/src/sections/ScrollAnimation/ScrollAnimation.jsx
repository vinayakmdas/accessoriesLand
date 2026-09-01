import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Eagerly import all 20 frames via Vite glob ───────────────────── */
const frameModules = import.meta.glob(
  "../../assets/scrolling_animation/frame_*.png",
  { eager: true, import: "default" }
);

// Sort numerically so frame_001 < frame_002 < … < frame_020
const frameSrcs = Object.keys(frameModules)
  .sort((a, b) => {
    const numA = parseInt(a.match(/frame_(\d+)/)?.[1] || "0", 10);
    const numB = parseInt(b.match(/frame_(\d+)/)?.[1] || "0", 10);
    return numA - numB;
  })
  .map((key) => frameModules[key]);

const TOTAL = frameSrcs.length; // 20
const FRAME_DURATION = 120; // ms per frame (~8fps — smooth cinematic feel)

/* ─── Component ─────────────────────────────────────────────────────── */
export default function ScrollAnimation() {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const directionRef = useRef(1); // 1 = forward, -1 = reverse (ping-pong)
  const [allLoaded, setAllLoaded] = useState(false);

  /* Pre-load every frame into an HTMLImageElement for canvas drawing */
  useEffect(() => {
    let loaded = 0;
    const images = new Array(TOTAL);

    frameSrcs.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === TOTAL) {
          imagesRef.current = images;
          setAllLoaded(true);
        }
      };
      images[i] = img;
    });
  }, []);

  /* Draw a frame onto the canvas, covering the full area */
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!ctx || !img) return;

    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // "object-fit: cover" math
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;
    let sx, sy, sw, sh;
    if (imgRatio > canvasRatio) {
      sh = img.naturalHeight;
      sw = sh * canvasRatio;
      sx = (img.naturalWidth - sw) / 2;
      sy = 0;
    } else {
      sw = img.naturalWidth;
      sh = sw / canvasRatio;
      sx = 0;
      sy = (img.naturalHeight - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);
  }, []);

  /* Resize canvas to match its CSS size (retina-aware) */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  /* Auto-play animation loop — ping-pong through frames like a video */
  useEffect(() => {
    if (!allLoaded) return;

    resizeCanvas();

    const intervalId = setInterval(() => {
      const frame = currentFrameRef.current;
      const dir = directionRef.current;

      // Calculate next frame with ping-pong bounce
      const nextFrame = frame + dir;
      if (nextFrame >= TOTAL - 1) {
        directionRef.current = -1;
        currentFrameRef.current = TOTAL - 1;
      } else if (nextFrame <= 0) {
        directionRef.current = 1;
        currentFrameRef.current = 0;
      } else {
        currentFrameRef.current = nextFrame;
      }

      drawFrame(currentFrameRef.current);
    }, FRAME_DURATION);

    window.addEventListener("resize", resizeCanvas);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [allLoaded, drawFrame, resizeCanvas]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="hero-animation-canvas"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        opacity: allLoaded ? 1 : 0,
        transition: "opacity 0.8s ease",
        pointerEvents: "none",
      }}
    />
  );
}
