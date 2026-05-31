import type { Contacto, TipoContacto } from "@/screens/Admin/Contactos/contactos.types";
import type { EstadoPublicacion, Publicacion } from "@/screens/Admin/Publicaciones/publicaciones.types";
import type { ProductoTemporada } from "@/screens/Admin/Temporada/temporada.types";
import type { Receta, RecetaCategoria } from "@/screens/Recetas/recetas.types";

/** Meses en minúscula, alineados con `temporadaMeses` de los productos. */
export const MESES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/** Devuelve el nombre del mes actual en minúscula (ej. "mayo"). */
export function mesActual(date: Date): string {
  return MESES[date.getMonth()];
}

/** Capitaliza la primera letra de una palabra. */
export function capitalizar(texto: string): string {
  if (!texto) return texto;
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** Formatea una fecha larga en español, ej. "31 de mayo de 2026". */
export function fechaLarga(date: Date): string {
  return `${date.getDate()} de ${MESES[date.getMonth()]} de ${date.getFullYear()}`;
}

export const TIPO_CONTACTO_LABEL: Record<TipoContacto, string> = {
  productor: "Productores",
  asociacion: "Asociaciones",
  tienda: "Tiendas",
  proveedor: "Proveedores",
};

export const ESTADO_PUB_LABEL: Record<EstadoPublicacion, string> = {
  pendiente: "Pendientes",
  aprobado: "Aprobadas",
  rechazado: "Rechazadas",
};

export const ESTADO_PUB_COLOR: Record<EstadoPublicacion, string> = {
  pendiente: "#B06A3F",
  aprobado: "#2D7A4F",
  rechazado: "#C0392B",
};

export const CATEGORIA_RECETA_LABEL: Record<RecetaCategoria, string> = {
  salada: "Saladas",
  dulce: "Dulces",
  coctel: "Cócteles",
  base: "Bases",
};

export type Conteo = { clave: string; label: string; valor: number; color: string };

/** Agrupa contactos por tipo en un arreglo ordenado y listo para graficar. */
export function contactosPorTipo(contactos: Contacto[]): Conteo[] {
  const orden: TipoContacto[] = ["productor", "asociacion", "tienda", "proveedor"];
  const paleta = ["#2D6A4A", "#3E7C71", "#2B6A93", "#9C7C3C"];
  return orden.map((tipo, i) => ({
    clave: tipo,
    label: TIPO_CONTACTO_LABEL[tipo],
    valor: contactos.filter((c) => c.tipo === tipo).length,
    color: paleta[i],
  }));
}

/** Agrupa recetas por categoría. */
export function recetasPorCategoria(recetas: Receta[]): Conteo[] {
  const orden: RecetaCategoria[] = ["salada", "dulce", "coctel", "base"];
  const paleta = ["#2d4a3e", "#b06a4a", "#c9a86a", "#7a9b76"];
  return orden.map((cat, i) => ({
    clave: cat,
    label: CATEGORIA_RECETA_LABEL[cat],
    valor: recetas.filter((r) => r.categoria === cat).length,
    color: paleta[i],
  }));
}

/** Agrupa publicaciones por estado. */
export function publicacionesPorEstado(publicaciones: Publicacion[]): Conteo[] {
  const orden: EstadoPublicacion[] = ["aprobado", "pendiente", "rechazado"];
  return orden.map((estado) => ({
    clave: estado,
    label: ESTADO_PUB_LABEL[estado],
    valor: publicaciones.filter((p) => p.estado === estado).length,
    color: ESTADO_PUB_COLOR[estado],
  }));
}

/** Productos en cosecha durante el mes indicado. */
export function productosEnTemporada(
  productos: ProductoTemporada[],
  mes: string,
): ProductoTemporada[] {
  return productos.filter((p) => p.temporadaMeses?.includes(mes));
}

/** Distribución de productos por categoría (texto libre del catálogo). */
export function productosPorCategoria(productos: ProductoTemporada[]): Conteo[] {
  const conteo = new Map<string, number>();
  for (const p of productos) {
    const cat = p.categoria?.trim() || "Sin categoría";
    conteo.set(cat, (conteo.get(cat) ?? 0) + 1);
  }
  const paleta = ["#2D6A4A", "#3E7C71", "#9C7C3C", "#2B6A93", "#7a9b76", "#b06a4a"];
  return [...conteo.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([label, valor], i) => ({
      clave: label,
      label,
      valor,
      color: paleta[i % paleta.length],
    }));
}
