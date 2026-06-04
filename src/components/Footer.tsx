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
      <div className="mx-auto max-w-4xl px-6 py-16 flex flex-col items-center text-center">
        {/* Logo a color */}
        <img src="/logo.png" alt="Prisma Digital" className="w-56 h-auto" />
        <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
          Para emprendedores que tienen algo bueno y quieren que el mundo lo sepa.
        </p>

        {/* Redes sociales */}
        <div className="mt-6 flex justify-center gap-3">
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

        {/* Botones de contacto */}
        <div className="mt-8 flex flex-col sm:flex-row flex-wrap justify-center gap-3">
          {contactPills.map(({ icon: Icon, label, href, accent, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white/10 ring-1 ring-white/15 text-white text-sm font-semibold hover:bg-white/20 transition"
            >
              <Icon className={`h-4 w-4 ${accent}`} /> {label}
            </a>
          ))}
        </div>

        {/* Newsletter (ancla #newsletter del menú) */}
        <div id="newsletter" className="mt-12 w-full max-w-md scroll-mt-28">
          <BrevoNewsletter />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-4xl px-6 py-5 text-center text-sm text-white/60">
          © 2026 Prisma Digital
        </div>
      </div>
    </footer>
  );
}
