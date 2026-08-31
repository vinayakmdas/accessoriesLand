import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Button from "../../components/Button/Button";
import workshopImage from "../../assets/images/about/workshop.svg";

const points = [
  "Professional service, start to finish",
  "Quality products from trusted brands",
  "Expert installation by skilled technicians",
  "Customer satisfaction at every visit",
];

export default function About() {
  return (
    <section id="about" className="relative bg-ink py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-md overflow-hidden border border-white/10">
            <img
              src={workshopImage}
              alt="Accessories Land workshop"
              loading="lazy"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:flex bg-red text-white font-display px-6 py-4 rounded-md shadow-lg">
            <span className="text-3xl font-bold leading-none">8+</span>
            <span className="text-xs uppercase tracking-wide ml-2 self-end">
              service categories
              <br />
              under one roof
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="plate-number text-red text-xs font-semibold tracking-[0.25em] uppercase">
            About Accessories Land
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-paper mt-3 mb-5">
            Everything your car needs, done right.
          </h2>
          <p className="text-steel-light text-base sm:text-lg leading-relaxed mb-6">
            Accessories Land provides automotive accessories, in-car technology, electrical
            solutions, safety systems, and interior &amp; exterior upgrades — plus detailing
            that brings the finish back to showroom condition. Every vehicle that comes
            through our doors gets careful diagnosis, honest advice, and clean, professional
            installation.
          </p>

          <ul className="grid sm:grid-cols-2 gap-3 mb-8">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm text-paper/90">
                <CheckCircle2 size={18} className="text-red mt-0.5 shrink-0" />
                {point}
              </li>
            ))}
          </ul>

          <Button as={Link} to="/services" variant="outline">
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
