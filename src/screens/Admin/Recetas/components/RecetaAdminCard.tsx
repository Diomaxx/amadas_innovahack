"use client";

import { Pencil, Trash2, BookOpen, ListOrdered } from "lucide-react";
import type { Receta } from "@/screens/Recetas/recetas.types";
import { CATEGORIA_VISUAL } from "@/screens/Recetas/components/recetaVisuals";

type Props = {
  receta: Receta;
  onEditar: (receta: Receta) => void;
  onEliminar: (receta: Receta) => void;
};

export function RecetaAdminCard({ receta, onEditar, onEliminar }: Props) {
  const visual = CATEGORIA_VISUAL[receta.categoria];
  const { Icon } = visual;

  const totalItems = receta.ingredientes.reduce(
    (acc, s) => acc + s.items.length,
    0,
  );
  const totalPasos = receta.preparacion.reduce(
    (acc, s) => acc + s.pasos.length,
    0,
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-cv-cream-300 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Cabecera visual (reemplaza la imagen: gradiente por categoría) */}
      <div
        className="relative flex h-32 items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${visual.color} 0%, #1B3A2D 100%)`,
        }}
      >
        <Icon weight="duotone" className="h-14 w-14 text-white/25" />
        <span
          className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold"
          style={{ color: visual.color, backgroundColor: "#ffffff" }}
        >
          <Icon weight="fill" className="h-3 w-3" />
          {visual.label}
        </span>
      </div>

      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-cv-green-900">
          {receta.nombre}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-cv-gray-600">
          {receta.contexto}
        </p>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-cv-gray-500">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-cv-green-600" />
            {totalItems} ingredientes
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ListOrdered className="h-3.5 w-3.5 text-cv-green-600" />
            {totalPasos} pasos
          </span>
        </div>

        <p className="mt-3 truncate text-xs text-cv-gray-500">
          <span className="font-medium text-cv-gray-700">Por:</span>{" "}
          {receta.autores}
        </p>

        {/* Productos del bosque (insumos) */}
        {receta.insumos.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-cv-gold-600">
              Productos del bosque
            </p>
            <div className="flex flex-wrap gap-1.5">
              {receta.insumos.map((insumo) => (
                <span
                  key={insumo}
                  className="rounded-md bg-cv-green-100 px-2 py-0.5 text-[10px] font-medium text-cv-green-800"
                >
                  {insumo}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="mt-auto flex gap-2 pt-5">
          <button
            type="button"
            onClick={() => onEditar(receta)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-cv-cream-300 px-3 py-2 text-xs font-semibold text-cv-gray-700 transition-colors hover:bg-cv-cream-100"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </button>
          <button
            type="button"
            onClick={() => onEliminar(receta)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}
