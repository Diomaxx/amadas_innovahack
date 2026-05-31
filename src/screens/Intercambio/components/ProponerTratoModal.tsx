"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/UI/dialog";
import { Button } from "@/components/UI/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { AnimatedSelect, type AnimatedSelectOption } from "@/components/UI/AnimatedSelect";
import { cn } from "@/lib/utils";

// Esquema de validación
const tratoFormSchema = z.object({
  restaurante: z.string().min(2, "Nombre del restaurante requerido"),
  contacto: z.string().min(2, "Nombre del contacto requerido"),
  canalContacto: z.enum(["whatsapp", "llamada", "correo"]),
  cantidad: z.preprocess((val) => typeof val === "string" ? parseFloat(val) : val, z.number().min(1, "La cantidad debe ser mayor a 0")),
  unidad: z.enum(["kg", "litros", "lotes"]),
  ofertaEconomica: z.preprocess((val) => typeof val === "string" ? parseFloat(val) : val, z.number().min(1, "La oferta debe ser mayor a 0")),
  frecuencia: z.enum(["unica", "semanal", "mensual"]),
  modalidadEntrega: z.enum(["retiro", "envio"]),
  especificaciones: z.string().max(500, "Máximo 500 caracteres").optional(),
});

type TratoFormValues = {
  restaurante: string;
  contacto: string;
  canalContacto: "whatsapp" | "llamada" | "correo";
  cantidad: number;
  unidad: "kg" | "litros" | "lotes";
  ofertaEconomica: number;
  frecuencia: "unica" | "semanal" | "mensual";
  modalidadEntrega: "retiro" | "envio";
  especificaciones?: string;
};

