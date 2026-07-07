import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import { Megaphone, Target, BarChart2, Video, Eye, ShieldCheck } from "lucide-react";
import { trackCta } from "@/components/nueva/track";

const CANONICAL_URL = "https://www.prismadigital.io/promocion-de-negocios";

const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${CANONICAL_URL}/#webpage`,
      url: CANONICAL_URL,
      name: "Promoción de Negocios y Captación Predictiva — Prisma Digital",
      description: "Diseñamos un sistema predictivo de captación de clientes. Campañas inteligentes en Meta, Google y producción audiovisual premium.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: "https://www.prismadigital.io/" },
          { "@type": "ListItem", position: 2, name: "Promoción de Negocios", item: CANONICAL_URL }
        ]
      }
    }
  ]
});

export const Route = createFileRoute("/promocion-de-negocios")({
  head: () => ({
    meta: [
      { title: "Promoción de Negocios y Captación de Clientes — Prisma Digital" },
      {
        name: "description",
        content:
          "Construimos sistemas de captación de clientes predecibles y medibles. Embudos de venta, Meta Ads, Google Ads y producción audiovisual premium.",
      },
      { property: "og:title", content: "Promoción de Negocios y Captación de Clientes — Prisma Digital" },
      {
        property: "og:description",
        content:
          "Atrae un flujo constante de clientes nuevos con pautas publicitarias basadas en datos y un contenido audiovisual que impacta y vende.",
      },
      { property: "og:url", content: CANONICAL_URL },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: PromocionPage,
});

const pains = [
  {
    title: "Presupuesto quemado sin ventas claras",
    desc: "Inviertes dinero mes a mes en agencias que te entregan reportes llenos de clics y likes, pero no puedes ver cuántas ventas reales llegaron de ahí."
  },
  {
    title: "Campañas sueltas y sin un rumbo definido",
    desc: "Promocionas publicaciones de vez en cuando sin un embudo que guíe a las personas desde el primer clic hasta que agendan o compran."
  },
  {
    title: "Dependencia del boca a boca para crecer",
    desc: "Tus ventas fluctúan según la temporada y la suerte, porque no cuentas con un motor de anuncios pagados que traiga clientes nuevos todos los días."
  }
];

const pillars = [
  {
    icon: Target,
    title: "Segmentación Avanzada y Precisa",
    desc: "No tiramos pauta al aire. Identificamos y apuntamos directamente a tus avatares de cliente ideal (tomadores de decisión, jefes de área, etc.) en Google y Meta."
  },
  {
    icon: BarChart2,
    title: "Optimización Basada en el ROI",
    desc: "Reducimos tu Costo de Adquisición (CPA). Analizamos qué anuncio y qué canal genera compras reales para asignar ahí tu presupuesto eficientemente."
  },
  {
    icon: Megaphone,
    title: "Embudos de Venta de Alta Conversión",
    desc: "Diseñamos la ruta completa del usuario: desde el primer impacto publicitario, pasando por la landing page optimizada, hasta la conversión final."
  }
];

const galleryItems = [
  {
    img: "/audiovisual/filming.png",
    title: "Producción de Spots Comerciales",
    tech: "Equipos de Cine & Estabilización",
    desc: "Filmamos en tu locación o estudio con calidad de cine para transmitir la solidez y el profesionalismo de tu marca de forma inconfundible."
  },
  {
    img: "/audiovisual/photography.png",
    title: "Fotografía de Producto Comercial",
    tech: "Estudio de Iluminación Pro",
    desc: "Capturamos los detalles de tus productos con iluminación y ópticas de alto nivel para aumentar el valor percibido en tu eCommerce."
  },
  {
    img: "/audiovisual/reels.png",
    title: "Reels y Contenido Vertical Dinámico",
    tech: "Formato Móvil 9:16 & Ritmo",
    desc: "Grabamos y editamos videos dinámicos y ágiles estructurados con ganchos de retención para captar interés inmediato en Instagram y TikTok."
  },
  {
    img: "/audiovisual/drone.png",
    title: "Cinematografía Aérea con Drones",
    tech: "Resolución 4K & Piloto Certificado",
    desc: "Realizamos tomas aéreas espectaculares para videos corporativos, de infraestructura o eventos que le dan escala y prestigio a tu negocio."
  }
];

function PromocionPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <noscript>
        <style>{`.nl-reveal,.nl-word,.nl-badge-anim{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />

      {/* Hero personalizado */}
      <HeroNueva
        h1Line1="Atrae un flujo constante de clientes."
        h1Line2="Campañas publicitarias que sí venden."
        description="Deja de depender de la suerte o de agencias de marketing digital que no miden retornos. Construimos un sistema de captación predictivo en Meta y Google Ads impulsado por el mejor contenido visual de tu rubro."
        ctaText="Crear mi Motor de Clientes Gratis"
        ctaId="hero_promocion"
        customTickerItems={[
          "ROAS promedio 4.2x en Liberty Seguros",
          "Generación constante de leads calificados",
          "Embudos de venta activos en 15 días",
          "Producción audiovisual premium incluida en plan de pauta"
        ]}
      />

      {/* Sección Dolores (Por qué fallan las agencias tradicionales) */}
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
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">La frustración en marketing</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              ¿Por qué tus campañas anteriores <span className="nl-text-gradient">no trajeron ventas?</span>
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

      {/* Sección Pilares (Cómo lo resolvemos) */}
      <section className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white py-20 md:py-28">
        <div className="nl-gem" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-4 block">Nuestra metodología</span>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-tight">
              Anuncios rentables construidos <span className="nl-metric-gradient">con datos y estrategia.</span>
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

      {/* Galería Audiovisual (Espacio con énfasis en Audiovisual solicitado por el usuario) */}
      <section className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden">
        <div className="nl-gem" aria-hidden="true" />
        <div className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]" aria-hidden="true">
          <div
            className="absolute top-1/2 left-[15%] h-96 w-96 rounded-full blur-3xl opacity-15"
            style={{ background: "radial-gradient(circle, #32d6ff 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">Producción de Contenido</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Fotografía y Video <span className="nl-text-gradient">que conquistan al algoritmo</span>
            </h2>
            <p className="mt-4 text-white/75 text-base md:text-lg">
              No usamos fotos de stock. Creamos material propio de altísima calidad para tu negocio físico, asegurando que tus anuncios tengan el mayor porcentaje de retención posible.
            </p>
            <div className="nl-underline mx-auto mt-6" aria-hidden="true" />
          </Reveal>

          {/* Grilla interactiva de la galería */}
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {galleryItems.map((item, i) => (
              <Reveal
                key={item.title}
                as="article"
                variant="scale"
                delay={i * 140}
                className="nl-beam-hover group relative flex flex-col rounded-3xl overflow-hidden bg-white/[0.03] border border-white/10 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                {/* Imagen con zoom al hover */}
                <div className="relative h-64 md:h-72 w-full overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000139] via-transparent to-transparent opacity-80" />
                  
                  {/* Etiqueta técnica */}
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-[#000139]/80 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs font-bold text-prisma-cyan">
                    <Video className="h-3.5 w-3.5" />
                    {item.tech}
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm flex-grow">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <ContactoNueva />

      {/* Otros Servicios (excluyendo este) */}
      <ServiciosNueva
        excludeEyebrow="PROMOCIÓN DE NEGOCIOS"
        title="Nuestros otros frentes de crecimiento digital"
      />

      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
