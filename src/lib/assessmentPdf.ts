import type { jsPDF } from "jspdf";

/* Genera el PDF del reporte de diagnóstico (auditoría de 15 puntos).
   Se arma en el cliente con jsPDF (import dinámico: fuera del bundle SSR).
   Diseño sobrio, en colores de marca, pensado para el cliente y su equipo. */

export type ReportCategoria = {
  nombre: string;
  color: string; // hex
  puntos: number;
  maximo: number;
  items: { label: string; nota: number | null; obs: string }[];
};

export type ReportData = {
  empresa: string;
  contacto: string;
  rubro: string;
  sitio: string;
  anios: string;
  email: string;
  fecha: string;
  totalPct: number;
  totalPuntos: number;
  totalMax: number;
  clasifLabel: string;
  categorias: ReportCategoria[];
  pagespeed: { movil: number | null; desktop: number | null };
  contexto: {
    objetivos: string;
    dolor: string;
    inversion: number | null;
    ventasPct: number | null;
    decisiones: string;
    herramientas: string[];
  };
  proyeccion: {
    visitas: number | null;
    conversion: number | null;
    ticket: number | null;
    actual: number | null;
    meta90: number | null;
    meta12: number | null;
  } | null;
};

const NAVY: [number, number, number] = [0, 1, 57];
const INK: [number, number, number] = [30, 33, 51];
const GREY: [number, number, number] = [110, 116, 134];

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

const notaTxt = ["—", "No existe", "Deficiente", "Básico", "Bueno", "Óptimo"];

