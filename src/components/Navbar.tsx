import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

const links = [
  { label: "Home", href: "#home" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Newsletter", href: "#newsletter" },
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
    <header className="fixed inset-x-0 top-3 md:top-5 z-50 px-3 md:px-6">
      <nav
        className={`mx-auto max-w-6xl px-4 md:px-6 h-14 md:h-16 flex items-center justify-between gap-4 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white/85 backdrop-blur-md shadow-lg ring-1 ring-black/5"
            : "bg-white/5 backdrop-blur-sm ring-1 ring-white/10"
        }`}
      >
        <a href="#home" className="flex items-center gap-2 shrink-0">
          <img
            src={scrolled ? "/prisma-digital-black-logo.png" : "/logo.png"}
            alt="Prisma Digital"
            className="w-32 md:w-36 h-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-prisma-magenta ${
                  scrolled ? "text-ink" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-full text-white text-sm font-semibold bg-secondary hover:brightness-110 transition shadow-md"
          >
            Diagnóstico Gratis
          </a>

          <button
            className={`md:hidden ${scrolled ? "text-ink" : "text-white"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
          <ul className="px-4 py-4 space-y-1">
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
                href={MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block text-center px-4 py-2.5 mt-1 rounded-full text-white text-sm font-semibold bg-secondary"
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
