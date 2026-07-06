import { ShieldCheck, ClipboardList, Map, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";
import { trackCta } from "./track";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

type Entregable = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const entregables: Entregable[] = [
  {
    icon: ClipboardList,
    title: "Auditoría de 15 puntos",
    body: "Revisamos tu web, tu medición, tus campañas y tus integraciones. Sales sabiendo qué está bien, qué está roto y qué está dejando plata sobre la mesa.",
  },
  {
    icon: Map,
    title: "Plan priorizado a 90 días",
    body: "No un informe genérico: una hoja de ruta con lo primero que hay que arreglar y por qué, ordenada por impacto en tus ventas.",
  },
  {
    icon: TrendingUp,
    title: "Proyección de resultados",
    body: "Una estimación honesta, con números de tu rubro, de cuánto puede crecer tu canal online si ejecutas el plan.",
  },
];

/* GARANTÍA EXPLÍCITA (respalda el "Garantizado" del title) + valor del diagnóstico. */
export default function GarantiaNueva() {
  return (
    <section id="garantia" className="relative py-20 md:py-28 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, #d713f9 0%, transparent 45%), radial-gradient(circle at 15% 80%, #32d6ff 0%, transparent 45%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Garantía */}
        <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
          <div
            className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white"
            style={{ background: "var(--gradient-brand)" }}
          >
            <ShieldCheck className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.15]">
            Avances medibles en 90 días,
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              o seguimos trabajando sin costo.
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed">
            En el diagnóstico definimos juntos las métricas que importan para tu negocio. Si en 90
            días de trabajo no ves avances medibles en esas métricas, seguimos trabajando sin costo
            hasta lograrlo. Medimos todo y te mostramos todo — así se gana la confianza.
          </p>
        </div>

        {/* Qué recibes en el diagnóstico */}
        <h2 className="mt-20 text-center text-3xl md:text-4xl font-extrabold text-white leading-[1.15]">
          Qué recibes en tu diagnóstico gratuito
        </h2>
        <p className="mt-4 text-center text-base md:text-lg text-white/75 max-w-2xl mx-auto">
          Es gratis, pero no es una charla de venta: es trabajo real sobre tu negocio.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {entregables.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-8"
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white mb-5"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
              <p className="mt-3 text-white/75 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("agenda_diagnostico", "garantia")}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-prisma-navy font-bold text-base md:text-lg shadow-2xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ background: "var(--gradient-agenda)" }}
          >
            Agenda tu Diagnóstico Gratis
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
