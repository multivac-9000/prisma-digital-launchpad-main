import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  MessageCircle,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  Globe,
  Megaphone,
  Gauge,
} from "lucide-react";
import { buildGraph, webPage, breadcrumb } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import ContactoForm from "@/components/nueva/ContactoForm";
import { ScrollProgress, Reveal, useMagnetic } from "@/components/nueva/scrolly";

const CANONICAL_URL = "https://www.prismadigital.io/contacto";
const MEET_URL = "https://meet.brevo.com/prisma-digital";
const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=56957151303&text=Hola+equipo+Prisma+Digital%21%2C+quiero+saber+m%C3%A1s+de+sus+servicios.&type=phone_number&app_absent=0";

const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Contacto — Prisma Digital",
    description:
      "Escríbenos y te respondemos con una primera lectura de tu situación digital. O agenda directo tu diagnóstico gratis.",
    image: "https://prismadigital.io/og/og-home.png",
    withBreadcrumb: true,
  }),
  breadcrumb(CANONICAL_URL, "Contacto"),
);

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Prisma Digital" },
      {
        name: "description",
        content:
          "Hablemos de tu próximo salto digital. Escríbenos o agenda tu diagnóstico gratis: te respondemos con datos, no con promesas.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contacto — Prisma Digital" },
      {
        property: "og:description",
        content:
          "Hablemos de tu próximo salto digital. Escríbenos o agenda tu diagnóstico gratis.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://prismadigital.io/og/og-home.png" },
      { property: "og:image:secure_url", content: "https://prismadigital.io/og/og-home.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1200" },
      {
        property: "og:image:alt",
        content: "Prisma Digital — agencia de crecimiento digital basada en datos.",
      },
      { name: "twitter:title", content: "Contacto — Prisma Digital" },
      {
        name: "twitter:description",
        content: "Hablemos de tu próximo salto digital. Escríbenos o agenda tu diagnóstico gratis.",
      },
      { name: "twitter:image", content: "https://prismadigital.io/og/og-home.png" },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      { rel: "preconnect", href: "https://sibforms.com" },
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: ContactoPage,
});

const contactItems = [
  {
    icon: Mail,
    label: "Escríbenos",
    value: "prismadigital.io@gmail.com",
    href: "mailto:prismadigital.io@gmail.com",
    accent: "text-prisma-magenta",
    external: false,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+56 9 5715 1303",
    href: WHATSAPP_URL,
    accent: "text-prisma-cyan",
    external: true,
  },
  {
    icon: MapPin,
    label: "Dónde estamos",
    value: "Concepción, Chile · Atendemos todo Chile y Latam",
    href: null,
    accent: "text-prisma-magenta",
    external: false,
  },
];

const serviceLinks = [
  {
    icon: Globe,
    label: "Digitalización",
    desc: "Sitios web hechos para vender",
    href: "/digitalizacion-de-negocios",
    accent: "text-prisma-cyan",
  },
  {
    icon: Megaphone,
    label: "Promoción",
    desc: "Captación predecible y medible",
    href: "/promocion-de-negocios",
    accent: "text-prisma-magenta",
  },
  {
    icon: Gauge,
    label: "Optimización",
    desc: "Mide lo que importa, baja tu CPA",
    href: "/optimizacion-de-negocios",
    accent: "text-prisma-red",
  },
];

const tickerItems = [
  "Respuesta en menos de 24 horas hábiles",
  "Atendemos Chile y Latam",
  "Diagnóstico 100% gratis",
  "Con datos, no con suposiciones",
];

/* Franja de movimiento continuo: llena el ancho y refuerza mensajes clave
   sin competir con los CTA. Mismo patrón de marquee que el ticker del hero. */
