/* Rescate de movimiento.

   Bug real detectado en escritorio (Windows + NVIDIA + varios monitores con
   distinta tasa de refresco / G-Sync): Chromium deja de entregar frames de
   animación al hilo principal aunque la pestaña esté visible. Resultado:
   requestAnimationFrame no dispara nunca y el reloj de las animaciones CSS
   no compuestas queda congelado, mientras las compuestas en GPU
   (transform/opacity como el ticker) siguen vivas. El canvas del hero, los
   gráficos SVG y el scrollytelling se ven "muertos".

   Este módulo hace el sitio inmune a ese estado:

   1) rafSafe(cb): programa requestAnimationFrame y un setTimeout en paralelo
      — gana el primero. Con rAF sano el timeout se cancela y corre a 60fps;
      con rAF muerto, el timeout sostiene ~24fps y nada se detiene.

   2) initMotionRescue(): vigila si rAF dispara. Si está muerto, actúa de
      "marcapasos": avanza a mano el currentTime de todas las animaciones y
      transiciones CSS activas. En equipos sanos el marcapasos jamás se
      enciende (costo cero más allá de un contador vacío).

   Respeta prefers-reduced-motion: con movimiento reducido no se inicia. */

const FALLBACK_MS = 42; // ~24fps mínimos cuando rAF no responde

/** rAF con red de seguridad. Devuelve una función para cancelar el frame. */
export function rafSafe(cb: (now: number) => void): () => void {
  let raf = 0;
  let timer = 0;
  let done = false;
  const fire = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    clearTimeout(timer);
    cb(performance.now());
  };
  raf = requestAnimationFrame(fire);
  timer = window.setTimeout(fire, FALLBACK_MS);
  return () => {
    done = true;
    cancelAnimationFrame(raf);
    clearTimeout(timer);
  };
}

let started = false;

/** Enciende el vigilante del reloj de animaciones. Llamar una vez (cliente). */
export function initMotionRescue() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // Contador de frames reales: si en 1s no llegó ninguno con la pestaña
  // visible, el navegador congeló el pipeline de animación.
  let rafTicks = 0;
  const countTick = () => {
    rafTicks++;
    requestAnimationFrame(countTick);
  };
  requestAnimationFrame(countTick);

  let pacemaker = 0;
  let last = 0;

  const paceStep = () => {
    const now = performance.now();
    const dt = Math.min(100, now - last);
    last = now;
    for (const anim of document.getAnimations()) {
      if (anim.playState !== "running") continue; // respeta pausas (hover del ticker)
      // Las animaciones scroll-driven (barra de progreso) tienen su propio
      // reloj ligado al scroll: no se avanzan con tiempo.
      if (anim.timeline && anim.timeline !== document.timeline) continue;
      const t = Number(anim.currentTime ?? 0);
      if (!Number.isFinite(t)) continue;
      try {
        anim.currentTime = t + dt;
      } catch {
        /* animación no avanzable: la saltamos sin romper el resto */
      }
    }
  };

  window.setInterval(() => {
    const frozen = rafTicks === 0 && document.visibilityState === "visible";
    rafTicks = 0;
    if (frozen && !pacemaker) {
      last = performance.now();
      pacemaker = window.setInterval(paceStep, FALLBACK_MS);
      document.documentElement.classList.add("nl-frames-frozen");
    } else if (!frozen && pacemaker) {
      // El navegador volvió a entregar frames: apagamos el marcapasos para
      // no avanzar el reloj dos veces.
      clearInterval(pacemaker);
      pacemaker = 0;
      document.documentElement.classList.remove("nl-frames-frozen");
    }
  }, 1000);
}
