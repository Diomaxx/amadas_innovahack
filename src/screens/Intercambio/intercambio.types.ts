/** Publicación del marketplace de intercambio (de productores, para productores). */
export interface Intercambio {
  id: string;
  titulo: string;
  tipo: "SERVICIOS" | "RAW_MATERIAL";
  estado: string; // "En Temporada" | "Disponible"
  busca: string;
  rango: string;
  productor: string;
  rolProductor: string;
  ubicacion: string;
  categoria: string;
  accion: string; // "Proponer Trato" | "Enviar Consulta"
  imagen?: string;

  /** Metadatos de persistencia (presentes en publicaciones creadas por usuarios). */
  createdAt?: number;
  creadoPor?: string;
  /** Datos crudos del formulario original, por si se quieren reprocesar. */
  raw?: Record<string, unknown>;
}
