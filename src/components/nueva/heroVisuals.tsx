import type { CSSProperties } from "react";
import {
  Store,
  ShoppingCart,
  Users,
  Boxes,
  MessageCircle,
  Search,
  Facebook,
  Clapperboard,
  TrendingDown,
  Activity,
  Zap,
} from "lucide-react";
import { Reveal } from "./scrolly";

/* Infografías de hero, una por servicio. Cada una explica la oferta de un
   vistazo con lenguaje visual de datos (motivo de marca), animación idle
   (flujo/flotación/pulso) y las tres luces del prisma. Todo respeta
   prefers-reduced-motion vía las clases nl-hv-* de styles.css. */

const card = "relative rounded-2xl border border-white/12 bg-white/[0.07]";

/* ============================================================
   1 · DIGITALIZACIÓN — Ecosistema integrado
   Nodos dispersos (tienda, ecommerce, CRM, bodega, WhatsApp) que se
   sincronizan hacia un núcleo central por líneas con datos en flujo.
   ============================================================ */

const dNodes = [
  { icon: Store, label: "Tu local", x: 50, y: 5, c: "#32d6ff" },
  { icon: ShoppingCart, label: "Tienda online", x: 92, y: 34, c: "#5ad1ff" },
  { icon: Boxes, label: "Bodega · Caja", x: 78, y: 90, c: "#32d6ff" },
  { icon: Users, label: "Clientes", x: 22, y: 90, c: "#7fdcff" },
  { icon: MessageCircle, label: "WhatsApp", x: 8, y: 34, c: "#32d6ff" },
];

