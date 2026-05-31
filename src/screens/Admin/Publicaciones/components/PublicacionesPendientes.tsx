import type { Publicacion } from "../publicaciones.types";
import { PublicacionCard } from "./PublicacionCard";

export function PublicacionesPendientes({
  publicaciones,
  onAprobar,
  onRechazar,
  onGuardar,
}: {
  publicaciones: Publicacion[];
  onAprobar?: (pub: Publicacion) => void;
  onRechazar?: (pub: Publicacion) => void;
  onGuardar?: (pub: Publicacion) => void;
}) {
  const pendientes = publicaciones.filter((p) => p.estado === "pendiente");

  if (pendientes.length === 0) return null;

  return (
    <section aria-label="Publicaciones pendientes">
      <h2 className="mb-5 text-xl font-bold text-cv-gray-900">
        Publicaciones Pendientes
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pendientes.map((pub) => (
          <PublicacionCard
            key={pub.id}
            pub={pub}
            onAprobar={onAprobar}
            onRechazar={onRechazar}
            onGuardar={onGuardar}
          />
        ))}
      </div>
    </section>
  );
}
