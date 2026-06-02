import {
  Mail,
  MessageCircle,
  CalendarDays,
  Youtube,
  Linkedin,
  Instagram,
  Chrome,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-footer-yellow text-ink">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 lg:grid-cols-3">
        {/* LEFT: brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/prisma-digital-black-logo.png" alt="logo" className="w-64 h-auto" />
          </div>
          <p className="mt-4 text-ink/80 text-sm max-w-xs leading-relaxed">
            Para emprendedores que tienen algo bueno
            <br />y quieren que el mundo lo sepa.
          </p>
        </div>

        {/* CENTER: contact pills */}
        <div>
          <h4 className="font-bold text-lg text-ink">Elige tu forma para contactarnos</h4>
          <div className="mt-5 flex flex-col sm:flex-row lg:flex-col gap-3">
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

        {/* RIGHT: newsletter (formulario real de Brevo) */}
        <div className="bg-white rounded-2xl p-2 md:p-4 shadow-xl overflow-hidden">
          <iframe
            title="Newsletter Prisma Digital"
            src="https://345b4d6b.sibforms.com/v2/serve/MUIFAN_Ng8yAMpFy0s-a9kNPr0q_DvozZJp2n-wS7f2_qGo7lq86UoJngwF8dUYM48NJKyqu80nKOeekIcBA_4yHMOx4wXD96ga2bQjBVfCgGj3r3K2-d3LsDnA_knMKhAxuOTN8VK0kTxYqPBa_MZ3u3nsMx8Uv1Ih38RQJ7qMuHXYWKVt99-U8kMCaD96Eup6x69oTx0glTVPi"
            frameBorder={0}
            scrolling="auto"
            allowFullScreen
            className="block w-full rounded-xl"
            style={{ width: "100%", minHeight: 340 }}
          />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-ink/80">
          <span>© 2026 Prisma Digital</span>
          <div className="flex gap-3">
            {[
              { icon: Youtube, label: "YouTube" },
              { icon: Linkedin, label: "LinkedIn" },
              { icon: Mail, label: "Gmail" },
              { icon: Chrome, label: "Google" },
              { icon: Instagram, label: "Instagram" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
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
