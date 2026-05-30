"use client";

import { Store, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DisponibilidadItem {
  productor: string;
  estado: string;
  accion: string;
  icon: string;
}

interface DisponibilidadProductorProps {
  disponibilidad: DisponibilidadItem[];
}

export function DisponibilidadProductor({ disponibilidad }: DisponibilidadProductorProps) {
  if (!disponibilidad || disponibilidad.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 rounded-2xl bg-cv-cream-100 p-6 sm:p-8">
      <h2 className="mb-6 text-xl font-bold text-cv-green-900">
        Disponibilidad por Productor
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {disponibilidad.map((item, index) => {
          const isReservar = item.accion.toLowerCase() === "reservar";
          return (
            <div
              key={index}
              className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm border border-cv-cream-200"
            >
              <div>
                <div className="flex items-center gap-2 font-semibold text-cv-green-900">
                  {item.icon === "store" ? (
                    <Store className="h-4 w-4" />
                  ) : (
                    <Hourglass className="h-4 w-4" />
                  )}
                  <h3 className="text-sm">{item.productor}</h3>
                </div>
                <p className="mt-1 text-[10px] font-medium tracking-wider text-cv-gray-500 uppercase">
                  {item.estado}
                </p>
              </div>

              <button
                type="button"
                className={cn(
                  "mt-4 w-full rounded-md py-2 text-sm font-medium text-white transition-colors duration-200",
                  isReservar
                    ? "bg-[#717A73] hover:bg-[#5C645E]"
                    : "bg-[#8D5A3A] hover:bg-[#72482E]"
                )}
              >
                {item.accion}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
