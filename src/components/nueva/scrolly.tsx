/* Utilidades de scrollytelling de la nueva landing.
   Sin librerías: IntersectionObserver + rAF. Respetan prefers-reduced-motion
   y solo animan transform/opacity/filter (vía las clases nl-* de styles.css). */
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Variante visual definida en styles.css: up | blur | scale | left | right */
  variant?: "up" | "blur" | "scale" | "left" | "right";
  /** Retardo en ms para escalonar elementos hermanos */
  delay?: number;
  as?: ElementType;
};

/** Revela su contenido al entrar al viewport (una sola vez). */
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion() || !("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      // Umbral bajo y sin margen negativo: la respuesta llega apenas el
      // elemento asoma — cada gesto de scroll produce feedback inmediato.
      { threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`nl-reveal nl-reveal-${variant} ${className}`}
      style={{ "--nl-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Cuenta desde 0 hasta el valor al entrar en pantalla. Acepta "+143%", "4.2x"…
    En SSR (y para bots) renderiza el valor final: el número siempre es indexable. */
export function CountUp({
  value,
  duration = 1100,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [text, setText] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match || reducedMotion() || !("IntersectionObserver" in window)) return;

    const [, prefix, num, suffix] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setText(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={`nl-tabular ${className}`}>
      {text}
    </span>
  );
}

/** Progreso de una sección "fijada" (pinned). Devuelve el paso activo y escribe
    el progreso continuo en la variable CSS --nl-p del contenedor (sin re-render). */
export function usePinnedSteps(count: number) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      el.style.setProperty("--nl-p", p.toFixed(4));
      // Sesgo +0.25: el primer cambio llega antes y el último no exige
      // llegar al fondo exacto — el capítulo se siente ágil, no pegajoso.
      const next = Math.min(count - 1, Math.floor(p * count + 0.25));
      setStep((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [count]);

  return { wrapRef, step };
}

/** Efecto magnético: el botón se inclina hacia el cursor dentro de su sección. */
export function useMagnetic<T extends HTMLElement>(radius = 200, pull = 14) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const btn = ref.current;
    const zone = btn?.closest("section");
    if (!btn || !zone || reducedMotion()) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const br = btn.getBoundingClientRect();
        const dx = e.clientX - (br.left + br.width / 2);
        const dy = e.clientY - (br.top + br.height / 2);
        const dist = Math.hypot(dx, dy) || 1;
        btn.style.transform =
          dist < radius
            ? `translate(${((dx / dist) * (1 - dist / radius) * pull).toFixed(1)}px, ${((dy / dist) * (1 - dist / radius) * pull).toFixed(1)}px)`
            : "";
      });
    };
    const onLeave = () => {
      btn.style.transform = "";
    };

    zone.addEventListener("mousemove", onMove);
    zone.addEventListener("mouseleave", onLeave);
    return () => {
      zone.removeEventListener("mousemove", onMove);
      zone.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [radius, pull]);

  return ref;
}

/** Barra de progreso de lectura (CSS scroll-driven; invisible sin soporte). */
export function ScrollProgress() {
  return (
    <div className="nl-progress-track" aria-hidden="true">
      <div className="nl-progress-bar" />
    </div>
  );
}
