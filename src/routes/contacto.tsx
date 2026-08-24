import * as React from "react";
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

/* Prisma 3D que refracta el rayo de luz blanca desde su CENTRO.
   - 3D Glassmorphism: Facetas de cristal extruidas, refleja luz, biseles pulidos.
   - Origen en el centro: El haz entrante viaja hasta CENTER = { x: 180, y: 220 }.
   - Rayos ultra-gruesos: Capas múltiples de resplandor neón (15px -> 8px -> 2.5px núcleo blanco).
   - Efecto Parallax 3D interactivo en hover / movimiento de mouse.
   - Emisión de partículas cromáticas y pulso sincrónico en el núcleo. */

const CENTER = { x: 180, y: 220 };
const rad = (deg: number) => (deg * Math.PI) / 180;
const tipFromCenter = (deg: number, len: number) => ({
  x: +(CENTER.x + len * Math.cos(rad(deg))).toFixed(1),
  y: +(CENTER.y + len * Math.sin(rad(deg))).toFixed(1),
});

// Los 4 rayos oficiales con los ángulos del isotipo de Prisma Digital
const RAYS = [
  { deg: -58, len: 195, color: "#fd3833", dur: "3.2s", delay: "0s", name: "rojo" },
  { deg: -50, len: 215, color: "#fecd2b", dur: "3.2s", delay: "-0.1s", name: "amarillo" },
  { deg: -43, len: 210, color: "#32d6ff", dur: "3.2s", delay: "-0.2s", name: "celeste" },
  { deg: -36, len: 205, color: "#d713f9", dur: "3.2s", delay: "-0.3s", name: "morado" },
];

const bandTop = tipFromCenter(-61, 195);
const bandBottom = tipFromCenter(-33, 205);

