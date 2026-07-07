import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import {
  Database,
  GitMerge,
  RefreshCw,
  Layers,
  CheckCircle2,
  Rocket,
  CalendarClock,
  QrCode,
  Bot,
  type LucideIcon,
} from "lucide-react";

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

// Proyectos con portada de marca (sin screenshot): amplían el portafolio digital.
type WebProject = {
  icon: LucideIcon;
  category: string;
  accent: "cyan" | "magenta";
  title: string;
  desc: string;
  tags: string[];
  cover: string;
};

const webProjects: WebProject[] = [
  {
    icon: Rocket,
    category: "LANDING PAGES",
    accent: "cyan",
    title: "Landing Pages de Alta Conversión",
    desc: "Micrositios de campaña rápidos y medidos al detalle, con test A/B y eventos marcados para que cada peso de pauta se note en las ventas.",
    tags: ["Astro", "GA4", "Meta CAPI", "A/B Test"],
    cover: "linear-gradient(135deg, #04143a 0%, #0a2a6b 55%, #32d6ff 220%)",
  },
  {
    icon: CalendarClock,
    category: "RESERVAS & AGENDA",
    accent: "magenta",
    title: "Sistemas de Reserva y Agendamiento",
    desc: "Reservas online para restaurantes, automotoras y servicios: pagos, recordatorios automáticos por WhatsApp y sincronización con tu calendario.",
    tags: ["Calendarios", "Pagos", "WhatsApp", "Recordatorios"],
    cover: "linear-gradient(135deg, #1a0736 0%, #4a0a6b 55%, #d713f9 230%)",
  },
  {
    icon: QrCode,
    category: "CATÁLOGOS DIGITALES",
    accent: "cyan",
    title: "Catálogos y Menús Digitales (QR)",
    desc: "Menús y catálogos con código QR autoadministrables: actualizas precios y stock en segundos, sin reimprimir nada y midiendo qué mira tu cliente.",
    tags: ["QR", "Menú Digital", "CMS", "Autoservicio"],
    cover: "linear-gradient(135deg, #04143a 0%, #0a2a6b 55%, #32d6ff 220%)",
  },
  {
    icon: Bot,
    category: "WHATSAPP & CHATBOTS",
    accent: "magenta",
    title: "Integración de WhatsApp y Chatbots",
    desc: "Conectamos WhatsApp Business a tu CRM con respuestas automáticas y derivación inteligente, para no perder ni una consulta y responder en segundos.",
    tags: ["WhatsApp API", "Chatbots", "CRM", "Automatización"],
    cover: "linear-gradient(135deg, #2a0730 0%, #4a0a6b 55%, #fd3833 240%)",
  },
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

      {/* Portafolio de Sitios Web y Apps */}
      <section className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden">
        <div className="nl-gem" aria-hidden="true" />
        <div className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]" aria-hidden="true">
          <div
            className="absolute top-[-10%] right-[5%] h-[30rem] w-[30rem] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #32d6ff 0%, transparent 60%)" }}
          />
          <div
            className="absolute bottom-[-10%] left-[-5%] h-96 w-96 rounded-full blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle, #d713f9 0%, transparent 60%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">Portafolio Digital</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Sitios web y apps <span className="nl-text-gradient">construidos por Prisma Digital</span>
            </h2>
            <p className="mt-5 text-white/75 text-base md:text-lg max-w-2xl mx-auto">
              Cada proyecto nace integrado al ecosistema digital de nuestros clientes: con medición de eventos, ecommerce conectado y flujos automatizados desde el día 1.
            </p>
            <div className="nl-underline mx-auto mt-6" aria-hidden="true" />
          </Reveal>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {/* Proyecto 1: Ecommerce */}
            <Reveal as="article" variant="scale" delay={0} className="nl-beam-hover group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src="/audiovisual/portfolio-ecommerce.png"
                  alt="Plataforma de ecommerce desarrollada por Prisma Digital"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000139] via-[#000139]/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-prisma-cyan/20 backdrop-blur-sm border border-prisma-cyan/30 px-3 py-1 text-xs font-bold text-prisma-cyan">
                    E-COMMERCE B2B/B2C
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-white mb-2">Plataformas de Ecommerce Integradas</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-5">Tiendas online con inventario sincronizado al POS/ERP, pasarela de pago local, despacho automatizado y medición de cada evento de compra.</p>
                <div className="flex flex-wrap gap-2">
                  {["Shopify", "WooCommerce", "VTEX", "Transbank"].map(t => (
                    <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Proyecto 2: App / Dashboard */}
            <Reveal as="article" variant="scale" delay={140} className="nl-beam-hover group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative h-64 md:h-72 overflow-hidden">
                <img
                  src="/audiovisual/portfolio-app.png"
                  alt="Aplicación web y dashboard de gestión desarrollado por Prisma Digital"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#000139] via-[#000139]/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-prisma-magenta/20 backdrop-blur-sm border border-prisma-magenta/30 px-3 py-1 text-xs font-bold text-prisma-magenta">
                    APPS WEB & MOBILE
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-white mb-2">Apps Web y Dashboards Corporativos</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-5">Aplicaciones a medida para gestión interna, control de KPIs y paneles de clientes. Accesibles desde cualquier dispositivo con datos en tiempo real.</p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "PostgreSQL", "Firebase"].map(t => (
                    <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Proyectos 3–6: portada de marca con icono (sin screenshot) */}
            {webProjects.map(({ icon: Icon, category, accent, title, desc, tags, cover }, i) => (
              <Reveal
                key={title}
                as="article"
                variant="scale"
                delay={i * 120}
                className="nl-beam-hover group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className="relative h-56 md:h-64 overflow-hidden flex items-center justify-center"
                  style={{ background: cover }}
                >
                  {/* Chrome de ventana: da lectura de "producto digital" */}
                  <div className="absolute top-4 left-4 flex gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  </div>
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 72% 28%, rgba(255,255,255,0.2), transparent 55%)",
                    }}
                    aria-hidden="true"
                  />
                  <Icon
                    className="relative h-16 w-16 md:h-20 md:w-20 text-white/90 transition-transform duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full backdrop-blur-sm px-3 py-1 text-xs font-bold border ${
                        accent === "cyan"
                          ? "bg-prisma-cyan/20 border-prisma-cyan/30 text-prisma-cyan"
                          : "bg-prisma-magenta/20 border-prisma-magenta/30 text-prisma-magenta"
                      }`}
                    >
                      {category}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm mb-5">{desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" delay={280} className="mt-12 text-center">
            <p className="text-white/50 text-sm">
              ¿Tienes un proyecto en mente? Agenda tu diagnóstico y te mostramos cómo lo integraríamos a tu operación.
            </p>
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
