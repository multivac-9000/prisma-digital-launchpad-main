import { Mail, MessageCircle, CalendarDays, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import NewsletterNueva from "./NewsletterNueva";

/* Firma dinámica del footer: cada página se queda con SU palabra del espectro
   del eslogan. Refuerza el mensaje del canal sin repetir el eslogan completo.
   Todas las palabras riman en "-ión" para leerse como variación de "acción". */
const SIGNATURE_WORD_BY_PATH: Record<string, string> = {
  "/digitalizacion-de-negocios": "dirección",
  "/promocion-de-negocios": "decisión",
  "/optimizacion-de-negocios": "precisión",
};
function signatureWordFor(pathname: string): string {
  if (SIGNATURE_WORD_BY_PATH[pathname]) return SIGNATURE_WORD_BY_PATH[pathname];
  if (pathname.startsWith("/blog")) return "medición";
  return "acción"; // home y resto
}

const socials = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/prismadigital.io/",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/share/1Fu2MFXigF/",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prisma-digital-6b6b86202/",
  },
];

const navLinks = [
  { label: "Resultados", href: "/#resultados" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Blog", href: "/blog" },
  { label: "Garantía", href: "/#garantia" },
  { label: "Contacto", href: "/#contacto" },
];

const legalLinks = [
  { label: "Términos y Condiciones", to: "/terminos-y-condiciones" },
  { label: "Política de Privacidad", to: "/politica-de-privacidad" },
];

const contactLinks = [
  {
    icon: Mail,
    label: "prismadigital.io@gmail.com",
    href: "mailto:prismadigital.io@gmail.com",
    accent: "text-prisma-magenta",
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp +56 9 5715 1303",
    href: "https://api.whatsapp.com/send/?phone=56957151303&text=Hola+equipo+Prisma+Digital%21%2C+quiero+saber+m%C3%A1s+de+sus+servicios.&type=phone_number&app_absent=0",
    accent: "text-prisma-cyan",
    external: true,
  },
  {
    icon: CalendarDays,
    label: "Agendar una reunión",
    href: "https://meet.brevo.com/prisma-digital",
    accent: "text-prisma-magenta",
    external: true,
  },
];

const columnTitle =
  "text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-3 md:mb-4";

/* FOOTER con el nuevo posicionamiento: newsletter horizontal arriba y columnas
   de navegación / contacto / legal que aprovechan el ancho completo. */
export default function FooterNueva() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const signatureWord = signatureWordFor(pathname);
  return (
    <footer className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] text-white">
      <div className="nl-gem" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 pt-12 md:pt-16 pb-8 md:pb-10">
        {/* Newsletter: banda horizontal a lo ancho */}
        <div
          id="newsletter"
          className="scroll-mt-28 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5 md:px-8 md:py-6"
        >
          <NewsletterNueva />
        </div>

        {/* Columnas */}
        <div className="mt-10 md:mt-14 grid gap-8 md:gap-6 grid-cols-2 md:grid-cols-12 text-left">
          {/* Marca + redes */}
          <div className="col-span-2 md:col-span-5 flex flex-col items-center md:items-start gap-3 md:gap-4 text-center md:text-left">
            <img
              src="/Logo Prisma Digital blanco.webp"
              alt="Logo Prisma Digital, agencia de crecimiento digital basado en datos"
              className="w-36 md:w-44 h-auto"
              loading="lazy"
            />
            <p className="text-xs md:text-sm leading-relaxed text-white/70 max-w-xs">
              Impulsamos decisiones digitales basadas en datos y con propósito humano para empresas
              consolidadas.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 text-white hover:bg-secondary hover:ring-transparent hover:scale-110 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <nav className="md:col-span-2" aria-label="Navegación del sitio">
            <p className={columnTitle}>Navegación</p>
            <ul className="space-y-2 list-none">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto: a lo ancho en móvil para que el email no desborde la columna */}
          <div className="col-span-2 order-last md:order-none md:col-span-3">
            <p className={columnTitle}>Contacto</p>
            <ul className="space-y-2.5 list-none">
              {contactLinks.map(({ icon: Icon, label, href, accent, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${accent}`} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <p className={columnTitle}>Legal</p>
            <ul className="space-y-2 list-none">
              {legalLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Firma dinámica: cada página se queda con su palabra del espectro */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-3 text-center text-xs tracking-wide text-white/55">
          Prisma Digital · Menos ilusión, más{" "}
          <span
            key={signatureWord}
            className="font-semibold text-white/85"
            style={{
              animation: "nl-word-swap-in 500ms cubic-bezier(0.22, 0.65, 0.3, 0.9) both",
            }}
          >
            {signatureWord}
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-1.5 text-xs text-white/60">
          <span>© {new Date().getFullYear()} Prisma Digital · Concepción, Chile</span>
          <span>Decisiones digitales basadas en datos, con propósito humano.</span>
        </div>
      </div>
    </footer>
  );
}
