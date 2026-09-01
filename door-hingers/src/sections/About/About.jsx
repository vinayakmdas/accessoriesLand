import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2,
  Wrench,
  Shield,
  MapPin,
  Phone,
  Award,
  Sparkles,
} from "lucide-react";
import Button from "../../components/Button/Button";
import { businessConfig } from "../../config/businessConfig";

const highlights = [
  {
    icon: Shield,
    label: "Trusted Products",
    desc: "Only genuine, quality-certified parts and accessories.",
  },
  {
    icon: Wrench,
    label: "Expert Installation",
    desc: "Skilled technicians with hands-on experience.",
  },
  {
    icon: Award,
    label: "Customer First",
    desc: "Honest advice and satisfaction every visit.",
  },
  {
    icon: Sparkles,
    label: "Clean Finish",
    desc: "Showroom-grade installation and detailing.",
  },
];

const milestones = [
  { value: "8+", label: "Service Categories" },
  { value: "1000+", label: "Cars Serviced" },
  { value: "100%", label: "Customer Satisfaction" },
  { value: "5+", label: "Years Experience" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function About() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
    >
      {/* Subtle background texture */}
      <div className="grain-overlay" />
      <div className="about-glow about-glow-1" />
      <div className="about-glow about-glow-2" />

      <div className="about-container">
        {/* ─── Top: Split layout — visual + intro ──────────────────── */}
        <div className="about-split">
          {/* Left: Animated car visual */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="about-visual-card"
          >
            <div className="about-visual-inner">
              {/* Clean gradient visual with floating service tags */}
              <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="about-car-glow"
              />

              <div className="about-visual-grid">
                {[
                  { num: "8+", text: "Services" },
                  { num: "24/6", text: "Support" },
                  { num: "100%", text: "Quality" },
                  { num: "5+", text: "Years" },
                ].map((item, i) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                    className="about-visual-stat"
                  >
                    <span className="about-visual-stat-num">{item.num}</span>
                    <span className="about-visual-stat-text">{item.text}</span>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Badge */}
            <div className="about-badge">
              <span className="about-badge-number">8+</span>
              <span className="about-badge-text">
                service categories
                <br />
                under one roof
              </span>
            </div>
          </motion.div>

          {/* Right: Text content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
          >
            <span className="plate-number about-eyebrow">
              About Accessories Land
            </span>
            <h2 className="about-heading">
              Everything your car needs,{" "}
              <span className="text-red">done right.</span>
            </h2>
            <p className="about-description">
              Accessories Land provides automotive accessories, in-car technology,
              electrical solutions, safety systems, and interior & exterior
              upgrades — plus detailing that brings the finish back to showroom
              condition.
            </p>
            <p className="about-description about-description-secondary">
              Every vehicle that comes through our doors gets careful diagnosis,
              honest advice, and clean, professional installation. Located in{" "}
              <strong className="text-paper">Kariparambu, Malappuram</strong>,
              we've earned the trust of car owners across Kerala.
            </p>

            {/* Quick Info */}
            <div className="about-quick-info">
              <a
                href={businessConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="about-info-item"
              >
                <MapPin size={16} className="text-red shrink-0" />
                <span>Kariparambu, Malappuram</span>
              </a>
              <a
                href={`tel:${businessConfig.phone}`}
                className="about-info-item"
              >
                <Phone size={16} className="text-red shrink-0" />
                <span>{businessConfig.phone}</span>
              </a>
            </div>

            <div className="about-cta-row">
              <Button as={Link} to="/services">
                Explore Services
              </Button>
              <Button as={Link} to="/contact" variant="outline">
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ─── Highlight cards ─────────────────────────────────────── */}
        <div className="about-highlights">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={fadeUp}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={i + 2}
                className="about-highlight-card"
              >
                <span className="about-highlight-icon">
                  <Icon size={22} />
                </span>
                <h3 className="about-highlight-title">{item.label}</h3>
                <p className="about-highlight-desc">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* ─── Stats strip ──────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          custom={6}
          className="about-stats"
        >
          {milestones.map((stat) => (
            <div key={stat.label} className="about-stat">
              <span className="about-stat-value">{stat.value}</span>
              <span className="about-stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
