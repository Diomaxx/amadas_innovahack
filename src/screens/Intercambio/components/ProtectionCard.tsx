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
    <div className="rounded-[28px] bg-cv-green-800 p-8 text-white sm:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
        {/* Texto y estadísticas */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold leading-tight sm:text-3xl">
              Protección del Pequeño Productor
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#A8B9B0]">
              Nuestro algoritmo de &apos;Rango de Precio Sugerido&apos; analiza las tendencias de
              mercado en tiempo real y los costos operativos en la región para evitar la
              especulación y asegurar la sostenibilidad del bosque.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="min-w-[140px] flex-1 rounded-xl border border-white/15 bg-white/5 px-5 py-4">
              <p className="text-2xl font-bold">{consecutivoExitosos}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-cv-green-300">
                Trueques Exitosos
              </p>
            </div>
            <div className="min-w-[140px] flex-1 rounded-xl border border-white/15 bg-white/5 px-5 py-4">
              <p className="text-2xl font-bold">{ingresoFamiliar}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-cv-green-300">
                Ingreso Familiar
              </p>
            </div>
          </div>
        </div>

        {/* Próximas Cosechas */}
        <div className="rounded-2xl bg-cv-cream-50 p-6 text-cv-gray-900 sm:p-7">
          <h3 className="mb-5 text-lg font-bold text-cv-green-800">Próximas Cosechas</h3>
          <ul className="space-y-0">
            {PROXIMAS_COSECHAS.map(({ icon: Icon, label, fecha }, index) => (
              <li
                key={label}
                className={
                  index < PROXIMAS_COSECHAS.length - 1
                    ? "border-b border-cv-cream-200 py-3.5 first:pt-0"
                    : "py-3.5"
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <Icon className="h-5 w-5 shrink-0 text-cv-gold-600" strokeWidth={1.75} />
                    <span className="truncate text-sm font-medium text-cv-green-900">
                      {label}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-cv-gold-300 px-3 py-1 text-xs font-semibold text-cv-gray-800">
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
