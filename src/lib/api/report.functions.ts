import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import process from "node:process";

/* Envía el reporte de diagnóstico (PDF) al correo del cliente vía la API
   transaccional de Brevo. La API key vive solo en el servidor (BREVO_API_KEY);
   nunca llega al navegador. Ver FIREBASE_SETUP.md para la configuración. */

export const sendReportEmail = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      email: z.string().email(),
      empresa: z.string().default("cliente"),
      // PDF en base64 SIN el prefijo "data:...," (Brevo lo espera así).
      pdfBase64: z.string().min(100),
    }),
  )
  .handler(async ({ data }) => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error(
        "El envío por correo no está configurado: falta BREVO_API_KEY en el servidor.",
      );
    }
    const senderEmail = process.env.BREVO_SENDER_EMAIL || "prismadigital.io@gmail.com";
    const senderName = process.env.BREVO_SENDER_NAME || "Prisma Digital";
    const empresa = data.empresa.trim() || "cliente";
    const filename = `diagnostico-${empresa.replace(/\s+/g, "-").toLowerCase()}.pdf`;

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

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: data.email }],
        replyTo: { email: "prismadigital.io@gmail.com", name: "Prisma Digital" },
        subject: `Tu diagnóstico digital — ${empresa}`,
        htmlContent: html,
        attachment: [{ content: data.pdfBase64, name: filename }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`Brevo respondió ${res.status}. ${detail.slice(0, 180)}`);
    }
    const json = (await res.json().catch(() => ({}))) as { messageId?: string };
    return { ok: true as const, messageId: json.messageId ?? null };
  });
