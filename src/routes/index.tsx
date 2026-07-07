import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroNueva from "@/components/nueva/HeroNueva";
import ResultadosNueva from "@/components/nueva/ResultadosNueva";
import DolorNueva from "@/components/nueva/DolorNueva";
import ServiciosNueva from "@/components/nueva/ServiciosNueva";
import GarantiaNueva from "@/components/nueva/GarantiaNueva";
import ContactoNueva from "@/components/nueva/ContactoNueva";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress } from "@/components/nueva/scrolly";

const CANONICAL_URL = "https://www.prismadigital.io/";

// Datos estructurados para rich snippets (Organization + LocalBusiness).
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Prisma Digital",
      url: "https://www.prismadigital.io/",
      logo: "https://www.prismadigital.io/Logo Prisma Digital blanco.webp",
      email: "prismadigital.io@gmail.com",
      telephone: "+56957151303",
      sameAs: [
        "https://www.instagram.com/prismadigital.io/",
        "https://www.facebook.com/share/1Fu2MFXigF/",
        "https://www.linkedin.com/in/prisma-digital-6b6b86202/",
      ],
    },
    {
      "@type": "LocalBusiness",
      name: "Prisma Digital",
      image: "https://www.prismadigital.io/Logo Prisma Digital blanco.webp",
      url: "https://www.prismadigital.io/",
      telephone: "+56957151303",
      email: "prismadigital.io@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Concepción",
        addressCountry: "CL",
      },
      description:
        "Agencia de crecimiento digital para empresas consolidadas: integramos y medimos ecosistemas digitales para duplicar ventas online.",
    },
  ],
});

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      // Título ≤60 caracteres; la garantía real está en la sección #garantia.
      { title: "Prisma Digital — Duplica tus ventas online con datos" },
      {
        name: "description",
        content:
          "Modernizamos y medimos el ecosistema digital de negocios con años de trayectoria para duplicar sus ventas online. Agenda tu diagnóstico gratis.",
      },
      { property: "og:title", content: "Prisma Digital — Duplica tus ventas online con datos" },
      {
        property: "og:description",
        content:
          "Tu marca ya tiene trayectoria. Integramos y medimos tu ecosistema digital para que lo online venda igual de fuerte. Diagnóstico gratis y avances medibles en 90 días.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { name: "twitter:title", content: "Prisma Digital — Duplica tus ventas online con datos" },
      {
        name: "twitter:description",
        content:
          "Integramos y medimos tu ecosistema digital para duplicar tus ventas online. Diagnóstico gratis.",
      },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      // El CTA abre la agenda de Brevo: la conexión ya está caliente al clic.
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="nl-page min-h-screen bg-background">
      {/* Sin JS los revelados quedan visibles (los bots leen el DOM igual) */}
      <noscript>
        <style>{`.nl-reveal,.nl-word,.nl-badge-anim{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />
      <HeroNueva />
      <ResultadosNueva />
      <DolorNueva />
      <ServiciosNueva />
      <GarantiaNueva />
      <ContactoNueva />
      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
