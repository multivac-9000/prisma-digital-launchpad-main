import {
  Mail,
  MessageCircle,
  CalendarDays,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";

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
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top row: brand + contact pills */}
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* LEFT: brand */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/prisma-digital-black-logo.png"
                alt="logo"
                className="w-64 h-auto"
              />
            </div>
            <p className="mt-4 text-ink/80 text-sm max-w-xs leading-relaxed">
              Para emprendedores que tienen algo bueno
              <br />y quieren que el mundo lo sepa.
            </p>
          </div>

          {/* RIGHT: contact pills */}
          <div className="lg:justify-self-end">
            <h4 className="font-bold text-lg text-ink">
              Elige tu forma para contactarnos
            </h4>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
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
        </div>

        {/* Newsletter (formulario real de Brevo) — ancho en desktop */}
        <div className="mt-14 mx-auto w-full max-w-3xl bg-white rounded-2xl p-2 md:p-4 shadow-xl overflow-hidden">
          <iframe
            title="Newsletter Prisma Digital"
            src="https://345b4d6b.sibforms.com/v2/serve/MUIFAN_Ng8yAMpFy0s-a9kNPr0q_DvozZJp2n-wS7f2_qGo7lq86UoJngwF8dUYM48NJKyqu80nKOeekIcBA_4yHMOx4wXD96ga2bQjBVfCgGj3r3K2-d3LsDnA_knMKhAxuOTN8VK0kTxYqPBa_MZ3u3nsMx8Uv1Ih38RQJ7qMuHXYWKVt99-U8kMCaD96Eup6x69oTx0glTVPi"
            frameBorder={0}
            scrolling="no"
            allowFullScreen
            className="block w-full rounded-xl"
            style={{ width: "100%", height: 340 }}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink/80">
          <span>© 2026 Prisma Digital</span>
          <div className="flex gap-3">
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
      </div>
    </footer>
  );
}
