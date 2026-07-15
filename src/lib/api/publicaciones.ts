import { api } from "./client";
import type {
  EstadoPublicacion,
  Publicacion,
} from "@/screens/Admin/Publicaciones/publicaciones.types";

/**
 * Publicaciones contra la API del backend (reemplazo de
 * `@/lib/firebase/publicaciones.repo`). El listado es admin (moderación).
 */

const MES_ABBR = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

export type ApiPublicacion = {
  id: string;
  titulo: string;
  descripcion: string | null;
  categoria_texto: string | null;
  estado: EstadoPublicacion;
  imagen_url: string | null;
  fecha_publicacion: string | null;
  autor_contacto: { id: string; nombre: string; organizacion: string | null } | null;
  producto: { id: string; nombre: string } | null;
  categoria_propuesta: { id: string; nombre: string } | null;
  ubicacion: { id: number; nombre: string } | null;
  ciclos: Array<{ mes_inicio: number; mes_fin: number; orden: number }>;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

// ── Endpoints ──────────────────────────────────────────────────────────────

export async function listPublicacionesApi(): Promise<ApiPublicacion[]> {
  const res = await api.get<Paginated<ApiPublicacion>>(
    "/publicaciones?limit=100",
  );
  return res.data;
}

export function updatePublicacionApi(id: string, payload: PublicacionPayload) {
  return api.patch<ApiPublicacion>(`/publicaciones/${id}`, payload);
}

export function setEstadoPublicacionApi(id: string, estado: EstadoPublicacion) {
  return api.patch<ApiPublicacion>(`/publicaciones/${id}/estado`, { estado });
}

export function deletePublicacionApi(id: string) {
  return api.delete<{ deleted: boolean }>(`/publicaciones/${id}`);
}

// ── Mappers ──────────────────────────────────────────────────────────────

type PublicacionPayload = {
  titulo: string;
  descripcion?: string;
  tipo?: string;
  producto?: string;
  organizacion?: string;
  autor?: string;
  ubicacion?: string;
  imagen?: string;
  fecha?: string;
  ciclos?: Array<{ inicio: string; fin?: string }>;
};

export function apiToPublicacion(p: ApiPublicacion): Publicacion {
  return {
    id: p.id,
    titulo: p.titulo,
    descripcion: p.descripcion ?? "",
    tipo: p.categoria_texto ?? "",
    producto: p.producto?.nombre ?? p.categoria_propuesta?.nombre ?? undefined,
    organizacion: p.autor_contacto?.organizacion ?? undefined,
    estado: p.estado,
    imagen: p.imagen_url ?? "",
    autor: p.autor_contacto?.nombre ?? "",
    ubicacion: p.ubicacion?.nombre ?? "",
    fecha: p.fecha_publicacion
      ? p.fecha_publicacion.slice(0, 10)
      : "",
    ciclos: p.ciclos.map((c) => {
      const inicio = MES_ABBR[c.mes_inicio - 1] ?? "";
      const fin = MES_ABBR[c.mes_fin - 1] ?? "";
      return c.mes_inicio === c.mes_fin ? { inicio } : { inicio, fin };
    }),
  };
}

/** Objeto Publicacion del front → payload de update (el board manda el objeto completo). */
export function publicacionToPayload(p: Publicacion): PublicacionPayload {
  return {
    titulo: p.titulo,
    descripcion: p.descripcion || undefined,
    tipo: p.tipo || undefined,
    producto: p.producto || undefined,
    organizacion: p.organizacion || undefined,
    autor: p.autor || undefined,
    ubicacion: p.ubicacion || undefined,
    imagen: p.imagen || undefined,
    fecha: p.fecha || undefined,
    ciclos: p.ciclos,
  };
}

/** Listado ya mapeado (para `useApiCollection`). */
export async function listPublicacionesUi(): Promise<Publicacion[]> {
  const items = await listPublicacionesApi();
  return items.map(apiToPublicacion);
}
