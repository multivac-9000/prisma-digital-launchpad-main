import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import { PromocionVisual } from "@/components/nueva/heroVisuals";
import { Megaphone, Target, BarChart2, Video, Eye, ShieldCheck } from "lucide-react";
import { trackCta } from "@/components/nueva/track";
import { buildGraph, webPage, breadcrumb, service } from "@/lib/schema";

const CANONICAL_URL = "https://www.prismadigital.io/promocion-de-negocios";

const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Promoción de Negocios y Captación Predictiva — Prisma Digital",
    description:
      "Diseñamos un sistema predictivo de captación de clientes. Campañas inteligentes en Meta, Google y producción audiovisual premium.",
    image: "https://www.prismadigital.io/og/og-promocion.png",
    withBreadcrumb: true,
  }),
  breadcrumb(CANONICAL_URL, "Promoción de Negocios"),
  service({
    url: CANONICAL_URL,
    serviceType: "Promoción y captación de clientes",
    name: "Promoción de negocios y captación de clientes",
    description:
      "Sistema de captación de clientes predecible y medible con pauta basada en datos y producción audiovisual premium.",
    offers: [
      "Campañas de publicidad en Meta Ads",
      "Campañas de publicidad en Google Ads",
      "Segmentación avanzada de audiencias",
      "Embudos de venta de alta conversión",
      "Producción de spots comerciales",
      "Fotografía de producto comercial",
      "Reels y contenido vertical",
      "Cinematografía aérea con drones",
    ],
  }),
);

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
      { property: "og:image", content: "https://www.prismadigital.io/og/og-promocion.png" },
      { property: "og:image:secure_url", content: "https://www.prismadigital.io/og/og-promocion.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Promoción de negocios en Prisma Digital: captación de clientes con Meta Ads, Google Ads y producción audiovisual.",
      },
      {
        name: "twitter:title",
        content: "Promoción de Negocios y Captación de Clientes — Prisma Digital",
      },
      {
        name: "twitter:description",
        content:
          "Un flujo constante de clientes nuevos con pauta basada en datos y contenido audiovisual que vende.",
      },
      { name: "twitter:image", content: "https://www.prismadigital.io/og/og-promocion.png" },
      {
        name: "twitter:image:alt",
        content:
          "Promoción y captación de clientes: Meta Ads, Google Ads, embudos de venta y producción audiovisual.",
      },
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
    img: "/audiovisual/filming.webp",
    title: "Producción de Spots Comerciales",
    tech: "Equipos de Cine & Estabilización",
    desc: "Filmamos en tu locación o estudio con calidad de cine para transmitir la solidez y el profesionalismo de tu marca de forma inconfundible."
  },
  {
    img: "/audiovisual/photography.webp",
    title: "Fotografía de Producto Comercial",
    tech: "Estudio de Iluminación Pro",
    desc: "Capturamos los detalles de tus productos con iluminación y ópticas de alto nivel para aumentar el valor percibido en tu eCommerce."
  },
  {
    img: "/audiovisual/reels.webp",
    title: "Reels y Contenido Vertical Dinámico",
    tech: "Formato Móvil 9:16 & Ritmo",
    desc: "Grabamos y editamos videos dinámicos y ágiles estructurados con ganchos de retención para captar interés inmediato en Instagram y TikTok."
  },
  {
    img: "/audiovisual/drone.webp",
    title: "Cinematografía Aérea con Drones",
    tech: "Resolución 4K & Piloto Certificado",
    desc: "Realizamos tomas aéreas espectaculares para videos corporativos, de infraestructura o eventos que le dan escala y prestigio a tu negocio."
  }
];

