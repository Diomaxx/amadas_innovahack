"use client";

import { BarChart3, Leaf } from "lucide-react";

interface Props {
  precioPromedio: string;
  demandaProcesamiento: string;
  indiceRegional: string;
}

export function MarketStabilityCard({
  precioPromedio,
  demandaProcesamiento,
  indiceRegional,
}: Props) {
  return (
    <div className="mb-8 rounded-2xl border border-[#E8D9C8] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#8B6914]">
          <BarChart3 className="h-5 w-5 text-white" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-cv-green-900">
            Estabilidad del Mercado Chiquitano
          </h3>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-cv-gray-500">
            Actualizado hace 15 minutos
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
        <div>
          <p className="text-xs text-cv-gray-500">Precio Promedio Almendra Chiquitana</p>
          <p className="mt-1 text-xl font-bold text-cv-gold-600">{precioPromedio}</p>
        </div>
        <div>
          <p className="text-xs text-cv-gray-500">Demanda de Procesamiento</p>
          <p className="mt-1 text-xl font-bold text-cv-green-900">{demandaProcesamiento}</p>
        </div>
        <div>
          <p className="text-xs text-cv-gray-500">Índice de Sostenibilidad</p>
          <p className="mt-1 flex items-center gap-1.5 text-xl font-bold text-cv-green-900">
            {indiceRegional}
            <Leaf className="h-5 w-5 text-cv-green-500" strokeWidth={1.75} />
          </p>
        </div>
      </div>
    </div>
  );
}
