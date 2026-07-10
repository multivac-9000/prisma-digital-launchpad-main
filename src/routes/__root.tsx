import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { initMotionRescue } from "../components/motionRescue";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Prisma Digital — Más clientes en 90 días, con datos no con suposiciones" },
      {
        name: "description",
        content:
          "Agencia de crecimiento digital. Digitalizamos, promocionamos y optimizamos tu negocio con un sistema medible y rentable. Prisma Digital lo hace posible con datos, no con suposiciones.",
      },
      {
        name: "keywords",
        content:
          "agencia marketing digital, crecimiento digital, prospección, digitalización de negocios, publicidad online, embudo de ventas, Prisma Digital",
      },
      { name: "author", content: "Prisma Digital" },
      { name: "theme-color", content: "#000139" },
      { name: "robots", content: "index, follow" },
      { property: "og:site_name", content: "Prisma Digital" },
      { property: "og:title", content: "Prisma Digital — Más clientes en 90 días" },
      {
        property: "og:description",
        content:
          "Llevamos tu empresa al mundo digital y la convertimos en una máquina de prospección predecible. Con datos, no con suposiciones.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_CL" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Prisma Digital — Más clientes en 90 días" },
      {
        name: "twitter:description",
        content:
          "Llevamos tu empresa al mundo digital y la convertimos en una máquina de prospección predecible. Con datos, no con suposiciones.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2776ee0e-5066-4962-b173-e28e1590af60/id-preview-6415bc06--a2eb998e-52bf-454e-a4dc-5da768c3d061.lovable.app-1780349463548.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2776ee0e-5066-4962-b173-e28e1590af60/id-preview-6415bc06--a2eb998e-52bf-454e-a4dc-5da768c3d061.lovable.app-1780349463548.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/webp",
        href: "/Logo Prisma Digital blanco.webp",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

const GTM_ID = "GTM-NLC7LWC";

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager — lo más arriba posible del <head> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {/* Google Tag Manager (noscript) — justo después de <body> */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="gtm"
          />
        </noscript>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  // Vigilante anti-congelamiento: mantiene vivas las animaciones aunque el
  // navegador deje de entregar frames (bug de Chromium multi-monitor).
  useEffect(() => {
    initMotionRescue();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
