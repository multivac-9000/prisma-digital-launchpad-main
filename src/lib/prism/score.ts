import { CENTERS, CENTER_BY_ID, type CenterId, type Mode } from "./bands";
import { QUESTION_COUNT } from "./questions";

/** Por cada pregunta, el índice (0–8) de la luz elegida = el centro elegido. */
export type Answers = number[];

export interface Niche {
  title: string;
  affinity: number;
  combo: [CenterId, CenterId];
}

export interface Spectrum {
  mode: Mode;
  scores: Record<CenterId, number>;
  intensities: Record<CenterId, number>;
  ranking: CenterId[];
  dominant: CenterId;
  niches: Niche[];
}

export function computeSpectrum(answers: Answers, mode: Mode = "joven"): Spectrum {
  if (answers.length !== QUESTION_COUNT) throw new Error(`Se esperaban ${QUESTION_COUNT} respuestas`);

  const scores = Object.fromEntries(CENTERS.map((c) => [c.id, 0])) as Record<CenterId, number>;
  const lastSeen = Object.fromEntries(CENTERS.map((c) => [c.id, -1])) as Record<CenterId, number>;
  answers.forEach((choice, q) => {
    const center = CENTERS[choice];
    if (!center) throw new Error(`Respuesta inválida en la pregunta ${q + 1}`);
    scores[center.id] += 1;
    lastSeen[center.id] = q;
  });

  const max = Math.max(...Object.values(scores), 1);
  const intensities = Object.fromEntries(
    CENTERS.map((c) => [c.id, Math.round(12 + (88 * scores[c.id]) / max)]),
  ) as Record<CenterId, number>;

  // Mayor a menor; en empate gana el elegido más tarde (las últimas preguntas son las más altas de la luz)
  const ranking = [...CENTERS]
    .sort((a, b) => scores[b.id] - scores[a.id] || lastSeen[b.id] - lastSeen[a.id] || b.index - a.index)
    .map((c) => c.id);

  const [first, second, third] = ranking;
  const avg = (a: CenterId, b: CenterId) => Math.round((intensities[a] + intensities[b]) / 2);
  const niche = (a: CenterId, b: CenterId): Niche => ({
    title:
      mode === "empresa"
        ? `${CENTER_BY_ID[a].market} para ${CENTER_BY_ID[b].audience}`
        : `${CENTER_BY_ID[a].field}, con foco en ${CENTER_BY_ID[b].focus}`,
    affinity: avg(a, b),
    combo: [a, b],
  });

  return {
    mode,
    scores,
    intensities,
    ranking,
    dominant: first,
    niches: [niche(first, second), niche(first, third), niche(second, first)],
  };
}

/** Respuestas ↔ código de la URL: "j-123456789" (persona) o "e-…" (empresa), dígitos 1–9. */
export function encodeResult(mode: Mode, answers: Answers): string {
  return `${mode === "empresa" ? "e" : "j"}-${answers.map((a) => a + 1).join("")}`;
}

export function decodeResult(code: string): { mode: Mode; answers: Answers } | null {
  const m = /^([je])-([1-9]+)$/i.exec(code);
  if (!m || m[2].length !== QUESTION_COUNT) return null;
  return { mode: m[1].toLowerCase() === "e" ? "empresa" : "joven", answers: [...m[2]].map((d) => Number(d) - 1) };
}
