import { Check, Clock, X, type LucideIcon } from "lucide-react";
import type { EstadoPublicacion, Publicacion } from "./publicaciones.types";

export const ESTADO_VISUAL: Record<
  EstadoPublicacion,
  {
    Icon: LucideIcon;
    label: string;
    badgeColor: string;
    badgeBg: string;
    cardBg: string;
    countColor: string;
    subtexto: string;
  }
> = {
  pendiente: {
    Icon: Clock,
    label: "SOLICITUDES PENDIENTES",
    badgeColor: "#9a3412",
    badgeBg: "#ffedd5",
    cardBg: "#fff7ed",
    countColor: "#ea580c",
    subtexto: "publicaciones esperando aprobación",
  },
  aprobado: {
    Icon: Check,
    label: "APROBADOS",
    badgeColor: "#166534",
    badgeBg: "#dcfce7",
    cardBg: "#f0fdf4",
    countColor: "#16a34a",
    subtexto: "publicadas en la plataforma",
  },
  rechazado: {
    Icon: X,
    label: "RECHAZADOS",
    badgeColor: "#991b1b",
    badgeBg: "#fee2e2",
    cardBg: "#fef2f2",
    countColor: "#dc2626",
    subtexto: "no publicadas",
  },
};

export const PUBLICACIONES_MOCK: Publicacion[] = [
  // Pendientes
  {
    id: "1",
    titulo: "Cosecha excepcional de Almendra Chiquitana 2024",
    descripcion:
      "Este año hemos tenido una temporada muy productiva. Las almendras están de excelente calidad y listas para la venta directa.",
    tipo: "Semillas",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/almendra/600/320",
    autor: "María Fernández",
    ubicacion: "San Ignacio de Velasco",
    fecha: "2026-05-27",
  },
  {
    id: "2",
    titulo: "Miel de Monte: Producción artesanal de abejas",
    descripcion:
      "Nuestra comunidad ha recolectado miel de las abejas meliponas del bosque. Esta miel es 100% natural y sin procesar.",
    tipo: "Miel",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/honeycomb/600/320",
    autor: "Carlos Gutiérrez",
    ubicacion: "Concepción",
    fecha: "2026-05-26",
  },
  {
    id: "3",
    titulo: "Asaí fresco directo del bosque",
    descripcion:
      "Recolección diaria de asaí de las palmeras nativas. El fruto está en su punto óptimo de maduración.",
    tipo: "Frutos",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/berries/600/320",
    autor: "Ana López",
    ubicacion: "San Miguel",
    fecha: "2026-05-25",
  },
  {
    id: "4",
    titulo: "Totaí: Aceite puro de palmera nativa",
    descripcion:
      "Extracción tradicional del aceite de totaí usando técnicas ancestrales de la comunidad Turubó.",
    tipo: "Aceites",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/palm/600/320",
    autor: "Jorge Mendoza",
    ubicacion: "San Ignacio de Velasco",
    fecha: "2026-05-24",
  },
  {
    id: "5",
    titulo: "Copoazú silvestre temporada 2026",
    descripcion:
      "Fruto amazónico con propiedades excepcionales. Pulpa congelada disponible en presentaciones de 500g.",
    tipo: "Frutos",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/jungle/600/320",
    autor: "Ana Luz Vásquez",
    ubicacion: "San Javier",
    fecha: "2026-05-23",
  },
  // Aprobados
  {
    id: "6",
    titulo: "Cera de abejas nativas sin procesar",
    descripcion: "Cera pura de abejas meliponas, ideal para cosméticos naturales.",
    tipo: "Cera",
    estado: "aprobado",
    imagen: "https://picsum.photos/seed/wax/600/320",
    autor: "Red Mujeres Chiquitania",
    ubicacion: "San Rafael de Velasco",
    fecha: "2026-05-20",
  },
  {
    id: "7",
    titulo: "Aceite de Copaibo medicinal",
    descripcion: "Aceite de copaibo extraído de árboles maduros del bosque chiquitano.",
    tipo: "Aceites",
    estado: "aprobado",
    imagen: "https://picsum.photos/seed/forest2/600/320",
    autor: "Roberto Sánchez",
    ubicacion: "Lomerío",
    fecha: "2026-05-18",
  },
  {
    id: "8",
    titulo: "Motacú: palmera multipropósito",
    descripcion: "Frutos, hoja y tronco del motacú para usos artesanales y alimenticios.",
    tipo: "Semillas",
    estado: "aprobado",
    imagen: "https://picsum.photos/seed/tropical/600/320",
    autor: "Comunidad Turubó",
    ubicacion: "San Ignacio de Velasco",
    fecha: "2026-05-15",
  },
  // Rechazados
  {
    id: "9",
    titulo: "Cacao silvestre del bosque",
    descripcion: "Publicación rechazada por información incompleta sobre el origen.",
    tipo: "Semillas",
    estado: "rechazado",
    imagen: "https://picsum.photos/seed/cacao/600/320",
    autor: "Pedro Rivero",
    ubicacion: "Concepción",
    fecha: "2026-05-10",
  },
  {
    id: "10",
    titulo: "Frutos silvestres mixtos",
    descripcion: "Rechazado por no cumplir con los estándares de calidad requeridos.",
    tipo: "Frutos",
    estado: "rechazado",
    imagen: "https://picsum.photos/seed/mixed/600/320",
    autor: "Luis Chávez",
    ubicacion: "Santa Cruz",
    fecha: "2026-05-08",
  },
];
