import { EyeOff, LineChart, Hourglass, type LucideIcon } from "lucide-react";

type Dolor = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const dolores: Dolor[] = [
  {
    icon: EyeOff,
    title: "Inviertes en publicidad a ciegas",
    body: "Pones plata en campañas, pero nadie puede decirte con certeza cuáles traen ventas y cuáles solo gastan presupuesto.",
  },
  {
    icon: LineChart,
    title: "Tu web o tu app no se miden",
    body: "Tienes presencia digital, pero no sabes qué hacen tus clientes ahí: qué miran, dónde se van, por qué no compran.",
  },
  {
    icon: Hourglass,
    title: "Lo digital se posterga cada año",
    body: "Sabes que es tu próximo salto, pero entre tecnicismos y proveedores que no explican nada, nunca parte en serio.",
  },
];

/* COSTO DE NO ACTUAR, reencuadrado para empresas consolidadas:
   el riesgo no es "no existir", es quedarse atrás con todo lo ya construido. */
export default function DolorNueva() {
  return (
    <section
      id="nosotros"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #d713f9 0%, transparent 42%), radial-gradient(circle at 80% 70%, #32d6ff 0%, transparent 42%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight max-w-4xl mx-auto">
          Tu competencia no es mejor.{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Solo tomó mejores decisiones digitales antes que tú.
          </span>
        </h2>
        <p className="mt-6 text-base md:text-lg text-white/80 max-w-2xl mx-auto text-center leading-relaxed">
          Después de años construyendo un negocio que funciona, el riesgo ya no es “no existir”: es
          quedarte atrás con todo lo que ya tienes ganado. La buena noticia: ordenar el caos digital
          es más simple de lo que te han hecho creer.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {dolores.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-8"
            >
              <div
                className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-white mb-5"
                style={{ background: "var(--gradient-brand)" }}
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
              <p className="mt-3 text-white/75 leading-relaxed">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
