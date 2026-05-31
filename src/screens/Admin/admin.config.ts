import {
  Activity,
  BookOpen,
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
 * Fuente unica de verdad para el panel administrativo (`/admin`).
 * El sidebar la usa para la navegacion y cada page para su encabezado.
 */
export const ADMIN_NAV: AdminNavItem[] = [
  {
    label: "Administración",
    href: "/admin",
    Icon: LayoutDashboard,
    title: "Administración",
    subtitle: "Gestion sostenible de la biodiversidad chiquitana.",
  },
  {
    label: "Gestion Flora",
    href: "/admin/flora",
    Icon: Sprout,
    title: "Gestion de Flora",
    subtitle: "Administra el catalogo de especies y productos del bosque.",
  },
  {
    label: "Publicaciones",
    href: "/admin/publicaciones",
    Icon: BookOpen,
    title: "Gestion de Publicaciones",
    subtitle: "Revisa, edita y aprueba las publicaciones antes de que sean visibles al publico.",
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
    label: "Configuracion",
    href: "/admin/configuracion",
    Icon: Settings,
    title: "Configuracion",
    subtitle: "Preferencias generales del panel.",
  },
];
