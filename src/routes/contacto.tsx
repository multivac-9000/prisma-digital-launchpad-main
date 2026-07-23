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

// Punto de salida en la cara derecha del prisma, desde donde nace el arcoíris.
const EXIT = { x: 234, y: 186 };
const rad = (deg: number) => (deg * Math.PI) / 180;
const tip = (deg: number, r: number) => ({
  x: +(EXIT.x + r * Math.cos(rad(deg))).toFixed(1),
  y: +(EXIT.y + r * Math.sin(rad(deg))).toFixed(1),
});

// Espectro: rojo (menos desviado, arriba) → magenta (más desviado, abajo),
// como en una dispersión real. Cada rayo titila con su propio ritmo.
const SPECTRUM = [
  { deg: -6, color: "#fd3833", dur: "3.2s", delay: "0s" }, // rojo
  { deg: 2, color: "#ff7a1a", dur: "3.6s", delay: "-0.3s" }, // naranja
  { deg: 10, color: "#fecd2b", dur: "3.0s", delay: "-0.6s" }, // amarillo
  { deg: 18, color: "#3ce07a", dur: "3.8s", delay: "-0.9s" }, // verde
  { deg: 26, color: "#32d6ff", dur: "3.3s", delay: "-1.2s" }, // cian
  { deg: 34, color: "#3d6bff", dur: "3.7s", delay: "-1.5s" }, // azul
  { deg: 42, color: "#d713f9", dur: "3.1s", delay: "-1.8s" }, // magenta
];
const RAY_LEN = 152;
const bandTop = tip(-9, 150);
const bandBottom = tip(46, 150);

function ContactoVisual() {
  return (
    <div className="relative hidden lg:block h-full min-h-[340px]" aria-hidden="true">
      {/* Orbes de ambiente detrás del prisma */}
      <div
        className="nl-prism-orb absolute left-[10%] top-[18%] h-44 w-44 rounded-full blur-[80px]"
        style={{ background: "#d713f9", ["--nl-dur" as string]: "7s" }}
      />
      <div
        className="nl-prism-orb absolute right-[8%] bottom-[14%] h-40 w-40 rounded-full blur-[80px]"
        style={{ background: "#32d6ff", ["--nl-dur" as string]: "6s", ["--nl-delay" as string]: "-2.5s" }}
      />

      <svg viewBox="0 0 400 360" className="relative w-full max-w-[400px] overflow-visible">
        <defs>
          {/* Vidrio del prisma: sheen de arriba a abajo */}
          <linearGradient id="prism-glass" x1="0.2" y1="0" x2="0.7" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
            <stop offset="0.45" stopColor="#bcd4ff" stopOpacity="0.12" />
            <stop offset="1" stopColor="#32d6ff" stopOpacity="0.05" />
          </linearGradient>
          {/* Halo de arcoíris (suave, detrás de los rayos nítidos) */}
          <linearGradient
            id="rainbow-band"
            gradientUnits="userSpaceOnUse"
            x1={bandTop.x}
            y1={bandTop.y}
            x2={bandBottom.x}
            y2={bandBottom.y}
          >
            <stop offset="0" stopColor="#fd3833" />
            <stop offset="0.18" stopColor="#ff7a1a" />
            <stop offset="0.34" stopColor="#fecd2b" />
            <stop offset="0.5" stopColor="#3ce07a" />
            <stop offset="0.66" stopColor="#32d6ff" />
            <stop offset="0.82" stopColor="#3d6bff" />
            <stop offset="1" stopColor="#d713f9" />
          </linearGradient>
        </defs>

        {/* Halo suave del arcoíris (cono difuminado que nace en EXIT) */}
        <path
          d={`M ${EXIT.x},${EXIT.y} L ${bandTop.x},${bandTop.y} L ${bandBottom.x},${bandBottom.y} Z`}
          fill="url(#rainbow-band)"
          opacity="0.5"
          style={{ filter: "blur(11px)" }}
        />

        {/* Rayos nítidos del espectro, titilando escalonados */}
        {SPECTRUM.map((r) => {
          const end = tip(r.deg, RAY_LEN);
          return (
            <line
              key={r.color}
              x1={EXIT.x}
              y1={EXIT.y}
              x2={end.x}
              y2={end.y}
              stroke={r.color}
              strokeWidth="3"
              strokeLinecap="round"
              className="nl-prism-shimmer"
              style={{
                filter: `drop-shadow(0 0 6px ${r.color})`,
                ["--nl-dur" as string]: r.dur,
                ["--nl-delay" as string]: r.delay,
              }}
            />
          );
        })}

        {/* Rayo de luz blanca entrando + su pulso viajero */}
        <line
          x1="8"
          y1="177"
          x2="140"
          y2="177"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.75"
          style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.8))" }}
        />
        <g className="nl-prism-inbeam">
          <rect
            x="18"
            y="174"
            width="40"
            height="6"
            rx="3"
            fill="white"
            style={{ filter: "drop-shadow(0 0 8px #ffffff)" }}
          />
        </g>

        {/* El prisma de vidrio (semi-transparente: el arcoíris se cuela por el
            borde). Flota suave. */}
        <g className="nl-hv-float">
          <polygon
            points="185,92 92,264 278,264"
            fill="url(#prism-glass)"
            stroke="#ffffff"
            strokeOpacity="0.85"
            strokeWidth="2.5"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 20px rgba(130,180,255,0.35))" }}
          />
          {/* Sheen interior en la arista superior-izquierda (efecto vidrio) */}
          <line x1="185" y1="102" x2="112" y2="240" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Segmento refractado dentro del vidrio (blanco → punto de salida) */}
        <line x1="140" y1="177" x2={EXIT.x} y2={EXIT.y} stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />

        {/* Puntos de luz que laten: entrada y salida (refracción) */}
        <circle cx="140" cy="177" r="3.5" fill="white" className="nl-prism-core" style={{ filter: "drop-shadow(0 0 8px #fff)" }} />
        <circle cx={EXIT.x} cy={EXIT.y} r="5" fill="white" className="nl-prism-core" style={{ filter: "drop-shadow(0 0 12px #fff)" }} />
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
