import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import { DigitalizacionVisual } from "@/components/nueva/heroVisuals";
import {
  Globe,
  Database,
  GitMerge,
  RefreshCw,
  CheckCircle2,
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
      name: "Sitios Web Profesionales y Digitalización de Negocios — Prisma Digital",
      description: "Creamos tu sitio web profesional con las herramientas de marketing y medición conectadas, integrado a tu stock, tus ventas y tus clientes. Digitaliza tu negocio físico sin partir de cero.",
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
      { title: "Sitios Web Profesionales y Digitalización — Prisma Digital" },
      {
        name: "description",
        content:
          "Creamos tu sitio web profesional listo para vender, con el marketing y la medición ya conectados, e integrado a tu stock, ventas y clientes. Digitaliza tu negocio físico sin partir de cero.",
      },
      {
        property: "og:title",
        content: "Sitios Web Profesionales y Digitalización — Prisma Digital",
      },
      {
        property: "og:description",
        content:
          "Tu nueva página web hecha para vender, con todo tu marketing medido y conectado a tu stock, tus ventas y tus clientes. Sin partir de cero.",
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
    title: "Una web que no está a la altura de tu negocio",
    desc: "Tu local transmite años de prestigio, pero tu página web se ve antigua, carga lenta y no invita a comprar. Tus clientes lo notan."
  },
  {
    title: "Vendes sin saber qué te está funcionando",
    desc: "Tienes página y redes sociales, pero nadie te dice de dónde vienen las ventas ni cuánto te cuesta cada cliente nuevo."
  },
  {
    title: "Todo por separado y hecho a mano",
    desc: "Tu web, tu stock y tus clientes van cada uno por su lado. Tu equipo pierde horas copiando datos y, a veces, se pierden ventas."
  }
];

const features = [
  {
    icon: Globe,
    title: "Un sitio web profesional, hecho para vender",
    desc: "Diseñamos tu nueva página a la medida de tu negocio: rápida, clara y fácil de comprar. Con todas tus herramientas de marketing y medición ya conectadas (Google, redes sociales y tu base de clientes), para que sepas de dónde viene cada venta desde el primer día."
  },
  {
    icon: Database,
    title: "Tu stock siempre al día, online y en tienda",
    desc: "Conectamos tu página con tu sistema de caja e inventario para que nunca vendas algo que ya no tienes. Lo que se vende en el local se descuenta online al instante, y al revés."
  },
  {
    icon: GitMerge,
    title: "Menos trabajo a mano, más ventas",
    desc: "Cuando entra una venta, el pedido llega a bodega, se genera la boleta y queda registrada la información del cliente — todo solo. Tu equipo deja de copiar datos y se dedica a vender."
  },
  {
    icon: RefreshCw,
    title: "Todos tus clientes en un solo lugar",
    desc: "Cada consulta que llega por tu web, WhatsApp o el local queda ordenada en un mismo lugar. Así das un mejor seguimiento, fidelizas y vuelves a venderle a quien ya te compró."
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
    icon: Globe,
    category: "SITIOS WEB PROFESIONALES",
    accent: "cyan",
    title: "Sitios Web Corporativos e Institucionales",
    desc: "Páginas a la medida de tu marca: rápidas, fáciles de usar y pensadas para vender. Preparadas para aparecer en Google y con tu marketing y medición conectados desde el primer día.",
    tags: ["Diseño a medida", "Optimizado para Google", "Carga rápida", "Medición conectada"],
    cover: "linear-gradient(135deg, #04143a 0%, #0a2a6b 55%, #32d6ff 220%)",
  },
  {
    icon: CalendarClock,
    category: "RESERVAS Y AGENDA",
    accent: "magenta",
    title: "Sistemas de Reserva y Agendamiento",
    desc: "Reservas online para restaurantes, automotoras y servicios: cobros, recordatorios automáticos por WhatsApp y agenda siempre sincronizada.",
    tags: ["Reservas online", "Pagos", "Avisos por WhatsApp", "Agenda al día"],
    cover: "linear-gradient(135deg, #1a0736 0%, #4a0a6b 55%, #d713f9 230%)",
  },
  {
    icon: QrCode,
    category: "CATÁLOGOS Y MENÚS",
    accent: "cyan",
    title: "Catálogos y Menús Digitales (QR)",
    desc: "Menús y catálogos con código QR que tú mismo actualizas: cambias precios en segundos, sin reimprimir nada, y ves qué es lo que más mira tu cliente.",
    tags: ["Menú por QR", "Lo actualizas tú", "Precios al instante", "Autoservicio"],
    cover: "linear-gradient(135deg, #04143a 0%, #0a2a6b 55%, #32d6ff 220%)",
  },
  {
    icon: Bot,
    category: "WHATSAPP Y CHATBOTS",
    accent: "magenta",
    title: "Atención Automática por WhatsApp",
    desc: "Conectamos WhatsApp a tu base de clientes con respuestas automáticas que atienden al instante y derivan al vendedor correcto, para no perder ni una consulta.",
    tags: ["WhatsApp Business", "Respuestas automáticas", "Ordena tus clientes", "Responde al toque"],
    cover: "linear-gradient(135deg, #2a0730 0%, #4a0a6b 55%, #fd3833 240%)",
  },
];

