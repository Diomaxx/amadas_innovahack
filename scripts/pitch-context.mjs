// @ts-nocheck
/**
 * pitch-context.mjs
 * Genera el PDF de pitch de ALMA — la iniciativa de la Fundación Amigos de la
 * Naturaleza (FAN) para llevar el bosque seco chiquitano a la mesa.
 * Enfoque de negocio e impacto (no técnico): lee solo las cifras de valor del
 * contenido (recetas, insumos, menús, intercambios).
 *
 * Uso:   node scripts/pitch-context.mjs
 * Salida: pitch-ALMA.pdf  (en la raíz del proyecto)
 *
 * No requiere dependencias: arma el PDF a mano (texto, títulos, viñetas, color).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ────────────────────────────────────────────────────────────────────────────
// 1) CONTENIDO DE NEGOCIO (cifras de valor del proyecto)
// ────────────────────────────────────────────────────────────────────────────

function safe(fn, fallback) {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

function readJson(rel) {
  return safe(
    () => JSON.parse(fs.readFileSync(path.join(ROOT, rel), "utf8")),
    null,
  );
}

// Solo leemos CONTENIDO de valor (no métricas técnicas): es un pitch de negocio.
const recetas = readJson("src/mocks/recetas.json");
const catalogo = readJson("src/mocks/catalogoData.json");
const menus = readJson("src/mocks/menus.json");
const intercambio = readJson("src/mocks/intercambioData.json");
const temporadas = readJson("src/mocks/temporadas.json");

const scan = {
  recetas: recetas?.total_recetas ?? recetas?.recetas?.length ?? 0,
  especies: catalogo?.especies?.length ?? 0,
  menus: Array.isArray(menus) ? menus.length : 0,
  intercambios: intercambio?.intercambios?.length ?? 0,
  temporadas: temporadas?.documents?.length ?? 0,
  actores: 3, // recolectores/productores · restaurantes · FAN
  fuenteRecetario: recetas?.fuente ?? "",
  publicacion: recetas?.publicacion ?? "",
};

// ────────────────────────────────────────────────────────────────────────────
// 2) CONTENIDO DEL DOCUMENTO  (bloques)
// ────────────────────────────────────────────────────────────────────────────

const hoy = "2026-05-31";

const blocks = [
  { t: "cover" },

  { t: "h1", x: "Qué es ALMA" },
  {
    t: "p",
    x: "ALMA es el alma del bosque seco chiquitano llevada a la mesa: una iniciativa de la Fundación Amigos de la Naturaleza (FAN) que convierte la biodiversidad del bosque en valor para quienes lo cuidan. Pone en el centro a los insumos nativos —asaí, almendra chiquitana, motacú, totaí, majo, paja cedrón—, los saberes que los acompañan y las recetas que los celebran, conectando a quienes recolectan y producen con quienes cocinan.",
  },
  {
    t: "p",
    x: "No es un proyecto aislado: ALMA da continuidad y escala al trabajo que FAN ya impulsa con las comunidades del bosque. Su recetario nace de una fuente real de la fundación: «" + (scan.fuenteRecetario || "Del Bosque Chiquitano a la Mesa") + "», " + (scan.publicacion || "Fundación Amigos de la Naturaleza (FAN), 2025") + ".",
  },

  { t: "h1", x: "El problema" },
  { t: "b", x: "El bosque seco chiquitano —uno de los más amenazados del planeta— pierde valor frente a la ganadería y la deforestación: en pie, hoy rinde poco a quien vive en él." },
  { t: "b", x: "Las comunidades recolectoras tienen productos extraordinarios, pero no un mercado justo ni un canal estable para colocarlos." },
  { t: "b", x: "La identidad gastronómica del bosque —recetas, usos, saberes— se transmite de forma oral y se está perdiendo." },
  { t: "b", x: "Restaurantes y consumidores quieren ingredientes nativos con historia y trazabilidad, pero no saben dónde ni cuándo conseguirlos." },

  { t: "h1", x: "La solución: ALMA" },
  { t: "p", x: "Una sola plataforma, impulsada por FAN, que pone en valor el bosque conectando a sus tres actores y haciendo visible —y rentable— el uso sostenible de la biodiversidad." },
  { t: "b", x: "Da identidad y vitrina a los insumos nativos del bosque, organizados por temporada de cosecha." },
  { t: "b", x: "Preserva y difunde el recetario chiquitano, conectando cada receta con los insumos del bosque que utiliza." },
  { t: "b", x: "Acerca la oferta de las comunidades a la demanda de restaurantes y cocineros que buscan producto con origen." },
  { t: "b", x: "Convierte la conservación en una propuesta de valor concreta: el bosque vale más vivo y aprovechado de forma sostenible." },

  { t: "h1", x: "A quiénes sirve ALMA" },

  { t: "h2", x: "Recolectores y productores del bosque" },
  { t: "b", x: "Una vitrina digital para sus productos nativos y un canal hacia un mercado que valora el origen." },
  { t: "b", x: "Ingresos que premian el cuidado del bosque, no su tala." },

  { t: "h2", x: "Restaurantes y cocineros" },
  { t: "b", x: "Acceso a insumos nativos con historia, disponibilidad por temporada y recetas listas para usarlos." },
  { t: "b", x: "Una propuesta diferenciadora: cocina con identidad chiquitana y origen trazable." },

  { t: "h2", x: "Fundación Amigos de la Naturaleza (FAN)" },
  { t: "b", x: "Un brazo digital para escalar su misión de conservación y su trabajo con las comunidades." },
  { t: "b", x: "Una plataforma para custodiar el patrimonio gastronómico del bosque y medir su impacto." },

  { t: "h1", x: "El impacto que busca ALMA" },
  { t: "b", x: "Conservación con incentivo económico: dar valor al bosque en pie para frenar su pérdida." },
  { t: "b", x: "Ingresos más justos y estables para las comunidades recolectoras." },
  { t: "b", x: "Rescate cultural: el recetario chiquitano preservado, vivo y en circulación." },
  { t: "b", x: "Consumo responsable: cada plato cuenta la historia del bosque y de quien lo cuida." },

  { t: "h1", x: "Qué ofrece ALMA hoy" },

  { t: "h2", x: "Catálogo del bosque" },
  { t: "b", x: `${scan.especies} insumos nativos con su esencia, propiedades, usos gastronómicos y temporada de cosecha.` },
  { t: "b", x: "Búsqueda y filtros por temporada, con disponibilidad por productor y opción de suscribirse a un producto." },

  { t: "h2", x: "Recetario chiquitano" },
  { t: "b", x: `${scan.recetas} recetas reales con su contexto cultural, autores, ingredientes y preparación paso a paso.` },
  { t: "b", x: "Cada receta enlaza con los insumos del bosque que usa: desde una ficha del catálogo se entra directo a las recetas que la incluyen." },

  { t: "h2", x: "Menús e intercambio" },
  { t: "b", x: `${scan.menus} menús de muestra y un espacio de intercambio con ${scan.intercambios} ofertas entre actores de la red.` },
  { t: "b", x: "Un mercado donde comunidades y restaurantes proponen y cierran tratos." },

  { t: "h2", x: "Panel de la fundación" },
  { t: "b", x: "FAN gestiona el catálogo, las recetas, las temporadas, las publicaciones y la red de contactos desde un solo lugar." },
  { t: "b", x: "Tablero con la actividad y el estado de la red para tomar decisiones." },

  { t: "h1", x: "Hacia dónde va ALMA" },
  { t: "b", x: "«Cociná lo que el bosque da este mes»: recetas sugeridas según la temporada de cosecha." },
  { t: "b", x: "Recetario de la comunidad: que recolectores y restaurantes aporten recetas y FAN las cure." },
  { t: "b", x: "Trazabilidad de origen: del recolector → insumo → receta → plato del restaurante." },
  { t: "b", x: "Métricas de impacto para FAN y sus aliados: especies en uso, recolección sostenible e ingresos generados." },
  { t: "b", x: "Sostenibilidad del modelo: alianzas con FAN y donantes, vínculo con restaurantes y dinamización del intercambio." },

  { t: "h1", x: "En una frase" },
  { t: "p", x: "ALMA es la plataforma de FAN para llevar el alma del bosque chiquitano a la mesa: pone en valor " + scan.especies + " insumos nativos y " + scan.recetas + " recetas para que cuidar el bosque sea, también, una buena decisión económica para quienes viven de él." },
];

// ────────────────────────────────────────────────────────────────────────────
// 3) GENERADOR DE PDF (sin dependencias)
// ────────────────────────────────────────────────────────────────────────────

const PAGE_W = 595.28; // A4
const PAGE_H = 841.89;
const MARGIN = 56;
const CONTENT_W = PAGE_W - MARGIN * 2;

// Paleta (verde bosque)
const C = {
  green: [0.18, 0.4, 0.25],
  greenDark: [0.1, 0.27, 0.17],
  text: [0.13, 0.15, 0.13],
  muted: [0.42, 0.45, 0.42],
  accent: [0.78, 0.5, 0.15],
  rule: [0.82, 0.86, 0.82],
};

// Anchos aproximados de glifos Helvetica (suficiente para wrapping)
function charW(ch, size) {
  if (ch === " ") return size * 0.278;
  if ("iljftI.,'!|".includes(ch)) return size * 0.28;
  if ("mwMW".includes(ch)) return size * 0.86;
  if (ch >= "A" && ch <= "Z") return size * 0.68;
  return size * 0.5;
}
function textW(str, size) {
  let w = 0;
  for (const ch of str) w += charW(ch, size);
  return w;
}

function wrap(str, size, maxW) {
  const words = str.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (textW(test, size) > maxW && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

// Sanitiza a bytes WinAnsi y escapa para el stream
function enc(str) {
  const map = {
    "—": 0x97, "–": 0x96, "“": 0x93, "”": 0x94, "‘": 0x91, "’": 0x92,
    "•": 0x95, "…": 0x85, "€": 0x80, "«": 0xab, "»": 0xbb,
  };
  const bytes = [];
  for (const ch of str) {
    let code;
    if (map[ch] !== undefined) code = map[ch];
    else {
      const cp = ch.codePointAt(0);
      code = cp <= 0xff ? cp : 0x3f; // '?'
    }
    if (code === 0x28 || code === 0x29 || code === 0x5c) bytes.push(0x5c); // ( ) \
    bytes.push(code);
  }
  return Buffer.from(bytes);
}

// Acumulador de operadores de un stream de página
function newPage() {
  return { ops: [] };
}
function op(page, s) {
  page.ops.push(Buffer.isBuffer(s) ? s : Buffer.from(s, "latin1"));
}
function rgb(page, [r, g, b]) {
  op(page, `${r} ${g} ${b} rg\n`);
}
function drawText(page, str, x, y, font, size, color) {
  rgb(page, color);
  op(page, `BT /${font} ${size} Tf ${x} ${y} Td (`);
  op(page, enc(str));
  op(page, `) Tj ET\n`);
}
function rect(page, x, y, w, h, color) {
  rgb(page, color);
  op(page, `${x} ${y} ${w} ${h} re f\n`);
}
function line(page, x1, y1, x2, y2, color, lw = 1) {
  rgb(page, color);
  op(page, `${lw} w ${x1} ${y1} m ${x2} ${y2} l S\n`);
}

// ── Layout / paginación ──────────────────────────────────────────────────────
const pages = [];
let page = newPage();
pages.push(page);
let y = PAGE_H - MARGIN;

function space(h) {
  y -= h;
}
function ensure(h) {
  if (y - h < MARGIN + 30) {
    page = newPage();
    pages.push(page);
    y = PAGE_H - MARGIN;
  }
}
function para(str, { font = "F1", size = 11, color = C.text, lead = 5, x = MARGIN, indent = 0, maxW = CONTENT_W } = {}) {
  const lines = wrap(str, size, maxW - indent);
  for (const ln of lines) {
    ensure(size + lead);
    drawText(page, ln, x + indent, y - size, font, size, color);
    y -= size + lead;
  }
}

function footer(p, idx) {
  drawText(p, "ALMA · Una iniciativa de FAN · Del bosque chiquitano a la mesa", MARGIN, 30, "F1", 8, C.muted);
  const num = `${idx + 1} / ${pages.length}`;
  drawText(p, num, PAGE_W - MARGIN - textW(num, 8), 30, "F1", 8, C.muted);
}

// ── Render de bloques ────────────────────────────────────────────────────────
function renderCover() {
  rect(page, 0, 0, PAGE_W, PAGE_H, [0.97, 0.98, 0.96]);
  rect(page, 0, PAGE_H - 220, PAGE_W, 220, C.green);
  rect(page, 0, PAGE_H - 230, PAGE_W, 10, C.accent);
  drawText(page, "ALMA", MARGIN, PAGE_H - 120, "F2", 46, [1, 1, 1]);
  drawText(page, "El alma del bosque chiquitano, en la mesa", MARGIN, PAGE_H - 160, "F1", 16, [0.9, 0.95, 0.9]);
  drawText(page, "Una iniciativa de la Fundación Amigos de la Naturaleza (FAN)", MARGIN, PAGE_H - 188, "F1", 12, [0.85, 0.92, 0.85]);

  y = PAGE_H - 300;
  para(
    "ALMA pone en valor la biodiversidad del bosque seco chiquitano: convierte sus insumos nativos, sus temporadas y su recetario en valor para las comunidades que lo cuidan. Cuidar el bosque, también, como una buena decisión económica.",
    { size: 13, lead: 7, color: C.greenDark },
  );
  y -= 14;

  // Tarjeta de cifras
  const cardY = y - 150;
  rect(page, MARGIN, cardY, CONTENT_W, 150, [1, 1, 1]);
  line(page, MARGIN, cardY, MARGIN, cardY + 150, C.accent, 3);
  let cx = MARGIN + 24;
  let cy = cardY + 150 - 30;
  drawText(page, "ALMA en cifras", cx, cy, "F2", 13, C.green);
  cy -= 26;
  const stats = [
    [`${scan.recetas}`, "recetas rescatadas"],
    [`${scan.especies}`, "insumos nativos"],
    [`${scan.menus}`, "menús"],
    [`${scan.intercambios}`, "intercambios"],
    [`${scan.actores}`, "actores conectados"],
    [`1`, "bosque por cuidar"],
  ];
  const colW = (CONTENT_W - 48) / 3;
  stats.forEach((s, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const sx = cx + col * colW;
    const sy = cy - row * 46;
    drawText(page, s[0], sx, sy, "F2", 22, C.greenDark);
    drawText(page, s[1], sx, sy - 16, "F1", 10, C.muted);
  });

  drawText(page, "Generado: " + hoy, MARGIN, MARGIN + 6, "F1", 9, C.muted);

  // nueva página para el contenido
  page = newPage();
  pages.push(page);
  y = PAGE_H - MARGIN;
}

for (const blk of blocks) {
  if (!blk) continue;
  switch (blk.t) {
    case "cover":
      renderCover();
      break;
    case "h1":
      ensure(46);
      y -= 14;
      rect(page, MARGIN, y - 4, 26, 4, C.accent);
      drawText(page, blk.x, MARGIN, y - 22, "F2", 18, C.green);
      y -= 30;
      line(page, MARGIN, y, PAGE_W - MARGIN, y, C.rule, 0.8);
      y -= 10;
      break;
    case "h2":
      ensure(28);
      y -= 6;
      drawText(page, blk.x, MARGIN, y - 13, "F2", 13, C.greenDark);
      y -= 20;
      break;
    case "p":
      para(blk.x, { lead: 5 });
      y -= 6;
      break;
    case "note":
      ensure(30);
      const noteLines = wrap(blk.x, 10.5, CONTENT_W - 28);
      const nh = noteLines.length * 15 + 16;
      ensure(nh);
      rect(page, MARGIN, y - nh, CONTENT_W, nh, [0.93, 0.96, 0.92]);
      line(page, MARGIN, y - nh, MARGIN, y, C.green, 3);
      let ny = y - 16;
      for (const ln of noteLines) {
        drawText(page, ln, MARGIN + 14, ny, "F1", 10.5, C.greenDark);
        ny -= 15;
      }
      y -= nh + 8;
      break;
    case "b": {
      ensure(16);
      drawText(page, "•", MARGIN, y - 11, "F2", 11, C.accent);
      para(blk.x, { indent: 16, lead: 4 });
      y -= 3;
      break;
    }
    case "kv": {
      ensure(16);
      drawText(page, blk.k, MARGIN, y - 11, "F2", 10.5, C.greenDark);
      const kw = 180;
      const vLines = wrap(blk.v, 10.5, CONTENT_W - kw);
      let vy = y - 11;
      for (const ln of vLines) {
        drawText(page, ln, MARGIN + kw, vy, "F1", 10.5, C.text);
        vy -= 14;
      }
      y = vy - 2;
      break;
    }
  }
}

pages.forEach((p, i) => footer(p, i));

// ── Ensamblado del archivo PDF ───────────────────────────────────────────────
const objects = [];
function addObj(buf) {
  objects.push(buf);
  return objects.length; // número de objeto (1-based)
}

const kidsRefs = [];
const fontRegular = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>";
const fontBold = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>";

// reservamos números: 1=Catalog, 2=Pages, luego fuentes y páginas
const catalogNum = 1;
const pagesNum = 2;
const fontRegNum = 3;
const fontBoldNum = 4;

const pageObjs = [];
const contentObjs = [];
let nextNum = 5;
for (const p of pages) {
  const stream = Buffer.concat(p.ops.map((o) => (Buffer.isBuffer(o) ? o : Buffer.from(o, "latin1"))));
  const contentNum = nextNum++;
  const pageNum = nextNum++;
  contentObjs.push({ num: contentNum, stream });
  pageObjs.push({ num: pageNum, contentNum });
  kidsRefs.push(`${pageNum} 0 R`);
}

const pieces = []; // {num, body(Buffer)}
pieces.push({ num: catalogNum, body: Buffer.from(`<< /Type /Catalog /Pages ${pagesNum} 0 R >>`, "latin1") });
pieces.push({ num: pagesNum, body: Buffer.from(`<< /Type /Pages /Count ${pages.length} /Kids [${kidsRefs.join(" ")}] >>`, "latin1") });
pieces.push({ num: fontRegNum, body: Buffer.from(fontRegular, "latin1") });
pieces.push({ num: fontBoldNum, body: Buffer.from(fontBold, "latin1") });
for (const p of pageObjs) {
  pieces.push({
    num: p.num,
    body: Buffer.from(
      `<< /Type /Page /Parent ${pagesNum} 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] ` +
        `/Resources << /Font << /F1 ${fontRegNum} 0 R /F2 ${fontBoldNum} 0 R >> >> ` +
        `/Contents ${p.contentNum} 0 R >>`,
      "latin1",
    ),
  });
}
for (const c of contentObjs) {
  const header = Buffer.from(`<< /Length ${c.stream.length} >>\nstream\n`, "latin1");
  const footerB = Buffer.from(`\nendstream`, "latin1");
  pieces.push({ num: c.num, body: Buffer.concat([header, c.stream, footerB]) });
}

pieces.sort((a, b) => a.num - b.num);

let pdf = Buffer.from("%PDF-1.4\n%\xe2\xe3\xcf\xd3\n", "latin1");
const offsets = [];
for (const piece of pieces) {
  offsets[piece.num] = pdf.length;
  pdf = Buffer.concat([
    pdf,
    Buffer.from(`${piece.num} 0 obj\n`, "latin1"),
    piece.body,
    Buffer.from(`\nendobj\n`, "latin1"),
  ]);
}

const xrefStart = pdf.length;
const count = pieces.length + 1;
let xref = `xref\n0 ${count}\n0000000000 65535 f \n`;
for (let n = 1; n < count; n++) {
  xref += String(offsets[n]).padStart(10, "0") + " 00000 n \n";
}
xref += `trailer\n<< /Size ${count} /Root ${catalogNum} 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
pdf = Buffer.concat([pdf, Buffer.from(xref, "latin1")]);

const outPath = path.join(ROOT, "pitch-ALMA.pdf");
fs.writeFileSync(outPath, pdf);

console.log("✓ PDF generado:", outPath);
console.log(`  ${pages.length} páginas · ${(pdf.length / 1024).toFixed(1)} KB`);
console.log(
  `  Contenido: ${scan.recetas} recetas · ${scan.especies} insumos · ${scan.menus} menús · ${scan.intercambios} intercambios`,
);
