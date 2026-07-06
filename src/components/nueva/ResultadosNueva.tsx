/* PRUEBA CON RESULTADOS: métricas + logos reales en el tercio superior de la página. */

const destacados = [
  {
    name: "Emporio Nacional",
    logo: "/clients/emporio-nacional.png",
    metric: "+143%",
    detail: "en ventas online",
    plazo: "en 60 días · retail con tienda física",
  },
  {
    name: "Liberty Seguros",
    logo: "/clients/logo liberty seguros.svg",
    metric: "4.2x",
    detail: "de ROAS en campañas",
    plazo: "desde el primer mes · servicios",
  },
  {
    name: "Küm",
    logo: "/clients/logo-kum-04.svg",
    metric: "+120%",
    detail: "de leads calificados",
    plazo: "en 30 días · retail especialista",
  },
];

const otros = [
  { name: "Fexmin", logo: "/clients/Logo-Fexmin.png", result: "Primera venta online en 48 horas" },
  {
    name: "Mundo Deco Store",
    logo: "/clients/mundodecostore.png",
    result: "Estrategia digital activa en 2 semanas",
  },
  { name: "A Todo Vajilla", logo: "/clients/logo a todo vajilla.png", result: "Embudo de clientes activo con $0 en ads" },
  { name: "Ozono", logo: "/clients/ozono.png", result: "+65% de conversión en landing page" },
  { name: "U-Home", logo: "/clients/u-home.png", result: "Presencia digital sólida en 45 días" },
  { name: "La Regalería", logo: "/clients/la-regaleria.svg", result: "Tienda online operativa en 3 semanas" },
  {
    name: "Marco Schulz",
    logo: "/clients/logo Marco schulzs.png",
    result: "+89% de visitas orgánicas en 45 días",
  },
];

// NOTA: citas de referencia con atribución semi-anónima. Antes de convertir esta
// página en la landing oficial, reemplazar por testimonios reales aprobados por
// cada cliente (nombre completo, cargo y empresa verificados).
const testimonios = [
  {
    quote:
      "Llevábamos años vendiendo bien en el local, pero lo digital era una caja negra. Hoy sé exactamente qué campaña me trae ventas y cuánto me cuesta cada cliente nuevo.",
    author: "Gerente Comercial",
    company: "Retail con tienda física, Concepción",
  },
  {
    quote:
      "No necesitábamos otra página bonita: necesitábamos vender. En pocos meses el canal online pasó de ser una vitrina a ser la segunda caja del negocio.",
    author: "Dueño",
    company: "Comercio especialista, Región del Biobío",
  },
];

export default function ResultadosNueva() {
  return (
    <section id="resultados" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15] max-w-3xl mx-auto">
          Resultados medibles, <span className="text-secondary">no promesas.</span>
        </h2>
        <p className="mt-5 max-w-2xl mx-auto text-center text-base md:text-lg text-muted-foreground leading-relaxed">
          Trabajamos con negocios que ya venden y llevan años de trayectoria. Esto es lo que pasa
          cuando su mundo digital se empieza a medir en serio.
        </p>

        {/* Métrica dura primero: logo + resultado + plazo */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {destacados.map(({ name, logo, metric, detail, plazo }) => (
            <article
              key={name}
              className="flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex h-16 items-center justify-center mb-5">
                <img
                  src={logo}
                  alt={`Logo ${name}, cliente de Prisma Digital`}
                  className="max-h-12 max-w-32 object-contain"
                  loading="lazy"
                />
              </div>
              <p
                className="text-5xl font-extrabold bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                {metric}
              </p>
              <p className="mt-1 text-lg font-bold text-ink">{detail}</p>
              <p className="mt-2 text-sm text-muted-foreground">{plazo}</p>
            </article>
          ))}
        </div>

        {/* Testimonios de negocios con trayectoria */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {testimonios.map(({ quote, author, company }) => (
            <figure
              key={company}
              className="rounded-2xl border border-border bg-white p-8 shadow-sm"
            >
              <blockquote className="text-base md:text-lg text-ink/90 leading-relaxed">
                “{quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="block font-bold text-ink">{author}</span>
                <span className="text-muted-foreground">{company}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Resto de clientes, con su resultado al pasar el cursor */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-4">
          {otros.map(({ name, logo, result }) => (
            <div key={name} className="group relative" title={result}>
              <div className="flex items-center justify-center px-6 py-3 rounded-xl border border-border bg-white min-h-16 grayscale opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:border-primary/40">
                <img
                  src={logo}
                  alt={`Logo ${name}, cliente de Prisma Digital`}
                  className="max-h-10 max-w-28 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-lg z-10">
                {result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