function ContactoVisual() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: +(py * -14).toFixed(2),
      y: +(px * 18).toFixed(2),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative hidden lg:flex items-center justify-center h-full min-h-[380px] cursor-pointer group"
      style={{ perspective: "1000px" }}
      aria-hidden="true"
    >
      <div
        className="relative w-full max-w-[420px] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`,
          transformStyle: "preserve-3d",
        }}
      >
        <svg viewBox="0 0 440 400" className="relative w-full overflow-visible">
          <defs>
            {/* Gradientes 3D del vidrio */}
            <linearGradient id="prism-front-3d" x1="0.1" y1="0" x2="0.8" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#cbe2ff" stopOpacity="0.22" />
              <stop offset="70%" stopColor="#32d6ff" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#d713f9" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id="prism-side-right" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a3cbff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#1e3a8a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0b132b" stopOpacity="0.4" />
            </linearGradient>

            <linearGradient id="prism-side-bottom" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fb4ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#070a1e" stopOpacity="0.45" />
            </linearGradient>

            {/* Núcleo radial cromático */}
            <radialGradient id="prism-core-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="25%" stopColor="#32d6ff" stopOpacity="0.9" />
              <stop offset="60%" stopColor="#d713f9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fd3833" stopOpacity="0" />
            </radialGradient>

            {/* Aura de los rayos de la marca */}
            <linearGradient
              id="brand-band-3d"
              gradientUnits="userSpaceOnUse"
              x1={bandTop.x}
              y1={bandTop.y}
              x2={bandBottom.x}
              y2={bandBottom.y}
            >
              <stop offset="0%" stopColor="#fd3833" />
              <stop offset="33%" stopColor="#fecd2b" />
              <stop offset="66%" stopColor="#32d6ff" />
              <stop offset="100%" stopColor="#d713f9" />
            </linearGradient>
          </defs>

          {/* Grupo principal flotante con animación parallax */}
          <g className="nl-hv-float">
            {/* Resplandor ambiental de fondo */}
            <ellipse
              cx="220"
              cy="200"
              rx="180"
              ry="140"
              fill="url(#brand-band-3d)"
              opacity="0.18"
              style={{ filter: "blur(35px)" }}
            />

            {/* --- 1. Haz de Luz Blanca Entrante (costado izquierdo) --- */}
            {/* Haz guía exterior */}
            <line
              x1="0"
              y1="201"
              x2="132"
              y2="201"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
              strokeOpacity="0.75"
              style={{ filter: "drop-shadow(0 0 10px #ffffff)" }}
            />
            {/* Trazo interno en el vidrio hasta el CENTRO */}
            <line
              x1="132"
              y1="201"
              x2={CENTER.x}
              y2={CENTER.y}
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="4 4"
              strokeOpacity="0.6"
              style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.9))" }}
            />

            {/* Capsula de fotones blanca viajando hacia el CENTRO */}
            <g>
              <circle
                cx={CENTER.x}
                cy={CENTER.y}
                r="7"
                fill="white"
                className="nl-prism-inbeam-3d"
                style={{ filter: "drop-shadow(0 0 12px #ffffff)" }}
              />
            </g>

            {/* --- 2. Estructura 3D del Prisma de Cristal --- */}

            {/* Cara Trasera (profundidad extruida) */}
            <polygon
              points="198,96 108,266 288,266"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.2"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {/* Aristas de extrusión 3D (conectan frente con fondo) */}
            <line x1="180" y1="110" x2="198" y2="96" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
            <line x1="90" y1="280" x2="108" y2="266" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" />
            <line x1="270" y1="280" x2="288" y2="266" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />

            {/* Faceta Inferior 3D */}
            <polygon
              points="90,280 270,280 288,266 108,266"
              fill="url(#prism-side-bottom)"
              stroke="white"
              strokeOpacity="0.2"
              strokeWidth="1"
            />

            {/* Faceta Lateral Derecha 3D */}
            <polygon
              points="180,110 270,280 288,266 198,96"
              fill="url(#prism-side-right)"
              stroke="white"
              strokeOpacity="0.35"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Reflejos internos de vidrio */}
            <line x1="176" y1="125" x2="120" y2="245" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
            <line x1="185" y1="120" x2="245" y2="235" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />

            {/* --- 3. Halo y Rayos de Colores ULTRA-GRUESOS desde el CENTRO --- */}

            {/* Cono de luz difusa volumétrica que surge del centro */}
            <path
              d={`M ${CENTER.x},${CENTER.y} L ${bandTop.x},${bandTop.y} L ${bandBottom.x},${bandBottom.y} Z`}
              fill="url(#brand-band-3d)"
              opacity="0.5"
              style={{ filter: "blur(18px)" }}
            />

            {/* Renderizado de los 4 Rayos Gruesos originados en CENTER */}
            {RAYS.map((r) => {
              const end = tipFromCenter(r.deg, r.len);
              return (
                <g key={r.name}>
                  {/* Capa 1: Resplandor exterior super-ancho */}
                  <line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={r.color}
                    strokeWidth="18"
                    strokeLinecap="round"
                    opacity="0.35"
                    style={{ filter: `blur(8px)` }}
                  />

                  {/* Capa 2: Haz de luz neón grueso con brillo pulsante */}
                  <line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={r.color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    className="nl-prism-ray-glow"
                    style={{
                      filter: `drop-shadow(0 0 10px ${r.color})`,
                      ["--nl-color" as string]: r.color,
                      ["--nl-dur" as string]: r.dur,
                      ["--nl-delay" as string]: r.delay,
                      ["--nl-sw-base" as string]: "10px",
                      ["--nl-sw-peak" as string]: "15px",
                    }}
                  />

                  {/* Capa 3: Núcleo sólido de color */}
                  <line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={r.color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeOpacity="0.95"
                  />

                  {/* Capa 4: Haz especular blanco central en cada rayo */}
                  <line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeOpacity="0.8"
                  />

                  {/* Capa 5: Onda de fotones viajando hacia afuera */}
                  <line
                    x1={CENTER.x}
                    y1={CENTER.y}
                    x2={end.x}
                    y2={end.y}
                    stroke="#ffffff"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="nl-prism-ray-wave"
                    style={{
                      filter: "drop-shadow(0 0 6px #ffffff)",
                      ["--nl-delay" as string]: r.delay,
                    }}
                  />
                </g>
              );
            })}

            {/* --- 4. Cara Frontal del Prisma de Vidrio (encima de los rayos internos) --- */}
            <polygon
              points="180,110 90,280 270,280"
              fill="url(#prism-front-3d)"
              stroke="#ffffff"
              strokeOpacity="0.9"
              strokeWidth="3"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 26px rgba(130,180,255,0.45))" }}
            />

            {/* Sheen de reflejo que cruza el vidrio */}
            <line
              x1="110"
              y1="240"
              x2="230"
              y2="140"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              className="nl-prism-sheen"
              strokeOpacity="0.4"
            />

            {/* --- 5. Núcleo Central de Ignición Cromática (CENTER) --- */}
            {/* Anillo expansivo de energía cromática */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="18"
              fill="none"
              stroke="url(#brand-band-3d)"
              strokeWidth="2.5"
              className="nl-prism-core-ring"
            />

            {/* Resplandor del núcleo central */}
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="12"
              fill="url(#prism-core-glow)"
              className="nl-prism-core-ignite"
            />
            <circle
              cx={CENTER.x}
              cy={CENTER.y}
              r="4.5"
              fill="#ffffff"
              style={{ filter: "drop-shadow(0 0 10px #ffffff)" }}
            />

            {/* --- 6. Partículas de Dispersión Cromática --- */}
            <circle
              cx="250"
              cy="160"
              r="2"
              fill="#fd3833"
              className="nl-prism-sparkle"
              style={{ ["--dx" as string]: "25px", ["--dy" as string]: "-30px", ["--nl-dur" as string]: "2.8s", ["--nl-delay" as string]: "0s" }}
            />
            <circle
              cx="280"
              cy="140"
              r="2.5"
              fill="#fecd2b"
              className="nl-prism-sparkle"
              style={{ ["--dx" as string]: "30px", ["--dy" as string]: "-20px", ["--nl-dur" as string]: "3.1s", ["--nl-delay" as string]: "-0.6s" }}
            />
            <circle
              cx="300"
              cy="165"
              r="2"
              fill="#32d6ff"
              className="nl-prism-sparkle"
              style={{ ["--dx" as string]: "20px", ["--dy" as string]: "-15px", ["--nl-dur" as string]: "2.6s", ["--nl-delay" as string]: "-1.2s" }}
            />
            <circle
              cx="310"
              cy="190"
              r="2"
              fill="#d713f9"
              className="nl-prism-sparkle"
              style={{ ["--dx" as string]: "35px", ["--dy" as string]: "-10px", ["--nl-dur" as string]: "3.4s", ["--nl-delay" as string]: "-1.8s" }}
            />
          </g>
        </svg>
      </div>
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