export async function generateAssessmentPdf(data: ReportData): Promise<jsPDF> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const M = 16; // margen
  const CW = W - M * 2; // ancho de contenido
  let y = 0;

  const ensure = (need: number) => {
    if (y + need > 285) {
      doc.addPage();
      y = M;
    }
  };

  // ---- Encabezado con banda de marca ----
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 34, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Diagnóstico Digital", M, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(200, 210, 255);
  doc.text("Prisma Digital · Auditoría de 15 puntos", M, 23);
  doc.setFontSize(9);
  doc.text(data.fecha, W - M, 16, { align: "right" });
  y = 44;

  // ---- Datos del cliente ----
  doc.setTextColor(...INK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text(data.empresa || "Cliente", M, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...GREY);
  const meta = [
    data.contacto && `Contacto: ${data.contacto}`,
    data.rubro && `Rubro: ${data.rubro}`,
    data.anios && `Trayectoria: ${data.anios} años`,
    data.sitio && `Sitio: ${data.sitio}`,
    data.email && `Correo: ${data.email}`,
  ].filter(Boolean) as string[];
  meta.forEach((m) => {
    ensure(6);
    doc.text(m, M, y);
    y += 5;
  });
  y += 3;

  // ---- Puntaje global ----
  ensure(26);
  doc.setDrawColor(230, 232, 240);
  doc.setFillColor(247, 248, 252);
  doc.roundedRect(M, y, CW, 22, 3, 3, "FD");
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text(`${data.totalPct}%`, M + 6, y + 15);
  doc.setFontSize(12);
  doc.text(data.clasifLabel, M + 34, y + 11);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GREY);
  doc.text(
    `${data.totalPuntos} de ${data.totalMax} puntos de madurez digital`,
    M + 34,
    y + 17,
  );
  y += 30;

  // ---- Barras por categoría ----
  data.categorias.forEach((cat) => {
    ensure(9);
    const rgb = hexToRgb(cat.color);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text(cat.nombre, M, y);
    doc.setTextColor(...GREY);
    doc.setFont("helvetica", "normal");
    doc.text(`${cat.puntos}/${cat.maximo}`, W - M, y, { align: "right" });
    y += 2.5;
    doc.setFillColor(232, 234, 242);
    doc.roundedRect(M, y, CW, 3, 1.5, 1.5, "F");
    const wpct = cat.maximo ? (cat.puntos / cat.maximo) * CW : 0;
    doc.setFillColor(...rgb);
    if (wpct > 0) doc.roundedRect(M, y, wpct, 3, 1.5, 1.5, "F");
    y += 8;
  });
  y += 2;

  // ---- Detalle de los 15 puntos ----
  ensure(12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...NAVY);
  doc.text("Detalle de la auditoría", M, y);
  y += 6;

  data.categorias.forEach((cat) => {
    ensure(9);
    const rgb = hexToRgb(cat.color);
    doc.setFillColor(...rgb);
    doc.circle(M + 1.5, y - 1.3, 1.3, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...INK);
    doc.text(cat.nombre, M + 5, y);
    y += 5;

    cat.items.forEach((it) => {
      ensure(7);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...INK);
      const label = doc.splitTextToSize(it.label, CW - 34);
      doc.text(label, M + 5, y);
      const notaLabel = it.nota ? `${it.nota} · ${notaTxt[it.nota]}` : "—";
      doc.setTextColor(...(it.nota ? rgb : GREY));
      doc.setFont("helvetica", "bold");
      doc.text(notaLabel, W - M, y, { align: "right" });
      y += label.length * 4.4;
      if (it.obs) {
        ensure(5);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(8.5);
        doc.setTextColor(...GREY);
        const obs = doc.splitTextToSize(`“${it.obs}”`, CW - 10);
        doc.text(obs, M + 5, y);
        y += obs.length * 3.9;
      }
      y += 1.5;
    });
    y += 2;
  });

  // ---- PageSpeed ----
  ensure(14);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text("Rendimiento del sitio (PageSpeed)", M, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  doc.text(
    `Móvil: ${data.pagespeed.movil ?? "—"} / 100      Escritorio: ${data.pagespeed.desktop ?? "—"} / 100`,
    M,
    y,
  );
  y += 9;

  // ---- Contexto ----
  const ctxLines: string[] = [];
  if (data.contexto.objetivos) ctxLines.push(`Objetivos: ${data.contexto.objetivos}`);
  if (data.contexto.dolor) ctxLines.push(`Principal dolor: ${data.contexto.dolor}`);
  if (data.contexto.inversion !== null)
    ctxLines.push(`Inversión mensual en pauta: ${clp.format(data.contexto.inversion)}`);
  if (data.contexto.ventasPct !== null)
    ctxLines.push(`Ventas del canal online: ${data.contexto.ventasPct}%`);
  if (data.contexto.decisiones) ctxLines.push(`Decisiones de marketing: ${data.contexto.decisiones}`);
  if (data.contexto.herramientas.length)
    ctxLines.push(`Herramientas actuales: ${data.contexto.herramientas.join(", ")}`);

  if (ctxLines.length) {
    ensure(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text("Contexto para el plan a 90 días", M, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(...INK);
    ctxLines.forEach((l) => {
      const lines = doc.splitTextToSize(l, CW);
      ensure(lines.length * 4.5 + 1);
      doc.text(lines, M, y);
      y += lines.length * 4.5 + 1.5;
    });
    y += 3;
  }

  // ---- Proyección ----
  if (data.proyeccion && data.proyeccion.actual !== null) {
    ensure(30);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text("Proyección de resultados", M, y);
    y += 6;
    const cells: { label: string; value: number; rgb: [number, number, number] }[] = [
      { label: "Venta online hoy / mes", value: data.proyeccion.actual!, rgb: INK },
      { label: "Meta a 90 días", value: data.proyeccion.meta90 ?? 0, rgb: hexToRgb("#32d6ff") },
      { label: "Meta a 12 meses", value: data.proyeccion.meta12 ?? 0, rgb: hexToRgb("#d713f9") },
    ];
    const cw = (CW - 8) / 3;
    cells.forEach((c, i) => {
      const x = M + i * (cw + 4);
      doc.setDrawColor(230, 232, 240);
      doc.setFillColor(247, 248, 252);
      doc.roundedRect(x, y, cw, 20, 2, 2, "FD");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...GREY);
      doc.text(doc.splitTextToSize(c.label, cw - 6), x + 3, y + 5);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...c.rgb);
      doc.text(clp.format(Math.round(c.value)), x + 3, y + 15);
    });
    y += 26;
  }

  // ---- Pie en cada página ----
  const pages = doc.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GREY);
    doc.text(
      "Prisma Digital · prismadigital.io@gmail.com · +56 9 5715 1303 · Concepción, Chile",
      M,
      292,
    );
    doc.text(`${p} / ${pages}`, W - M, 292, { align: "right" });
  }

  return doc;
}
