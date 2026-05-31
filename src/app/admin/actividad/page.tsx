import { ActividadDashboard } from "@/screens/Admin/Actividad/components/ActividadDashboard";
import { ACTIVIDADES_MOCK } from "@/screens/Admin/Actividad/actividad.data";

export default function AdminActividadPage() {
  return <ActividadDashboard actividades={ACTIVIDADES_MOCK} />;
}
