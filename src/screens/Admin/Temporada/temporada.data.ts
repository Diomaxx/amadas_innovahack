import catalogoData from "@/mocks/catalogoData.json";
import temporadasData from "@/mocks/temporadas.json";
import type {
  CalendarioCosecha,
  Ciclo,
  EstadoTemporada,
  MesCosecha,
  ProductoFormValues,
  ProductoTemporada,
} from "./temporada.types";

/* ── Meses ─────────────────────────────────────────────────────────── */

export const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const MES_LOWER = MESES.map((m) => m.toLowerCase());

const MES_ABBR = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

/* ── Categorías y estados ──────────────────────────────────────────── */

export const CATEGORIAS = [
  "Fruta",
  "Aceite / Fruta",
  "Nuez / Semilla",
  "Miel",
  "Infusión",
  "Raíz",
];

export const ESTADOS: EstadoTemporada[] = [
  "En temporada",
  "Próximamente",
  "Finalizando",
  "Fuera de temporada",
];

/** Estilos (chip) por estado de temporada. */
export const ESTADO_VISUAL: Record<string, string> = {
  "En temporada": "bg-cv-green-100 text-cv-green-800",
  "Próximamente": "bg-amber-100 text-amber-700",
  "Finalizando": "bg-rose-100 text-rose-700",
  "Fuera de temporada": "bg-cv-gray-100 text-cv-gray-600",
};

/** Grupo de filtro al que pertenece cada categoría. */
export type FiltroGrupo = "Frutos" | "Semillas" | "Aceites" | "Miel" | "Otros";

export const FILTROS: ("Todos" | FiltroGrupo)[] = [
  "Todos", "Frutos", "Semillas", "Aceites", "Miel", "Otros",
];

const GRUPO_POR_CATEGORIA: Record<string, FiltroGrupo> = {
  "Fruta": "Frutos",
  "Aceite / Fruta": "Aceites",
  "Nuez / Semilla": "Semillas",
  "Miel": "Miel",
  "Infusión": "Otros",
  "Raíz": "Otros",
};

export function grupoDeCategoria(categoria: string): FiltroGrupo {
  return GRUPO_POR_CATEGORIA[categoria] ?? "Otros";
}

/* ── Texto normalizado para comparar (join con temporadas.json) ────── */

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/** Mapa: nombre científico normalizado → meses de temporada (minúsculas). */
const MESES_POR_CIENTIFICO = new Map<string, string[]>(
  temporadasData.documents.map((d) => [
    normalizar(d.nombreCientifico),
    d.temporadaMeses,
  ]),
);

/* ── Ciclos ↔ meses ────────────────────────────────────────────────── */

/** Construye el set booleano de 12 meses a partir de nombres en minúscula. */
function mesesToSet(meses: string[]): boolean[] {
  const set = new Array(12).fill(false);
  for (const m of meses) {
    const idx = MES_LOWER.indexOf(normalizar(m));
    if (idx >= 0) set[idx] = true;
  }
  return set;
}

/** Agrupa los meses en ciclos contiguos (considera el salto Dic→Ene). */
export function mesesToCiclos(meses: string[]): Ciclo[] {
  const set = mesesToSet(meses);
  if (set.every(Boolean)) return [{ inicio: 0, fin: 11 }];

  const ciclos: Ciclo[] = [];
  for (let i = 0; i < 12; i++) {
    const prev = (i + 11) % 12;
    if (set[i] && !set[prev]) {
      let j = i;
      while (set[(j + 1) % 12] && (j + 1) % 12 !== i) j++;
      ciclos.push({ inicio: i, fin: j % 12 });
    }
  }
  return ciclos.length > 0 ? ciclos : [];
}

/** Expande ciclos a una lista de meses en minúscula (inclusivo, cíclico). */
export function ciclosToMeses(ciclos: Ciclo[]): string[] {
  const set = new Array(12).fill(false);
  for (const { inicio, fin } of ciclos) {
    let i = inicio;
    set[i] = true;
    while (i !== fin) {
      i = (i + 1) % 12;
      set[i] = true;
    }
  }
  return MES_LOWER.filter((_, idx) => set[idx]);
}

/** Texto legible de un ciclo, ej. "Agosto - Octubre". */
export function formatCiclo(ciclo: Ciclo): string {
  return `${MESES[ciclo.inicio]} - ${MESES[ciclo.fin]}`;
}

