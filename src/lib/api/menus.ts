import { api } from "./client";
import type { Menu } from "@/screens/Menus/menus.types";

/**
 * Menús contra la API del backend (reemplazo de `@/lib/firebase/menus.repo`
 * y del mock `src/server/menus`). El mapper reconstruye el view-model `Menu`
 * (traceability/seasonalMenu anidados) desde el modelo relacional.
 */

// ── Tipos del API ──────────────────────────────────────────────────────────

export type ApiMenu = {
  id: string;
  titulo: string;
  restaurante: { id: string; nombre: string; tipo: string };
  chef_nombre: string | null;
  summary: string | null;
  categoria: { id: number; nombre: string } | null;
  cover_image: string | null;
  featured: boolean;
  tags: Array<{ tag: { id: number; nombre: string } }>;
  updated_at: string;
  tagline: string | null;
  concepts: string[];
  narrative: string | null;
  farm_to_table_pct: number | null;
  ciclo_temporada: string | null;
  traceability_note: string | null;
  eyebrow: string | null;
  star_ingrediente: { id: string; nombre: string; slug: string | null } | null;
  star_nombre: string | null;
  star_image: string | null;
  quote: string | null;
  /** Solo en el detalle */
  courses?: Array<{
    titulo: string;
    platos: Array<{ nombre: string; descripcion: string | null }>;
  }>;
  creaciones_firma?: Array<{
    nombre: string;
    precio: number | null;
    descripcion: string | null;
    origen: string | null;
    imagen_url: string | null;
  }>;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

// ── Endpoints ──────────────────────────────────────────────────────────────

export async function listMenusApi(): Promise<ApiMenu[]> {
  const res = await api.get<Paginated<ApiMenu>>("/menus?limit=100", {
    auth: false,
  });
  return res.data;
}

export function getMenuApi(id: string) {
  return api.get<ApiMenu>(`/menus/${id}`, { auth: false });
}

// ── Mapper API → view-model ────────────────────────────────────────────────

export function apiToMenu(m: ApiMenu): Menu {
  const starIngredient = m.star_nombre ?? m.star_ingrediente?.nombre ?? "";
  const tieneSeasonal =
    Boolean(starIngredient) || Boolean(m.courses?.length) || Boolean(m.quote);
  const tieneTraceability =
    m.farm_to_table_pct !== null ||
    Boolean(m.ciclo_temporada) ||
    Boolean(m.traceability_note);

  return {
    id: m.id,
    title: m.titulo,
    restaurant: m.restaurante.nombre,
    chef: m.chef_nombre ?? "",
    summary: m.summary ?? "",
    category: m.categoria?.nombre ?? "",
    coverImage: m.cover_image ?? "",
    featured: m.featured,
    tags: m.tags.map((t) => t.tag.nombre),
    updatedAt: m.updated_at,
    tagline: m.tagline ?? undefined,
    concepts: m.concepts.length ? m.concepts : undefined,
    narrative: m.narrative ?? undefined,
    signatureCreations: m.creaciones_firma?.length
      ? m.creaciones_firma.map((c) => ({
          name: c.nombre,
          price: c.precio !== null ? `Bs. ${c.precio}` : "",
          description: c.descripcion ?? "",
          origin: c.origen ?? "",
          image: c.imagen_url ?? "",
        }))
      : undefined,
    traceability: tieneTraceability
      ? {
          farmToTablePct: m.farm_to_table_pct ?? 0,
          cycle: m.ciclo_temporada ?? "",
          note: m.traceability_note ?? "",
        }
      : undefined,
    seasonalMenu: tieneSeasonal
      ? {
          eyebrow: m.eyebrow ?? "",
          title: "Menu de Temporada",
          starIngredient,
          starImage: m.star_image ?? "",
          quote: m.quote ?? "",
          courses: (m.courses ?? []).map((course) => ({
            title: course.titulo,
            dishes: course.platos.map((plato) => ({
              name: plato.nombre,
              description: plato.descripcion ?? "",
            })),
          })),
        }
      : undefined,
  };
}

/** Listado ya mapeado (para `useApiCollection`). */
export async function listMenusUi(): Promise<Menu[]> {
  const items = await listMenusApi();
  return items.map(apiToMenu);
}

/** Detalle ya mapeado (null si no existe). */
export async function getMenuUi(id: string): Promise<Menu | null> {
  try {
    return apiToMenu(await getMenuApi(id));
  } catch {
    return null;
  }
}
