# Prismate → prismadigital.io/prismate · Guía de integración (fase 1)

Esta fase deja **todo el proyecto prismate** servible bajo `prismadigital.io/prismate`, con el
**logo de Prisma Digital**, el **chatbot abierto** (sin login ni pago) y conectado a un **agente en n8n**.

> Arquitectura elegida: **proxy / subpath**. La app prismate (Next.js) se despliega como su propia
> app y el sitio principal (TanStack Start) redirige `/prismate/*` hacia ella. Los dos proyectos se
> mantienen separados por ahora; la fusión "nativa" vendrá después.

---

## 1. Lo que ya quedó hecho en el código

Carpeta `Sección prismate/prisma/` (la app Next.js):

| Archivo | Cambio |
|---|---|
| `next.config.ts` | `basePath: "/prismate"` + `assetPrefix: "/prismate"` → toda la app vive bajo `/prismate`. |
| `middleware.ts` | `/prismate` ahora es **público** (se quitó el candado de sesión). Solo `/cuenta` sigue privado. |
| `app/prismate/page.tsx` | Se quitó el gate de **Plan Pro / login**. El chat se muestra siempre. |
| `components/brand/SiteHeader.tsx` | Logo **Prisma Digital** (blanco) + CTA único "Agendar diagnóstico" (Brevo). Se quitó "Plan Pro"/cuenta. |
| `app/api/agente/route.ts` | Ya **no llama a Anthropic**: reenvía al **webhook de n8n** y devuelve la respuesta al front en el mismo formato de siempre. |
| `public/logo-prisma-digital-blanco.webp` | Logo de Prisma Digital copiado del sitio principal. |
| `.env.example` | Nueva variable `N8N_PRISMATE_WEBHOOK_URL`. Anthropic ya no se usa en el sitio. |

**Contrato sitio → n8n** (lo que envía `/api/agente`):
```json
POST  {N8N_PRISMATE_WEBHOOK_URL}
{ "message": "texto del usuario", "sessionId": "prismate-<codigo-escaneo>", "perfil": "<contexto del escaneo + memoria>", "pagina": "prismadigital.io/prismate" }
```
**Respuesta esperada de n8n:** `{ "reply": "texto" }`

---

## 2. n8n — activar el agente (2 pasos tuyos)

Workflow ya creado (borrador): **Prisma · Agente Prismate (chat del sitio)**
`https://seashell-ibis-992075.hostingersite.com/workflow/6fm26JepPx2mMlZK`

Estructura: **Webhook `/prismate`** → **Normalizar** → **AI Agent (Claude Sonnet + memoria por sesión)** → **Responder JSON**.

1. **Credencial Anthropic.** Abre el nodo **"Claude (Anthropic)"** y asígnale una credencial *Anthropic API*
   con tu API key de `console.anthropic.com`. (No hay ninguna credencial de IA en el n8n todavía.)
2. **Activar el workflow** (switch "Active" arriba a la derecha) para exponer el webhook de producción:
   `https://seashell-ibis-992075.hostingersite.com/webhook/prismate`

   Mientras pruebas sin activarlo, el nodo da una URL de test `.../webhook-test/prismate` que solo
   funciona al pulsar "Execute workflow".

> Memoria: el agente recuerda cada conversación por `sessionId` (ventana de 12 turnos). El perfil del
> escaneo y el plan viajan en `perfil` en cada mensaje, así el modo **coach** tiene contexto.

---

## 3. Desplegar la app prismate (tu Vercel)

La app prismate es un proyecto Next.js aparte. Opción recomendada: **nuevo proyecto en Vercel**.

1. Sube `Sección prismate/prisma/` como repo propio (o como subdirectorio con "Root Directory" = esa carpeta).
2. En Vercel → **Environment Variables** del proyecto prismate:
   - `N8N_PRISMATE_WEBHOOK_URL = https://seashell-ibis-992075.hostingersite.com/webhook/prismate`
   - (Supabase/Mercado Pago/Anthropic pueden quedar vacías en esta fase.)
3. Deploy. Anota la URL del deploy, p. ej. `https://prismate-xxxx.vercel.app`.
   Como tiene `basePath`, su home queda en `https://prismate-xxxx.vercel.app/prismate`.

---

## 4. Conectar `prismadigital.io/prismate` → la app prismate (rewrite)

En el **repo del sitio principal** (`multivac-9000/prisma-digital-launchpad-main`), agrega los rewrites a
`vercel.json`. **No lo modifiqué yo** para no arriesgar el deploy de la landing; este es el snippet exacto:

```json
{
  "buildCommand": "bun run build",
  "env": { "DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS": "1" },
  "rewrites": [
    { "source": "/prismate", "destination": "https://prismate-xxxx.vercel.app/prismate" },
    { "source": "/prismate/:path*", "destination": "https://prismate-xxxx.vercel.app/prismate/:path*" }
  ]
}
```
Reemplaza `prismate-xxxx.vercel.app` por la URL real del paso 3. Tras el deploy del sitio,
`prismadigital.io/prismate` servirá la app prismate.

> La landing `/` y el resto del sitio no se tocan: el rewrite solo intercepta `/prismate*`.

---

## 5. Mapa de URLs resultante

- `prismadigital.io/prismate` → **home de prismate** (el hero con los efectos visuales).
- `prismadigital.io/prismate/prismate` → **el chatbot Prismate** (la "guía"). *(queda así porque la
  página del chat se llama `prismate` dentro de la app; se puede renombrar después.)*
- `prismadigital.io/prismate/escaneo`, `/universo`, `/metodo`, `/resultado/...`, etc. → el resto del proyecto.

---

## 6. Limitaciones conocidas de esta fase (para "seguir mejorando")

1. **Sin streaming token-por-token.** El webhook de n8n responde completo; el chat muestra
   "escribiendo…" y luego el texto. (Recuperable con un webhook en modo streaming más adelante.)
2. **El agente no auto-actualiza el plan ni la memoria** del panel lateral (las herramientas
   `guardar_recuerdo` / `actualizar_plan` del Anthropic original no están replicadas en n8n todavía).
   El plan/los datos se siguen editando a mano en la UI. Se pueden añadir como *tools* del AI Agent.
3. **Entrada "asistente de agencia sin escaneo".** Hoy el chat aparece tras el escaneo (modo coach).
   El agente ya es híbrido en n8n; falta el punto de entrada de UI para chatear sin escaneo
   (visitante nuevo). Es el siguiente paso de front.
4. **Login Firebase** y **Plan Pro**: desactivados a propósito en esta fase. Se reactivan después.

---

## 7. Siguiente etapa sugerida (fusión real)

Portar los **efectos visuales ejemplares** de prismate al sitio principal (TanStack Start):
`LightUniverse` (three.js), `PrismTunnel`, `NucleusScene`, `Portal`, `Aura`, y el patrón de scrollytelling.
Requiere añadir `three` + `@react-three/fiber` + `framer-motion` al sitio y adaptar los componentes
de Next (`"use client"`, `next/image`) a TanStack. Se puede hacer sección por sección.