/* ── Calendario de cosecha derivado (para productos creados/editados) ─ */

function buildCalendario(ciclos: Ciclo[]): CalendarioCosecha {
  const todoElAnio =
    ciclos.length === 1 && ciclos[0].inicio === 0 && ciclos[0].fin === 11;

  const temporadaPrincipal = todoElAnio
    ? "Todo el año"
    : ciclos.map(formatCiclo).join("  ·  ") || "Sin temporada definida";

  const meses: MesCosecha[] = [];
  for (const ciclo of ciclos) {
    const indices: number[] = [];
    let i = ciclo.inicio;
    indices.push(i);
    while (i !== ciclo.fin) {
      i = (i + 1) % 12;
      indices.push(i);
    }
    indices.forEach((idx, pos) => {
      let estado = "en-temporada";
      if (!todoElAnio && indices.length > 1) {
        if (pos === 0) estado = "comienza";
        else if (pos === indices.length - 1) estado = "ultimos-dias";
      }
      meses.push({ mes: MES_ABBR[idx], estado });
    });
  }

  return {
    temporadaPrincipal,
    meses,
    mensaje: todoElAnio
      ? "Disponible durante todo el año."
      : "Temporada definida por los ciclos de cosecha del producto.",
  };
}

/* ── Carga inicial: especies del catálogo enriquecidas ─────────────── */

function enriquecer(especie: ProductoTemporada): ProductoTemporada {
  const meses =
    MESES_POR_CIENTIFICO.get(normalizar(especie.nombreCientifico)) ?? [];
  return {
    ...especie,
    temporadaMeses: meses,
  };
}

export const PRODUCTOS_INICIALES: ProductoTemporada[] = (
  catalogoData.especies as ProductoTemporada[]
).map(enriquecer);

/* ── Mapeos formulario ⇄ producto ──────────────────────────────────── */

export function productoToForm(producto: ProductoTemporada): ProductoFormValues {
  const ciclos = mesesToCiclos(producto.temporadaMeses ?? []);
  return {
    nombre: producto.nombre,
    nombreCientifico: producto.nombreCientifico,
    categoria: producto.categoria,
    estado: producto.temporada as EstadoTemporada,
    ciclos: ciclos.length > 0 ? ciclos : [{ inicio: 0, fin: 0 }],
    descripcion: producto.descripcion,
    propiedadesTexto: producto.propiedades.join(", "),
    usosGastronomicosTexto: producto.usosGastronomicos.join(", "),
    imageSrc: producto.imageSrc,
  };
}

export function formValuesVacios(): ProductoFormValues {
  return {
    nombre: "",
    nombreCientifico: "",
    categoria: CATEGORIAS[0],
    estado: "En temporada",
    ciclos: [{ inicio: 0, fin: 0 }],
    descripcion: "",
    propiedadesTexto: "",
    usosGastronomicosTexto: "",
    imageSrc: undefined,
  };
}

/**
 * Aplica los valores del formulario sobre un producto. Si `base` existe se
 * edita (conserva id, esencia, propiedades y disponibilidad originales); si
 * no, se crea uno nuevo con `nuevoId` (inserción al catálogo).
 */
export function formToProducto(
  values: ProductoFormValues,
  base: ProductoTemporada | null,
  nuevoId: string,
): ProductoTemporada {
  const propiedades = values.propiedadesTexto
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const usosGastronomicos = values.usosGastronomicosTexto
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
  const temporadaMeses = ciclosToMeses(values.ciclos);

  return {
    id: base?.id ?? nuevoId,
    nombre: values.nombre.trim(),
    nombreCientifico: values.nombreCientifico.trim(),
    categoria: values.categoria,
    temporada: values.estado,
    descripcion: values.descripcion.trim(),
    esencia: base?.esencia ?? values.descripcion.trim(),
    propiedades,
    usosGastronomicos,
    calendarioCosecha: buildCalendario(values.ciclos),
    disponibilidad: base?.disponibilidad ?? [],
    temporadaMeses,
    imageSrc: values.imageSrc,
  };
}

/** Siguiente id disponible (los ids del catálogo son numéricos en string). */
export function siguienteId(productos: ProductoTemporada[]): string {
  const max = productos.reduce((acc, p) => {
    const n = Number.parseInt(p.id, 10);
    return Number.isNaN(n) ? acc : Math.max(acc, n);
  }, 0);
  return String(max + 1);
}
