import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import Button from "../../components/Button/Button";
import { hasOpenings, jobOpenings } from "../../data/careers";

export default function Careers() {
  return (
    <section className="relative bg-ink py-24">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <span className="plate-number text-red text-xs font-semibold tracking-[0.25em] uppercase">
            Join The Team
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-paper mt-3 mb-4">
            Build Your Career With Door Hingers
          </h2>
          <p className="text-steel-light text-base sm:text-lg max-w-2xl mx-auto mb-8">
            We're always looking for passionate and skilled people who want to grow with us.
          </p>

          {hasOpenings ? (
            <p className="text-paper/80 text-sm mb-8">
              {jobOpenings.length} open position{jobOpenings.length !== 1 && "s"} right now.
            </p>
          ) : (
            <div className="flex flex-col items-center gap-2 mb-8 max-w-lg mx-auto">
              <Briefcase size={28} className="text-red mb-1" />
              <p className="text-steel-light text-sm">
                No current openings. Please send us your CV and we'll contact you when a
                suitable opportunity becomes available.
              </p>
            </div>
          )}

          <Button as={Link} to="/careers">
            {hasOpenings ? "View Openings" : "Submit Your CV"}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
