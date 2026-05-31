import { AdminPageHeader } from "@/screens/Admin/components/AdminPageHeader";
import { ADMIN_NAV } from "@/screens/Admin/admin.config";
import { DashboardStatsBar } from "@/screens/Admin/Dashboard/components/DashboardStatsBar";
import { PublicacionesWidget } from "@/screens/Admin/Dashboard/components/PublicacionesWidget";
import { ActividadWidget } from "@/screens/Admin/Dashboard/components/ActividadWidget";
import { EstadoTemporadasWidget } from "@/screens/Admin/Dashboard/components/EstadoTemporadasWidget";

const meta = ADMIN_NAV[0];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* 1 — Header */}
      <AdminPageHeader
        title={meta.title}
        subtitle={meta.subtitle}
        period="Mayo 2026"
      />

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
