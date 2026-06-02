import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Banner from "@/components/Banner";
import Contact from "@/components/Contact";
import Clients from "@/components/Clients";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prisma Digital — Más clientes en 90 días. Garantizado." },
      {
        name: "description",
        content:
          "Agencia de crecimiento digital. Digitalización, promoción y optimización de negocios con un sistema medible y rentable.",
      },
      { property: "og:title", content: "Prisma Digital" },
      {
        property: "og:description",
        content:
          "Más de 300 negocios han escalado con nuestro método probado. Agenda tu diagnóstico gratis.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Banner />
      <Contact />
      <Clients />
      <Footer />
    </main>
  );
}
