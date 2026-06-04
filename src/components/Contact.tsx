import { Check, CalendarDays, ArrowRight } from "lucide-react";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

const bullets = [
  "Por qué tu negocio no está vendiendo lo que debería",
  "Qué cambiaríamos primero para ver resultados rápido",
  "Si somos o no la opción correcta para ti",
];

export default function Contact() {
  return (
    <section id="contacto" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
        {/* Left */}
        <div>
          <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15]">
            Tienes un negocio que merece más clientes.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Nosotros sabemos cómo conseguírtelos.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            La única pregunta es: <span className="font-semibold text-ink">¿cuándo empezamos?</span>
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-base text-ink/90 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[13px] text-muted-foreground italic">
            Sin presión. Sin compromiso. Solo claridad.
          </p>
        </div>

        {/* Right: agenda directa (reemplaza el formulario) */}
        <div
          className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-center shadow-2xl"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div
            className="absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl opacity-40"
            style={{ background: "var(--gradient-brand)" }}
            aria-hidden="true"
          />
          <div className="relative">
            <div
              className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white"
              style={{ background: "var(--gradient-cta)" }}
            >
              <CalendarDays className="h-8 w-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              Agenda tu diagnóstico gratuito
            </h3>
            <p className="mt-3 text-white/75 leading-relaxed max-w-sm mx-auto">
              Elige el día y la hora que más te acomode. Reservas en menos de un minuto, directo en
              nuestra agenda.
            </p>

            <a
              href={MEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-white font-bold text-base md:text-lg shadow-xl transition-transform hover:scale-[1.03]"
              style={{ background: "var(--gradient-cta)" }}
            >
              Reservar mi reunión
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>

            <p className="mt-5 text-xs text-white/55">
              30 minutos · Vía videollamada · 100% gratis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
