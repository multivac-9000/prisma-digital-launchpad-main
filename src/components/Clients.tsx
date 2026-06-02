/* CLIENT LOGOS marquee */
const clients = [
  { name: "Marco Amarillo", result: "+89% de visitas orgánicas en 45 días" },
  { name: "Atodo Vajilla", result: "Embudo de clientes activo con $0 en ads" },
  { name: "Emporio 1810", result: "+143% en ventas online en 60 días" },
  { name: "La Regaler", result: "Tienda online operativa en 3 semanas" },
  { name: "ArteManía", result: "Primera venta online en 48 horas de lanzamiento" },
  { name: "HEAD", result: "Campañas con ROAS de 4.2x desde el primer mes" },
];

function LogoChip({ name, result }: { name: string; result: string }) {
  return (
    <div className="group relative shrink-0 mx-8">
      <div className="px-8 py-4 rounded-xl border border-border bg-white text-2xl font-bold tracking-tight text-muted-foreground grayscale opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-hover:text-primary group-hover:border-primary/40">
        {name}
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
            <LogoChip key={i} name={c.name} result={c.result} />
          ))}
        </div>
      </div>
    </section>
  );
}