interface ProponerTratoModalProps {
  trigger?: React.ReactNode;
  titulo?: string;
  onSubmit?: (data: TratoFormValues) => Promise<void> | void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ProponerTratoModal({
  trigger,
  titulo = "Proponer Trato",
  onSubmit,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: ProponerTratoModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = controlledOnOpenChange || setInternalOpen;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TratoFormValues>({
    resolver: zodResolver(tratoFormSchema) as any,
    defaultValues: {
      restaurante: "",
      contacto: "",
      canalContacto: "whatsapp",
      cantidad: undefined,
      unidad: "kg",
      ofertaEconomica: undefined,
      frecuencia: "unica",
      modalidadEntrega: "retiro",
      especificaciones: "",
    },
  });

  async function handleSubmit(values: TratoFormValues) {
    try {
      setIsSubmitting(true);
      if (onSubmit) {
        await onSubmit(values);
      } else {
        console.log("Propuesta enviada:", values);
      }
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error al enviar la propuesta:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const channelOptions = [
    { value: "whatsapp", label: "WhatsApp" },
    { value: "llamada", label: "Llamada" },
    { value: "correo", label: "Correo" },
  ];

  const unidadOptions: AnimatedSelectOption[] = [
    { value: "kg", label: "Kg" },
    { value: "litros", label: "Litros" },
    { value: "lotes", label: "Lotes" },
  ];

  const frecuenciaOptions: AnimatedSelectOption[] = [
    { value: "unica", label: "Compra única (Lote actual)" },
    { value: "semanal", label: "Pedido Semanal" },
    { value: "mensual", label: "Pedido Mensual" },
  ];

  const modalidadOptions: AnimatedSelectOption[] = [
    { value: "retiro", label: "Retiro en Origen (Comunidad)" },
    { value: "envio", label: "Envío a Coordinar (Santa Cruz)" },
  ];

  return (
    <>
      <style>{`
        .proponer-trato-modal[data-state="open"] {
          animation: fadeIn 300ms ease-in-out forwards !important;
        }
        .proponer-trato-modal[data-state="closed"] {
          animation: fadeOut 300ms ease-in-out forwards !important;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `}</style>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger !== null && controlledOpen === undefined && (
        <DialogTrigger asChild>
          {typeof trigger === "string" ? (
            <Button
              type="button"
              variant="outline"
              className="border-cv-green-900 text-cv-green-900 hover:bg-cv-green-50"
            >
              {trigger}
            </Button>
          ) : (
            trigger || (
              <Button variant="outline" className="border-cv-green-900 text-cv-green-900 hover:bg-cv-green-50">
                Proponer Trato
              </Button>
            )
          )}
        </DialogTrigger>
      )}

      <DialogContent className="proponer-trato-modal max-h-[90vh] w-[calc(100%-2rem)] mx-auto overflow-y-auto border-cv-cream-300 bg-white rounded-2xl sm:max-w-lg px-4 py-5 sm:px-6 sm:py-6">
        <DialogHeader className="border-b border-cv-cream-200 pb-3 sm:pb-4">
          <DialogTitle className="text-lg sm:text-2xl font-bold text-cv-green-900">
            {titulo}
          </DialogTitle>
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-cv-gray-600">
            Completa los detalles de tu propuesta. Te ayudaremos a conectar con el productor
            de forma directa y segura.
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-3 sm:space-y-5 sm:pt-4">
            {/* Contenedor de una columna */}
            <div className="space-y-4 sm:space-y-5">
              {/* Sección: Tu Información */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm font-semibold text-cv-gray-900">
                  Tu Información
                </h3>

                  <FormField
                    control={form.control}
                    name="restaurante"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                          Restaurante / Empresa
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Sabores del Valle"
                            {...field}
                            className="rounded-lg border border-cv-cream-300 bg-white placeholder:text-cv-gray-400 focus-visible:border-cv-green-500 focus-visible:ring-cv-green-500/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                          Contacto (Chef o Encargado)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej. Juan Pérez"
                            {...field}
                            className="rounded-lg border border-cv-cream-300 bg-white placeholder:text-cv-gray-400 focus-visible:border-cv-green-500 focus-visible:ring-cv-green-500/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="canalContacto"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                          Canal preferido
                        </FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-3 gap-2">
                            {channelOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => field.onChange(option.value)}
                                className={cn(
                                  "rounded-lg border px-3 py-2 text-center text-xs font-medium transition-all",
                                  field.value === option.value
                                    ? "border-cv-green-600 bg-cv-green-100 text-cv-green-900"
                                    : "border-cv-cream-300 bg-white text-cv-gray-700 hover:border-cv-cream-400"
                                )}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>

              {/* Divisor */}
              <div className="h-px bg-cv-cream-200" />

              {/* Sección: Detalles del Trato */}
              <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-sm font-semibold text-cv-gray-900">
                    Detalles del Trato
                  </h3>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <FormField
                      control={form.control}
                      name="cantidad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                            Cantidad
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="250"
                              step="0.1"
                              {...field}
                              className="rounded-lg border border-cv-cream-300 bg-white placeholder:text-cv-gray-400 focus-visible:border-cv-green-500 focus-visible:ring-cv-green-500/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="unidad"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                            Unidad
                          </FormLabel>
                          <FormControl>
                            <AnimatedSelect
                              value={field.value}
                              onValueChange={field.onChange}
                              options={unidadOptions}
                              placeholder="Selecciona"
                              className="rounded-lg"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="ofertaEconomica"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                          Tu Oferta Económica (Bs.)
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-cv-gray-600">
                              Bs.
                            </span>
                            <Input
                              type="number"
                              placeholder="350"
                              step="0.01"
                              {...field}
                              className="rounded-lg border border-cv-cream-300 bg-white pl-10 placeholder:text-cv-gray-400 focus-visible:border-cv-green-500 focus-visible:ring-cv-green-500/20"
                            />
                          </div>
                        </FormControl>
                        <p className="pt-1 text-xs text-cv-gold-600">
                          Rango FAN: Bs. 350 - 420
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="frecuencia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                          Frecuencia
                        </FormLabel>
                        <FormControl>
                          <AnimatedSelect
                            value={field.value}
                            onValueChange={field.onChange}
                            options={frecuenciaOptions}
                            placeholder="Selecciona una opción"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              {/* Sección: Logística */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm font-semibold text-cv-gray-900">
                  Logística y Entrega
                </h3>

                  <FormField
                    control={form.control}
                    name="modalidadEntrega"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                          Modalidad de Entrega
                        </FormLabel>
                        <FormControl>
                          <AnimatedSelect
                            value={field.value}
                            onValueChange={field.onChange}
                            options={modalidadOptions}
                            placeholder="Selecciona una opción"
                            className="rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="especificaciones"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
                          Especificaciones
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Ej: Empaque al vacío, certificados de inocuidad, etc."
                            className="min-h-20 resize-none rounded-lg border border-cv-cream-300 bg-white placeholder:text-cv-gray-400 focus-visible:border-cv-green-500 focus-visible:ring-cv-green-500/20"
                            {...field}
                          />
                        </FormControl>
                        <div className="flex justify-between pt-1">
                          <FormMessage />
                          <span className="text-xs text-cv-gray-400">
                            {field.value?.length || 0}/500
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
              </div>

              {/* Info Card */}
              <div className="rounded-lg border border-cv-cream-300 bg-cv-cream-50 p-3 sm:rounded-xl sm:p-4">
                <h4 className="text-xs font-semibold text-cv-green-900 mb-1 sm:mb-2">
                  Protección FAN
                </h4>
                <p className="text-xs leading-relaxed text-cv-gray-600">
                  FAN verifica que tus propuestas cumplan con estándares de sostenibilidad. Tu información se compartirá de forma segura.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-cv-cream-200 pt-4 sm:pt-5 space-y-2 sm:space-y-3">
              <div className="flex gap-2 sm:gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 h-10 sm:h-11 border border-cv-cream-300 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-cv-gray-700 transition-all hover:bg-cv-cream-50 hover:border-cv-cream-400"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 h-10 sm:h-11 bg-cv-green-900 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all hover:bg-cv-green-800 disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Propuesta"}
                </Button>
              </div>
              <p className="text-center text-[10px] sm:text-xs text-cv-gray-500">
                Esto abrirá un canal de comunicación seguro con la asociación
              </p>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
    </>
  );
}
