import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { buildGraph, webPage, breadcrumb } from "@/lib/schema";
import { Reveal } from "@/components/nueva/scrolly";
import PrismateUniverse from "@/components/prismate/PrismateUniverse";
import PrismateChat from "@/components/prismate/PrismateChat";

const CANONICAL_URL = "https://www.prismadigital.io/prismate";

const JSON_LD = buildGraph(
  webPage({
    url: CANONICAL_URL,
    name: "Prismate — el universo de luz de Prisma Digital",
    description:
      "Explora el prisma de Prisma Digital: 9 colores de luz, cada uno un mercado y un propósito. Y conversa con Prismate, su asistente con IA.",
    image: "https://prismadigital.io/og/og-home.png",
    withBreadcrumb: true,
  }),
  breadcrumb(CANONICAL_URL, "Prismate"),
);

export const Route = createFileRoute("/prismate/")({
  head: () => ({
    meta: [
      { title: "Prismate — el universo de luz de Prisma Digital" },
      {
        name: "description",
        content:
          "Explora el prisma 3D de Prisma Digital: 9 colores de luz, cada uno un mercado y un propósito. Conversa con Prismate, su asistente con IA.",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Prismate — el universo de luz de Prisma Digital" },
      {
        property: "og:description",
        content: "Explora el prisma 3D de Prisma Digital y conversa con Prismate, su asistente con IA.",
      },
      { property: "og:url", content: CANONICAL_URL },
      { property: "og:image", content: "https://prismadigital.io/og/og-home.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "1200" },
      { name: "twitter:title", content: "Prismate — el universo de luz de Prisma Digital" },
      {
        name: "twitter:description",
        content: "Explora el prisma 3D de Prisma Digital y conversa con Prismate, su asistente con IA.",
      },
      { name: "twitter:image", content: "https://prismadigital.io/og/og-home.png" },
    ],
    links: [
      { rel: "canonical", href: CANONICAL_URL },
      { rel: "preconnect", href: "https://meet.brevo.com" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON_LD }],
  }),
  component: PrismateIndex,
});

function PrismateIndex() {
  return (
    <>
      {/* El universo 3D de Prismate */}
      <section className="nl-dark relative overflow-hidden pt-28 pb-14 md:pt-36 md:pb-16">
        <div className="nl-grain absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="nl-aura" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-prisma-cyan backdrop-blur-sm">
              Prismate · Universo de luz
            </span>
            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold text-white leading-[1.08] tracking-tight text-balance">
              Tu luz se separa en 9 colores
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base md:text-lg text-white/80 leading-relaxed">
              Cada color es un mercado y un propósito. Explora el prisma, toca un color para entender su
              significado, y habla con <span className="text-white">Prismate</span> para encontrar el tuyo.
            </p>
            <div className="mt-7 flex justify-center">
              <Link
                to="/prismate/escaneo"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[15px] font-bold text-prisma-navy shadow-xl transition-transform hover:scale-[1.03]"
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Haz tu escaneo · 9 preguntas
              </Link>
            </div>
          </div>

          <Reveal variant="up" delay={80} className="mt-9">
            <PrismateUniverse />
          </Reveal>
        </div>
      </section>

      {/* El chat de Prismate, conectado a n8n */}
      <section id="habla-prismate" className="nl-dark relative overflow-hidden pb-20 pt-4">
        <div className="relative mx-auto max-w-3xl px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight text-balance">
              Habla con Prismate
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75 leading-relaxed">
              Pregúntale por nuestros servicios, casos y cómo recuperar tiempo y crecer con datos —
              estés empezando o quieras optimizar lo que ya tienes.
            </p>
          </div>

          <Reveal variant="up" delay={80} className="mt-8">
            <PrismateChat />
          </Reveal>

          <p className="mt-5 text-center text-xs text-white/45">
            Prismate puede equivocarse. Para decisiones importantes, agenda tu diagnóstico con el equipo.
          </p>
        </div>
      </section>
    </>
  );
}
