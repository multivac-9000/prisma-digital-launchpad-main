# Sitio Prisma Digital — Instrucciones Base para Claude

## Qué es este repo

Landing page de Prisma Digital (https://www.prismadigital.io/). Se despliega en Vercel automáticamente al hacer push a `main` en GitHub (`multivac-9000/prisma-digital-launchpad-main`).

- Stack: TanStack Start (React 19 + Vite 7, SSR) + Tailwind CSS v4 + shadcn/ui + lucide-react.
- Rutas en `/src/routes/` (file-based routing). `routeTree.gen.ts` es autogenerado por el build: nunca editarlo a mano.
- Build: `npm run build` (vite build + `scripts/vercel-post-build.mjs`). Dev: `npm run dev`.

## Rutas

- `/` — Landing original (público: emprendedores). NO tocar mientras dure el test.
- `/nueva-landing` — Rediseño en prueba (público: empresas consolidadas). Componentes en `/src/components/nueva/`.
- `/gracias-infinitas` — Página de agradecimiento.

## Google Tag Manager (crítico — mantener siempre)

- Contenedor `GTM-NLC7LWC`, inyectado en `src/routes/__root.tsx` (script en `<head>` + noscript en `<body>`). Toda ruta nueva lo hereda automáticamente.
- Los CTA de `/nueva-landing` empujan eventos al dataLayer vía `src/components/nueva/track.ts`: evento `cta_click` con `cta_name`, `cta_location` y `page_variant: "nueva-landing"`. Mantener este patrón en componentes nuevos.

## Identidad visual (mantener intacta)

- Fondo azul marino profundo `#000139` (`--prisma-navy`), acentos magenta `#d713f9` y cian `#32d6ff`, rojo `#fd3833`, CTA amarillo `#fecd2b`.
- Gradientes definidos en `src/styles.css`: `--gradient-hero` (fondo oscuro), `--gradient-brand` (cian→magenta), `--gradient-agenda` (amarillo, exclusivo para CTA de agendar).
- Motivo de marca: red de constelaciones/datos (canvas animado del hero, respeta `prefers-reduced-motion`).

## Posicionamiento (regla que atraviesa todo el copy de /nueva-landing)

- Público: negocios con 10+ años de trayectoria, reconocidos por su presencia física (restaurantes, pubs, automotoras, farmacias, pet shops, retail de servicios), sin célula de martech, que quieren duplicar sus ventas online.
- Perfiles que agendan: dueños/gerentes, jefes de células de desarrollo (no saben medir eventos de sus aplicativos) y jefes de marketing (necesitan bajar CPA con buena marcación de objetivos).
- PROHIBIDO en el copy: "tienda desde cero", "vendiendo solo", "tus primeros clientes", "para emprendedores". Este cliente YA vende; el salto es escalar, no nacer.
- Registro emocional en orden: alivio → alegría/esperanza → confianza (respaldada con métricas y clientes reales).
- Textos ancla: Visión "impulsar decisiones digitales basadas en datos y con propósito humano en empresas consolidadas"; Misión "fortalecer los pilares del ecosistema digital midiendo lo importante"; Propósito "potenciar los activos digitales de empresas que buscan modernizar su presencia".

## Reglas de conversión y UX

- Un solo camino de conversión: todos los CTA principales llevan a agendar diagnóstico (https://meet.brevo.com/prisma-digital).
- El amarillo (`--gradient-agenda`) se reserva EXCLUSIVAMENTE para el CTA de agenda; ningún otro elemento debe usarlo.
- "Sin compromiso / sin presión / gratis": máximo UNA mención de "sin compromiso" por página.
- La garantía explícita ("avances medibles en 90 días o seguimos sin costo") vive en la sección `#garantia` de /nueva-landing; si se quita, quitar también "Garantizado" de cualquier `<title>`.
- Mobile-first: hero + titular + CTA visibles sin scroll; CTA flotante en móvil (`FloatingCta.tsx`); cuerpo mínimo 16px.

## SEO

- Un solo `<h1>` por página (el del hero). Jerarquía h1 → h2 (secciones) → h3 (tarjetas).
- `<title>` ≤60 caracteres, meta description ≤155, alineados al beneficio ("duplica tus ventas online con datos").
- Keywords del avatar en h1/h2 y primeros párrafos: digitalizar negocio físico, ecosistema digital integrado, medición de eventos web y apps, reducir CPA, duplicar ventas online.
- `alt` descriptivo en todas las imágenes ("Logo Fexmin, cliente de Prisma Digital").
- JSON-LD `Organization` + `LocalBusiness` en el head de la ruta (ver `nueva-landing.tsx`).
- Open Graph + Twitter Card definidos en `__root.tsx` (base) y sobrescritos por ruta.

## Datos reales del negocio

- Contacto: prismadigital.io@gmail.com · +56 9 5715 1303 · Concepción, Chile.
- Agenda: https://meet.brevo.com/prisma-digital (calendario Brevo). Newsletter: formulario Brevo embebido vía `BrevoForm.tsx` (iframe srcdoc).
- Clientes con logo en `/public/clients/`: Emporio Nacional (+143% ventas online en 60 días), Liberty Seguros (ROAS 4.2x), Küm (+120% leads calificados), Fexmin, Mundo Deco Store, A Todo Vajilla, Ozono, U-Home, La Regalería, Marco Schulz.
- PENDIENTE: los testimonios de `ResultadosNueva.tsx` usan atribución semi-anónima; reemplazar por testimonios reales aprobados antes de promover /nueva-landing a landing oficial.
- PENDIENTE: métrica "+300 negocios escalados" del hero — confirmar cifra real con el equipo.

## Empresa hermana

Sadhana Core (bienestar corporativo) es empresa hermana. El workspace de marketing de Prisma Digital (contenido, ads, agentes) vive en `C:\Users\ruben\Desktop\prisma-digital`.
