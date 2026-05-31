export type EstadoTemporada =
  | "En temporada"
  | "Próximamente"
  | "Finalizando"
  | "Fuera de temporada";

export interface MesCosecha {
  mes: string;
  estado: string;
}

export interface CalendarioCosecha {
  temporadaPrincipal: string;
  meses: MesCosecha[];
  mensaje: string;
}

export interface DisponibilidadItem {
  productor: string;
  estado: string;
  accion: string;
  icon: string;
}

/**
 * Producto del catálogo gestionado por "Gestión de Temporada".
 * Coincide con la forma de `catalogoData.especies`, más campos opcionales
 * derivados (`temporadaMeses`, `usosCulinarios`, `imageSrc`).
 */
export interface ProductoTemporada {
  id: string;
  nombre: string;
  nombreCientifico: string;
  categoria: string;
  temporada: string;
  descripcion: string;
  esencia: string;
  propiedades: string[];
  usosGastronomicos: string[];
  calendarioCosecha: CalendarioCosecha;
  disponibilidad: DisponibilidadItem[];
  /** Meses de cosecha (minúsculas, ej. "julio"), tomados de temporadas.json. */
  temporadaMeses?: string[];
  imageSrc?: string;
}

/** Un ciclo de temporada como par de meses (índices 0-11). */
export interface Ciclo {
  inicio: number;
  fin: number;
}

/** Valores del formulario de producto (crear/editar comparten esta forma). */
export interface ProductoFormValues {
  nombre: string;
  nombreCientifico: string;
  categoria: string;
  estado: EstadoTemporada;
  ciclos: Ciclo[];
  descripcion: string;
  /** Propiedades separadas por coma (ej. "Alta en Proteína, Energía"). */
  propiedadesTexto: string;
  /** Usos gastronómicos separados por coma (ej. "Repostería, Snacks"). */
  usosGastronomicosTexto: string;
  imageSrc?: string;
}
