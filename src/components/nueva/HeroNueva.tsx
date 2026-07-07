import { useEffect, useRef, Fragment, type CSSProperties } from "react";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { trackCta } from "./track";
import { Reveal } from "./scrolly";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

type RGB = [number, number, number];
type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx: number;
  fy: number;
  r: number;
  c: RGB;
};

const H1_LINE_1 = "Llevas años consolidando tu negocio.";
const H1_LINE_2 = "Ahora dupliquemos tus ventas online.";

// Cinta de datos: resultados reales de clientes, en vivo bajo el hero.
const tickerItems = [
  "+143% ventas online — Emporio Nacional",
  "ROAS 4.2x — Liberty Seguros",
  "+120% leads calificados — Küm",
  "Primera venta online en 48 h — Fexmin",
  "+65% conversión en landing — Ozono",
  "+89% visitas orgánicas — Marco Schulz",
];

/* Cinta de resultados estilo mercado: el dato duro en movimiento constante. */
function DataTicker({ items = tickerItems }: { items?: string[] }) {
  return (
    <div
      className="nl-ticker nl-marquee-pause relative mt-5 md:mt-6 border-y border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden"
      aria-label="Resultados recientes de clientes de Prisma Digital"
    >
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#000139] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#000139] to-transparent z-10" />
      <div className="flex w-max animate-marquee items-center py-3">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="nl-tabular flex items-center gap-2 mx-7 text-sm font-semibold text-white/75 whitespace-nowrap"
          >
            <TrendingUp className="h-4 w-4 text-prisma-cyan shrink-0" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Titular con entrada cinética palabra por palabra (CSS puro, indexable en SSR).
   El espacio va FUERA del span animado: dentro de un inline-block CSS lo
   colapsaría y las palabras quedarían pegadas. */
function KineticLine({
  text,
  gradient = false,
  offset = 0,
}: {
  text: string;
  gradient?: boolean;
  offset?: number;
}) {
  const words = text.split(" ");
  return (
    <span className="block">
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            className={`nl-word ${gradient ? "nl-text-gradient" : ""}`}
            style={{ "--nl-i": offset + i } as CSSProperties}
          >
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </span>
  );
}

/* HERO para empresas consolidadas: misma red neuronal de datos (motivo de
   constelaciones de la marca) sobre una malla oscura asimétrica con grano. */
export default function HeroNueva({
  h1Line1 = H1_LINE_1,
  h1Line2 = H1_LINE_2,
  description = "Integramos y optimizamos tu ecosistema digital para que dupliques tus ventas online — midiendo cada peso invertido, sin que necesites un equipo técnico propio.",
  customTickerItems,
  ctaText = "Agenda tu Diagnóstico Gratis",
  ctaId = "agenda_diagnostico",
}: {
  h1Line1?: string;
  h1Line2?: string;
  description?: string;
  customTickerItems?: string[];
  ctaText?: string;
  ctaId?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLORS: RGB[] = [
      [50, 214, 255], // cyan
      [215, 19, 249], // magenta
      [254, 205, 43], // amarillo
    ];
    let nodes: Node[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const LINK = 150;
    const CURSOR_R = 210;
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const init = () => {
      const count = Math.max(26, Math.min(78, Math.floor(w / 24)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.5 + 0.28),
        fx: 0,
        fy: 0,
        r: Math.random() * 1.6 + 0.9,
        c: COLORS[i % COLORS.length],
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const alpha = (1 - Math.sqrt(d2) / LINK) * 0.42;
            ctx.strokeStyle = `rgba(${a.c[0]},${a.c[1]},${a.c[2]},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      if (mouse.active) {
        for (const n of nodes) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_R) {
            const t = 1 - d / CURSOR_R;
            ctx.strokeStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${t * 0.9})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${t * 0.22})`;
            ctx.arc(n.x, n.y, n.r + t * 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.92)`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const step = () => {
      for (const n of nodes) {
        if (mouse.active) {
          const dx = mouse.x - n.x;
          const dy = mouse.y - n.y;
          const d = Math.hypot(dx, dy);
          if (d < CURSOR_R && d > 0.01) {
            const f = (1 - d / CURSOR_R) * 0.18;
            n.fx += (dx / d) * f;
            n.fy += (dy / d) * f;
          }
        }
        n.fx *= 0.85;
        n.fy *= 0.85;
        n.x += n.vx + n.fx;
        n.y += n.vy + n.fy;
        if (n.y < -14) {
          n.y = h + 14;
          n.x = Math.random() * w;
        }
        if (n.x < -14) n.x = w + 14;
        else if (n.x > w + 14) n.x = -14;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    init();
    if (reduce) {
      draw();
    } else {
      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
      step();
    }

    const onResize = () => {
      resize();
      init();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="nl-dark relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-24"
    >
      {/* Capa decorativa: aura cónica + grano fotográfico */}
      <div className="nl-grain absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="nl-aura" />
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="nl-hero-exit relative mx-auto max-w-7xl px-6 text-center">
        <span className="nl-badge-anim inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-white/15 bg-white/5 px-3 md:px-4 py-1.5 text-[10px] tracking-tight sm:tracking-normal sm:text-xs md:text-sm font-medium text-white/90 backdrop-blur-sm whitespace-nowrap">
          <Sparkles
            className="hidden sm:inline-block h-4 w-4 text-prisma-cyan shrink-0"
            aria-hidden="true"
          />
          Decisiones digitales basadas en datos, con propósito humano
        </span>

        <h1 className="mt-6 text-4xl md:text-5xl lg:text-[clamp(2.75rem,4.7vw,3.75rem)] font-extrabold text-white leading-[1.08] tracking-tight text-balance">
          <KineticLine text={h1Line1} offset={1} />
          <KineticLine text={h1Line2} gradient offset={6} />
        </h1>

        <Reveal
          as="p"
          variant="blur"
          delay={380}
          className="mt-6 text-base md:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </Reveal>

        <Reveal variant="up" delay={520} className="mt-8 flex flex-col items-center gap-3">
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta(ctaId, "hero")}
            className="nl-shine group inline-flex items-center gap-2 px-8 py-4 rounded-full text-prisma-navy font-bold text-lg md:text-xl shadow-2xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ background: "var(--gradient-agenda)" }}
          >
            {ctaText}
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <p className="text-[11px] tracking-tight sm:tracking-normal sm:text-sm text-white/70 font-medium whitespace-nowrap">
            +300 negocios escalados · Resultados medibles en 90 días
          </p>
        </Reveal>

        {/* Invitación al scroll: la historia sigue con los resultados */}
        <Reveal variant="up" delay={650} className="mt-10 flex flex-col items-center gap-3">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/45">
            Los resultados hablan primero
          </span>
          <span className="nl-scrollhint" aria-hidden="true" />
        </Reveal>
      </div>

      {/* Cinta de datos en movimiento: fuera del contenedor con parallax de
          salida, para que siga viva mientras el hero se despide */}
      <div className="relative">
        <DataTicker items={customTickerItems} />
      </div>
    </section>
  );
}
