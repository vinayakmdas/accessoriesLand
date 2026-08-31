import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { businessConfig } from "../../config/businessConfig";

export default function ServiceCard({ service, index = 0, detailed = false }) {
  const Icon = Icons[service.icon] || Icons.Wrench;
  const enquireHref = businessConfig.whatsapp
    ? `https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(
        `Hi Accessories Land, I'd like to enquire about ${service.title}.`
      )}`
    : "#contact";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.06, ease: "easeOut" }}
      className="group relative flex flex-col bg-ink-card border border-white/5 rounded-md overflow-hidden hover:border-red/40 transition-colors"
    >
      <span className="hazard-corner z-10" aria-hidden="true" />

      <div className="relative h-44 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-card via-ink-card/10 to-transparent" />
        <span className="plate-number absolute bottom-2 left-3 text-[11px] text-red-bright/90 bg-black/60 px-2 py-0.5 rounded">
          {service.plate}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex items-center gap-2">
          <Icon size={20} className="text-red" strokeWidth={2} />
          <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-paper">
            {service.title}
          </h3>
        </div>

        <p className="text-steel-light text-sm leading-relaxed">{service.description}</p>

        <ul className="flex flex-col gap-2 mt-1">
          {service.features.map((feature) => (
            <li key={feature.name} className="flex items-center gap-3">
              {detailed && feature.image && (
                <img
                  src={feature.image}
                  alt={feature.name}
                  loading="lazy"
                  className="w-10 h-10 rounded object-cover border border-white/10 shrink-0"
                />
              )}
              <span className="flex items-center gap-2 text-sm text-steel-light">
                <span className="w-1.5 h-1.5 rounded-full bg-red shrink-0" />
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        <a
          href={enquireHref}
          target={businessConfig.whatsapp ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="mt-auto pt-4 font-display text-sm font-semibold uppercase tracking-wide text-red hover:text-red-bright inline-flex items-center gap-1"
        >
          Enquire Now <Icons.ArrowUpRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}
