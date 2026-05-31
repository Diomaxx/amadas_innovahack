import { derivarInsumos } from "@/screens/Recetas/recetas.data";
import type { Receta, RecetaCategoria } from "@/screens/Recetas/recetas.types";
import type { RecetaFormValues } from "./recetas.admin.types";

/** Categorías disponibles, en orden de presentación (stats + filtros + select). */
export const CATEGORIAS: RecetaCategoria[] = ["salada", "dulce", "coctel", "base"];

/** Etiqueta corta para badges y filtros. */
export const CATEGORIA_SHORT: Record<RecetaCategoria, string> = {
  salada: "Salada",
  dulce: "Dulce",
  coctel: "Cóctel",
  base: "Base",
};

/** Convierte un bloque de texto multilínea en una lista de líneas limpias. */
function lineasDesdeTexto(texto: string): string[] {
  return texto
    .split("\n")
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 0);
}

/** Convierte una receta existente a los valores que consume el formulario. */
export function recetaToFormValues(receta: Receta): RecetaFormValues {
  return {
    nombre: receta.nombre,
    categoria: receta.categoria,
    autores: receta.autores,
    contexto: receta.contexto,
    ingredientes: receta.ingredientes.map((s) => ({
      seccion: s.seccion ?? "",
      contenido: s.items.join("\n"),
    })),
    preparacion: receta.preparacion.map((s) => ({
      seccion: s.seccion ?? "",
      contenido: s.pasos.join("\n"),
    })),
  };
}

/** Valores iniciales para crear una receta nueva (formulario vacío). */
export function formValuesVacios(): RecetaFormValues {
  return {
    nombre: "",
    categoria: "salada",
    autores: "",
    contexto: "",
    ingredientes: [{ seccion: "", contenido: "" }],
    preparacion: [{ seccion: "", contenido: "" }],
  };
}

/**
 * Aplica los valores del formulario sobre una receta. Si `base` existe se edita
 * (conserva su id); si no, se crea una nueva con `nuevoId`.
 */
export function formValuesToReceta(
  values: RecetaFormValues,
  base: Receta | null,
  nuevoId: number,
): Receta {
  const ingredientes = values.ingredientes.map((s) => ({
    seccion: s.seccion.trim() || null,
    items: lineasDesdeTexto(s.contenido),
  }));

  const preparacion = values.preparacion.map((s) => ({
    seccion: s.seccion.trim() || null,
    pasos: lineasDesdeTexto(s.contenido),
  }));

  const textoIngredientes = ingredientes
    .flatMap((s) => s.items)
    .join(" | ");

  return {
    id: base?.id ?? nuevoId,
    imagen: base?.imagen ?? "",
    nombre: values.nombre.trim(),
    categoria: values.categoria,
    autores: values.autores.trim(),
    contexto: values.contexto.trim(),
    ingredientes,
    preparacion,
    insumos: derivarInsumos(textoIngredientes),
  };
}

/** Siguiente id disponible para una receta nueva. */
export function siguienteId(recetas: Receta[]): number {
  return recetas.reduce((max, r) => Math.max(max, r.id), 0) + 1;
}
