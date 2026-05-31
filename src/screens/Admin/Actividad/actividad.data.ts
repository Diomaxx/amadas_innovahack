import {
  Bell,
  Check,
  Package,
  Pencil,
  Trash2,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ActividadEntry, TipoAccion } from "./actividad.types";

export const ACCION_VISUAL: Record<
  TipoAccion,
  { Icon: LucideIcon; color: string; bg: string }
> = {
  aprobacion:  { Icon: Check,   color: "#166534", bg: "#dcfce7" },
  rechazo:     { Icon: X,       color: "#991b1b", bg: "#fee2e2" },
  edicion:     { Icon: Pencil,  color: "#9a3412", bg: "#ffedd5" },
  creacion:    { Icon: Package, color: "#166534", bg: "#dcfce7" },
  eliminacion: { Icon: Trash2,  color: "#991b1b", bg: "#fee2e2" },
  suscripcion: { Icon: Bell,    color: "#1e3a8a", bg: "#dbeafe" },
};

export const STATS_VISUAL = {
  hoy:        { dot: "#22c55e", label: "HOY" },
  asociacion: { dot: "#3b82f6", label: "ASOCIACIONES" },
  tienda:     { dot: "#f97316", label: "TIENDAS" },
  proveedor:  { dot: "#92400e", label: "PROVEEDORES" },
} as const;

export const ACTIVIDADES_MOCK: ActividadEntry[] = [
  // Hoy — 2026-05-31
  {
    id: "1",
    titulo: "Publicación aprobada",
    descripcion:
      'Se aprobó la publicación "Cosecha de Almendra Chiquitana 2026" de María Fernández.',
    accion: "aprobacion",
    categoria: "productor",
    fecha: "2026-05-31",
    autor: "Admin",
  },
  {
    id: "2",
    titulo: "Nuevo producto agregado",
    descripcion:
      'Se agregó "Asaí Silvestre" al catálogo con temporada May–Jul.',
    accion: "creacion",
    categoria: "tienda",
    fecha: "2026-05-31",
    autor: "Admin",
  },
  // Ayer — 2026-05-30
  {
    id: "3",
    titulo: "Nueva suscripción",
    descripcion:
      "15 nuevos usuarios se suscribieron a alertas de Almendra Chiquitana.",
    accion: "suscripcion",
    categoria: "asociacion",
    fecha: "2026-05-30",
    autor: "Admin",
  },
  {
    id: "4",
    titulo: "Publicación editada",
    descripcion:
      'Se mejoró la descripción y se agregaron imágenes a la publicación de "Miel de Monte".',
    accion: "edicion",
    categoria: "productor",
    fecha: "2026-05-30",
    autor: "Admin",
  },
  {
    id: "5",
    titulo: "Nueva asociación registrada",
    descripcion:
      'Se incorporó "Cooperativa Monte Verde" como nueva asociación aliada.',
    accion: "creacion",
    categoria: "asociacion",
    fecha: "2026-05-30",
    autor: "Admin",
  },
  // Anteriores — 2026-05-29
  {
    id: "6",
    titulo: "Publicación rechazada",
    descripcion:
      "Se rechazó la publicación sobre cacao silvestre por contenido incompleto.",
    accion: "rechazo",
    categoria: "productor",
    fecha: "2026-05-29",
    autor: "Admin",
  },
  {
    id: "7",
    titulo: "Publicación aprobada",
    descripcion:
      'Se aprobó la publicación "Aceite de Copaibo medicinal" de Roberto Sánchez.',
    accion: "aprobacion",
    categoria: "productor",
    fecha: "2026-05-29",
    autor: "Admin",
  },
  {
    id: "8",
    titulo: "Producto eliminado",
    descripcion:
      'Se eliminó "Cacao Silvestre" del catálogo por falta de disponibilidad.',
    accion: "eliminacion",
    categoria: "productor",
    fecha: "2026-05-29",
    autor: "Admin",
  },
  // 2026-05-28
  {
    id: "9",
    titulo: "Nuevas suscripciones",
    descripcion:
      "28 usuarios se suscribieron a alertas de productos esta semana.",
    accion: "suscripcion",
    categoria: "sistema",
    fecha: "2026-05-28",
    autor: "Admin",
  },
  {
    id: "10",
    titulo: "Publicación aprobada",
    descripcion:
      'Se aprobó la publicación "Totaí: usos medicinales" de la Comunidad Turubó.',
    accion: "aprobacion",
    categoria: "productor",
    fecha: "2026-05-28",
    autor: "Admin",
  },
  {
    id: "11",
    titulo: "Tienda verificada",
    descripcion:
      '"Mercado Orgánico Chiquitano" completó la verificación de identidad.',
    accion: "aprobacion",
    categoria: "tienda",
    fecha: "2026-05-27",
    autor: "Admin",
  },
  {
    id: "12",
    titulo: "Publicación editada",
    descripcion:
      'Se actualizaron los precios de "Almendra Chiquitana a granel".',
    accion: "edicion",
    categoria: "productor",
    fecha: "2026-05-27",
    autor: "Admin",
  },
];
