import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { businessConfig } from "../../config/businessConfig";

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

/** Reusable download button that overlays an image */
function DownloadOverlayButton({ imageSrc, fileName, className = "" }) {
  return (
    <button
      type="button"
      aria-label={`Download ${fileName}`}
      title={`Download ${fileName}`}
      onClick={(e) => {
        e.stopPropagation();
        downloadImage(imageSrc, fileName);
      }}
      className={`absolute z-20 flex items-center justify-center w-8 h-8 rounded-full
        bg-black/70 border border-white/15 text-white/80
        opacity-0 group-hover:opacity-100
        hover:!bg-red hover:!text-white hover:!border-red
        transition-all duration-300 cursor-pointer backdrop-blur-sm
        ${className}`}
    >
      <Icons.Download size={14} strokeWidth={2.5} />
    </button>
  );
}

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

        {/* Download button for cover image */}
        <DownloadOverlayButton
          imageSrc={service.image}
          fileName={`${service.slug}-cover`}
          className="top-2 left-2"
        />

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
                <div className="relative group/feat shrink-0">
                  <img
                    src={feature.image}
                    alt={feature.name}
                    loading="lazy"
                    className="w-10 h-10 rounded object-cover border border-white/10"
                  />
                  {/* Download button for feature image */}
                  <button
                    type="button"
                    aria-label={`Download ${feature.name}`}
                    title={`Download ${feature.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(
                        feature.image,
                        `${service.slug}-${feature.name.toLowerCase().replace(/\s+/g, "-")}`
                      );
                    }}
                    className="absolute inset-0 z-20 flex items-center justify-center rounded
                      bg-black/60 text-white/90
                      opacity-0 group-hover/feat:opacity-100
                      hover:!bg-red/80
                      transition-all duration-300 cursor-pointer"
                  >
                    <Icons.Download size={14} strokeWidth={2.5} />
                  </button>
                </div>
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
