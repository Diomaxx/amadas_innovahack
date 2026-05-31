import { RecetasAdminExplorer } from "@/screens/Admin/Recetas/components/RecetasAdminExplorer";
import { RECETAS } from "@/screens/Recetas/recetas.data";

export default function AdminRecetasPage() {
  return <RecetasAdminExplorer recetasIniciales={RECETAS} />;
}
