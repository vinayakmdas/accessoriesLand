import { motion } from "framer-motion";
import {
  MessageSquare,
  ClipboardCheck,
  Wrench,
  CheckCircle,
} from "lucide-react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Consult",
    description:
      "Tell us what you need — we listen carefully and give honest, expert advice on the best options for your car.",
  },
  {
    icon: ClipboardCheck,
    number: "02",
    title: "Plan",
    description:
      "We assess your vehicle, confirm compatible parts, and provide a clear quote with no hidden costs.",
  },
  {
    icon: Wrench,
    number: "03",
    title: "Install",
    description:
      "Our skilled technicians carry out clean, professional installation with attention to every detail.",
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "Deliver",
    description:
      "Final quality check, a quick walkthrough of what's been done, and your car is ready — better than before.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Process() {
  return (
    <section className="process-section">
      <div className="process-container">
        <SectionTitle
          eyebrow="How It Works"
          title="Our Process"
          subtitle="From consultation to delivery — here's how we get things done."
        />

        <div className="process-grid">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                custom={i}
                className="process-card"
              >
                {/* Step number */}
                <span className="process-number">{step.number}</span>

                {/* Icon */}
                <span className="process-icon">
                  <Icon size={26} />
                </span>

                {/* Content */}
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.description}</p>

                {/* Connector line (not on last) */}
                {i < steps.length - 1 && (
                  <div className="process-connector" aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
