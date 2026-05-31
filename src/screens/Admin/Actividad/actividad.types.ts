export type TipoAccion =
  | "aprobacion"
  | "rechazo"
  | "edicion"
  | "creacion"
  | "eliminacion"
  | "suscripcion";

export type CategoriaActividad =
  | "productor"
  | "asociacion"
  | "tienda"
  | "proveedor"
  | "sistema";

export type ActividadEntry = {
  id: string;
  titulo: string;
  descripcion: string;
  accion: TipoAccion;
  categoria: CategoriaActividad;
  fecha: string; // "YYYY-MM-DD"
  autor?: string;
};
