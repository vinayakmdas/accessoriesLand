import { motion } from "framer-motion";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import ServiceCard from "../components/ServiceCard/ServiceCard";
import { services } from "../data/services";

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionTitle
            eyebrow="Full Catalogue"
            title="Our Services"
            subtitle="Everything your car needs, under one roof — browse the full range below, complete with the specific accessory or upgrade shown for each line item."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} detailed />
          ))}
        </div>
      </div>
    </div>
  );
}
