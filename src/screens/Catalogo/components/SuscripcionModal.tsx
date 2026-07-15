"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  createSuscripcion,
  resolveCategoriaId,
} from "@/lib/api/suscripciones";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/UI/dialog";

interface SuscripcionModalProps {
  productoId: number;
  nombreProducto: string;
  categoria: string;
}

/**
 * Botón "Suscribirse" que abre un modal accesible (Radix Dialog: focus trap,
 * Esc para cerrar, scroll lock, aria-modal) con el formulario de alertas.
 * Al activar, persiste la suscripción (producto o categoría) en el backend.
 */
export function SuscripcionModal({
  productoId,
  nombreProducto,
  categoria,
}: SuscripcionModalProps) {
  const [interes, setInteres] = useState<"producto" | "categoria">("producto");
  const [canal, setCanal] = useState<"whatsapp" | "email">("whatsapp");
  const [estado, setEstado] = useState<"idle" | "enviando" | "listo" | "error">(
    "idle",
  );
  const { user } = useAuth();
  const router = useRouter();

  const activar = async () => {
    if (!user) {
      router.push("/auth");
      return;
    }
    setEstado("enviando");
    try {
      if (interes === "producto") {
        await createSuscripcion({ productoId });
      } else {
        const categoriaId = await resolveCategoriaId(categoria);
        if (!categoriaId) throw new Error("Categoría no encontrada");
        await createSuscripcion({ categoriaId });
      }
      setEstado("listo");
    } catch {
      setEstado("error");
    }
  };

  return (
    <Dialog>
      <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-cv-cream-300 bg-cv-cream-100/60 px-6 py-8 text-center">
        <h2 className="text-lg font-bold text-cv-green-900">
          ¿Quieres saber cuando esté disponible?
        </h2>
        <p className="max-w-md text-sm text-cv-gray-600">
          Activa alertas y recibe avisos de temporada de {nombreProducto} y
          otros frutos silvestres de Bolivia.
        </p>
        <DialogTrigger asChild>
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-cv-green-800 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cv-green-700 hover:shadow-md active:translate-y-0"
          >
            <Bell className="h-4 w-4" />
            Suscribirse
          </button>
        </DialogTrigger>
      </div>

      <DialogContent className="border-cv-cream-300 bg-white sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-cv-green-900">
            Suscripción personalizada
          </DialogTitle>
          <DialogDescription className="text-cv-gray-600">
            Configura tus alertas para recibir solo lo que te interesa.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-6">
          {/* Interés */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-cv-gray-500">
              Interés
            </label>
            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setInteres("producto")}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  interes === "producto"
                    ? "bg-cv-green-700 text-white"
                    : "border border-cv-cream-300 text-cv-gray-700 hover:border-cv-green-300",
                )}
              >
                {nombreProducto}
              </button>
              <button
                type="button"
                onClick={() => setInteres("categoria")}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  interes === "categoria"
                    ? "bg-cv-green-700 text-white"
                    : "border border-cv-cream-300 text-cv-gray-700 hover:border-cv-green-300",
                )}
              >
                {categoria}
              </button>
            </div>
          </div>

          {/* Canal */}
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-cv-gray-500">
              Canal de alerta
            </label>
            <div className="flex items-center gap-6">
              {(["whatsapp", "email"] as const).map((c) => (
                <label
                  key={c}
                  className="flex cursor-pointer items-center gap-2"
                  onClick={() => setCanal(c)}
                >
                  <span
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded-full border transition-colors",
                      canal === c
                        ? "border-cv-green-700 bg-cv-green-700"
                        : "border-cv-gray-300",
                    )}
                  >
                    {canal === c && (
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span className="text-sm font-medium capitalize text-cv-gray-700">
                    {c === "whatsapp" ? "WhatsApp" : "Email"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Input */}
          <input
            type={canal === "whatsapp" ? "tel" : "email"}
            placeholder={canal === "whatsapp" ? "Tu número" : "Tu correo"}
            className="w-full rounded-lg border border-cv-cream-300 bg-white px-4 py-3 text-sm text-cv-gray-900 placeholder:text-cv-gray-400 focus:border-cv-green-500 focus:outline-none focus:ring-2 focus:ring-cv-green-100"
          />

          {/* Acción */}
          <button
            type="button"
            onClick={activar}
            disabled={estado === "enviando" || estado === "listo"}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-cv-green-800 px-4 py-3.5 text-sm font-bold tracking-wide text-white transition-colors hover:bg-cv-green-700 disabled:opacity-70"
          >
            {estado === "enviando" && <Loader2 className="h-4 w-4 animate-spin" />}
            {estado === "listo" && <Check className="h-4 w-4" />}
            {estado === "listo" ? "ALERTAS ACTIVADAS" : "ACTIVAR ALERTAS"}
          </button>
          {estado === "error" && (
            <p className="text-center text-xs text-[#C0392B]">
              No se pudo activar la alerta. Intenta de nuevo.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
