// Genera las imágenes destacadas (Open Graph / Twitter Card) de las páginas
// indexadas, una distinta por página, con la identidad visual de Prisma Digital.
//
// Formato: 1200×1200 (cuadrado). Es el formato que mejor renderiza WhatsApp
// (nuestra vía de compartido principal). Facebook/LinkedIn/Twitter también
// aceptan cuadrado — el card se ve algo más pequeño que con 1200×630 pero
// no se corta ni deforma, y todo el mensaje queda visible.
//
// Uso puntual (no forma parte del build de Vercel):
//   npm i -D sharp && node scripts/generate-og-images.mjs && npm rm sharp
//
// Salida: public/og/og-*.png

import sharp from "sharp";
import { mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join("public", "og");
mkdirSync(OUT_DIR, { recursive: true });

// Paleta de marca (idéntica a src/styles.css / CLAUDE.md).
const NAVY = "#000139";
const CYAN = "#32d6ff";
const MAGENTA = "#d713f9";
const RED = "#fd3833";
const WHITE = "#ffffff";

const LOGO = "public/Logo Prisma Digital blanco.webp";

const SIZE = 1200; // cuadrado 1200×1200

// PRNG determinista (mulberry32) para que la constelación sea estable entre
// ejecuciones y no genere diffs innecesarios.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function constellation(seed, accent) {
  const rand = mulberry32(seed);
  const nodes = [];
  for (let i = 0; i < 70; i++) {
    nodes.push({ x: rand() * SIZE, y: rand() * SIZE, r: 1 + rand() * 2.6 });
  }
  let lines = "";
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.hypot(dx, dy);
      if (d < 170) {
        const op = (0.16 * (1 - d / 170)).toFixed(3);
        lines += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="${WHITE}" stroke-opacity="${op}" stroke-width="1"/>`;
      }
    }
  }
  let dots = "";
  nodes.forEach((n, i) => {
    const fill = i % 5 === 0 ? accent : WHITE;
    const op = i % 5 === 0 ? 0.9 : 0.35;
    dots += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${fill}" fill-opacity="${op}"/>`;
  });
  return lines + dots;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSvg({ eyebrow, lines, footer, accent, seed, spectrum }) {
  const barFill = spectrum ? "url(#spectrum)" : accent;
  const headline = lines
    .map((l, i) => `<tspan x="100" dy="${i === 0 ? 0 : 96}">${esc(l)}</tspan>`)
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${CYAN}"/>
      <stop offset="0.55" stop-color="${MAGENTA}"/>
      <stop offset="1" stop-color="${RED}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.15" r="0.85">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.42"/>
      <stop offset="0.45" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000000" stop-opacity="0.35"/>
    </linearGradient>
  </defs>

  <rect width="${SIZE}" height="${SIZE}" fill="${NAVY}"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#glow)"/>
  <g>${constellation(seed, accent)}</g>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#vignette)"/>

  <!-- Prisma: triángulo refractando el espectro (firma de marca, esquina inf. derecha) -->
  <g transform="translate(970,880)" opacity="0.85">
    <polygon points="0,-110 96,72 -96,72" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="2.5"/>
    <line x1="-170" y1="22" x2="-18" y2="8" stroke="${WHITE}" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="30" y1="16" x2="170" y2="-22" stroke="${CYAN}" stroke-opacity="0.85" stroke-width="2"/>
    <line x1="30" y1="26" x2="176" y2="12" stroke="${MAGENTA}" stroke-opacity="0.85" stroke-width="2"/>
    <line x1="30" y1="36" x2="170" y2="46" stroke="${RED}" stroke-opacity="0.85" stroke-width="2"/>
  </g>

  <!-- Barra de acento -->
  <rect x="100" y="430" width="120" height="10" rx="5" fill="${barFill}"/>

  <!-- Eyebrow / categoría -->
  <text x="100" y="500" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700"
        letter-spacing="4" fill="${accent}">${esc(eyebrow)}</text>

  <!-- Titular (dos líneas centradas verticalmente en el frame) -->
  <text x="100" y="620" font-family="Arial, Helvetica, sans-serif" font-size="82" font-weight="800"
        fill="${WHITE}" letter-spacing="-1.5">${headline}</text>

  <!-- Footer: URL + descriptor (abajo, con aire) -->
  <text x="100" y="1050" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="800"
        fill="${accent}">prismadigital.io</text>
  <text x="100" y="1100" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="500"
        fill="${WHITE}" fill-opacity="0.72">${esc(footer)}</text>
</svg>`;
}

const CARDS = [
  {
    file: "og-home.png",
    accent: MAGENTA,
    spectrum: true,
    seed: 7,
    eyebrow: "AGENCIA DE CRECIMIENTO DIGITAL",
    lines: ["Duplica tus ventas", "online con datos"],
    footer: "Diagnóstico gratis · Avances medibles en 90 días",
  },
  {
    file: "og-digitalizacion.png",
    accent: CYAN,
    spectrum: false,
    seed: 21,
    eyebrow: "DIGITALIZACIÓN DE NEGOCIOS",
    lines: ["Sitios web hechos", "para vender"],
    footer: "Web + stock + ventas + clientes, todo medido",
  },
  {
    file: "og-promocion.png",
    accent: MAGENTA,
    spectrum: false,
    seed: 34,
    eyebrow: "PROMOCIÓN DE NEGOCIOS",
    lines: ["Captación predecible", "y medible"],
    footer: "Meta Ads · Google Ads · Embudos · Audiovisual",
  },
  {
    file: "og-optimizacion.png",
    accent: RED,
    spectrum: false,
    seed: 48,
    eyebrow: "OPTIMIZACIÓN Y MEDICIÓN",
    lines: ["Mide lo que importa.", "Baja tu CPA."],
    footer: "GA4 · Conversions API · Server-Side GTM · Looker",
  },
];

const logoBuf = await sharp(LOGO).resize({ height: 110 }).png().toBuffer();

for (const card of CARDS) {
  const svg = buildSvg(card);
  const base = sharp(Buffer.from(svg));
  const out = join(OUT_DIR, card.file);
  await base
    .composite([{ input: logoBuf, top: 100, left: 100 }])
    .png({ compressionLevel: 9, palette: false })
    .toFile(out);
  const meta = await sharp(out).metadata();
  console.log(`✓ ${card.file}  ${meta.width}x${meta.height}  ${(meta.size / 1024).toFixed(0)} KB`);
}

console.log("\nListo. Imágenes OG cuadradas en public/og/");
