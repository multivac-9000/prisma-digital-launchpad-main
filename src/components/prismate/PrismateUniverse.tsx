import * as React from "react";
import { X, MessageCircle } from "lucide-react";
import { CENTERS, CENTER_BY_ID, type CenterId } from "@/lib/prism/bands";
import { GEOMETRY } from "@/lib/prism/geometry";
import { askPrismateExternally } from "./PrismateChat";

/* El 3D (three.js) se carga SOLO en el navegador (SSR-safe). */
const LightUniverse = React.lazy(() => import("./LightUniverse"));

/* Universo de exploración: las 9 luces con la misma intensidad (aún sin escaneo). */
const RANKING = CENTERS.map((c) => c.id);
const INTENSITIES = Object.fromEntries(CENTERS.map((c) => [c.id, 70])) as Record<CenterId, number>;

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Panel con la "información de valor" del color elegido. */
function CenterPanel({ id, onClose }: { id: CenterId; onClose: () => void }) {
  const c = CENTER_BY_ID[id];
  const g = GEOMETRY[id];
  return (
    <aside
      className="pointer-events-auto absolute inset-x-4 bottom-4 z-30 max-h-[60dvh] overflow-y-auto rounded-3xl border border-white/15 bg-[#05061e]/85 p-5 backdrop-blur-xl md:inset-x-auto md:bottom-6 md:right-6 md:w-[360px]"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: c.hex, boxShadow: `0 0 14px ${c.hex}` }} />
          <span className="text-lg font-bold text-white">{c.name}</span>
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="-mr-2 -mt-1 flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-1 text-[13px] tabular-nums text-white/55">
        {c.color} · {c.thz === "mezcla" ? "rojo + violeta" : `${c.thz} · ${c.nm}`}
      </p>
      <p className="mt-3 text-[15px] leading-snug text-white/90">{c.description}</p>
      <dl className="mt-4 flex flex-col gap-3 text-[14px] leading-snug">
        <div>
          <dt className="text-white/45">La razón de su luz</dt>
          <dd className="text-white/85">
            {c.thz === "mezcla"
              ? "No está en el arcoíris: nace de mezclar rojo y violeta, los dos extremos. Ahí la luz se cierra en un círculo."
              : `Vibra unos ${parseInt(c.thz)} billones de veces por segundo (${c.nm}). Eso es física real; lo que significa es un lenguaje para ordenar tus intereses.`}
          </dd>
        </div>
        <div>
          <dt className="text-white/45">Geometría</dt>
          <dd className="text-white/85">{g.name} · {g.detail}</dd>
        </div>
        <div>
          <dt className="text-white/45">Mercado</dt>
          <dd className="text-white/85">{c.areas}</dd>
        </div>
        <div>
          <dt className="text-white/45">Ejemplos de nicho</dt>
          <dd className="text-white/85">{c.examples[0]} · {c.examples[1]}</dd>
        </div>
        <div>
          <dt className="text-white/45">En qué se puede convertir</dt>
          <dd className="text-white/85">{c.careers.slice(0, 3).join(", ")}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={() => {
          onClose();
          askPrismateExternally(
            `Mi luz dominante es ${c.name} (${c.areas.toLowerCase()}). ¿Cómo la convierto en un negocio con datos?`,
          );
        }}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-bold text-prisma-navy transition-transform hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Habla con Prismate sobre {c.name}
      </button>
    </aside>
  );
}

/** El universo de luz de Prismate: prisma 3D + 9 colores + panel de info. */
export default function PrismateUniverse() {
  const [env, setEnv] = React.useState<{ webgl: boolean; reduced: boolean; compact: boolean } | null>(null);
  const [selected, setSelected] = React.useState<CenterId | null>(null);
  const [inView, setInView] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setEnv({
      webgl: hasWebGL(),
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      compact: window.innerWidth < 768,
    });
  }, []);

  // El 3D (y su entrada con zoom-out) se monta cuando el universo entra en pantalla.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[72svh] min-h-[460px] w-full overflow-hidden rounded-3xl border border-white/10 bg-black md:h-[76vh] md:max-h-[780px]"
    >
      {/* Título dentro del lienzo */}
      <div className="pointer-events-none absolute left-5 top-5 z-10 md:left-7 md:top-7">
        <h2 className="font-extrabold tracking-tight text-white text-[22px] md:text-[28px]">La luz de Prismate</h2>
        <p className="mt-1 text-[13px] text-white/60 md:text-[14px]">Gira con el dedo o el mouse. Toca un color para entenderlo.</p>
      </div>

      {/* 3D (solo navegador + con WebGL) */}
      {env === null || (env.webgl && !inView) ? (
        <div className="flex h-full items-center justify-center text-sm text-white/50">Abriendo tu universo de luz…</div>
      ) : env.webgl ? (
        <React.Suspense
          fallback={<div className="flex h-full items-center justify-center text-sm text-white/50">Abriendo tu universo de luz…</div>}
        >
          <LightUniverse
            intensities={INTENSITIES}
            ranking={RANKING}
            selected={selected}
            onSelect={(id) => setSelected(id)}
            dive={null}
            reduced={env.reduced}
            compact={env.compact}
            intro={!env.reduced}
          />
        </React.Suspense>
      ) : (
        /* Fallback sin WebGL: los 9 colores como grilla */
        <div className="flex h-full items-center justify-center p-6">
          <ul className="grid grid-cols-3 gap-4">
            {CENTERS.map((c) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => setSelected(c.id)}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 p-4 hover:border-white/30"
                >
                  <span className="h-10 w-10 rounded-full" style={{ background: c.hex, boxShadow: `0 0 20px ${c.hex}` }} />
                  <span className="text-xs text-white/80">{c.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Chips de los 9 colores (teclado, lectores de pantalla, dedos) */}
      {!selected && (
        <div className="absolute inset-x-0 bottom-0 z-10 overflow-x-auto px-4 pb-4 md:px-6 md:pb-5">
          <ul className="flex w-max gap-2" aria-label="Los 9 colores de Prismate">
            {RANKING.map((id) => {
              const x = CENTER_BY_ID[id];
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setSelected(id)}
                    className="flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 text-[13px] text-white/90 backdrop-blur hover:border-white/40"
                  >
                    <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: x.hex, boxShadow: `0 0 8px ${x.hex}` }} />
                    {x.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Panel de info del color elegido */}
      {selected && <CenterPanel id={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