function DigitalizacionPage() {
  const MEET_URL = "https://meet.brevo.com/prisma-digital";

  return (
    <main className="nl-theme-cyan min-h-screen bg-background text-foreground">
      <noscript>
        <style>{`.nl-reveal,.nl-word,.nl-badge-anim{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />

      {/* Hero personalizado */}
      <HeroNueva
        h1Line1="Tu sitio web, hecho para vender."
        h1Line2="Y conectado a todo tu negocio."
        description="Diseñamos tu nueva página web pensada para vender, con tus herramientas de marketing y medición ya conectadas. Y la integramos a tu stock, tus ventas y tus clientes, para que lo online funcione tan ordenado como tu local de siempre."
        ctaText="Quiero mi Diagnóstico Web Gratis"
        ctaId="hero_digitalizacion"
        customTickerItems={[
          "Sitios web profesionales que sí venden",
          "Marketing y medición conectados desde el primer día",
          "+143% ventas online — Emporio Nacional",
          "Tu stock online y en tienda, siempre al día"
        ]}
        visual={<DigitalizacionVisual />}
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
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">Lo que hoy te está frenando</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Tu negocio va excelente. <span className="nl-text-gradient">Lo digital, quedó a medias.</span>
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
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-4 block">Lo que hacemos por ti</span>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-tight">
              Tu página web y tu negocio, <span className="nl-metric-gradient">por fin trabajando juntos.</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Creamos tu sitio web y lo conectamos con lo que ya usas todos los días. No empezamos de cero ni te obligamos a cambiar todo: sumamos orden y ventas a lo que ya construiste.
            </p>
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
              <h4 className="text-xl font-bold text-ink">¿El resultado para ti?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Una página web que vende y atiende pedidos con la misma rapidez y orden que tu mejor día en el local — sin errores manuales y sabiendo, por fin, qué es lo que de verdad te trae ventas.
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
              Sitios web y sistemas <span className="nl-text-gradient">hechos por Prisma Digital</span>
            </h2>
            <p className="mt-5 text-white/75 text-base md:text-lg max-w-2xl mx-auto">
              No entregamos una página bonita y nos vamos. Cada sitio que construimos nace conectado a las ventas, al stock y a las herramientas de marketing de nuestros clientes — para que trabaje por el negocio desde el primer día.
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
                    TIENDAS ONLINE
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-white mb-2">Tiendas Online Conectadas</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-5">Tiendas online enlazadas a tu caja e inventario, con pago local, despacho automático y cada venta medida para que sepas qué te está funcionando.</p>
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
                    APPS Y PANELES A MEDIDA
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-xl font-bold text-white mb-2">Aplicaciones y Paneles a Medida</h3>
                <p className="text-white/70 leading-relaxed text-sm mb-5">Aplicaciones y paneles hechos a la medida de tu operación: para gestionar tu equipo, ver tus números al día y darles acceso a tus clientes, desde cualquier dispositivo.</p>
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
