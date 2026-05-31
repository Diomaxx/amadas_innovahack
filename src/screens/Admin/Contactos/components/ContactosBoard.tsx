"use client";

import { Loader2 } from "lucide-react";
import type { Contacto } from "../contactos.types";
import { useCollection } from "@/hooks/useCollection";
import { subscribeUsuarios } from "@/lib/firebase/users.repo";
import { ContactosStatsBar } from "./ContactosStatsBar";
import { ContactosExplorer } from "./ContactosExplorer";

export function ContactosBoard() {
  // Los contactos se nutren de la colección de usuarios de la red.
  const { data: contactos, loading, error } =
    useCollection<Contacto>(subscribeUsuarios);

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
        No se pudieron cargar los contactos. ¿Sembraste los datos en{" "}
        <span className="font-semibold">/admin/seed</span>?
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
