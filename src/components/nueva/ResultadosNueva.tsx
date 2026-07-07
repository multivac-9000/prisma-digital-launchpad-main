import { Activity } from "lucide-react";
import { Reveal, CountUp } from "./scrolly";

/* PRUEBA CON RESULTADOS: métricas + logos reales en el tercio superior.
   Los números cuentan desde 0 al entrar en pantalla (el valor final queda
   renderizado en SSR, así que sigue siendo indexable) y cada tarjeta lleva
   una sparkline que dibuja su tendencia al revelarse: datos duros, en vivo. */

const destacados = [
  {
    name: "Emporio Nacional",
    logo: "/clients/emporio-nacional.png",
    metric: "+143%",
    detail: "en ventas online",
    plazo: "en 60 días · retail con tienda física",
    color: "#d713f9",
    spark: "0,30 14,27 28,24 42,26 56,18 70,14 84,9 100,4",
  },
  {
    name: "Liberty Seguros",
    logo: "/clients/logo liberty seguros.svg",
    metric: "4.2x",
    detail: "de ROAS en campañas",
    plazo: "desde el primer mes · servicios",
    color: "#32d6ff",
    spark: "0,28 16,25 32,27 48,20 64,16 80,11 100,5",
  },
  {
    name: "Küm",
    logo: "/clients/logo-kum-04.svg",
    metric: "+120%",
    detail: "de leads calificados",
    plazo: "en 30 días · retail especialista",
    color: "#fd3833",
    spark: "0,32 20,27 40,23 60,20 80,11 100,6",
  },
];

/* Línea de tendencia que se dibuja sola (decorativa; el dato vive en el texto). */
function Sparkline({ color, points }: { color: string; points: string }) {
  const last = points.trim().split(" ").pop()!.split(",");
  const [cx, cy] = [Number(last[0]), Number(last[1])];
  return (
    <svg viewBox="0 0 100 38" className="w-full h-10 mt-5" aria-hidden="true" fill="none">
      <polygon
        className="nl-spark-fill"
        points={`${points} 100,38 0,38`}
        fill={color}
        fillOpacity="0.08"
      />
      <polyline
        className="nl-spark-path"
        points={points}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
      <circle className="nl-spark-dot" cx={cx} cy={cy} r="3.5" fill={color} />
    </svg>
  );
}

const otros = [
  { name: "Fexmin", logo: "/clients/Logo-Fexmin.png", result: "Primera venta online en 48 horas" },
  {
    name: "Mundo Deco Store",
    logo: "/clients/mundodecostore.png",
    result: "Estrategia digital activa en 2 semanas",
  },
  {
    name: "A Todo Vajilla",
    logo: "/clients/logo a todo vajilla.png",
    result: "Embudo de clientes activo con $0 en ads",
  },
  { name: "Ozono", logo: "/clients/ozono.png", result: "+65% de conversión en landing page" },
  { name: "U-Home", logo: "/clients/u-home.png", result: "Presencia digital sólida en 45 días" },
  {
    name: "La Regalería",
    logo: "/clients/la-regaleria.svg",
    result: "Tienda online operativa en 3 semanas",
  },
  {
    name: "Marco Schulz",
    logo: "/clients/logo Marco schulzs.png",
    result: "+89% de visitas orgánicas en 45 días",
  },
];

// NOTA: citas de referencia con atribución semi-anónima. Antes de convertir esta
// página en la landing oficial, reemplazar por testimonios reales aprobados por
// cada cliente (nombre completo, cargo y empresa verificados).
const testimonios = [
  {
    quote:
      "Llevábamos años vendiendo bien de forma tradicional, pero lo digital era una caja negra. Hoy sé exactamente qué campaña me trae ventas y cuánto me cuesta cada cliente nuevo.",
    author: "Gerente Comercial",
    company: "Retail con tienda física, Concepción",
  },
  {
    quote:
      "No necesitábamos otra página bonita: necesitábamos vender. En pocos meses el canal online pasó de ser una vitrina a ser la segunda caja del negocio.",
    author: "Dueño",
    company: "Comercio especialista, Región del Biobío",
  },
  {
    quote:
      "Nuestra célula de desarrollo tenía la app funcionando, pero nadie sabía qué hacían los usuarios adentro. Hoy cada evento clave está medido y por fin decidimos con datos.",
    author: "Jefe de Desarrollo",
    company: "Empresa de servicios, Concepción",
  },
  {
    quote:
      "Bajamos el costo por cliente casi a la mitad sin subir el presupuesto. Solo con marcar bien los objetivos, las campañas empezaron a optimizar de verdad.",
    author: "Jefa de Marketing",
    company: "Retail de servicios, Región del Biobío",
  },
];

