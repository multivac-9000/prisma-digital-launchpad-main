import { Gem, Megaphone, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";
import { trackCta } from "./track";

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

/* SERVICIOS reescritos para empresas consolidadas: modernizar lo que ya existe,
   captar de forma medible y optimizar con eventos bien configurados. Cada tarjeta
   termina en un resultado, y todos los CTA llevan al mismo destino: el diagnóstico. */
const services: Service[] = [
  {
    icon: Gem,
    eyebrow: "DIGITALIZACIÓN DE NEGOCIOS",
    title: "Moderniza y conecta lo que ya construiste",
    body: "Tu negocio ya funciona; lo que falta es integrarlo. Conectamos tu ecommerce, tu CRM y tus automatizaciones con la operación que ya tienes en el local — sin partir de cero ni botar lo que ya te funciona.",
    result: "Resultado: un ecosistema digital integrado que vende junto a tu local, no aparte.",
    cta: "Quiero modernizar mi operación",
    ctaId: "servicio_digitalizacion",
  },
  {
    icon: Megaphone,
    eyebrow: "PROMOCIÓN DE NEGOCIOS",
    title: "Un sistema de captación predecible y medible",
    body: "Nada de campañas sueltas. Construimos un sistema donde cada campaña tiene objetivo, medición y presupuesto justificado, para que el flujo de clientes nuevos deje de depender de la suerte.",
    result: "Resultado: sabes cuánto te cuesta cada cliente nuevo — y cómo bajar ese costo.",
    cta: "Quiero un flujo constante de clientes",
    ctaId: "servicio_promocion",
  },
  {
    icon: TrendingUp,
    eyebrow: "OPTIMIZACIÓN DE NEGOCIOS",
    title: "Medición de eventos que baja tu CPA",
    body: "Configuramos bien la medición de los eventos de tu web y tus apps, y la marcación de tus objetivos publicitarios — para que sepas exactamente qué campaña te trae ventas y las plataformas optimicen con datos reales.",
    result: "Resultado: publicidad que se optimiza con datos correctos y un costo por adquisición a la baja.",
    cta: "Quiero medir lo que invierto",
    ctaId: "servicio_optimizacion",
  },
];

export default function ServiciosNueva() {
  return (
    <section id="servicios" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15] max-w-4xl mx-auto">
          Un ecosistema digital integrado
          <br className="hidden md:block" />
          para duplicar tus ventas online.
        </h2>

        <p className="mt-6 max-w-3xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed">
          Digitalizar un negocio físico no es sumar herramientas sueltas: es integrar, promocionar
          y medir con un mismo norte —{" "}
          <span className="text-ink font-semibold">que cada peso invertido rinda y se note en las ventas.</span>
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map(({ icon: Icon, eyebrow, title, body, result, cta, ctaId }) => (
            <article
              key={eyebrow}
              className="group relative flex flex-col rounded-2xl p-8 bg-white border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-xl text-white mb-6"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <p className="text-[11px] font-bold tracking-[0.15em] text-secondary mb-2">
                {eyebrow}
              </p>
              <h3 className="text-xl font-bold text-ink leading-snug">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
              <p className="mt-4 text-ink font-semibold leading-relaxed">{result}</p>
              <a
                href={MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta(ctaId, "servicios")}
                className="mt-6 inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                {cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
