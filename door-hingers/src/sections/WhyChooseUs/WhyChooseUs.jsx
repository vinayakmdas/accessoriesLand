import { motion } from "framer-motion";
import { ShieldCheck, Wrench, Users, Clock, Smile } from "lucide-react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Quality Products",
    description: "Reliable and carefully selected automotive products.",
  },
  {
    icon: Wrench,
    title: "Professional Installation",
    description: "Clean and professional installation by skilled technicians.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    description: "Knowledgeable professionals who understand modern vehicles.",
  },
  {
    icon: Clock,
    title: "Reliable Service",
    description: "Dependable service with attention to detail.",
  },
  {
    icon: Smile,
    title: "Customer Satisfaction",
    description: "Focused on providing a great customer experience.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-ink py-24 overflow-hidden">
      <div className="grain-overlay" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <SectionTitle eyebrow="The Difference" title="Why Choose Door Hingers?" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="flex flex-col items-start gap-3 p-6 rounded-md border border-white/5 bg-ink-card hover:border-red/40 transition-colors"
              >
                <span className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center">
                  <Icon size={22} className="text-red" />
                </span>
                <h3 className="font-display text-base font-semibold uppercase tracking-wide text-paper">
                  {reason.title}
                </h3>
                <p className="text-steel-light text-sm leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
