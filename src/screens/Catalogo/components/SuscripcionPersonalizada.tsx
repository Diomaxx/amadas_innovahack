"use client";

import { HandPlatter } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SuscripcionPersonalizadaProps {
  nombreProducto: string;
  categoria: string;
}

export function SuscripcionPersonalizada({
  nombreProducto,
  categoria,
}: SuscripcionPersonalizadaProps) {
  const [interes, setInteres] = useState<string>("producto");
  const [canal, setCanal] = useState<"whatsapp" | "email">("whatsapp");

  return (
    <section className="mt-8 overflow-hidden rounded-3xl bg-[#1B3A2D] text-white shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
        {/* Left Side: Text */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-cv-green-200 uppercase">
            <HandPlatter className="h-4 w-4" />
            <span>Servicio Concierge</span>
          </div>
          
          <h2 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl text-white">
            Suscripción<br />Personalizada
          </h2>
          
          <p className="max-w-md text-sm text-cv-green-100/80 leading-relaxed">
            Configura tus alertas para recibir solo lo que te interesa de los frutos de la Chiquitanía.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
          {/* Interés */}
          <div className="mb-6">
            <label className="mb-3 block text-xs font-semibold tracking-widest text-cv-green-200/70 uppercase">
              Interés
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setInteres("producto")}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  interes === "producto"
                    ? "bg-[#C4E5D4] text-[#14291F]"
                    : "border border-white/20 text-white hover:bg-white/10"
                )}
              >
                Esta {nombreProducto.split(" ")[0]}
              </button>
              <button
                type="button"
                onClick={() => setInteres("categoria")}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  interes === "categoria"
                    ? "bg-[#C4E5D4] text-[#14291F]"
                    : "border border-white/20 text-white hover:bg-white/10"
                )}
              >
                {categoria}
              </button>
            </div>
          </div>

          {/* Canal de Alerta */}
          <div className="mb-6">
            <label className="mb-3 block text-xs font-semibold tracking-widest text-cv-green-200/70 uppercase">
              Canal de alerta
            </label>
            <div className="flex items-center gap-6">
              <label className="flex cursor-pointer items-center gap-2">
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                    canal === "whatsapp" ? "border-white bg-white" : "border-white/40"
                  )}
                  onClick={() => setCanal("whatsapp")}
                >
                  {canal === "whatsapp" && (
                    <div className="h-2 w-2 rounded-full bg-[#1B3A2D]" />
                  )}
                </div>
                <span className="text-sm font-medium text-white/90" onClick={() => setCanal("whatsapp")}>WhatsApp</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <div
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                    canal === "email" ? "border-white bg-white" : "border-white/40"
                  )}
                  onClick={() => setCanal("email")}
                >
                  {canal === "email" && (
                    <div className="h-2 w-2 rounded-full bg-[#1B3A2D]" />
                  )}
                </div>
                <span className="text-sm font-medium text-white/90" onClick={() => setCanal("email")}>Email</span>
              </label>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <input
              type={canal === "whatsapp" ? "tel" : "email"}
              placeholder="Tu número o correo"
              className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#C4E5D4] focus:outline-none focus:ring-1 focus:ring-[#C4E5D4]"
            />
          </div>

          {/* Action Button */}
          <button
            type="button"
            className="w-full rounded-lg bg-[#C4E5D4] px-4 py-3.5 text-sm font-bold tracking-wide text-[#14291F] transition-colors hover:bg-[#A8D1BC]"
          >
            ACTIVAR ALERTAS
          </button>
        </div>
      </div>
    </section>
  );
}
