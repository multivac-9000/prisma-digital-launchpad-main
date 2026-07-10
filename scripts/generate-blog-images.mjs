// Genera las imágenes de portada (que además son la imagen OG) de cada post
// del blog, con la identidad visual de Prisma Digital. Mismo lenguaje que las
// imágenes OG de las páginas (ver generate-og-images.mjs).
//
// Uso puntual (no forma parte del build). `sharp` NO es dependencia del proyecto
// (rompería el install de Vercel); instálalo solo para generar:
//   npm i -D sharp && node scripts/generate-blog-images.mjs && npm rm sharp
//
// Salida: public/blog/<slug>.png (1200×630). Al añadir un post nuevo, agrega su
// entrada en POSTS y vuelve a correr el script. Los PNG se commitean.

import sharp from "sharp";
import { mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join("public", "blog");
mkdirSync(OUT_DIR, { recursive: true });

const NAVY = "#000139";
const CYAN = "#32d6ff";
const MAGENTA = "#d713f9";
const RED = "#fd3833";
const WHITE = "#ffffff";
const LOGO = "public/Logo Prisma Digital blanco.webp";

const ACCENT = { cyan: CYAN, magenta: MAGENTA, red: RED };

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
  for (let i = 0; i < 46; i++) nodes.push({ x: rand() * 1200, y: rand() * 630, r: 1 + rand() * 2.4 });
  let lines = "";
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < 150)
        lines += `<line x1="${nodes[i].x.toFixed(1)}" y1="${nodes[i].y.toFixed(1)}" x2="${nodes[j].x.toFixed(1)}" y2="${nodes[j].y.toFixed(1)}" stroke="${WHITE}" stroke-opacity="${(0.16 * (1 - d / 150)).toFixed(3)}" stroke-width="1"/>`;
    }
  let dots = "";
  nodes.forEach((n, i) => {
    dots += `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${i % 5 === 0 ? accent : WHITE}" fill-opacity="${i % 5 === 0 ? 0.9 : 0.35}"/>`;
  });
  return lines + dots;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildSvg({ eyebrow, lines, footer, accent, seed }) {
  const headline = lines
    .map((l, i) => `<tspan x="90" dy="${i === 0 ? 0 : 78}">${esc(l)}</tspan>`)
    .join("");
  const fontSize = lines.length >= 3 ? 58 : 66;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="spectrum" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${CYAN}"/><stop offset="0.55" stop-color="${MAGENTA}"/><stop offset="1" stop-color="${RED}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.82" cy="0.16" r="0.9">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.42"/>
      <stop offset="0.45" stop-color="${accent}" stop-opacity="0.10"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vignette" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity="0.35"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="${NAVY}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g>${constellation(seed, accent)}</g>
  <rect width="1200" height="630" fill="url(#vignette)"/>
  <g transform="translate(980,300)" opacity="0.9">
    <polygon points="0,-96 84,60 -84,60" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="2.5"/>
    <line x1="-150" y1="18" x2="-16" y2="6" stroke="${WHITE}" stroke-opacity="0.5" stroke-width="2"/>
    <line x1="26" y1="14" x2="150" y2="-18" stroke="${CYAN}" stroke-opacity="0.8" stroke-width="2"/>
    <line x1="26" y1="22" x2="156" y2="10" stroke="${MAGENTA}" stroke-opacity="0.8" stroke-width="2"/>
    <line x1="26" y1="30" x2="150" y2="40" stroke="${RED}" stroke-opacity="0.8" stroke-width="2"/>
  </g>
  <!-- Pill "BLOG" + barra de acento -->
  <rect x="90" y="150" width="132" height="40" rx="20" fill="none" stroke="${accent}" stroke-opacity="0.6" stroke-width="2"/>
  <text x="156" y="177" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" letter-spacing="3" fill="${accent}">BLOG</text>
  <text x="90" y="248" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700" letter-spacing="4" fill="${accent}">${esc(eyebrow)}</text>
  <text x="90" y="${lines.length >= 3 ? 322 : 344}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="800" fill="${WHITE}" letter-spacing="-1">${headline}</text>
  <text x="90" y="556" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" fill="${accent}">prismadigital.io/blog</text>
  <text x="90" y="596" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="500" fill="${WHITE}" fill-opacity="0.72">${esc(footer)}</text>
</svg>`;
}

const POSTS = [
  { slug: "index", accent: "magenta", seed: 5, eyebrow: "BLOG DE PRISMA DIGITAL", lines: ["Marketing, datos", "y medición"], footer: "Guías prácticas para crecer con datos" },
  { slug: "herramientas-digitales-imprescindibles", accent: "cyan", seed: 11, eyebrow: "HERRAMIENTAS DIGITALES", lines: ["12 herramientas", "digitales clave"], footer: "La caja de herramientas de un negocio consolidado" },
  { slug: "buenas-practicas-higiene-de-datos", accent: "magenta", seed: 19, eyebrow: "BUENAS PRÁCTICAS", lines: ["Higiene de datos", "para decidir mejor"], footer: "Datos limpios, decisiones confiables" },
  { slug: "tips-marketing-bajar-cpa", accent: "red", seed: 27, eyebrow: "TIPS DE MARKETING", lines: ["Baja tu CPA", "sin perder ventas"], footer: "7 tácticas medibles para tu pauta" },
  { slug: "seo-tecnico-checklist-desarrollo", accent: "cyan", seed: 33, eyebrow: "DESARROLLO Y SEO", lines: ["SEO técnico:", "checklist de dev"], footer: "Lo que sí mueve tu posicionamiento" },
  { slug: "tipos-de-graficos-cuando-usar-cada-uno", accent: "magenta", seed: 41, eyebrow: "TIPOS DE GRÁFICOS", lines: ["Qué gráfico usar", "según tus datos"], footer: "Guía práctica con ejemplos" },
  { slug: "analisis-digital-datos-a-decisiones", accent: "red", seed: 47, eyebrow: "ANÁLISIS DIGITAL", lines: ["De los datos", "a las decisiones"], footer: "Análisis digital para dueños de negocio" },
  { slug: "ratios-y-tasas-marketing-clave", accent: "cyan", seed: 53, eyebrow: "RATIOS Y TASAS", lines: ["10 ratios que", "debes medir"], footer: "Las métricas que revelan tu salud comercial" },
  { slug: "medicion-de-eventos-sin-perder-datos", accent: "magenta", seed: 61, eyebrow: "TIPS DE MEDICIÓN", lines: ["Deja de perder", "datos por cookies"], footer: "Medición de eventos server-side" },
  { slug: "que-es-martech-como-armar-stack", accent: "red", seed: 67, eyebrow: "MARTECH", lines: ["Arma tu stack", "martech sin morir"], footer: "Marketing + tecnología, bien integrados" },
];

const logoBuf = await sharp(LOGO).resize({ height: 84 }).png().toBuffer();

for (const post of POSTS) {
  const svg = buildSvg({ ...post, accent: ACCENT[post.accent] });
  await sharp(Buffer.from(svg))
    .composite([{ input: logoBuf, top: 60, left: 90 }])
    .png({ compressionLevel: 9, palette: false })
    .toFile(join(OUT_DIR, `${post.slug}.png`));
  console.log(`✓ blog/${post.slug}.png`);
}

console.log("\nListo. Portadas del blog en public/blog/");
