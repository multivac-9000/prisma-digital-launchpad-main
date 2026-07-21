import { createFileRoute } from "@tanstack/react-router";
import { buildGraph, webPage, breadcrumb, service } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import { DigitalizacionVisual } from "@/components/nueva/heroVisuals";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  Globe,
  Database,
  GitMerge,
  RefreshCw,
  CheckCircle2,
  CalendarClock,
  QrCode,
  Bot,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Laptop,
  Music,
  Activity,
  Heart,
  TrendingUp,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const CANONICAL_URL = "https://www.prismadigital.io/digitalizacion-de-negocios";

const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Sitios Web Profesionales y Digitalización de Negocios — Prisma Digital",
    description:
      "Creamos tu sitio web profesional con las herramientas de marketing y medición conectadas, integrado a tu stock, tus ventas y tus clientes. Digitaliza tu negocio físico sin partir de cero.",
    image: "https://prismadigital.io/og/og-digitalizacion.png",
    withBreadcrumb: true,
  }),
  breadcrumb(CANONICAL_URL, "Digitalización de Negocios"),
  service({
    url: CANONICAL_URL,
    serviceType: "Digitalización de negocios",
    name: "Digitalización de negocios y sitios web profesionales",
    description:
      "Sitio web profesional hecho para vender, integrado a stock, ventas y clientes, con la medición ya conectada.",
    offers: [
      "Diseño y desarrollo de sitios web profesionales",
      "Integración de stock e inventario online y en tienda",
      "Automatización de ventas y procesos",
      "CRM: centralización de clientes",
    ],
  }),
);

