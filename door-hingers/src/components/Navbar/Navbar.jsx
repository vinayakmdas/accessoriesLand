import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../Button/Button";
import { businessConfig } from "../../config/businessConfig";
import logoImg from "../../assets/images/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Services", to: "/services" },
  { label: "Gallery", to: "/gallery" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

/**
 * Returns true when a nav item should be highlighted as active.
 * - Hash links (e.g. /#about) are active only when the hash matches.
 * - The Home link (/) is active only when on "/" with no hash.
 * - Other links use normal pathname matching.
 */
function isNavItemActive(item, location) {
  const { pathname, hash } = location;

  // Hash-based link (e.g. "/#about")
  if (item.to.includes("#")) {
    const [itemPath, itemHash] = item.to.split("#");
    return pathname === (itemPath || "/") && hash === `#${itemHash}`;
  }

  // Exact match for Home "/"
  if (item.to === "/") {
    return pathname === "/" && !hash;
  }

  // Standard path prefix match for other routes
  return pathname.startsWith(item.to);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-md border-b border-white/10 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logoImg} alt="Accessories Land" className="h-10 sm:h-12 w-auto object-contain" />
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const active = isNavItemActive(item, location);
            return (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className={`font-display text-sm uppercase tracking-wide transition-colors ${
                    active ? "text-red" : "text-paper/85 hover:text-red"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button as={Link} to="/contact" variant="primary">
            Get a Quote
          </Button>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-paper p-2"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-ink border-t border-white/10"
          >
            <ul className="flex flex-col px-5 py-4 gap-1">
              {navItems.map((item) => {
                const active = isNavItemActive(item, location);
                return (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className={`block font-display text-base uppercase tracking-wide py-3 border-b border-white/5 ${
                        active ? "text-red" : "text-paper/85"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="px-5 pb-5">
              <Button as={Link} to="/contact" onClick={() => setOpen(false)} className="w-full">
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
