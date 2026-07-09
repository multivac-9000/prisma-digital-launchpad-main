import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Telescope,
  Target,
  HeartHandshake,
  EyeOff,
  LineChart,
  Hourglass,
  Globe,
  Workflow,
  Lightbulb,
  ShieldCheck,
  ClipboardList,
  Map,
  TrendingUp,
  Database,
  FlaskConical,
  BarChart3,
  Maximize2,
  type LucideIcon,
} from "lucide-react";
import { reducedMotion } from "@/components/nueva/scrolly";
import AccessGate from "@/components/AccessGate";

/* PRESENTACIÓN DE DIAGNÓSTICO (uso interno en reuniones).
   - No indexada (robots noindex) y sin Navbar/Footer: es un "deck" a pantalla completa.
   - Navegación: flechas del teclado, espacio, botones laterales, puntos y swipe.
   - Tipografía grande para acompañar la narración en vivo.
   - Solo anima transform/opacity y respeta prefers-reduced-motion. */

export const Route = createFileRoute("/presentacion-diagnostico")({
  head: () => ({
    meta: [
      { title: "Presentación Diagnóstico — Prisma Digital" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content: "Material de apoyo para reuniones de diagnóstico de Prisma Digital.",
      },
    ],
  }),
  component: () => (
    <AccessGate>
      <PresentacionPage />
    </AccessGate>
  ),
});

/* ---------- Estilos del deck (transiciones entre láminas) ---------- */
const DECK_CSS = `
.pd-slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;pointer-events:none;transform:translateX(64px);transition:opacity .5s cubic-bezier(.22,.65,.3,.9),transform .5s cubic-bezier(.22,.65,.3,.9),visibility 0s linear .5s;}
.pd-slide.pd-prev{transform:translateX(-64px);}
.pd-slide.pd-active{opacity:1;visibility:visible;pointer-events:auto;transform:none;transition:opacity .5s cubic-bezier(.22,.65,.3,.9),transform .5s cubic-bezier(.22,.65,.3,.9),visibility 0s;}
.pd-slide .pd-stagger{opacity:0;transform:translateY(26px);transition:opacity .5s cubic-bezier(.22,.65,.3,.9) var(--pd-d,0ms),transform .5s cubic-bezier(.22,.65,.3,.9) var(--pd-d,0ms);}
.pd-slide.pd-active .pd-stagger{opacity:1;transform:none;}
.pd-slide .pd-draw{stroke-dasharray:1;stroke-dashoffset:1;}
.pd-slide.pd-active .pd-draw{animation:nl-draw 1.4s .3s cubic-bezier(.4,0,.2,1) forwards;}
/* Punta de flecha: aparece cuando el trazo termina de dibujarse */
.pd-slide .pd-arrow{opacity:0;}
.pd-slide.pd-active .pd-arrow{animation:pd-fade .45s 1.25s ease-out forwards;}
@keyframes pd-fade{to{opacity:1;}}
/* Punto de datos que recorre la curva (glow pulsante) */
.pd-flowdot{animation:pd-flowdot 1.8s ease-in-out infinite;}
@keyframes pd-flowdot{0%,100%{opacity:.55;}50%{opacity:1;}}
@media (prefers-reduced-motion: reduce){
  .pd-slide,.pd-slide.pd-prev{transform:none;transition:opacity .2s linear,visibility 0s linear .2s;}
  .pd-slide.pd-active{transition:opacity .2s linear,visibility 0s;}
  .pd-slide .pd-stagger{opacity:1 !important;transform:none !important;transition:none !important;}
  .pd-slide .pd-draw{animation:none !important;stroke-dashoffset:0;}
  .pd-slide .pd-arrow{opacity:1 !important;animation:none !important;}
  .pd-flowdot{animation:none !important;}
}
`;

/* ---------- Métrica que cuenta al activarse la lámina ---------- */
function BigMetric({ value, active }: { value: string; active: boolean }) {
  const [text, setText] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;
    const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match || reducedMotion()) return;
    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / 1300);
      const eased = 1 - Math.pow(1 - t, 3);
      setText(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, value]);

  return <span className="nl-tabular">{text}</span>;
}

/* ---------- Piezas reutilizables ---------- */
function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="pd-stagger text-sm md:text-base font-bold tracking-[0.3em] uppercase text-prisma-cyan">
      {children}
    </p>
  );
}

