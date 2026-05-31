"use client";

import { BarChart3, Leaf } from "lucide-react";

interface Props {
  intercambiosMes: string;
  demandaProcesamiento: string;
  indiceRegional: string;
}

export function MarketStabilityCard({
  intercambiosMes,
  demandaProcesamiento,
  indiceRegional,
}: Props) {
  return (
    <div className="rounded-lg border border-[#E8D9C8] bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#8B6914] sm:h-11 sm:w-11">
          <BarChart3 className="h-4 w-4 text-white sm:h-5 sm:w-5" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-cv-green-900 sm:text-lg">
            Estabilidad del Mercado Nacional
          </h3>
          <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-cv-gray-500 sm:text-[10px]">
            Actualizado hace 15 minutos
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:grid-cols-3 sm:gap-8">
        <div>
          <p className="text-[10px] text-cv-gray-500 sm:text-xs">Intercambios este Mes</p>
          <p className="mt-1 text-base font-bold text-cv-green-900 sm:text-xl">{intercambiosMes}</p>
        </div>
        <div>
          <p className="text-[10px] text-cv-gray-500 sm:text-xs">Demanda de Procesamiento</p>
          <p className="mt-1 text-base font-bold text-cv-green-900 sm:text-xl">{demandaProcesamiento}</p>
        </div>
        <div>
          <p className="text-[10px] text-cv-gray-500 sm:text-xs">Índice de Sostenibilidad</p>
          <p className="mt-1 flex items-center gap-1 text-base font-bold text-cv-green-900 sm:gap-1.5 sm:text-xl">
            {indiceRegional}
            <Leaf className="h-4 w-4 text-cv-green-500 sm:h-5 sm:w-5" strokeWidth={1.75} />
          </p>
        </div>
      </div>
    </div>
  );
}
