import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";

const CANONICAL_URL = "https://www.prismadigital.io/terminos-y-condiciones";

export const Route = createFileRoute("/terminos-y-condiciones")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — Prisma Digital" },
      {
        name: "description",
        content: "Términos y condiciones de uso del sitio web de Prisma Digital.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
  }),
  component: TerminosPage,
});

const secciones = [
  {
    title: "1. Identificación",
    body: "Este sitio web es operado por Prisma Digital, agencia de crecimiento digital con base en Concepción, Chile. Contacto: prismadigital.io@gmail.com · +56 9 5715 1303.",
  },
  {
    title: "2. Uso del sitio",
    body: "El contenido de este sitio tiene fines informativos y comerciales. Al navegarlo, aceptas usarlo de buena fe y no realizar acciones que afecten su funcionamiento o la experiencia de otros usuarios.",
  },
  {
    title: "3. Servicios y agendamiento",
    body: "El diagnóstico gratuito se agenda a través de la plataforma Brevo. Agendar una reunión no genera obligación contractual: los alcances, plazos y precios de cada servicio se acuerdan por escrito en una propuesta específica para cada cliente.",
  },
  {
    title: "4. Garantía de avances medibles",
    body: "La garantía de avances medibles en 90 días aplica sobre las métricas definidas en conjunto durante el diagnóstico y queda formalizada en la propuesta de servicios correspondiente.",
  },
  {
    title: "5. Propiedad intelectual",
    body: "Las marcas, logos, textos y elementos gráficos de este sitio pertenecen a Prisma Digital o a sus respectivos titulares (por ejemplo, los logos de clientes citados como referencia). No pueden reproducirse sin autorización.",
  },
  {
    title: "6. Limitación de responsabilidad",
    body: "Los resultados de clientes publicados en este sitio corresponden a casos reales, pero no constituyen una promesa de resultados idénticos: cada negocio parte de un contexto distinto.",
  },
  {
    title: "7. Modificaciones",
    body: "Prisma Digital puede actualizar estos términos en cualquier momento. La versión vigente será siempre la publicada en esta página.",
  },
];

function TerminosPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="nl-dark pt-28 pb-14 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.15] text-balance">
            Términos y Condiciones
          </h1>
          <p className="mt-3 text-sm text-white/60">Última actualización: julio 2026</p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-6 space-y-8">
          {secciones.map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-lg md:text-xl font-bold text-ink">{title}</h2>
              <p className="mt-2 text-[15px] md:text-base text-muted-foreground leading-relaxed">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
      <FooterNueva />
    </main>
  );
}
