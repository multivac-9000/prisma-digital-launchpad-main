import { createFileRoute } from "@tanstack/react-router";
import { buildGraph, webPage } from "@/lib/schema";
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

// Datos estructurados: grafo de marca (Organization + WebSite +
// ProfessionalService) + la WebPage del home. Ver src/lib/schema.ts.
const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Prisma Digital — Duplica tus ventas online con datos",
    description:
      "Modernizamos y medimos el ecosistema digital de negocios con años de trayectoria para duplicar sus ventas online. Agenda tu diagnóstico gratis.",
    image: "https://prismadigital.io/og/og-home.png",
  }),
);

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
          "Integramos y medimos tu ecosistema digital para duplicar tus ventas online.",
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
