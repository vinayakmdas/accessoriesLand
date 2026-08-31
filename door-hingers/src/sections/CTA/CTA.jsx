import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/Button/Button";
import WhatsAppButton from "../../components/WhatsAppButton/WhatsAppButton";
import ctaBg from "../../assets/images/services/led-electrical/led-lights.svg";

export default function CTA() {
  return (
    <section className="relative py-20 bg-red-deep overflow-hidden">
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${ctaBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-red-deep/60" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-white mb-4"
        >
          Ready to upgrade your drive?
        </motion.h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8">
          Talk to our team about the right accessories, technology, and services for your car.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button as={Link} to="/contact" variant="primary">
            Get a Quote
          </Button>
          <WhatsAppButton message="Hi Accessories Land, I'd like to get a quote." />
        </div>
      </div>
    </section>
  );
}
