"use client";

import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
  type Control,
  type FieldArrayPath,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";

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
import { CloudinaryImageField } from "@/components/UI/CloudinaryImageField";

import type { Receta } from "@/screens/Recetas/recetas.types";
import { CATEGORIA_LABEL } from "@/screens/Recetas/recetas.data";
import { CATEGORIAS, formValuesVacios, recetaToFormValues } from "../recetas.admin.data";
import type { RecetaFormValues } from "../recetas.admin.types";

const seccionSchema = z.object({
  seccion: z.string(),
  contenido: z.string().min(1, "Agrega al menos una línea"),
});

const recetaSchema = z.object({
  nombre: z.string().min(3, "Ingresa un nombre (mín. 3 caracteres)"),
  categoria: z.enum(["salada", "dulce", "coctel", "base"]),
  autores: z.string().min(2, "Indica el autor o grupo"),
  contexto: z.string().min(3, "Agrega una breve descripción"),
  imagen: z.string().optional(),
  ingredientes: z.array(seccionSchema).min(1, "Agrega al menos una sección"),
  preparacion: z.array(seccionSchema).min(1, "Agrega al menos una sección"),
});

const categoriaOptions = CATEGORIAS.map((c) => ({
  value: c,
  label: CATEGORIA_LABEL[c],
}));

const inputClass =
  "rounded-lg border border-cv-cream-300 bg-white placeholder:text-cv-gray-400 focus-visible:border-cv-green-500 focus-visible:ring-cv-green-500/20";
const labelClass =
  "text-xs font-semibold uppercase tracking-wide text-cv-gray-600";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Receta a editar, o `null` para crear una nueva. */
  receta: Receta | null;
  onSubmit: (values: RecetaFormValues) => void;
};

export function RecetaFormModal({ open, onOpenChange, receta, onSubmit }: Props) {
  const esEdicion = receta !== null;

  const form = useForm<RecetaFormValues>({
    resolver: zodResolver(recetaSchema) as never,
    defaultValues: formValuesVacios(),
  });

  // Rellena (editar) o limpia (crear) el formulario cada vez que se abre.
  useEffect(() => {
    if (!open) return;
    form.reset(receta ? recetaToFormValues(receta) : formValuesVacios());
  }, [open, receta, form]);

  function handleSubmit(values: RecetaFormValues) {
    onSubmit(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="scrollbar-thin max-h-[90vh] w-[calc(100%-2rem)] mx-auto overflow-y-auto rounded-2xl border-cv-cream-300 bg-white px-4 py-5 sm:max-w-3xl sm:px-6 sm:py-6 lg:max-w-5xl">
        <DialogHeader className="border-b border-cv-cream-200 pb-3 sm:pb-4">
          <DialogTitle className="text-lg font-bold text-cv-green-900 sm:text-2xl">
            {esEdicion ? "Editar Receta" : "Nueva Receta"}
          </DialogTitle>
          <p className="mt-1 text-xs leading-relaxed text-cv-gray-600 sm:text-sm">
            {esEdicion
              ? "Modifica los datos de la receta y guarda los cambios."
              : "Completa los datos para agregar una receta al recetario."}
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5 pt-4"
          >
            {/* Datos generales */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>Nombre de la receta</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej. Albóndigas de yuca con salsa de asaí"
                        className={inputClass}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                  name="autores"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelClass}>Autor(es) / Grupo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Chef María Rodríguez"
                          className={inputClass}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="contexto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={labelClass}>
                      Contexto / Descripción
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Breve descripción o contexto de la receta…"
                        className={`min-h-20 resize-none ${inputClass}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imagen"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CloudinaryImageField
                        label="Imagen de la receta"
                        folder="alma/recetas"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="h-px bg-cv-cream-200" />

            {/* Ingredientes + Preparación (dos columnas en pantallas anchas) */}
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              <SeccionesField
                control={form.control}
                name="ingredientes"
                titulo="Ingredientes"
                ayuda="Una línea por ingrediente. Usa varias secciones si la receta lo requiere."
                placeholderSeccion="Sección (opcional). Ej. Para las albóndigas"
                placeholderContenido={"½ kg de carne molida\n1 huevo\n2 dientes de ajo"}
                textoAgregar="Agregar sección de ingredientes"
              />

              <SeccionesField
                control={form.control}
                name="preparacion"
                titulo="Preparación"
                ayuda="Una línea por paso. Se numerarán automáticamente."
                placeholderSeccion="Sección (opcional). Ej. Para la salsa"
                placeholderContenido={"Mezclar los ingredientes…\nFormar las bolitas y freír…"}
                textoAgregar="Agregar sección de preparación"
              />
            </div>

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
                {esEdicion ? "Guardar cambios" : "Crear receta"}
              </button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

/* ── Editor reutilizable de secciones (ingredientes / preparación) ── */

type SeccionesFieldProps = {
  control: Control<RecetaFormValues>;
  name: Extract<FieldArrayPath<RecetaFormValues>, "ingredientes" | "preparacion">;
  titulo: string;
  ayuda: string;
  placeholderSeccion: string;
  placeholderContenido: string;
  textoAgregar: string;
};

function SeccionesField({
  control,
  name,
  titulo,
  ayuda,
  placeholderSeccion,
  placeholderContenido,
  textoAgregar,
}: SeccionesFieldProps) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-cv-gray-900">{titulo}</h3>
        <p className="mt-0.5 text-xs text-cv-gray-500">{ayuda}</p>
      </div>

      <div className="space-y-4">
        {fields.map((fieldItem, index) => (
          <div
            key={fieldItem.id}
            className="rounded-xl border border-cv-cream-300 bg-cv-cream-50 p-3 sm:p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-cv-gray-500">
                Sección {index + 1}
              </span>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#A6452F] transition-colors hover:bg-[#FBEEEB]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Quitar
                </button>
              )}
            </div>

            <FormField
              control={control}
              name={`${name}.${index}.seccion` as const}
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormControl>
                    <Input
                      placeholder={placeholderSeccion}
                      className={inputClass}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`${name}.${index}.contenido` as const}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder={placeholderContenido}
                      className={`min-h-24 resize-y ${inputClass}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => append({ seccion: "", contenido: "" })}
        className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-cv-green-300 px-3 py-2 text-xs font-semibold text-cv-green-700 transition-colors hover:bg-cv-green-50"
      >
        <Plus className="h-3.5 w-3.5" />
        {textoAgregar}
      </button>
    </div>
  );
}
