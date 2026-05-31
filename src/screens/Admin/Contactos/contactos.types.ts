export type TipoContacto = "productor" | "asociacion" | "tienda" | "proveedor";

export type Contacto = {
  id: string;
  nombre: string;
  tipo: TipoContacto;
  organizacion?: string;
  telefono?: string;
  email?: string;
  ubicacion?: string;
  productos?: string[];
  descripcion?: string;
};
