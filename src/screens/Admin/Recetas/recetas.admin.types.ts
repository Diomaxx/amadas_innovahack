import type { RecetaCategoria } from "@/screens/Recetas/recetas.types";

/**
 * Una sección de ingredientes o preparación tal como se edita en el formulario.
 * `contenido` es texto multilínea: cada línea es un item (ingrediente) o paso.
 */
export type SeccionFormValue = {
  seccion: string;
  contenido: string;
};

/** Valores del formulario de receta (crear/editar comparten esta forma). */
export type RecetaFormValues = {
  nombre: string;
  categoria: RecetaCategoria;
  autores: string;
  contexto: string;
  /** URL de la imagen (Cloudinary). Vacío si no tiene. */
  imagen: string;
  ingredientes: SeccionFormValue[];
  preparacion: SeccionFormValue[];
};
