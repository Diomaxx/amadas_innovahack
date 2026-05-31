"use client";

import { Loader2 } from "lucide-react";
import type { ActividadEntry } from "../actividad.types";
import { useCollection } from "@/hooks/useCollection";
import { subscribeActividad } from "@/lib/firebase/actividad.repo";
import { ActividadDashboard } from "./ActividadDashboard";

export function ActividadBoard() {
  const { data: actividades, loading, error } =
    useCollection<ActividadEntry>(subscribeActividad);

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
        No se pudo cargar la actividad. ¿Sembraste los datos en{" "}
        <span className="font-semibold">/admin/seed</span>?
      </div>
    );
  }

  return <ActividadDashboard actividades={actividades} />;
}
