import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../components/Button/Button";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";
import { heroImages } from "../../data/heroImages";

const AUTOPLAY_MS = 6000;
const TRANSITION_DURATION = 1.2; // seconds for crossfade

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = heroImages.length;

  const goTo = useCallback(
    (next) => {
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [next, paused]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="home"
      className="hero-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ─── Layer 1: Full-screen background image carousel ─────────── */}
      <div className="hero-bg-carousel" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="hero-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: TRANSITION_DURATION, ease: "easeInOut" }}
          >
            <motion.img
              src={heroImages[index].image}
              alt={heroImages[index].caption}
              className="hero-slide-img"
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.08 }}
              transition={{
                duration: AUTOPLAY_MS / 1000 + TRANSITION_DURATION,
                ease: "easeOut",
              }}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── Layer 2: Gradient overlays for premium look + readability ─ */}
      <div className="hero-overlay hero-overlay-radial" />
      <div className="hero-overlay hero-overlay-top" />
      <div className="hero-overlay hero-overlay-bottom" />
      <div className="hero-overlay hero-overlay-left" />

      {/* Subtle film-grain texture */}
      <div className="grain-overlay" />

      {/* Ambient red sweep */}
      <motion.div
        aria-hidden="true"
        className="hero-red-sweep"
        animate={{ x: ["-10%", "160%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* ─── Layer 3: Content ──────────────────────────────────────────── */}
      <div className="hero-content">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero-eyebrow plate-number"
        >
          Accessories Land — Auto Parts &amp; Car Accessories
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hero-heading"
        >
          Upgrade <span className="text-red">Your</span> Drive.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="hero-subtext"
        >
          Premium auto accessories, advanced car technology, electrical solutions, and
          professional automotive services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hero-cta-row"
        >
          <Button as={Link} to="/contact">
            Get a Quote
          </Button>
          <WhatsAppButton message="Hi Accessories Land, I'd like to enquire about your services." />
        </motion.div>
      </div>

      {/* ─── Layer 4: Carousel controls ────────────────────────────────── */}
      <div className="hero-controls">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="hero-arrow-btn"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="hero-dots" role="tablist" aria-label="Hero slides">
          {heroImages.map((img, i) => (
            <button
              key={img.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`hero-dot${i === index ? " hero-dot--active" : ""}`}
            >
              {i === index && (
                <motion.span
                  key={paused ? "paused" : index}
                  className="hero-dot-fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="hero-arrow-btn"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
