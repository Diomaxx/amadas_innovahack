import * as DialogPrimitive from "@radix-ui/react-dialog";
import { MapPin, X } from "lucide-react";
import type { CicloTemporada, Publicacion } from "@/screens/Admin/Publicaciones/publicaciones.types";
import { ESTADO_VISUAL } from "@/screens/Admin/Publicaciones/publicaciones.data";

const ESTADO_LABEL: Record<string, string> = {
  pendiente: "Pendiente de Revisión",
  aprobado:  "Aprobado",
  rechazado: "Rechazado",
};

function formatCiclo(c: CicloTemporada): string {
  return c.fin ? `${c.inicio} - ${c.fin}` : c.inicio;
}

export function PublicacionVistaModal({ pub }: { pub: Publicacion }) {
  const v = ESTADO_VISUAL[pub.estado];
  const initial = pub.autor.charAt(0).toUpperCase();
  const multiCiclo = (pub.ciclos?.length ?? 0) > 1;

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 max-h-[92svh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-cv-cream-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <DialogPrimitive.Title className="text-base font-bold text-cv-gray-900">
              Detalles de Publicación
            </DialogPrimitive.Title>
            <span
              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
              style={{ color: v.badgeColor, backgroundColor: v.badgeBg }}
            >
              {ESTADO_LABEL[pub.estado]}
            </span>
          </div>
          <DialogPrimitive.Close className="rounded-lg p-1.5 text-cv-gray-400 transition-colors hover:bg-cv-cream-100 hover:text-cv-gray-700 focus:outline-none">
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </div>

        {/* Body */}
        <div className="space-y-5 px-6 py-5">
          {/* Image */}
          <div className="flex items-center justify-center rounded-xl bg-cv-cream-100 py-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pub.imagen}
              alt={pub.titulo}
              className="h-28 w-28 rounded-xl object-cover shadow-sm"
            />
          </div>

          {/* Producto / Categoría / Temporada */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">Producto</p>
              <p className="mt-1 text-sm font-bold text-cv-gray-900">{pub.producto ?? pub.tipo}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">Categoría</p>
              <p className="mt-1 text-sm text-cv-gray-700">{pub.tipo}</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">Temporada</p>
              <div className="mt-1.5 space-y-1.5">
                {!pub.ciclos?.length ? (
                  <p className="text-xs italic text-cv-gray-400">Sin datos</p>
                ) : (
                  pub.ciclos.map((c, i) => (
                    <span
                      key={i}
                      className="block w-fit rounded-md border border-cv-cream-300 bg-cv-cream-50 px-2.5 py-1 text-xs font-medium text-cv-gray-700"
                    >
                      {multiCiclo && (
                        <span className="mr-1 text-[10px] text-cv-gray-400">
                          Ciclo {i + 1}:
                        </span>
                      )}
                      {formatCiclo(c)}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Título */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">Título</p>
            <div className="mt-1.5 rounded-lg border border-cv-cream-200 bg-cv-cream-50 px-4 py-2.5">
              <p className="text-sm text-cv-gray-800">{pub.titulo}</p>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">Descripción</p>
            <div className="mt-1.5 rounded-lg border border-cv-cream-200 bg-cv-cream-50 px-4 py-3">
              <p className="text-sm leading-relaxed text-cv-gray-700">{pub.descripcion}</p>
            </div>
          </div>

          {/* Publicador */}
          <div className="rounded-xl bg-cv-green-50 p-4">
            <p className="mb-3 text-xs font-semibold text-cv-green-700">Información del Publicador</p>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cv-green-200 text-sm font-bold text-cv-green-800">
                  {initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-cv-gray-900">{pub.autor}</p>
                  {pub.organizacion && (
                    <p className="text-xs text-cv-gray-500">{pub.organizacion}</p>
                  )}
                </div>
              </div>
              <p className="flex items-center gap-1 text-xs text-cv-gray-500">
                <MapPin className="h-3.5 w-3.5 text-cv-gray-400" />
                {pub.ubicacion}
              </p>
            </div>
          </div>
        </div>

        {/* Footer — read only, just close */}
        <div className="flex justify-end border-t border-cv-cream-200 px-6 py-4">
          <DialogPrimitive.Close asChild>
            <button
              type="button"
              className="rounded-lg border border-cv-cream-300 bg-white px-5 py-2 text-sm font-medium text-cv-gray-700 transition-colors hover:bg-cv-cream-100"
            >
              Cerrar
            </button>
          </DialogPrimitive.Close>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
