"use client";

import {
  ClipboardList,
  Leaf,
  Package,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import type { Publicacion } from "@/screens/Admin/Publicaciones/publicaciones.types";
import type { Contacto } from "@/screens/Admin/Contactos/contactos.types";
import type { ProductoTemporada } from "@/screens/Admin/Temporada/temporada.types";
import type { Receta } from "@/screens/Recetas/recetas.types";
import { useCollection } from "@/hooks/useCollection";
import { subscribePublicaciones } from "@/lib/firebase/publicaciones.repo";
import { subscribeUsuarios } from "@/lib/firebase/users.repo";
import { subscribeProductos } from "@/lib/firebase/productos.repo";
import { subscribeRecetas } from "@/lib/firebase/recetas.repo";

export function DashboardStatsBar() {
  const { data: publicaciones } = useCollection<Publicacion>(subscribePublicaciones);
  const { data: contactos } = useCollection<Contacto>(subscribeUsuarios);
  const { data: productos } = useCollection<ProductoTemporada>(subscribeProductos);
  const { data: recetas } = useCollection<Receta>(subscribeRecetas);

  const pendientesCount = publicaciones.filter((p) => p.estado === "pendiente").length;
  const enTemporadaCount = productos.filter((p) =>
    p.temporadaMeses?.includes("mayo"),
  ).length;

  const STATS = [
    {
      id: "pendientes",
      Icon: ClipboardList,
      label: "PENDIENTES DE APROBACIÓN",
      value: pendientesCount,
      sublabel: "Publicaciones por revisar",
      iconBg: "#F2E6DA",
      iconColor: "#B06A3F",
      alert: true,
    },
    {
      id: "productos",
      Icon: Package,
      label: "TOTAL PRODUCTOS",
      value: productos.length,
      iconBg: "#E3F2E9",
      iconColor: "#2D6A4A",
    },
    {
      id: "temporada",
      Icon: Leaf,
      label: "EN TEMPORADA",
      value: enTemporadaCount,
      trend: "Mes actual: mayo",
      trendUp: true,
      iconBg: "#DCEBE6",
      iconColor: "#3E7C71",
    },
    {
      id: "contactos",
      Icon: Users,
      label: "CONTACTOS ACTIVOS",
      value: contactos.length,
      iconBg: "#E3ECF3",
      iconColor: "#2B6A93",
    },
    {
      id: "recetas",
      Icon: TrendingUp,
      label: "RECETAS PUBLICADAS",
      value: recetas.length,
      iconBg: "#F0E7CF",
      iconColor: "#9C7C3C",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {STATS.map((stat) => {
        const { Icon } = stat;
        return (
          <div
            key={stat.id}
            className={`rounded-xl border bg-white p-4 ${
              "alert" in stat && stat.alert
                ? "border-[#E6D3C2] bg-white"
                : "border-cv-cream-300"
            }`}
          >
            {/* Icon */}
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ backgroundColor: stat.iconBg }}
            >
              <Icon className="h-4 w-4" style={{ color: stat.iconColor }} />
            </div>

            {/* Label */}
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-cv-gray-400">
              {stat.label}
            </p>

            {/* Value */}
            <p className="mt-1 text-3xl font-bold text-cv-gray-900">
              {stat.value}
            </p>

            {/* Sublabel or trend */}
            {"sublabel" in stat && stat.sublabel ? (
              <p className="mt-1.5 text-[11px] text-cv-gray-500">
                {stat.sublabel}
              </p>
            ) : "trend" in stat && stat.trend ? (
              <p
                className={`mt-1.5 flex items-center gap-1 text-[11px] font-medium ${
                  stat.trendUp ? "text-cv-green-600" : "text-[#B06A3F]"
                }`}
              >
                {stat.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.trend}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
