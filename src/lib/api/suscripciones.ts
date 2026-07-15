import { api } from "./client";

/** Suscripciones del usuario a un producto o categoría (alertas de temporada). */

export type ApiSuscripcion = {
  id: string;
  producto: { id: string; nombre: string; slug: string | null } | null;
  categoria: { id: number; nombre: string } | null;
  created_at: string;
};

export function listSuscripciones() {
  return api.get<ApiSuscripcion[]>("/suscripciones");
}

/** Suscribirse a un producto XOR una categoría (exactamente uno). */
export function createSuscripcion(payload: {
  productoId?: number;
  categoriaId?: number;
}) {
  return api.post<ApiSuscripcion>("/suscripciones", payload);
}

export function deleteSuscripcion(id: string) {
  return api.delete<{ deleted: boolean }>(`/suscripciones/${id}`);
}

/** Resuelve el id de una categoría de producto por nombre (para suscribirse a ella). */
export async function resolveCategoriaId(
  nombre: string,
): Promise<number | null> {
  const cats = await api.get<Array<{ id: number; nombre: string }>>(
    "/catalogos/categorias-producto",
    { auth: false },
  );
  const match = cats.find(
    (c) => c.nombre.toLowerCase() === nombre.trim().toLowerCase(),
  );
  return match?.id ?? null;
}
