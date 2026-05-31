"use client";

import { useMemo, useState } from "react";
import { Search, X, Sprout, Loader2 } from "lucide-react";

import type { ProductoTemporada } from "../temporada.types";
import { useCollection } from "@/hooks/useCollection";
import {
  subscribeProductos,
  saveProducto,
  deleteProducto,
} from "@/lib/firebase/productos.repo";
import { logActividad } from "@/lib/firebase/actividad.repo";
import { TemporadaHeader } from "./TemporadaHeader";
import { TemporadaCard } from "./TemporadaCard";
import { ProductoModal } from "./ProductoModal";
import {
  FILTROS,
  formToProducto,
  grupoDeCategoria,
  siguienteId,
} from "../temporada.data";
import type { ProductoFormValues } from "../temporada.types";

export function TemporadaExplorer() {
  const { data: productos, loading } =
    useCollection<ProductoTemporada>(subscribeProductos);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");

  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState<ProductoTemporada | null>(null);

  const filtrados = useMemo(() => {
    const q = search.trim().toLowerCase();
    return productos.filter((p) => {
      const matchSearch =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.nombreCientifico.toLowerCase().includes(q);
      const matchFiltro = filtro === "Todos" || grupoDeCategoria(p.categoria) === filtro;
      return matchSearch && matchFiltro;
    });
  }, [productos, search, filtro]);

  const hayFiltros = search !== "" || filtro !== "Todos";

  const abrirNuevo = () => {
    setEditando(null);
    setModalOpen(true);
  };

  const abrirEdicion = (producto: ProductoTemporada) => {
    setEditando(producto);
    setModalOpen(true);
  };

  const eliminar = async (producto: ProductoTemporada) => {
    if (!window.confirm(`¿Eliminar "${producto.nombre}" del catálogo?`)) return;
    await deleteProducto(producto.id);
    await logActividad({
      titulo: "Producto eliminado",
      descripcion: `Se eliminó "${producto.nombre}" del catálogo.`,
      accion: "eliminacion",
      categoria: "sistema",
    });
  };

  const guardar = async (values: ProductoFormValues) => {
    const esEdicion = Boolean(editando);
    const producto = esEdicion
      ? formToProducto(values, editando, editando!.id)
      : formToProducto(values, null, siguienteId(productos));
    await saveProducto(producto);
    await logActividad({
      titulo: esEdicion ? "Producto editado" : "Producto agregado",
      descripcion: `${esEdicion ? "Se editó" : "Se agregó"} "${producto.nombre}" en el catálogo.`,
      accion: esEdicion ? "edicion" : "creacion",
      categoria: "sistema",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-cv-gray-400">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        Cargando productos…
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <TemporadaHeader onNuevo={abrirNuevo} />

      {/* Búsqueda + filtros */}
      <div className="rounded-2xl border border-cv-cream-300 bg-white px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="relative min-w-44 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cv-gray-400" />
            <input
              type="search"
              placeholder="Buscar por nombre o nombre científico…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-cv-cream-300 bg-cv-cream-50 py-2 pl-9 pr-3 text-sm text-cv-gray-700 placeholder:text-cv-gray-400 focus:border-cv-green-400 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {FILTROS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFiltro(f)}
                className={
                  filtro === f
                    ? "rounded-full bg-cv-green-700 px-3.5 py-1.5 text-sm font-semibold text-white"
                    : "rounded-full border border-cv-cream-300 bg-white px-3.5 py-1.5 text-sm font-medium text-cv-gray-600 transition-colors hover:border-cv-green-300 hover:text-cv-gray-800"
                }
              >
                {f}
              </button>
            ))}

            {hayFiltros && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setFiltro("Todos");
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

      {/* Grilla */}
      {filtrados.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtrados.map((producto) => (
            <TemporadaCard
              key={producto.id}
              producto={producto}
              onEditar={abrirEdicion}
              onEliminar={eliminar}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-cv-cream-300 py-20 text-center">
          <Sprout className="mx-auto mb-3 h-10 w-10 text-cv-green-300" />
          <p className="text-cv-gray-500">
            {productos.length === 0
              ? "Aún no hay productos. Crea el primero."
              : "No se encontraron productos con esos criterios."}
          </p>
          {hayFiltros && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setFiltro("Todos");
              }}
              className="mt-3 text-sm font-medium text-cv-green-700 underline underline-offset-4"
            >
              Quitar filtros
            </button>
          )}
        </div>
      )}

      {/* Modal compartido crear/editar */}
      <ProductoModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        producto={editando}
        onSubmit={guardar}
      />
    </div>
  );
}
