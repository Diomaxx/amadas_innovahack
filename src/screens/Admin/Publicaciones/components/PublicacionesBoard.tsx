"use client";

import { Loader2 } from "lucide-react";
import type { Publicacion } from "../publicaciones.types";
import { useApiCollection } from "@/hooks/useApiCollection";
import {
  listPublicacionesUi,
  publicacionToPayload,
  setEstadoPublicacionApi,
  updatePublicacionApi,
} from "@/lib/api/publicaciones";
import { PublicacionesStatsBar } from "./PublicacionesStatsBar";
import { PublicacionesAlerta } from "./PublicacionesAlerta";
import { PublicacionesPendientes } from "./PublicacionesPendientes";

// La actividad se registra server-side dentro de cada mutación del backend.
export function PublicacionesBoard() {
  const {
    data: publicaciones,
    loading,
    error,
    refetch,
  } = useApiCollection(listPublicacionesUi);

  const aprobar = async (pub: Publicacion) => {
    await setEstadoPublicacionApi(pub.id, "aprobado");
    await refetch();
  };

  const rechazar = async (pub: Publicacion) => {
    await setEstadoPublicacionApi(pub.id, "rechazado");
    await refetch();
  };

  const guardar = async (pub: Publicacion) => {
    await updatePublicacionApi(pub.id, publicacionToPayload(pub));
    await refetch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-cv-gray-400">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Cargando publicaciones…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-[#E4C9C2] bg-[#FBEEEB] px-5 py-4 text-sm text-[#A6452F]">
        No se pudieron cargar las publicaciones. Verifica que el backend esté
        disponible e inténtalo de nuevo.
      </div>
    );
  }

  return (
    <>
      <PublicacionesStatsBar publicaciones={publicaciones} />
      <PublicacionesAlerta publicaciones={publicaciones} />
      <PublicacionesPendientes
        publicaciones={publicaciones}
        onAprobar={aprobar}
        onRechazar={rechazar}
        onGuardar={guardar}
      />
    </>
  );
}
