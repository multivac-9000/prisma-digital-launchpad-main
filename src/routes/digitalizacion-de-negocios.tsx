import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import { Database, GitMerge, RefreshCw, Layers, CheckCircle2, ArrowRight } from "lucide-react";
import { trackCta } from "@/components/nueva/track";

const CANONICAL_URL = "https://www.prismadigital.io/digitalizacion-de-negocios";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL_URL}/#webpage`,
      url: CANONICAL_URL,
      name: "Digitalización de Negocios y Conexión de Sistemas — Prisma Digital",
      description: "Integramos tu e-commerce, CRM y automatizaciones a la operación física y comercial que ya tienes. Sin partir de cero.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.prismadigital.io/" },
          { "@type": "ListItem", position: 2, name: "Digitalización de Negocios", item: CANONICAL_URL }
        ]
      }
    }
  ]
});

export const Route = createFileRoute("/digitalizacion-de-negocios")({
  head: () => ({
    meta: [
      { title: "Digitalización de Negocios Consolidados — Prisma Digital" },
      {
        name: "description",
        content:
          "Integramos tu e-commerce, CRM y automatizaciones a la operación física y comercial que ya tienes. Sin partir de cero ni perder lo que funciona.",
      },
      { property: "og:title", content: "Digitalización de Negocios Consolidados — Prisma Digital" },
      {
        property: "og:description",
        content:
          "Moderniza y conecta tu operación física con el mundo online. Sincronizamos stock, ventas y CRM de forma automatizada y medible.",
      },
      { property: "og:url", content: CANONICAL_URL },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: DigitalizacionPage,
});

const pains = [
  {
    title: "Sistemas desconectados que generan caos",
    desc: "Tu ecommerce va por un lado, tu local físico por otro y tu facturación por otro. Tu equipo pasa horas copiando datos a mano."
  },
  {
    title: "Fuga de clientes por falta de stock sincronizado",
    desc: "Vendes online un producto que ya no te queda en la bodega física. Cancelas compras y dañas la reputación de tu marca."
  },
  {
    title: "Cero seguimiento comercial a tus contactos",
    desc: "Los prospectos que preguntan por la web quedan en correos sueltos, sin que entren a un embudo ordenado que concrete la venta."
  }
];

const features = [
  {
    icon: Database,
    title: "Sincronización de Inventarios y POS/ERP",
    desc: "Conectamos tu tienda online (Shopify, WooCommerce, VTEX) con tu sistema administrativo para que el stock físico y el online coincidan al segundo."
  },
  {
    icon: GitMerge,
    title: "Automatización de Procesos y Flujos",
    desc: "Eliminamos las tareas manuales repetitivas. Cuando se genera una venta, la orden viaja a bodega, se genera la boleta y se actualiza el CRM automáticamente."
  },
  {
    icon: RefreshCw,
    title: "Integración de CRM y Canales de Venta",
    desc: "Centralizamos a tus clientes. Toda consulta en web, WhatsApp o sucursal se unifica en un perfil listo para campañas de fidelización o remarketing."
  },
  {
    icon: Layers,
    title: "Ecosistemas sin parches",
    desc: "No tiramos a la basura lo que ya usas. Auditamos tu software actual y creamos las conexiones exactas para que escales de forma estable."
  }
];

function DigitalizacionPage() {
  const MEET_URL = "https://meet.brevo.com/prisma-digital";

  return (
    <main className="min-h-screen bg-background text-foreground">
      <noscript>
        <style>{`.nl-reveal,.nl-word,.nl-badge-anim{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />

      {/* Hero personalizado */}
      <HeroNueva
        h1Line1="Moderniza y conecta tu negocio físico."
        h1Line2="Sistemas y ventas online integrados."
        description="Tu negocio físico ya es exitoso y tiene trayectoria. Es momento de que tu e-commerce, inventario, CRM y facturación funcionen integrados a tu operación actual, sin fricciones ni duplicar el trabajo manual."
        ctaText="Conectar mi Operación Gratis"
        ctaId="hero_digitalizacion"
        customTickerItems={[
          "+143% ventas online — Emporio Nacional",
          "Bodega y tienda online sincronizadas 24/7",
          "Integración de ERP/POS sin caídas",
          "Automatizaciones comerciales listas en 30 días"
        ]}
      />

      {/* Sección Dolores (Por qué duele no estar conectado) */}
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
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">El costo de la desconexión</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Los síntomas de una <span className="nl-text-gradient">operación digital desconectada</span>
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

      {/* Sección Qué Hacemos (Solución) */}
      <section className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white py-20 md:py-28">
        <div className="nl-gem" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-4 block">Nuestra Solución</span>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-tight">
              Conectamos lo que ya funciona <span className="nl-metric-gradient">con el futuro del negocio.</span>
            </h2>
            <div className="nl-underline mx-auto mt-5" aria-hidden="true" />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <Reveal
                  key={feat.title}
                  as="div"
                  variant="scale"
                  delay={i * 120}
                  className="nl-beam-hover flex gap-5 rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="nl-tile-gradient flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink mb-2">{feat.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feat.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="up" className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-muted/30 border border-border rounded-2xl p-8 max-w-2xl mx-auto">
              <CheckCircle2 className="h-10 w-10 text-prisma-magenta" />
              <h4 className="text-xl font-bold text-ink">¿El resultado final?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Una operación fluida donde el canal online vende y procesa pedidos con la misma rapidez y orden que tu mejor tienda física, reduciendo errores humanos a cero.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA Final */}
      <ContactoNueva />

      {/* Otros Servicios (excluyendo este) */}
      <ServiciosNueva
        excludeEyebrow="DIGITALIZACIÓN DE NEGOCIOS"
        title="Nuestros otros frentes de crecimiento digital"
      />

      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
