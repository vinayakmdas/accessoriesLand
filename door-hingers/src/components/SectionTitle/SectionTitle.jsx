import { motion } from "framer-motion";

export default function SectionTitle({ eyebrow, title, subtitle, align = "center" }) {
  const alignment = align === "left" ? "items-start text-left" : "items-center text-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col ${alignment} gap-3 mb-12`}
    >
      {eyebrow && (
        <span className="plate-number text-red text-xs font-semibold tracking-[0.25em] uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-paper">
        {title}
      </h2>
      {subtitle && (
        <p className="text-steel-light max-w-2xl text-base sm:text-lg">{subtitle}</p>
      )}
      <span className="h-[3px] w-14 bg-red rounded-full mt-1" />
    </motion.div>
  );
}
