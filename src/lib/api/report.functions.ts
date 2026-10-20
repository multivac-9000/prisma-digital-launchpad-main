import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import process from "node:process";

/* Envía el reporte de diagnóstico (PDF) al correo del cliente vía la API
   transaccional de Brevo. La API key vive solo en el servidor (BREVO_API_KEY);
   nunca llega al navegador. Ver FIREBASE_SETUP.md para la configuración.

   Los handlers NO lanzan: devuelven un resultado discriminado para que la UI
   explique en español qué falló (IP bloqueada, remitente sin verificar, key
   ausente…) en vez de mostrar el JSON crudo de Brevo. */

const BREVO_API = "https://api.brevo.com/v3";
const BREVO_IPS_URL = "https://app.brevo.com/security/authorised_ips";
const BREVO_SENDERS_URL = "https://app.brevo.com/senders/list";
const TIMEOUT_MS = 25_000;

export type MotivoFallo =
  | "config" // falta BREVO_API_KEY en el servidor
  | "ip" // Brevo bloquea la IP de salida de la función
  | "auth" // key inválida, revocada o de otra cuenta
  | "remitente" // remitente no verificado en Brevo
  | "cuota" // sin créditos / límite de envío
  | "payload" // el PDF excede el límite de la request
  | "red" // timeout o fallo de red hacia Brevo
  | "desconocido";

type Fallo = {
  ok: false;
  motivo: MotivoFallo;
  msg: string;
  detalle: string | null;
  ayudaUrl: string | null;
};

export type EnvioResultado =
  | { ok: true; messageId: string | null; destinatario: string; copiaA: string | null }
  | Fallo;

export type DiagnosticoBrevo = { ok: true; cuenta: string; remitente: string } | Fallo;

function config() {
  return {
    apiKey: process.env.BREVO_API_KEY?.trim() || "",
    senderEmail: process.env.BREVO_SENDER_EMAIL?.trim() || "prismadigital.io@gmail.com",
    senderName: process.env.BREVO_SENDER_NAME?.trim() || "Prisma Digital",
    // Opcional: copia oculta al equipo para dejar registro de cada envío.
    bcc: process.env.BREVO_BCC_EMAIL?.trim() || "",
  };
}

const faltaKey: Fallo = {
  ok: false,
  motivo: "config",
  msg: "Falta BREVO_API_KEY en el servidor. Agrégala en Vercel → Settings → Environment Variables y vuelve a desplegar.",
  detalle: null,
  ayudaUrl: null,
};

/* Traduce la respuesta de error de Brevo a algo accionable. El 401 por IP es
   el caso frecuente en Vercel: cada invocación sale por una IP distinta de
   AWS, así que autorizarlas una a una nunca alcanza. */
function interpretar(status: number, body: string, senderEmail: string): Fallo {
  const detalle = body.trim().slice(0, 400) || null;
  // El [0-9a-fA-F.:] final evita capturar el punto que cierra la frase de Brevo.
  const ip = /unrecognised IP address ([0-9a-fA-F.:]*[0-9a-fA-F])/.exec(body)?.[1];

  if (ip) {
    return {
      ok: false,
      motivo: "ip",
      msg:
        `Brevo bloqueó la IP del servidor (${ip}). Las funciones de Vercel salen por IPs de AWS que ` +
        `cambian en cada ejecución, así que autorizarlas una por una nunca alcanza: en Brevo entra a ` +
        `Settings → Seguridad → IP autorizadas y pulsa "Desactivar para claves API".`,
      detalle,
      ayudaUrl: BREVO_IPS_URL,
    };
  }
  if (status === 401 || status === 403) {
    return {
      ok: false,
      motivo: "auth",
      msg: "Brevo rechazó la API key. Revisa que BREVO_API_KEY esté vigente (Brevo → SMTP y API → API Keys) y que sea la de la cuenta correcta.",
      detalle,
      ayudaUrl: null,
    };
  }
  if (status === 400 && /sender|remitent/i.test(body)) {
    return {
      ok: false,
      motivo: "remitente",
      msg: `Brevo no acepta el remitente ${senderEmail}. Verifícalo en Brevo → Remitentes, dominio, IP.`,
      detalle,
      ayudaUrl: BREVO_SENDERS_URL,
    };
  }
  if (status === 402 || /credit|quota|limit/i.test(body)) {
    return {
      ok: false,
      motivo: "cuota",
      msg: "Brevo rechazó el envío por límite de cuota o créditos del plan.",
      detalle,
      ayudaUrl: null,
    };
  }
  if (status === 413) {
    return {
      ok: false,
      motivo: "payload",
      msg: "El PDF es demasiado pesado para enviarlo por este canal. Descárgalo y adjúntalo a mano.",
      detalle,
      ayudaUrl: null,
    };
  }
  return {
    ok: false,
    motivo: "desconocido",
    msg: `Brevo respondió ${status}.`,
    detalle,
    ayudaUrl: null,
  };
}

