import { api } from "./client";
import type {
  Contacto,
  TipoContacto,
} from "@/screens/Admin/Contactos/contactos.types";

/**
 * Contactos contra la API del backend. El board admin ahora lee contactos
 * REALES (tabla contactos), ya no la colección de usuarios de Firestore.
 */

export type ApiContacto = {
  id: string;
  nombre: string;
  tipo: "productor" | "proveedor" | "tienda" | "asociacion" | "restaurante";
  organizacion: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  descripcion: string | null;
  ubicacion: { id: number; nombre: string } | null;
  contacto_productos: Array<{ producto: { id: string; nombre: string } }>;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

export async function listContactosApi(): Promise<ApiContacto[]> {
  const res = await api.get<Paginated<ApiContacto>>("/contactos?limit=100");
  return res.data;
}

/**
 * El view-model sólo contempla 4 tipos; "restaurante" se muestra como "tienda"
 * (consistente con cómo los gastrónomos aparecían antes en el board).
 */
function tipoToViewModel(tipo: ApiContacto["tipo"]): TipoContacto {
  return tipo === "restaurante" ? "tienda" : tipo;
}

export function apiToContacto(c: ApiContacto): Contacto {
  return {
    id: c.id,
    nombre: c.nombre,
    tipo: tipoToViewModel(c.tipo),
    organizacion: c.organizacion ?? undefined,
    telefono: c.telefono ?? undefined,
    email: c.email ?? undefined,
    ubicacion: c.ubicacion?.nombre ?? undefined,
    direccion: c.direccion ?? undefined,
    productos: c.contacto_productos.map((cp) => cp.producto.nombre),
    descripcion: c.descripcion ?? undefined,
  };
}

/** Listado ya mapeado (para `useApiCollection`). */
export async function listContactosUi(): Promise<Contacto[]> {
  const items = await listContactosApi();
  return items.map(apiToContacto);
}
