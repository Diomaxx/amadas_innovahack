import { CalendarDays } from "lucide-react";
import { ADMIN_NAV } from "@/screens/Admin/admin.config";
import { DashboardStatsBar } from "@/screens/Admin/Dashboard/components/DashboardStatsBar";
import { PublicacionesWidget } from "@/screens/Admin/Dashboard/components/PublicacionesWidget";
import { ActividadWidget } from "@/screens/Admin/Dashboard/components/ActividadWidget";
import { EstadoTemporadasWidget } from "@/screens/Admin/Dashboard/components/EstadoTemporadasWidget";
import { ReporteButton } from "@/screens/Admin/Dashboard/components/ReporteButton";

const meta = ADMIN_NAV[0];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1 — Header con acción de descarga de reporte */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-cv-green-900">
            {meta.title}
          </h1>
          {meta.subtitle ? (
            <p className="mt-1.5 text-sm text-cv-gray-600">{meta.subtitle}</p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-cv-cream-300 bg-white px-3.5 py-2 text-sm font-medium text-cv-gray-700 shadow-sm">
            <CalendarDays className="h-4 w-4 text-cv-gray-500" />
            Mayo 2026
          </span>
          <ReporteButton />
        </div>
      </header>

      {/* 2 — Stats */}
      <DashboardStatsBar />

      {/* 3 — Publicaciones + Actividad */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr] lg:items-start">
        <PublicacionesWidget />
        <ActividadWidget />
      </div>

      {/* 4 — Estado de Temporadas */}
      <EstadoTemporadasWidget />
    </div>
  );
}
