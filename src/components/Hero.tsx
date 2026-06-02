import { ArrowRight } from "lucide-react";

/* HERO: dark gradient + floating particles + single CTA */
export default function Hero() {
  const particles = Array.from({ length: 40 });

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-40 md:pt-44 md:pb-56"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((_, i) => {
          const size = Math.random() * 4 + 2;
          return (
            <span
              key={i}
              className="particle absolute rounded-full bg-white/70"
              style={{
                width: size,
                height: size,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                boxShadow: "0 0 12px rgba(233,30,140,0.6)",
              }}
            />
          );
        })}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: "var(--gradient-brand)" }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
          Tu negocio existe.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            Tus clientes, todavía no lo saben.
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
          Llevamos tu empresa al mundo digital y la convertimos
          <br className="hidden md:block" />
          en una máquina de ventas predecible en 90 días.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold text-base md:text-lg shadow-2xl transition-transform hover:scale-105"
            style={{ background: "var(--gradient-cta)" }}
          >
            Agenda tu Diagnóstico Gratis
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <p className="text-[13px] text-white/55">
            30 minutos · Sin costo · Sin compromiso · Solo claridad
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 leading-[0]">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[80px] md:h-[120px]">
          <path
            d="M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,64 L1440,120 L0,120 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
