import {
  ShieldCheck,
  ClipboardList,
  Map,
  TrendingUp,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { trackCta } from "./track";
import { Reveal } from "./scrolly";

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

/* GARANTÍA EXPLÍCITA (respalda el "Garantizado" del title) + valor del diagnóstico.
   La tarjeta lleva un borde de luz refractada permanente: es la promesa central. */
export default function GarantiaNueva() {
  return (
    <section
      id="garantia"
      className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28"
    >
      <div className="nl-gem" aria-hidden="true" />
      <div
        className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]"
        aria-hidden="true"
      >
        <div
          className="absolute top-[-10%] left-[10%] h-96 w-96 rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #d713f9 0%, transparent 65%)" }}
        />
        {/* Marca de agua: el 90 de la garantía */}
        <span className="nl-outline-num absolute -right-6 top-8 text-[11rem] md:text-[17rem] font-black leading-none">
          90
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Garantía */}
        <Reveal variant="scale">
          <div className="nl-beam mx-auto max-w-3xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-8 md:p-12 text-center">
            <div className="nl-tile-gradient mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white">
              <ShieldCheck className="h-8 w-8" aria-hidden="true" />
            </div>
            <p className="text-xs font-bold tracking-[0.3em] uppercase text-prisma-cyan mb-4">
              Nuestra garantía
            </p>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-[1.15] text-balance">
              Avances medibles en 90 días,
              <br />
              <span className="nl-text-gradient">o seguimos sin costo.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed">
              En el diagnóstico definimos juntos las métricas que importan para tu negocio. Si en 90
              días de trabajo no ves avances medibles en esas métricas, seguimos trabajando sin
              costo hasta lograrlo. Medimos todo y te mostramos todo — así se gana la confianza.
            </p>
          </div>
        </Reveal>

        {/* Qué recibes en el diagnóstico */}
        <Reveal variant="blur" className="mt-20 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white leading-[1.15] text-balance">
            Tu diagnóstico gratuito incluye:
          </h2>
          <p className="mt-4 text-base md:text-lg text-white/75 max-w-2xl mx-auto">
            Es gratis, pero no es una charla de venta: es trabajo real sobre tu negocio.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {entregables.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              key={title}
              as="article"
              variant="up"
              delay={i * 140}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="nl-tile-gradient inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <span className="text-3xl font-black nl-text-gradient" aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
              <p className="mt-3 text-white/75 leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("agenda_diagnostico", "garantia")}
            className="nl-shine group inline-flex items-center gap-2 px-8 py-4 rounded-full text-prisma-navy font-bold text-base md:text-lg shadow-2xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ background: "var(--gradient-agenda)" }}
          >
            Agenda tu Diagnóstico Gratis
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