export const Route = createFileRoute("/digitalizacion-de-negocios")({
  head: () => ({
    meta: [
      { title: "Sitios Web Hechos para Vender — Prisma Digital" },
      {
        name: "description",
        content:
          "Creamos tu sitio web profesional listo para vender, conectado a tu stock, ventas y clientes y con la medición integrada. Digitaliza tu negocio físico.",
      },
      {
        property: "og:title",
        content: "Sitios Web Hechos para Vender — Prisma Digital",
      },
      {
        property: "og:description",
        content:
          "Sitios web hechos para vender, con stock y clientes conectados.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://prismadigital.io/og/og-digitalizacion.png" },
      { property: "og:image:secure_url", content: "https://prismadigital.io/og/og-digitalizacion.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1200" },
      {
        property: "og:image:alt",
        content:
          "Digitalización de negocios en Prisma Digital: sitios web profesionales integrados a stock, ventas y clientes.",
      },
      {
        name: "twitter:title",
        content: "Sitios Web Hechos para Vender — Prisma Digital",
      },
      {
        name: "twitter:description",
        content:
          "Sitios web hechos para vender, con stock y clientes conectados.",
      },
      { name: "twitter:image", content: "https://prismadigital.io/og/og-digitalizacion.png" },
      {
        name: "twitter:image:alt",
        content:
          "Digitalización de negocios: sitio web profesional que vende, conectado a stock, ventas y clientes.",
      },
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

interface RealProject {
  name: string;
  category: string;
  headline: string;
  desc: string;
  url: string;
  tags: string[];
  logoType: "image" | "text";
  logoAsset?: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  mockupType: "ecommerce" | "community" | "corporate" | "music" | "beauty" | "medical" | "ai" | "marketing";
  portfolioImage: string;
}

const realProjects: RealProject[] = [
  {
    name: "Prisma Digital",
    category: "AGENCIA & CRECIMIENTO",
    url: "https://www.prismadigital.io",
    headline: "Tu negocio existe. Tus clientes, todavía no lo saben.",
    desc: "Nuestra propia plataforma: un ecosistema digital de alta conversión integrado con analítica avanzada, embudos de venta y agendamiento automático.",
    tags: ["React / Vite", "Analytics", "Brevo CRM", "Performance"],
    logoType: "image",
    logoAsset: "/Logo Prisma Digital blanco.webp",
    bgColor: "from-[#000139] to-[#04143a]",
    textColor: "text-white",
    accentColor: "#32d6ff",
    mockupType: "corporate",
    portfolioImage: "/portfolio/Prisma digital.webp"
  },
  {
    name: "Ecstatic Dance Chile",
    category: "COMUNIDAD & BIENESTAR",
    url: "https://www.ecstaticdancechile.cl",
    headline: "Convierte tu pasión por la música en sanación profesional.",
    desc: "Plataforma de baile consciente con pasarela de pago para tickets, inscripciones online automatizadas y panel de miembros.",
    tags: ["Event Ticketing", "Automated Email", "Framer Motion", "Vite"],
    logoType: "image",
    logoAsset: "/clients/ecstatic-dance-chile.png",
    bgColor: "from-[#140526] to-[#2d0b4e]",
    textColor: "text-white",
    accentColor: "#d713f9",
    mockupType: "community",
    portfolioImage: "/portfolio/Ecstatic Dance Chile.webp"
  },
  {
    name: "Sadhana Core",
    category: "BIENESTAR CORPORATIVO",
    url: "https://servicios.sadhanacore.com/",
    headline: "Transforma el bienestar y la productividad de tu equipo.",
    desc: "Sitio corporativo B2B para la venta de programas de bienestar laboral y pausas activas, con diagnóstico digital interactivo.",
    tags: ["B2B Landing", "Diagnostics tool", "Tailored UI", "SEO Sence"],
    logoType: "image",
    logoAsset: "/clients/sadhana-core.png",
    bgColor: "from-[#fafaff] to-[#f3f0ff]",
    textColor: "text-slate-800",
    accentColor: "#4f46e5",
    mockupType: "corporate",
    portfolioImage: "/portfolio/Sadhana Core.webp"
  },
  {
    name: "Rassayana",
    category: "ARTISTA & DJ",
    url: "https://www.rassayana.com",
    headline: "Música de alta frecuencia para el movimiento libre.",
    desc: "Portafolio artístico de DJ y productor con reproductor de música integrado, galería de eventos y reservas para sesiones.",
    tags: ["Audio Player", "Event Booking", "Visual Gallery", "Tailwind CSS"],
    logoType: "text",
    bgColor: "from-[#080808] to-[#121212]",
    textColor: "text-white",
    accentColor: "#fecd2b",
    mockupType: "music",
    portfolioImage: "/portfolio/Rassayana.webp"
  },
  {
    name: "Mundo Deco Store",
    category: "DECORACIÓN & HOGAR",
    url: "https://www.mundodecostore.cl",
    headline: "Ambientamos tus espacios con iluminación y calor.",
    desc: "Tienda online de decoración y climatización integrada con inventario de tienda física, pasarela de pago local y logística automatizada.",
    tags: ["Shopify Store", "Inventory Sync", "Local Payments", "Facebook Pixel"],
    logoType: "image",
    logoAsset: "/clients/mundodecostore.png",
    bgColor: "from-[#faf6f0] to-[#f4ebe1]",
    textColor: "text-stone-800",
    accentColor: "#d97706",
    mockupType: "ecommerce",
    portfolioImage: "/portfolio/Mundo Deco Store.webp"
  },
  {
    name: "Lolalash",
    category: "ESTÉTICA & RESERVAS",
    url: "https://www.lolalash.cl",
    headline: "Luce, repara y densifica tu mirada.",
    desc: "Sitio de salón de belleza líder en estética de mirada, integrado con agenda en tiempo real, venta de productos propios y sucursales.",
    tags: ["Booking System", "E-commerce", "Multi-Branch", "Instagram Feed"],
    logoType: "text",
    bgColor: "from-[#fffbfb] to-[#fff3f3]",
    textColor: "text-pink-950",
    accentColor: "#ec4899",
    mockupType: "beauty",
    portfolioImage: "/portfolio/Lola Lash.webp"
  },
  {
    name: "Ecstatic LAB",
    category: "EVENTOS CONSCIENTES",
    url: "https://ecstaticlab.rassayana.com/",
    headline: "Laboratorio extático: suelta el estrés y recupera tu energía.",
    desc: "Página de venta y conversión para las experiencias de liberación y baile de Rassayana, con pasarela de venta de tickets integrada.",
    tags: ["Conversion Focus", "Ticket Sales", "Mobile Optimized", "Fast Checkout"],
    logoType: "text",
    bgColor: "from-[#0d021c] to-[#1a0536]",
    textColor: "text-white",
    accentColor: "#fd3833",
    mockupType: "community",
    portfolioImage: "/portfolio/Ecstatic LAB.webp"
  },
  {
    name: "Quality Clicks",
    category: "PERFORMANCE MARKETING",
    url: "https://www.qualityclicks.cl",
    headline: "Campañas PPC que impulsan un crecimiento real.",
    desc: "Sitio web de agencia de performance marketing enfocado en la conversión, generación de leads calificados y reportería automatizada.",
    tags: ["Lead Generation", "Google Partner", "Auditing Tools", "Analytics Panel"],
    logoType: "text",
    bgColor: "from-[#091535] to-[#040b21]",
    textColor: "text-white",
    accentColor: "#32d6ff",
    mockupType: "marketing",
    portfolioImage: "/portfolio/Qualiti Clicks.webp"
  },
  {
    name: "Emporio Nacional",
    category: "TIENDA GOURMET B2C/B2B",
    url: "https://www.emporionacional.cl",
    headline: "Regalos con historia y productos gourmet para toda ocasión.",
    desc: "Histórico e-commerce gourmet chileno con catálogo de cientos de productos, sistema de canastas personalizadas y despacho corporativo.",
    tags: ["WooCommerce", "Corporate Gifting", "Custom Builder", "Shipping API"],
    logoType: "image",
    logoAsset: "/clients/emporio-nacional.png",
    bgColor: "from-[#fbf9f5] to-[#f4eee1]",
    textColor: "text-amber-950",
    accentColor: "#b91c1c",
    mockupType: "ecommerce",
    portfolioImage: "/portfolio/Emporio Nacional.webp"
  },
  {
    name: "Adalia",
    category: "INTELIGENCIA ARTIFICIAL",
    url: "https://www.adalia.app",
    headline: "Adopta IA con dirección y estrategia, no por moda.",
    desc: "Plataforma interactiva para diagnosticar la madurez digital y de IA en empresas, generando reportes de madurez y roadmaps personalizados.",
    tags: ["AI Assessment", "Interactive UI", "Data Visualization", "PDF Report Gen"],
    logoType: "text",
    bgColor: "from-[#fafafa] to-[#f4f4f5]",
    textColor: "text-zinc-950",
    accentColor: "#18181b",
    mockupType: "ai",
    portfolioImage: "/portfolio/Adalia.webp"
  },
  {
    name: "Dr. Marco Schulz",
    category: "MEDICINA BARIÁTRICA",
    url: "https://www.drmarcoschulz.cl",
    headline: "Cirujano Bariátrico: Tu oportunidad de volver a empezar.",
    desc: "Sitio médico enfocado en generar confianza y agendar evaluaciones para cirugía bariátrica, con testimonios y calculadoras de IMC.",
    tags: ["Medical SEO", "Trust Indicators", "BMI Calculator", "WhatsApp Chat"],
    logoType: "image",
    logoAsset: "/clients/logo Marco schulzs.png",
    bgColor: "from-[#f0f9ff] to-[#e0f2fe]",
    textColor: "text-sky-950",
    accentColor: "#0284c7",
    mockupType: "medical",
    portfolioImage: "/portfolio/Dr. MArco Schulz.webp"
  },
  {
    name: "El Director Clínica Dental",
    category: "ESTÉTICA ODONTOLÓGICA",
    url: "https://www.eldirectorclinicadental.com",
    headline: "Implantes dentales y estética con tecnología digital.",
    desc: "Página web de clínica odontológica de alta gama que destaca tratamientos digitales de vanguardia, diseño de sonrisa y reservas integradas.",
    tags: ["High-End Design", "Smile Gallery", "Doctor Profile", "Online Booking"],
    logoType: "text",
    bgColor: "from-[#0a122c] to-[#040817]",
    textColor: "text-white",
    accentColor: "#eab308",
    mockupType: "medical",
    portfolioImage: "/portfolio/Clinica El Director.webp"
  }
];

interface LaptopMockupProps {
  name: string;
  url: string;
  headline: string;
  logoType: "image" | "text";
  logoAsset?: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  mockupType: "ecommerce" | "community" | "corporate" | "music" | "beauty" | "medical" | "ai" | "marketing";
}

function LaptopMockup({
  name,
  url,
  headline,
  logoType,
  logoAsset,
  bgColor,
  textColor,
  accentColor,
  mockupType,
}: LaptopMockupProps) {
  const shortUrl = url.replace("https://www.", "").replace("https://", "");
  
  return (
    <div className="w-full select-none">
      {/* Screen Frame */}
      <div className="relative rounded-t-2xl bg-[#2e3033] p-1.5 shadow-2xl border border-white/5">
        {/* Webcam */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#151617]" />
        
        {/* Inner Screen Area */}
        <div className={`relative aspect-[16/10] w-full rounded-md overflow-hidden bg-gradient-to-br ${bgColor} ${textColor} flex flex-col p-2.5 transition-transform duration-500`}>
          {/* Browser Address Bar */}
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md rounded px-1.5 py-0.5 mb-1.5 text-[7px] border border-white/10">
            {/* Window control dots */}
            <div className="flex gap-0.5 shrink-0">
              <span className="w-1 h-1 rounded-full bg-red-500/80" />
              <span className="w-1 h-1 rounded-full bg-yellow-500/80" />
              <span className="w-1 h-1 rounded-full bg-green-500/80" />
            </div>
            {/* URL input field */}
            <div className="flex-1 text-center font-mono opacity-80 truncate px-1">
              {shortUrl}
            </div>
          </div>

          {/* Navigation Bar inside site */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5 select-none">
            {logoType === "image" && logoAsset ? (
              <img src={logoAsset} alt={name} className="h-3 object-contain max-w-[50px] brightness-100 filter" />
            ) : (
              <span className="text-[8px] font-black tracking-tight uppercase" style={{ color: accentColor }}>
                {name.split(" ")[0]}
              </span>
            )}
            <div className="flex gap-1">
              <span className="w-2.5 h-0.5 bg-current opacity-30 rounded-full" />
              <span className="w-2.5 h-0.5 bg-current opacity-30 rounded-full" />
              <span className="w-2.5 h-0.5 bg-current opacity-30 rounded-full" />
            </div>
          </div>

          {/* Screen Content Hero area */}
          <div className="flex-1 flex gap-1.5 items-center select-none overflow-hidden">
            {/* Headline and text */}
            <div className="flex-1 text-left flex flex-col justify-center min-w-0">
              <h4 className="text-[7.5px] font-extrabold leading-[1.25] text-balance mb-0.5 line-clamp-3">
                {headline}
              </h4>
              <p className="text-[5.5px] opacity-75 leading-tight mb-1.5 line-clamp-2">
                Digitalización del ecosistema de negocio para impulsar conversiones y optimizar operaciones.
              </p>
              <div>
                <span className="inline-block text-[5.5px] font-bold px-1.5 py-0.5 rounded shadow-sm select-none" style={{ backgroundColor: accentColor, color: textColor.includes("white") ? "#000139" : "#ffffff" }}>
                  Ver Sitio
                </span>
              </div>
            </div>

            {/* Visual elements on the right of the screen */}
            <div className="w-[38%] h-full shrink-0 flex items-center justify-center relative">
              {mockupType === "ecommerce" && (
                <div className="w-full bg-white/5 rounded border border-white/10 p-0.5 flex flex-col gap-0.5 items-center">
                  <div className="w-full aspect-square bg-white/10 rounded flex items-center justify-center">
                    <QrCode className="w-4 h-4 opacity-40" />
                  </div>
                  <div className="w-full h-0.5 bg-white/20 rounded" />
                  <div className="w-2/3 h-0.5 bg-white/10 rounded self-start" />
                  <div className="w-1/2 h-1 rounded self-start" style={{ backgroundColor: accentColor }} />
                </div>
              )}

              {mockupType === "corporate" && (
                <div className="w-full flex flex-col gap-0.5 p-0.5 bg-white/5 rounded border border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-[4px] opacity-60">Metas ROI</span>
                    <TrendingUp className="w-2 h-2" style={{ color: accentColor }} />
                  </div>
                  <div className="h-5 w-full flex items-end gap-0.5 px-0.5">
                    <div className="w-full h-[30%] bg-white/20 rounded-t" />
                    <div className="w-full h-[55%] bg-white/20 rounded-t" />
                    <div className="w-full h-[80%] rounded-t animate-pulse" style={{ backgroundColor: accentColor }} />
                  </div>
                </div>
              )}

              {mockupType === "community" && (
                <div className="w-full flex flex-col gap-0.5 p-0.5 bg-white/5 rounded border border-white/10 items-center justify-center">
                  <Sparkles className="w-4 h-4 animate-pulse" style={{ color: accentColor }} />
                  <span className="text-[4.5px] font-semibold text-center leading-none mt-0.5">Conexión</span>
                </div>
              )}

              {mockupType === "music" && (
                <div className="w-full flex flex-col gap-0.5 p-0.5 bg-white/5 rounded border border-white/10 items-center">
                  <div className="w-5 h-5 rounded-full border border-dashed border-white/25 flex items-center justify-center animate-spin" style={{ animationDuration: "12s" }}>
                    <Music className="w-2 h-2" style={{ color: accentColor }} />
                  </div>
                  <div className="w-full flex gap-0.5 justify-center items-center h-1.5 mt-0.5">
                    <span className="w-0.5 h-1 bg-white/40 rounded-full animate-bounce" />
                    <span className="w-0.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                    <span className="w-0.5 h-1.2 bg-white/55 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                  </div>
                </div>
              )}

              {mockupType === "beauty" && (
                <div className="w-full flex flex-col gap-0.5 p-0.5 bg-white/5 rounded border border-white/10 items-center justify-center text-center">
                  <Heart className="w-4 h-4 animate-pulse" style={{ color: accentColor }} />
                  <span className="text-[4px] uppercase tracking-wider font-bold">Estética</span>
                </div>
              )}

              {mockupType === "medical" && (
                <div className="w-full flex flex-col gap-0.5 p-0.5 bg-white/5 rounded border border-white/10">
                  <span className="text-[4px] opacity-75 font-semibold">Agenda</span>
                  <div className="grid grid-cols-3 gap-0.5 mt-0.5">
                    {[1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="aspect-square rounded-[1px] flex items-center justify-center text-[3.5px]"
                        style={{
                          backgroundColor: i === 2 ? accentColor : "rgba(255,255,255,0.1)",
                          color: i === 2 ? "#fff" : "inherit",
                        }}
                      >
                        {i + 12}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {mockupType === "ai" && (
                <div className="w-full flex flex-col gap-0.5 p-0.5 bg-white/5 rounded border border-white/10 items-center justify-center text-center">
                  <Bot className="w-4 h-4" style={{ color: accentColor }} />
                  <div className="w-full h-0.5 bg-white/20 rounded mt-0.5" />
                  <div className="w-3/4 h-0.5 bg-white/15 rounded mt-0.5" />
                </div>
              )}

              {mockupType === "marketing" && (
                <div className="w-full flex flex-col gap-0.5 p-0.5 bg-white/5 rounded border border-white/10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-0.5">
                    <span className="text-[3px] opacity-60">Leads</span>
                    <span className="text-[4px] font-black text-green-400">+120%</span>
                  </div>
                  <div className="flex items-center gap-0.5 mt-0.5">
                    <Activity className="w-2.5 h-2.5 shrink-0" style={{ color: accentColor }} />
                    <div className="flex-1 flex flex-col gap-0.5">
                      <div className="w-full h-0.5 bg-white/20 rounded" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Keyboard deck / base */}
      <div className="relative h-1.5 bg-[#d2d4d9] rounded-b-xl shadow-lg border-t border-[#ebedf2] flex justify-center">
        {/* Notch */}
        <div className="w-8 h-0.5 bg-[#b0b2b8] rounded-b" />
      </div>
    </div>
  );
}

/* PortfolioCarousel: componente cliente puro para evitar hydration mismatch (React #418).
   Todo el estado interactivo vive aquí; el servidor lo renderiza sin estado de scroll. */
function PortfolioCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  // SSR-safe: ambos parten en false para que el HTML del servidor sea idéntico al cliente.
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
    const cardWidth = el.querySelector(".portfolio-card")?.getBoundingClientRect().width || 1;
    const currentIdx = Math.round(el.scrollLeft / (cardWidth + 32));
    setActiveIdx(currentIdx);
  }, []);

  useEffect(() => {
    setMounted(true);
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".portfolio-card");
    const amount = card ? card.getBoundingClientRect().width + 32 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className="relative mt-16 px-4 md:px-8">
      <div
        ref={trackRef}
        className="nl-noscrollbar flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4"
        style={{ scrollBehavior: "smooth" }}
      >
        {realProjects.map((project, i) => (
          <Reveal
            key={project.name}
            as="article"
            variant="scale"
            delay={(i % 3) * 80}
            className="portfolio-card shrink-0 w-[90%] sm:w-[70%] md:w-[48%] lg:w-[31.5%] snap-center rounded-3xl overflow-hidden border border-white/10 bg-white/[0.03] shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              {/* Portfolio Screenshot */}
              <div className="bg-white/[0.01] border-b border-white/5 overflow-hidden">
                <img
                  src={project.portfolioImage}
                  alt={`Sitio web de ${project.name}`}
                  className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Metadata Content */}
              <div className="p-7 pb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-[10px] font-bold text-white/90 mb-3 tracking-wider uppercase">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-2 transition-colors">
                  {project.name}
                </h3>
                <p className="text-white/70 leading-relaxed text-sm mb-4 line-clamp-3">
                  {project.desc}
                </p>
              </div>
            </div>

            <div className="p-7 pt-0">
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/5 border border-white/5 px-2.5 py-0.5 text-xs text-white/60 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 text-white font-bold text-sm w-full py-3 transition-all select-none hover:shadow-lg focus:ring-2 focus:ring-prisma-cyan/50 outline-none"
              >
                <span>Visitar Sitio Web</span>
                <ExternalLink className="w-4 h-4 text-white/80" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Desktop Navigation Arrows — solo visibles post-mount para evitar SSR diff */}
      {mounted && (
        <>
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canLeft}
            aria-label="Anteriores proyectos"
            className="hidden md:flex absolute left-0 top-[35%] -translate-y-1/2 -translate-x-6 h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#000139]/80 backdrop-blur-md text-white shadow-lg transition-all hover:scale-105 hover:bg-[#000139] disabled:opacity-0 disabled:pointer-events-none hover:border-white/20"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canRight}
            aria-label="Más proyectos"
            className="hidden md:flex absolute right-0 top-[35%] -translate-y-1/2 translate-x-6 h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#000139]/80 backdrop-blur-md text-white shadow-lg transition-all hover:scale-105 hover:bg-[#000139] disabled:opacity-0 disabled:pointer-events-none hover:border-white/20"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 mt-6">
        {realProjects.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              const el = trackRef.current;
              if (!el) return;
              const card = el.querySelector(".portfolio-card");
              const cardWidth = card?.getBoundingClientRect().width || 1;
              el.scrollTo({ left: idx * (cardWidth + 32), behavior: "smooth" });
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIdx === idx ? "w-8 bg-prisma-cyan" : "w-1.5 bg-white/20"
            }`}
            aria-label={`Ir al proyecto ${idx + 1}`}
          />
        ))}
      </div>

      <p className="mt-8 text-center text-xs text-white/50 md:hidden" aria-hidden="true">
        Desliza para ver más proyectos →
      </p>
    </div>
  );
}

function DigitalizacionPage() {

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

      {/* Portafolio de Sitios Web y Apps (Carrusel de 12 Proyectos Reales) */}
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

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-prisma-cyan mb-4 block">Portafolio Digital</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Sitios web y sistemas <span className="nl-text-gradient">reales e integrados</span>
            </h2>
            <p className="mt-5 text-white/75 text-base md:text-lg max-w-2xl mx-auto">
              No entregamos una página bonita y nos vamos. Cada sitio que construimos nace conectado a las ventas, al stock y a las herramientas de marketing de nuestros clientes — para que trabaje por el negocio desde el primer día.
            </p>
            <div className="nl-underline mx-auto mt-6" aria-hidden="true" />
          </Reveal>

          {/* Carrusel de Proyectos — delegado a componente cliente puro */}
          <PortfolioCarousel />

          <Reveal variant="up" delay={200} className="mt-16 text-center">
            <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
              ¿Listo para dar el salto? Todos estos proyectos fueron diseñados a medida, se cargan en menos de un segundo y están plenamente integrados a las operaciones reales de sus negocios.
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
