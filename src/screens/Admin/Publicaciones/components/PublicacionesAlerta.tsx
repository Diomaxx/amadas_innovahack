import { AlertCircle } from "lucide-react";
import type { Publicacion } from "../publicaciones.types";

export function PublicacionesAlerta({
  publicaciones,
}: {
  publicaciones: Publicacion[];
}) {
  const pendientes = publicaciones.filter((p) => p.estado === "pendiente").length;

  if (pendientes === 0) return null;

  return (
    <div
      className="flex items-start gap-3 rounded-xl border px-5 py-4"
      style={{ backgroundColor: "#FBF6EA", borderColor: "#E4D4AE" }}
    >
      <AlertCircle
        className="mt-0.5 h-5 w-5 shrink-0"
        style={{ color: "#9C7C3C" }}
      />
      <div>
        <p className="text-sm font-semibold" style={{ color: "#8A6A3F" }}>
          Hay {pendientes} publicacion{pendientes !== 1 ? "es" : ""} esperando
          tu revisión
        </p>
        <p className="mt-0.5 text-sm text-cv-gray-600">
          Revisa el contenido antes de aprobar para asegurar la calidad de la
          información.
        </p>
      </div>
    </div>
  );
}
