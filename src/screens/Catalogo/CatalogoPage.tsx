"use client";

import { useState, useMemo, useEffect } from "react";
import { Trees } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

import { CatalogoSkeleton } from "./components/CatalogoSkeleton";

import { CatalogoFiltros, type FiltrosState, type Temporada, type Categoria } from "./components/CatalogoFiltros";
import { CatalogoCard, type EspecieCardData } from "./components/CatalogoCard";
import { CatalogoListItem, type EspecieListData } from "./components/CatalogoListItem";

import catalogoData from "@/mocks/catalogoData.json";

const ESPECIES_GRID = catalogoData.especies as EspecieCardData[];
const OTROS_RECURSOS = catalogoData.otrosRecursos as EspecieListData[];

const CATEGORIA_MAP: Record<string, Categoria> = {
  "Nuez / Semilla": "Nueces y Semillas",
  "Fruta": "Frutas",
  "Aceite / Fruta": "Frutas",
  "Miel": "Mieles",
  "Infusión": "Hierbas e Infusiones",
  "Raíz": "Frutas", // fallback — adjust as needed
};

/* ══════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ══════════════════════════════════════════════════════════════════════ */

export default function CatalogoPage() {
  const [filtros, setFiltros] = useState<FiltrosState>({
    temporadas: [],
    categorias: [],
    usos: [],
  });
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading to show skeleton
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  /* ── Filtering logic ──────────────────────────────────────────────── */
  const especiesFiltradas = useMemo(() => {
    return ESPECIES_GRID.filter((e) => {
      const pasaTemporada =
        filtros.temporadas.length === 0 || filtros.temporadas.includes(e.temporada as Temporada);
      const categoria = CATEGORIA_MAP[e.categoria];
      const pasaCategoria =
        filtros.categorias.length === 0 ||
        (categoria && filtros.categorias.includes(categoria));
      return pasaTemporada && pasaCategoria;
    });
  }, [filtros]);

  /* How many "Otros recursos" to show */
  const recursosVisibles = mostrarTodos ? OTROS_RECURSOS : OTROS_RECURSOS.slice(0, 3);

  if (isLoading) {
    return <CatalogoSkeleton />;
  }

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* ── Hero header ───────────────────────────────────────────── */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-cv-green-900 sm:text-4xl">
          Frutos de la Chiquitanía
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-cv-gray-600">
          Descubre la biodiversidad del bosque seco chiquitano. Una herramienta para el
          conocimiento, la conservación y el consumo consciente de nuestras especies nativas.
        </p>
      </section>

      {/* ── Two-column layout: grid + sticky filters (right) ──────── */}
      <div className="flex gap-10 lg:gap-14">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* ── Grid de especies ──────────────────────────────────── */}
          {especiesFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {especiesFiltradas.map((especie) => (
                <Link key={especie.id} href={`/catalogo/${especie.id}`}>
                  <CatalogoCard especie={especie} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-cv-cream-300 py-16 text-center">
              <Trees className="mb-3 h-10 w-10 text-cv-green-300" />
              <p className="text-sm font-medium text-cv-gray-600">
                No hay especies con los filtros seleccionados
              </p>
              <button
                type="button"
                onClick={() => setFiltros({ temporadas: [], categorias: [], usos: [] })}
                className="mt-3 text-xs text-cv-green-600 underline underline-offset-2 hover:text-cv-green-800"
              >
                Limpiar filtros
              </button>
            </div>
          )}

          {/* ── Otros Recursos del Bosque ─────────────────────────── */}
          <section className="mt-10">
            <div className="mb-4 flex items-center gap-2">
              <Trees className="h-5 w-5 text-cv-green-700" />
              <h2 className="text-base font-semibold text-cv-gray-800">
                Otros Recursos del Bosque
              </h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {recursosVisibles.map((r) => (
                <Link key={r.id} href={`/catalogo/${r.id}`} className="block">
                  <CatalogoListItem especie={r} />
                </Link>
              ))}
            </div>
          </section>

          {/* ── CTA Button ────────────────────────────────────────── */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setMostrarTodos((v) => !v)}
              className="rounded-full bg-cv-green-800 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-cv-green-700 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              {mostrarTodos ? "Ver menos especies" : "Ver más especies"}
            </button>
          </div>
        </div>

        {/* Filters sidebar — fixed to the right, sticky on scroll */}
        <div className="hidden w-44 shrink-0 md:block lg:w-48">
          <div className="sticky top-24">
            <CatalogoFiltros filtros={filtros} onChange={setFiltros} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
