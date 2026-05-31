import { AdminPageHeader } from "@/screens/Admin/components/AdminPageHeader";
import { ADMIN_NAV } from "@/screens/Admin/admin.config";

const meta = ADMIN_NAV.find((item) => item.href === "/admin/actividad")!;

export default function AdminActividadPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      {/* Contenido pendiente */}
    </div>
  );
}
