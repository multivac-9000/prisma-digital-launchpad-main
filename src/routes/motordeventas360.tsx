import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal, useMagnetic } from "@/components/nueva/scrolly";
import { MotorVentasVisual } from "@/components/nueva/heroVisuals";
import { trackCta } from "@/components/nueva/track";
import { buildGraph, webPage, breadcrumb, service } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Zap,
  TrendingUp,
  Mail,
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  MessageSquareOff,
  Database,
  CalendarDays,
  Sparkles,
  PhoneCall,
  UserCheck,
  Check,
  BadgePercent,
  SlidersHorizontal,
} from "lucide-react";

const CANONICAL_URL = "https://www.prismadigital.io/motordeventas360";
const MEET_URL = "https://meet.brevo.com/prisma-digital";

const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Motor de Ventas 360 — Sistema Comercial Automatizado para PYMES | Prisma Digital",
    description:
      "Transforma tu publicidad en clientes reales. Integramos Meta Ads directamente a Brevo CRM con respuesta automática por email para PYMES en Chile. Desde $120.000 CLP al mes.",
    image: "https://prismadigital.io/og/og-promocion.png",
    withBreadcrumb: true,
  }),
  breadcrumb(CANONICAL_URL, "Motor de Ventas 360"),
  service({
    url: CANONICAL_URL,
    serviceType: "Sistema Comercial Automatizado y CRM para PYMES",
    name: "Motor de Ventas 360",
    description:
      "Instalación de sistema comercial para PYMES: Meta Ads integrado a Brevo CRM, email automático de bienvenida y optimización mensual.",
    offers: [
      "Integración técnica de Meta Ads con Brevo CRM",
      "Automatización de respuesta inmediata por email",
      "Configuración de embudo comercial y pipeline de ventas",
      "Diseño y optimización continua de campañas publicitarias",
      "Capacitación para dueños y equipos de venta",
    ],
  }),
);

