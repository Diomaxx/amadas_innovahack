import { api } from "./client";
import { MES_CORTO, calcularEstado } from "@/lib/temporada";
import type {
  DisponibilidadItem,
  ProductoTemporada,
} from "@/screens/Admin/Temporada/temporada.types";

/**
 * Productos contra la API del backend (reemplazo de
 * `@/lib/firebase/productos.repo`). Expone endpoints tipados + mappers entre
 * el modelo relacional de la API y el view-model `ProductoTemporada` que ya
 * usan las pantallas.
 */

// ── Tipos del API (modelo relacional serializado) ─────────────────────────

export type EstadoCalendarioApi =
  | "no_disponible"
  | "comienza"
  | "en_temporada"
  | "ultimos_dias";

export type ApiProducto = {
  id: string; // BigInt serializado como string
  slug: string | null;
  nombre: string;
  nombre_cientifico: string | null;
  categoria: { id: number; nombre: string } | null;
  descripcion: string | null;
  descripcion_esencia: string | null;
  imagen_url: string | null;
  temporada_resumen: string | null;
  mensaje_temporada: string | null;
  calendario: Array<{ mes: number; estado: EstadoCalendarioApi }>;
  propiedades: Array<{ id: string; texto: string; orden: number }>;
  usos_gastronomicos: Array<{ uso: { id: number; nombre: string } }>;
  /** Solo en el detalle: productores con sus disponibilidades. */
  contactos?: Array<{
    contacto: { id: string; nombre: string; tipo: string };
    disponibilidades: Array<{
      estado: string;
      accion: string;
      detalle: string | null;
    }>;
  }>;
};

export type ProductoPayload = {
  nombre: string;
  nombreCientifico?: string;
  categoria?: string;
  descripcion?: string;
  esencia?: string;
  imagenUrl?: string;
  temporadaResumen?: string;
  mensajeTemporada?: string;
  propiedades?: string[];
  usosGastronomicos?: string[];
  calendario?: Array<{ mes: number; estado: EstadoCalendarioApi }>;
};

type Paginated<T> = {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
};

// ── Endpoints ──────────────────────────────────────────────────────────────

export async function listProductosApi(): Promise<ApiProducto[]> {
  const res = await api.get<Paginated<ApiProducto>>("/productos?limit=100", {
    auth: false,
  });
  return res.data;
}

export function getProductoApi(idOrSlug: string) {
  return api.get<ApiProducto>(`/productos/${idOrSlug}`, { auth: false });
}

export function createProductoApi(payload: ProductoPayload) {
  return api.post<ApiProducto>("/productos", payload);
}

export function updateProductoApi(id: string, payload: Partial<ProductoPayload>) {
  return api.patch<ApiProducto>(`/productos/${id}`, payload);
}

export function deleteProductoApi(id: string) {
  return api.delete<{ deleted: boolean }>(`/productos/${id}`);
}

// ── Mappers API ⇄ view-model ───────────────────────────────────────────────

const TOKEN_POR_ESTADO: Record<EstadoCalendarioApi, string> = {
  no_disponible: "no-disponible",
  comienza: "comienza",
  en_temporada: "en-temporada",
  ultimos_dias: "ultimos-dias",
};

const ESTADO_POR_TOKEN: Record<string, EstadoCalendarioApi> = {
  "no-disponible": "no_disponible",
  comienza: "comienza",
  "en-temporada": "en_temporada",
  "ultimos-dias": "ultimos_dias",
};

const MESES_LARGOS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const LABEL_DISPONIBILIDAD: Record<string, string> = {
  disponible: "DISPONIBLE",
  en_temporada: "EN TEMPORADA",
  bajo_pedido: "BAJO PEDIDO",
  agotado: "AGOTADO",
  consultar: "CONSULTAR",
};

const LABEL_ACCION: Record<string, string> = {
  enviar_consulta: "Contactar",
  proponer_trato: "Reservar",
  ver_contacto: "Ver contacto",
};

const ICON_DISPONIBILIDAD: Record<string, string> = {
  disponible: "store",
  en_temporada: "hourglass",
  bajo_pedido: "hourglass",
  agotado: "hourglass",
  consultar: "store",
};

/** Índices 0-11 de los meses con cosecha (estado ≠ no_disponible). */
function mesesActivos(p: ApiProducto): number[] {
  return p.calendario
    .filter((c) => c.estado !== "no_disponible")
    .map((c) => c.mes - 1);
}

export function apiToProductoTemporada(p: ApiProducto): ProductoTemporada {
  const indices = mesesActivos(p);
  const disponibilidad: DisponibilidadItem[] = (p.contactos ?? []).flatMap(
    (cp) =>
      cp.disponibilidades.map((d) => ({
        productor: cp.contacto.nombre,
        estado: d.detalle ?? LABEL_DISPONIBILIDAD[d.estado] ?? d.estado,
        accion: LABEL_ACCION[d.accion] ?? d.accion,
        icon: ICON_DISPONIBILIDAD[d.estado] ?? "store",
      })),
  );

  return {
    id: p.id,
    nombre: p.nombre,
    nombreCientifico: p.nombre_cientifico ?? "",
    categoria: p.categoria?.nombre ?? "",
    temporada: calcularEstado(indices, new Date()).temporada,
    descripcion: p.descripcion ?? "",
    esencia: p.descripcion_esencia ?? "",
    propiedades: p.propiedades.map((x) => x.texto),
    usosGastronomicos: p.usos_gastronomicos.map((x) => x.uso.nombre),
    calendarioCosecha: {
      temporadaPrincipal: p.temporada_resumen ?? "",
      mensaje: p.mensaje_temporada ?? "",
      meses: p.calendario.map((c) => ({
        mes: MES_CORTO[c.mes - 1],
        estado: TOKEN_POR_ESTADO[c.estado],
      })),
    },
    disponibilidad,
    temporadaMeses: indices.map((i) => MESES_LARGOS[i]),
    imageSrc: p.imagen_url ?? undefined,
  };
}

export function productoToPayload(p: ProductoTemporada): ProductoPayload {
  return {
    nombre: p.nombre,
    nombreCientifico: p.nombreCientifico || undefined,
    categoria: p.categoria || undefined,
    descripcion: p.descripcion || undefined,
    esencia: p.esencia || undefined,
    imagenUrl: p.imageSrc || undefined,
    temporadaResumen: p.calendarioCosecha.temporadaPrincipal || undefined,
    mensajeTemporada: p.calendarioCosecha.mensaje || undefined,
    propiedades: p.propiedades,
    usosGastronomicos: p.usosGastronomicos,
    calendario: p.calendarioCosecha.meses
      .map((m) => ({
        mes: MES_CORTO.indexOf(m.mes.toUpperCase()) + 1,
        estado: ESTADO_POR_TOKEN[m.estado] ?? "en_temporada",
      }))
      .filter((m) => m.mes >= 1),
  };
}

/** Listado ya mapeado al view-model (para `useApiCollection`). */
export async function listProductosUi(): Promise<ProductoTemporada[]> {
  const items = await listProductosApi();
  return items.map(apiToProductoTemporada);
}

/** Detalle ya mapeado al view-model. */
export async function getProductoUi(
  idOrSlug: string,
): Promise<ProductoTemporada | null> {
  try {
    return apiToProductoTemporada(await getProductoApi(idOrSlug));
  } catch {
    return null;
  }
}
