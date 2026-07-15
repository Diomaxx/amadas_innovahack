"use client";

import { Loader2 } from "lucide-react";
import { useApiCollection } from "@/hooks/useApiCollection";
import { listContactosUi } from "@/lib/api/contactos";
import { ContactosStatsBar } from "./ContactosStatsBar";
import { ContactosExplorer } from "./ContactosExplorer";

export function ContactosBoard() {
  // Contactos reales de la red (tabla contactos del backend).
  const { data: contactos, loading, error } =
    useApiCollection(listContactosUi);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-cv-gray-400">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Cargando contactos…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-[#E4C9C2] bg-[#FBEEEB] px-5 py-4 text-sm text-[#A6452F]">
        No se pudieron cargar los contactos. Verifica que el backend esté
        disponible e inténtalo de nuevo.
      </div>
    );
  }

  return (
    <>
      <ContactosStatsBar contactos={contactos} />
      <ContactosExplorer contactos={contactos} />
    </>
  );
}
