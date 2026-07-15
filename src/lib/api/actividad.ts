import { api } from "./client";
import type { ActividadEntry } from "@/screens/Admin/Actividad/actividad.types";

/**
 * Actividad contra la API del backend (reemplazo de
 * `@/lib/firebase/actividad.repo`). El feed ahora se ESCRIBE server-side dentro
 * de cada mutación; el front solo lo LEE (ya no hay `logActividad` en cliente).
 */

export type ApiActividad = {
  id: string;
  titulo: string;
  descripcion: string | null;
  accion: string;
  categoria: string;
  autor_nombre: string | null;
  fecha: string;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export async function listActividadApi(): Promise<ApiActividad[]> {
  const res = await api.get<Paginated<ApiActividad>>("/actividad?limit=100");
  return res.data;
}

const ACCIONES = new Set([
  "aprobacion", "rechazo", "edicion", "creacion", "eliminacion", "suscripcion",
]);
const CATEGORIAS = new Set([
  "productor", "asociacion", "tienda", "proveedor", "sistema",
]);

export function apiToActividad(a: ApiActividad): ActividadEntry {
  return {
    id: a.id,
    titulo: a.titulo,
    descripcion: a.descripcion ?? "",
    accion: (ACCIONES.has(a.accion)
      ? a.accion
      : "edicion") as ActividadEntry["accion"],
    categoria: (CATEGORIAS.has(a.categoria)
      ? a.categoria
      : "sistema") as ActividadEntry["categoria"],
    fecha: a.fecha ? a.fecha.slice(0, 10) : "",
    autor: a.autor_nombre ?? undefined,
  };
}

/** Listado ya mapeado (para `useApiCollection`). */
export async function listActividadUi(): Promise<ActividadEntry[]> {
  const items = await listActividadApi();
  return items.map(apiToActividad);
}
