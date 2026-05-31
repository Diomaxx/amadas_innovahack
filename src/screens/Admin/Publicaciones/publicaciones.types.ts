export type EstadoPublicacion = "pendiente" | "aprobado" | "rechazado";

export type Publicacion = {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  estado: EstadoPublicacion;
  imagen: string;
  autor: string;
  ubicacion: string;
  fecha: string; // "YYYY-MM-DD"
};