function falloDeRed(e: unknown): Fallo {
  const esTimeout = e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError");
  return {
    ok: false,
    motivo: "red",
    msg: esTimeout
      ? "Brevo no respondió a tiempo. Reintenta; si insiste, descarga el PDF y envíalo a mano."
      : "No se pudo contactar a Brevo desde el servidor.",
    detalle: e instanceof Error ? e.message : null,
    ayudaUrl: null,
  };
}

// Nombre de archivo seguro: sin tildes, espacios ni signos.
function slug(txt: string): string {
  return (
    txt
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "cliente"
  );
}

/* Comprueba la conexión con Brevo sin enviar nada: dice si la key sirve desde
   la IP de salida real de esta función. Es el botón "Probar Brevo". */
export const checkBrevoStatus = createServerFn({ method: "POST" }).handler(
  async (): Promise<DiagnosticoBrevo> => {
    const { apiKey, senderEmail } = config();
    if (!apiKey) return faltaKey;

    try {
      const res = await fetch(`${BREVO_API}/account`, {
        headers: { "api-key": apiKey, accept: "application/json" },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => "");
        return interpretar(res.status, body, senderEmail);
      }
      const json = (await res.json().catch(() => ({}))) as {
        companyName?: string;
        email?: string;
      };
      return {
        ok: true,
        cuenta: json.companyName || json.email || "cuenta Brevo",
        remitente: senderEmail,
      };
    } catch (e) {
      return falloDeRed(e);
    }
  },
);

export const sendReportEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      empresa: z.string().default("cliente"),
      // PDF en base64 SIN el prefijo "data:...," (Brevo lo espera así).
      pdfBase64: z.string().min(100),
    }),
  )
  .handler(async ({ data }): Promise<EnvioResultado> => {
    const { apiKey, senderEmail, senderName, bcc } = config();
    if (!apiKey) return faltaKey;

    // Vercel corta las requests sobre ~4,5 MB; el adjunto ya viene en base64.
    if (data.pdfBase64.length > 3_500_000) {
      return {
        ok: false,
        motivo: "payload",
        msg: "El PDF quedó demasiado pesado para enviarlo desde aquí. Descárgalo y adjúntalo a mano.",
        detalle: `${Math.round(data.pdfBase64.length / 1024)} KB en base64`,
        ayudaUrl: null,
      };
    }

    const empresa = data.empresa.trim() || "cliente";
    const filename = `diagnostico-${slug(empresa)}.pdf`;

    const html = `
      <div style="font-family:Helvetica,Arial,sans-serif;color:#1e2133;line-height:1.6">
        <p>Hola,</p>
        <p>Adjuntamos el <strong>reporte de tu diagnóstico digital</strong> con Prisma Digital:
        la auditoría de 15 puntos sobre tu sitio, tu medición y tus campañas, junto con la
        proyección de resultados que revisamos.</p>
        <p>Este documento es la base de tu <strong>plan priorizado a 90 días</strong>.
        Cualquier duda, respóndenos este correo.</p>
        <p style="margin-top:24px">Equipo Prisma Digital<br/>
        <span style="color:#6e7486">prismadigital.io · +56 9 5715 1303 · Concepción, Chile</span></p>
      </div>`;

    const text = [
      "Hola,",
      "",
      "Adjuntamos el reporte de tu diagnóstico digital con Prisma Digital: la auditoría de 15",
      "puntos sobre tu sitio, tu medición y tus campañas, junto con la proyección de resultados",
      "que revisamos. Este documento es la base de tu plan priorizado a 90 días.",
      "",
      "Equipo Prisma Digital",
      "prismadigital.io · +56 9 5715 1303 · Concepción, Chile",
    ].join("\n");

    try {
      const res = await fetch(`${BREVO_API}/smtp/email`, {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
        },
        signal: AbortSignal.timeout(TIMEOUT_MS),
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: data.email }],
          ...(bcc ? { bcc: [{ email: bcc }] } : {}),
          replyTo: { email: "prismadigital.io@gmail.com", name: "Prisma Digital" },
          subject: `Tu diagnóstico digital — ${empresa}`,
          htmlContent: html,
          textContent: text,
          tags: ["assessment", "diagnostico"],
          attachment: [{ content: data.pdfBase64, name: filename }],
        }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => "");
        return interpretar(res.status, body, senderEmail);
      }
      const json = (await res.json().catch(() => ({}))) as { messageId?: string };
      return {
        ok: true,
        messageId: json.messageId ?? null,
        destinatario: data.email,
        copiaA: bcc || null,
      };
    } catch (e) {
      return falloDeRed(e);
    }
  });
