"use client";

import { useMemo, useState } from "react";
import { Search, X, ChefHat, Loader2 } from "lucide-react";

import type { Receta, RecetaCategoria } from "@/screens/Recetas/recetas.types";
import { useApiCollection } from "@/hooks/useApiCollection";
import {
  createRecetaApi,
  deleteRecetaApi,
  listRecetasUi,
  recetaToPayload,
  updateRecetaApi,
} from "@/lib/api/recetas";
import { RecetasAdminHeader } from "./RecetasAdminHeader";
import { RecetasStatsBar } from "./RecetasStatsBar";
import { RecetaAdminCard } from "./RecetaAdminCard";
import { RecetaFormModal } from "./RecetaFormModal";
import { CATEGORIAS, CATEGORIA_SHORT, formValuesToReceta } from "../recetas.admin.data";
import type { RecetaFormValues } from "../recetas.admin.types";

type Filtro = "todos" | RecetaCategoria;

const FILTROS: { value: Filtro; label: string }[] = [
  { value: "todos", label: "Todos" },
  ...CATEGORIAS.map((c) => ({ value: c, label: CATEGORIA_SHORT[c] })),
];

export function RecetasAdminExplorer() {
  const { data: recetas, loading, refetch } = useApiCollection(listRecetasUi);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<Receta | null>(null);

  const filtradas = useMemo(() => {
    const q = search.trim().toLowerCase();
    return recetas.filter((r) => {
      const matchSearch =
        !q ||
        r.nombre.toLowerCase().includes(q) ||
        r.autores.toLowerCase().includes(q);
      const matchFiltro = filtro === "todos" || r.categoria === filtro;
      return matchSearch && matchFiltro;
    });
  }, [recetas, search, filtro]);

  const hayFiltros = search !== "" || filtro !== "todos";

  const abrirNueva = () => {
    setEditando(null);
    setModalOpen(true);
  };

  const abrirEdicion = (receta: Receta) => {
    setEditando(receta);
    setModalOpen(true);
  };

  // La actividad se registra server-side dentro de cada mutación del backend.
  const eliminar = async (receta: Receta) => {
    const ok = window.confirm(`¿Eliminar la receta "${receta.nombre}"?`);
    if (!ok) return;
    await deleteRecetaApi(receta.id);
    await refetch();
  };

  const guardar = async (values: RecetaFormValues) => {
    const esEdicion = Boolean(editando);
    // El id nuevo lo asigna la DB; el 0 es solo para armar el view-model.
    const receta = formValuesToReceta(values, editando, editando?.id ?? 0);
    const payload = recetaToPayload(receta);
    if (esEdicion) {
      await updateRecetaApi(editando!.id, payload);
    } else {
      await createRecetaApi(payload);
    }
    await refetch();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-cv-gray-400">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Cargando recetas…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <RecetasAdminHeader onNueva={abrirNueva} />

      <RecetasStatsBar recetas={recetas} />

      {/* Barra de búsqueda + filtros */}
      <div className="rounded-2xl border border-cv-cream-300 bg-white px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative min-w-44 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cv-gray-400" />
            <input
              type="search"
              placeholder="Buscar por nombre o autor…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-cv-cream-300 bg-cv-cream-50 py-2 pl-9 pr-3 text-sm text-cv-gray-700 placeholder:text-cv-gray-400 focus:border-cv-green-400 focus:outline-none"
            />
          </div>

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
                onClick={() => {
                  setSearch("");
                  setFiltro("todos");
                }}
                aria-label="Limpiar filtros"
                className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium text-cv-gray-400 transition-colors hover:text-cv-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grilla de recetas */}
      {filtradas.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtradas.map((receta) => (
            <RecetaAdminCard
              key={receta.id}
              receta={receta}
              onEditar={abrirEdicion}
              onEliminar={eliminar}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-cv-cream-300 py-20 text-center">
          <ChefHat className="mx-auto mb-3 h-10 w-10 text-cv-green-300" />
          <p className="text-cv-gray-500">
            {recetas.length === 0
              ? "Aún no hay recetas. Crea la primera."
              : "No se encontraron recetas con esos criterios."}
          </p>
          {hayFiltros && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFiltro("todos");
              }}
              className="mt-3 text-sm font-medium text-cv-green-700 underline underline-offset-4"
            >
              Quitar filtros
            </button>
          )}
        </div>
      )}

      {/* Modal compartido crear/editar */}
      <RecetaFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        receta={editando}
        onSubmit={guardar}
      />
    </div>
  );
}
