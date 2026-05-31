import recetarioJson from "@/mocks/recetas.json";
import type {
  Receta,
  RecetaCategoria,
  RecetarioRaw,
} from "./recetas.types";

const recetario = recetarioJson as unknown as RecetarioRaw;

/**
 * Insumos emblemáticos del bosque seco chiquitano. El orden importa: se
 * muestran como badges en las tarjetas en este orden de prioridad.
 */
const INSUMOS_CLAVE = [
  "asaí",
  "almendra chiquitana",
  "motacú",
  "totaí",
  "majo",
  "mangaba",
  "yuca",
  "paiche",
  "llama",
  "charque",
  "cuy",
  "tarwi",
  "chuño",
  "tunta",
  "quinua",
  "cañahua",
  "racacha",
  "papalisa",
  "urucú",
  "k'oa",
  "paja cedrón",
  "flor de colonia",
  "trucha",
  "amaranto",
] as const;

/** Texto normalizado (minúsculas, sin tildes) para comparar insumos. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Deriva los insumos clave presentes en los ingredientes de una receta. */
function derivarInsumos(textoIngredientes: string): string[] {
  const base = normalizar(textoIngredientes);
  return INSUMOS_CLAVE.filter((insumo) =>
    base.includes(normalizar(insumo)),
  ).slice(0, 3);
}

/** Catálogo de recetas listo para la UI, con insumos derivados. */
export const RECETAS: Receta[] = recetario.recetas.map((receta) => {
  const textoIngredientes = receta.ingredientes
    .flatMap((seccion) => seccion.items)
    .join(" | ");

  return {
    ...receta,
    insumos: derivarInsumos(textoIngredientes),
  };
});

/** Busca una receta por su id numérico (string desde la URL). */
export function getRecetaById(id: string | number): Receta | undefined {
  const numId = typeof id === "string" ? Number.parseInt(id, 10) : id;
  if (Number.isNaN(numId)) return undefined;
  return RECETAS.find((receta) => receta.id === numId);
}

export const RECETARIO_META = {
  fuente: recetario.fuente,
  publicacion: recetario.publicacion,
  total: RECETAS.length,
};

export const CATEGORIA_LABEL: Record<RecetaCategoria, string> = {
  salada: "Elaboración salada",
  dulce: "Elaboración dulce",
  coctel: "Cóctel / Bebida",
  base: "Preparación base",
};

/** Lista de insumos únicos presentes en el recetario (para el filtro). */
export const INSUMOS_DISPONIBLES: string[] = Array.from(
  new Set(RECETAS.flatMap((receta) => receta.insumos)),
).sort((a, b) => a.localeCompare(b, "es"));

/** Lista de autores/grupos únicos (para el filtro). */
export const AUTORES_DISPONIBLES: string[] = Array.from(
  new Set(RECETAS.map((receta) => receta.autores)),
).sort((a, b) => a.localeCompare(b, "es"));
