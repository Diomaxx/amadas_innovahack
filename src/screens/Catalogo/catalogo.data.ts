import catalogoData from "@/mocks/catalogoData.json";
import type { Temporada } from "./components/CatalogoFiltros";

/** Item buscable: une `especies` y `otrosRecursos` en una sola lista. */
export interface CatalogoSearchItem {
  id: string;
  nombre: string;
  nombreCientifico: string;
  categoria: string;
  temporada: Temporada;
  imageSrc?: string;
}

type RawEspecie = {
  id: string;
  nombre: string;
  nombreCientifico: string;
  categoria: string;
  temporada: string;
  imageSrc?: string;
};

type RawRecurso = {
  id: string;
  nombre: string;
  nombreCientifico: string;
  temporada: string;
  imageSrc?: string;
};

const especies = (catalogoData.especies ?? []) as RawEspecie[];
const otrosRecursos = (catalogoData.otrosRecursos ?? []) as RawRecurso[];

/** Catálogo completo (especies + otros recursos) listo para buscar. */
export const CATALOGO_ITEMS: CatalogoSearchItem[] = [
  ...especies.map((e) => ({
    id: e.id,
    nombre: e.nombre,
    nombreCientifico: e.nombreCientifico,
    categoria: e.categoria,
    temporada: e.temporada as Temporada,
    imageSrc: e.imageSrc,
  })),
  ...otrosRecursos.map((r) => ({
    id: r.id,
    nombre: r.nombre,
    nombreCientifico: r.nombreCientifico,
    categoria: "Otro recurso",
    temporada: r.temporada as Temporada,
    imageSrc: r.imageSrc,
  })),
];

/** Texto normalizado (minúsculas, sin tildes) para comparar. */
function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Filtra el catálogo por nombre o nombre científico. */
export function buscarCatalogo(
  query: string,
  limit = 6,
): CatalogoSearchItem[] {
  const q = normalizar(query.trim());
  if (!q) return [];
  return CATALOGO_ITEMS.filter((item) => {
    const haystack = normalizar(`${item.nombre} ${item.nombreCientifico}`);
    return haystack.includes(q);
  }).slice(0, limit);
}
