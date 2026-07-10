import sharp from "sharp";
import { writeFileSync, statSync } from "node:fs";

// slug -> URL (URLs únicas; Ecstatic LAB reusa rassayana)
const targets = [
  ["prisma-digital", "https://www.prismadigital.io"],
  ["ecstatic-dance", "https://www.ecstaticdancechile.cl"],
  ["sadhana-core", "https://www.sadhanacore.cl"],
  ["rassayana", "https://www.rassayana.com"],
  ["mundo-deco", "https://www.mundodecostore.cl"],
  ["lolalash", "https://www.lolalash.cl"],
  ["quality-clicks", "https://www.qualityclicks.cl"],
  ["emporio-nacional", "https://www.emporionacional.cl"],
  ["adalia", "https://www.adalia.app"],
  ["marco-schulz", "https://www.drmarcoschulz.cl"],
  ["el-director", "https://www.eldirectorclinicadental.com"],
];

const OUT = "public/portfolio";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function grab(slug, url) {
  const api = `https://image.thum.io/get/width/1280/crop/820/noanimate/${url}`;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(api, { signal: AbortSignal.timeout(70000) });
      const buf = Buffer.from(await res.arrayBuffer());
      const meta = await sharp(buf).metadata();
      // Un placeholder de carga es GIF o muy chico; exigimos PNG/JPEG real y ancho pleno
      if ((meta.format === "png" || meta.format === "jpeg") && meta.width >= 1000 && buf.length > 40000) {
        await sharp(buf).resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 80 }).toFile(`${OUT}/${slug}.webp`);
        const kb = Math.round(statSync(`${OUT}/${slug}.webp`).size / 1024);
        return `OK  ${slug.padEnd(18)} ${meta.width}x${meta.height} -> ${kb}KB`;
      }
      return await retryWait(slug, url, attempt);
    } catch (e) {
      if (attempt === 4) return `FAIL ${slug}: ${e.message}`;
      await sleep(6000);
    }
  }
}
async function retryWait(slug, url, attempt) {
  if (attempt >= 4) return `FAIL ${slug}: solo placeholder tras ${attempt} intentos`;
  await sleep(9000);
  return grab(slug, url); // simple recursión; el nuevo intento parte de attempt=1 pero el sitio ya está caliente
}

const results = [];
for (const [slug, url] of targets) {
  results.push(await grab(slug, url));
  console.log(results[results.length - 1]);
}
writeFileSync(`${OUT}/_report.txt`, results.join("\n"));
console.log("\n=== FIN ===");
