import { ContactosHeader } from "@/screens/Admin/Contactos/components/ContactosHeader";
import { ContactosStatsBar } from "@/screens/Admin/Contactos/components/ContactosStatsBar";
import { ContactosExplorer } from "@/screens/Admin/Contactos/components/ContactosExplorer";
import { CONTACTOS_MOCK } from "@/screens/Admin/Contactos/contactos.data";

export default function AdminContactosPage() {
  return (
    <div className="space-y-8">
      <ContactosHeader />
      <ContactosStatsBar contactos={CONTACTOS_MOCK} />
      <ContactosExplorer contactos={CONTACTOS_MOCK} />
    </div>
  );
}
