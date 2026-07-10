import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  MousePointerClick,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./scrolly";

/* Portafolio de dashboards: mockups estilo Looker Studio / Power BI / GA4
   construidos 100% en CSS+SVG (sin imágenes) con datos de ejemplo realistas.
   Cada uno demuestra la capa de medición que Prisma Digital entrega con cada
   sitio: eventos marcados con GTM, campañas, GA4 y mapas de calor. */

type Kpi = { label: string; value: string; delta: string; up: boolean };

interface Dashboard {
  name: string;
  tool: string;
  toolColor: string;
  category: string;
  desc: string;
  kind: "ga4" | "ads" | "funnel" | "ecommerce" | "heatmap";
  theme: "light" | "dark";
}

const dashboards: Dashboard[] = [
  {
    name: "Rendimiento Web · GA4",
    tool: "Looker Studio + GA4",
    toolColor: "#4285F4",
    category: "ANALÍTICA WEB",
    desc: "Tráfico, usuarios y conversiones por canal en tiempo real, con cada evento de la web marcado desde Google Tag Manager.",
    kind: "ga4",
    theme: "light",
  },
  {
    name: "Campañas & ROAS",
    tool: "Looker Studio + Ads",
    toolColor: "#34A853",
    category: "PERFORMANCE / ADS",
    desc: "Inversión, ROAS y costo por adquisición unificando Google y Meta Ads, atribuidos a las ventas reales del negocio.",
    kind: "ads",
    theme: "light",
  },
  {
    name: "Embudo de Conversión",
    tool: "GA4 + GTM Events",
    toolColor: "#d713f9",
    category: "MEDICIÓN DE EVENTOS",
    desc: "Cada paso del recorrido de compra medido con eventos propios: sabemos exactamente dónde se cae la conversión.",
    kind: "funnel",
    theme: "dark",
  },
  {
    name: "Ventas & Ecommerce",
    tool: "Power BI",
    toolColor: "#F2C811",
    category: "INTELIGENCIA DE NEGOCIO",
    desc: "Ingresos, ticket medio y productos top conectados a tu operación, para decidir con datos y no con corazonadas.",
    kind: "ecommerce",
    theme: "dark",
  },
  {
    name: "Mapas de Calor & UX",
    tool: "Clarity + Hotjar",
    toolColor: "#fd3833",
    category: "COMPORTAMIENTO / UX",
    desc: "Clics, profundidad de scroll y zonas de fricción reales de tus usuarios para mejorar la web con evidencia, no opiniones.",
    kind: "heatmap",
    theme: "dark",
  },
];

/* ---------- Primitivas de gráfico (SVG) ---------- */

function Sparkline({ points, color, fill = false, w = 100, h = 34 }: { points: number[]; color: string; fill?: boolean; w?: number; h?: number }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const step = w / (points.length - 1);
  const coords = points.map((p, i) => [i * step, h - ((p - min) / span) * (h - 4) - 2]);
  const line = coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} ${w},${h} 0,${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }} fill="none" aria-hidden="true">
      {fill && <polygon points={area} fill={color} opacity="0.14" />}
      <polyline points={line} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={coords[coords.length - 1][0]} cy={coords[coords.length - 1][1]} r="2.4" fill={color} />
    </svg>
  );
}

function Bars({ data, color, muted }: { data: number[]; color: string; muted: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px] h-full w-full">
      {data.map((d, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-[2px]"
          style={{ height: `${(d / max) * 100}%`, background: i === data.length - 2 ? color : muted }}
        />
      ))}
    </div>
  );
}

function Donut({ segments }: { segments: { v: number; c: string }[] }) {
  const total = segments.reduce((s, x) => s + x.v, 0);
  let acc = 0;
  const r = 15.9155;
  return (
    <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90" aria-hidden="true">
      {segments.map((s, i) => {
        const frac = s.v / total;
        const dash = `${frac * 100} ${100 - frac * 100}`;
        const off = 100 - acc;
        acc += frac * 100;
        return (
          <circle key={i} cx="21" cy="21" r={r} fill="none" stroke={s.c} strokeWidth="7" strokeDasharray={dash} strokeDashoffset={off} pathLength={100} />
        );
      })}
    </svg>
  );
}

/* ---------- KPI tile ---------- */

function KpiTile({ k, light }: { k: Kpi; light: boolean }) {
  return (
    <div className={`flex-1 rounded-md px-2 py-1.5 ${light ? "bg-black/[0.03] border border-black/5" : "bg-white/[0.05] border border-white/10"}`}>
      <p className={`text-[6px] font-semibold uppercase tracking-wide ${light ? "text-slate-500" : "text-white/50"}`}>{k.label}</p>
      <p className={`text-[12px] font-extrabold leading-tight nl-tabular ${light ? "text-slate-800" : "text-white"}`}>{k.value}</p>
      <span className={`inline-flex items-center gap-0.5 text-[6.5px] font-bold ${k.up ? "text-emerald-500" : "text-rose-500"}`}>
        {k.up ? <TrendingUp className="w-1.5 h-1.5" /> : <TrendingDown className="w-1.5 h-1.5" />}
        {k.delta}
      </span>
    </div>
  );
}

