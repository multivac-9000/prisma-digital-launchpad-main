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

export default function Footer() {
  return (
    <footer className="bg-footer-yellow text-ink">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12 items-start">
          {/* COL 1: brand + redes */}
          <div>
            <img
              src="/prisma-digital-black-logo.png"
              alt="Prisma Digital"
              className="w-52 h-auto"
            />
            <p className="mt-4 text-ink/80 text-sm max-w-xs leading-relaxed">
              Para emprendedores que tienen algo bueno y quieren que el mundo lo sepa.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink text-white hover:bg-secondary hover:scale-110 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* COL 2: contacto */}
          <div>
            <h4 className="font-bold text-lg text-ink">Elige tu forma para contactarnos</h4>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:prismadigital.io@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold hover:bg-primary transition"
              >
                <Mail className="h-4 w-4" /> Enviar Email
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=56957151303&text=Hola+equipo+Prisma+Digital%21%2C+quiero+saber+m%C3%A1s+de+sus+servicios.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold hover:bg-secondary transition"
              >
                <MessageCircle className="h-4 w-4" /> Enviar WhatsApp
              </a>
              <a
                href="https://meet.brevo.com/prisma-digital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold hover:bg-accent transition"
              >
                <CalendarDays className="h-4 w-4" /> Agendar una Reunión
              </a>
            </div>
          </div>

          {/* COL 3: newsletter (formulario real de Brevo) */}
          <div>
            <BrevoNewsletter />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-ink/80">
          © 2026 Prisma Digital
        </div>
      </div>
    </footer>
  );
}
