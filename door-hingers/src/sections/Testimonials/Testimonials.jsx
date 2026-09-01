import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const testimonials = [
  {
    id: 1,
    name: "Arun Kumar",
    vehicle: "Mahindra Thar",
    rating: 5,
    text: "Installed Android stereo and reverse camera. The quality of work is amazing — clean wiring, perfect fit. They really know what they're doing.",
    service: "Android Systems",
  },
  {
    id: 2,
    name: "Fathima Nazeer",
    vehicle: "Hyundai Creta",
    rating: 5,
    text: "Got full interior accessories and ceramic coating done here. My car looks brand new! Very professional team and reasonable pricing.",
    service: "Car Detailing",
  },
  {
    id: 3,
    name: "Rahul Menon",
    vehicle: "Maruti Swift",
    rating: 5,
    text: "Best LED lights installation in Malappuram. The headlights are so much brighter now. Quick service and fair price. Highly recommended!",
    service: "LED & Electrical",
  },
  {
    id: 4,
    name: "Sajith Nair",
    vehicle: "Toyota Innova",
    rating: 5,
    text: "AC was not cooling properly. They diagnosed and fixed it the same day. Gas filling and full service done perfectly. Very satisfied.",
    service: "Car AC & Cooling",
  },
  {
    id: 5,
    name: "Anees Mohammed",
    vehicle: "Kia Seltos",
    rating: 5,
    text: "360 camera and dashcam installed. The camera quality is excellent and the installation is very neat. Will definitely come back for more.",
    service: "Camera & Safety",
  },
];

const AUTOPLAY_MS = 5000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  const goTo = useCallback(
    (next) => {
      setDirection(next > index ? 1 : -1);
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

  const current = testimonials[index];

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section
      className="testimonials-section"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grain-overlay" />
      <div className="testimonials-container">
        <SectionTitle
          eyebrow="Testimonials"
          title="What Our Customers Say"
          subtitle="Real feedback from car owners who trusted us with their vehicles."
        />

        <div className="testimonials-carousel">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={current.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="testimonial-card"
            >
              {/* Quote icon */}
              <div className="testimonial-quote-icon">
                <Quote size={32} />
              </div>

              {/* Stars */}
              <div className="testimonial-stars">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>

              {/* Text */}
              <p className="testimonial-text">"{current.text}"</p>

              {/* Author */}
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {current.name.charAt(0)}
                </div>
                <div>
                  <p className="testimonial-name">{current.name}</p>
                  <p className="testimonial-meta">
                    {current.vehicle} · {current.service}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="testimonial-controls">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="testimonial-arrow"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="testimonial-dots">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`testimonial-dot ${i === index ? "active" : ""}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="testimonial-arrow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
