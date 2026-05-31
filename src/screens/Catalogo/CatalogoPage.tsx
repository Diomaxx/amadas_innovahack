"use client";

import { useState, useMemo, useEffect } from "react";
import { Trees } from "lucide-react";
import { motion } from "framer-motion";

import { CatalogoSkeleton } from "./components/CatalogoSkeleton";

import { CatalogoFiltrosBar, type FiltrosState, type Temporada, type Categoria } from "./components/CatalogoFiltrosBar";
import { CatalogoCard, type EspecieCardData } from "./components/CatalogoCard";

import catalogoData from "@/mocks/catalogoData.json";

const ESPECIES_GRID = catalogoData.especies as EspecieCardData[];

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

      {/* ── Filtros (toolbar encima de los cards) ─────────────────── */}
      <CatalogoFiltrosBar
        filtros={filtros}
        onChange={setFiltros}
        total={especiesFiltradas.length}
      />

      {/* ── Grid de especies ──────────────────────────────────────── */}
      <div className="mt-8">
        {especiesFiltradas.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {especiesFiltradas.map((especie) => (
              <CatalogoCard key={especie.id} especie={especie} />
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
      </div>
    </motion.div>
  );
}
