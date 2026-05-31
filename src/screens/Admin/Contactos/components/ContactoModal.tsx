import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  Building2,
  ClipboardList,
  Leaf,
  Mail,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import type { Contacto } from "../contactos.types";
import { TIPO_LABEL, TIPO_VISUAL } from "../contactos.data";

export function ContactoModal({ contacto }: { contacto: Contacto }) {
  const visual = TIPO_VISUAL[contacto.tipo];
  const initial = contacto.nombre.charAt(0).toUpperCase();

  return (
    <DialogPrimitive.Portal>
      {/* Overlay */}
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      {/* Panel */}
      <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl bg-white shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none">
        {/* ── Header ─────────────────────────────────────────── */}
        <div
          className="relative px-5 py-5 sm:px-6"
          style={{ backgroundColor: visual.headerBg }}
        >
          {/* Close button */}
          <DialogPrimitive.Close className="absolute right-4 top-4 rounded-lg p-1 text-white/70 transition-colors hover:text-white focus:outline-none">
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar</span>
          </DialogPrimitive.Close>

          <div className="flex items-center gap-3 pr-8">
            {/* Avatar */}
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold"
              style={{
                backgroundColor: visual.bg,
                color: visual.color,
              }}
              aria-hidden="true"
            >
              {initial}
            </div>

            <div className="min-w-0">
              {/* Name + badge */}
              <div className="flex flex-wrap items-center gap-2">
                <DialogPrimitive.Title className="text-lg font-bold leading-tight text-white">
                  {contacto.nombre}
                </DialogPrimitive.Title>
                <span
                  className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                  style={{ color: visual.color, backgroundColor: visual.bg }}
                >
                  {TIPO_LABEL[contacto.tipo]}
                </span>
              </div>

              {/* Association / organization */}
              {contacto.organizacion && (
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/80">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  {contacto.organizacion}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className="divide-y divide-cv-cream-200">
          {/* Contact info row */}
          {(contacto.telefono || contacto.email || contacto.ubicacion) && (
            <div className="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-3 sm:px-6">
              {contacto.telefono && (
                <div>
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cv-gray-400">
                    <Phone
                      className="h-3 w-3"
                      style={{ color: visual.color }}
                    />
                    Teléfono
                  </p>
                  <p className="mt-1 text-sm font-medium text-cv-gray-700">
                    {contacto.telefono}
                  </p>
                </div>
              )}
              {contacto.email && (
                <div>
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cv-gray-400">
                    <Mail
                      className="h-3 w-3"
                      style={{ color: visual.color }}
                    />
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-cv-gray-700">
                    {contacto.email}
                  </p>
                </div>
              )}
              {contacto.ubicacion && (
                <div>
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-cv-gray-400">
                    <MapPin
                      className="h-3 w-3"
                      style={{ color: visual.color }}
                    />
                    Ubicación
                  </p>
                  <p className="mt-1 text-sm font-medium text-cv-gray-700">
                    {contacto.ubicacion}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Dirección completa */}
          {contacto.direccion && (
            <div className="px-5 py-4 sm:px-6">
              <p
                className="flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: visual.color }}
              >
                <MapPin className="h-4 w-4 shrink-0" />
                Dirección Completa
              </p>
              <p className="mt-1.5 text-sm text-cv-gray-600">
                {contacto.direccion}
              </p>
            </div>
          )}

          {/* Productos */}
          {contacto.productos && contacto.productos.length > 0 && (
            <div className="px-5 py-4 sm:px-6">
              <p
                className="flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: visual.color }}
              >
                <Leaf className="h-4 w-4 shrink-0" />
                Productos ({contacto.productos.length})
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {contacto.productos.map((p) => (
                  <span
                    key={p}
                    className="rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      color: visual.color,
                      backgroundColor: visual.bg,
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notas adicionales */}
          {contacto.descripcion && (
            <div className="px-5 py-4 sm:px-6">
              <div
                className="rounded-lg p-4"
                style={{ backgroundColor: "#FBF6EA" }}
              >
                <p
                  className="flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: visual.color }}
                >
                  <ClipboardList className="h-4 w-4 shrink-0" />
                  Notas Adicionales
                </p>
                <p className="mt-1.5 text-sm text-cv-gray-600">
                  {contacto.descripcion}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
