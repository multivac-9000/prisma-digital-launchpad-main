import { type CSSProperties } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal, CountUp } from "@/components/nueva/scrolly";
import { OptimizacionVisual } from "@/components/nueva/heroVisuals";
import { TrendingUp, LineChart, Code, BarChart3 } from "lucide-react";
import { trackCta } from "@/components/nueva/track";

const CANONICAL_URL = "https://www.prismadigital.io/optimizacion-de-negocios";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL_URL}/#webpage`,
      url: CANONICAL_URL,
      name: "Optimización de Negocios y Medición Avanzada — Prisma Digital",
      description: "Configuramos GA4, Conversions API y Looker Studio. Toma el control del retorno de tu inversión publicitaria.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.prismadigital.io/" },
          { "@type": "ListItem", position: 2, name: "Optimización de Negocios", item: CANONICAL_URL }
        ]
      }
    }
  ]
});

export const Route = createFileRoute("/optimizacion-de-negocios")({
  head: () => ({
    meta: [
      { title: "Optimización de Negocios y Medición de Eventos — Prisma Digital" },
      {
        name: "description",
        content:
          "Medición de eventos web y apps con GA4, Conversions API y Server-Side GTM, más dashboards en Looker Studio para reducir tu CPA. Con datos, no suposiciones.",
      },
      { property: "og:title", content: "Optimización de Negocios y Medición de Eventos — Prisma Digital" },
      {
        property: "og:description",
        content:
          "Se acabó gastar dinero a ciegas. Medimos y modelamos eventos comerciales sin pérdidas para bajar tu CPA y optimizar tu pauta.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://www.prismadigital.io/og/og-optimizacion.png" },
      { property: "og:image:secure_url", content: "https://www.prismadigital.io/og/og-optimizacion.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Optimización de negocios en Prisma Digital: GA4, Conversions API y Looker Studio para reducir el CPA.",
      },
      {
        name: "twitter:title",
        content: "Optimización de Negocios y Medición de Eventos — Prisma Digital",
      },
      {
        name: "twitter:description",
        content:
          "Medimos y modelamos eventos sin pérdidas con GA4 y Conversions API para bajar tu CPA. Sin suposiciones.",
      },
      { name: "twitter:image", content: "https://www.prismadigital.io/og/og-optimizacion.png" },
      {
        name: "twitter:image:alt",
        content:
          "Optimización y medición de eventos: GA4, Conversions API, Server-Side GTM y dashboards en Looker Studio.",
      },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: OptimizacionPage,
});

const pains = [
  {
    title: "La señal perdida por cookies bloqueadas",
    desc: "Los bloqueadores de anuncios, Safari y las políticas de iOS 14+ impiden que Meta y Google reciban hasta el 40% de tus datos de compra reales."
  },
  {
    title: "El CPA sube sin explicación alguna",
    desc: "Al no recibir datos de conversión correctos, los algoritmos de las plataformas optimizan tus anuncios a ciegas, encareciendo el coste por cliente."
  },
  {
    title: "Reuniones de equipo basadas en opiniones",
    desc: "Deciden qué productos o campañas empujar basándose en la intuición de la mesa en lugar de mirar un panel unificado con el ROAS real."
  }
];

const pillars = [
  {
    icon: Code,
    title: "Conversions API (CAPI) y Server-Side GTM",
    desc: "Instalamos la medición desde el servidor para que los eventos de compra viajen directamente a las plataformas publicitarias, sorteando adblockers."
  },
  {
    icon: LineChart,
    title: "Auditoría de Eventos GA4 Avanzada",
    desc: "Marcamos de forma correcta cada paso del embudo (clics en botones clave, visualización del carro, checkout) para saber dónde se caen las visitas."
  },
  {
    icon: BarChart3,
    title: "Dashboards en Looker Studio a la Medida",
    desc: "Centralizamos tus fuentes de datos en un solo panel interactivo y comprensible, para que veas tu CAC, LTV y ROAS al instante."
  }
];

function OptimizacionPage() {
  return (
    <main className="nl-theme-red min-h-screen bg-background text-foreground">
      <noscript>
        <style>{`.nl-reveal,.nl-word,.nl-badge-anim{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />

      {/* Hero personalizado */}
      <HeroNueva
        h1Line1="Baja tu CPA midiendo lo que importa."
        h1Line2="Decisiones con datos reales."
        description="Se acabó gastar dinero a ciegas. Configuramos una medición avanzada y precisa en tu web o app para que sepas de dónde viene cada venta y las plataformas optimicen con datos correctos."
        ctaText="Optimizar mi Medición Gratis"
        ctaId="hero_optimizacion"
        customTickerItems={[
          "Integración Server-Side y Conversions API",
          "Atribución limpia de conversiones comerciales",
          "Reducción directa de costes publicitarios (CPA)",
          "Control de métricas clave (LTV, CAC, ROAS)"
        ]}
        visual={<OptimizacionVisual />}
      />

      {/* Sección Dolores (Por qué es peligroso medir mal) */}
      <section className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden">
        <div className="nl-gem" aria-hidden="true" />
        <div className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]" aria-hidden="true">
          <div
            className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #d713f9 0%, transparent 65%)" }}
          />
          <div
            className="absolute bottom-[-15%] left-[-8%] h-[28rem] w-[28rem] rounded-full blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle, #32d6ff 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">El riesgo de la ceguera digital</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Los riesgos de <span className="nl-text-gradient">no medir correctamente</span>
            </h2>
            <div className="nl-underline mx-auto mt-6" aria-hidden="true" />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pains.map((pain, i) => (
              <Reveal
                key={pain.title}
                as="article"
                variant="up"
                delay={i * 120}
                className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-8 shadow-xl"
              >
                <div className="text-prisma-red font-black text-2xl mb-4">0{i+1}.</div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">{pain.title}</h3>
                <p className="text-white/80 leading-relaxed">{pain.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Solución (Cómo lo resolvemos) */}
      <section className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white py-20 md:py-28">
        <div className="nl-gem" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-4 block">El valor de los datos</span>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-tight">
              Transformamos la incertidumbre <span className="nl-metric-gradient">en rentabilidad y control.</span>
            </h2>
            <div className="nl-underline mx-auto mt-5" aria-hidden="true" />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {pillars.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal
                  key={feat.title}
                  as="div"
                  variant="scale"
                  delay={i * 120}
                  className="nl-beam-hover flex flex-col items-center text-center rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="nl-tile-gradient flex h-12 w-12 items-center justify-center rounded-xl text-white mb-5">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-ink mb-2">{feat.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Centro de Control de Datos — Dashboards y Gráficos Interactivos */}
      <section className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden">
        <div className="nl-gem" aria-hidden="true" />
        <div className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]" aria-hidden="true">
          <div className="absolute top-[20%] left-[10%] h-96 w-96 rounded-full blur-3xl opacity-15" style={{ background: "radial-gradient(circle, #32d6ff 0%, transparent 60%)" }} />
          <div className="absolute bottom-[10%] right-[5%] h-80 w-80 rounded-full blur-3xl opacity-12" style={{ background: "radial-gradient(circle, #d713f9 0%, transparent 60%)" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">Centro de Control de Datos</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Así se ve un negocio <span className="nl-text-gradient">optimizado con datos reales</span>
            </h2>
            <p className="mt-5 text-white/70 text-base md:text-lg max-w-2xl mx-auto">
              Los tableros que armamos conectan cada señal de tu ecosistema digital para que tomes decisiones con datos, no con suposiciones.
            </p>
            <div className="nl-underline mx-auto mt-6" aria-hidden="true" />
          </Reveal>

          {/* KPI Cards Row */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "CPA", value: "$4.820", trend: "-32%", color: "#32d6ff", down: true },
              { label: "ROAS", value: "4.2x", trend: "+180%", color: "#d713f9", down: false },
              { label: "Conversiones", value: "347", trend: "+89%", color: "#fecd2b", down: false },
              { label: "CTR", value: "3.8%", trend: "+54%", color: "#32d6ff", down: false },
            ].map((kpi, i) => (
              <Reveal key={kpi.label} variant="scale" delay={i * 100} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 text-center">
                <p className="text-xs font-bold tracking-widest uppercase text-white/50 mb-2">{kpi.label}</p>
                <p className="text-3xl md:text-4xl font-black text-white nl-tabular">
                  <CountUp value={kpi.value} />
                </p>
                <p className={`mt-1 text-sm font-bold ${kpi.down ? "text-green-400" : "text-green-400"}`}>
                  {kpi.down ? "↓" : "↑"} {kpi.trend}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* CPA Trend Chart */}
            <Reveal variant="up" delay={100} className="nl-beam-hover rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/50">Costo por Adquisición</p>
                  <p className="text-2xl font-bold text-white mt-1">Tendencia CPA <span className="text-green-400 text-sm">↓ a la baja</span></p>
                </div>
                <TrendingUp className="h-6 w-6 text-prisma-cyan" />
              </div>
              <svg viewBox="0 0 400 120" className="w-full h-auto" aria-label="Gráfico de tendencia del CPA a la baja">
                <defs>
                  <linearGradient id="cpafill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#32d6ff" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#32d6ff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[20, 40, 60, 80, 100].map(y => (
                  <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                ))}
                {/* Area (aparece cuando la tarjeta se revela) */}
                <polygon className="nl-spark-fill" points="0,95 40,90 80,82 120,78 160,65 200,60 240,50 280,42 320,35 360,28 400,20 400,120 0,120" fill="url(#cpafill)" />
                {/* Line (se dibuja sola al revelarse) */}
                <polyline className="nl-spark-path" points="0,95 40,90 80,82 120,78 160,65 200,60 240,50 280,42 320,35 360,28 400,20" fill="none" stroke="#32d6ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
                {/* Dot at end (pulso suave) */}
                <circle className="nl-pulse-dot" cx="400" cy="20" r="5" fill="#32d6ff" />
                {/* Labels */}
                <text x="5" y="112" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="sans-serif">Ene</text>
                <text x="190" y="112" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="sans-serif">Jun</text>
                <text x="375" y="112" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="sans-serif">Dic</text>
              </svg>
            </Reveal>

            {/* ROAS Bar Chart */}
            <Reveal variant="up" delay={200} className="nl-beam-hover rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/50">Retorno de Inversión</p>
                  <p className="text-2xl font-bold text-white mt-1">ROAS por Canal <span className="text-green-400 text-sm">↑ creciendo</span></p>
                </div>
                <BarChart3 className="h-6 w-6 text-prisma-magenta" />
              </div>
              <div className="space-y-4">
                {[
                  { channel: "Google Ads", roas: 4.2, width: "84%", color: "#32d6ff" },
                  { channel: "Meta Ads", roas: 3.8, width: "76%", color: "#d713f9" },
                  { channel: "Email", roas: 6.1, width: "100%", color: "#fecd2b" },
                  { channel: "Orgánico", roas: 5.4, width: "92%", color: "#32d6ff" },
                ].map((ch, i) => (
                  <div key={ch.channel}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-white/80 font-medium">{ch.channel}</span>
                      <span className="text-white font-bold nl-tabular">{ch.roas}x</span>
                    </div>
                    <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="nl-bar-grow nl-bar-shine h-full rounded-full"
                        style={{ width: ch.width, background: ch.color, "--nl-bd": `${i * 120}ms` } as CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Conversion Funnel */}
            <Reveal variant="up" delay={300} className="nl-beam-hover rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/50">Embudo de Conversión</p>
                  <p className="text-2xl font-bold text-white mt-1">Eventos Rastreados</p>
                </div>
                <LineChart className="h-6 w-6 text-prisma-cyan" />
              </div>
              <div className="space-y-3">
                {[
                  { step: "Visitas al Sitio", count: "12.480", pct: 100, color: "#32d6ff" },
                  { step: "Producto Visto", count: "5.120", pct: 41, color: "#32d6ff" },
                  { step: "Agregar al Carro", count: "1.890", pct: 15, color: "#d713f9" },
                  { step: "Checkout Iniciado", count: "980", pct: 8, color: "#d713f9" },
                  { step: "Compra Completada", count: "347", pct: 2.8, color: "#fecd2b" },
                ].map((s, i) => (
                  <div key={s.step} className="flex items-center gap-4">
                    <div className="w-28 md:w-36 text-sm text-white/70 shrink-0 truncate">{s.step}</div>
                    <div className="flex-1 h-6 rounded bg-white/5 overflow-hidden relative">
                      <div
                        className="nl-bar-grow h-full rounded"
                        style={{ width: `${s.pct}%`, background: s.color, opacity: 0.7, "--nl-bd": `${i * 90}ms` } as CSSProperties}
                      />
                      <span className="absolute right-2 top-0.5 text-xs font-bold text-white/90 nl-tabular">{s.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Real-time Attribution Table */}
            <Reveal variant="up" delay={400} className="nl-beam-hover rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-white/50">Atribución en Tiempo Real</p>
                  <p className="text-2xl font-bold text-white mt-1">Últimas Conversiones</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-400">
                  <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /> LIVE
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                      <th className="pb-3 text-left font-bold">Fuente</th>
                      <th className="pb-3 text-left font-bold">Evento</th>
                      <th className="pb-3 text-right font-bold">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { src: "google / cpc", event: "purchase", value: "$48.900" },
                      { src: "meta / paid", event: "purchase", value: "$32.500" },
                      { src: "google / organic", event: "lead", value: "$12.000" },
                      { src: "meta / paid", event: "add_to_cart", value: "$18.200" },
                      { src: "direct", event: "purchase", value: "$65.000" },
                    ].map((row, i) => (
                      <tr key={i} className="text-white/80">
                        <td className="py-2.5 font-medium">{row.src}</td>
                        <td className="py-2.5">
                          <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${row.event === "purchase" ? "bg-green-500/20 text-green-400" : row.event === "lead" ? "bg-blue-500/20 text-blue-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                            {row.event}
                          </span>
                        </td>
                        <td className="py-2.5 text-right font-bold nl-tabular">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <ContactoNueva />

      {/* Otros Servicios (excluyendo este) */}
      <ServiciosNueva
        excludeEyebrow="OPTIMIZACIÓN DE NEGOCIOS"
        title="Nuestros otros frentes de crecimiento digital"
      />

      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
