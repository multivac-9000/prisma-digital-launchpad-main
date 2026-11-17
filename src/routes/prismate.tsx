import { createFileRoute } from "@tanstack/react-router";
import { buildGraph, webPage, breadcrumb } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress, Reveal } from "@/components/nueva/scrolly";
import PrismateChat from "@/components/prismate/PrismateChat";

const CANONICAL_URL = "https://www.prismadigital.io/prismate";

const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Prismate — asistente IA de Prisma Digital",
    description:
      "Conversa con Prismate, el asistente con IA de Prisma Digital. Resuelve tus dudas y te ayuda a escalar tus ventas online con datos.",
    image: "https://prismadigital.io/og/og-home.png",
    withBreadcrumb: true,
  }),
  breadcrumb(CANONICAL_URL, "Prismate"),
);

export const Route = createFileRoute("/prismate")({
  head: () => ({
    meta: [
      { title: "Prismate — asistente IA de Prisma Digital" },
      {
        name: "description",
        content:
          "Conversa con Prismate, el asistente con IA de Prisma Digital: resuelve dudas y te orienta para duplicar tus ventas online con datos.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Prismate — asistente IA de Prisma Digital" },
      {
        property: "og:description",
        content: "Conversa con el asistente con IA de Prisma Digital y escala tus ventas online con datos.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://prismadigital.io/og/og-home.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1200" },
      { name: "twitter:title", content: "Prismate — asistente IA de Prisma Digital" },
      {
        name: "twitter:description",
        content: "Conversa con el asistente con IA de Prisma Digital y escala tus ventas online con datos.",
      },
      { name: "twitter:image", content: "https://prismadigital.io/og/og-home.png" },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: PrismatePage,
});

function PrismatePage() {
  return (
    <main className="nl-page min-h-screen bg-background">
      <noscript>
        <style>{`.nl-reveal,.nl-word{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />

      <section className="nl-dark relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="nl-grain absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="nl-aura" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-prisma-cyan backdrop-blur-sm">
              Nuevo · Asistente con IA
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-[1.08] tracking-tight text-balance">
              Habla con Prismate
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
              El asistente con IA de Prisma Digital. Pregúntale por nuestros servicios, casos y cómo
              <span className="text-white"> duplicar tus ventas online con datos</span>. Si quieres, te lleva directo a
              agendar tu diagnóstico gratis.
            </p>
          </div>

          <Reveal variant="up" delay={80} className="mt-10">
            <PrismateChat />
          </Reveal>

          <p className="mt-5 text-center text-xs text-white/45">
            Prismate puede equivocarse. Para decisiones importantes, agenda tu diagnóstico con el equipo.
          </p>
        </div>
      </section>

      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
