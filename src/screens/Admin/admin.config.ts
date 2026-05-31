import {
  Activity,
  BookOpen,
  ChefHat,
  Database,
  LayoutDashboard,
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
    title: "Panel de Administración",
    subtitle: "Gestión sostenible de la biodiversidad.",
  },
  {
    label: "Gestión de Temporada",
    href: "/admin/flora",
    Icon: Sprout,
    title: "Gestión de Temporada",
    subtitle: "Administra el catálogo de productos por temporada.",
  },
  {
    label: "Publicaciones",
    href: "/admin/publicaciones",
    Icon: BookOpen,
    title: "Gestión de Publicaciones",
    subtitle: "Revisa, edita y aprueba las publicaciones antes de que sean visibles al público.",
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
    subtitle: "Gestiona el recetario de los bosques de Bolivia.",
  },
  {
    label: "Actividad",
    href: "/admin/actividad",
    Icon: Activity,
    title: "Actividad",
    subtitle: "Registro de acciones recientes en la plataforma.",
  },
  {
    label: "Inicializar datos",
    href: "/admin/seed",
    Icon: Database,
    title: "Inicializar datos",
    subtitle: "Sube los datos de ejemplo a Firestore (seeding).",
  },
];
