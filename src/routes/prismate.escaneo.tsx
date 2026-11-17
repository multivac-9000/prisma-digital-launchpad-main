import { createFileRoute } from "@tanstack/react-router";
import Escaneo from "@/components/prismate/Escaneo";

export const Route = createFileRoute("/prismate/escaneo")({
  head: () => ({
    meta: [
      { title: "Escaneo Prismate — encuentra tu luz" },
      {
        name: "description",
        content: "9 preguntas para encontrar tu luz dominante y tu nicho. Luego Prismate te acompaña a convertirlo en un negocio con datos.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://www.prismadigital.io/prismate/escaneo" }],
  }),
  component: EscaneoPage,
});

function EscaneoPage() {
  return (
    <section className="nl-dark relative overflow-hidden pt-28 pb-24 md:pt-36">
      <div className="nl-grain absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="nl-aura" />
      </div>
      <div className="relative px-6">
        <Escaneo />
      </div>
    </section>
  );
}
