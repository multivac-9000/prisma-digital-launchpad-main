import { useState } from "react";
import { Check } from "lucide-react";

const countries = [
  { code: "+52", label: "🇲🇽" },
  { code: "+1", label: "🇺🇸" },
  { code: "+34", label: "🇪🇸" },
  { code: "+54", label: "🇦🇷" },
  { code: "+57", label: "🇨🇴" },
  { code: "+56", label: "🇨🇱" },
  { code: "+51", label: "🇵🇪" },
];

const bullets = [
  "Por qué tu negocio no está vendiendo lo que debería",
  "Qué cambiaríamos primero para ver resultados rápido",
  "Si somos o no la opción correcta para ti",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    country: "+52",
    phone: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const update =
    (k: keyof typeof form) =>
      (
        e: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
      ) =>
        setForm({ ...form, [k]: e.target.value });

  const submit = () => {
    if (!form.name || !form.email || !form.phone || !form.message) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

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

          <a
            href="#contacto"
            className="mt-8 inline-flex items-center px-6 py-3 rounded-full font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            ¡Conversemos!
          </a>
        </div>

        {/* Form (no <form> wrapper, just inputs + state) */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-border">
          <div className="grid gap-4">
            <input
              placeholder="Tu nombre"
              value={form.name}
              onChange={update("name")}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
            <input
              type="email"
              placeholder="Tu email"
              value={form.email}
              onChange={update("email")}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
            <input
              placeholder="Tu sitio web actual (si tienes)"
              value={form.website}
              onChange={update("website")}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
            <div className="flex gap-2">
              <input
                type="tel"
                placeholder="Teléfono"
                value={form.phone}
                onChange={update("phone")}
                className="flex-1 px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>
            <textarea
              placeholder="Cuéntanos cuál es el servicio que requieres"
              rows={4}
              value={form.message}
              onChange={update("message")}
              className="w-full px-4 py-3 rounded-lg border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"
            />
            <button
              type="button"
              onClick={submit}
              className="w-full mt-2 px-6 py-4 rounded-lg text-white font-bold tracking-wide transition-transform hover:scale-[1.01] shadow-lg bg-secondary hover:bg-secondary/90"
            >
              {sent ? "¡ENVIADO!" : "COTIZA AQUÍ"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
