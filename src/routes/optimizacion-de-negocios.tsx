import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import { TrendingUp, LineChart, Shield, Code, CheckCircle, BarChart3 } from "lucide-react";
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
          "Configuramos GA4, Conversions API y Looker Studio para reducir tu CPA con datos reales. Sin suposiciones.",
      },
      { property: "og:title", content: "Optimización de Negocios y Medición de Eventos — Prisma Digital" },
      {
        property: "og:description",
        content:
          "Se acabó gastar dinero a ciegas. Medimos y modelamos eventos comerciales sin pérdidas para bajar tu CPA y optimizar tu pauta.",
      },
      { property: "og:url", content: CANONICAL_URL },
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
    <main className="min-h-screen bg-background text-foreground">
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
