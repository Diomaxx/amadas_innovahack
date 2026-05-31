"use client";

import { BookOpen, Zap, Shield, Sparkles } from "lucide-react";

interface ProductInfoCardsProps {
  esencia?: string;
  propiedades?: string[];
  usosGastronomicos?: string[];
}

export function ProductInfoCards({
  esencia,
  propiedades,
  usosGastronomicos,
}: ProductInfoCardsProps) {
  if (!esencia && !propiedades && !usosGastronomicos?.length) return null;

  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Card 1: Esencia del Bosque */}
      {esencia && (
        <div className="flex flex-col rounded-3xl bg-white p-8 shadow-sm border border-[#E8E8E8]">
          <h2 className="mb-4 text-2xl font-bold text-[#14291F]">Esencia del Bosque</h2>
          <p className="text-[15px] leading-relaxed text-[#4A4A4A]">
            {/* Simple markdown-like replacement for italics since we have "*Dipteryx alata*" in mock */}
            {esencia.split('*').map((chunk, i) => 
              i % 2 === 1 ? <em key={i} className="italic text-[#14291F]">{chunk}</em> : chunk
            )}
          </p>
        </div>
      )}

      {/* Card 2: Propiedades */}
      {propiedades && propiedades.length > 0 && (
        <div className="flex flex-col rounded-3xl bg-[#F7CBA9] p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-[#5A3319]">Propiedades</h2>
          <ul className="flex flex-col gap-4 text-[15px] font-medium text-[#5A3319]">
            {propiedades.map((prop, idx) => {
              // Assign specific icons based on text (or fallback)
              let Icon = Sparkles;
              if (prop.toLowerCase().includes("proteína") || prop.toLowerCase().includes("antioxidante")) Icon = Shield;
              if (prop.toLowerCase().includes("energía")) Icon = Zap;
              
              return (
                <li key={idx} className="flex items-center gap-3">
                  <Icon className="h-5 w-5 shrink-0" />
                  <span>{prop}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Card 3: Uso Gastronómico */}
      {usosGastronomicos && usosGastronomicos.length > 0 && (
        <div className="flex flex-col rounded-3xl bg-white p-8 shadow-sm border border-[#E8E8E8]">
          <div className="mb-6 flex items-center gap-3 text-[#14291F]">
            <BookOpen className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Uso Gastronómico</h2>
          </div>
          <ul className="mb-8 flex flex-1 flex-wrap content-start gap-2.5">
            {usosGastronomicos.map((uso, idx) => (
              <li
                key={idx}
                className="rounded-full bg-[#14291F]/5 px-4 py-2 text-[13px] font-medium text-[#14291F]"
              >
                {uso}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="flex items-center justify-between rounded-xl bg-[#14291F] px-5 py-4 text-[13px] font-bold tracking-widest text-white transition-colors hover:bg-[#1B3A2D] uppercase"
          >
            Ver Recetario Fan
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
