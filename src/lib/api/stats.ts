import { api } from "./client";

/** Métricas agregadas del dashboard admin (reemplaza el cálculo cliente). */

export type Conteo = { clave: string; label: string; valor: number };

export type AdminStats = {
  totals: {
    productos: number;
    recetas: number;
    publicaciones: number;
    contactos: number;
  };
  publicaciones: { pendientes: number; aprobadas: number; rechazadas: number };
  productosEnTemporada: number;
  mes: number;
  breakdowns: {
    productosPorCategoria: Conteo[];
    contactosPorTipo: Conteo[];
    recetasPorCategoria: Conteo[];
    publicacionesPorEstado: Conteo[];
  };
  publicacionesRecientes: Array<{
    titulo: string;
    autor: string;
    estado: string;
    fecha: string;
  }>;
};

export function getStats() {
  return api.get<AdminStats>("/admin/stats");
}
