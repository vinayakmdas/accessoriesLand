import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download } from "lucide-react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { gallery, galleryCategories } from "../../data/gallery";

/**
 * Downloads an image by fetching it as a blob and triggering a save dialog.
 * Works with Vite-bundled assets (data-URIs, hashed filenames, etc.)
 */
function downloadImage(imageSrc, fileName) {
  fetch(imageSrc)
    .then((res) => res.blob())
    .then((blob) => {
      const ext = blob.type.split("/")[1] || "png";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.${ext === "svg+xml" ? "svg" : ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
}

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
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
              className="group relative w-full mb-5 break-inside-avoid overflow-hidden rounded-md border border-white/5 text-left"
            >
              {/* Clickable image area — opens lightbox */}
              <button
                type="button"
                onClick={() => setLightbox(item)}
                className="w-full block cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>

              {/* Hover overlay with title + category */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 pointer-events-none">
                <div>
                  <p className="text-red text-xs uppercase tracking-widest font-display">
                    {item.category}
                  </p>
                  <p className="text-paper font-display text-sm font-semibold">{item.title}</p>
                </div>
              </div>

              {/* Download button — top-right corner, appears on hover */}
              <button
                type="button"
                aria-label={`Download ${item.title}`}
                title={`Download ${item.title}`}
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(
                    item.image,
                    item.title.toLowerCase().replace(/\s+/g, "-")
                  );
                }}
                className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                  bg-black/70 border border-white/15 text-white/80
                  opacity-0 group-hover:opacity-100
                  hover:!bg-red hover:!text-white hover:!border-red
                  transition-all duration-300 cursor-pointer backdrop-blur-sm
                  font-display text-[11px] font-semibold uppercase tracking-wider"
              >
                <Download size={13} strokeWidth={2.5} />
                Save
              </button>
            </motion.div>
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
            {/* Close button */}
            <button
              aria-label="Close"
              className="absolute top-6 right-6 text-white/80 hover:text-red"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>

            {/* Download button inside lightbox */}
            <button
              type="button"
              aria-label={`Download ${lightbox.title}`}
              title={`Download ${lightbox.title}`}
              onClick={(e) => {
                e.stopPropagation();
                downloadImage(
                  lightbox.image,
                  lightbox.title.toLowerCase().replace(/\s+/g, "-")
                );
              }}
              className="absolute top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 rounded-full
                bg-white/10 border border-white/20 text-white/90
                hover:bg-red hover:text-white hover:border-red
                transition-all duration-300 cursor-pointer backdrop-blur-md
                font-display text-xs font-semibold uppercase tracking-wider"
            >
              <Download size={16} strokeWidth={2.5} />
              Download
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