export function DigitalizacionVisual() {
  return (
    <Reveal variant="scale" delay={280} className="nl-hero-exit">
      <div className="relative mx-auto w-full max-w-[440px]">
        <div className="relative aspect-square">
          {/* Conexiones + anillos (SVG de fondo) */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full overflow-visible"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="dv-core" cx="50%" cy="45%" r="60%">
                <stop offset="0%" stopColor="#32d6ff" stopOpacity="0.55" />
                <stop offset="70%" stopColor="#0a4f74" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#0a4f74" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Halo del núcleo */}
            <circle cx="200" cy="200" r="150" fill="url(#dv-core)" />

            {/* Anillos orbitales que giran en sentidos opuestos */}
            <circle
              className="nl-hv-spin"
              cx="200"
              cy="200"
              r="120"
              stroke="rgba(50,214,255,0.28)"
              strokeWidth="1.5"
              strokeDasharray="2 10"
            />
            <circle
              className="nl-hv-spin-rev"
              cx="200"
              cy="200"
              r="92"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1"
              strokeDasharray="1 14"
            />

            {/* Líneas de datos centro → nodo, con flujo animado */}
            {dNodes.map((n, i) => (
              <g key={n.label}>
                <line
                  x1="200"
                  y1="200"
                  x2={(n.x / 100) * 400}
                  y2={(n.y / 100) * 400}
                  stroke={n.c}
                  strokeOpacity="0.22"
                  strokeWidth="1.5"
                />
                <line
                  className="nl-hv-flow"
                  x1="200"
                  y1="200"
                  x2={(n.x / 100) * 400}
                  y2={(n.y / 100) * 400}
                  stroke={n.c}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ animationDelay: `${i * -0.3}s` }}
                />
              </g>
            ))}
          </svg>

          {/* Núcleo central */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <span className="absolute inset-0 rounded-[1.4rem] nl-tile-gradient opacity-90 blur-[2px]" />
              <span className="absolute inset-0 rounded-[1.4rem] nl-tile-gradient" />
              <div className="relative flex flex-col items-center text-prisma-navy">
                <Zap className="h-7 w-7" strokeWidth={2.5} aria-hidden="true" />
                <span className="mt-0.5 text-[10px] font-black tracking-widest">SYNC</span>
              </div>
            </div>
          </div>

          {/* Nodos satélite */}
          {dNodes.map(({ icon: Icon, label, x, y, c }, i) => (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={i % 2 === 0 ? "nl-hv-float" : "nl-hv-float-b"}
                style={{ animationDelay: `${i * -0.6}s` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-[#061a33] shadow-lg">
                  <Icon className="h-6 w-6" style={{ color: c }} aria-hidden="true" />
                </div>
                <span className="mt-1.5 block whitespace-nowrap text-center text-[11px] font-semibold text-white/75">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Píldora de resultado */}
        <div className={`${card} mx-auto mt-4 flex w-fit items-center gap-2.5 px-4 py-2`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-prisma-cyan nl-hv-ring" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-prisma-cyan" />
          </span>
          <span className="text-sm font-bold text-white">Ecosistema sincronizado 24/7</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   2 · PROMOCIÓN — Motor de captación (embudo)
   Canales → embudo con leads cayendo → clientes, con ROAS destacado.
   ============================================================ */

const pChannels = [
  { icon: Search, label: "Google", c: "#32d6ff" },
  { icon: Facebook, label: "Meta", c: "#d713f9" },
  { icon: Clapperboard, label: "Reels", c: "#fd3833" },
];

export function PromocionVisual() {
  return (
    <Reveal variant="scale" delay={280} className="nl-hero-exit">
      <div className="relative mx-auto w-full max-w-[420px]">
        {/* Canales de captación */}
        <div className="flex justify-center gap-3">
          {pChannels.map(({ icon: Icon, label, c }, i) => (
            <div
              key={label}
              className={`${card} flex items-center gap-2 px-3.5 py-2 ${i === 1 ? "nl-hv-float" : "nl-hv-float-b"}`}
              style={{ animationDelay: `${i * -0.7}s` }}
            >
              <Icon className="h-4.5 w-4.5" style={{ color: c }} aria-hidden="true" />
              <span className="text-sm font-semibold text-white/90">{label}</span>
            </div>
          ))}
        </div>

        {/* Embudo con leads cayendo */}
        <div className="relative mx-auto mt-3 h-[190px] w-full">
          <svg
            viewBox="0 0 300 190"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="pv-funnel" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d713f9" stopOpacity="0.30" />
                <stop offset="100%" stopColor="#fd3833" stopOpacity="0.14" />
              </linearGradient>
              <linearGradient id="pv-stroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#32d6ff" />
                <stop offset="55%" stopColor="#d713f9" />
                <stop offset="100%" stopColor="#fd3833" />
              </linearGradient>
            </defs>

            {/* Líneas convergentes desde los canales */}
            {[60, 150, 240].map((x, i) => (
              <line
                key={x}
                className="nl-hv-flow"
                x1={x}
                y1="6"
                x2="150"
                y2="46"
                stroke="url(#pv-stroke)"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ animationDelay: `${i * -0.4}s` }}
              />
            ))}

            {/* Silueta del embudo */}
            <path
              d="M40 50 L260 50 L182 120 L182 168 L118 168 L118 120 Z"
              fill="url(#pv-funnel)"
              stroke="url(#pv-stroke)"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            {/* Marcas de nivel */}
            <line x1="70" y1="74" x2="230" y2="74" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
            <line x1="100" y1="98" x2="200" y2="98" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />

            {/* Leads cayendo por el embudo */}
            {[
              { x: 110, d: "0s" },
              { x: 150, d: "0.5s" },
              { x: 190, d: "1s" },
              { x: 150, d: "1.6s" },
            ].map((p, i) => (
              <circle
                key={i}
                className="nl-hv-fall"
                cx={p.x}
                cy="60"
                r="4"
                fill={i % 2 ? "#d713f9" : "#32d6ff"}
                style={{ animationDelay: p.d }}
              />
            ))}
          </svg>
        </div>

        {/* Salida: clientes + ROAS */}
        <div className="relative -mt-2 flex items-stretch justify-center gap-3">
          <div className={`${card} flex flex-col items-center px-5 py-3`}>
            <span className="text-3xl font-extrabold text-white nl-tabular">+128</span>
            <span className="text-xs font-medium text-white/65">clientes / mes</span>
          </div>
          <div
            className="relative flex flex-col items-center justify-center rounded-2xl px-5 py-3 text-prisma-navy nl-hv-float"
            style={{ background: "var(--gradient-brand)" }}
          >
            <span className="text-3xl font-black nl-tabular">4.2x</span>
            <span className="text-xs font-bold">ROAS medio</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ============================================================
   3 · OPTIMIZACIÓN — Panel de medición (CPA a la baja)
   Mini-dashboard en vivo: curva de CPA que baja, KPIs y eventos midiéndose.
   ============================================================ */

const oEvents = [40, 62, 48, 78, 90, 70, 96, 84]; // alturas % de las barras de evento

export function OptimizacionVisual() {
  return (
    <Reveal variant="scale" delay={280} className="nl-hero-exit">
      <div className={`${card} mx-auto w-full max-w-[440px] overflow-hidden p-5 md:p-6 shadow-2xl`}>
        {/* Header del panel */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-prisma-red/15 text-prisma-red">
              <Activity className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <span className="text-sm font-bold text-white">Panel de medición</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 nl-hv-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            EN VIVO
          </span>
        </div>

        {/* Gráfico de CPA descendente */}
        <div className="relative mt-4">
          <div className="absolute right-0 top-0 z-10 rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-black text-green-400">
            CPA ↓ 32%
          </div>
          <svg viewBox="0 0 300 120" className="w-full h-auto" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="ov-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fd3833" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#fd3833" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[24, 54, 84].map((y) => (
              <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            ))}
            <polygon
              className="nl-spark-fill"
              points="0,18 43,26 86,30 128,44 171,52 214,66 257,78 300,92 300,120 0,120"
              fill="url(#ov-fill)"
            />
            <polyline
              className="nl-spark-path"
              points="0,18 43,26 86,30 128,44 171,52 214,66 257,78 300,92"
              stroke="#fd3833"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
            />
            <circle className="nl-pulse-dot" cx="300" cy="92" r="5" fill="#fd3833" />
          </svg>
        </div>

        {/* KPIs */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { k: "ROAS", v: "4.2x", c: "#32d6ff" },
            { k: "Conv.", v: "+89%", c: "#d713f9" },
            { k: "CPA", v: "-32%", c: "#fd3833" },
          ].map((m) => (
            <div key={m.k} className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center">
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/45">{m.k}</p>
              <p className="text-lg font-extrabold nl-tabular" style={{ color: m.c }}>
                {m.v}
              </p>
            </div>
          ))}
        </div>

        {/* Eventos midiéndose en tiempo real */}
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/55">
            <TrendingDown className="h-4 w-4 text-prisma-cyan" aria-hidden="true" />
            Eventos
          </div>
          <div className="flex h-9 flex-1 items-end gap-1.5">
            {oEvents.map((h, i) => (
              <div
                key={i}
                className="nl-hv-bar nl-hv-pulse flex-1 rounded-sm"
                style={
                  {
                    height: `${h}%`,
                    background: "linear-gradient(180deg,#32d6ff,#d713f9)",
                    animationDelay: `${i * -0.22}s`,
                  } as CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
