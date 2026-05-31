import {
  ClipboardList,
  Leaf,
  Package,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";
import { PUBLICACIONES_MOCK } from "@/screens/Admin/Publicaciones/publicaciones.data";
import { CONTACTOS_MOCK } from "@/screens/Admin/Contactos/contactos.data";
import temporadasData from "@/mocks/temporadas.json";

const pendientesCount = PUBLICACIONES_MOCK.filter(
  (p) => p.estado === "pendiente",
).length;

const enTemporadaCount = temporadasData.documents.filter((d) =>
  d.temporadaMeses.includes("mayo"),
).length;

const contactosCount = CONTACTOS_MOCK.length;

const STATS = [
  {
    id: "pendientes",
    Icon: ClipboardList,
    label: "PENDIENTES DE APROBACIÓN",
    value: pendientesCount,
    sublabel: "Publicaciones por revisar",
    iconBg: "#fff7ed",
    iconColor: "#ea580c",
    alert: true,
  },
  {
    id: "productos",
    Icon: Package,
    label: "TOTAL PRODUCTOS",
    value: 124,
    trend: "+5 este mes",
    trendUp: true,
    iconBg: "#dcfce7",
    iconColor: "#166534",
  },
  {
    id: "temporada",
    Icon: Leaf,
    label: "EN TEMPORADA",
    value: enTemporadaCount,
    trend: "~2 finalizando pronto",
    trendUp: false,
    iconBg: "#ccfbf1",
    iconColor: "#0d9488",
  },
  {
    id: "contactos",
    Icon: Users,
    label: "CONTACTOS ACTIVOS",
    value: contactosCount,
    trend: "+3 este mes",
    trendUp: true,
    iconBg: "#dbeafe",
    iconColor: "#1d4ed8",
  },
  {
    id: "recetas",
    Icon: TrendingUp,
    label: "RECETAS PUBLICADAS",
    value: 24,
    trend: "+3 nuevas este mes",
    trendUp: true,
    iconBg: "#fef3c7",
    iconColor: "#d97706",
  },
] as const;

export function DashboardStatsBar() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {STATS.map((stat) => {
        const { Icon } = stat;
        return (
          <div
            key={stat.id}
            className={`rounded-xl border bg-white p-4 ${
              "alert" in stat && stat.alert
                ? "border-orange-200 bg-orange-50/40"
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
                  stat.trendUp ? "text-cv-green-600" : "text-orange-500"
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
