import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Car } from "lucide-react";
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
          <div className="relative rounded-md overflow-hidden border border-white/10 h-[420px] bg-ink-card flex flex-col items-center justify-center">
            {/* The Car */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 text-red mb-8"
            >
              <Car size={140} strokeWidth={1} />
            </motion.div>

            {/* The Road Lines */}
            <div className="absolute top-1/2 mt-16 left-0 right-0 h-[2px] overflow-hidden opacity-30">
              <motion.div
                className="w-[200%] h-full flex"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-red to-transparent bg-[length:40px_2px] bg-repeat-x"></div>
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-red to-transparent bg-[length:40px_2px] bg-repeat-x"></div>
              </motion.div>
            </div>

            {/* Glow / Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red/5 pointer-events-none" />
            <motion.div 
               animate={{ opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red/10 rounded-full blur-[80px]"
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
