"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, ImageIcon, MapPin, Pencil, Plus, Trash2, X } from "lucide-react";
import type { CicloTemporada, Publicacion } from "../publicaciones.types";
import { ESTADO_VISUAL } from "../publicaciones.data";

const MESES = [
  "Ene", "Feb", "Mar", "Abr", "May", "Jun",
  "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
];

const MODAL_ESTADO_LABEL: Record<string, string> = {
  pendiente: "Pendiente de Revisión",
  aprobado:  "Aprobado",
  rechazado: "Rechazado",
};

function formatCiclo(c: CicloTemporada): string {
  return c.fin ? `${c.inicio} - ${c.fin}` : c.inicio;
}

function CicloManager({
  ciclos,
  onChange,
}: {
  ciclos: CicloTemporada[];
  onChange: (c: CicloTemporada[]) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [inicio, setInicio] = useState("Ene");
  const [fin, setFin] = useState("Dic");
  const multiCiclo = ciclos.length > 1;

  const agregar = () => {
    onChange([
      ...ciclos,
      inicio === fin ? { inicio } : { inicio, fin },
    ]);
    setShowForm(false);
  };

  const eliminar = (i: number) => onChange(ciclos.filter((_, idx) => idx !== i));

  return (
    <div>
      {ciclos.length === 0 && (
        <p className="text-xs text-cv-gray-400 italic">Sin datos</p>
      )}
      <div className="space-y-1.5">
        {ciclos.map((c, i) => (
          <div key={i} className="group flex items-center gap-1.5">
            <span className="rounded-md border border-cv-cream-300 bg-cv-cream-50 px-2.5 py-1 text-xs font-medium text-cv-gray-700">
              {multiCiclo && (
                <span className="mr-1 text-[10px] text-cv-gray-400">
                  Ciclo {i + 1}:
                </span>
              )}
              {formatCiclo(c)}
            </span>
            <button
              type="button"
              onClick={() => eliminar(i)}
              className="invisible rounded p-0.5 text-cv-gray-300 hover:text-[#A6452F] group-hover:visible"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {showForm ? (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <select
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            className="rounded-md border border-cv-cream-300 bg-white px-2 py-1 text-xs text-cv-gray-700 focus:outline-none"
          >
            {MESES.map((m) => <option key={m}>{m}</option>)}
          </select>
          <span className="text-xs text-cv-gray-400">—</span>
          <select
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="rounded-md border border-cv-cream-300 bg-white px-2 py-1 text-xs text-cv-gray-700 focus:outline-none"
          >
            {MESES.map((m) => <option key={m}>{m}</option>)}
          </select>
          <button
            type="button"
            onClick={agregar}
            className="rounded-md bg-cv-green-700 px-2 py-1 text-xs font-medium text-white hover:bg-cv-green-800"
          >
            Agregar
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="text-xs text-cv-gray-400 hover:text-cv-gray-600"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="mt-2 flex items-center gap-1 text-[11px] font-medium text-cv-green-600 hover:text-cv-green-700"
        >
          <Plus className="h-3 w-3" />
          Agregar ciclo
        </button>
      )}
    </div>
  );
}

export function PublicacionDetalleModal({
  pub,
  onAprobar,
  onRechazar,
  onGuardar,
}: {
  pub: Publicacion;
  onAprobar?: (pub: Publicacion) => void;
  onRechazar?: (pub: Publicacion) => void;
  onGuardar?: (pub: Publicacion) => void;
}) {
  const v = ESTADO_VISUAL[pub.estado];
  const initial = pub.autor.charAt(0).toUpperCase();

  // ── Shared state ─────────────────────────────────────────────
  const [ciclos, setCiclos] = useState<CicloTemporada[]>(pub.ciclos ?? []);
  const [editando, setEditando] = useState(false);

  // ── Edit-mode local fields ────────────────────────────────────
  const [savedData, setSavedData] = useState({
    titulo:    pub.titulo,
    descripcion: pub.descripcion,
    tipo:      pub.tipo,
    producto:  pub.producto ?? "",
  });
  const [draft, setDraft] = useState(savedData);
  const [draftCiclos, setDraftCiclos] = useState<CicloTemporada[]>(ciclos);

  const abrirEdicion = () => {
    setDraft(savedData);
    setDraftCiclos(ciclos);
    setEditando(true);
  };

  const cancelarEdicion = () => setEditando(false);

  const guardar = () => {
    setSavedData(draft);
    setCiclos(draftCiclos);
    setEditando(false);
    onGuardar?.({
      ...pub,
      titulo: draft.titulo,
      descripcion: draft.descripcion,
      tipo: draft.tipo,
      producto: draft.producto,
      ciclos: draftCiclos,
    });
  };

  // ── Helpers ───────────────────────────────────────────────────
  const multiCiclo = ciclos.length > 1;

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

      <DialogPrimitive.Content
        onInteractOutside={(e) => { if (editando) e.preventDefault(); }}
        className="fixed left-1/2 top-1/2 z-50 max-h-[92svh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white shadow-xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 focus:outline-none"
      >
        {/* ── Header ─────────────────────────────────────────── */}
        <div className="flex items-center justify-between border-b border-cv-cream-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <DialogPrimitive.Title className="text-base font-bold text-cv-gray-900">
              {editando ? "Editar Publicación" : "Detalles de Publicación"}
            </DialogPrimitive.Title>
            {!editando && (
              <span
                className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                style={{ color: v.badgeColor, backgroundColor: v.badgeBg }}
              >
                {MODAL_ESTADO_LABEL[pub.estado]}
              </span>
            )}
          </div>
          <DialogPrimitive.Close className="rounded-lg p-1.5 text-cv-gray-400 transition-colors hover:bg-cv-cream-100 hover:text-cv-gray-700 focus:outline-none">
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </div>

        {/* ── Body ───────────────────────────────────────────── */}
        <div className="space-y-5 px-6 py-5">

          {/* Image section */}
          <div className="flex items-center justify-center gap-4 rounded-xl bg-cv-cream-100 py-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pub.imagen}
              alt={savedData.titulo}
              className="h-24 w-24 rounded-xl object-cover shadow-sm"
            />
            {editando && (
              <button
                type="button"
                className="flex h-24 w-24 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-cv-cream-300 bg-white text-cv-gray-400 transition-colors hover:border-cv-green-300 hover:text-cv-green-500"
              >
                <ImageIcon className="h-6 w-6" />
                <span className="text-[10px] font-medium">Cambiar</span>
              </button>
            )}
          </div>

          {/* Producto / Categoría / Temporada */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">
                Producto
              </p>
              {editando ? (
                <input
                  type="text"
                  value={draft.producto}
                  onChange={(e) => setDraft({ ...draft, producto: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-cv-cream-300 bg-white px-3 py-2 text-sm text-cv-gray-800 focus:border-cv-green-400 focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-sm font-bold text-cv-gray-900">
                  {savedData.producto || savedData.tipo}
                </p>
              )}
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">
                Categoría
              </p>
              {editando ? (
                <input
                  type="text"
                  value={draft.tipo}
                  onChange={(e) => setDraft({ ...draft, tipo: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-cv-cream-300 bg-white px-3 py-2 text-sm text-cv-gray-800 focus:border-cv-green-400 focus:outline-none"
                />
              ) : (
                <p className="mt-1 text-sm text-cv-gray-700">{savedData.tipo}</p>
              )}
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">
                Temporada
              </p>
              <div className="mt-1.5">
                {editando ? (
                  <CicloManager
                    ciclos={draftCiclos}
                    onChange={setDraftCiclos}
                  />
                ) : (
                  <div className="space-y-1.5">
                    {ciclos.length === 0 ? (
                      <p className="text-xs italic text-cv-gray-400">Sin datos</p>
                    ) : (
                      ciclos.map((c, i) => (
                        <span
                          key={i}
                          className="block w-fit rounded-md border border-cv-cream-300 bg-cv-cream-50 px-2.5 py-1 text-xs font-medium text-cv-gray-700"
                        >
                          {ciclos.length > 1 && (
                            <span className="mr-1 text-[10px] text-cv-gray-400">
                              Ciclo {i + 1}:
                            </span>
                          )}
                          {formatCiclo(c)}
                        </span>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Título */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">
              Título
            </p>
            {editando ? (
              <input
                type="text"
                value={draft.titulo}
                onChange={(e) => setDraft({ ...draft, titulo: e.target.value })}
                className="mt-1.5 w-full rounded-lg border border-cv-cream-300 bg-white px-4 py-2.5 text-sm text-cv-gray-800 focus:border-cv-green-400 focus:outline-none"
              />
            ) : (
              <div className="mt-1.5 rounded-lg border border-cv-cream-200 bg-cv-cream-50 px-4 py-2.5">
                <p className="text-sm text-cv-gray-800">{savedData.titulo}</p>
              </div>
            )}
          </div>

          {/* Descripción */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-cv-gray-400">
              Descripción
            </p>
            {editando ? (
              <textarea
                value={draft.descripcion}
                onChange={(e) => setDraft({ ...draft, descripcion: e.target.value })}
                rows={5}
                className="mt-1.5 w-full resize-none rounded-lg border border-cv-cream-300 bg-white px-4 py-3 text-sm leading-relaxed text-cv-gray-800 focus:border-cv-green-400 focus:outline-none"
              />
            ) : (
              <div className="mt-1.5 rounded-lg border border-cv-cream-200 bg-cv-cream-50 px-4 py-3">
                <p className="text-sm leading-relaxed text-cv-gray-700">
                  {savedData.descripcion}
                </p>
              </div>
            )}
          </div>

          {/* Información del publicador — solo en vista */}
          {!editando && (
            <div className="rounded-xl bg-cv-green-50 p-4">
              <p className="mb-3 text-xs font-semibold text-cv-green-700">
                Información del Publicador
              </p>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cv-green-200 text-sm font-bold text-cv-green-800">
                    {initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-cv-gray-900">
                      {pub.autor}
                    </p>
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
          )}
        </div>

        {/* ── Footer ─────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-cv-cream-200 px-6 py-4">
          {editando ? (
            <>
              <button
                type="button"
                onClick={cancelarEdicion}
                className="rounded-lg border border-cv-cream-300 bg-white px-4 py-2 text-sm font-medium text-cv-gray-700 transition-colors hover:bg-cv-cream-100"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={guardar}
                className="inline-flex items-center gap-1.5 rounded-lg bg-cv-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cv-green-800"
              >
                <Check className="h-4 w-4" />
                Guardar Cambios
              </button>
            </>
          ) : (
            <>
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  onClick={() => onRechazar?.(pub)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#E4C9C2] bg-white px-4 py-2 text-sm font-medium text-[#A6452F] transition-colors hover:bg-[#FBEEEB]"
                >
                  <X className="h-4 w-4" />
                  Rechazar
                </button>
              </DialogPrimitive.Close>

              <button
                type="button"
                onClick={abrirEdicion}
                className="inline-flex items-center gap-1.5 rounded-lg border border-cv-cream-300 bg-white px-4 py-2 text-sm font-medium text-cv-gray-700 transition-colors hover:bg-cv-cream-100"
              >
                <Pencil className="h-4 w-4" />
                Editar Publicación
              </button>

              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  onClick={() => onAprobar?.(pub)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cv-green-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cv-green-800"
                >
                  <Check className="h-4 w-4" />
                  Aprobar y Publicar
                </button>
              </DialogPrimitive.Close>
            </>
          )}
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
