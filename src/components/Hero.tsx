import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

type Particle = { size: number; top: number; left: number; delay: number };

/* HERO: fondo navy + efecto magnético (spotlight + botón) inspirado en Antigravity */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Partículas generadas en cliente (evita mismatch de hidratación SSR).
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, () => ({
        size: Math.random() * 4 + 2,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 8,
      })),
    );
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

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle absolute rounded-full bg-white/70"
            style={{
              width: p.size,
              height: p.size,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              boxShadow: "0 0 12px rgba(215,19,249,0.6)",
            }}
          />
        ))}
      </div>

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
            className="magnetic group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base md:text-lg shadow-2xl"
            style={{ background: "var(--gradient-cta)" }}
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
