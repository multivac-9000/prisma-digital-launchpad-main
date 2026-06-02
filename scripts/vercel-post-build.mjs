// Nitro v3 (beta) con preset "vercel" deja la salida en dist/{client,server,config.json}
// con un config.json version 3, pero NO ensambla la estructura .vercel/output que el
// Build Output API de Vercel consume. Este script arma esa estructura desde dist/.
//
// Estructura final esperada por Vercel (Build Output API v3):
//   .vercel/output/
//     config.json
//     static/                      <- dist/client
//     functions/__server.func/
//       index.mjs                  <- dist/server/index.mjs (+ chunks)
//       .vc-config.json
import {
  existsSync,
  rmSync,
  mkdirSync,
  cpSync,
  copyFileSync,
  writeFileSync,
  readFileSync,
} from "fs";
import { join } from "path";

const distDir = "dist";
const distClient = join(distDir, "client");
const distServer = join(distDir, "server");
const distConfig = join(distDir, "config.json");

if (!existsSync(distServer) || !existsSync(distConfig)) {
  console.error(
    "[vercel-post-build] No se encontró dist/server o dist/config.json. ¿Corrió `vite build` con el preset vercel de nitro?",
  );
  process.exit(1);
}

const outRoot = join(".vercel", "output");
const outStatic = join(outRoot, "static");
const outFuncDir = join(outRoot, "functions", "__server.func");

// Empezar limpio para evitar restos de builds anteriores.
rmSync(outRoot, { recursive: true, force: true });
mkdirSync(outStatic, { recursive: true });
mkdirSync(outFuncDir, { recursive: true });

// 1) config.json (routes / version 3) tal cual lo generó nitro.
copyFileSync(distConfig, join(outRoot, "config.json"));

// 2) Assets estáticos -> static/
if (existsSync(distClient)) {
  cpSync(distClient, outStatic, { recursive: true });
}

// 3) Bundle del servidor SSR -> functions/__server.func/
cpSync(distServer, outFuncDir, { recursive: true });

// 4) Runtime de la función (lo lee Vercel desde .vc-config.json).
let runtime = "nodejs22.x";
const nitroJsonPath = join(distDir, "nitro.json");
if (existsSync(nitroJsonPath)) {
  try {
    const nitroJson = JSON.parse(readFileSync(nitroJsonPath, "utf-8"));
    runtime = nitroJson?.config?.vercel?.functions?.runtime || runtime;
  } catch {
    // usar default
  }
}

writeFileSync(
  join(outFuncDir, ".vc-config.json"),
  JSON.stringify(
    {
      runtime,
      handler: "index.mjs",
      launcherType: "Nodejs",
      shouldAddHelpers: false,
    },
    null,
    2,
  ),
);

console.log(`✓ Build Output API ensamblado en ${outRoot} (runtime: ${runtime})`);
