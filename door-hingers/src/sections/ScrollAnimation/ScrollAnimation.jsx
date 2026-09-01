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

/* ─── Component ─────────────────────────────────────────────────────── */
export default function ScrollAnimation() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [visibleFrame, setVisibleFrame] = useState(0);

  /* Pre-load every frame into an HTMLImageElement for canvas drawing */
  useEffect(() => {
    let loaded = 0;
    const images = new Array(TOTAL);

    frameSrcs.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        setLoadProgress(loaded / TOTAL);
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

  /* Scroll handler — maps section scroll progress to frame index */
  useEffect(() => {
    if (!allLoaded) return;

    // Draw first frame immediately
    resizeCanvas();

    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollableHeight = section.offsetHeight - window.innerHeight;
        if (scrollableHeight <= 0) return;

        // Progress 0→1 as the section scrolls through
        const progress = Math.min(
          Math.max(-rect.top / scrollableHeight, 0),
          1
        );

        const frameIndex = Math.min(
          Math.floor(progress * TOTAL),
          TOTAL - 1
        );

        if (frameIndex !== currentFrameRef.current) {
          currentFrameRef.current = frameIndex;
          setVisibleFrame(frameIndex);
          drawFrame(frameIndex);
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resizeCanvas);
    onScroll(); // initial position

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(rafId);
    };
  }, [allLoaded, drawFrame, resizeCanvas]);

  return (
    <section
      ref={sectionRef}
      id="scroll-animation"
      className="relative bg-ink"
      /* Shorter scroll runway → faster animation */
      style={{ height: `${TOTAL * 40}vh` }}
    >
      {/* Sticky viewport — fills the screen while we scroll through */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Loading indicator */}
        {!allLoaded && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-ink">
            <div className="relative w-48 h-1 rounded-full bg-white/10 overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-red rounded-full transition-all duration-300"
                style={{ width: `${loadProgress * 100}%` }}
              />
            </div>
            <span className="plate-number text-steel text-xs tracking-widest uppercase">
              Loading frames… {Math.round(loadProgress * 100)}%
            </span>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            opacity: allLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />

        {/* Subtle top/bottom gradient vignette to blend into ink background */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />

        {/* Scroll progress indicator */}
        {allLoaded && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1 z-10">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-200"
                style={{
                  width: i === visibleFrame ? 6 : 3,
                  height: i === visibleFrame ? 6 : 3,
                  backgroundColor:
                    i === visibleFrame
                      ? "var(--color-red)"
                      : "rgba(255,255,255,0.2)",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
