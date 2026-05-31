"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Minus, Plus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import { Textarea } from "@/components/UI/textarea";
import { AnimatedSelect } from "@/components/UI/AnimatedSelect";

import type { ProductoFormValues, ProductoTemporada } from "../temporada.types";
import {
  CATEGORIAS,
  ESTADOS,
  MESES,
  formValuesVacios,
  productoToForm,
} from "../temporada.data";

const cicloSchema = z.object({
  inicio: z.number().min(0).max(11),
  fin: z.number().min(0).max(11),
});

const schema = z.object({
  nombre: z.string().min(2, "Ingresa el nombre del producto"),
  nombreCientifico: z.string().min(2, "Ingresa el nombre científico"),
  categoria: z.string().min(1, "Selecciona una categoría"),
  estado: z.enum(["En temporada", "Próximamente", "Finalizando", "Fuera de temporada"]),
  ciclos: z.array(cicloSchema).min(1, "Agrega al menos un ciclo"),
  descripcion: z.string().min(3, "Agrega una descripción"),
  propiedadesTexto: z.string().min(1, "Indica al menos una propiedad (separadas por coma)"),
  usosGastronomicosTexto: z.string().min(1, "Indica al menos un uso gastronómico (separados por coma)"),
  imageSrc: z.string().optional(),
});

const categoriaOptions = CATEGORIAS.map((c) => ({ value: c, label: c }));
const estadoOptions = ESTADOS.map((e) => ({ value: e, label: e }));
const mesOptions = MESES.map((m, i) => ({ value: String(i), label: m }));

const inputClass =
  "rounded-lg border border-cv-cream-300 bg-white placeholder:text-cv-gray-400 focus-visible:border-cv-green-500 focus-visible:ring-cv-green-500/20";
const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-cv-gray-600";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Producto a editar, o `null` para crear uno nuevo. */
  producto: ProductoTemporada | null;
  onSubmit: (values: ProductoFormValues) => void;
};

export function ProductoModal({ open, onOpenChange, producto, onSubmit }: Props) {
  const esEdicion = producto !== null;

  const form = useForm<ProductoFormValues>({
    resolver: zodResolver(schema) as never,
    defaultValues: formValuesVacios(),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ciclos",
  });

  useEffect(() => {
    if (!open) return;
    form.reset(producto ? productoToForm(producto) : formValuesVacios());
  }, [open, producto, form]);

  function handleSubmit(values: ProductoFormValues) {
    onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollbar-thin max-h-[90vh] w-[calc(100%-2rem)] mx-auto overflow-y-auto rounded-2xl border-cv-cream-300 bg-white px-4 py-5 sm:max-w-2xl sm:px-6 sm:py-6 lg:max-w-3xl">
        <DialogHeader className="border-b border-cv-cream-200 pb-3 sm:pb-4">
          <DialogTitle className="text-lg font-bold text-cv-green-900 sm:text-2xl">
            {esEdicion ? "Editar Producto" : "Nuevo Producto"}
          </DialogTitle>
          <p className="mt-1 text-xs leading-relaxed text-cv-gray-600 sm:text-sm">
            {esEdicion
              ? "Modifica la información del producto y guarda los cambios."
              : "Completa la información del nuevo producto."}
          </p>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5 pt-4">
            {/* Nombre + científico */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Nombre del producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Almendra Chiquitana" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nombreCientifico"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Nombre científico</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Dipteryx alata" className={inputClass} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Categoría + estado */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Categoría</FormLabel>
                    <FormControl>
                      <AnimatedSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        options={categoriaOptions}
                        placeholder="Selecciona"
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estado"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Estado actual</FormLabel>
                    <FormControl>
                      <AnimatedSelect
                        value={field.value}
                        onValueChange={field.onChange}
                        options={estadoOptions}
                        placeholder="Selecciona"
                        className="rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Ciclos de temporada */}
            <div className="rounded-xl border border-cv-cream-300 bg-cv-cream-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-cv-gray-900">
                  Ciclos de Temporada
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fields.length > 1 && remove(fields.length - 1)}
                    disabled={fields.length <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-cv-cream-300 bg-white text-cv-gray-700 transition hover:bg-cv-cream-100 disabled:opacity-40"
                    aria-label="Quitar ciclo"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="flex h-8 w-10 items-center justify-center rounded-lg border border-cv-green-700 text-sm font-semibold text-cv-green-800">
                    {fields.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => append({ inicio: 0, fin: 0 })}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-cv-green-300 bg-white text-cv-green-700 transition hover:bg-cv-green-50"
                    aria-label="Agregar ciclo"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {fields.map((fieldItem, index) => (
                  <div key={fieldItem.id} className="rounded-lg border border-cv-cream-300 bg-white p-3">
                    <p className="mb-2 text-xs font-semibold text-cv-gray-500">
                      Temporada {fields.length > 1 ? index + 1 : ""}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        control={form.control}
                        name={`ciclos.${index}.inicio` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>Mes de inicio</FormLabel>
                            <FormControl>
                              <AnimatedSelect
                                value={String(field.value)}
                                onValueChange={(v) => field.onChange(Number(v))}
                                options={mesOptions}
                                placeholder="Mes"
                                className="rounded-lg"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`ciclos.${index}.fin` as const}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className={labelClass}>Mes de fin</FormLabel>
                            <FormControl>
                              <AnimatedSelect
                                value={String(field.value)}
                                onValueChange={(v) => field.onChange(Number(v))}
                                options={mesOptions}
                                placeholder="Mes"
                                className="rounded-lg"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe las características del producto…"
                      className={`min-h-24 resize-none ${inputClass}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Propiedades (tags separados por coma) */}
            <FormField
              control={form.control}
              name="propiedadesTexto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>
                    Propiedades (separadas por coma)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Alta en Proteína, Energía Sostenible, 100% Silvestre"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Usos gastronómicos (tags separados por coma) */}
            <FormField
              control={form.control}
              name="usosGastronomicosTexto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>
                    Usos gastronómicos (separados por coma)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Repostería fina, Aceite prensado en frío, Snacks tostados"
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Footer */}
            <div className="flex gap-3 border-t border-cv-cream-200 pt-5">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="h-11 flex-1 rounded-lg border border-cv-cream-300 px-4 text-sm font-semibold text-cv-gray-700 transition-colors hover:bg-cv-cream-100"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="h-11 flex-1 rounded-lg bg-cv-green-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-cv-green-800"
              >
                {esEdicion ? "Guardar cambios" : "Crear Producto"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
