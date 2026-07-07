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
        {/* Garantía: banda horizontal con el escudo a la izquierda */}
        <Reveal variant="scale">
          <div className="nl-beam mx-auto max-w-5xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 md:px-12 md:py-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 text-center md:text-left">
              <div className="nl-tile-gradient mx-auto md:mx-0 flex h-16 w-16 md:h-24 md:w-24 shrink-0 items-center justify-center rounded-2xl text-white">
                <ShieldCheck className="h-8 w-8 md:h-12 md:w-12" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.3em] uppercase text-prisma-cyan mb-3">
                  Nuestra garantía
                </p>
                <h2 className="text-2xl md:text-[34px] font-extrabold text-white leading-[1.15] text-balance">
                  {"Avances medibles en 90 días, "}
                  <span className="nl-text-gradient">o seguimos sin costo.</span>
                </h2>
                <p className="mt-4 max-w-3xl text-sm md:text-[15px] text-white/65 leading-relaxed">
                  En el diagnóstico definimos juntos las métricas que importan para tu negocio; si
                  en 90 días no ves avances medibles, seguimos trabajando sin costo hasta lograrlo.
                </p>
              </div>
            </div>
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

        {/* Calugas horizontales: icono + título a la izquierda, detalle a la derecha */}
        <div className="mt-12 flex flex-col gap-4 max-w-5xl mx-auto">
          {entregables.map(({ icon: Icon, title, body }, i) => (
            <Reveal
              key={title}
              as="article"
              variant="up"
              delay={i * 120}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:px-8 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-10 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 md:w-80 shrink-0">
                <div className="nl-tile-gradient inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-xs font-black nl-text-gradient" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-snug">{title}</h3>
                </div>
              </div>
              <p className="text-sm md:text-[15px] text-white/75 leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="mt-12 text-center">
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("agenda_diagnostico", "garantia")}
            className="nl-shine group inline-flex items-center gap-2 px-8 py-4 rounded-full text-prisma-navy font-bold text-lg md:text-xl shadow-2xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
