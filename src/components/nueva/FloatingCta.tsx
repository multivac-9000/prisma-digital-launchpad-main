import { useEffect, useState } from "react";
import { trackCta } from "./track";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

/* CTA flotante solo para móvil: aparece tras pasar el hero, para que la acción
   principal siempre esté a un toque de distancia. */
export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-4 inset-x-4 z-40 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <a
        href={MEET_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCta("agenda_diagnostico", "flotante_movil")}
        className="flex items-center justify-center w-full px-6 py-4 rounded-full text-prisma-navy font-bold text-base shadow-2xl"
        style={{ background: "var(--gradient-agenda)" }}
      >
        Agenda tu Diagnóstico Gratis
      </a>
    </div>
  );
}
