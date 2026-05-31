import { AdminPageHeader } from "@/screens/Admin/components/AdminPageHeader";
import { ADMIN_NAV } from "@/screens/Admin/admin.config";
import { PublicacionesStatsBar } from "@/screens/Admin/Publicaciones/components/PublicacionesStatsBar";
import { PublicacionesAlerta } from "@/screens/Admin/Publicaciones/components/PublicacionesAlerta";
import { PublicacionesPendientes } from "@/screens/Admin/Publicaciones/components/PublicacionesPendientes";
import { PUBLICACIONES_MOCK } from "@/screens/Admin/Publicaciones/publicaciones.data";

const meta = ADMIN_NAV.find((item) => item.href === "/admin/publicaciones")!;

export default function AdminPublicacionesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <PublicacionesStatsBar publicaciones={PUBLICACIONES_MOCK} />
      <PublicacionesAlerta publicaciones={PUBLICACIONES_MOCK} />
      <PublicacionesPendientes publicaciones={PUBLICACIONES_MOCK} />
    </div>
  );
}