function Glyph({ color, className = "" }: { color: string; className?: string }) {
  // Nodo de constelación (motivo de marca): crece con cada etapa de maduración.
  return (
    <svg viewBox="0 0 64 44" fill="none" className={className} aria-hidden="true">
      <line x1="32" y1="10" x2="12" y2="32" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />
      <line x1="32" y1="10" x2="32" y2="34" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />
      <line x1="32" y1="10" x2="52" y2="32" stroke={color} strokeOpacity="0.55" strokeWidth="1.5" />
      <circle cx="32" cy="9" r="5" fill={color} />
      <circle cx="12" cy="33" r="3.5" stroke={color} strokeWidth="1.5" />
      <circle cx="32" cy="35" r="3.5" stroke={color} strokeWidth="1.5" />
      <circle cx="52" cy="33" r="3.5" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

/* =================== LÁMINAS =================== */

function SlidePortada() {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12 text-center">
      <img
        src="/Logo Prisma Digital blanco.webp"
        alt="Logo Prisma Digital"
        className="pd-stagger mx-auto w-44 md:w-56 h-auto mb-10"
      />
      <h1
        className="pd-stagger text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight text-balance"
        style={{ "--pd-d": "120ms" } as React.CSSProperties}
      >
        Transforma los datos de tu empresa en un{" "}
        <span className="nl-text-gradient">ACTIVO RENTABLE</span>
      </h1>
      <p
        className="pd-stagger mt-8 text-xl md:text-2xl text-white/80"
        style={{ "--pd-d": "260ms" } as React.CSSProperties}
      >
        Decisiones digitales basadas en datos, con propósito humano.
      </p>
      <p
        className="pd-stagger mt-14 text-sm md:text-base text-white/45 font-medium"
        style={{ "--pd-d": "420ms" } as React.CSSProperties}
      >
        Usa las flechas ← → para navegar la presentación
      </p>
    </div>
  );
}

const identidad = [
  {
    icon: Telescope,
    title: "Visión",
    body: "Impulsar decisiones digitales basadas en datos y con propósito humano en empresas consolidadas.",
  },
  {
    icon: Target,
    title: "Misión",
    body: "Fortalecer los pilares del ecosistema digital midiendo lo importante, con mentalidad de crecimiento.",
  },
  {
    icon: HeartHandshake,
    title: "Propósito",
    body: "Potenciar los activos digitales de empresas que buscan modernizar su presencia en el mercado.",
  },
];

function SlideIdentidad() {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12 text-center">
      <Kicker>Quiénes somos</Kicker>
      <h2
        className="pd-stagger mt-4 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
        style={{ "--pd-d": "100ms" } as React.CSSProperties}
      >
        Una brújula clara: <span className="nl-text-gradient">datos con propósito.</span>
      </h2>
      <p
        className="pd-stagger mx-auto mt-5 max-w-3xl text-lg md:text-xl text-white/75"
        style={{ "--pd-d": "180ms" } as React.CSSProperties}
      >
        Somos Prisma Digital: acompañamos a empresas con años de trayectoria a crecer en el mundo
        online — construyendo, conectando y midiendo su ecosistema digital para que cada decisión se
        tome con datos.
      </p>
      <div className="mt-12 grid gap-6 md:grid-cols-3 text-left">
        {identidad.map(({ icon: Icon, title, body }, i) => (
          <article
            key={title}
            className="pd-stagger rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 md:p-8"
            style={{ "--pd-d": `${200 + i * 130}ms` } as React.CSSProperties}
          >
            <div className="nl-tile-gradient inline-flex h-14 w-14 items-center justify-center rounded-xl text-white mb-5">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-3 text-lg text-white/80 leading-relaxed">{body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const dolores = [
  {
    icon: EyeOff,
    title: "Publicidad a ciegas",
    body: "Se invierte en campañas sin saber con certeza cuáles traen ventas y cuáles solo gastan presupuesto.",
  },
  {
    icon: LineChart,
    title: "Nada se mide",
    body: "La web o la app existen, pero nadie sabe qué hacen los clientes ahí: qué miran, dónde se van, por qué no compran.",
  },
  {
    icon: Hourglass,
    title: "Siempre para después",
    body: "Lo digital se posterga cada año entre tecnicismos y proveedores que no explican nada.",
  },
];

function SlideProblema() {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12 text-center">
      <Kicker>El costo de no actuar</Kicker>
      <h2
        className="pd-stagger mt-4 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
        style={{ "--pd-d": "100ms" } as React.CSSProperties}
      >
        “No camines a ciegas. <span className="nl-text-gradient">No con la analítica web.”</span>
      </h2>
      <div className="mt-12 grid gap-6 md:grid-cols-3 text-left">
        {dolores.map(({ icon: Icon, title, body }, i) => (
          <article
            key={title}
            className="pd-stagger rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 md:p-8"
            style={{ "--pd-d": `${200 + i * 130}ms` } as React.CSSProperties}
          >
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-prisma-red/15 text-prisma-red mb-5">
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-3 text-lg text-white/80 leading-relaxed">{body}</p>
          </article>
        ))}
      </div>
      <p
        className="pd-stagger mt-10 text-lg md:text-xl text-white/70"
        style={{ "--pd-d": "620ms" } as React.CSSProperties}
      >
        Sin medición no hay forma de saber si te acercas — o te alejas — de tus objetivos.
      </p>
    </div>
  );
}

const flujo = [
  {
    icon: Globe,
    label: "INPUT",
    title: "Tu producto digital",
    body: "Web, app o ecommerce: su sola existencia ya genera interacciones con el mercado.",
    color: "#32d6ff",
  },
  {
    icon: Workflow,
    label: "PROCESO",
    title: "Medición e integración",
    body: "Conectamos y configuramos tus herramientas de medición (Google Analytics, píxeles, tu CRM) para registrar cada interacción que importa.",
    color: "#d713f9",
  },
  {
    icon: Lightbulb,
    label: "RESULTADO",
    title: "Decisiones con datos",
    body: "Sabes a quién le hablas, dónde invertir cada peso y qué mejorar para vender más — sin adivinar.",
    color: "#fd3833",
  },
];

function SlideSolucion() {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12 text-center">
      <Kicker>La solución: Mide e Integra</Kicker>
      <h2
        className="pd-stagger mt-4 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
        style={{ "--pd-d": "100ms" } as React.CSSProperties}
      >
        Mide para gestionar. <span className="nl-text-gradient">Integra para automatizar.</span>
      </h2>
      <div className="mt-14 grid gap-10 md:gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch text-left">
        {flujo.map(({ icon: Icon, label, title, body, color }, i) => (
          <div key={label} className="contents">
            {i > 0 && (
              <div
                className="pd-stagger hidden md:flex items-center"
                style={{ "--pd-d": `${240 + i * 180}ms` } as React.CSSProperties}
                aria-hidden="true"
              >
                <ArrowRight className="h-9 w-9 text-white/40" />
              </div>
            )}
            <article
              className="pd-stagger rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 md:p-8"
              style={{ "--pd-d": `${180 + i * 180}ms` } as React.CSSProperties}
            >
              <p className="text-sm font-black tracking-[0.3em]" style={{ color }}>
                {label}
              </p>
              <div
                className="mt-4 inline-flex h-14 w-14 items-center justify-center rounded-xl"
                style={{ background: `${color}22`, color }}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-2xl font-bold">{title}</h3>
              <p className="mt-3 text-lg text-white/80 leading-relaxed">{body}</p>
            </article>
          </div>
        ))}
      </div>
      <p
        className="pd-stagger mt-10 text-lg md:text-xl text-white/70"
        style={{ "--pd-d": "760ms" } as React.CSSProperties}
      >
        Los datos pasan a ser el corazón de un sistema de toma de decisiones — no un reporte más.
      </p>
    </div>
  );
}

/* Curva de maduración de datos: recreación de la infografía original
   (4 etapas ascendentes, de las técnicas digitales a las de data science). */
const etapasMaduracion = [
  {
    goal: "Conocer tu negocio",
    title: "Gestión de Datos",
    metodo: "Análisis: Modelo de Datos",
    color: "#32d6ff",
    lift: "lg:mt-36",
    glyph: "w-10",
    items: [
      "Definición de objetivos y KPIs",
      "Gestión de calidad de datos",
      "Implementación de herramientas",
      "Etiquetado de campañas",
      "Cuadros de mando automatizados",
    ],
  },
  {
    goal: "Mejorar tus resultados",
    title: "Optimización Canal Online",
    metodo: "Análisis Digital",
    color: "#8a45f7",
    lift: "lg:mt-24",
    glyph: "w-12",
    items: [
      "Tendencias y patrones",
      "Captación · contenido · conversión",
      "Pérdidas (churn)",
      "Análisis descriptivo y prescriptivo",
      "Competencia",
    ],
  },
  {
    goal: "Aprovechar tus capacidades",
    title: "Conocimiento del Cliente",
    metodo: "Análisis de Cliente",
    color: "#d713f9",
    lift: "lg:mt-12",
    glyph: "w-14",
    items: [
      "Ciclo de vida y fidelidad",
      "Análisis RFM",
      "Análisis de sentimiento",
      "Identificación de oportunidades",
    ],
  },
  {
    goal: "Impactar en el mercado",
    title: "Modelos Estadísticos",
    metodo: "Análisis Competitivo",
    color: "#fd3833",
    lift: "lg:mt-0",
    glyph: "w-16",
    items: [
      "Regresión · predicción · clasificación",
      "Modelos de atribución y afinidad",
      "Clustering de clientes",
      "Propensión de compra",
      "Elasticidad al precio",
    ],
  },
];

/* Curva de maduración: una sola línea continua, ascendente, dibujada en píxeles
   reales (se mide el contenedor con ResizeObserver → sin distorsión). Vive en su
   propia franja arriba, NO cruza los textos. Trae flecha final orientada a la
   tangente y un punto de datos que la recorre en bucle (movimiento de marca). */
function MaturityCurve() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [{ w, h }, setDims] = useState({ w: 1100, h: 150 });
  const [flow, setFlow] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setDims({ w: el.clientWidth || 1100, h: el.clientHeight || 150 });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (!reducedMotion()) setFlow(true);
    return () => ro.disconnect();
  }, []);

  const pad = 20;
  const x0 = pad;
  const y0 = h - pad;
  const x1 = w - pad;
  const y1 = pad;
  const dx = x1 - x0;
  const dy = y0 - y1;
  // Bézier cúbica: se mantiene bien abajo y casi plana por más de la mitad del
  // recorrido, y recién sobre el final sube fuerte hacia la flecha — así el
  // punto de partida se lee claramente mucho más abajo que la punta.
  const cx1 = x0 + dx * 0.48;
  const cy1 = y0 - dy * 0.03;
  const cx2 = x1 - dx * 0.1;
  const cy2 = y1 + dy * 0.32;
  const d = `M ${x0} ${y0} C ${cx1} ${cy1} ${cx2} ${cy2} ${x1} ${y1}`;
  const ang = (Math.atan2(y1 - cy2, x1 - cx2) * 180) / Math.PI; // tangente final

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="absolute inset-0 overflow-visible"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="pd-curve-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#32d6ff" />
            <stop offset="55%" stopColor="#d713f9" />
            <stop offset="100%" stopColor="#fd3833" />
          </linearGradient>
          <filter id="pd-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Halo suave para dar cuerpo y visibilidad */}
        <path
          id="pd-curve-path"
          className="pd-draw"
          d={d}
          stroke="url(#pd-curve-grad)"
          strokeWidth={16}
          strokeOpacity={0.16}
          strokeLinecap="round"
          pathLength={1}
        />
        {/* Trazo principal, grueso y nítido */}
        <path
          className="pd-draw"
          d={d}
          stroke="url(#pd-curve-grad)"
          strokeWidth={5}
          strokeLinecap="round"
          pathLength={1}
          style={{ filter: "drop-shadow(0 0 6px rgba(215,19,249,0.45))" }}
        />

        {/* Flecha final orientada a la tangente (aparece al terminar el trazo) */}
        <g className="pd-arrow" transform={`translate(${x1} ${y1}) rotate(${ang})`}>
          <path
            d="M 3 0 L -19 -11 L -11 0 L -19 11 Z"
            fill="#fd3833"
            style={{ filter: "drop-shadow(0 0 5px rgba(253,56,51,0.75))" }}
          />
        </g>

        {/* Punto de datos que recorre la curva en bucle */}
        {flow && (
          <circle r={5} fill="#ffffff" className="pd-flowdot" filter="url(#pd-glow)">
            <animateMotion dur="3.6s" begin="1.3s" repeatCount="indefinite" rotate="auto">
              <mpath href="#pd-curve-path" />
            </animateMotion>
          </circle>
        )}
      </svg>

      {/* Etiqueta de crecimiento continuo, junto a la flecha */}
      <span className="pd-arrow absolute right-1 top-0 text-[11px] font-bold uppercase tracking-[0.2em] text-white/55">
        y sigue creciendo
      </span>
    </div>
  );
}

