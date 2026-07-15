"use client";

import { Loader2 } from "lucide-react";
import { useApiCollection } from "@/hooks/useApiCollection";
import { listActividadUi } from "@/lib/api/actividad";
import { ActividadDashboard } from "./ActividadDashboard";

export function ActividadBoard() {
  const { data: actividades, loading, error } =
    useApiCollection(listActividadUi);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-cv-gray-400">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Cargando actividad…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-[#E4C9C2] bg-[#FBEEEB] px-5 py-4 text-sm text-[#A6452F]">
        No se pudo cargar la actividad. Verifica que el backend esté disponible
        e inténtalo de nuevo.
      </div>
    );
  }

  return <ActividadDashboard actividades={actividades} />;
}
