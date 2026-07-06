import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { trackCta } from "./track";

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

// Logos reales bajo el CTA: prueba social inmediata sin esperar el scroll.
const heroClients = [
  { name: "Liberty Seguros", logo: "/clients/logo liberty seguros.svg" },
  { name: "Fexmin", logo: "/clients/Logo-Fexmin.png" },
  { name: "Küm", logo: "/clients/logo-kum-04.svg" },
  { name: "Emporio Nacional", logo: "/clients/emporio-nacional.png" },
  { name: "Mundo Deco Store", logo: "/clients/mundodecostore.png" },
];

/* HERO para empresas consolidadas: misma red neuronal de datos del hero original
   (motivo de constelaciones de la marca), con copy orientado a duplicar ventas online. */
export default function HeroNueva() {
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
      className="relative overflow-hidden pt-28 pb-32 md:pt-40 md:pb-48"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="hero-aura" aria-hidden="true" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-medium text-white/90 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-prisma-cyan" aria-hidden="true" />
          Decisiones digitales basadas en datos, con propósito humano
        </span>

        <h1 className="mt-6 text-4xl md:text-6xl lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
          Llevas años llenando tu local.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Ahora dupliquemos tus ventas online.
          </span>
        </h1>

        <p className="mt-6 text-base md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Integramos y optimizamos tu ecosistema digital para que dupliques tus ventas online —
          midiendo cada peso invertido, sin que necesites un equipo técnico propio.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          <a
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCta("agenda_diagnostico", "hero")}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-prisma-navy font-bold text-base md:text-lg shadow-2xl transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            style={{ background: "var(--gradient-agenda)" }}
          >
            Agenda tu Diagnóstico Gratis
            <ArrowRight
              className="h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
          <p className="text-sm text-white/70 font-medium">
            +300 negocios escalados · Resultados medibles en 90 días
          </p>
        </div>

        {/* Prueba social inmediata: clientes reconocibles bajo el CTA */}
        <div className="mt-10 md:mt-12">
          <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-white/50 mb-4">
            Empresas que ya confían en Prisma Digital
          </p>
          <ul className="flex flex-wrap justify-center items-center gap-3 md:gap-4 list-none">
            {heroClients.map(({ name, logo }) => (
              <li
                key={name}
                className="flex items-center justify-center rounded-lg bg-white/95 px-4 py-2 h-12 md:h-14"
              >
                <img
                  src={logo}
                  alt={`Logo ${name}, cliente de Prisma Digital`}
                  className="max-h-8 md:max-h-10 max-w-24 md:max-w-28 object-contain"
                  loading="eager"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 leading-[0]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[80px] md:h-[120px]"
          aria-hidden="true"
        >
          <path
            d="M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,64 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
