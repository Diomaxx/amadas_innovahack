import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { Contacto } from "@/screens/Admin/Contactos/contactos.types";
import type { Publicacion } from "@/screens/Admin/Publicaciones/publicaciones.types";
import type { ProductoTemporada } from "@/screens/Admin/Temporada/temporada.types";
import type { Receta } from "@/screens/Recetas/recetas.types";
import {
  capitalizar,
  contactosPorTipo,
  type Conteo,
  fechaLarga,
  mesActual,
  productosEnTemporada,
  productosPorCategoria,
  publicacionesPorEstado,
  recetasPorCategoria,
} from "./reportes.utils";

export type ReporteData = {
  productos: ProductoTemporada[];
  contactos: Contacto[];
  recetas: Receta[];
  publicaciones: Publicacion[];
};

type RGB = [number, number, number];

/* ── Paleta de marca (RGB) ──────────────────────────────────── */
const GREEN: RGB = [27, 58, 45];
const GOLD: RGB = [200, 169, 110];
const INK: RGB = [45, 74, 62];
const GRAY: RGB = [138, 138, 138];
const BODY: RGB = [74, 74, 74];
const CREAM: RGB = [250, 247, 242];
const MINT: RGB = [240, 248, 243];
const LINE: RGB = [237, 229, 216];

/* ── Geometría de página (A4, mm) ───────────────────────────── */
const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 14;
const CONTENT_W = PAGE_W - MARGIN * 2;
const TOP_AFTER_HEADER = 62;
const TOP_NEW_PAGE = 20;
const BOTTOM_LIMIT = PAGE_H - 18;

function hexToRgb(hex: string): RGB {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

/** Asegura espacio vertical; si no cabe, añade página y reinicia el cursor. */
function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > BOTTOM_LIMIT) {
    doc.addPage();
    return TOP_NEW_PAGE;
  }
  return y;
}

/* ── Portada / cabecera ─────────────────────────────────────── */
function drawHeader(doc: jsPDF, fecha: Date) {
  const mes = mesActual(fecha);

  // Banda verde
  doc.setFillColor(...GREEN);
  doc.rect(0, 0, PAGE_W, 52, "F");
  // Acento dorado inferior
  doc.setFillColor(...GOLD);
  doc.rect(0, 52, PAGE_W, 1.4, "F");

  // Marca
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(255, 255, 255);
  doc.text("ALMA", MARGIN, 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(214, 205, 185);
  doc.text("FUNDACIÓN AMIGOS DE LA NATURALEZA", MARGIN, 24.5);

  // Etiqueta superior derecha
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.text("DOCUMENTO INTERNO", PAGE_W - MARGIN, 19, { align: "right" });

  // Título del reporte
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.text("REPORTE DE PLATAFORMA", MARGIN, 35);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(19);
  doc.setTextColor(255, 255, 255);
  doc.text("Estado de la biodiversidad gestionada", MARGIN, 43);

  // Metadatos
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(206, 214, 200);
  doc.text(
    `Generado: ${fechaLarga(fecha)}     ·     Periodo: ${capitalizar(mes)} ${fecha.getFullYear()}`,
    MARGIN,
    49,
  );
}

/* ── Título de sección ──────────────────────────────────────── */
function sectionTitle(doc: jsPDF, y: number, texto: string): number {
  const top = ensureSpace(doc, y, 14);
  // Tick dorado
  doc.setFillColor(...GOLD);
  doc.roundedRect(MARGIN, top - 3.4, 1.4, 5.2, 0.7, 0.7, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(...GREEN);
  doc.text(texto, MARGIN + 4, top + 1);
  return top + 9;
}

/* ── Tarjetas KPI ───────────────────────────────────────────── */
function drawKpis(
  doc: jsPDF,
  y: number,
  kpis: { label: string; value: number; hint: string }[],
): number {
  const cols = 3;
  const gap = 4;
  const cardW = (CONTENT_W - gap * (cols - 1)) / cols;
  const cardH = 24;
  const rows = Math.ceil(kpis.length / cols);
  const top = ensureSpace(doc, y, rows * (cardH + gap));

  kpis.forEach((kpi, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MARGIN + col * (cardW + gap);
    const cy = top + row * (cardH + gap);

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, cy, cardW, cardH, 2.6, 2.6, "FD");

    // Punto de acento
    doc.setFillColor(...MINT);
    doc.roundedRect(x + 5, cy + 5, 5, 5, 1.2, 1.2, "F");
    doc.setFillColor(...GREEN);
    doc.circle(x + 7.5, cy + 7.5, 1.1, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.8);
    doc.setTextColor(...GRAY);
    doc.text(kpi.label.toUpperCase(), x + 5, cy + 14.5);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(19);
    doc.setTextColor(...INK);
    doc.text(String(kpi.value), x + 5, cy + 21);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text(kpi.hint, cardW + x - 5, cy + 21, { align: "right" });
  });

  return top + rows * (cardH + gap) + 2;
}

/* ── Gráfico de barras horizontales ─────────────────────────── */
function drawBars(doc: jsPDF, y: number, data: Conteo[], titulo?: string): number {
  const rowH = 8;
  const headerH = titulo ? 7 : 0;
  const boxPad = 6;
  const boxH = boxPad * 2 + headerH + data.length * rowH;
  const top = ensureSpace(doc, y, boxH + 2);

  // Caja contenedora
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(...LINE);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, top, CONTENT_W, boxH, 2.6, 2.6, "FD");

  let cursor = top + boxPad;
  if (titulo) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...GRAY);
    doc.text(titulo.toUpperCase(), MARGIN + boxPad, cursor + 3);
    cursor += headerH;
  }

  const labelW = 44;
  const valueW = 12;
  const trackX = MARGIN + boxPad + labelW;
  const trackW = CONTENT_W - boxPad * 2 - labelW - valueW;
  const max = Math.max(1, ...data.map((d) => d.valor));

  data.forEach((d, i) => {
    const cy = cursor + i * rowH + rowH / 2;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...BODY);
    const label = doc.splitTextToSize(d.label, labelW - 3)[0];
    doc.text(label, MARGIN + boxPad, cy + 1.4);

    // Riel
    doc.setFillColor(245, 240, 232);
    doc.roundedRect(trackX, cy - 2.4, trackW, 4.8, 2.4, 2.4, "F");
    // Relleno
    const w = Math.max(4, (d.valor / max) * trackW);
    doc.setFillColor(...hexToRgb(d.color));
    doc.roundedRect(trackX, cy - 2.4, w, 4.8, 2.4, 2.4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(String(d.valor), MARGIN + CONTENT_W - boxPad, cy + 1.4, {
      align: "right",
    });
  });

  return top + boxH + 6;
}

