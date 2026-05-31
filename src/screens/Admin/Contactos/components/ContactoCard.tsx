"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Eye, Mail, MapPin, Phone } from "lucide-react";
import type { Contacto } from "../contactos.types";
import { TIPO_LABEL, TIPO_VISUAL } from "../contactos.data";
import { ContactoModal } from "./ContactoModal";

export function ContactoCard({ contacto }: { contacto: Contacto }) {
  const visual = TIPO_VISUAL[contacto.tipo];
  const initial = contacto.nombre.charAt(0).toUpperCase();

  return (
    <DialogPrimitive.Root>
      <article className="flex gap-3 rounded-xl border border-cv-cream-300 bg-white p-4 sm:gap-4 sm:p-5">
        {/* Avatar */}
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{ backgroundColor: visual.avatarBg, color: visual.avatarText }}
          aria-hidden="true"
        >
          {initial}
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1">
          {/* Name row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <span className="font-semibold leading-tight text-cv-gray-900">
                {contacto.nombre}
              </span>
              <span
                className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ color: visual.color, backgroundColor: visual.bg }}
              >
                {TIPO_LABEL[contacto.tipo]}
              </span>
            </div>

            {/* Eye button — opens modal */}
            <DialogPrimitive.Trigger asChild>
              <button
                type="button"
                aria-label={`Ver detalle de ${contacto.nombre}`}
                className="shrink-0 rounded-lg p-1.5 text-cv-gray-400 transition-colors hover:bg-cv-cream-100 hover:text-cv-gray-700"
              >
                <Eye className="h-4 w-4" />
              </button>
            </DialogPrimitive.Trigger>
          </div>

          {/* Organización */}
          {contacto.organizacion && (
            <p className="mt-0.5 text-sm text-cv-gray-500">
              {contacto.organizacion}
            </p>
          )}

          {/* Contact details */}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-cv-gray-600">
            {contacto.telefono && (
              <span className="inline-flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 shrink-0 text-cv-gray-400" />
                {contacto.telefono}
              </span>
            )}
            {contacto.email && (
              <span className="inline-flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 shrink-0 text-cv-gray-400" />
                <span className="truncate">{contacto.email}</span>
              </span>
            )}
            {contacto.ubicacion && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-cv-gray-400" />
                {contacto.ubicacion}
              </span>
            )}
          </div>

          {/* Productos */}
          {contacto.productos && contacto.productos.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-medium text-cv-gray-500">Productos:</span>
              {contacto.productos.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-cv-cream-100 px-2 py-0.5 text-cv-gray-700"
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          {/* Descripción */}
          {contacto.descripcion && (
            <p className="mt-2 text-xs" style={{ color: visual.color }}>
              {contacto.descripcion}
            </p>
          )}
        </div>
      </article>

      {/* Detail modal */}
      <ContactoModal contacto={contacto} />
    </DialogPrimitive.Root>
  );
}
