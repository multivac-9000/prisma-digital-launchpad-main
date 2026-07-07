import { Gem, Megaphone, TrendingUp, ArrowRight, type LucideIcon } from "lucide-react";

type Service = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const services: Service[] = [
  {
    icon: Gem,
    eyebrow: "DIGITALIZACIÓN DE NEGOCIOS",
    title: "Tu negocio en internet, vendiendo solo",
    body: "Creamos tu tienda digital desde cero, te enseñamos a administrarla y la conectamos con tus primeros clientes. Sin tecnicismos. Sin depender de nadie más.",
    cta: "Quiero mi tienda digital",
  },
  {
    icon: Megaphone,
    eyebrow: "PROMOCIÓN DE NEGOCIOS",
    title: "Prospectos que llegan. Ventas que cierran.",
    body: "Desarrollamos tu sistema de captación de clientes: anuncios, contenido y seguimiento automático que convierte desconocidos en compradores.",
    cta: "Quiero más clientes",
  },
  {
    icon: TrendingUp,
    eyebrow: "OPTIMIZACIÓN DE NEGOCIOS",
    title: "Deja de adivinar qué funciona.",
    body: "Analizamos el comportamiento real de tus usuarios, identificamos dónde pierdes dinero y ajustamos cada punto de contacto para que tu inversión rinda más.",
    cta: "Quiero optimizar mi negocio",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Intro */}
        <h2 className="text-center text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15] max-w-4xl mx-auto">
          Cada día sin presencia digital es un día
          <br className="hidden md:block" />
          que tu competencia te está quitando clientes.
        </h2>

        <div className="mt-6 max-w-3xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed space-y-2">
          <p>No porque sean mejores que tú. Sino porque aparecen primero.</p>
          <p>
            Desde crear tu tienda online hasta llenar tu embudo de clientes listos para comprar,{" "}
            <span className="text-ink font-semibold">Prisma Digital lo hace posible</span> — con
            datos, no con suposiciones.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map(({ icon: Icon, eyebrow, title, body, cta }) => (
            <article
              key={eyebrow}
              className="group relative flex flex-col rounded-2xl p-8 bg-white border border-border hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div
                className="inline-flex h-14 w-14 items-center justify-center rounded-xl text-white mb-6"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Icon className="h-7 w-7" />
              </div>
              <p className="text-[11px] font-bold tracking-[0.15em] text-secondary mb-2">
                {eyebrow}
              </p>
              <h3 className="text-xl font-bold text-ink leading-snug">{title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
              <a
                href="#contacto"
                className="mt-6 inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
              >
                {cta} <ArrowRight className="h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
