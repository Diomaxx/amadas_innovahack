import { ActividadHeader } from "@/screens/Admin/Actividad/components/ActividadHeader";
import { ActividadStatsBar } from "@/screens/Admin/Actividad/components/ActividadStatsBar";
import { ActividadExplorer } from "@/screens/Admin/Actividad/components/ActividadExplorer";
import { ACTIVIDADES_MOCK } from "@/screens/Admin/Actividad/actividad.data";

export default function AdminActividadPage() {
  return (
    <div className="space-y-8">
      <ActividadHeader />
      <ActividadStatsBar actividades={ACTIVIDADES_MOCK} />
      <ActividadExplorer actividades={ACTIVIDADES_MOCK} />
    </div>
  );
}
