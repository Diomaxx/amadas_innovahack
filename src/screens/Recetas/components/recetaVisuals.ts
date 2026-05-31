import { ForkKnife, IceCream, Martini, Drop } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import type { RecetaCategoria } from "../recetas.types";

export interface CategoriaVisual {
  label: string;
  Icon: Icon;
  /** color del texto/acento */
  color: string;
  /** color de fondo translúcido para el chip */
  bg: string;
}

/** Estilo (icono + colores) por categoría, alineado a la paleta del proyecto. */
export const CATEGORIA_VISUAL: Record<RecetaCategoria, CategoriaVisual> = {
  salada: {
    label: "Elaboración salada",
    Icon: ForkKnife,
    color: "#2d4a3e",
    bg: "rgba(45, 74, 62, 0.08)",
  },
  dulce: {
    label: "Elaboración dulce",
    Icon: IceCream,
    color: "#b06a4a",
    bg: "rgba(176, 106, 74, 0.10)",
  },
  coctel: {
    label: "Cóctel / Bebida",
    Icon: Martini,
    color: "#c9a86a",
    bg: "rgba(201, 168, 106, 0.14)",
  },
  base: {
    label: "Preparación base",
    Icon: Drop,
    color: "#7a9b76",
    bg: "rgba(122, 155, 118, 0.14)",
  },
};
