import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { CheckCircle2, ShieldCheck, PhoneCall, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/gracias-infinitas")({
  head: () => ({
    meta: [
      { title: "¡Gracias infinitas! — Prisma Digital" },
      {
        name: "description",
        content:
          "Recibimos tu solicitud. Pronto te contactará nuestro equipo de customer experience para confirmar y resolver tus dudas.",
      },
      // Página de conversión: no debe indexarse
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: GraciasInfinitas,
});

function GraciasInfinitas() {
  // Página de éxito: empuja el evento de conversión al dataLayer para que GTM
  // dispare un evento personalizado `generate_lead`. Se ejecuta una sola vez
  // por carga (el guard evita el doble disparo de React StrictMode en dev).
  const pushed = useRef(false);
  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "generate_lead",
      lead_source: "agenda_brevo",
      page_variant: "gracias-infinitas",
    });
  }, []);

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Aura decorativa */}
      <div className="hero-aura" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
        {/* Logo */}
        <img
          src="/Logo Prisma Digital blanco.webp"
          alt="Prisma Digital"
          className="mb-10 w-44 h-auto"
        />

        {/* Ícono de éxito */}
        <div
          className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full text-prisma-navy shadow-2xl"
          style={{ background: "var(--gradient-agenda)" }}
        >
          <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
        </div>

        {/* Titular */}
        <h1 className="text-3xl md:text-5xl font-extrabold uppercase leading-[1.1] tracking-tight text-white">
          Agradecemos tu tiempo
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            y las ganas de mejorar…
          </span>
        </h1>

        {/* Mensaje principal */}
        <div className="mt-8 flex items-start gap-3 rounded-2xl bg-white/5 p-5 text-left ring-1 ring-white/10 backdrop-blur-sm">
          <PhoneCall className="mt-1 h-5 w-5 shrink-0 text-prisma-cyan" />
          <p className="text-base md:text-lg leading-relaxed text-white/85">
            Pronto te llamará uno de nuestros agentes de customer experience para confirmar tu
            solicitud y resolver algunas dudas. Así que aprovecha ese momento para darnos más
            detalles del proyecto.
          </p>
        </div>

        {/* Privacidad */}
        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-white/5 p-5 text-left ring-1 ring-white/10 backdrop-blur-sm">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-prisma-yellow" />
          <p className="text-sm md:text-base leading-relaxed text-white/75">
            No te preocupes. Nos tomamos en serio la privacidad y seguridad de tus datos. Con
            nosotros tu información está a salvo.
          </p>
        </div>

        {/* Volver al inicio */}
        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-bold text-prisma-navy shadow-xl transition-transform hover:scale-[1.03]"
          style={{ background: "var(--gradient-agenda)" }}
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
