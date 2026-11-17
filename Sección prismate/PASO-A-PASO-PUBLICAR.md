# Publicar Prismate en producción · Paso a paso

Objetivo: dejar el chatbot **funcional en prismadigital.io/prismate**, con link en el menú, y hacer QA en producción.

Orden obligatorio (cada paso habilita el siguiente):
**1) n8n (cerebro)** → **2) Deploy app prismate (URL)** → **3) Push del sitio (link + rewrite)** → **4) QA**.

---

## Paso 1 · n8n: credencial Anthropic + activar (≈5 min)

Esto hace que el agente "piense". Hoy el workflow existe pero no tiene con qué responder.

### 1.1 Conseguir la API key de Anthropic
1. Entra a **https://console.anthropic.com** e inicia sesión.
2. Menú **Settings → API keys** (o **API keys** en la barra lateral).
3. **Create Key** → ponle nombre (ej. `n8n Prismate`) → **copia** la clave (empieza con `sk-ant-...`).
   - ⚠️ Solo se muestra una vez. Guárdala bien.
4. Asegúrate de tener **créditos/billing activo** en la cuenta (Settings → Billing). Sin saldo, el agente devuelve error.

### 1.2 Pegar la key en n8n
1. Abre el workflow: **https://seashell-ibis-992075.hostingersite.com/workflow/6fm26JepPx2mMlZK**
2. Doble clic en el nodo **"Claude (Anthropic)"**.
3. En **"Credential to connect with"** → **Create new credential**.
4. Tipo: **Anthropic API** (ya viene seleccionado por el nodo). Campo **API Key**: pega tu `sk-ant-...`.
5. **Save**. El recuadro debe quedar en verde (conexión OK).
6. (Opcional) En **Model** puedes dejar *Claude Sonnet 5* (ya configurado) o elegir otro. **Save** el nodo.

### 1.3 Activar el workflow
1. Arriba a la derecha, activa el switch **"Active"** (Inactive → Active). Confirma si lo pide.
2. Copia la **URL de producción** del webhook: abre el nodo **"Entrada del chat (sitio web)"** → pestaña, verás
   **Production URL:** `https://seashell-ibis-992075.hostingersite.com/webhook/prismate`

### 1.4 Probar el agente (sin tocar el sitio)
Desde una terminal:
```bash
curl -X POST https://seashell-ibis-992075.hostingersite.com/webhook/prismate \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola, ¿qué hace Prisma Digital?","sessionId":"qa-1","perfil":""}'
```
Debe responder algo como `{"reply":"En Prisma Digital ayudamos a negocios consolidados a..."}`.
- Si responde → **el cerebro quedó listo.**
- Si da error 404 → el workflow no está Active. Si error de modelo/credencial → revisa la key y el billing.

---

## Paso 2 · Desplegar la app prismate en Vercel (≈10 min)

La app está en `Sección prismate/prisma/`. Es un proyecto **Next.js** aparte del sitio, así que necesita su **propio proyecto en Vercel**.

### Opción A (recomendada) — repo propio para la app
1. En una terminal, dentro de `Sección prismate/prisma/`:
   ```bash
   git init
   git add .
   git commit -m "Prismate app (chatbot + escaneo) bajo /prismate"
   ```
2. Crea un repo nuevo en GitHub (ej. **prismate-app**) y súbelo:
   ```bash
   git remote add origin https://github.com/multivac-9000/prismate-app.git
   git branch -M main
   git push -u origin main
   ```
3. En **Vercel → Add New → Project** → importa **prismate-app**.
   - Framework: **Next.js** (se detecta solo). No cambies el build.
4. En **Environment Variables** agrega:
   | Name | Value |
   |---|---|
   | `N8N_PRISMATE_WEBHOOK_URL` | `https://seashell-ibis-992075.hostingersite.com/webhook/prismate` |
5. **Deploy**. Al terminar, copia la **URL del deploy**, ej. `https://prismate-app-xxxx.vercel.app`.
6. Verifica que abre: **`https://prismate-app-xxxx.vercel.app/prismate`** (su home) y
   **`.../prismate/prismate`** (el chatbot). Haz un escaneo y prueba el chat ahí mismo.

### Opción B — mismo repo (monorepo)
Si prefieres no crear otro repo: commitea la carpeta en este repo y en Vercel crea un **2º proyecto**
con **Root Directory = `Sección prismate/prisma`**. Resto igual (env var + deploy). Si Vercel se queja
por el espacio/acento del nombre, renombra la carpeta a `prismate-app` y usa esa ruta.

> Nota: NO toques el proyecto Vercel actual del sitio; este es un proyecto nuevo e independiente.

---

## Paso 3 · Publicar el sitio con el link y el rewrite (lo hago yo)

Ya dejé listos en **este** repo (el del sitio):
- **Link "Prismate" en el menú** (desktop y móvil) → `src/components/Navbar.tsx`.
- **Rewrite** en `vercel.json` con un marcador `PRISMATE-DEPLOY-URL.vercel.app`.

Cuando me pases la **URL del Paso 2**, yo:
1. Reemplazo `PRISMATE-DEPLOY-URL.vercel.app` por tu URL real en `vercel.json`.
2. Hago **commit + push a `main`** → Vercel despliega el sitio automáticamente.
3. Desde ese momento, **prismadigital.io/prismate** sirve la app y el menú tiene el acceso.

> Por qué en este orden: si publicamos el link/rewrite antes de que exista el deploy de prismate,
> `prismadigital.io/prismate` quedaría roto para visitantes reales. Por eso el push va al final.

El `vercel.json` quedará así (con tu URL):
```json
{
  "buildCommand": "bun run build",
  "env": { "DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS": "1" },
  "rewrites": [
    { "source": "/prismate", "destination": "https://TU-URL.vercel.app/prismate" },
    { "source": "/prismate/:path*", "destination": "https://TU-URL.vercel.app/prismate/:path*" }
  ]
}
```

---

## Paso 4 · QA en producción

1. Abre **prismadigital.io** → clic en **"Prismate"** en el menú → debe cargar la home de prismate (con sus efectos).
2. Entra al chatbot (botón del hero / `/prismate/prismate`), haz el **escaneo** (9 preguntas).
3. Escríbele a Prismate. Debe responder con la voz de Prisma Digital y llevar a agendar el diagnóstico.
4. Revisa en n8n → **Executions** del workflow que cada mensaje registró una ejecución OK.
5. Cierra y vuelve a abrir: debe **recordar** la conversación (memoria por sesión).
6. Pruébalo en **móvil** (hero + chat usables, CTA visible).
7. Confirma que la **landing `/` y el resto del sitio** siguen idénticos (el rewrite solo afecta `/prismate*`).

### Si algo falla
- Chat dice "no pudo responder": revisa `N8N_PRISMATE_WEBHOOK_URL` en Vercel (proyecto prismate) y que el workflow esté **Active** con la credencial Anthropic.
- `/prismate` da 404 en prod: revisa que el `vercel.json` del sitio tenga la URL real y que el deploy del sitio haya terminado.
- Assets/logo rotos: confirma que el deploy de prismate usa `basePath: "/prismate"` (ya está en el código).

---

## Qué dejamos para después (no bloquea el QA)
- Login con Firebase (hoy el chat es abierto).
- Streaming token-a-token y que el agente auto-actualice el plan/memoria del panel (tools en n8n).
- Entrada de chat "sin escaneo" para visitante nuevo.
- Fusión visual: portar los efectos de prismate (three.js) al resto del sitio.
