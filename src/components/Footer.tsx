import { useState } from "react";
import {
  Mail,
  MessageCircle,
  CalendarDays,
  Youtube,
  Linkedin,
  Instagram,
  Triangle,
  Chrome,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

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
            <br />
            y quieren que el mundo lo sepa.
          </p>
        </div>

        {/* CENTER: contact pills */}
        <div>
          <h4 className="font-bold text-lg text-ink">
            Elige tu forma para contactarnos
          </h4>
          <div className="mt-5 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href="mailto:hola@prismadigital.com"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold hover:bg-primary transition"
            >
              <Mail className="h-4 w-4" /> Enviar Email
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold hover:bg-secondary transition"
            >
              <MessageCircle className="h-4 w-4" /> Enviar WhatsApp
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold hover:bg-accent transition"
            >
              <CalendarDays className="h-4 w-4" /> Agendar una Reunión
            </a>
          </div>
        </div>

        {/* RIGHT: newsletter card */}
        <div className="bg-ink text-white rounded-2xl p-6 md:p-7 shadow-xl">
          <h4 className="font-bold text-lg">Newsletter Digital</h4>
          <p className="mt-2 text-white/70 text-sm leading-relaxed">
            Suscríbete para recibir novedades sobre metodologías ágiles,
            industria tech, datos y marketing digital.
          </p>

          <label className="mt-5 block text-xs text-white/70">
            Introduce tu dirección de e-mail para suscribirte
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="EMAIL"
            className="mt-2 w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/40 text-white focus:bg-white/15 focus:border-secondary outline-none tracking-wide"
          />
          <p className="mt-2 text-xs text-emerald-400">
            Tus datos están a salvo con nosotros
          </p>

          <button
            type="button"
            onClick={subscribe}
            className="mt-4 w-full px-5 py-3 rounded-lg bg-secondary text-white font-bold tracking-wide hover:bg-secondary/90 transition-transform hover:scale-[1.01]"
          >
            {subscribed ? "¡SUSCRITO!" : "SUSCRIBIRSE"}
          </button>
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
