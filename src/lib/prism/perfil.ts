import { CENTER_BY_ID } from "./bands";
import { computeSpectrum, decodeResult } from "./score";

/**
 * Convierte el código de un escaneo ("j-123456789" / "e-…") en un bloque de
 * perfil en texto que se le envía al agente Prismate (n8n) como contexto, para
 * que pase de "asistente de agencia" a "coach" de esa persona o empresa.
 * Devuelve "" si el código no es válido.
 */
export function buildPerfil(code: string | null | undefined): string {
  if (!code) return "";
  const r = decodeResult(code);
  if (!r) return "";

  const s = computeSpectrum(r.answers, r.mode);
  const [a, b, c] = s.ranking.map((id) => CENTER_BY_ID[id]);
  const empresa = r.mode === "empresa";

  const lines = [
    `Perfil del visitante (${empresa ? "empresa" : "persona"}):`,
    `- Luz dominante: ${a.color} · ${a.name}. ${empresa ? a.brandDescription : a.description}`,
    `- Le acompañan: ${b.name} y ${c.name}.`,
    `- Nicho principal: ${s.niches[0].title}.`,
    `- Otros nichos: ${s.niches.slice(1).map((n) => n.title).join("; ")}.`,
    empresa
      ? `- Cómo atacarlo: ${b.attack} Dónde aplicarlo: ${a.channels}`
      : `- En qué se puede convertir: ${[...a.careers, ...b.careers.slice(0, 2)].join(", ")}. Primer paso sugerido: ${a.firstStep}`,
  ];
  return lines.join("\n");
}

/** Resumen corto para la UI (saludo del coach). */
export function perfilResumen(code: string | null | undefined): { dominante: string; nicho: string; hex: string } | null {
  if (!code) return null;
  const r = decodeResult(code);
  if (!r) return null;
  const s = computeSpectrum(r.answers, r.mode);
  const a = CENTER_BY_ID[s.dominant];
  return { dominante: a.name, nicho: s.niches[0].title, hex: a.hex };
}
