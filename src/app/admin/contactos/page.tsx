import { ContactosHeader } from "@/screens/Admin/Contactos/components/ContactosHeader";
import { ContactosBoard } from "@/screens/Admin/Contactos/components/ContactosBoard";

export default function AdminContactosPage() {
  return (
    <div className="space-y-8">
      <ContactosHeader />
      <ContactosBoard />
    </div>
  );
}
