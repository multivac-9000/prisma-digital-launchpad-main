/* CLIENT LOGOS marquee */
const clients = [
  {
    name: "Marco Schulzs",
    logo: "/clients/logo Marco schulzs.png",
    result: "+89% de visitas orgánicas en 45 días",
  },
  {
    name: "A Todo Vajilla",
    logo: "/clients/logo a todo vajilla.png",
    result: "Embudo de clientes activo con $0 en ads",
  },
  {
    name: "Emporio Nacional",
    logo: "/clients/emporio-nacional.png",
    result: "+143% en ventas online en 60 días",
  },
  {
    name: "La Regalería",
    logo: "/clients/la-regaleria.svg",
    result: "Tienda online operativa en 3 semanas",
  },
  {
    name: "Fexmin",
    logo: "/clients/Logo-Fexmin.png",
    result: "Primera venta online en 48 horas de lanzamiento",
  },
  {
    name: "Liberty Seguros",
    logo: "/clients/logo liberty seguros.svg",
    result: "Campañas con ROAS de 4.2x desde el primer mes",
  },
  {
    name: "Kum",
    logo: "/clients/logo-kum-04.svg",
    result: "+120% de leads calificados en 30 días",
  },
  {
    name: "Mundo Deco Store",
    logo: "/clients/mundodecostore.png",
    result: "Estrategia digital activa en 2 semanas",
  },
  {
    name: "Ozono",
    logo: "/clients/ozono.png",
    result: "+65% de conversión en landing page",
  },
  {
    name: "U-Home",
    logo: "/clients/u-home.png",
    result: "Presencia digital sólida en 45 días",
  },
];

function LogoChip({ name, logo, result }: { name: string; logo: string; result: string }) {
  return (
    <div className="group relative shrink-0 mx-8">
      <div className="relative flex items-center justify-center px-8 py-4 rounded-xl border border-border bg-white min-h-20 grayscale opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:border-primary/40">
        <img src={logo} alt={name} className="max-h-16 max-w-32 object-contain" loading="lazy" />
      </div>
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-lg">
        {result}
      </div>
    </div>
  );
}

export default function Clients() {
  return (
    <section id="blog" className="bg-white py-16 border-y border-border">
      <p className="text-center text-sm font-semibold tracking-widest uppercase text-muted-foreground mb-10">
        Negocios que ya escalan con nosotros
      </p>
      <div className="overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex w-max animate-marquee">
          {[...clients, ...clients].map((c, i) => (
            <LogoChip key={i} name={c.name} logo={c.logo} result={c.result} />
          ))}
        </div>
      </div>
    </section>
  );
}
