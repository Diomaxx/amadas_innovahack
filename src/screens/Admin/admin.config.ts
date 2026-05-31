import {
  Activity,
  BookOpen,
  ChartColumn,
  ChefHat,
  LayoutDashboard,
  Settings,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
  title: string;
  subtitle: string;
};

/**
 * Fuente única de verdad para el panel administrativo (`/admin`).
 * El sidebar la usa para la navegación y cada page para su encabezado.
 */
export const ADMIN_NAV: AdminNavItem[] = [
  {
    label: "Panel de Métricas",
    href: "/admin",
    Icon: LayoutDashboard,
    title: "Panel de Métricas",
    subtitle: "Gestión sostenible de la biodiversidad chiquitana.",
  },
  {
    label: "Gestión Flora",
    href: "/admin/flora",
    Icon: Sprout,
    title: "Gestión de Flora",
    subtitle: "Administra el catálogo de especies y productos del bosque.",
  },
  {
    label: "Publicaciones",
    href: "/admin/publicaciones",
    Icon: BookOpen,
    title: "Gestión de Publicaciones",
    subtitle:
      "Revisa, edita y aprueba las publicaciones antes de que sean visibles al público.",
  },
  {
    label: "Contactos",
    href: "/admin/contactos",
    Icon: Users,
    title: "Contactos",
    subtitle: "Productores, restaurantes y aliados de la red.",
  },
  {
    label: "Recetas",
    href: "/admin/recetas",
    Icon: ChefHat,
    title: "Recetas",
    subtitle: "Gestiona el recetario del Bosque Chiquitano.",
  },
  {
    label: "Actividad",
    href: "/admin/actividad",
    Icon: Activity,
    title: "Actividad",
    subtitle: "Registro de acciones recientes en la plataforma.",
  },
  {
    label: "Reportes",
    href: "/admin/reportes",
    Icon: ChartColumn,
    title: "Reportes",
    subtitle: "Indicadores y exportación de datos.",
  },
  {
    label: "Configuración",
    href: "/admin/configuracion",
    Icon: Settings,
    title: "Configuración",
    subtitle: "Preferencias generales del panel.",
  },
];
