import { createFileRoute, Outlet } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import FooterNueva from "@/components/nueva/FooterNueva";
import FloatingCta from "@/components/nueva/FloatingCta";
import { ScrollProgress } from "@/components/nueva/scrolly";

// Layout de la sección Prismate: navbar + contenido (universo/escaneo) + footer.
export const Route = createFileRoute("/prismate")({
  component: PrismateLayout,
});

function PrismateLayout() {
  return (
    <main className="nl-page min-h-screen bg-background">
      <noscript>
        <style>{`.nl-reveal,.nl-word{opacity:1 !important;transform:none !important;filter:none !important;}`}</style>
      </noscript>
      <ScrollProgress />
      <Navbar />
      <Outlet />
      <FooterNueva />
      <FloatingCta />
    </main>
  );
}
