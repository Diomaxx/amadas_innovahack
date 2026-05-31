"use client";

import { Loader2 } from "lucide-react";
import type { Publicacion } from "../publicaciones.types";
import { useCollection } from "@/hooks/useCollection";
import {
  subscribePublicaciones,
  setEstadoPublicacion,
  savePublicacion,
} from "@/lib/firebase/publicaciones.repo";
import { logActividad } from "@/lib/firebase/actividad.repo";
import { PublicacionesStatsBar } from "./PublicacionesStatsBar";
import { PublicacionesAlerta } from "./PublicacionesAlerta";
import { PublicacionesPendientes } from "./PublicacionesPendientes";

export function PublicacionesBoard() {
  const { data: publicaciones, loading, error } =
    useCollection<Publicacion>(subscribePublicaciones);

  const aprobar = async (pub: Publicacion) => {
    await setEstadoPublicacion(pub.id, "aprobado");
    await logActividad({
      titulo: "Publicación aprobada",
      descripcion: `Se aprobó la publicación "${pub.titulo}" de ${pub.autor}.`,
      accion: "aprobacion",
      categoria: "productor",
    });
  };

  const rechazar = async (pub: Publicacion) => {
    await setEstadoPublicacion(pub.id, "rechazado");
    await logActividad({
      titulo: "Publicación rechazada",
      descripcion: `Se rechazó la publicación "${pub.titulo}" de ${pub.autor}.`,
      accion: "rechazo",
      categoria: "productor",
    });
  };

  const guardar = async (pub: Publicacion) => {
    await savePublicacion(pub);
    await logActividad({
      titulo: "Publicación editada",
      descripcion: `Se editó la publicación "${pub.titulo}".`,
      accion: "edicion",
      categoria: "productor",
    });
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
        No se pudieron cargar las publicaciones. ¿Sembraste los datos en{" "}
        <span className="font-semibold">/admin/seed</span>?
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
