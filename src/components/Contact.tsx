import { Check } from "lucide-react";

const bullets = [
  "Por qué tu negocio no está vendiendo lo que debería",
  "Qué cambiaríamos primero para ver resultados rápido",
  "Si somos o no la opción correcta para ti",
];

export default function Contact() {
  return (
    <section id="contacto" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 grid gap-12 lg:grid-cols-2 items-center">
        {/* Left */}
        <div>
          <h2 className="text-3xl md:text-[40px] font-extrabold text-ink leading-[1.15]">
            Tienes un negocio que merece más clientes.
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-brand)" }}
            >
              Nosotros sabemos cómo conseguírtelos.
            </span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            La única pregunta es: <span className="font-semibold text-ink">¿cuándo empezamos?</span>
          </p>

          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
                <span className="text-base text-ink/90 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[13px] text-muted-foreground italic">
            Sin presión. Sin compromiso. Solo claridad.
          </p>
        </div>

        {/* Right: formulario real de Brevo */}
        <div className="bg-white rounded-2xl p-2 md:p-4 shadow-xl border border-border">
          <iframe
            title="Formulario de contacto Prisma Digital"
            src="https://345b4d6b.sibforms.com/v2/serve/MUIFAOVc3B9AWrtg9aM3CAvHScKfp8Ak5Rg3dGgrxrEwFJIdkmi60NP7IEJrxFUR9tuLZsDhfXvfrCdRrsqLYjJxZYg_O6AojNgMU_Eu7jMC4bdABeY2DHZvs65w2JoPPGDcIH6PhFxLeZP72pp_-2xS4iB2b6UveyK2l5Gl3ohVxLeSlTYMIhXkFyzaPy5Wz51z3GVfilH97YmQ"
            frameBorder={0}
            scrolling="no"
            allowFullScreen
            className="block w-full rounded-xl"
            style={{ width: "100%", height: 640 }}
          />
        </div>
      </div>
    </section>
  );
}
