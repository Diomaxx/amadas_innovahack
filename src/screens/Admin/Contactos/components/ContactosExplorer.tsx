"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Contacto, TipoContacto } from "../contactos.types";
import { ContactoCard } from "./ContactoCard";
import { ContactosPagination } from "./ContactosPagination";

const PAGE_SIZE = 8;

type Filtro = "todos" | TipoContacto;

const FILTROS: { value: Filtro; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "productor", label: "Productores" },
  { value: "asociacion", label: "Asociaciones" },
  { value: "tienda", label: "Tiendas" },
  { value: "proveedor", label: "Proveedores" },
];

export function ContactosExplorer({ contactos }: { contactos: Contacto[] }) {
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [page, setPage] = useState(1);

  const filtrados = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contactos.filter((c) => {
      const matchSearch =
        !q ||
        c.nombre.toLowerCase().includes(q) ||
        c.organizacion?.toLowerCase().includes(q) ||
        c.ubicacion?.toLowerCase().includes(q);
      const matchTipo = filtro === "todos" || c.tipo === filtro;
      return matchSearch && matchTipo;
    });
  }, [contactos, search, filtro]);

  useEffect(() => {
    setPage(1);
  }, [search, filtro]);

  const totalPages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const visibles = filtrados.slice(
    (pageSafe - 1) * PAGE_SIZE,
    pageSafe * PAGE_SIZE,
  );

  const hayFiltros = search !== "" || filtro !== "todos";

  const limpiar = () => {
    setSearch("");
    setFiltro("todos");
  };

  return (
    <section aria-label="Explorador de contactos">
      {/* Search + filter bar — single row that wraps on mobile */}
      <div className="rounded-2xl border border-cv-cream-300 bg-white px-4 py-3 sm:px-5 sm:py-3.5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Search input */}
          <div className="relative min-w-44 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cv-gray-400" />
            <input
              type="search"
              placeholder="Buscar por nombre y nombre científico..."
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
                className="inline-flex items-center gap-1 rounded-full px-2 py-1.5 text-xs font-medium text-cv-gray-400 transition-colors hover:text-cv-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results header */}
      <div className="mb-4 mt-6 flex items-baseline justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-cv-gray-500">
          Contactos
        </h2>
        <span className="text-sm text-cv-gray-400">
          {filtrados.length}{" "}
          {filtrados.length === 1 ? "resultado" : "resultados"}
        </span>
      </div>

      {/* Contact list */}
      {visibles.length > 0 ? (
        <div className="space-y-3">
          {visibles.map((contacto) => (
            <ContactoCard key={contacto.id} contacto={contacto} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-cv-cream-300 py-20 text-center">
          <p className="text-cv-gray-400">
            No se encontraron contactos con esos criterios.
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
      )}

      <ContactosPagination
        page={pageSafe}
        totalPages={totalPages}
        onChange={setPage}
      />
    </section>
  );
}
