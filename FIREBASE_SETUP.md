# Configuración de Firebase para los Assessments de Diagnóstico

El formulario de `/assessment` guarda cada diagnóstico en **Firestore** (colección
`assessments`). Mientras Firebase no esté configurado, el formulario funciona igual:
el borrador se autoguarda en el navegador y el botón **Exportar JSON** descarga el
resultado. El botón "Guardar en Firebase" se habilita solo cuando existen las
variables de entorno.

## Paso 1 — Crear el proyecto

1. Entra a https://console.firebase.google.com con la cuenta Google de Prisma Digital.
2. **Agregar proyecto** → nombre sugerido: `prisma-assessments`.
3. Google Analytics para el proyecto: **desactívalo** (no lo necesitamos; la medición
   del sitio ya vive en GTM).

## Paso 2 — Crear la base de datos Firestore

1. En el menú lateral: **Compilación → Firestore Database → Crear base de datos**.
2. Ubicación: `southamerica-east1` (São Paulo, la más cercana a Chile). No se puede
   cambiar después.
3. Modo: **producción** (las reglas del Paso 4 abren solo lo necesario).

## Paso 3 — Registrar la app web y copiar la config

1. **Configuración del proyecto** (engranaje) → **Tus apps** → icono **Web `</>`**.
2. Alias: `sitio-prisma`. NO marques Firebase Hosting.
3. Firebase te mostrará un bloque `firebaseConfig` como este:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "prisma-assessments.firebaseapp.com",
  projectId: "prisma-assessments",
  storageBucket: "prisma-assessments.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123",
};
```

**Eso es todo lo que necesitas entregar**: esos 6 valores (o un pantallazo del bloque).
Son claves públicas de identificación, no secretos — la seguridad la ponen las reglas.

## Paso 4 — Reglas de seguridad de Firestore

En **Firestore Database → Reglas**, pega y publica:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Assessments: cualquiera puede CREAR (el formulario escribe sin login),
    // pero nadie puede leer, editar ni borrar desde el cliente.
    // Los datos se leen solo desde la consola de Firebase (o BigQuery/Looker).
    match /assessments/{doc} {
      allow create: if request.resource.data.version == 1
                    && request.resource.data.size() < 40;
      allow read, update, delete: if false;
    }
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

Con esto, aunque las claves son públicas, un tercero como máximo podría crear un
documento con el formato del formulario — nunca leer ni borrar los datos.

## Paso 5 — Variables de entorno

### Local (desarrollo)

Copia `.env.example` a `.env` y completa con los valores del Paso 3:

```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=prisma-assessments.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=prisma-assessments
VITE_FIREBASE_STORAGE_BUCKET=prisma-assessments.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:abc123
```

### Vercel (producción)

1. Vercel → proyecto → **Settings → Environment Variables**.
2. Agrega las mismas 6 variables (mismo nombre, con prefijo `VITE_`), en
   **Production, Preview y Development**.
3. **Importante**: son variables de *build* — después de agregarlas hay que hacer un
   **Redeploy** (o un push a `main`) para que queden dentro del bundle.

## Paso 6 — Verificar

1. Entra a `/assessment` (credenciales del equipo), llena un diagnóstico de prueba y
   pulsa **Guardar en Firebase** → debe aparecer "Guardado (id…)".
2. En la consola de Firebase → Firestore → colección `assessments` debe estar el
   documento con `cliente`, `scores`, `pagespeed`, `contexto`, `proyeccion`, `totales`
   y `createdAt`.

## Estructura del documento guardado

| Campo        | Contenido                                                              |
| ------------ | ---------------------------------------------------------------------- |
| `version`    | Versión del esquema del formulario (hoy `1`)                            |
| `cliente`    | empresa, contacto, rubro, sitio, años de trayectoria                    |
| `scores`     | 15 ítems `{ nota: 1–5 \| null, obs: string }`                           |
| `pagespeed`  | puntajes 0–100 móvil y escritorio                                       |
| `contexto`   | objetivos, dolor principal, inversión, % ventas online, herramientas    |
| `proyeccion` | visitas, conversión, ticket + venta actual, meta 90 días y 12 meses     |
| `totales`    | puntos, %, respondidos y subtotales por categoría                       |
| `createdAt`  | timestamp del servidor                                                  |

## Pendientes / siguientes pasos sugeridos

- Cuando haya más usuarios del equipo, migrar la puerta de acceso (usuario/contraseña
  compartida en `src/components/AccessGate.tsx`) a **Firebase Authentication**, y
  cambiar la regla de `create` por `request.auth != null`.
- Para análisis: exportar Firestore a BigQuery o conectar Looker Studio.
