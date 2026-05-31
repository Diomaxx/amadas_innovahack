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
  // ── Pendientes — productos en temporada de mayo ───────────────
  {
    id: "1",
    titulo: "Asaí fresco de palmeras nativas — cosecha mayo 2026",
    descripcion:
      "Mayo es uno de los meses pico para el asaí en la región chiquitana. Recolección diaria en racimos maduros directamente de Euterpe precatoria. Disponible en fruto fresco y pulpa.",
    tipo: "Frutos",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/asai2026/600/320",
    autor: "Ana López",
    ubicacion: "San Miguel",
    fecha: "2026-05-27",
  },
  {
    id: "2",
    titulo: "Totaí en cosecha: aceite prensado en frío mayo 2026",
    descripcion:
      "El Totaí (Acrocomia totai) entra en plena temporada en mayo. Aceite extraído artesanalmente con técnicas de la comunidad Turubó. Lote pequeño, disponibilidad limitada.",
    tipo: "Aceites",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/totai2026/600/320",
    autor: "Jorge Mendoza",
    ubicacion: "San Ignacio de Velasco",
    fecha: "2026-05-26",
  },
  {
    id: "3",
    titulo: "Pitón silvestre — última semana de cosecha mayo",
    descripcion:
      "La Talisia esculenta tiene temporada de enero a mayo. Estamos en los últimos días de cosecha. Fruto dulce y aromático, ideal para jugos artesanales y repostería.",
    tipo: "Frutos",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/piton2026/600/320",
    autor: "María Fernández",
    ubicacion: "San Ignacio de Velasco",
    fecha: "2026-05-25",
  },
  {
    id: "4",
    titulo: "Motacú: frutos frescos y aceite de palmera — mayo 2026",
    descripcion:
      "El Motacú (Attalea phalerata) está disponible todo el año pero mayo ofrece la cosecha más abundante. Este lote fue recolectado en el bosque comunitario de Concepción.",
    tipo: "Palmera",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/motacu2026/600/320",
    autor: "Carlos Gutiérrez",
    ubicacion: "Concepción",
    fecha: "2026-05-24",
  },
  {
    id: "5",
    titulo: "Paja cedrón seco — cosecha de mayo, ciclo húmedo",
    descripcion:
      "Cymbopogon citratus recolectada en su punto óptimo de mayo. Hierba medicinal con propiedades digestivas y relajantes. Presentación en manojos secos de 100 g.",
    tipo: "Medicinales",
    estado: "pendiente",
    imagen: "https://picsum.photos/seed/cedron2026/600/320",
    autor: "Ana Luz Vásquez",
    ubicacion: "San Javier",
    fecha: "2026-05-23",
  },
  // ── Aprobados ─────────────────────────────────────────────────
  {
    id: "6",
    titulo: "Asaí en pulpa congelada — lote abril 2026",
    descripcion: "Pulpa de asaí procesada y congelada del lote de abril. Certificación orgánica vigente.",
    tipo: "Frutos",
    estado: "aprobado",
    imagen: "https://picsum.photos/seed/asaiapril/600/320",
    autor: "Red Mujeres Chiquitania",
    ubicacion: "San Rafael de Velasco",
    fecha: "2026-04-28",
  },
  {
    id: "7",
    titulo: "Aceite de Copaibo medicinal",
    descripcion: "Aceite de copaibo extraído de árboles maduros del bosque chiquitano. Uso terapéutico comprobado.",
    tipo: "Medicinales",
    estado: "aprobado",
    imagen: "https://picsum.photos/seed/copaibo/600/320",
    autor: "Roberto Sánchez",
    ubicacion: "Lomerío",
    fecha: "2026-04-18",
  },
  {
    id: "8",
    titulo: "Motacú: artesanías y fibra natural",
    descripcion: "Hojas y fibra de motacú para tejido artesanal. Comunidad con certificación de comercio justo.",
    tipo: "Artesanías",
    estado: "aprobado",
    imagen: "https://picsum.photos/seed/motacuart/600/320",
    autor: "Comunidad Turubó",
    ubicacion: "San Ignacio de Velasco",
    fecha: "2026-04-10",
  },
  // ── Rechazados ────────────────────────────────────────────────
  {
    id: "9",
    titulo: "Almendra Chiquitana — oferta anticipada julio",
    descripcion:
      "Rechazado: la Almendra Chiquitana tiene temporada julio–septiembre. La publicación fue enviada fuera de temporada sin stock verificado.",
    tipo: "Semillas",
    estado: "rechazado",
    imagen: "https://picsum.photos/seed/almendra26/600/320",
    autor: "Pedro Rivero",
    ubicacion: "Concepción",
    fecha: "2026-05-10",
  },
  {
    id: "10",
    titulo: "Miel de monte — lote sin fecha de extracción",
    descripcion:
      "Rechazado: la miel tiene temporada en febrero–marzo y octubre–noviembre. La publicación no incluía fecha de extracción ni certificado del lote.",
    tipo: "Miel",
    estado: "rechazado",
    imagen: "https://picsum.photos/seed/mielmont/600/320",
    autor: "Luis Chávez",
    ubicacion: "Santa Cruz",
    fecha: "2026-05-08",
  },
];