function PromocionPage() {
  return (
    <main className="nl-theme-magenta min-h-screen bg-background text-foreground">
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
        visual={<PromocionVisual />}
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
                    loading="lazy"
                    decoding="async"
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

      {/* Canales de Captación Integrados — Google Ads, Meta Ads, SEO y Blogs */}
      <section className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white py-20 md:py-28">
        <div className="nl-gem" aria-hidden="true" />

        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-secondary mb-4 block">Canales de Captación Integrados</span>
            <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-tight">
              Cuatro frentes de captación <span className="nl-metric-gradient">trabajando por tus ventas.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              No dependemos de un solo canal. Activamos y sincronizamos las plataformas más efectivas para tu industria con un enfoque medible.
            </p>
            <div className="nl-underline mx-auto mt-5" aria-hidden="true" />
          </Reveal>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Google Ads */}
            <Reveal as="article" variant="scale" delay={0} className="nl-beam-hover group rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#4285F4]/10 text-[#4285F4] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-[#4285F4]">GOOGLE ADS</p>
                  <h3 className="text-xl font-bold text-ink">Campañas Automatizadas de Alto Rendimiento</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Implementamos campañas de búsqueda inteligente, Performance Max y Shopping conectadas directamente a tu feed de productos y tu sistema de medición, para que los algoritmos de Google optimicen con datos reales de ventas.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Search Ads", "Performance Max", "Shopping", "Remarketing"].map(t => (
                  <span key={t} className="rounded-full bg-[#4285F4]/10 px-3 py-1 text-xs font-semibold text-[#4285F4]">{t}</span>
                ))}
              </div>
            </Reveal>

            {/* Meta Ads */}
            <Reveal as="article" variant="scale" delay={140} className="nl-beam-hover group rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#0668E1]/10 text-[#0668E1] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 011-1h3v-4h-3a5 5 0 00-5 5v2.01h-2l-.396 3.98h2.396v8.01z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-[#0668E1]">META ADS</p>
                  <h3 className="text-xl font-bold text-ink">Campañas de Conversión en Facebook e Instagram</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Diseñamos campañas orientadas a conversiones reales (no likes) con segmentación avanzada, creatividades A/B testing y Conversions API activada para que Meta reciba cada señal de compra.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Facebook Ads", "Instagram Ads", "Advantage+", "Conversions API"].map(t => (
                  <span key={t} className="rounded-full bg-[#0668E1]/10 px-3 py-1 text-xs font-semibold text-[#0668E1]">{t}</span>
                ))}
              </div>
            </Reveal>

            {/* SEO */}
            <Reveal as="article" variant="scale" delay={280} className="nl-beam-hover group rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-5">
                <div className="nl-tile-gradient flex h-14 w-14 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <Eye className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-secondary">SEO & POSICIONAMIENTO</p>
                  <h3 className="text-xl font-bold text-ink">Optimización para Motores de Búsqueda</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Optimizamos tu estructura web, la velocidad de carga, los datos estructurados (Schema.org) y la arquitectura de URLs para que Google indexe y posicione tus páginas de servicio y productos clave.
              </p>
              <div className="flex flex-wrap gap-2">
                {["SEO Técnico", "Core Web Vitals", "Schema.org", "Search Console"].map(t => (
                  <span key={t} className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">{t}</span>
                ))}
              </div>
            </Reveal>

            {/* Blogs */}
            <Reveal as="article" variant="scale" delay={420} className="nl-beam-hover group rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-4 mb-5">
                <div className="nl-tile-gradient flex h-14 w-14 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                  <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.15em] text-secondary">CONTENIDO & INBOUND</p>
                  <h3 className="text-xl font-bold text-ink">Creación de Blogs y Contenido Estratégico</h3>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Producimos artículos de alto valor orientados a las búsquedas de tus clientes ideales. Cada publicación trabaja como un activo permanente que atrae tráfico orgánico calificado y nutre tu embudo de ventas.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Blog SEO", "Inbound Marketing", "Lead Magnets", "Email Nurturing"].map(t => (
                  <span key={t} className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">{t}</span>
                ))}
              </div>
            </Reveal>
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
