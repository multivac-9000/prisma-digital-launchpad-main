import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import process from "node:process";

/* Chatbot Prismate: reenvía el mensaje del visitante al agente en n8n
   (workflow "Prisma · Agente Prismate") y devuelve su respuesta.

   El "cerebro" (Google Gemini + memoria por sesión) vive en n8n; aquí solo
   proxyeamos para no exponer detalles y manejar errores en español.

   La URL del webhook no es secreta, pero se puede sobrescribir con la env
   N8N_PRISMATE_WEBHOOK_URL (Vercel → Settings → Environment Variables). */

const N8N_URL =
  process.env.N8N_PRISMATE_WEBHOOK_URL?.trim() ||
  "https://seashell-ibis-992075.hostingersite.com/webhook/prismate";

const TIMEOUT_MS = 60_000;

export type PrismateRespuesta =
  | { ok: true; reply: string }
  | { ok: false; msg: string };

export const askPrismate = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      message: z.string().min(1).max(4000),
      sessionId: z.string().min(1).max(80),
      // Contexto opcional (ej. si en el futuro viene de un escaneo). Hoy va vacío.
      perfil: z.string().max(4000).optional(),
    }),
  )
  .handler(async ({ data }): Promise<PrismateRespuesta> => {
    try {
      const res = await fetch(N8N_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        body: JSON.stringify({
          message: data.message,
          sessionId: data.sessionId,
          perfil: data.perfil ?? "",
          pagina: "prismadigital.io/prismate",
        }),
      });

      if (!res.ok) {
        return {
          ok: false,
          msg:
            res.status === 404
              ? "El asistente no está activo en este momento. Intenta más tarde o agenda tu diagnóstico."
              : "Prismate no pudo responder ahora. Intenta de nuevo en un momento.",
        };
      }

      const json = (await res.json().catch(() => null)) as
        | { reply?: string; output?: string }
        | null;
      const reply = (json?.reply ?? json?.output ?? "").trim();
      if (!reply) return { ok: false, msg: "Prismate no pudo responder. Intenta de nuevo." };

      return { ok: true, reply };
    } catch (e) {
      const timeout = e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError");
      return {
        ok: false,
        msg: timeout
          ? "Prismate tardó demasiado en responder. Reintenta en un momento."
          : "No se pudo contactar al asistente. Revisa tu conexión e intenta de nuevo.",
      };
    }
  });
