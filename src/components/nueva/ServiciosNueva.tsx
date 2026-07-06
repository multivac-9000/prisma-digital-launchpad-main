import { Gem, Megaphone, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";
import { trackCta } from "./track";
import { Reveal } from "./scrolly";

const MEET_URL = "https://meet.brevo.com/prisma-digital";

type Service = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  result: string;
  cta: string;
  ctaId: string;
};

/* SERVICIOS para empresas consolidadas. En móvil las tarjetas se deslizan en
   horizontal con scroll-snap; en escritorio, grilla con revelado escalonado.
   Cada tarjeta termina en un resultado y todos los CTA llevan al diagnóstico. */
const services: Service[] = [
  {
    icon: Gem,
    eyebrow: "DIGITALIZACIÓN DE NEGOCIOS",
    title: "Moderniza y conecta lo que ya construiste",
    body: "Tu negocio ya funciona; lo que falta es integrarlo. Conectamos tu ecommerce, tu CRM y tus automatizaciones con la operación que ya tienes en el local — sin partir de cero ni botar lo que ya te funciona.",
    result: "Un ecosistema digital integrado que vende junto a tu local, no aparte.",
    cta: "Quiero modernizar mi operación",
    ctaId: "servicio_digitalizacion",
  },
  {
    icon: Megaphone,
    eyebrow: "PROMOCIÓN DE NEGOCIOS",
    title: "Un sistema de captación predecible y medible",
    body: "Nada de campañas sueltas. Construimos un sistema donde cada campaña tiene objetivo, medición y presupuesto justificado, para que el flujo de clientes nuevos deje de depender de la suerte.",
    result: "Sabes cuánto te cuesta cada cliente nuevo — y cómo bajar ese costo.",
    cta: "Quiero un flujo constante de clientes",
    ctaId: "servicio_promocion",
  },
  {
    icon: TrendingUp,
    eyebrow: "OPTIMIZACIÓN DE NEGOCIOS",
    title: "Medición de eventos que baja tu CPA",
    body: "Configuramos bien la medición de los eventos de tu web y tus apps, y la marcación de tus objetivos publicitarios — para que sepas exactamente qué campaña te trae ventas y las plataformas optimicen con datos reales.",
    result: "Publicidad que se optimiza con datos correctos y un CPA a la baja.",
    cta: "Quiero medir lo que invierto",
    ctaId: "servicio_optimizacion",
  },
];

export default function ServiciosNueva() {
  return (
    <section
      id="servicios"
      className="nl-grid-paper relative z-[1] -mt-10 rounded-t-[2.5rem] bg-white pt-16 md:pt-24 pb-20 md:pb-28"
    >
      <div className="nl-gem" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6">
        <Reveal variant="blur" className="text-center">
          <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15] text-balance">
            Tres frentes. Un objetivo:
            <br />
            <span className="nl-metric-gradient">duplicar tus ventas online.</span>
          </h2>
          <div className="nl-underline mx-auto mt-5" aria-hidden="true" />
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mt-6 max-w-3xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed"
        >
          Digitalizar un negocio físico no es sumar herramientas sueltas: es integrar, promocionar
          y medir con un mismo norte —{" "}
          <span className="text-ink font-semibold">que cada peso invertido se note en las ventas.</span>
        </Reveal>

        {/* Móvil: carrusel con scroll-snap · Escritorio: grilla */}
        <div className="nl-noscrollbar mt-14 flex gap-5 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-4 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:mx-0 md:px-0 md:pb-0">
          {services.map(({ icon: Icon, eyebrow, title, body, result, cta, ctaId }, i) => (
            <Reveal
              key={eyebrow}
              as="article"
              variant="up"
              delay={i * 140}
              className="nl-beam-hover group relative flex flex-col rounded-2xl p-8 bg-white border border-border hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl snap-center shrink-0 w-[84%] sm:w-[70%] md:w-auto md:shrink"
            >
              <div className="nl-tile-gradient inline-flex h-14 w-14 items-center justify-center rounded-xl text-white mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="text-[11px] font-bold tracking-[0.15em] text-secondary mb-2">
                {eyebrow}
              </p>
              <h3 className="text-xl font-bold text-ink leading-snug">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
              <div className="mt-5">
                <div className="nl-underline !w-10 !h-[3px] mb-2" aria-hidden="true" />
                <p className="text-ink font-semibold leading-relaxed">{result}</p>
              </div>
              <a
                href={MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta(ctaId, "servicios")}
                className="mt-6 inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>

        {/* Pista de deslizamiento solo en móvil */}
        <p className="mt-2 text-center text-xs text-muted-foreground md:hidden" aria-hidden="true">
          Desliza para ver los tres frentes →
        </p>
      </div>
    </section>
  );
}
