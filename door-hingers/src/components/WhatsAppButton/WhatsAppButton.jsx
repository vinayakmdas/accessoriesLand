import { MessageCircle } from "lucide-react";
import { businessConfig } from "../../config/businessConfig";

/**
 * Reusable WhatsApp CTA. Reads the number from businessConfig — never
 * hardcode it in a page/component.
 *
 * @param {string} [message] - Optional prefilled message.
 * @param {"button"|"fab"} [variant] - "button" renders an inline pill,
 *   "fab" renders a floating action button fixed to the viewport corner.
 */
export default function WhatsAppButton({ message = "", variant = "button", className = "" }) {
  const number = businessConfig.whatsapp || "";
  const href = `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

  if (!number) {
    // No number configured yet — render disabled state rather than a dead link.
    return (
      <span
        className={`inline-flex items-center gap-2 opacity-40 cursor-not-allowed font-display uppercase text-sm tracking-wide px-6 py-3 border border-steel/30 rounded-sm ${className}`}
        title="WhatsApp number not configured yet"
      >
        <MessageCircle size={18} /> WhatsApp Us
      </span>
    );
  }

  if (variant === "fab") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className={`fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 hover:scale-105 transition-transform ${className}`}
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 font-display font-semibold uppercase text-sm tracking-wide px-6 py-3 rounded-sm border border-[#25D366]/50 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors ${className}`}
    >
      <MessageCircle size={18} /> WhatsApp Us
    </a>
  );
}
