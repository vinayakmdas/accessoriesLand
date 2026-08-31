import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../components/Button/Button";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";
import { heroImages } from "../../data/heroImages";

const AUTOPLAY_MS = 5000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = heroImages.length;

  const goTo = useCallback(
    (next) => {
      setDirection(next > index || (index === count - 1 && next === 0) ? 1 : -1);
      setIndex(((next % count) + count) % count);
    },
    [index, count]
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

  const variants = {
    enter: (dir) => ({ opacity: 0, scale: 1.06, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, scale: 1.02, x: dir > 0 ? -40 : 40 }),
  };

  return (
    <section
      id="home"
      className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Carousel layer */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={heroImages[index].id}
            src={heroImages[index].image}
            alt={heroImages[index].caption}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
        <div className="grain-overlay" />
      </div>

      {/* Ambient red sweep, signature motion element */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-y-32 -left-1/3 w-1/2 bg-gradient-to-r from-transparent via-red/10 to-transparent rotate-12"
        animate={{ x: ["-10%", "160%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 sm:px-8 flex flex-col justify-center gap-6">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="plate-number text-red text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase"
        >
          Accessories Land — Auto Parts &amp; Car Accessories
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold uppercase leading-[0.95] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-paper max-w-3xl"
        >
          Upgrade <span className="text-red">Your</span> Drive.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-steel-light text-base sm:text-lg max-w-xl"
        >
          Premium auto accessories, advanced car technology, electrical solutions, and
          professional automotive services.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-2"
        >
          <Button as={Link} to="/contact">
            Get a Quote
          </Button>
          <WhatsAppButton message="Hi Accessories Land, I'd like to enquire about your services." />
        </motion.div>
      </div>

      {/* Carousel controls */}
      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-center gap-6">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full border border-white/20 text-paper flex items-center justify-center hover:border-red hover:text-red transition-colors"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
          {heroImages.map((img, i) => (
            <button
              key={img.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className="relative h-1.5 rounded-full bg-white/25 overflow-hidden transition-all duration-300"
              style={{ width: i === index ? 28 : 8 }}
            >
              {i === index && (
                <motion.span
                  key={paused ? "paused" : index}
                  className="absolute inset-0 bg-red"
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
          className="w-9 h-9 rounded-full border border-white/20 text-paper flex items-center justify-center hover:border-red hover:text-red transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
