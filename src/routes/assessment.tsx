import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Gauge,
  Save,
  Download,
  RotateCcw,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ListChecks,
  Calculator,
  type LucideIcon,
} from "lucide-react";
import AccessGate from "@/components/AccessGate";
import { firebaseReady, saveAssessment } from "@/lib/firebase";

/* ASSESSMENT DE DIAGNÓSTICO EN VIVO — la "Auditoría de 15 puntos".
   Se llena durante la reunión, después de la presentación (/presentacion-diagnostico).
   - 15 puntos con nota 1–5 (PageSpeed se ingresa 0–100 y la nota se deriva sola).
   - Contexto comercial para construir el plan priorizado a 90 días (hitos de las 6 fases).
   - Proyección de resultados calculada en vivo.
   - Borrador autoguardado en localStorage; envío final a Firestore (colección `assessments`).
   No indexada y protegida por AccessGate. */

export const Route = createFileRoute("/assessment")({
  head: () => ({
    meta: [
      { title: "Assessment Diagnóstico — Prisma Digital" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: () => (
    <AccessGate>
      <AssessmentPage />
    </AccessGate>
  ),
});

/* ---------------- Definición de la rúbrica ---------------- */

type ItemDef = {
  id: string;
  label: string;
  hint: string;
  tipo?: "pagespeed";
};

type CategoriaDef = {
  id: string;
  nombre: string;
  color: string;
  items: ItemDef[];
};

const categorias: CategoriaDef[] = [
  {
    id: "medicion",
    nombre: "Medición y Datos",
    color: "#32d6ff",
    items: [
      {
        id: "gtm",
        label: "Google Tag Manager",
        hint: "Contenedor instalado, tags/triggers/variables ordenados, versiones publicadas, sin etiquetas huérfanas.",
      },
      {
        id: "ga4",
        label: "Google Analytics 4",
        hint: "Propiedad configurada, eventos clave marcados como conversión, datos coherentes en los últimos 90 días.",
      },
      {
        id: "pixeles",
        label: "Píxeles y Conversions API",
        hint: "Meta Píxel / etiqueta de Google Ads activos, deduplicación CAPI, calidad de coincidencia de eventos.",
      },
      {
        id: "eventos",
        label: "Medición de eventos del sitio/app",
        hint: "CTAs, formularios, carrito y checkout medidos; dataLayer con nomenclatura consistente.",
      },
      {
        id: "search",
        label: "Google Search Console",
        hint: "Propiedad verificada, sitemap enviado, sin errores graves de cobertura ni penalizaciones.",
      },
    ],
  },
  {
    id: "sitio",
    nombre: "Sitio y Experiencia",
    color: "#8a45f7",
    items: [
      {
        id: "ps_movil",
        label: "PageSpeed móvil",
        tipo: "pagespeed",
        hint: "Correr pagespeed.web.dev en vivo y anotar el puntaje de Performance en móvil (0–100).",
      },
      {
        id: "ps_desktop",
        label: "PageSpeed escritorio",
        tipo: "pagespeed",
        hint: "Puntaje de Performance en escritorio (0–100).",
      },
      {
        id: "seo",
        label: "SEO on-page",
        hint: "Titles y descriptions, jerarquía H1→H3, alt en imágenes, indexación de las páginas clave.",
      },
      {
        id: "ux",
        label: "UX móvil y conversión",
        hint: "Hero + CTA visibles sin scroll, formularios simples, velocidad percibida, señales de confianza.",
      },
    ],
  },
  {
    id: "venta",
    nombre: "Canal de Venta y Marketing",
    color: "#d713f9",
    items: [
      {
        id: "ecommerce",
        label: "Canal de venta online",
        hint: "Ecommerce o flujo de venta digital operativo: stock, pagos, despacho y postventa.",
      },
      {
        id: "campanas",
        label: "Campañas y marcación de objetivos",
        hint: "Estructura de campañas, objetivos bien marcados. ¿Conocen su CPA y ROAS reales?",
      },
      {
        id: "crm",
        label: "CRM y base de clientes",
        hint: "Contactos centralizados, integración con web/WhatsApp, seguimiento comercial activo.",
      },
      {
        id: "rrss",
        label: "Presencia y consistencia de marca",
        hint: "RRSS activas, coherencia visual, Google Business Profile actualizado y con reseñas.",
      },
    ],
  },
  {
    id: "estrategia",
    nombre: "Estrategia y Equipo",
    color: "#fd3833",
    items: [
      {
        id: "kpis",
        label: "Objetivos y KPIs digitales",
        hint: "¿Existen metas comerciales digitales claras? ¿Con qué frecuencia se revisan?",
      },
      {
        id: "equipo",
        label: "Equipo y procesos de datos",
        hint: "¿Quién ejecuta y quién mide? ¿Las decisiones se toman con datos o por intuición?",
      },
    ],
  },
];

const todosLosItems = categorias.flatMap((c) => c.items);

const herramientasLista = [
  "Google Tag Manager",
  "Google Analytics 4",
  "Meta Píxel",
  "Google Ads",
  "Search Console",
  "CRM",
  "Email marketing",
  "Plataforma ecommerce",
  "Hotjar / Clarity",
  "Looker Studio",
];

const decisionesOpciones = [
  "Intuición y experiencia",
  "Reportes básicos (ventas totales)",
  "Datos parciales (algunas métricas)",
  "Datos integrados (dashboards)",
];

/* ---------------- Estado ---------------- */

type ScoreState = { nota: number | null; obs: string };

type AssessmentState = {
  cliente: { empresa: string; contacto: string; rubro: string; sitio: string; anios: string };
  scores: Record<string, ScoreState>;
  pagespeed: { movil: string; desktop: string };
  contexto: {
    objetivos: string;
    dolor: string;
    inversion: string;
    ventasPct: string;
    decisiones: string;
    herramientas: string[];
  };
  proyeccion: { visitas: string; conversion: string; ticket: string };
};

const estadoInicial = (): AssessmentState => ({
  cliente: { empresa: "", contacto: "", rubro: "", sitio: "", anios: "" },
  scores: Object.fromEntries(todosLosItems.map((i) => [i.id, { nota: null, obs: "" }])),
  pagespeed: { movil: "", desktop: "" },
  contexto: {
    objetivos: "",
    dolor: "",
    inversion: "",
    ventasPct: "",
    decisiones: "",
    herramientas: [],
  },
  proyeccion: { visitas: "", conversion: "", ticket: "" },
});

const DRAFT_KEY = "pd_assessment_draft_v1";

/* ---------------- Helpers ---------------- */

const psNota = (v: number | null): number | null =>
  v === null || Number.isNaN(v) ? null : v >= 90 ? 5 : v >= 70 ? 4 : v >= 50 ? 3 : v >= 30 ? 2 : 1;

const num = (s: string): number | null => {
  const n = parseFloat(s.replace(",", "."));
  return Number.isFinite(n) ? n : null;
};

function notaDe(item: ItemDef, state: AssessmentState): number | null {
  if (item.tipo === "pagespeed") {
    const raw = item.id === "ps_movil" ? state.pagespeed.movil : state.pagespeed.desktop;
    return psNota(num(raw));
  }
  return state.scores[item.id]?.nota ?? null;
}

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

const notaEtiquetas = ["", "No existe", "Deficiente", "Básico", "Bueno", "Óptimo"];

function clasificacion(pct: number): { label: string; color: string } {
  if (pct < 40) return { label: "Crítico", color: "#fd3833" };
  if (pct < 60) return { label: "En desarrollo", color: "#d713f9" };
  if (pct < 80) return { label: "Bueno", color: "#32d6ff" };
  return { label: "Avanzado", color: "#4ade80" };
}

/* ---------------- Componentes de UI ---------------- */

const inputCls =
  "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-base text-white placeholder-white/35 outline-none focus:border-prisma-cyan";

function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-6 md:p-8">
      <div className="flex items-center gap-3 mb-1">
        <div className="nl-tile-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 className="text-xl md:text-2xl font-extrabold">{title}</h2>
      </div>
      {subtitle && <p className="text-sm text-white/60 mb-5 mt-1">{subtitle}</p>}
      <div className={subtitle ? "" : "mt-5"}>{children}</div>
    </section>
  );
}

function ScoreButtons({
  value,
  onChange,
  color,
}: {
  value: number | null;
  onChange: (n: number | null) => void;
  color: string;
}) {
  return (
    <div className="flex gap-1.5" role="radiogroup" aria-label="Nota de 1 a 5">
      {[1, 2, 3, 4, 5].map((n) => {
        const active = value === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={active}
            title={notaEtiquetas[n]}
            onClick={() => onChange(active ? null : n)}
            className={`h-10 w-10 rounded-lg text-sm font-black transition-all ${
              active ? "text-prisma-navy scale-110" : "bg-white/10 text-white/60 hover:bg-white/20"
            }`}
            style={active ? { background: color } : undefined}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------- Página ---------------- */

type SaveStatus =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "ok"; id: string }
  | { kind: "error"; msg: string };

function AssessmentPage() {
  const [state, setState] = useState<AssessmentState>(estadoInicial);
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });
  // Flag de ESTADO (no ref): el autoguardado solo se activa en el render
  // posterior a cargar el borrador. Con un ref, el doble-invoke de efectos en
  // dev (StrictMode) sobrescribía el borrador con el estado inicial vacío.
  const [hydrated, setHydrated] = useState(false);

  // Cargar borrador (solo cliente, tras montar: evita desajustes de hidratación).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as Partial<AssessmentState>;
        const base = estadoInicial();
        setState({
          ...base,
          ...draft,
          cliente: { ...base.cliente, ...draft.cliente },
          scores: { ...base.scores, ...draft.scores },
          pagespeed: { ...base.pagespeed, ...draft.pagespeed },
          contexto: { ...base.contexto, ...draft.contexto },
          proyeccion: { ...base.proyeccion, ...draft.proyeccion },
        });
      }
    } catch {
      /* borrador corrupto: se ignora */
    }
    setHydrated(true);
  }, []);

  // Autoguardado del borrador en cada cambio (recién tras hidratar).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(state));
    } catch {
      /* almacenamiento lleno: no bloquea la reunión */
    }
  }, [state, hydrated]);

  /* --------- Totales --------- */
  const totales = useMemo(() => {
    const porCategoria = categorias.map((cat) => {
      const notas = cat.items.map((it) => notaDe(it, state));
      const puntos = notas.reduce<number>((a, n) => a + (n ?? 0), 0);
      const respondidos = notas.filter((n) => n !== null).length;
      return {
        id: cat.id,
        nombre: cat.nombre,
        color: cat.color,
        puntos,
        maximo: cat.items.length * 5,
        respondidos,
        total: cat.items.length,
      };
    });
    const puntos = porCategoria.reduce((a, c) => a + c.puntos, 0);
    const respondidos = porCategoria.reduce((a, c) => a + c.respondidos, 0);
    const maximo = todosLosItems.length * 5;
    const pct = Math.round((puntos / maximo) * 100);
    return { porCategoria, puntos, maximo, respondidos, pct, totalItems: todosLosItems.length };
  }, [state]);

  /* --------- Proyección --------- */
  const proyeccion = useMemo(() => {
    const visitas = num(state.proyeccion.visitas);
    const conv = num(state.proyeccion.conversion);
    const ticket = num(state.proyeccion.ticket);
    if (visitas === null || conv === null || ticket === null) return null;
    const actual = visitas * (conv / 100) * ticket;
    // Escenarios honestos: mejora relativa de conversión por optimización de
    // medición + CRO (90 días) y crecimiento compuesto con tráfico (12 meses).
    const meta90 = visitas * ((conv * 1.4) / 100) * ticket;
    const meta12 = visitas * 1.2 * ((conv * 2) / 100) * ticket;
    return { actual, meta90, meta12 };
  }, [state.proyeccion]);

  /* --------- Acciones --------- */
  const setScore = (id: string, patch: Partial<ScoreState>) =>
    setState((s) => ({ ...s, scores: { ...s.scores, [id]: { ...s.scores[id], ...patch } } }));

  const buildPayload = () => ({
    version: 1,
    cliente: state.cliente,
    scores: Object.fromEntries(
      todosLosItems.map((it) => [
        it.id,
        { nota: notaDe(it, state), obs: state.scores[it.id]?.obs ?? "" },
      ]),
    ),
    pagespeed: {
      movil: num(state.pagespeed.movil),
      desktop: num(state.pagespeed.desktop),
    },
    contexto: {
      ...state.contexto,
      inversion: num(state.contexto.inversion),
      ventasPct: num(state.contexto.ventasPct),
    },
    proyeccion: {
      visitas: num(state.proyeccion.visitas),
      conversion: num(state.proyeccion.conversion),
      ticket: num(state.proyeccion.ticket),
      ventaMensualActual: proyeccion?.actual ?? null,
      meta90dias: proyeccion?.meta90 ?? null,
      meta12meses: proyeccion?.meta12 ?? null,
    },
    totales: {
      puntos: totales.puntos,
      maximo: totales.maximo,
      porcentaje: totales.pct,
      respondidos: totales.respondidos,
      porCategoria: totales.porCategoria.map(({ id, puntos, maximo, respondidos }) => ({
        id,
        puntos,
        maximo,
        respondidos,
      })),
    },
  });

  const onGuardar = async () => {
    if (status.kind === "saving") return;
    setStatus({ kind: "saving" });
    try {
      const id = await saveAssessment(buildPayload());
      setStatus({ kind: "ok", id });
    } catch (err) {
      setStatus({
        kind: "error",
        msg: err instanceof Error ? err.message : "Error desconocido al guardar.",
      });
    }
  };

  const onExportar = () => {
    const data = JSON.stringify(buildPayload(), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const empresa = state.cliente.empresa.trim().replace(/\s+/g, "-").toLowerCase() || "cliente";
    a.href = url;
    a.download = `assessment-${empresa}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onNuevo = () => {
    if (!confirm("¿Limpiar todo el formulario para un nuevo diagnóstico?")) return;
    localStorage.removeItem(DRAFT_KEY);
    setState(estadoInicial());
    setStatus({ kind: "idle" });
    window.scrollTo({ top: 0 });
  };

  const clasif = clasificacion(totales.pct);

  return (
    <main className="nl-dark min-h-screen text-white pb-32">
      <div className="nl-grain absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" />

      {/* Encabezado */}
      <header className="relative mx-auto max-w-5xl px-6 pt-10">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <Link
            to="/presentacion-diagnostico"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white transition"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver a la presentación
          </Link>
          <img src="/Logo Prisma Digital blanco.webp" alt="Prisma Digital" className="h-8 w-auto opacity-80" />
        </div>
        <h1 className="mt-8 text-3xl md:text-5xl font-extrabold leading-[1.1] text-balance">
          Diagnóstico en vivo: <span className="nl-text-gradient">auditoría de 15 puntos.</span>
        </h1>
        <p className="mt-3 text-white/70 text-base md:text-lg max-w-2xl">
          Escala de notas: 1 No existe · 2 Deficiente · 3 Básico · 4 Bueno · 5 Óptimo. El borrador
          se guarda solo en este navegador hasta que lo envíes.
        </p>
      </header>

      <div className="relative mx-auto max-w-5xl px-6 mt-10 flex flex-col gap-8">
        {/* Datos del cliente */}
        <SectionCard icon={Building2} title="Datos del cliente">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <input
              className={inputCls}
              placeholder="Empresa *"
              value={state.cliente.empresa}
              onChange={(e) =>
                setState((s) => ({ ...s, cliente: { ...s.cliente, empresa: e.target.value } }))
              }
            />
            <input
              className={inputCls}
              placeholder="Contacto (nombre y cargo)"
              value={state.cliente.contacto}
              onChange={(e) =>
                setState((s) => ({ ...s, cliente: { ...s.cliente, contacto: e.target.value } }))
              }
            />
            <input
              className={inputCls}
              placeholder="Rubro"
              value={state.cliente.rubro}
              onChange={(e) =>
                setState((s) => ({ ...s, cliente: { ...s.cliente, rubro: e.target.value } }))
              }
            />
            <input
              className={inputCls}
              placeholder="Sitio web"
              value={state.cliente.sitio}
              onChange={(e) =>
                setState((s) => ({ ...s, cliente: { ...s.cliente, sitio: e.target.value } }))
              }
            />
            <input
              className={inputCls}
              placeholder="Años de trayectoria"
              inputMode="numeric"
              value={state.cliente.anios}
              onChange={(e) =>
                setState((s) => ({ ...s, cliente: { ...s.cliente, anios: e.target.value } }))
              }
            />
          </div>
        </SectionCard>

        {/* Las 4 categorías de la rúbrica */}
        {categorias.map((cat) => {
          const catTotal = totales.porCategoria.find((c) => c.id === cat.id)!;
          return (
            <SectionCard
              key={cat.id}
              icon={ListChecks}
              title={cat.nombre}
              subtitle={`${catTotal.respondidos}/${catTotal.total} revisados · ${catTotal.puntos}/${catTotal.maximo} pts`}
            >
              <div className="flex flex-col gap-5">
                {cat.items.map((item) => {
                  const nota = notaDe(item, state);
                  return (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-[240px] flex-1">
                          <h3 className="text-lg font-bold leading-tight">{item.label}</h3>
                          <p className="mt-1 text-sm text-white/60 leading-snug">{item.hint}</p>
                          {item.tipo === "pagespeed" && (
                            <a
                              href="https://pagespeed.web.dev/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-prisma-cyan hover:underline"
                            >
                              Abrir PageSpeed Insights <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                        <div className="flex items-center gap-4">
                          {item.tipo === "pagespeed" ? (
                            <>
                              <input
                                className={`${inputCls} !w-24 text-center nl-tabular`}
                                placeholder="0–100"
                                inputMode="numeric"
                                value={
                                  item.id === "ps_movil"
                                    ? state.pagespeed.movil
                                    : state.pagespeed.desktop
                                }
                                onChange={(e) =>
                                  setState((s) => ({
                                    ...s,
                                    pagespeed: {
                                      ...s.pagespeed,
                                      [item.id === "ps_movil" ? "movil" : "desktop"]:
                                        e.target.value,
                                    },
                                  }))
                                }
                              />
                              <span
                                className="inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-sm font-black"
                                style={{
                                  background: nota ? cat.color : "rgba(255,255,255,0.1)",
                                  color: nota ? "#000139" : "rgba(255,255,255,0.5)",
                                }}
                                title="Nota derivada del puntaje"
                              >
                                {nota ? `Nota ${nota}` : "—"}
                              </span>
                            </>
                          ) : (
                            <ScoreButtons
                              value={state.scores[item.id]?.nota ?? null}
                              onChange={(n) => setScore(item.id, { nota: n })}
                              color={cat.color}
                            />
                          )}
                        </div>
                      </div>
                      <input
                        className={`${inputCls} mt-4 !py-2.5 text-sm`}
                        placeholder="Observaciones (qué vimos en vivo)…"
                        value={state.scores[item.id]?.obs ?? ""}
                        onChange={(e) => setScore(item.id, { obs: e.target.value })}
                      />
                    </article>
                  );
                })}
              </div>
            </SectionCard>
          );
        })}

        {/* Contexto para el plan a 90 días */}
        <SectionCard
          icon={ListChecks}
          title="Contexto para el plan a 90 días"
          subtitle="Estas respuestas priorizan los hitos de las 6 fases del modelo de maduración."
        >
          <div className="flex flex-col gap-4">
            <textarea
              className={`${inputCls} min-h-24`}
              placeholder="Top 3 objetivos comerciales para los próximos 12 meses…"
              value={state.contexto.objetivos}
              onChange={(e) =>
                setState((s) => ({ ...s, contexto: { ...s.contexto, objetivos: e.target.value } }))
              }
            />
            <textarea
              className={`${inputCls} min-h-20`}
              placeholder="¿Qué es lo que más les duele hoy de lo digital?"
              value={state.contexto.dolor}
              onChange={(e) =>
                setState((s) => ({ ...s, contexto: { ...s.contexto, dolor: e.target.value } }))
              }
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                className={inputCls}
                placeholder="Inversión mensual en pauta (CLP)"
                inputMode="numeric"
                value={state.contexto.inversion}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    contexto: { ...s.contexto, inversion: e.target.value },
                  }))
                }
              />
              <input
                className={inputCls}
                placeholder="% de ventas que hoy viene del canal online"
                inputMode="numeric"
                value={state.contexto.ventasPct}
                onChange={(e) =>
                  setState((s) => ({
                    ...s,
                    contexto: { ...s.contexto, ventasPct: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-bold text-white/70 mb-2">
                ¿Cómo se toman hoy las decisiones de marketing?
              </p>
              <div className="flex flex-wrap gap-2">
                {decisionesOpciones.map((op) => {
                  const active = state.contexto.decisiones === op;
                  return (
                    <button
                      key={op}
                      type="button"
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          contexto: { ...s.contexto, decisiones: active ? "" : op },
                        }))
                      }
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "nl-tile-gradient text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {op}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold text-white/70 mb-2">Herramientas que ya usan:</p>
              <div className="flex flex-wrap gap-2">
                {herramientasLista.map((h) => {
                  const active = state.contexto.herramientas.includes(h);
                  return (
                    <button
                      key={h}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          contexto: {
                            ...s.contexto,
                            herramientas: active
                              ? s.contexto.herramientas.filter((x) => x !== h)
                              : [...s.contexto.herramientas, h],
                          },
                        }))
                      }
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        active
                          ? "nl-tile-gradient text-white"
                          : "bg-white/10 text-white/70 hover:bg-white/20"
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Proyección de resultados */}
        <SectionCard
          icon={Calculator}
          title="Proyección de resultados"
          subtitle="Estimación en vivo con los números del cliente — honesta, no una promesa."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <input
              className={inputCls}
              placeholder="Visitas mensuales al sitio"
              inputMode="numeric"
              value={state.proyeccion.visitas}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  proyeccion: { ...s.proyeccion, visitas: e.target.value },
                }))
              }
            />
            <input
              className={inputCls}
              placeholder="Tasa de conversión actual (%)"
              inputMode="decimal"
              value={state.proyeccion.conversion}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  proyeccion: { ...s.proyeccion, conversion: e.target.value },
                }))
              }
            />
            <input
              className={inputCls}
              placeholder="Ticket promedio (CLP)"
              inputMode="numeric"
              value={state.proyeccion.ticket}
              onChange={(e) =>
                setState((s) => ({
                  ...s,
                  proyeccion: { ...s.proyeccion, ticket: e.target.value },
                }))
              }
            />
          </div>
          {proyeccion ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Venta online hoy / mes", valor: proyeccion.actual, color: "#ffffff" },
                { label: "Meta a 90 días (conv. +40%)", valor: proyeccion.meta90, color: "#32d6ff" },
                {
                  label: "Meta a 12 meses (conv. ×2 · tráfico +20%)",
                  valor: proyeccion.meta12,
                  color: "#d713f9",
                },
              ].map(({ label, valor, color }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center"
                >
                  <p className="text-xs font-bold tracking-wide uppercase text-white/55">{label}</p>
                  <p className="mt-2 text-2xl md:text-3xl font-extrabold nl-tabular" style={{ color }}>
                    {clp.format(Math.round(valor))}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm text-white/50">
              Completa los tres campos para calcular la proyección en vivo.
            </p>
          )}
        </SectionCard>

        {/* Resumen del scorecard */}
        <SectionCard icon={Gauge} title="Resumen del diagnóstico">
          <div className="flex flex-wrap items-center gap-6">
            <div className="text-center">
              <p className="text-6xl font-extrabold nl-tabular nl-text-gradient">{totales.pct}%</p>
              <p
                className="mt-1 text-sm font-black tracking-wide uppercase"
                style={{ color: clasif.color }}
              >
                {clasif.label}
              </p>
              <p className="text-xs text-white/50 mt-1">
                {totales.puntos}/{totales.maximo} pts · {totales.respondidos}/{totales.totalItems}{" "}
                revisados
              </p>
            </div>
            <div className="flex-1 min-w-[260px] flex flex-col gap-3">
              {totales.porCategoria.map((cat) => (
                <div key={cat.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-white/80">{cat.nombre}</span>
                    <span className="nl-tabular text-white/60">
                      {cat.puntos}/{cat.maximo}
                    </span>
                  </div>
                  <div className="h-2.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(cat.puntos / cat.maximo) * 100}%`,
                        background: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Barra fija de acciones */}
      <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-[#000139]/90 backdrop-blur-md">
        <div className="mx-auto max-w-5xl px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <p className="nl-tabular text-sm font-bold text-white/70">
            {totales.puntos}/{totales.maximo} pts · {totales.respondidos}/{totales.totalItems}
            <span className="ml-2 font-black" style={{ color: clasif.color }}>
              {totales.respondidos > 0 ? `${totales.pct}%` : ""}
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {status.kind === "ok" && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-400">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Guardado ({status.id.slice(0, 8)}…)
              </span>
            )}
            {status.kind === "error" && (
              <span
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-prisma-red max-w-xs truncate"
                title={status.msg}
              >
                <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" /> {status.msg}
              </span>
            )}
            {!firebaseReady && status.kind === "idle" && (
              <span className="text-xs text-white/45">
                Firebase sin configurar — usa Exportar JSON
              </span>
            )}
            <button
              type="button"
              onClick={onNuevo}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white/80 hover:bg-white/15 transition"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" /> Nuevo
            </button>
            <button
              type="button"
              onClick={onExportar}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white/80 hover:bg-white/15 transition"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> Exportar JSON
            </button>
            <button
              type="button"
              onClick={onGuardar}
              disabled={!firebaseReady || status.kind === "saving"}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.03] disabled:opacity-40 disabled:pointer-events-none"
              style={{ background: "var(--gradient-brand)" }}
            >
              <Save className="h-4 w-4" aria-hidden="true" />
              {status.kind === "saving" ? "Guardando…" : "Guardar en Firebase"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