/* ---------- Cuerpo de cada dashboard ---------- */

function DashboardBody({ kind, theme }: { kind: Dashboard["kind"]; theme: Dashboard["theme"] }) {
  const light = theme === "light";
  const label = light ? "text-slate-500" : "text-white/55";
  const panel = light ? "bg-black/[0.02] border border-black/5" : "bg-white/[0.04] border border-white/10";

  if (kind === "ga4") {
    return (
      <div className="flex flex-col gap-1.5 h-full">
        <div className="flex gap-1.5">
          <KpiTile light={light} k={{ label: "Usuarios", value: "24.8K", delta: "18%", up: true }} />
          <KpiTile light={light} k={{ label: "Sesiones", value: "41.2K", delta: "22%", up: true }} />
          <KpiTile light={light} k={{ label: "Conv.", value: "1,284", delta: "32%", up: true }} />
        </div>
        <div className={`flex-1 rounded-md p-1.5 flex gap-2 ${panel}`}>
          <div className="flex-1 flex flex-col">
            <span className={`text-[6px] font-semibold ${label}`}>Sesiones · últimos 28 días</span>
            <div className="flex-1 flex items-center">
              <Sparkline points={[12, 18, 15, 22, 19, 28, 26, 34, 31, 42]} color="#4285F4" fill />
            </div>
          </div>
          <div className="w-[34%] flex flex-col items-center justify-center">
            <div className="h-9 w-9"><Donut segments={[{ v: 38, c: "#4285F4" }, { v: 29, c: "#34A853" }, { v: 18, c: "#d713f9" }, { v: 15, c: "#32d6ff" }]} /></div>
            <span className={`text-[5.5px] mt-0.5 ${label}`}>Canales</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "ads") {
    return (
      <div className="flex flex-col gap-1.5 h-full">
        <div className="flex gap-1.5">
          <KpiTile light={light} k={{ label: "Inversión", value: "$3.2M", delta: "8%", up: true }} />
          <KpiTile light={light} k={{ label: "ROAS", value: "4.2x", delta: "0.6", up: true }} />
          <KpiTile light={light} k={{ label: "CPA", value: "$8.9K", delta: "32%", up: false }} />
        </div>
        <div className={`flex-1 rounded-md p-1.5 flex gap-2 ${panel}`}>
          <div className="flex-1 flex flex-col">
            <span className={`text-[6px] font-semibold ${label}`}>ROAS por canal</span>
            <div className="flex-1 py-1"><Bars data={[3.1, 4.6, 3.9, 5.2, 4.2]} color="#34A853" muted={light ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.18)"} /></div>
            <div className="flex justify-between text-[5px] mt-0.5 opacity-70">
              <span>Google</span><span>Meta</span><span>PMax</span><span>Display</span><span>Retarget</span>
            </div>
          </div>
          <div className="w-[30%] flex flex-col justify-center gap-1">
            {[["CTR", "3.8%"], ["Conv.", "1,284"], ["Clics", "34.1K"]].map(([a, b]) => (
              <div key={a}>
                <p className={`text-[5.5px] ${label}`}>{a}</p>
                <p className={`text-[8px] font-bold nl-tabular ${light ? "text-slate-800" : "text-white"}`}>{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (kind === "funnel") {
    const steps = [
      { l: "Visitas", v: "41.200", w: 100 },
      { l: "Ficha de producto", v: "12.400", w: 74 },
      { l: "Agregó al carrito", v: "4.100", w: 50 },
      { l: "Checkout", v: "2.050", w: 34 },
      { l: "Compra", v: "1.284", w: 22 },
    ];
    return (
      <div className="flex flex-col gap-[3px] h-full justify-center">
        {steps.map((s, i) => (
          <div key={s.l} className="flex items-center gap-1.5">
            <div className="flex-1 flex items-center justify-center h-3.5 rounded-[2px] text-[6px] font-bold text-white"
              style={{ width: `${s.w}%`, marginInline: "auto", background: `linear-gradient(90deg,#32d6ff,#d713f9 ${100 - i * 12}%)`, opacity: 1 - i * 0.12 }}>
              {s.l}
            </div>
            <span className={`text-[7px] font-extrabold nl-tabular w-9 text-right ${light ? "text-slate-800" : "text-white"}`}>{s.v}</span>
          </div>
        ))}
        <p className={`text-[6px] mt-1 ${label}`}>Tasa de conversión global <span className="text-emerald-400 font-bold">3.1%</span> · evento <span className="font-mono">purchase</span> vía GTM</p>
      </div>
    );
  }

  if (kind === "ecommerce") {
    return (
      <div className="flex flex-col gap-1.5 h-full">
        <div className="flex gap-1.5">
          <KpiTile light={light} k={{ label: "Ingresos", value: "$48.6M", delta: "143%", up: true }} />
          <KpiTile light={light} k={{ label: "Ticket", value: "$37.9K", delta: "12%", up: true }} />
          <KpiTile light={light} k={{ label: "Pedidos", value: "1,284", delta: "38%", up: true }} />
        </div>
        <div className={`flex-1 rounded-md p-1.5 flex gap-2 ${panel}`}>
          <div className="flex-1 flex flex-col">
            <span className={`text-[6px] font-semibold ${label}`}>Ingresos · 12 meses</span>
            <div className="flex-1 flex items-center"><Sparkline points={[8, 11, 9, 14, 17, 15, 22, 26, 24, 31, 38, 48]} color="#F2C811" fill /></div>
          </div>
          <div className="w-[38%] flex flex-col justify-center gap-0.5">
            <span className={`text-[5.5px] font-semibold ${label}`}>Top productos</span>
            {[["Canasta Premium", 100], ["Set Gourmet", 72], ["Vino Reserva", 54]].map(([n, w]) => (
              <div key={n as string}>
                <p className={`text-[5px] ${light ? "text-slate-600" : "text-white/70"}`}>{n}</p>
                <div className="h-1 rounded-full" style={{ width: `${w}%`, background: "#F2C811" }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // heatmap
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <div className="flex gap-1.5">
        <KpiTile light={light} k={{ label: "Clics", value: "62.4K", delta: "—", up: true }} />
        <KpiTile light={light} k={{ label: "Scroll", value: "68%", delta: "9%", up: true }} />
        <KpiTile light={light} k={{ label: "Rage clicks", value: "0.4%", delta: "61%", up: false }} />
      </div>
      <div className={`flex-1 rounded-md p-1.5 flex gap-2 ${panel}`}>
        <div className="relative flex-1 rounded overflow-hidden bg-white/[0.03]">
          {/* wireframe de fondo */}
          <div className="absolute inset-1 flex flex-col gap-1 opacity-40">
            <div className="h-2 rounded bg-white/20" />
            <div className="h-1 w-2/3 rounded bg-white/15" />
            <div className="flex-1 rounded bg-white/10" />
            <div className="h-3 w-1/3 rounded bg-white/15" />
          </div>
          {/* blobs de calor */}
          <div className="absolute h-6 w-6 rounded-full blur-md" style={{ left: "22%", top: "30%", background: "radial-gradient(circle,#fd3833,transparent 70%)" }} />
          <div className="absolute h-5 w-5 rounded-full blur-md" style={{ left: "55%", top: "55%", background: "radial-gradient(circle,#fecd2b,transparent 70%)" }} />
          <div className="absolute h-4 w-4 rounded-full blur-md" style={{ left: "30%", top: "70%", background: "radial-gradient(circle,#32d6ff,transparent 70%)" }} />
          <MousePointerClick className="absolute w-2 h-2 text-white" style={{ left: "24%", top: "33%" }} />
        </div>
        <div className="w-[34%] flex flex-col justify-center gap-1">
          <span className={`text-[5.5px] font-semibold ${label}`}>Profundidad de scroll</span>
          {[["Hero", 98], ["Beneficios", 71], ["Precios", 44], ["Footer", 21]].map(([n, w]) => (
            <div key={n as string}>
              <div className="flex justify-between text-[5px] opacity-70"><span>{n}</span><span>{w}%</span></div>
              <div className="h-1 rounded-full bg-white/10"><div className="h-full rounded-full" style={{ width: `${w}%`, background: "linear-gradient(90deg,#fd3833,#fecd2b)" }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Mockup de dashboard (marco de navegador) ---------- */

function DashboardMockup({ d }: { d: Dashboard }) {
  const light = d.theme === "light";
  return (
    <div className="w-full select-none">
      <div className="relative rounded-t-2xl bg-[#2e3033] p-1.5 shadow-2xl border border-white/5">
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#151617]" />
        <div className={`relative aspect-[16/10] w-full rounded-md overflow-hidden flex flex-col ${light ? "bg-[#f7f8fa]" : "bg-[#0b1020]"}`}>
          {/* barra de navegador */}
          <div className={`flex items-center gap-1.5 px-1.5 py-0.5 text-[7px] border-b ${light ? "bg-white border-black/5" : "bg-white/5 border-white/10"}`}>
            <div className="flex gap-0.5 shrink-0">
              <span className="w-1 h-1 rounded-full bg-red-500/80" />
              <span className="w-1 h-1 rounded-full bg-yellow-500/80" />
              <span className="w-1 h-1 rounded-full bg-green-500/80" />
            </div>
            <div className={`flex-1 text-center font-mono truncate ${light ? "text-slate-400" : "text-white/40"}`}>
              {d.kind === "ecommerce" ? "app.powerbi.com/reports" : d.kind === "heatmap" ? "clarity.microsoft.com" : "lookerstudio.google.com/reporting"}
            </div>
          </div>
          {/* encabezado del reporte */}
          <div className={`flex items-center justify-between px-2 py-1 ${light ? "" : ""}`}>
            <div className="flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: d.toolColor }} />
              <span className={`text-[7px] font-bold ${light ? "text-slate-700" : "text-white"}`}>{d.name}</span>
            </div>
            <span className={`inline-flex items-center gap-0.5 text-[5.5px] font-bold px-1 py-0.5 rounded ${light ? "bg-emerald-500/10 text-emerald-600" : "bg-emerald-500/15 text-emerald-400"}`}>
              <Activity className="w-1.5 h-1.5" /> EN VIVO
            </span>
          </div>
          {/* cuerpo */}
          <div className="flex-1 px-2 pb-2 overflow-hidden">
            <DashboardBody kind={d.kind} theme={d.theme} />
          </div>
        </div>
      </div>
      <div className="relative h-1.5 bg-[#d2d4d9] rounded-b-xl shadow-lg border-t border-[#ebedf2] flex justify-center">
        <div className="w-8 h-0.5 bg-[#b0b2b8] rounded-b" />
      </div>
    </div>
  );
}

/* ---------- Carrusel de dashboards ---------- */

export function DashboardsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const cw = el.querySelector(".dash-card")?.getBoundingClientRect().width || 1;
    setActiveIdx(Math.round(el.scrollLeft / (cw + 32)));
  }, []);

  useEffect(() => {
    setMounted(true);
    update();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".dash-card");
    const amount = card ? card.getBoundingClientRect().width + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative mt-16 px-4 md:px-8">
      <div ref={trackRef} className="nl-noscrollbar flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4" style={{ scrollBehavior: "smooth" }}>
        {dashboards.map((d, i) => (
          <Reveal
            key={d.name}
            as="article"
            variant="scale"
            delay={(i % 3) * 80}
            className="dash-card shrink-0 w-[90%] sm:w-[70%] md:w-[48%] lg:w-[31.5%] snap-center rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
          >
            <div className="p-5 bg-white/[0.01] border-b border-white/5">
              <DashboardMockup d={d} />
            </div>
            <div className="p-7">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[10px] font-bold text-white/90 mb-3 tracking-wider uppercase">
                {d.category}
              </span>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-xl font-bold text-white">{d.name}</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-sm mb-4">{d.desc}</p>
              <span className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold" style={{ background: `${d.toolColor}22`, color: d.toolColor }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: d.toolColor }} />
                {d.tool}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      {mounted && (
        <>
          <button type="button" onClick={() => scrollBy(-1)} disabled={!canLeft} aria-label="Anteriores dashboards"
            className="hidden md:flex absolute left-0 top-[32%] -translate-y-1/2 -translate-x-6 h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#000139]/80 backdrop-blur-md text-white shadow-lg transition-all hover:scale-105 hover:bg-[#000139] disabled:opacity-0 disabled:pointer-events-none hover:border-white/20">
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => scrollBy(1)} disabled={!canRight} aria-label="Más dashboards"
            className="hidden md:flex absolute right-0 top-[32%] -translate-y-1/2 translate-x-6 h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#000139]/80 backdrop-blur-md text-white shadow-lg transition-all hover:scale-105 hover:bg-[#000139] disabled:opacity-0 disabled:pointer-events-none hover:border-white/20">
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      <div className="flex justify-center gap-1.5 mt-6">
        {dashboards.map((_, idx) => (
          <button key={idx} onClick={() => {
            const el = trackRef.current;
            if (!el) return;
            const cw = el.querySelector(".dash-card")?.getBoundingClientRect().width || 1;
            el.scrollTo({ left: idx * (cw + 32), behavior: "smooth" });
          }} className={`h-1.5 rounded-full transition-all duration-300 ${activeIdx === idx ? "w-8 bg-prisma-cyan" : "w-1.5 bg-white/20"}`} aria-label={`Ir al dashboard ${idx + 1}`} />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-white/50 md:hidden" aria-hidden="true">Desliza para ver más dashboards →</p>
    </div>
  );
}

/* Íconos de integraciones reutilizados por la banda de medición */
export const measurementStack: { name: string; icon: LucideIcon; color: string }[] = [];
