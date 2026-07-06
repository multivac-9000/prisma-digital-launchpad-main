import { Check, CalendarDays, ArrowRight } from "lucide-react";
import { trackCta } from "./track";
import { Reveal, useMagnetic } from "./scrolly";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

const bullets = [
  "Qué parte de tu inversión digital está rindiendo — y cuál no",
  "Qué arreglaríamos primero para ver resultados rápido",
  "Cuánto puede crecer tu canal online en los próximos 90 días",
];

/* CTA FINAL: un solo camino de conversión (agenda Brevo), botón magnético y
   una sola mención de "sin compromiso" en toda la página. */
export default function ContactoNueva() {
  const magneticRef = useMagnetic<HTMLAnchorElement>();

  return (
    <section
      id="contacto"
      className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white pt-16 md:pt-24 pb-20 md:pb-28"
    >
      <div className="nl-gem" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
        {/* Left */}
        <div>
          <Reveal variant="blur">
            <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15] text-balance">
              Tu negocio ya funciona.
              <br />
              <span className="nl-metric-gradient">Que lo digital esté a la altura.</span>
            </h2>
          </Reveal>
          <Reveal as="p" delay={120} className="mt-5 text-lg text-muted-foreground">
            En 30 minutos de conversación saldrás sabiendo:
          </Reveal>

          <ul className="mt-8 space-y-4">
            {bullets.map((b, i) => (
              <Reveal
                key={b}
                as="li"
                variant="left"
                delay={i * 130}
                className="flex items-start gap-3"
              >
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-base text-ink/90 leading-relaxed">{b}</span>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Right: agenda directa en Brevo */}
        <Reveal variant="scale" delay={150}>
          <div className="nl-dark nl-beam relative overflow-hidden rounded-3xl p-8 md:p-10 text-center shadow-2xl">
            <div className="nl-grain absolute inset-0 overflow-hidden rounded-3xl" aria-hidden="true">
              <div
                className="absolute -top-16 -right-16 h-56 w-56 rounded-full blur-3xl opacity-40"
                style={{ background: "radial-gradient(circle, #d713f9 0%, #32d6ff 70%, transparent 100%)" }}
              />
            </div>
            <div className="relative">
              <div
                className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-prisma-navy"
                style={{ background: "var(--gradient-agenda)" }}
              >
                <CalendarDays className="h-8 w-8" aria-hidden="true" />
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                Agenda tu diagnóstico gratuito
              </h3>
              <p className="mt-3 text-white/80 leading-relaxed max-w-sm mx-auto">
                Elige el día y la hora que más te acomoden. Reservas en menos de un minuto,
                directo en nuestra agenda.
              </p>

              <a
                ref={magneticRef}
                href={MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta("agenda_diagnostico", "contacto_final")}
                className="magnetic nl-shine group mt-8 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-prisma-navy font-bold text-base md:text-lg shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                style={{ background: "var(--gradient-agenda)" }}
              >
                Reservar mi reunión
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>

              <p className="mt-5 text-sm text-white/70">
                30 minutos · Vía videollamada · Sin compromiso
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
