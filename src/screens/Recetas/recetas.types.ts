export type RecetaCategoria = "salada" | "dulce" | "coctel" | "base";

export interface RecetaIngredienteSeccion {
  seccion: string | null;
  items: string[];
}

export interface RecetaPreparacionSeccion {
  seccion: string | null;
  pasos: string[];
}

export interface RecetaRaw {
  id: number;
  imagen?: string;
  nombre: string;
  categoria: RecetaCategoria;
  autores: string;
  contexto: string;
  ingredientes: RecetaIngredienteSeccion[];
  preparacion: RecetaPreparacionSeccion[];
}

export interface RecetarioRaw {
  fuente: string;
  publicacion: string;
  isbn: string;
  deposito_legal: string;
  total_recetas: number;
  recetas: RecetaRaw[];
}

/** Receta ya transformada para la UI (con insumos derivados). */
export interface Receta extends RecetaRaw {
  insumos: string[];
}

export interface CategoriaMeta {
  id: RecetaCategoria;
  label: string;
}
