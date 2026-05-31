/**
 * Motor del calendario vivo de temporadas.
 *
 * Cruza los meses de temporada de cada producto (`temporadas.json`) con la
 * fecha actual y deriva — de forma dinámica — si el producto está en temporada,
 * próximo a iniciar o por terminar, además del aviso textual correspondiente.
 *
 * Separa contenido (los meses en el JSON) de la presentación (los componentes),
 * de modo que actualizar una temporada no requiere tocar este código.
 */

import temporadasRaw from "@/mocks/temporadas.json";

/* ── Tipos ───────────────────────────────────────────────────────────── */

/** Estado calculado según la fecha actual. */
export type EstadoTemporada = "en-temporada" | "proxima" | "por-terminar" | "fuera";

/** Etiqueta legible compatible con los filtros/badges existentes. */
export type Temporada = "En temporada" | "Próximamente" | "Finalizando";

export interface EstadoTemporadaInfo {
  estado: EstadoTemporada;
  /** Etiqueta de 3 valores usada por los filtros y badges del catálogo. */
  temporada: Temporada;
  enTemporada: boolean;
  /** Meses que faltan para que inicie la temporada (null si ya está en curso). */
  mesesParaInicio: number | null;
  /** Índice del mes actual (0–11). */
  mesActual: number;
}

/* ── Constantes ──────────────────────────────────────────────────────── */

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** Abreviaturas que usa el timeline de la ficha (`calendarioCosecha.meses`). */
export const MES_CORTO = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

/** Un producto cuya temporada inicia dentro de este margen se considera "próxima". */
const MESES_UMBRAL_PROXIMA = 2;

/* ── Lookup de meses por producto ────────────────────────────────────── */

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

type TemporadaDoc = {
  id: string;
  nombreComun: string;
  nombreCientifico: string;
  temporadaMeses: string[];
};

const documentos = (temporadasRaw.documents ?? []) as TemporadaDoc[];

/** Índices de mes (0–11) por nombre científico normalizado. */
const mesesPorCientifico = new Map<string, number[]>();

for (const doc of documentos) {
  const indices = (doc.temporadaMeses ?? [])
    .map((m) => MESES.indexOf(normalizar(m)))
    .filter((i) => i >= 0);
  mesesPorCientifico.set(normalizar(doc.nombreCientifico), indices);
}

/** Devuelve los meses de temporada (0–11) de un producto por su nombre científico. */
export function getTemporadaMeses(nombreCientifico: string): number[] {
  return mesesPorCientifico.get(normalizar(nombreCientifico)) ?? [];
}

/* ── Cálculo del estado ──────────────────────────────────────────────── */

const FUERA: Pick<EstadoTemporadaInfo, "estado" | "temporada" | "enTemporada"> = {
  estado: "fuera",
  temporada: "Próximamente",
  enTemporada: false,
};

/**
 * Calcula el estado de temporada comparando los meses del producto con la fecha
 * actual: en temporada, por terminar (último mes antes de un corte), próxima a
 * iniciar (dentro del umbral) o fuera de temporada.
 */
export function calcularEstado(meses: number[], ahora: Date): EstadoTemporadaInfo {
  const mes = ahora.getMonth();

  if (meses.length === 0) {
    return { ...FUERA, mesesParaInicio: null, mesActual: mes };
  }

  const disponibles = new Set(meses);

  if (disponibles.has(mes)) {
    const siguiente = (mes + 1) % 12;
    if (!disponibles.has(siguiente)) {
      return {
        estado: "por-terminar",
        temporada: "Finalizando",
        enTemporada: true,
        mesesParaInicio: null,
        mesActual: mes,
      };
    }
    return {
      estado: "en-temporada",
      temporada: "En temporada",
      enTemporada: true,
      mesesParaInicio: null,
      mesActual: mes,
    };
  }

  // Fuera de temporada: ¿cuántos meses faltan para que inicie?
  let distancia: number | null = null;
  for (let k = 1; k <= 12; k++) {
    if (disponibles.has((mes + k) % 12)) {
      distancia = k;
      break;
    }
  }

  if (distancia !== null && distancia <= MESES_UMBRAL_PROXIMA) {
    return {
      estado: "proxima",
      temporada: "Próximamente",
      enTemporada: false,
      mesesParaInicio: distancia,
      mesActual: mes,
    };
  }

  return { ...FUERA, mesesParaInicio: distancia, mesActual: mes };
}

/** Atajo: calcula el estado de un producto por su nombre científico. */
export function estadoPorCientifico(
  nombreCientifico: string,
  ahora: Date,
): EstadoTemporadaInfo {
  return calcularEstado(getTemporadaMeses(nombreCientifico), ahora);
}

/* ── Avisos textuales ────────────────────────────────────────────────── */

/**
 * Genera el aviso visible para un producto:
 *  - "Ya inició la temporada de X"
 *  - "Está por terminar la temporada de Y"
 *  - "Se acerca la temporada de Z"
 */
export function mensajeAlerta(nombre: string, info: EstadoTemporadaInfo): string {
  switch (info.estado) {
    case "en-temporada":
      return `Ya inició la temporada de ${nombre}.`;
    case "por-terminar":
      return `Está por terminar la temporada de ${nombre}.`;
    case "proxima":
      return info.mesesParaInicio === 1
        ? `Se acerca la temporada de ${nombre}: inicia el próximo mes.`
        : `Se acerca la temporada de ${nombre}: inicia en ${info.mesesParaInicio} meses.`;
    default:
      return info.mesesParaInicio
        ? `La temporada de ${nombre} aún no comienza (en ~${info.mesesParaInicio} meses).`
        : `${nombre} está fuera de temporada por ahora.`;
  }
}
