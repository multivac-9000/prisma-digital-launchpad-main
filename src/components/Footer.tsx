import { Mail, MessageCircle, CalendarDays, Instagram, Facebook, Linkedin } from "lucide-react";
import BrevoNewsletter from "./BrevoNewsletter";

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
    accent: "text-prisma-yellow",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-prisma-navy text-white">
      {/* 3 columnas centradas horizontalmente */}
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start justify-items-center text-center">

          {/* Columna 1: Logo + tagline + redes */}
          <div className="flex flex-col items-center gap-5">
            <img
              src="/Logo Prisma Digital blanco.webp"
              alt="Prisma Digital"
              className="w-48 h-auto"
            />
            <p className="text-sm leading-relaxed text-white/70 max-w-[220px]">
              Para emprendedores que tienen algo bueno y quieren que el mundo lo sepa.
            </p>
            <div className="flex justify-center gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15 text-white hover:bg-secondary hover:ring-transparent hover:scale-110 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columna 2: Contacto */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40">
              Contacto
            </p>
            <div className="flex flex-col gap-3 w-full max-w-[220px]">
              {contactPills.map(({ icon: Icon, label, href, accent, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 ring-1 ring-white/15 text-white text-sm font-semibold hover:bg-white/20 transition w-full"
                >
                  <Icon className={`h-4 w-4 shrink-0 ${accent}`} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Columna 3: Newsletter */}
          <div id="newsletter" className="flex flex-col items-center gap-4 w-full max-w-xs scroll-mt-28">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40">
              Newsletter
            </p>
            <div className="w-full">
              <BrevoNewsletter />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-sm text-white/60">
          © 2026 Prisma Digital
        </div>
      </div>
    </footer>
  );
}