export const Route = createFileRoute("/motordeventas360")({
  head: () => ({
    meta: [
      {
        title: "Motor de Ventas 360 — De Mensajes Desordenados a Ventas | Prisma Digital",
      },
      {
        name: "description",
        content:
          "Instalamos tu Motor de Ventas 360: Meta Ads conectado directo a Brevo CRM con respuesta automática por email. Ordena tus ventas y deja de perder clientes. Desde $120.000 CLP/mes.",
      },
      {
        property: "og:title",
        content: "Motor de Ventas 360 — Sistema Comercial para PYMES Chilenas",
      },
      {
        property: "og:description",
        content:
          "Deja de perder ventas en chats desordenados. Conectamos tus anuncios a un CRM con respuesta automática. Desde $120.000 CLP/mes.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://prismadigital.io/og/og-promocion.png" },
      {
        name: "twitter:title",
        content: "Motor de Ventas 360 — Prisma Digital",
      },
      {
        name: "twitter:description",
        content:
          "Sistema de ventas automatizado para PYMES chilenas: Meta Ads + Brevo CRM + Auto-Email. Agenda tu diagnóstico gratuito.",
      },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: MotorDeVentasPage,
});

/* ============================================================
   DATOS EDITORIALES DE LA LANDING
   ============================================================ */

// 1. Agitación de Dolores (Problema)
const painPoints = [
  {
    icon: MessageSquareOff,
    tag: "Dolor N°1 · Publicidad sin retorno",
    title: "Pagas publicidad pero los clientes te dejan en visto",
    desc: "Inviertes $50.000 o $100.000 CLP en Meta Ads esperando ventas. Te llegan mensajes preguntando «¿precio?» o «¿dónde están?», pero entre que estás atendiendo el negocio y respondes tarde, el cliente ya cotizó en otra parte o simplemente no contesta más. Sientes que estás botando la plata a la basura.",
    stat: "7 de cada 10",
    statLabel: "consultas por chat se enfrían si no respondes en los primeros 10 minutos.",
  },
  {
    icon: Layers,
    tag: "Dolor N°2 · Caos operativo",
    title: "Tus chats de WhatsApp e Instagram son un caos",
    desc: "Decenas de conversaciones mezcladas entre amigos, proveedores y clientes. No tienes idea de a quién le enviaste cotización, quién te prometió transferir hoy ni a quién le debes un seguimiento. Pierdes ventas todas las semanas simplemente por desorden y falta de tiempo.",
    stat: "-40% ventas",
    statLabel: "perdidas solo por no hacer un segundo contacto a tiempo.",
  },
  {
    icon: SlidersHorizontal,
    tag: "Dolor N°3 · Falsa creencia",
    title: "Crees que automatizar ventas es solo para empresas gigantes",
    desc: "Te imaginas que un CRM o un sistema de automatización cuesta millones, requiere un departamento de programadores y meses de capacitación. La verdad es que una PYME chilena bien ordenada puede vender el doble con herramientas simples, accesibles y configuradas a su medida.",
    stat: "$0 en software caro",
    statLabel: "usamos herramientas modernas y económicas que tu equipo domina en 1 día.",
  },
];

// 2. Cómo Funciona en 3 Pasos
const solutionSteps = [
  {
    step: "01",
    phase: "ATRAER",
    title: "Anuncios en Meta Ads directo a clientes que sí compran",
    desc: "No tiramos plata en anuncios bonitos que solo juntan «likes». Diseñamos y configuramos campañas en Instagram y Facebook dirigidas exclusivamente a personas en Chile que tienen el problema que tú resuelves y capacidad de pago.",
    highlights: [
      "Segmentación precisa de clientes ideales en tu zona o en todo Chile",
      "Textos comerciales directos orientados a cotizar, no a mirar",
      "Control de tu inversión para buscar siempre el menor costo por cliente",
    ],
    badgeColor: "border-prisma-cyan/40 bg-prisma-cyan/10 text-prisma-cyan",
  },
  {
    step: "02",
    phase: "CAPTURAR & RESPONDER",
    title: "Respuesta automática inmediata por email en menos de 15 segundos",
    desc: "Cuando un interesado hace clic en tu anuncio, no queda esperando en un chat muerto. Llena un formulario rápido y recibe al instante un correo con tu catálogo, precios, fotos o propuesta comercial. Tu negocio atiende con calidad profesional 24/7.",
    highlights: [
      "El cliente recibe información completa mientras aún tiene interés caliente",
      "Primera impresión impecable que te diferencia de la competencia informal",
      "Filtramos curiosos para que solo dediques tiempo a prospectos calificados",
    ],
    badgeColor: "border-prisma-magenta/40 bg-prisma-magenta/10 text-prisma-magenta",
  },
  {
    step: "03",
    phase: "ORDENAR & CERRAR",
    title: "Todos tus clientes ordenados en Brevo CRM (listos para vender)",
    desc: "Cada persona que interactúa entra automáticamente a un panel visual de ventas muy fácil de usar: Nuevo Prospecto → Información Enviada → Por Llamar → Venta Ganada. Sabes a quién contactar hoy, qué ofrecerle y cuándo hacer el cobro.",
    highlights: [
      "Visualización clara de tu embudo comercial en el celular o computador",
      "Historial de cada cliente con notas, teléfonos y fecha de contacto",
      "Mides cuántos clientes compraste este mes y cuánta plata entró a caja",
    ],
    badgeColor: "border-amber-400/40 bg-amber-400/10 text-amber-300",
  },
];

// 3. Entregables del Servicio
const deliverables = [
  {
    icon: Zap,
    title: "Conexión e Integración Total (Meta Ads + Brevo CRM)",
    desc: "Nos encargamos de toda la configuración técnica. Vinculamos tus páginas de Facebook e Instagram directamente con tu CRM Brevo. Cero códigos para ti.",
  },
  {
    icon: SlidersHorizontal,
    title: "Creación y Gestión de Campañas Mensuales",
    desc: "Redactamos los copies persuasivos, configuramos las audiencias y ponemos a rodar tus campañas en Meta con foco en conseguir clientes reales al menor costo posible.",
  },
  {
    icon: Mail,
    title: "Automatización de Primer Contacto por Email",
    desc: "Diseñamos y programamos la secuencia automática de bienvenida para que cada persona que consulte reciba tu información y precios de inmediato.",
  },
  {
    icon: Layers,
    title: "Diseño de tu Embudo Comercial en Brevo",
    desc: "Configuramos las etapas de venta adaptadas a tu negocio (ej. Contacto inicial, Cotizado, Visita agendada, Pagado) para que nunca más se te pierda una oportunidad.",
  },
  {
    icon: TrendingUp,
    title: "Optimización Mensual Continua",
    desc: "Revisamos semanalmente el rendimiento de los anuncios, pausamos lo que no rinda y potenciamos lo que traiga ventas para cuidar tu presupuesto.",
  },
  {
    icon: UserCheck,
    title: "Capacitación Práctica de 45 Minutos",
    desc: "Te enseñamos a ti o a tu vendedor a usar el CRM en el teléfono o computador de forma tan simple que saldrán operando el mismo día sin dudas.",
  },
  {
    icon: PhoneCall,
    title: "Soporte Directo por WhatsApp con tu Consultor",
    desc: "No hablamos con tickets lentos. Tienes un canal directo de WhatsApp con nosotros para resolver preguntas, actualizar promociones o ajustar textos.",
  },
];

// 4. Testimonios
const testimonials = [
  {
    quote:
      "Gastaba $80.000 mensuales en publicidad de Instagram y me llegaban puros mensajes de curiosos pidiendo precio que después no contestaban. Con el Motor 360, el correo automático les manda nuestra lista de precios y condiciones al tiro. Ahora solo hablamos con gente lista para comprar. Cerramos 4 proyectos en las primeras dos semanas.",
    author: "Felipe Soto",
    role: "Dueño de ClimaSur Ingeniería & Servicios",
    location: "Concepción, Chile",
    tag: "Servicios Técnicos",
    highlight: "+180% ventas efectivas",
  },
  {
    quote:
      "Teníamos un desorden tremendo en WhatsApp con dos vendedoras respondiendo a la vez y pisándose los clientes. Brevo nos cambió la vida: cada cotización tiene su tarjeta, sabemos quién debe llamar a quién y no se nos cae ninguna venta. El servicio de Prisma se pagó solo con el primer cliente grande.",
    author: "Macarena Valenzuela",
    role: "Fundadora de MV Dental e Insumos",
    location: "Santiago, Chile",
    tag: "Distribución B2B",
    highlight: "Cero ventas perdidas por olvido",
  },
  {
    quote:
      "Pensaba que esto de automatizar era para multinacionales con presupuestos gigantes. Por $120.000 al mes nos dejaron todo funcionando como reloj. Ahora sé exactamente cuánto me cuesta cada cliente nuevo y dupliqué mi tranquilidad a fin de mes.",
    author: "Rodrigo Carvajal",
    role: "Gerente General en Carvajal Equipamientos",
    location: "Temuco, Chile",
    tag: "Comercio & Equipamiento",
    highlight: "Costo por cliente medido al peso",
  },
];

// 5. Preguntas Frecuentes
const faqs = [
  {
    q: "¿Tengo que saber de tecnología o computación para usar esto?",
    a: "Absolutamente no. Nosotros hacemos todo el trabajo técnico pesado: conectamos las herramientas, configuramos las cuentas, diseñamos los anuncios y programamos los correos automáticos. Tú y tu equipo solo reciben los datos en una aplicación móvil o en el computador tan sencilla como revisar el correo. En la capacitación de 45 minutos te dejamos listo para operar.",
  },
  {
    q: "¿Por qué no me conviene seguir atendiendo solo por WhatsApp directo?",
    a: "WhatsApp es un excelente canal para cerrar, pero un pésimo lugar para almacenar y ordenar clientes cuando haces publicidad. Si te entran 30 consultas al mes, los mensajes se hunden en el historial, te olvidas de hacer seguimiento y la mitad de la gente te deja en visto porque no les respondiste en 5 minutos. Con el Motor de Ventas 360, el cliente recibe respuesta automática al segundo y queda guardado en un tablero ordenado con su teléfono y correo.",
  },
  {
    q: "¿El valor de $120.000 CLP incluye el presupuesto que se le paga a Meta Ads?",
    a: "No. Los $120.000 CLP mensuales corresponden a nuestros honorarios por la gestión experta: diseño e implementación técnica, conexión con Brevo CRM, automatización de emails, configuración del embudo, soporte continuo y optimización semanal de tus campañas. Tu presupuesto publicitario en Meta (sugerimos empezar con $50.000 a $100.000 CLP al mes) se paga directamente a Meta con tu propia tarjeta de crédito o débito, manteniendo siempre el control total de tu dinero.",
  },
  {
    q: "¿Por qué el contrato inicial tiene una duración de 3 meses?",
    a: "Porque los resultados comerciales reales requieren método, no magia de 15 días. Durante el mes 1 instalamos el ecosistema, conectamos las herramientas y lanzamos las campañas. Durante el mes 2 calibramos los anuncios según el comportamiento de compra de tus clientes en Chile para bajar el costo por cliente. Durante el mes 3 el sistema ya corre de forma predecible y optimizada. Es el tiempo mínimo para entregarte un motor estable y rentable.",
  },
  {
    q: "¿Qué pasa si ya tengo clientes viejos anotados en cuadernos, Excel o en el celular?",
    a: "¡Mucho mejor! Como parte de la puesta en marcha, podemos ayudarte a importar esa base de datos a Brevo CRM. Así podrás enviarles correos de reactivación con tus ofertas vigentes y generar ventas rápidas desde el día uno sin tener que gastar extra en publicidad.",
  },
];

/* ============================================================
   COMPONENTE PRINCIPAL DE LA PÁGINA
   ============================================================ */

function MotorDeVentasPage() {
  const magneticCtaRef = useMagnetic<HTMLAnchorElement>();

  return (
    <main className="nl-theme-cyan min-h-screen bg-background text-foreground selection:bg-prisma-cyan selection:text-prisma-navy">
      <noscript>
        <style>{`.nl-reveal,.nl-word,.nl-badge-anim{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>

      <ScrollProgress />
      <Navbar />

      {/* ============================================================
          1. HERO SECTION
          ============================================================ */}
      <HeroNueva
        h1Line1="¿Inviertes en publicidad y los clientes te dejan en visto?"
        h1Line2="Instalamos tu Motor de Ventas 360."
        description="El sistema comercial definitivo para PYMES chilenas: conectamos tus anuncios de Meta Ads directo a un CRM ordenado en Brevo con respuesta automática por email. Sin contratar programadores, sin softwares millonarios y con seguimiento impecable de cada prospecto."
        ctaText="Agendar Diagnóstico Gratuito"
        ctaId="hero_motordeventas360"
        customTickerItems={[
          "De mensajes desordenados a ventas cerradas",
          "Respuesta automática por email en menos de 15 segundos",
          "Meta Ads 100% conectado a Brevo CRM",
          "Control exacto de tu costo por cliente",
          "Desde $120.000 CLP / mes · 3 meses iniciales",
        ]}
        visual={<MotorVentasVisual />}
      />

      {/* ============================================================
          2. SECCIÓN PROBLEMA (AGITACIÓN DEL DOLOR)
          ============================================================ */}
      <section
        id="problema"
        className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden border-t border-white/10"
      >
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

        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
              <MessageSquareOff className="h-3.5 w-3.5" />
              El dolor de la PYME chilena hoy
            </span>
            <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-white leading-tight text-balance">
              ¿Te suena familiar este caos diario en tu negocio?
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
              La mayoría de los emprendedores en Chile no tienen un problema con su producto o servicio.
              El verdadero freno es que están atendiendo ventas modernas con métodos lentos y desordenados.
            </p>
          </Reveal>

          {/* 3 Viñetas de dolor */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {painPoints.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  variant="scale"
                  delay={i * 140}
                  className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white group-hover:scale-105 transition">
                        <Icon className="h-6 w-6 text-prisma-cyan" />
                      </div>
                      <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/65 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-white/10 pt-4">
                    <span className="text-xl font-extrabold text-prisma-cyan block">
                      {item.stat}
                    </span>
                    <span className="text-xs text-white/50 block mt-0.5 leading-snug">
                      {item.statLabel}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Resumen de impacto */}
          <Reveal variant="scale" delay={300} className="mt-12">
            <div className="mx-auto max-w-4xl rounded-2xl border border-amber-400/30 bg-amber-400/10 p-6 md:p-7 text-center backdrop-blur-sm">
              <p className="text-base md:text-lg font-bold text-amber-200">
                El resultado: Pagas publicidad para conseguir prospectos, pero los pierdes por falta de
                rapidez y seguimiento. Es como tener un balde roto donde echas agua que se escapa por abajo.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          3. LA SOLUCIÓN (CÓMO FUNCIONA EN 3 PASOS)
          ============================================================ */}
      <section
        id="como-funciona"
        className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white py-20 md:py-28 text-ink"
      >
        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              <Zap className="h-3.5 w-3.5" />
              La Solución Productizada
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-ink leading-tight text-balance">
              No hacemos anuncios sueltos.
              <br />
              <span className="nl-text-gradient">Te instalamos un sistema ordenado de ventas.</span>
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              El <strong>Motor de Ventas 360</strong> une en una sola línea continua lo que antes tenías disperso:
              tu publicidad en Meta, una respuesta inmediata que no te quita tiempo y un CRM para que tu equipo
              sepa exactamente a quién llamar para cerrar.
            </p>
          </Reveal>

          {/* 3 Pasos Clave */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {solutionSteps.map((step, idx) => (
              <Reveal
                key={step.step}
                variant="scale"
                delay={idx * 150}
                className="relative flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-slate-50/70 p-8 shadow-sm transition hover:shadow-md hover:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black text-slate-200 font-mono">
                      {step.step}
                    </span>
                    <span
                      className={`rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${step.badgeColor}`}
                    >
                      {step.phase}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold text-ink leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-slate-200 pt-5">
                    {step.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-xs text-slate-700 leading-snug">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Banner de llamada a la acción intermedia */}
          <Reveal variant="scale" delay={200} className="mt-16">
            <div className="nl-dark rounded-3xl p-8 md:p-10 border border-white/15 text-center shadow-xl">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white text-balance">
                Pasa de "¿precio?" en mensajes perdidos a un flujo comercial donde sabes cuánto te rinde cada peso.
              </h3>
              <p className="mt-3 text-sm md:text-base text-white/70 max-w-2xl mx-auto">
                No necesitas aprender software complicado. En 10 días hábiles dejamos tu sistema configurado y listo para recibir clientes.
              </p>
              <div className="mt-6">
                <a
                  href={MEET_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackCta("diagnostico_intermedio", "solucion_3pasos")}
                  className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-prisma-navy shadow-lg transition hover:brightness-105"
                  style={{ background: "var(--gradient-agenda)" }}
                >
                  Agendar Diagnóstico Gratuito
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          4. COMPARATIVA: EL MÉTODO TRADICIONAL VS. MOTOR 360
          ============================================================ */}
      <section className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden border-t border-white/10">
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-prisma-cyan/30 bg-prisma-cyan/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-prisma-cyan">
              <TrendingUp className="h-3.5 w-3.5" />
              La Transformación
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white leading-tight text-balance">
              El Método Tradicional vs. Tu Motor de Ventas 360
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
              Mira cómo cambia el día a día de tu negocio cuando cambias la improvisación por un sistema ordenado.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {/* Antes: Método Tradicional */}
            <Reveal
              variant="left"
              className="rounded-3xl border border-red-500/30 bg-red-950/20 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 border-b border-red-500/20 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/20 text-red-400">
                  <XCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">El método tradicional (Improvisado)</h3>
                  <span className="text-xs text-red-300">Pagar anuncios a ciegas y perder ventas</span>
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-white/75">
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Gastas $50.000 a $100.000 CLP en Meta y nunca sabes si volvió un solo peso en ventas.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Respondes mensajes 4 horas después con un frío «Hola, cuéntame». El cliente ya cotizó en otra parte.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Anotas clientes en cuadernos, servilletas o notas de celular que luego nadie revisa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Los prospectos te dejan en visto y nunca más les hablas por vergüenza o falta de tiempo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
                  <span>Vives con la angustia mensual de no saber cuántas ventas van a entrar la próxima semana.</span>
                </li>
              </ul>
            </Reveal>

            {/* Después: Con Motor de Ventas 360 */}
            <Reveal
              variant="right"
              className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 border-b border-emerald-500/20 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Con Motor de Ventas 360 (Ordenado)</h3>
                  <span className="text-xs text-emerald-300">Un sistema continuo que trabaja para ti</span>
                </div>
              </div>

              <ul className="mt-6 space-y-4 text-sm text-white/90">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Sabes exactamente cuánto te costó cada cliente nuevo y qué anuncio trajo dinero real a caja.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>El cliente recibe respuesta profesional automática por email en menos de 15 segundos con tus precios.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Tienes un panel Brevo visual en tu celular donde ves cada cliente en su etapa correspondiente.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Haces seguimiento con 1 clic: sabes a quién llamar hoy y a quién cobrarle su cotización.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Construyes un flujo predecible y profesional que hace crecer tu negocio mes a mes.</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. ENTREGABLES: QUÉ INCLUYE Y PRECIO TRANSPARENTE
          ============================================================ */}
      <section
        id="entregables"
        className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white py-20 md:py-28 text-ink"
      >
        <div className="mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              <BadgePercent className="h-3.5 w-3.5" />
              Inversión Clara Sin Letras Chicas
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-ink leading-tight text-balance">
              Todo lo que incluye tu Motor de Ventas 360
            </h2>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              Un servicio productizado donde no compras horas de consultoría al aire: compras un sistema
              instalado, probado y funcionando para tu negocio.
            </p>
          </Reveal>

          {/* Tarjeta de Precio Destacado */}
          <Reveal variant="scale" delay={150} className="mt-12">
            <div className="mx-auto max-w-3xl rounded-3xl border-2 border-primary/30 bg-gradient-to-b from-primary/5 via-white to-primary/5 p-8 md:p-10 shadow-lg text-center">
              <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-bold tracking-wider uppercase">
                PLAN PRODUCTIZADO PYME
              </span>
              <div className="mt-4 flex items-baseline justify-center gap-2">
                <span className="text-xs md:text-sm font-semibold text-slate-500 uppercase">Desde</span>
                <span className="text-4xl md:text-6xl font-black text-ink font-mono">$120.000</span>
                <span className="text-sm md:text-base font-bold text-slate-600">CLP / mes</span>
              </div>
              <p className="mt-2 text-xs md:text-sm text-slate-500 font-medium">
                Contrato inicial de 3 meses · Tiempo requerido para instalar, calibrar y optimizar tu costo por cliente
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Sin cobros ocultos de instalación
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Operativo en 10 días hábiles
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Tú mantienes el control de tus cuentas
                </span>
              </div>
            </div>
          </Reveal>

          {/* Grid de 7 Entregables */}
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, index) => {
              const Icon = d.icon;
              return (
                <Reveal
                  key={d.title}
                  variant="scale"
                  delay={index * 80}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-slate-300"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-ink leading-snug">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-slate-600 leading-relaxed">
                    {d.desc}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          6. PRUEBA SOCIAL Y GARANTÍA
          ============================================================ */}
      <section
        id="testimonios"
        className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden border-t border-white/10"
      >
        <div className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal variant="blur" className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-prisma-magenta/30 bg-prisma-magenta/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-prisma-magenta">
              <Sparkles className="h-3.5 w-3.5" />
              Casos Reales en Chile
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white leading-tight text-balance">
              Emprendedores que dejaron el desorden atrás
            </h2>
            <p className="mt-4 text-base md:text-lg text-white/70 leading-relaxed">
              Negocios reales que pasaron de contestar tarde en WhatsApp a tener un sistema comercial que trabaja solo.
            </p>
          </Reveal>

          {/* Testimonios */}
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <Reveal
                key={t.author}
                variant="scale"
                delay={idx * 120}
                className="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-bold text-prisma-cyan uppercase tracking-wider">
                      {t.tag}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400">
                      {t.highlight}
                    </span>
                  </div>

                  <p className="mt-5 text-sm text-white/80 leading-relaxed italic">
                    «{t.quote}»
                  </p>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">{t.author}</p>
                  <p className="text-xs text-white/60">{t.role}</p>
                  <p className="text-[11px] text-white/40">{t.location}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Caluga de Garantía */}
          <Reveal variant="scale" delay={250} className="mt-16">
            <div className="nl-beam mx-auto max-w-4xl rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm p-7 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                <div className="nl-tile-gradient flex h-16 w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-2xl text-white shadow-xl">
                  <ShieldCheck className="h-9 w-9 md:h-11 md:w-11" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-prisma-cyan">
                    Garantía de Servicio Prisma Digital
                  </span>
                  <h3 className="mt-1 text-xl md:text-2xl font-extrabold text-white">
                    Puesta a punto en 10 días o seguimos trabajando sin costo.
                  </h3>
                  <p className="mt-2 text-xs md:text-sm text-white/70 leading-relaxed">
                    Nos comprometemos a que en un plazo máximo de 10 días hábiles tu Motor de Ventas 360
                    estará 100% montado, probado y listo para recibir prospectos. Si durante tus primeros
                    30 días el sistema no está organizando tus contactos de forma impecable en Brevo CRM,
                    realizamos todos los ajustes técnicos y de anuncios necesarios sin cobrarte honorarios adicionales.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          7. CIERRE / PREGUNTAS FRECUENTES (FAQ)
          ============================================================ */}
      <section
        id="faq"
        className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white py-20 md:py-28 text-ink"
      >
        <div className="mx-auto max-w-4xl px-6">
          <Reveal variant="blur" className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-primary">
              <HelpCircle className="h-3.5 w-3.5" />
              Resolvemos tus Dudas
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-ink leading-tight text-balance">
              Preguntas Frecuentes
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Todo lo que necesitas saber antes de dar el paso hacia un sistema comercial ordenado.
            </p>
          </Reveal>

          {/* Acordeón de FAQs */}
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${i}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 px-5 transition data-[state=open]:border-primary/40 data-[state=open]:bg-white shadow-sm"
                >
                  <AccordionTrigger className="text-left text-base font-bold text-ink hover:text-primary hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate-600 leading-relaxed pb-5 pt-1">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. CTA FINAL CON DIAGNÓSTICO GRATUITO
          ============================================================ */}
      <section
        id="diagnostico-final"
        className="nl-dark relative z-[1] -mt-10 rounded-t-[2.5rem] py-20 md:py-28 overflow-hidden border-t border-white/10"
      >
        <div className="nl-gem" aria-hidden="true" />
        <div className="nl-grain absolute inset-0 overflow-hidden rounded-t-[2.5rem]" aria-hidden="true">
          <div
            className="absolute top-[-10%] right-[10%] h-[32rem] w-[32rem] rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, #32d6ff 0%, transparent 65%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6">
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-8 md:p-14 backdrop-blur-md shadow-2xl text-center">
            <Reveal variant="blur">
              <span className="inline-flex items-center gap-2 rounded-full border border-prisma-cyan/40 bg-prisma-cyan/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-prisma-cyan">
                <CalendarDays className="h-3.5 w-3.5" />
                Diagnóstico Comercial Gratuito de 30 Minutos
              </span>
              <h2 className="mt-6 text-3xl md:text-5xl font-black text-white leading-tight text-balance">
                Deja de botar plata en anuncios.
                <br />
                <span className="nl-text-gradient">Pon orden en tus ventas este mismo mes.</span>
              </h2>
              <p className="mt-5 text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
                Conversemos 30 minutos por videollamada. Revisamos cómo estás captando clientes hoy,
                cuánto te está costando cada consulta y te mostramos cómo quedaría tu Motor de Ventas 360 funcionando.
              </p>
            </Reveal>

            {/* Bullets de Valor en el Diagnóstico */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs md:text-sm text-white/80">
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Check className="h-4 w-4 text-prisma-cyan" />
                Sin compromiso de contratación
              </span>
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Check className="h-4 w-4 text-prisma-cyan" />
                100% enfocado en tu rubro y realidad chilena
              </span>
              <span className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Check className="h-4 w-4 text-prisma-cyan" />
                Sales sabiendo qué arreglar primero
              </span>
            </div>

            {/* Botón Principal Magnético */}
            <Reveal variant="scale" delay={180} className="mt-10">
              <a
                ref={magneticCtaRef}
                href={MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta("diagnostico_final_boton", "cierre_landing")}
                className="inline-flex items-center justify-center gap-3 rounded-full px-10 py-5 text-base md:text-lg font-black text-prisma-navy shadow-2xl transition hover:brightness-110 hover:scale-[1.02]"
                style={{ background: "var(--gradient-agenda)" }}
              >
                Agendar Diagnóstico Gratuito
                <ArrowRight className="h-5 w-5" />
              </a>
              <p className="mt-3 text-xs text-white/50">
                Reserva directa en la agenda de Prisma Digital · Disponibilidad limitada por semana
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
