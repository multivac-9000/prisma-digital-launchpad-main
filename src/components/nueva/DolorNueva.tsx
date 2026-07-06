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

/* COSTO DE NO ACTUAR como capítulo de scrollytelling: en escritorio la sección
   se fija (sticky) y los tres dolores avanzan con el scroll, con un riel de
   progreso espectral. En móvil fluye como columna normal con revelados. */
export default function DolorNueva() {
  const { wrapRef, step } = usePinnedSteps(dolores.length);

  return (
    <section
      id="nosotros"
      ref={wrapRef as React.Ref<HTMLElement>}
      className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] lg:h-[320vh]"
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
        <div className="relative mx-auto max-w-6xl px-6 w-full grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Izquierda: titular fijado + riel de progreso */}
          <div>
            <Reveal variant="blur">
              <p className="text-xs font-bold tracking-[0.3em] uppercase text-prisma-cyan mb-4">
                El costo de no actuar
              </p>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.12] tracking-tight text-balance">
                Tu competencia no es mejor.
                <br />
                <span className="nl-text-gradient">Solo decidió antes que tú.</span>
              </h2>
            </Reveal>
            <Reveal as="p" delay={140} className="mt-6 text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              El riesgo ya no es “no existir”: es quedarte atrás con todo lo que ya construiste.
              Ordenar el caos digital es más simple de lo que te han hecho creer.
            </Reveal>

            {/* Riel de progreso: solo en el modo fijado (escritorio) */}
            <div className="hidden lg:flex mt-10 gap-5">
              <div className="relative w-[3px] rounded-full bg-white/10 overflow-hidden">
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
                        step >= i ? "bg-prisma-magenta scale-110" : "bg-white/20"
                      }`}
                    />
                    {label}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Derecha: tarjetas que avanzan con el scroll (crossfade en escritorio) */}
          <div className="lg:relative lg:h-[360px]">
            {dolores.map(({ icon: Icon, title, body }, i) => (
              <Reveal
                key={title}
                as="article"
                delay={i * 120}
                className={`mb-5 lg:mb-0 lg:absolute lg:inset-0 lg:flex lg:items-center lg:transition-all lg:duration-700 lg:ease-[cubic-bezier(0.22,0.65,0.3,0.9)] ${
                  step === i
                    ? "lg:opacity-100 lg:translate-y-0"
                    : step > i
                      ? "lg:opacity-0 lg:-translate-y-10 lg:pointer-events-none"
                      : "lg:opacity-0 lg:translate-y-10 lg:pointer-events-none"
                }`}
              >
                <div className="w-full rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-8 lg:p-10">
                  <div className="nl-tile-gradient inline-flex h-12 w-12 items-center justify-center rounded-xl text-white mb-5">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="text-xs font-bold tracking-[0.25em] uppercase text-white/40 mb-2">
                    {String(i + 1).padStart(2, "0")} / 03
                  </p>
                  <h3 className="text-xl lg:text-2xl font-bold text-white leading-snug">{title}</h3>
                  <p className="mt-3 text-white/75 leading-relaxed lg:text-lg">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
