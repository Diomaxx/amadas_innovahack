import { api } from "./client";
import { derivarInsumos } from "@/screens/Recetas/recetas.data";
import type {
  Receta,
  RecetaCategoria,
  RecetaIngredienteSeccion,
  RecetaPreparacionSeccion,
} from "@/screens/Recetas/recetas.types";

/**
 * Recetas contra la API del backend (reemplazo de
 * `@/lib/firebase/recetas.repo`). El backend guarda secciones unificadas;
 * aquí se reconstruye la forma UI (ingredientes/preparación por separado).
 */

// ── Tipos del API ──────────────────────────────────────────────────────────

export type ApiReceta = {
  id: string;
  nombre: string;
  categoria: RecetaCategoria;
  contexto: string | null;
  imagen_url: string | null;
  autores: Array<{ nombre: string; orden: number }>;
  secciones: Array<{
    nombre: string | null;
    orden: number;
    ingredientes: Array<{ texto: string; orden: number }>;
    pasos: Array<{ texto: string; orden: number }>;
  }>;
  insumos: Array<{ producto: { id: string; nombre: string; slug: string | null } }>;
};

export type RecetaPayload = {
  nombre: string;
  categoria: RecetaCategoria;
  contexto?: string;
  imagen?: string;
  autores?: string;
  ingredientes?: RecetaIngredienteSeccion[];
  preparacion?: Array<{ seccion: string | null; pasos: string[] }>;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

// ── Endpoints ──────────────────────────────────────────────────────────────

export async function listRecetasApi(): Promise<ApiReceta[]> {
  const res = await api.get<Paginated<ApiReceta>>("/recetas?limit=100", {
    auth: false,
  });
  return res.data;
}

export function getRecetaApi(id: string | number) {
  return api.get<ApiReceta>(`/recetas/${id}`, { auth: false });
}

export function createRecetaApi(payload: RecetaPayload) {
  return api.post<ApiReceta>("/recetas", payload);
}

export function updateRecetaApi(id: number, payload: Partial<RecetaPayload>) {
  return api.patch<ApiReceta>(`/recetas/${id}`, payload);
}

export function deleteRecetaApi(id: number) {
  return api.delete<{ deleted: boolean }>(`/recetas/${id}`);
}

// ── Mappers API ⇄ view-model ───────────────────────────────────────────────

export function apiToReceta(r: ApiReceta): Receta {
  const ingredientes: RecetaIngredienteSeccion[] = r.secciones
    .filter((s) => s.ingredientes.length > 0)
    .map((s) => ({
      seccion: s.nombre,
      items: s.ingredientes.map((i) => i.texto),
    }));

  const preparacion: RecetaPreparacionSeccion[] = r.secciones
    .filter((s) => s.pasos.length > 0)
    .map((s) => ({ seccion: s.nombre, pasos: s.pasos.map((p) => p.texto) }));

  const textoIngredientes = ingredientes
    .flatMap((s) => s.items)
    .join(" | ");

  return {
    id: Number(r.id),
    imagen: r.imagen_url ?? undefined,
    nombre: r.nombre,
    categoria: r.categoria,
    autores: r.autores.map((a) => a.nombre).join(", "),
    contexto: r.contexto ?? "",
    ingredientes,
    preparacion,
    // Insumos de display: misma derivación por texto que usaba el mock
    // (receta_insumos del backend vincula productos reales, uso futuro).
    insumos: derivarInsumos(textoIngredientes),
  };
}

export function recetaToPayload(r: Receta): RecetaPayload {
  return {
    nombre: r.nombre,
    categoria: r.categoria,
    contexto: r.contexto || undefined,
    imagen: r.imagen || undefined,
    autores: r.autores || undefined,
    ingredientes: r.ingredientes,
    preparacion: r.preparacion,
  };
}

/** Listado ya mapeado (para `useApiCollection`). */
export async function listRecetasUi(): Promise<Receta[]> {
  const items = await listRecetasApi();
  return items.map(apiToReceta);
}

/** Detalle ya mapeado (null si no existe). */
export async function getRecetaUi(id: string | number): Promise<Receta | null> {
  try {
    return apiToReceta(await getRecetaApi(id));
  } catch {
    return null;
  }
}