/* ── Pie de página en todas las hojas ───────────────────────── */
function drawFooters(doc: jsPDF, fecha: Date) {
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_H - 12, PAGE_W - MARGIN, PAGE_H - 12);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY);
    doc.text("ALMA · Fundación Amigos de la Naturaleza", MARGIN, PAGE_H - 8);
    doc.text(`Página ${p} de ${total}`, PAGE_W - MARGIN, PAGE_H - 8, {
      align: "right",
    });
    doc.text(fechaLarga(fecha), PAGE_W / 2, PAGE_H - 8, { align: "center" });
  }
}

/* ── Documento completo ─────────────────────────────────────── */
export function generarReportePDF(data: ReporteData, fecha = new Date()): void {
  const { productos, contactos, recetas, publicaciones } = data;
  const mes = mesActual(fecha);
  const enTemporada = productosEnTemporada(productos, mes);
  const pendientes = publicaciones.filter((p) => p.estado === "pendiente").length;

  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });

  drawHeader(doc, fecha);
  let y = TOP_AFTER_HEADER;

  // 1 — Resumen ejecutivo
  y = sectionTitle(doc, y, "Resumen ejecutivo");
  y = drawKpis(doc, y, [
    { label: "Productos", value: productos.length, hint: "Catálogo" },
    { label: "En temporada", value: enTemporada.length, hint: capitalizar(mes) },
    { label: "Contactos", value: contactos.length, hint: "Aliados" },
    { label: "Recetas", value: recetas.length, hint: "Recetario" },
    { label: "Publicaciones", value: publicaciones.length, hint: "Total" },
    { label: "Pendientes", value: pendientes, hint: "Por revisar" },
  ]);

  // 2 — Productos en temporada
  y = sectionTitle(doc, y + 4, `Productos en temporada · ${capitalizar(mes)}`);
  if (enTemporada.length > 0) {
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      head: [["Producto", "Nombre científico", "Categoría"]],
      body: enTemporada.map((p) => [
        p.nombre,
        p.nombreCientifico || "—",
        p.categoria || "—",
      ]),
      theme: "grid",
      headStyles: { fillColor: GREEN, textColor: [255, 255, 255], fontSize: 8, fontStyle: "bold" },
      bodyStyles: { fontSize: 8.5, textColor: BODY, cellPadding: 2.2 },
      alternateRowStyles: { fillColor: CREAM },
      styles: { lineColor: LINE, lineWidth: 0.2, font: "helvetica" },
      columnStyles: { 1: { fontStyle: "italic" } },
    });
    y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
  } else {
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY);
    doc.text(`No hay productos en cosecha durante ${mes}.`, MARGIN, y + 2);
    y += 10;
  }

  // 3 — Distribución del catálogo
  y = sectionTitle(doc, y, "Distribución del catálogo");
  y = drawBars(doc, y, productosPorCategoria(productos), "Productos por categoría");

  // 4 — Red de contactos
  y = sectionTitle(doc, y + 2, "Red de contactos");
  y = drawBars(doc, y, contactosPorTipo(contactos), "Aliados por tipo");

  // 5 — Recetario
  y = sectionTitle(doc, y + 2, "Recetario por categoría");
  y = drawBars(doc, y, recetasPorCategoria(recetas));

  // 6 — Publicaciones
  y = sectionTitle(doc, y + 2, "Publicaciones");
  y = drawBars(doc, y, publicacionesPorEstado(publicaciones), "Por estado de revisión");

  const recientes = [...publicaciones]
    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
    .slice(0, 8);
  if (recientes.length > 0) {
    y = ensureSpace(doc, y, 20);
    autoTable(doc, {
      startY: y,
      margin: { left: MARGIN, right: MARGIN },
      head: [["Título", "Autor", "Estado", "Fecha"]],
      body: recientes.map((p) => [
        p.titulo,
        p.autor || "—",
        capitalizar(p.estado),
        p.fecha || "—",
      ]),
      theme: "grid",
      headStyles: { fillColor: GREEN, textColor: [255, 255, 255], fontSize: 8, fontStyle: "bold" },
      bodyStyles: { fontSize: 8.5, textColor: BODY, cellPadding: 2.2 },
      alternateRowStyles: { fillColor: CREAM },
      styles: { lineColor: LINE, lineWidth: 0.2, font: "helvetica" },
      columnStyles: { 3: { halign: "right" } },
    });
  }

  drawFooters(doc, fecha);

  const nombre = `Reporte-ALMA-${capitalizar(mes)}-${fecha.getFullYear()}.pdf`;
  doc.save(nombre);
}
