import { useEffect, useState } from "react";
import { Triangle, Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Blog", href: "#blog" },
  { label: "Contáctanos", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <nav className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-2 group shrink-0">
          <img src={scrolled ? "/prisma-digital-black-logo.png" : "/logo.png"} alt="logo" className="w-40 h-auto" />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-secondary ${scrolled ? "text-ink" : "text-white/90"
                  }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contacto"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-semibold bg-secondary hover:bg-secondary/90 transition-colors shadow-md"
          >
            Diagnóstico Gratis
          </a>

          <button
            className={`md:hidden ${scrolled ? "text-ink" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-t border-border">
          <ul className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-ink font-medium py-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-2 rounded-full text-white text-sm font-semibold bg-secondary"
              >
                Diagnóstico Gratis
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