function SlideMaduracion() {
  return (
    <div className="w-full max-w-7xl px-6 md:px-12">
      <div className="text-center">
        <Kicker>Nuestro factor diferenciador</Kicker>
        <h2
          className="pd-stagger mt-3 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
          style={{ "--pd-d": "100ms" } as React.CSSProperties}
        >
          El Modelo de <span className="nl-text-gradient">Maduración de Datos</span>
        </h2>
        <p
          className="pd-stagger mx-auto mt-3 max-w-2xl text-base md:text-lg text-white/70"
          style={{ "--pd-d": "160ms" } as React.CSSProperties}
        >
          No hacemos todo de golpe: hacemos crecer tus datos por etapas, y cada una desbloquea la
          siguiente.
        </p>
      </div>

      {/* Tramos superiores: qué familia de técnicas cubre cada mitad */}
      <div
        className="pd-stagger hidden lg:grid grid-cols-2 gap-6 mt-5 mb-1"
        style={{ "--pd-d": "220ms" } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="border-t-2 border-prisma-cyan/50 pt-2 text-center">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan/90">
            Técnicas de análisis digitales
          </span>
        </div>
        <div className="border-t-2 border-prisma-magenta/50 pt-2 text-center">
          <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-magenta">
            Técnicas Data Science
          </span>
        </div>
      </div>

      {/* FRANJA DE LA CURVA (solo escritorio): línea continua arriba, sin cruzar
          los textos. Más alta que antes para que el arranque quede bien abajo,
          bastante más bajo que la punta de la flecha final. */}
      <div
        className="pd-stagger hidden lg:block h-60 xl:h-72"
        style={{ "--pd-d": "260ms" } as React.CSSProperties}
      >
        <MaturityCurve />
      </div>

      {/* ETAPAS escalonadas (como el diseño original), debajo de la curva */}
      <div className="mt-1 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:items-start">
        {etapasMaduracion.map(({ goal, title, metodo, color, lift, glyph, items }, i) => (
          <article
            key={title}
            className={`pd-stagger ${lift ?? ""}`}
            style={{ "--pd-d": `${340 + i * 140}ms` } as React.CSSProperties}
          >
            <div className="flex flex-col items-center text-center">
              <Glyph color={color} className={`${glyph} h-auto mb-1.5`} />
              <p className="text-xs md:text-sm italic font-semibold" style={{ color }}>
                {goal}
              </p>
              <h3 className="mt-0.5 text-lg xl:text-xl font-extrabold leading-tight text-balance">
                {title}
              </h3>
              <div
                className="mt-2.5 h-1.5 w-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${color}, ${color}55)` }}
                aria-hidden="true"
              />
              <p className="mt-2 text-[11px] font-bold tracking-[0.18em] uppercase text-white/55">
                {metodo}
              </p>
            </div>
            <ul className="mt-3 space-y-1.5 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-left">
              {items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/80 leading-snug">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

const fasesPrimeraEtapa = [
  {
    n: "01",
    title: "Empatía Preliminar",
    items: ["Misión, visión y objetivos del negocio", "Situación actual de la analítica", "Confidencialidad y accesos"],
  },
  {
    n: "02",
    title: "Implementación Primordial",
    items: ["GTM como centralizador de etiquetas", "GA4, Google Ads y Search Console", "CRM y Píxel de Meta"],
  },
  {
    n: "03",
    title: "Integraciones Operativas",
    items: ["Tags de eventos, variables y triggers", "Botones clave y CTAs medidos", "Hotjar + conversiones vinculadas"],
  },
  {
    n: "04",
    title: "Configuración Estratégica",
    items: ["Propiedades y vistas por unidad", "KPIs comerciales y de fidelización", "Dimensiones y segmentos propios"],
  },
  {
    n: "05",
    title: "Dashboarding e Insights",
    items: ["Panel de control con KPIs útiles", "Canales con mayor ROI", "Audiencias y re-marketing"],
  },
  {
    n: "06",
    title: "Reporting y Mejora Continua",
    items: ["Acompañamiento mínimo 1 año", "Reportes semanales y mensuales", "Alertas en tiempo real"],
  },
];

function SlideRutaPrimera() {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12">
      <div className="text-center">
        <Kicker>Primera etapa de maduración</Kicker>
        <h2
          className="pd-stagger mt-4 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
          style={{ "--pd-d": "100ms" } as React.CSSProperties}
        >
          De la empatía <span className="nl-text-gradient">a los insights, en 6 fases.</span>
        </h2>
      </div>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {fasesPrimeraEtapa.map(({ n, title, items }, i) => (
          <article
            key={n}
            className="pd-stagger rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-6"
            style={{ "--pd-d": `${180 + i * 100}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl font-black nl-text-gradient">{n}</span>
              <h3 className="text-lg md:text-xl font-bold leading-tight">{title}</h3>
            </div>
            <ul className="space-y-1.5">
              {items.map((item) => (
                <li key={item} className="flex gap-2 text-[15px] text-white/80 leading-snug">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-prisma-cyan" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

const segundaEtapa = [
  {
    icon: FlaskConical,
    title: "Data Science y Optimización",
    color: "#32d6ff",
    items: [
      "Enhanced Ecommerce y embudos de conversión detallados",
      "DataLayers: páginas virtuales y URLs embebidas",
      "Experimentos de hipótesis y tests A/B",
      "BigQuery para grandes volúmenes de datos",
    ],
  },
  {
    icon: Database,
    title: "Inteligencia de Negocios",
    color: "#d713f9",
    items: [
      "Cuadro de Mando Integral con medición offline incluida",
      "Área de BI: datos internos y externos, limpios y útiles",
      "Asistencia en decisiones de inversión estratégica",
      "La visión transformada en planes de acción concretos",
    ],
  },
];

function SlideSegundaEtapa() {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12">
      <div className="text-center">
        <Kicker>Segunda etapa y extrapolación</Kicker>
        <h2
          className="pd-stagger mt-4 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
          style={{ "--pd-d": "100ms" } as React.CSSProperties}
        >
          De medir bien <span className="nl-text-gradient">a competir con inteligencia.</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 text-left">
        {segundaEtapa.map(({ icon: Icon, title, color, items }, i) => (
          <article
            key={title}
            className="pd-stagger rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 md:p-9"
            style={{ "--pd-d": `${220 + i * 160}ms` } as React.CSSProperties}
          >
            <div
              className="inline-flex h-14 w-14 items-center justify-center rounded-xl mb-5"
              style={{ background: `${color}22`, color }}
            >
              <Icon className="h-7 w-7" aria-hidden="true" />
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
            <ul className="mt-4 space-y-2.5">
              {items.map((item) => (
                <li key={item} className="flex gap-3 text-lg text-white/80 leading-snug">
                  <span className="mt-[9px] h-2 w-2 shrink-0 rounded-full" style={{ background: color }} />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p
        className="pd-stagger mt-10 text-center text-lg md:text-xl text-white/70"
        style={{ "--pd-d": "600ms" } as React.CSSProperties}
      >
        El destino: un sistema de inteligencia de negocios funcionando en automático.
      </p>
    </div>
  );
}

const resultados = [
  {
    logo: "/clients/emporio-nacional.png",
    name: "Emporio Nacional",
    metric: "+143%",
    detail: "ventas online en 60 días",
  },
  {
    logo: "/clients/logo liberty seguros.svg",
    name: "Liberty Seguros",
    metric: "4.2x",
    detail: "ROAS en campañas",
  },
  {
    logo: "/clients/logo-kum-04.svg",
    name: "Küm",
    metric: "+120%",
    detail: "leads calificados en 30 días",
  },
];

function SlideResultados({ active }: { active: boolean }) {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12 text-center">
      <Kicker>Pruebas de éxito</Kicker>
      <h2
        className="pd-stagger mt-4 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
        style={{ "--pd-d": "100ms" } as React.CSSProperties}
      >
        Resultados medibles, <span className="nl-text-gradient">no promesas.</span>
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {resultados.map(({ logo, name, metric, detail }, i) => (
          <article
            key={name}
            className="pd-stagger rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-8"
            style={{ "--pd-d": `${220 + i * 160}ms` } as React.CSSProperties}
          >
            <div className="mx-auto mb-6 flex h-16 w-fit items-center justify-center rounded-lg bg-white/95 px-5">
              <img
                src={logo}
                alt={`Logo ${name}, cliente de Prisma Digital`}
                className="max-h-10 max-w-32 object-contain"
                loading="lazy"
              />
            </div>
            <p className="text-6xl md:text-7xl font-extrabold nl-text-gradient">
              <BigMetric value={metric} active={active} />
            </p>
            <p className="mt-3 text-xl font-semibold text-white/85">{detail}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

const entregables = [
  {
    icon: ClipboardList,
    n: "01",
    title: "Auditoría de 15 puntos",
    body: "Revisamos tu web, tu medición y tus campañas: qué está bien, qué está roto y qué deja plata sobre la mesa.",
  },
  {
    icon: Map,
    n: "02",
    title: "Plan priorizado a 90 días",
    body: "Una hoja de ruta ordenada por impacto en tus ventas — no un informe genérico.",
  },
  {
    icon: TrendingUp,
    n: "03",
    title: "Proyección de resultados",
    body: "Una estimación honesta, con números de tu rubro, de cuánto puede crecer tu canal online.",
  },
];

function SlideAssessment() {
  return (
    <div className="w-full max-w-6xl px-6 md:px-12">
      <div className="text-center">
        <Kicker>Compromiso de trabajo real</Kicker>
        <h2
          className="pd-stagger mt-4 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance"
          style={{ "--pd-d": "100ms" } as React.CSSProperties}
        >
          Tu diagnóstico <span className="nl-text-gradient">incluye:</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3 text-left">
        {entregables.map(({ icon: Icon, n, title, body }, i) => (
          <article
            key={n}
            className="pd-stagger rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-7"
            style={{ "--pd-d": `${200 + i * 140}ms` } as React.CSSProperties}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="nl-tile-gradient inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <span className="text-3xl font-black nl-text-gradient">{n}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold leading-tight">{title}</h3>
            <p className="mt-3 text-lg text-white/80 leading-relaxed">{body}</p>
          </article>
        ))}
      </div>
      <div
        className="pd-stagger nl-beam mt-8 flex flex-col md:flex-row items-center gap-5 md:gap-7 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm px-7 py-6 text-center md:text-left"
        style={{ "--pd-d": "640ms" } as React.CSSProperties}
      >
        <div className="nl-tile-gradient flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white">
          <ShieldCheck className="h-8 w-8" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold leading-tight">
            Avances medibles en 90 días, <span className="nl-text-gradient">o seguimos sin costo.</span>
          </h3>
          <p className="mt-2 text-base md:text-lg text-white/70">
            Definimos juntos las métricas que importan. Medimos todo y te mostramos todo.
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideCierre() {
  // La reunión ES el diagnóstico: esta lámina no vende, transiciona al assessment en vivo.
  return (
    <div className="w-full max-w-5xl px-6 md:px-12 text-center">
      <h2 className="pd-stagger text-5xl md:text-7xl font-extrabold leading-[1.05] text-balance">
        Ahora sí: <span className="nl-text-gradient">tu diagnóstico en vivo.</span>
      </h2>
      <p
        className="pd-stagger mt-8 text-xl md:text-2xl text-white/80"
        style={{ "--pd-d": "180ms" } as React.CSSProperties}
      >
        La auditoría de 15 puntos, sobre tu negocio y con tus números reales.
      </p>
      <div className="pd-stagger mt-12" style={{ "--pd-d": "340ms" } as React.CSSProperties}>
        <Link
          to="/assessment"
          className="nl-shine group inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-xl md:text-2xl shadow-2xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          style={{ background: "var(--gradient-brand)" }}
        >
          Comenzar el diagnóstico
          <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
      <p
        className="pd-stagger mt-10 text-base md:text-lg text-white/55"
        style={{ "--pd-d": "500ms" } as React.CSSProperties}
      >
        Los resultados quedan guardados y son la base de tu plan priorizado a 90 días.
      </p>
    </div>
  );
}

/* =================== DECK =================== */

const SLIDE_TITLES = [
  "Portada",
  "Identidad",
  "El problema",
  "La solución",
  "Maduración de datos",
  "Primera etapa",
  "Segunda etapa",
  "Resultados",
  "Diagnóstico",
  "Cierre",
];

/* Fondo oscuro teñido por lámina: rompe la monotonía del azul manteniendo la
   paleta de marca (navy, cian, magenta, rojo). Siempre muy oscuro para no
   perder el contraste del texto blanco ni de los CTA. */
const bg = (base: string, halo1: string, halo2: string, top: string) =>
  `radial-gradient(120% 90% at 88% -12%, ${halo1} 0%, transparent 55%),` +
  `radial-gradient(90% 70% at -8% 105%, ${halo2} 0%, transparent 60%),` +
  `linear-gradient(${top}, ${base})`;

const SLIDE_BG = [
  bg("#000139", "#241a6b", "#14043f", "#050144"), // 0 Portada — navy púrpura
  bg("#00122e", "#0a5f88", "#04182f", "#04223f"), // 1 Identidad — cian/teal
  bg("#1b0622", "#7c1233", "#1e0720", "#2a0a26"), // 2 Problema — rojo/vino
  bg("#15003a", "#4a0f74", "#1a0740", "#1f0945"), // 3 Solución — magenta/púrpura
  bg("#001a45", "#1a5aa8", "#04204a", "#05285e"), // 4 Maduración — azul brillante
  bg("#001f2e", "#0a6b7a", "#042a30", "#043240"), // 5 Primera etapa — cian profundo
  bg("#0a0330", "#3f1f8a", "#160942", "#140a48"), // 6 Segunda etapa — violeta/índigo
  bg("#001d3a", "#1487c4", "#04204a", "#04315e"), // 7 Resultados — cian vivo
  bg("#16003a", "#5a1073", "#1a0740", "#22094a"), // 8 Diagnóstico — magenta
  bg("#000139", "#3a1f7a", "#2a0a4a", "#0a0640"), // 9 Cierre — navy tri-luz
];

function PresentacionPage() {
  const [index, setIndex] = useState(0);
  const total = SLIDE_TITLES.length;
  const touchX = useRef<number | null>(null);

  const go = (n: number) => setIndex(Math.max(0, Math.min(total - 1, n)));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setIndex((i) => Math.min(total - 1, i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(total - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const toggleFullscreen = () => {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  };

  const slides = [
    <SlidePortada key="portada" />,
    <SlideIdentidad key="identidad" />,
    <SlideProblema key="problema" />,
    <SlideSolucion key="solucion" />,
    <SlideMaduracion key="maduracion" />,
    <SlideRutaPrimera key="ruta1" />,
    <SlideSegundaEtapa key="ruta2" />,
    <SlideResultados key="resultados" active={index === 7} />,
    <SlideAssessment key="assessment" />,
    <SlideCierre key="cierre" />,
  ];

  return (
    <main
      className="fixed inset-0 overflow-hidden bg-[#000139] text-white"
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <style>{DECK_CSS}</style>
      <noscript>
        <style>{`.pd-slide{position:static;opacity:1;visibility:visible;transform:none;margin:48px 0;}`}</style>
      </noscript>

      {/* Fondos por lámina: crossfade de color al cambiar de diapositiva */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDE_BG.map((background, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ background, opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>

      {/* Grano fotográfico sobre el fondo (mata el look plástico) */}
      <div className="nl-grain absolute inset-0 overflow-hidden" aria-hidden="true" />

      {/* Barra de progreso superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30" aria-hidden="true">
        <div
          className="h-full transition-[width] duration-500 ease-out"
          style={{ width: `${((index + 1) / total) * 100}%`, background: "var(--nl-g-spectrum)" }}
        />
      </div>

      {/* Marca discreta (persistente) */}
      <div className="absolute top-5 left-6 z-30 flex items-center gap-3 opacity-70">
        <img src="/Logo Prisma Digital blanco.webp" alt="Prisma Digital" className="h-7 w-auto" />
      </div>

      {/* Láminas */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <section
            key={SLIDE_TITLES[i]}
            className={`pd-slide ${i === index ? "pd-active" : i < index ? "pd-prev" : ""}`}
            aria-hidden={i !== index}
            aria-label={`Lámina ${i + 1}: ${SLIDE_TITLES[i]}`}
          >
            <div className="max-h-full w-full overflow-y-auto py-16 flex items-center justify-center min-h-full">
              {slide}
            </div>
          </section>
        ))}
      </div>

      {/* Botones laterales */}
      <button
        type="button"
        onClick={() => go(index - 1)}
        disabled={index === 0}
        aria-label="Lámina anterior"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition hover:bg-white/15 disabled:opacity-25 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        disabled={index === total - 1}
        aria-label="Lámina siguiente"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition hover:bg-white/15 disabled:opacity-25 disabled:pointer-events-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ChevronRight className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Controles inferiores: contador, puntos, pantalla completa */}
      <div className="absolute bottom-5 inset-x-0 z-30 flex items-center justify-between px-6">
        <span className="nl-tabular text-sm font-bold text-white/50 w-24">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2.5" role="tablist" aria-label="Navegación de láminas">
          {SLIDE_TITLES.map((title, i) => (
            <button
              key={title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir a ${title}`}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7" : "w-2.5 bg-white/25 hover:bg-white/50"
              }`}
              style={i === index ? { background: "var(--nl-g-spectrum)" } : undefined}
            />
          ))}
        </div>
        <div className="w-24 flex justify-end">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Pantalla completa (tecla F)"
            title="Pantalla completa (F)"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-sm transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </main>
  );
}
