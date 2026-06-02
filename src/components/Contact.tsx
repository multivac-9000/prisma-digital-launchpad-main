import { Check } from "lucide-react";
import BrevoContact from "./BrevoContact";

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

        {/* Right: formulario real de Brevo (modo HTML nativo, aislado) */}
        <div>
          <BrevoContact />
        </div>
      </div>
    </section>
  );
}
