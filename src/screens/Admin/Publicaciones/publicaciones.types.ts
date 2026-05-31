export type EstadoPublicacion = "pendiente" | "aprobado" | "rechazado";

export type CicloTemporada = {
  inicio: string; // Abreviatura: "Ene", "May", etc.
  fin?: string;   // Omitir si es un solo mes
};

export type Publicacion = {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  producto?: string;
  organizacion?: string;
  estado: EstadoPublicacion;
  imagen: string;
  autor: string;
  ubicacion: string;
  fecha: string; // "YYYY-MM-DD"
  ciclos?: CicloTemporada[];
};
