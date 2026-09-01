import { Link } from "react-router-dom";
import { Image, Users, Video, MapPin, Phone, Mail } from "lucide-react";
import { businessConfig } from "../../config/businessConfig";
import { services } from "../../data/services";
import logoImg from "../../assets/images/logo.png";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-soft border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="inline-block">
            <img src={logoImg} alt="Accessories Land" className="h-14 w-auto object-contain" />
          </Link>
          <p className="text-steel-light text-sm mt-3 max-w-xs">{businessConfig.tagline}</p>

          <div className="flex items-center gap-3 mt-5">
            {businessConfig.social.instagram && (
              <a
                href={businessConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-paper/80 hover:text-red hover:border-red transition-colors"
              >
                <Image size={16} />
              </a>
            )}
            {businessConfig.social.facebook && (
              <a
                href={businessConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-paper/80 hover:text-red hover:border-red transition-colors"
              >
                <Users size={16} />
              </a>
            )}
            {businessConfig.social.youtube && (
              <a
                href={businessConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-paper/80 hover:text-red hover:border-red transition-colors"
              >
                <Video size={16} />
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-display uppercase text-sm tracking-widest text-paper mb-4">Navigation</h4>
          <ul className="flex flex-col gap-2 text-sm text-steel-light">
            {[
              ["Home", "/"],
              ["About", "/#about"],
              ["Services", "/services"],
              ["Gallery", "/gallery"],
              ["Careers", "/careers"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="hover:text-red transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display uppercase text-sm tracking-widest text-paper mb-4">Services</h4>
          <ul className="flex flex-col gap-2 text-sm text-steel-light">
            {services.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="hover:text-red transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display uppercase text-sm tracking-widest text-paper mb-4">Contact</h4>
          <ul className="flex flex-col gap-3 text-sm text-steel-light">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-red mt-0.5 shrink-0" />
              <span>{businessConfig.address}</span>
            </li>
            {businessConfig.phone && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-red shrink-0" />
                <a href={`tel:${businessConfig.phone}`} className="hover:text-red transition-colors">
                  {businessConfig.phone}
                </a>
              </li>
            )}
            {businessConfig.whatsapp && (
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-red shrink-0" />
                <a
                  href={`https://wa.me/${businessConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {businessConfig.email && (
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-red shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="hover:text-red transition-colors">
                  {businessConfig.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-steel">
        <span>© {year} Accessories Land. All rights reserved.</span>
        {businessConfig.gstin && <span className="plate-number">GSTIN: {businessConfig.gstin}</span>}
      </div>
    </footer>
  );
}