function TrustTicker() {
  return (
    <div
      className="nl-ticker nl-marquee-pause relative mt-10 border-y border-white/10 bg-white/[0.04] backdrop-blur-sm overflow-hidden"
      aria-label="Por qué escribirnos"
    >
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#000139] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#000139] to-transparent z-10" />
      <div className="flex w-max animate-marquee items-center py-3">
        {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="nl-tabular flex items-center gap-2 mx-7 text-sm font-semibold text-white/75 whitespace-nowrap"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-prisma-cyan" aria-hidden="true" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Prisma de vidrio que refracta un rayo de luz blanca y lo dispersa en el
   arcoíris — el ícono clásico del prisma (tipo "Dark Side of the Moon"),
   glassy y animado. Cuenta la marca de forma literal pero elegante: la luz
   blanca entra, atraviesa el prisma y sale convertida en el espectro.
   ⚠️ Los colores del espectro incluyen amarillo porque es luz dispersada, no
   un CTA. El amarillo sigue siendo exclusivo del CTA de agenda en el resto
   del sitio (verificado). Decisión del cliente, 2026-07-23.
   Movimiento (todo transform/opacity, se apaga con prefers-reduced-motion):
   el prisma flota suave, un pulso de luz viaja por el rayo entrante, el punto
   de refracción late y cada color del arcoíris titila en su propio ritmo. */

// Punto de salida (donde convergen los rayos), sobre la cara derecha del prisma.
const EXIT = { x: 208, y: 175 };
const rad = (deg: number) => (deg * Math.PI) / 180;
const tip = (deg: number, r: number) => ({
  x: +(EXIT.x + r * Math.cos(rad(deg))).toFixed(1),
  y: +(EXIT.y + r * Math.sin(rad(deg))).toFixed(1),
});

// Los 4 rayos del logo de Prisma, con los ángulos MEDIDOS del isotipo real
// (public/logo.png): abanico hacia arriba-derecha, rojo el más empinado →
// morado el más tendido. Solo los 4 colores de la marca (rojo, amarillo,
// celeste, morado) — nada de arcoíris inventado. Grados negativos = hacia
// arriba en coordenadas SVG.
const RAYS = [
  { deg: -58, len: 150, color: "#fd3833", dur: "3.4s", delay: "0s" }, // rojo
  { deg: -50, len: 172, color: "#fecd2b", dur: "3.0s", delay: "-0.5s" }, // amarillo
  { deg: -43, len: 162, color: "#32d6ff", dur: "3.7s", delay: "-1.1s" }, // celeste
  { deg: -36, len: 166, color: "#d713f9", dur: "3.2s", delay: "-1.6s" }, // morado
];
const bandTop = tip(-61, 150);
const bandBottom = tip(-33, 152);

function ContactoVisual() {
  return (
    <div className="relative hidden lg:flex items-center justify-center h-full min-h-[360px]" aria-hidden="true">
      <svg viewBox="0 0 400 380" className="relative w-full max-w-[400px] overflow-visible">
        <defs>
          {/* Cara frontal del prisma: sheen de vidrio */}
          <linearGradient id="prism-front" x1="0.15" y1="0" x2="0.7" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="0.45" stopColor="#bcd4ff" stopOpacity="0.14" />
            <stop offset="1" stopColor="#32d6ff" stopOpacity="0.06" />
          </linearGradient>
          {/* Cara lateral (profundidad 3D): más densa y fría */}
          <linearGradient id="prism-side" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8fb4ff" stopOpacity="0.22" />
            <stop offset="1" stopColor="#1b2b6b" stopOpacity="0.16" />
          </linearGradient>
          {/* Halo del abanico: solo los 4 colores de marca */}
          <linearGradient
            id="brand-band"
            gradientUnits="userSpaceOnUse"
            x1={bandTop.x}
            y1={bandTop.y}
            x2={bandBottom.x}
            y2={bandBottom.y}
          >
            <stop offset="0" stopColor="#fd3833" />
            <stop offset="0.34" stopColor="#fecd2b" />
            <stop offset="0.66" stopColor="#32d6ff" />
            <stop offset="1" stopColor="#d713f9" />
          </linearGradient>
        </defs>

        {/* Todo flota como un bloque (rayos anclados al prisma) */}
        <g className="nl-hv-float">
          {/* Rayo de luz blanca entrando por la cara izquierda */}
          <line
            x1="6"
            y1="225"
            x2="126"
            y2="225"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeOpacity="0.7"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}
          />

          {/* --- Prisma 3D (triángulo extruido hacia arriba-derecha) --- */}
          {/* Cara trasera (tenue, da volumen) */}
          <polygon points="195,111 110,276 280,276" fill="none" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Cara inferior (profundidad) */}
          <polygon points="95,285 265,285 280,276 110,276" fill="url(#prism-side)" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="1" />
          {/* Cara lateral derecha (la que más lee como 3D) */}
          <polygon points="180,120 265,285 280,276 195,111" fill="url(#prism-side)" stroke="#ffffff" strokeOpacity="0.28" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Cara frontal de vidrio */}
          <polygon
            points="180,120 95,285 265,285"
            fill="url(#prism-front)"
            stroke="#ffffff"
            strokeOpacity="0.9"
            strokeWidth="3"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 22px rgba(130,180,255,0.4))" }}
          />
          {/* Reflejos internos (vidrio) */}
          <line x1="176" y1="130" x2="120" y2="245" stroke="white" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
          <line x1="188" y1="128" x2="240" y2="230" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" strokeLinecap="round" />
          {/* Segmento blanco refractado dentro del vidrio hacia el punto de salida */}
          <line x1="126" y1="225" x2={EXIT.x} y2={EXIT.y} stroke="white" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />

          {/* Halo suave del abanico (cono difuminado) */}
          <path
            d={`M ${EXIT.x},${EXIT.y} L ${bandTop.x},${bandTop.y} L ${bandBottom.x},${bandBottom.y} Z`}
            fill="url(#brand-band)"
            opacity="0.45"
            style={{ filter: "blur(10px)" }}
          />

          {/* Los 4 rayos nítidos con los ángulos del logo, titilando */}
          {RAYS.map((r) => {
            const end = tip(r.deg, r.len);
            return (
              <line
                key={r.color}
                x1={EXIT.x}
                y1={EXIT.y}
                x2={end.x}
                y2={end.y}
                stroke={r.color}
                strokeWidth="4"
                strokeLinecap="round"
                className="nl-prism-shimmer"
                style={{
                  filter: `drop-shadow(0 0 7px ${r.color})`,
                  ["--nl-dur" as string]: r.dur,
                  ["--nl-delay" as string]: r.delay,
                }}
              />
            );
          })}

          {/* Pulso de luz que viaja por el rayo blanco entrante */}
          <g className="nl-prism-inbeam">
            <rect x="14" y="222" width="42" height="6" rx="3" fill="white" style={{ filter: "drop-shadow(0 0 8px #ffffff)" }} />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ContactoPage() {
  const agendaRef = useMagnetic<HTMLAnchorElement>(180, 12);

  return (
    <main className="nl-page min-h-screen bg-background">
      <noscript>
        <style>{`.nl-reveal,.nl-word{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />

      <section className="nl-dark relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="nl-grain absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="nl-aura" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          {/* Encabezado: texto + visual animado (llena el espacio en desktop) */}
          <div className="grid items-center gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-prisma-cyan backdrop-blur-sm">
                Hablemos
              </span>
              <h1 className="mt-6 text-4xl md:text-5xl lg:text-[clamp(2.6rem,4.4vw,3.6rem)] font-extrabold text-white leading-[1.08] tracking-tight text-balance">
                Tu próximo salto digital empieza con una conversación
              </h1>
              <p className="mt-6 text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
                Cuéntanos qué necesita tu negocio hoy y te respondemos con una primera lectura
                concreta de tu situación — con datos, no con promesas. ¿Prefieres ir directo al
                grano? Agenda tu diagnóstico gratis.
              </p>
            </div>
            <ContactoVisual />
          </div>

          <Reveal variant="up" delay={80}>
            <TrustTicker />
          </Reveal>

          {/* Dos caminos */}
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
            {/* Columna izquierda: agenda rápida + datos de contacto */}
            <Reveal variant="up" className="flex flex-col gap-8">
              {/* Camino rápido: agendar */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-7 backdrop-blur-sm">
                <h2 className="text-lg md:text-xl font-bold text-white">
                  ¿Ya sabes que quieres avanzar?
                </h2>
                <p className="mt-2 text-sm md:text-base text-white/70 leading-relaxed">
                  Agenda un diagnóstico gratis de 30 minutos. Revisamos tu situación y te
                  mostramos un plan a 90 días — sin compromiso.
                </p>
                <a
                  ref={agendaRef}
                  href={MEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nl-shine group mt-5 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base md:text-lg font-bold text-prisma-navy shadow-xl transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ background: "var(--gradient-agenda)" }}
                >
                  Agenda tu diagnóstico gratis
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>

              {/* Datos de contacto */}
              <div className="flex flex-col gap-1">
                {contactItems.map(({ icon: Icon, label, value, href, accent, external }) => {
                  const inner = (
                    <div className="flex items-start gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.04]">
                      <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                        <Icon className={`h-5 w-5 ${accent}`} aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-white/45">
                          {label}
                        </p>
                        <p className="mt-0.5 text-sm md:text-base font-medium text-white/90 inline-flex items-center gap-1">
                          {value}
                          {href && external && (
                            <ArrowUpRight className="h-3.5 w-3.5 text-white/40" aria-hidden="true" />
                          )}
                        </p>
                      </div>
                    </div>
                  );
                  return href ? (
                    <a
                      key={label}
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={label}>{inner}</div>
                  );
                })}
              </div>

              {/* Los 3 servicios: refuerza la conversación y da salida a quien
                  ya sabe qué necesita (útil también para enlazado interno). */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/45">
                  ¿Por dónde empezamos?
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  {serviceLinks.map(({ icon: Icon, label, desc, href, accent }) => (
                    <a
                      key={href}
                      href={href}
                      className="group flex items-center gap-4 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.05]"
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                        <Icon className={`h-4 w-4 ${accent}`} aria-hidden="true" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-semibold text-white/90">
                          {label}
                        </span>
                        <span className="block text-xs text-white/55">{desc}</span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white/60"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Columna derecha: formulario */}
            <Reveal variant="up" delay={120}>
              <div className="rounded-2xl border border-white/12 bg-white/[0.05] p-6 md:p-8 backdrop-blur-sm shadow-2xl">
                <h2 className="text-xl md:text-2xl font-extrabold text-white">
                  Escríbenos
                </h2>
                <p className="mt-1.5 text-sm text-white/65">
                  Te respondemos en menos de 24 horas hábiles.
                </p>
                <div className="mt-6">
                  <ContactoForm />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
