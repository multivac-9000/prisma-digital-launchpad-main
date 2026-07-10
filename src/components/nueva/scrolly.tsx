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
import { rafSafe } from "@/components/motionRescue";

export const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Red de seguridad de los revelados: un único intervalo compartido que revisa
   posiciones por si IntersectionObserver no llega a disparar (pipeline de
   frames congelado). Barato: solo corre mientras queden elementos pendientes. */
type Watcher = { el: HTMLElement; fire: () => void };
const watchers = new Set<Watcher>();
let watchTimer = 0;
const checkWatchers = () => {
  const vh = window.innerHeight;
  for (const w of watchers) {
    const r = w.el.getBoundingClientRect();
    if (r.top < vh * 0.92 && r.bottom > 0) {
      watchers.delete(w);
      w.fire();
    }
  }
  if (!watchers.size && watchTimer) {
    clearInterval(watchTimer);
    watchTimer = 0;
  }
};
function watchVisible(el: HTMLElement, fire: () => void) {
  const w: Watcher = { el, fire };
  watchers.add(w);
  if (!watchTimer) watchTimer = window.setInterval(checkWatchers, 400);
  return () => {
    watchers.delete(w);
    if (!watchers.size && watchTimer) {
      clearInterval(watchTimer);
      watchTimer = 0;
    }
  };
}

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
    let unwatch: () => void = () => {};
    const fire = () => {
      el.classList.add("is-in");
      io.disconnect();
      unwatch();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fire();
      },
      // Umbral bajo y sin margen negativo: la respuesta llega apenas el
      // elemento asoma — cada gesto de scroll produce feedback inmediato.
      { threshold: 0.08 },
    );
    io.observe(el);
    // Fallback compartido por si IO no dispara (frames congelados).
    unwatch = watchVisible(el as HTMLElement, fire);
    return () => {
      io.disconnect();
      unwatch();
    };
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

    let cancelFrame: () => void = () => {};
    let unwatch: () => void = () => {};
    const fire = () => {
      io.disconnect();
      unwatch();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        setText(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (t < 1) cancelFrame = rafSafe(tick);
      };
      cancelFrame = rafSafe(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) fire();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    unwatch = watchVisible(el, fire);
    return () => {
      io.disconnect();
      unwatch();
      cancelFrame();
    };
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
    let cancelFrame: (() => void) | null = null;

    const update = () => {
      cancelFrame = null;
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
      if (!cancelFrame) cancelFrame = rafSafe(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelFrame?.();
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

    let cancelFrame: () => void = () => {};
    const onMove = (e: MouseEvent) => {
      cancelFrame();
      cancelFrame = rafSafe(() => {
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
      cancelFrame();
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
