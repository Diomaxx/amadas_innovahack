"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { ActividadEntry, CategoriaActividad } from "../actividad.types";
import { ActividadItem } from "./ActividadItem";

type Filtro = "todos" | CategoriaActividad;

const FILTROS: { value: Filtro; label: string }[] = [
  { value: "todos",      label: "Todos" },
  { value: "productor",  label: "Productores" },
  { value: "asociacion", label: "Asociaciones" },
  { value: "tienda",     label: "Tiendas" },
  { value: "proveedor",  label: "Proveedores" },
];

function clasificarFecha(fechaStr: string): "hoy" | "ayer" | "anteriores" {
  const hoy   = new Date();
  const fecha = new Date(fechaStr + "T00:00:00");
  const diffMs   = hoy.setHours(0, 0, 0, 0) - fecha.setHours(0, 0, 0, 0);
  const diffDias = Math.round(diffMs / 86_400_000);
  if (diffDias === 0) return "hoy";
  if (diffDias === 1) return "ayer";
  return "anteriores";
}

const GRUPO_LABEL: Record<"hoy" | "ayer" | "anteriores", string> = {
  hoy:         "Hoy",
  ayer:        "Ayer",
  anteriores:  "Anteriores",
};

type Grupo = "hoy" | "ayer" | "anteriores";
const ORDEN_GRUPOS: Grupo[] = ["hoy", "ayer", "anteriores"];

export function ActividadExplorer({
  actividades,
}: {
  actividades: ActividadEntry[];
}) {
  const [search, setSearch]   = useState("");
  const [filtro, setFiltro]   = useState<Filtro>("todos");

  const filtradas = useMemo(() => {
    const q = search.trim().toLowerCase();
    return actividades.filter((a) => {
      const matchSearch =
        !q ||
        a.titulo.toLowerCase().includes(q) ||
        a.descripcion.toLowerCase().includes(q);
      const matchFiltro =
        filtro === "todos" || filtro === "sistema"
          ? true
          : a.categoria === filtro;
      return matchSearch && matchFiltro;
    });
  }, [actividades, search, filtro]);

  const grupos = useMemo(() => {
    const mapa: Record<Grupo, ActividadEntry[]> = {
      hoy:        [],
      ayer:       [],
      anteriores: [],
    };
    for (const a of filtradas) {
      mapa[clasificarFecha(a.fecha)].push(a);
    }
    return mapa;
  }, [filtradas]);

  useEffect(() => {
    // reset nothing here — no pagination to reset
  }, [search, filtro]);

  const hayFiltros = search !== "" || filtro !== "todos";

  const limpiar = () => {
    setSearch("");
    setFiltro("todos");
  };

  return (
    <section aria-label="Explorador de actividad">
      {/* Search + filter bar — same row */}
      <div className="rounded-2xl border border-cv-cream-300 bg-white px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative min-w-44 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cv-gray-400" />
            <input
              type="search"
              placeholder="Buscar por nombre o nombre científico..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-cv-cream-300 bg-cv-cream-50 py-2 pl-9 pr-3 text-sm text-cv-gray-700 placeholder:text-cv-gray-400 focus:border-cv-green-400 focus:outline-none"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {FILTROS.map((f) => (
              <button
                key={f.value}
                type="button"
                onClick={() => setFiltro(f.value)}
                className={
                  filtro === f.value
                    ? "rounded-full bg-cv-green-700 px-3.5 py-1.5 text-sm font-semibold text-white"
                    : "rounded-full border border-cv-cream-300 bg-white px-3.5 py-1.5 text-sm font-medium text-cv-gray-600 transition-colors hover:border-cv-green-300 hover:text-cv-gray-800"
                }
              >
                {f.label}
              </button>
            ))}

            {hayFiltros && (
              <button
                type="button"
                onClick={limpiar}
                aria-label="Limpiar filtros"
                className="inline-flex items-center rounded-full px-2 py-1.5 text-xs text-cv-gray-400 transition-colors hover:text-cv-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grouped list */}
      <div className="mt-6 space-y-6">
        {filtradas.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cv-cream-300 py-20 text-center">
            <p className="text-cv-gray-400">
              No se encontraron actividades con esos criterios.
            </p>
            {hayFiltros && (
              <button
                type="button"
                onClick={limpiar}
                className="mt-3 text-sm font-medium text-cv-green-700 underline underline-offset-4"
              >
                Quitar filtros
              </button>
            )}
          </div>
        ) : (
          ORDEN_GRUPOS.map((grupo) => {
            const items = grupos[grupo];
            if (items.length === 0) return null;
            return (
              <div key={grupo}>
                {/* Group header */}
                <h2 className="mb-3 text-sm font-semibold text-cv-gray-700">
                  {GRUPO_LABEL[grupo]}
                </h2>

                {/* Items card */}
                <div className="overflow-hidden rounded-xl border border-cv-cream-300 bg-white divide-y divide-cv-cream-200">
                  {items.map((entrada) => (
                    <ActividadItem key={entrada.id} entrada={entrada} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
