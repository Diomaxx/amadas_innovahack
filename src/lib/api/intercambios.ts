import { api } from "./client";
import type { Intercambio } from "@/screens/Intercambio/intercambio.types";

/**
 * Intercambios contra la API del backend (reemplazo de
 * `@/lib/firebase/intercambios.repo`). Marketplace público; crear requiere sesión.
 */

export type ApiIntercambio = {
  id: string;
  titulo: string;
  tipo: "raw_material" | "servicios";
  estado: "en_temporada" | "disponible";
  busca: string | null;
  precio_min: number | null;
  precio_max: number | null;
  unidad_precio: string | null;
  rol_productor: "vendedor_verificado" | "socio_estrategico" | null;
  accion: "proponer_trato" | "enviar_consulta";
  imagen_url: string | null;
  created_at: string;
  creado_por_user_id: string | null;
  contacto: { id: string; nombre: string; tipo: string };
  categoria: { id: number; nombre: string } | null;
  ubicacion: { id: number; nombre: string } | null;
  raw_payload: Record<string, unknown> | null;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

// ── Endpoints ──────────────────────────────────────────────────────────────

export async function listIntercambiosApi(): Promise<ApiIntercambio[]> {
  const res = await api.get<Paginated<ApiIntercambio>>(
    "/intercambios?limit=100",
    { auth: false },
  );
  return res.data;
}

/** Publicar oferta (requiere Bearer). Payload = Omit<Intercambio,"id">. */
export function createIntercambioApi(payload: Omit<Intercambio, "id">) {
  return api.post<ApiIntercambio>("/intercambios", payload);
}

// ── Mappers ──────────────────────────────────────────────────────────────

function formatRango(
  min: number | null,
  max: number | null,
  unidad: string | null,
): string {
  if (min === null && max === null) return "A convenir";
  const montos =
    max !== null && max !== min ? `Bs. ${min} - ${max}` : `Bs. ${min}`;
  return unidad ? `${montos} / ${unidad}` : montos;
}

export function apiToIntercambio(i: ApiIntercambio): Intercambio {
  return {
    id: i.id,
    titulo: i.titulo,
    tipo: i.tipo === "servicios" ? "SERVICIOS" : "RAW_MATERIAL",
    estado: i.estado === "en_temporada" ? "En Temporada" : "Disponible",
    busca: i.busca ?? "",
    rango: formatRango(i.precio_min, i.precio_max, i.unidad_precio),
    productor: i.contacto.nombre,
    rolProductor:
      i.rol_productor === "socio_estrategico"
        ? "Socio estratégico"
        : i.rol_productor === "vendedor_verificado"
          ? "Vendedor"
          : "",
    ubicacion: i.ubicacion?.nombre ?? "No especificada",
    categoria: i.categoria?.nombre ?? "",
    accion:
      i.accion === "proponer_trato" ? "Proponer Trato" : "Enviar Consulta",
    imagen: i.imagen_url ?? undefined,
    createdAt: new Date(i.created_at).getTime(),
    creadoPor: i.creado_por_user_id ?? undefined,
    raw: i.raw_payload ?? undefined,
  };
}

/** Listado ya mapeado (para `useApiCollection`). */
export async function listIntercambiosUi(): Promise<Intercambio[]> {
  const items = await listIntercambiosApi();
  return items.map(apiToIntercambio);
}
