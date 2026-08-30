import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { gallery, galleryCategories } from "../../data/gallery";

export default function Gallery({ limit, showFilters = true, showTitle = true }) {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = gallery.filter((item) => active === "All" || item.category === active);
  const items = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="gallery" className="relative bg-ink-soft py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {showTitle && (
          <SectionTitle
            eyebrow="Our Work"
            title="Gallery"
            subtitle="A look at installations, detailing, and completed projects from the shop."
          />
        )}

        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-display text-xs uppercase tracking-wide px-4 py-2 rounded-full border transition-colors ${
                  active === cat
                    ? "bg-red border-red text-white"
                    : "border-white/15 text-steel-light hover:border-red hover:text-red"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              onClick={() => setLightbox(item)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group relative w-full mb-5 break-inside-avoid overflow-hidden rounded-md border border-white/5 block text-left"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <div>
                  <p className="text-red text-xs uppercase tracking-widest font-display">
                    {item.category}
                  </p>
                  <p className="text-paper font-display text-sm font-semibold">{item.title}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button
              aria-label="Close"
              className="absolute top-6 right-6 text-white/80 hover:text-red"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              src={lightbox.image}
              alt={lightbox.title}
              className="max-h-[85vh] max-w-full rounded-md object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
