import { Mail, MessageCircle, CalendarDays, Instagram, Facebook, Linkedin } from "lucide-react";
import NewsletterNueva from "./NewsletterNueva";

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

const contactPills = [
  {
    icon: Mail,
    label: "Enviar Email",
    href: "mailto:prismadigital.io@gmail.com",
    accent: "text-prisma-magenta",
    external: false,
  },
  {
    icon: MessageCircle,
    label: "Enviar WhatsApp",
    href: "https://api.whatsapp.com/send/?phone=56957151303&text=Hola+equipo+Prisma+Digital%21%2C+quiero+saber+m%C3%A1s+de+sus+servicios.&type=phone_number&app_absent=0",
    accent: "text-prisma-cyan",
    external: true,
  },
  {
    icon: CalendarDays,
    label: "Agendar una Reunión",
    href: "https://meet.brevo.com/prisma-digital",
    accent: "text-prisma-magenta",
    external: true,
  },
];

/* FOOTER con el nuevo posicionamiento: empresas consolidadas, datos + propósito humano. */
export default function FooterNueva() {
  return (
    <footer className="bg-prisma-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center">
          {/* Columna 1: Logo + línea de marca + redes */}
          <div className="flex flex-col items-center gap-5 w-full">
            <img
              src="/Logo Prisma Digital blanco.webp"
              alt="Logo Prisma Digital, agencia de crecimiento digital basado en datos"
              className="w-48 h-auto"
              loading="lazy"
            />
            <p className="text-sm leading-relaxed text-white/75 max-w-xs">
              Impulsamos decisiones digitales basadas en datos y con propósito humano para
              empresas consolidadas.
            </p>
            <div className="flex justify-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 text-white hover:bg-secondary hover:ring-transparent hover:scale-110 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div className="flex flex-col items-center gap-4 w-full">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/50">
              Contacto
            </p>
            <div className="flex flex-col gap-3 w-full max-w-xs">
              {contactPills.map(({ icon: Icon, label, href, accent, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 ring-1 ring-white/15 text-white text-sm font-semibold hover:bg-white/20 transition w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${accent}`} aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 3: Newsletter con incentivo concreto */}
          <div id="newsletter" className="flex flex-col items-center gap-4 w-full scroll-mt-28">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/50">
              Newsletter
            </p>
            <div className="w-full">
              <NewsletterNueva />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-sm text-white/70">
          © {new Date().getFullYear()} Prisma Digital · Concepción, Chile
        </div>
      </div>
    </footer>
  );
}
