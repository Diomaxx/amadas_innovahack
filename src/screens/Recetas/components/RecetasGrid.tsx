"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MagnifyingGlass,
  CaretDown,
  CaretLeft,
  CaretRight,
  X,
} from "@phosphor-icons/react";
import type { Receta, RecetaCategoria } from "../recetas.types";
import {
  AUTORES_DISPONIBLES,
  CATEGORIA_LABEL,
  INSUMOS_DISPONIBLES,
} from "../recetas.data";
import { CATEGORIA_VISUAL } from "./recetaVisuals";
import { RecetaCard } from "./RecetaCard";

const CATEGORIAS: RecetaCategoria[] = ["salada", "dulce", "coctel", "base"];
const PAGE_SIZE = 8;

function SelectFiltro({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-[#e8e0d0] bg-white py-2.5 pl-4 pr-9 text-sm font-medium text-[#2d4a3e] transition-colors hover:border-[#7a9b76]/60 focus:border-[#2d4a3e] focus:outline-none"
      >
        {children}
      </select>
      <CaretDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2d4a3e]/40" />
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginación de recetas"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e0d0] bg-white text-[#2d4a3e] transition-colors hover:bg-[#2d4a3e]/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CaretLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={
            p === page
              ? "inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#2d4a3e] px-3 text-sm font-semibold text-[#f5f1e8]"
              : "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-[#e8e0d0] bg-white px-3 text-sm font-medium text-[#2d4a3e] transition-colors hover:bg-[#2d4a3e]/5"
          }
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e8e0d0] bg-white text-[#2d4a3e] transition-colors hover:bg-[#2d4a3e]/5 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <CaretRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

export function RecetasGrid({
  recetas,
  insumoInicial,
}: {
  recetas: Receta[];
  insumoInicial?: string;
}) {
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState<RecetaCategoria | "todas">("todas");
  // Si llega un insumo por la URL y existe en el catálogo, parte filtrado por él.
  const [insumo, setInsumo] = useState(() =>
    insumoInicial && INSUMOS_DISPONIBLES.includes(insumoInicial)
      ? insumoInicial
      : "todos",
  );
  const [autor, setAutor] = useState("todos");
  const [page, setPage] = useState(1);

  const filtradas = useMemo(() => {
    const q = search.trim().toLowerCase();
    return recetas.filter((receta) => {
      const matchSearch = !q || receta.nombre.toLowerCase().includes(q);
      const matchCat = categoria === "todas" || receta.categoria === categoria;
      const matchInsumo =
        insumo === "todos" || receta.insumos.includes(insumo);
      const matchAutor = autor === "todos" || receta.autores === autor;
      return matchSearch && matchCat && matchInsumo && matchAutor;
    });
  }, [recetas, search, categoria, insumo, autor]);

  // Al cambiar cualquier filtro, volver a la primera página.
  useEffect(() => {
    setPage(1);
  }, [search, categoria, insumo, autor]);

  const totalPages = Math.max(1, Math.ceil(filtradas.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const visibles = filtradas.slice(
    (pageSafe - 1) * PAGE_SIZE,
    pageSafe * PAGE_SIZE,
  );

  const hayFiltros =
    search !== "" ||
    categoria !== "todas" ||
    insumo !== "todos" ||
    autor !== "todos";

  const limpiar = () => {
    setSearch("");
    setCategoria("todas");
    setInsumo("todos");
    setAutor("todos");
  };

  return (
    <div>
      {/* Toolbar de filtros */}
      <div className="rounded-2xl border border-[#e8e0d0] bg-white/70 p-4 backdrop-blur sm:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          {/* Buscador */}
          <div className="relative w-full lg:max-w-sm">
            <MagnifyingGlass className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#2d4a3e]/40" />
            <input
              type="text"
              placeholder="Buscar receta por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#e8e0d0] bg-white py-2.5 pl-11 pr-4 text-sm text-[#2d4a3e] placeholder:text-[#2d4a3e]/40 focus:border-[#2d4a3e] focus:outline-none"
            />
          </div>

          {/* Selects */}
          <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-md">
            <SelectFiltro label="Insumo" value={insumo} onChange={setInsumo}>
              <option value="todos">Todos los insumos</option>
              {INSUMOS_DISPONIBLES.map((ins) => (
                <option key={ins} value={ins}>
                  {ins}
                </option>
              ))}
            </SelectFiltro>

            <SelectFiltro label="Autor" value={autor} onChange={setAutor}>
              <option value="todos">Todos los autores</option>
              {AUTORES_DISPONIBLES.map((a) => (
                <option key={a} value={a}>
                  {a.length > 38 ? `${a.slice(0, 38)}…` : a}
                </option>
              ))}
            </SelectFiltro>
          </div>
        </div>

        {/* Pills de categoría */}
        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#e8e0d0] pt-4">
          <button
            type="button"
            onClick={() => setCategoria("todas")}
            className={
              categoria === "todas"
                ? "rounded-full bg-[#2d4a3e] px-4 py-1.5 text-xs font-semibold text-[#f5f1e8]"
                : "rounded-full border border-[#e8e0d0] bg-white px-4 py-1.5 text-xs font-medium text-[#2d4a3e]/70 transition-colors hover:border-[#7a9b76]/60"
            }
          >
            Todas
          </button>

          {CATEGORIAS.map((cat) => {
            const visual = CATEGORIA_VISUAL[cat];
            const { Icon } = visual;
            const active = categoria === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoria(cat)}
                className={
                  active
                    ? "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold"
                    : "inline-flex items-center gap-1.5 rounded-full border border-[#e8e0d0] bg-white px-4 py-1.5 text-xs font-medium text-[#2d4a3e]/70 transition-colors hover:border-[#7a9b76]/60"
                }
                style={
                  active
                    ? { color: visual.color, backgroundColor: visual.bg }
                    : undefined
                }
              >
                <Icon weight="fill" className="h-3.5 w-3.5" />
                {CATEGORIA_LABEL[cat]}
              </button>
            );
          })}

          {hayFiltros && (
            <button
              type="button"
              onClick={limpiar}
              className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-[#b06a4a] transition-colors hover:text-[#8a4f37]"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      {/* Encabezado de resultados */}
      <div className="mb-6 mt-8 flex items-baseline justify-between">
        <h2 className="text-lg font-bold uppercase tracking-wide text-[#2d4a3e]">
          Todas las recetas
        </h2>
        <span className="text-sm text-[#2d4a3e]/60">
          {filtradas.length} {filtradas.length === 1 ? "receta" : "recetas"}
        </span>
      </div>

      {/* Grid */}
      {visibles.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibles.map((receta, index) => (
            <RecetaCard key={receta.id} receta={receta} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-[#e8e0d0] py-20 text-center">
          <p className="text-lg text-[#2d4a3e]/60">
            No se encontraron recetas con esos criterios.
          </p>
          <button
            type="button"
            onClick={limpiar}
            className="mt-4 text-sm font-medium text-[#2d4a3e] underline underline-offset-4"
          >
            Quitar filtros
          </button>
        </div>
      )}

      <Pagination page={pageSafe} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
