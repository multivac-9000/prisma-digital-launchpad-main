import type { CSSProperties, Ref } from "react";
import { EyeOff, LineChart, Hourglass, type LucideIcon } from "lucide-react";
import { Reveal, usePinnedSteps } from "./scrolly";

type Dolor = {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
};

const dolores: Dolor[] = [
  {
    icon: EyeOff,
    label: "Publicidad a ciegas",
    title: "Inviertes en publicidad a ciegas",
    body: "Pones plata en campañas, pero nadie puede decirte con certeza cuáles traen ventas y cuáles solo gastan presupuesto.",
  },
  {
    icon: LineChart,
    label: "Nada se mide",
    title: "Tu web o tu app no se miden",
    body: "Tienes presencia digital, pero no sabes qué hacen tus clientes ahí: qué miran, dónde se van, por qué no compran.",
  },
  {
    icon: Hourglass,
    label: "Siempre para después",
    title: "Lo digital se posterga cada año",
    body: "Sabes que es tu próximo salto, pero entre tecnicismos y proveedores que no explican nada, nunca parte en serio.",
  },
];

/* Tarjeta de dolor. En escritorio la posición/opacidad la controla el paso del
   capítulo fijado vía `style` (no clases), para no chocar con el sistema de
   revelados; en móvil se muestra estática y siempre legible. */
function DolorCard({
  dolor,
  index,
  desktopStyle,
}: {
  dolor: Dolor;
  index: number;
  desktopStyle?: CSSProperties;
}) {
  const { icon: Icon, title, body } = dolor;
  return (
    <article
      style={desktopStyle}
      className="w-full rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,1,57,0.5)]"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="nl-tile-gradient inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <span className="text-sm font-black tracking-[0.25em] text-white/45">
          {String(index + 1).padStart(2, "0")} <span className="text-white/25">/ 03</span>
        </span>
      </div>
      {/* Feedback continuo: la barra responde a cada tick de scroll (escritorio) */}
      <div
        className="hidden lg:block h-[3px] rounded-full bg-white/10 overflow-hidden mb-5"
        aria-hidden="true"
      >
        <div className="nl-rail-fill-x h-full" />
      </div>
      <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug">{title}</h3>
      <p className="mt-3 text-white/80 leading-relaxed lg:text-lg">{body}</p>
    </article>
  );
}

/* COSTO DE NO ACTUAR como capítulo de scrollytelling. En escritorio la sección
   se fija (sticky) y los tres dolores se turnan con el scroll, guiados por un
   riel de progreso espectral. En móvil fluye como columna normal con revelados. */
export default function DolorNueva() {
  const { wrapRef, step } = usePinnedSteps(dolores.length);

  return (
    <section
      id="nosotros"
      ref={wrapRef as Ref<HTMLElement>}
      className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] lg:h-[200vh]"
    >
      <div className="nl-gem" aria-hidden="true" />
      <div
        className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]"
        aria-hidden="true"
      >
        <div
          className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #d713f9 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-[-15%] left-[-8%] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #32d6ff 0%, transparent 65%)" }}
        />
      </div>

      <div className="lg:sticky lg:top-0 lg:h-screen flex items-center py-20 md:py-28 lg:py-0">
        <div className="relative z-10 mx-auto max-w-6xl px-6 w-full grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Izquierda: titular fijado + riel de progreso */}
          <div>
            <Reveal variant="blur">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-prisma-cyan mb-4">
                El costo de no actuar
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12] tracking-tight text-balance">
                Tu competencia no es mejor.
                <br />
                <span className="nl-text-gradient">Solo decidió antes que tú.</span>
              </h2>
            </Reveal>
            <Reveal
              as="p"
              delay={140}
              className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed"
            >
              El riesgo ya no es “no existir”: es quedarte atrás con todo lo que ya construiste.
              Ordenar el caos digital es más simple de lo que te han hecho creer.
            </Reveal>

            {/* Riel de progreso: solo en el modo fijado (escritorio) */}
            <div className="hidden lg:flex mt-10 gap-5">
              <div className="relative w-1 rounded-full bg-white/10 overflow-hidden">
                <div className="nl-rail-fill absolute inset-0" />
              </div>
              <ol className="flex flex-col gap-6 list-none">
                {dolores.map(({ label }, i) => (
                  <li
                    key={label}
                    className={`flex items-center gap-3 text-sm font-semibold tracking-wide transition-all duration-500 ${
                      step === i ? "text-white translate-x-1" : "text-white/40"
                    }`}
                  >
                    <span
                      className={`inline-flex h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                        step >= i ? "bg-prisma-magenta scale-125" : "bg-white/20"
                      }`}
                    />
                    {label}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Derecha (móvil): tarjetas apiladas, siempre visibles */}
          <div className="flex flex-col gap-5 lg:hidden">
            {dolores.map((dolor, i) => (
              <Reveal key={dolor.title} delay={i * 120}>
                <DolorCard dolor={dolor} index={i} />
              </Reveal>
            ))}
          </div>

          {/* Derecha (escritorio): crossfade controlado por el paso */}
          <div className="relative hidden lg:block lg:h-[330px]" aria-hidden="false">
            {dolores.map((dolor, i) => {
              const active = step === i;
              const passed = step > i;
              return (
                <div
                  key={dolor.title}
                  className="absolute inset-0 flex items-center transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,0.65,0.3,0.9)]"
                  style={{
                    opacity: active ? 1 : 0,
                    transform: `translateY(${active ? "0" : passed ? "-2rem" : "2rem"})`,
                    pointerEvents: active ? "auto" : "none",
                  }}
                >
                  <DolorCard dolor={dolor} index={i} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
