"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Trees, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUnifiedLoading } from "@/hooks/useUnifiedLoading";

import { CatalogoSkeleton } from "./components/CatalogoSkeleton";

import { CatalogoFiltrosBar, type FiltrosState, type Temporada, type Categoria } from "./components/CatalogoFiltrosBar";
import { CatalogoCard, type EspecieCardData } from "./components/CatalogoCard";

import { useApiCollection } from "@/hooks/useApiCollection";
import { listProductosUi } from "@/lib/api/productos";

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
  const uiLoading = useUnifiedLoading();
  const { data: productos, loading } = useApiCollection(listProductosUi);
  const isLoading = uiLoading || loading;
  const [toastContacto, setToastContacto] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const manejarContacto = (especie: EspecieCardData) => {
    setToastContacto(especie.nombre);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastContacto(null), 2200);
  };

  /* ── Estado de temporada: ya viene derivado del calendario del API ── */
  const especiesConEstado = useMemo(
    () => productos as EspecieCardData[],
    [productos],
  );

  /* ── Filtering logic ──────────────────────────────────────────────── */
  const especiesFiltradas = useMemo(() => {
    return especiesConEstado.filter((e) => {
      const pasaTemporada =
        filtros.temporadas.length === 0 || filtros.temporadas.includes(e.temporada as Temporada);
      const categoria = CATEGORIA_MAP[e.categoria];
      const pasaCategoria =
        filtros.categorias.length === 0 ||
        (categoria && filtros.categorias.includes(categoria));
      return pasaTemporada && pasaCategoria;
    });
  }, [filtros, especiesConEstado]);

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
          Frutos silvestres de Bolivia
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-cv-gray-600">
          Descubre la biodiversidad de los bosques de Bolivia. Una herramienta para el
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
              <CatalogoCard
                key={especie.id}
                especie={especie}
                onContact={manejarContacto}
              />
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

      <AnimatePresence>
        {toastContacto && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50 w-[min(92vw,360px)] rounded-2xl border border-[#8AA773]/40 bg-gradient-to-r from-cv-green-900 via-cv-green-800 to-[#2D5741] px-4 py-3 text-white shadow-xl shadow-cv-green-900/20"
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 rounded-full bg-white/15 p-1.5">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold">Redirigiendo a WhatsApp...</p>
                <p className="truncate text-xs text-white/80">{toastContacto}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
