"use client";

import { Flower2, Leaf, Trees } from "lucide-react";

interface Props {
  consecutivoExitosos?: string;
  ingresoFamiliar?: string;
}

const PROXIMAS_COSECHAS = [
  { icon: Leaf, label: "Miel de Abejas Nativas", fecha: "12 Mayo" },
  { icon: Trees, label: "Resina de Copaibo", fecha: "02 Junio" },
  { icon: Flower2, label: "Pulpa de Asaí", fecha: "15 Julio" },
] as const;

export function ProtectionCard({
  consecutivoExitosos = "1.2k",
  ingresoFamiliar = "+15%",
}: Props) {
  return (
    <div className="rounded-2xl bg-cv-green-800 p-5 text-white sm:rounded-[28px] sm:p-8 md:p-10">
      <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-2 md:gap-10">
        {/* Texto y estadísticas */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <h2 className="text-lg font-bold leading-tight sm:text-2xl md:text-3xl">
              Protección del Pequeño Productor
            </h2>
            <p className="mt-2 max-w-xl text-xs leading-relaxed text-[#A8B9B0] sm:mt-4 sm:text-sm">
              Nuestro algoritmo de &apos;Rango de Precio Sugerido&apos; analiza las tendencias de
              mercado en tiempo real y los costos operativos en la región para evitar la
              especulación y asegurar la sostenibilidad del bosque.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <div className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 sm:min-w-[140px] sm:rounded-xl sm:px-5 sm:py-4">
              <p className="text-lg font-bold sm:text-2xl">{consecutivoExitosos}</p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-cv-green-300 sm:text-[10px]">
                Trueques Exitosos
              </p>
            </div>
            <div className="flex-1 rounded-lg border border-white/15 bg-white/5 px-4 py-3 sm:min-w-[140px] sm:rounded-xl sm:px-5 sm:py-4">
              <p className="text-lg font-bold sm:text-2xl">{ingresoFamiliar}</p>
              <p className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-cv-green-300 sm:text-[10px]">
                Ingreso Familiar
              </p>
            </div>
          </div>
        </div>

        {/* Próximas Cosechas */}
        <div className="rounded-lg bg-cv-cream-50 p-4 text-cv-gray-900 sm:rounded-2xl sm:p-6 md:p-7">
          <h3 className="mb-3 text-sm font-bold text-cv-green-800 sm:mb-5 sm:text-lg">Próximas Cosechas</h3>
          <ul className="space-y-0">
            {PROXIMAS_COSECHAS.map(({ icon: Icon, label, fecha }, index) => (
              <li
                key={label}
                className={
                  index < PROXIMAS_COSECHAS.length - 1
                    ? "border-b border-cv-cream-200 py-2.5 first:pt-0 sm:py-3.5"
                    : "py-2.5 sm:py-3.5"
                }
              >
                <div className="flex items-center justify-between gap-2 sm:gap-3">
                  <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-cv-gold-600 sm:h-5 sm:w-5" strokeWidth={1.75} />
                    <span className="truncate text-xs font-medium text-cv-green-900 sm:text-sm">
                      {label}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-cv-gold-300 px-2 py-0.5 text-[10px] font-semibold text-cv-gray-800 sm:px-3 sm:py-1 sm:text-xs">
                    {fecha}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
