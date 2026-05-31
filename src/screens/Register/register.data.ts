import {
  Bell,
  BookOpen,
  ChefHat,
  FileText,
  Sprout,
  type LucideIcon,
} from "lucide-react";

export type PerfilId = "productor" | "gastronomico";

export interface PerfilOption {
  id: PerfilId;
  Icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  /** nota al pie del listado (ej. revisión de FAN) */
  note?: string;
  cta: string;
  /** estilo del botón */
  variant: "solid" | "outline";
  /** ruta a la que continúa el flujo (placeholder por ahora) */
  href: string;
}

export const PERFILES: PerfilOption[] = [
  {
    id: "productor",
    Icon: Sprout,
    title: "Productor, asociación o aliado",
    description:
      "Reporta la disponibilidad de sus productos, servicios de transformación y necesidades productivas.",
    features: [
      "Reportar productos del bosque",
      "Informar servicios de transformación",
      "Enviar necesidades productivas",
    ],
    note: "Publicación sujeta a revisión de FAN",
    cta: "Continuar como productor",
    variant: "solid",
    href: "/auth/registro/productor",
  },
  {
    id: "gastronomico",
    Icon: ChefHat,
    title: "Restaurante, chef o gastronomía",
    description:
      "Explora la riqueza de nuestros bosques, descubra usos culinarios y contacte productores locales.",
    features: [
      "Explorar productos del bosque",
      "Ver usos y recetas tradicionales",
      "Guardar productos de interés",
      "Recibir alertas de temporada",
    ],
    cta: "Continuar como gastronómico",
    variant: "outline",
    href: "/auth/registro/gastronomico",
  },
];

export interface PasoRed {
  numero: number;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const PASOS_RED: PasoRed[] = [
  {
    numero: 1,
    title: "Reporte del productor",
    description:
      "El productor informa qué productos tiene disponibles en el bosque de forma sostenible.",
    Icon: FileText,
  },
  {
    numero: 2,
    title: "Revisión de FAN",
    description:
      "Nuestro equipo técnico valida la información para asegurar la trazabilidad y sostenibilidad.",
    Icon: BookOpen,
  },
  {
    numero: 3,
    title: "Consulta de red",
    description:
      "Restaurantes y aliados acceden a la oferta activa para coordinar su abastecimiento.",
    Icon: Bell,
  },
];
