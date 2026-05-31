import { AdminPageHeader } from "@/screens/Admin/components/AdminPageHeader";
import { ADMIN_NAV } from "@/screens/Admin/admin.config";
import { PublicacionesBoard } from "@/screens/Admin/Publicaciones/components/PublicacionesBoard";

const meta = ADMIN_NAV.find((item) => item.href === "/admin/publicaciones")!;

export default function AdminPublicacionesPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader title={meta.title} subtitle={meta.subtitle} />
      <PublicacionesBoard />
    </div>
  );
}
