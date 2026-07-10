import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

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

/* HERO: red neuronal de datos que asciende y dispara sinapsis al pasar el cursor */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Nodos que ascienden y se conectan; cerca del cursor "disparan" como sinapsis.
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
        vy: -(Math.random() * 0.5 + 0.28), // ascienden, más rápido = crecimiento/éxito
        fx: 0, // fuerza dinámica (interacción con el cursor)
        fy: 0,
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
      // Sinapsis: el cursor dispara conexiones brillantes con los nodos cercanos
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
            // Destello del nodo al "dispararse"
            ctx.beginPath();
            ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},${t * 0.22})`;
            ctx.arc(n.x, n.y, n.r + t * 5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      // Nodos
      for (const n of nodes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${n.c[0]},${n.c[1]},${n.c[2]},0.92)`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    const step = () => {
      for (const n of nodes) {
        // Atracción hacia el cursor (fuerza puntual que luego se disipa)
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
    // Auto-reparación: si el navegador suspende la pestaña (gestor de memoria /
    // ahorro de energía), rAF se congela y a veces no vuelve a repintar solo al
    // volver. Al recuperar visibilidad, cancelamos cualquier frame pendiente y
    // reiniciamos el bucle — garantiza un único loop vivo, sin duplicarlo.
    const onVisible = () => {
      if (document.visibilityState === "visible" && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(step);
      }
    };

    resize();
    init();
    if (reduce) {
      draw(); // un frame estático, sin animación
    } else {
      section.addEventListener("mousemove", onMove);
      section.addEventListener("mouseleave", onLeave);
      document.addEventListener("visibilitychange", onVisible);
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
      document.removeEventListener("visibilitychange", onVisible);
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
      {/* Aura giratoria de fondo */}
      <div className="hero-aura" aria-hidden="true" />

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
