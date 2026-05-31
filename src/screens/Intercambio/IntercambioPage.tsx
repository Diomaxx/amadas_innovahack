"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Handshake, Plus } from "lucide-react";

import { IntercambioFiltros, type FiltrosIntercambioState, type Categoria, type Ubicacion } from "./components/IntercambioFiltros";
import { IntercambioCard } from "./components/IntercambioCard";
import { MarketStabilityCard } from "./components/MarketStabilityCard";
import { IntercambioSkeleton } from "./components/IntercambioSkeleton";
import { ProponerTratoModal } from "./components/ProponerTratoModal";
import { pageTransition, staggerContainer, staggerItem } from "./components/intercambioAnimations";

import intercambioData from "@/mocks/intercambioData.json";

interface Intercambio {
  id: string;
  titulo: string;
  tipo: "SERVICIOS" | "RAW_MATERIAL";
  estado: "En Temporada" | "Disponible";
  busca: string;
  rango: string;
  productor: string;
  rolProductor: string;
  ubicacion: string;
  categoria: Categoria;
  accion: "Proponer Trato" | "Enviar Consulta";
  imagen?: string;
}

const INTERCAMBIOS = intercambioData.intercambios as Intercambio[];

export default function IntercambioPage() {
  const [filtros, setFiltros] = useState<FiltrosIntercambioState>({
    categorias: [],
    ubicaciones: [],
    tipoServicio: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIntercambio, setSelectedIntercambio] = useState<Intercambio | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const intercambiosFiltrados = useMemo(() => {
    return INTERCAMBIOS.filter((i) => {
      const pasaCategoria =
        filtros.categorias.length === 0 || filtros.categorias.includes(i.categoria);
      const pasaUbicacion =
        filtros.ubicaciones.length === 0 || filtros.ubicaciones.includes(i.ubicacion as Ubicacion);
      const pasaTipo =
        filtros.tipoServicio.length === 0 || filtros.tipoServicio.includes(i.tipo);

      return pasaCategoria && pasaUbicacion && pasaTipo;
    });
  }, [filtros]);

  if (isLoading) {
    return <IntercambioSkeleton />;
  }

  return (
    <motion.div className="w-full" {...pageTransition}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        {/* Hero header */}
        <motion.section variants={staggerItem} className="mb-6 sm:mb-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold tracking-tight text-cv-green-900 sm:text-2xl md:text-3xl lg:text-4xl">
                De productores, para productores
              </h1>
              <p className="mt-2 max-w-3xl text-xs leading-relaxed text-cv-gray-600 sm:text-sm">
                Plataforma de intercambio de servicios y comercialización directa para productores.
                Optimice su cadena de valor conectando con servicios de procesamiento y excedentes
                de materia prima.
              </p>
            </div>
            <Link
              href="/conexiones/registrar"
              className="flex shrink-0 items-center gap-2 self-start rounded-lg bg-cv-green-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-cv-green-800 sm:gap-2.5 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/25 sm:h-6 sm:w-6">
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={2.5} />
              </span>
              Publicar
            </Link>
          </div>
        </motion.section>

        {/* Market Stability Card */}
        <motion.div variants={staggerItem} className="mb-4 sm:mb-6">
          <MarketStabilityCard
            intercambiosMes={intercambioData.marketplace.intercambiosMes}
            demandaProcesamiento={intercambioData.marketplace.demandaProcesamiento}
            indiceRegional={intercambioData.marketplace.indiceRegional}
          />
        </motion.div>

        {/* Horizontal Filters Bar */}
        <motion.div variants={staggerItem} className="mb-6 sm:mb-8 flex flex-col gap-4">
          <div className="md:hidden">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cv-gray-900 sm:text-sm">
              Filtrar Intercambios
            </h3>
            <IntercambioFiltros filtros={filtros} onChange={setFiltros} />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 lg:gap-12 lg:flex-row">
          {/* Sidebar - Desktop only */}
          <motion.div
            variants={staggerItem}
            className="hidden md:block lg:w-48 lg:shrink-0"
          >
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-cv-gray-900">
                Filtrar Intercambios
              </h3>
              <IntercambioFiltros filtros={filtros} onChange={setFiltros} />
            </div>

            <div className="mt-8 border-t border-cv-cream-300 pt-6">
              <h3 className="mb-3 font-semibold text-cv-gray-900">Guía FAN</h3>
              <p className="mb-4 text-xs leading-relaxed text-cv-gray-600">
                Los precios sugeridos por FAN (Fundación Amigos de la Naturaleza) buscan garantizar
                un pago justo que cubra los costos de recolección sostenible.
              </p>
              <a
                href="#"
                className="flex items-center gap-1 text-xs font-semibold text-cv-gold-600 hover:text-cv-gold-700"
              >
                Ver metodología →
              </a>
            </div>
          </motion.div>

          <motion.div
            className="min-w-0 flex-1"
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            {intercambiosFiltrados.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-6">
                  {intercambiosFiltrados.map((intercambio) => (
                    <motion.div key={intercambio.id} variants={staggerItem}>
                      <IntercambioCard
                        {...intercambio}
                        onAccion={() => {
                          if (intercambio.accion === "Proponer Trato") {
                            setSelectedIntercambio(intercambio);
                          }
                        }}
                      />
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <motion.div
                variants={staggerItem}
                className="flex flex-col items-center justify-center rounded-xl border border-dashed border-cv-cream-300 py-16 text-center"
              >
                <Handshake className="mb-3 h-10 w-10 text-cv-green-300" />
                <p className="text-sm font-medium text-cv-gray-600">
                  No hay intercambios con los filtros seleccionados
                </p>
                <button
                  type="button"
                  onClick={() =>
                    setFiltros({ categorias: [], ubicaciones: [], tipoServicio: [] })
                  }
                  className="mt-3 text-xs text-cv-green-600 underline underline-offset-2 hover:text-cv-green-800"
                >
                  Limpiar filtros
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Modal para proponer trato */}
      {selectedIntercambio && (
        <ProponerTratoModal
          titulo={`Proponer Trato - ${selectedIntercambio.titulo}`}
          open={!!selectedIntercambio}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedIntercambio(null);
            }
          }}
          onSubmit={async (data) => {
            console.log("Propuesta enviada para:", selectedIntercambio.titulo, data);
            // Aquí puedes hacer la llamada a la API
            setSelectedIntercambio(null);
          }}
        />
      )}
    </motion.div>
  );
}
