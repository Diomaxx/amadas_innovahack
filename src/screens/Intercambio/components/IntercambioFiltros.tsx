"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type Categoria = "Semillas y Frutos" | "Frutas" | "Mieles" | "Nueces y Semillas" | "Servicios" | "Hierbas e Infusiones";
export type Ubicacion = "San José de Chiquitos" | "Concepción" | "Santa Cruz" | "Beni" | "San Ignacio";

export interface FiltrosIntercambioState {
  categorias: Categoria[];
  ubicaciones: Ubicacion[];
  tipoServicio: string[];
}

interface Props {
  filtros: FiltrosIntercambioState;
  onChange: (filtros: FiltrosIntercambioState) => void;
}

const CATEGORIAS: Categoria[] = [
  "Semillas y Frutos",
  "Frutas",
  "Mieles",
  "Nueces y Semillas",
  "Servicios",
  "Hierbas e Infusiones",
];

const UBICACIONES: Ubicacion[] = [
  "San José de Chiquitos",
  "Concepción",
  "Santa Cruz",
  "Beni",
  "San Ignacio",
];

export function IntercambioFiltros({ filtros, onChange }: Props) {
  const selectedCategoria = filtros.categorias.length > 0 ? filtros.categorias[0] : "Semillas y Frutos";

  const handleCategoriaChange = (categoria: Categoria) => {
    onChange({ ...filtros, categorias: [categoria] });
  };

  const handleUbicacionChange = (ubicacion: Ubicacion) => {
    const newUbicaciones = filtros.ubicaciones.includes(ubicacion)
      ? filtros.ubicaciones.filter((u) => u !== ubicacion)
      : [...filtros.ubicaciones, ubicacion];
    onChange({ ...filtros, ubicaciones: newUbicaciones });
  };

  return (
    <div className="space-y-6">
      {/* Categoría - Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-cv-gray-900 mb-2">
          Categoría
        </label>
        <div className="relative">
          <select
            value={selectedCategoria}
            onChange={(e) => handleCategoriaChange(e.target.value as Categoria)}
            className="w-full px-3 py-2 border border-cv-cream-300 rounded-lg bg-white text-sm text-cv-gray-700 appearance-none cursor-pointer hover:border-cv-cream-400 focus:outline-none focus:ring-2 focus:ring-cv-green-500"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cv-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Ubicación - Checkboxes */}
      <div>
        <label className="block text-sm font-semibold text-cv-gray-900 mb-3">
          Ubicación
        </label>
        <div className="space-y-2.5">
          {UBICACIONES.map((ub) => (
            <label key={ub} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={filtros.ubicaciones.includes(ub)}
                onChange={() => handleUbicacionChange(ub)}
                className="h-4 w-4 rounded border-cv-green-900 accent-cv-green-900 cursor-pointer"
              />
              <span className="text-sm text-cv-gray-700 group-hover:text-cv-gray-900">{ub}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