export default function ResultadosNueva() {
  return (
    <section
      id="resultados"
      className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white pt-16 md:pt-24 pb-20 md:pb-28"
    >
      <div className="nl-gem" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="blur" className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-ink/70 shadow-sm mb-5">
            <Activity className="h-3.5 w-3.5 text-secondary" aria-hidden="true" />
            Datos duros de clientes reales
          </span>
          <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15] text-balance">
            Resultados medibles, <span className="nl-metric-gradient">no promesas.</span>
          </h2>
          <div className="nl-underline mx-auto mt-5" aria-hidden="true" />
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mt-6 max-w-2xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Trabajamos con negocios que ya venden y llevan años de trayectoria. Esto es lo que pasa
          cuando su mundo digital se empieza a medir en serio.
        </Reveal>

        {/* Métrica dura primero: logo + resultado que cuenta + tendencia + plazo */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {destacados.map(({ name, logo, metric, detail, plazo, color, spark }, i) => (
            <Reveal
              key={name}
              as="article"
              variant="scale"
              delay={i * 90}
              className="nl-beam-hover flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex h-16 items-center justify-center mb-5">
                <img
                  src={logo}
                  alt={`Logo ${name}, cliente de Prisma Digital`}
                  className="max-h-12 max-w-32 object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="text-5xl md:text-6xl font-extrabold nl-metric-gradient">
                <CountUp value={metric} />
              </p>
              <p className="mt-1 text-lg font-bold text-ink">{detail}</p>
              <p className="mt-2 text-sm text-muted-foreground">{plazo}</p>
              <Sparkline color={color} points={spark} />
            </Reveal>
          ))}
        </div>

        {/* Testimonios de negocios con trayectoria.
            Móvil: carrusel con scroll-snap (no alargan la página) · Escritorio: grilla 2x2 */}
        <div className="nl-noscrollbar mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-4 md:grid md:gap-6 md:grid-cols-2 md:overflow-visible md:mx-auto md:px-0 md:pb-0 max-w-4xl">
          {testimonios.map(({ quote, author, company }, i) => (
            <Reveal
              key={company}
              as="figure"
              variant={i % 2 === 0 ? "left" : "right"}
              delay={(i % 2) * 120}
              className="relative rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm snap-center shrink-0 w-[85%] sm:w-[70%] md:w-auto md:shrink"
            >
              <span
                className="absolute -top-4 left-7 text-6xl font-black leading-none nl-metric-gradient select-none"
                aria-hidden="true"
              >
                “
              </span>
              <blockquote className="text-[15px] md:text-lg text-ink/90 leading-relaxed pt-3">
                {quote}
              </blockquote>
              <figcaption className="mt-4 md:mt-5 text-sm">
                <span className="block font-bold text-ink">{author}</span>
                <span className="text-muted-foreground">{company}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground md:hidden" aria-hidden="true">
          Desliza para ver más testimonios →
        </p>
      </div>

      {/* Resto de clientes en marquee (se pausa al pasar el cursor) */}
      <Reveal delay={150} className="mt-16">
        <div className="nl-marquee-pause overflow-hidden relative pt-12">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex w-max animate-marquee">
            {[...otros, ...otros].map(({ name, logo, result }, i) => (
              <div key={`${name}-${i}`} className="group relative shrink-0 mx-6" title={result}>
                <div className="flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-white min-h-16 grayscale opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:border-primary/40">
                  <img
                    src={logo}
                    alt={`Logo ${name}, cliente de Prisma Digital`}
                    className="max-h-10 max-w-28 object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-lg z-20">
                  {result}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
