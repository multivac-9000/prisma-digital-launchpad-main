import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";

const CANONICAL_URL = "https://www.prismadigital.io/politica-de-privacidad";

export const Route = createFileRoute("/politica-de-privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — Prisma Digital" },
      {
        name: "description",
        content: "Política de privacidad y tratamiento de datos del sitio web de Prisma Digital.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: CANONICAL_URL }],
  }),
  component: PrivacidadPage,
});

const secciones = [
  {
    title: "1. Responsable del tratamiento",
    body: "Prisma Digital, con base en Concepción, Chile, es responsable de los datos personales recolectados a través de este sitio. Contacto: prismadigital.io@gmail.com.",
  },
  {
    title: "2. Qué datos recolectamos",
    body: "Recolectamos tu email cuando te suscribes al newsletter, y tu nombre, email y datos de contacto cuando agendas un diagnóstico. Además, usamos herramientas de analítica que registran datos de navegación de forma agregada.",
  },
  {
    title: "3. Para qué los usamos",
    body: "Para coordinar la reunión de diagnóstico que solicitaste, enviarte el caso mensual del newsletter si te suscribiste, y mejorar el sitio a partir de cómo se usa. No vendemos ni arrendamos tus datos a terceros.",
  },
  {
    title: "4. Herramientas de terceros",
    body: "Usamos Brevo para el agendamiento de reuniones y el envío de newsletters, y Google Tag Manager / herramientas de analítica y publicidad para medir el rendimiento del sitio. Cada una trata los datos según sus propias políticas de privacidad.",
  },
  {
    title: "5. Cookies",
    body: "Este sitio usa cookies y tecnologías similares para medir la navegación y el rendimiento de nuestras campañas. Puedes bloquearlas o eliminarlas desde la configuración de tu navegador.",
  },
  {
    title: "6. Tus derechos",
    body: "Puedes solicitar en cualquier momento el acceso, rectificación o eliminación de tus datos, o darte de baja del newsletter desde el enlace incluido en cada correo. Escríbenos a prismadigital.io@gmail.com y responderemos a la brevedad.",
  },
  {
    title: "7. Modificaciones",
    body: "Prisma Digital puede actualizar esta política en cualquier momento. La versión vigente será siempre la publicada en esta página.",
  },
];

function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="nl-dark pt-28 pb-14 md:pt-36 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.15] text-balance">
            Política de Privacidad
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
