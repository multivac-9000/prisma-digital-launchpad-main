import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

type RGB = [number, number, number];
type Node = { x: number; y: number; vx: number; vy: number; r: number; c: RGB };

/* HERO: fondo navy + red de datos (inteligencia + crecimiento) + efecto magnético */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Red de nodos conectados que ascienden: datos, inteligencia y crecimiento/éxito.
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
    const LINK = 140;

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
      const count = Math.max(24, Math.min(70, Math.floor(w / 26)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: -(Math.random() * 0.28 + 0.05), // ascienden = crecimiento/éxito
        r: Math.random() * 1.6 + 0.9,
        c: COLORS[i % COLORS.length],
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Conexiones entre nodos cercanos
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
      // Nodos
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.9)`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.y < -12) {
          n.y = h + 12;
          n.x = Math.random() * w;
        }
        if (n.x < -12) n.x = w + 12;
        else if (n.x > w + 12) n.x = -12;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    init();
    if (reduce)
      draw(); // un frame estático, sin animación
    else step();

    const onResize = () => {
      resize();
      init();
      if (reduce) draw();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Efecto magnético: spotlight sigue el cursor y el botón se atrae hacia él.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const spot = spotlightRef.current;
        if (spot) {
          spot.style.setProperty("--mx", `${x}px`);
          spot.style.setProperty("--my", `${y}px`);
        }
        const btn = btnRef.current;
        if (btn) {
          const br = btn.getBoundingClientRect();
          const bx = br.left + br.width / 2 - rect.left;
          const by = br.top + br.height / 2 - rect.top;
          const dx = x - bx;
          const dy = y - by;
          const dist = Math.hypot(dx, dy) || 1;
          const radius = 220;
          if (dist < radius) {
            const pull = (1 - dist / radius) * 16;
            btn.style.transform = `translate(${(dx / dist) * pull}px, ${(dy / dist) * pull}px)`;
          } else {
            btn.style.transform = "";
          }
        }
      });
    };
    const onLeave = () => {
      if (btnRef.current) btnRef.current.style.transform = "";
    };

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden pt-32 pb-40 md:pt-44 md:pb-56"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Aura giratoria + spotlight magnético */}
      <div className="hero-aura" aria-hidden="true" />
      <div ref={spotlightRef} className="hero-spotlight" aria-hidden="true" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full pointer-events-none opacity-80"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Eslogan basado en datos */}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs md:text-sm font-medium text-white/85 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-prisma-cyan" />
          Prisma Digital lo hace posible con datos, no con suposiciones
        </span>

        <h1 className="mt-6 text-4xl md:text-6xl lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
          Tu negocio existe.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Tus clientes, todavía no lo saben.
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
          Llevamos tu empresa al mundo digital y la convertimos
          <br className="hidden md:block" />
          en una máquina de prospección predecible en 90 días.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            ref={btnRef}
            href={MEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic group inline-flex items-center gap-2 px-8 py-4 rounded-full text-prisma-navy font-bold text-base md:text-lg shadow-2xl"
            style={{ background: "var(--gradient-agenda)" }}
          >
            Agenda tu Diagnóstico Gratis
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-[13px] text-white/55">
            30 minutos · Sin costo · Sin compromiso · Solo claridad
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 leading-[0]">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-[80px] md:h-[120px]"
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
