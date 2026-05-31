"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  ChefHat,
  Leaf,
  Link2,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { AnimatedSelect } from "@/components/UI/AnimatedSelect";
import { ImageSelector } from "@/components/UI/ImageSelector";
import { RegistroFormSection } from "./RegistroFormSection";
import { staggerContainer, staggerItem } from "./intercambioAnimations";
import registroData from "@/mocks/registroConexionesData.json";
import temporadasData from "@/mocks/temporadas.json";

const normalizeString = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
};

const MESES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

const ESTADOS_TRANSFORMACION = [
  {
    id: "materia-prima",
    label: "Materia Prima / En Bruto",
    description: "Fruto cosechado en pie sin procesar.",
  },
  {
    id: "pre-procesado",
    label: "Pre-procesado",
    description: "Pulpa congelada, semilla pelada, secada o descascarada.",
  },
  {
    id: "procesado",
    label: "Listo para Consumo / Procesado",
    description: "Harinas, aceites filtrados, envasados.",
  },
] as const;

const UNIDADES_MEDIDA = [
  "Kilogramos (Kg)",
  "Litros (L)",
  "Arrobas (@)",
  "Quintales (Qq)",
] as const;

type EstadoTransformacion = (typeof ESTADOS_TRANSFORMACION)[number]["id"];

interface RegistroProductoFormProps {
  onSubmit?: (data: Record<string, unknown>) => void;
}

export function RegistroProductoForm({ onSubmit }: RegistroProductoFormProps) {
  const [nombreComercial, setNombreComercial] = useState("");
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [estadoTransformacion, setEstadoTransformacion] =
    useState<EstadoTransformacion>("materia-prima");
  const [meses, setMeses] = useState<string[]>([]);
  const [unidadMedida, setUnidadMedida] = useState("");
  const [volumenOferta, setVolumenOferta] = useState("");
  const [asociacion, setAsociacion] = useState("");
  const [recetas, setRecetas] = useState<string[]>([]);
  const [imagenes, setImagenes] = useState<File[]>([]);

  const toggleMes = (mes: string) => {
    setMeses((prev) =>
      prev.includes(mes) ? prev.filter((m) => m !== mes) : [...prev, mes]
    );
  };

  const toggleReceta = (receta: string) => {
    setRecetas((prev) =>
      prev.includes(receta) ? prev.filter((r) => r !== receta) : [...prev, receta]
    );
  };

  const filteredProducts = temporadasData.documents.filter((doc) =>
    normalizeString(doc.nombreComun).includes(normalizeString(nombreComercial))
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.({
      nombreComercial,
      nombreCientifico,
      estadoTransformacion,
      meses,
      unidadMedida,
      volumenOferta,
      asociacion,
      recetas,
      imagenes: imagenes.map((f) => f.name),
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-5"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <RegistroFormSection
        title="Información General"
        description="Identificación del insumo y métricas comerciales."
        icon={Leaf}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 relative">
            <Label htmlFor="nombre-comercial">Nombre Comercial</Label>
            <Input
              id="nombre-comercial"
              placeholder="Ej. Almendra Chiquitana"
              value={nombreComercial}
              onChange={(e) => {
                setNombreComercial(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && nombreComercial && filteredProducts.length > 0 && (
              <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto rounded-md border border-cv-cream-300 bg-white shadow-lg">
                {filteredProducts.map((prod) => (
                  <li
                    key={prod.id}
                    className="cursor-pointer px-4 py-2 text-sm text-cv-gray-700 hover:bg-cv-green-50 hover:text-cv-green-900"
                    onMouseDown={() => {
                      setNombreComercial(prod.nombreComun);
                      setNombreCientifico(prod.nombreCientifico);
                      setShowDropdown(false);
                    }}
                  >
                    {prod.nombreComun}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre-cientifico">Nombre Científico</Label>
            <Input
              id="nombre-cientifico"
              placeholder="Autocompletado..."
              className="italic bg-cv-cream-50 text-cv-gray-500 cursor-not-allowed"
              value={nombreCientifico}
              disabled
              readOnly
            />
          </div>
          <div className="space-y-2">
            <Label>Unidad de Medida Comercial</Label>
            <AnimatedSelect
              value={unidadMedida}
              onValueChange={setUnidadMedida}
              placeholder="Seleccionar unidad"
              options={UNIDADES_MEDIDA.map((u) => ({ value: u, label: u }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="volumen-oferta">Volumen de Oferta Estimado</Label>
            <Input
              id="volumen-oferta"
              type="number"
              min={0}
              placeholder="500"
              value={volumenOferta}
              onChange={(e) => setVolumenOferta(e.target.value)}
            />
          </div>
        </div>
      </RegistroFormSection>

      <RegistroFormSection
        title="Clasificación y Temporada"
        description="Estado de transformación y meses de disponibilidad."
        icon={Package}
      >
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            {ESTADOS_TRANSFORMACION.map((estado) => {
              const selected = estadoTransformacion === estado.id;
              return (
                <button
                  key={estado.id}
                  type="button"
                  onClick={() => setEstadoTransformacion(estado.id)}
                  className={cn(
                    "rounded-xl border-2 p-3.5 text-left transition-all",
                    selected
                      ? "border-cv-green-600 bg-cv-green-50 shadow-sm"
                      : "border-cv-cream-300 bg-white hover:border-cv-green-300"
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={cn(
                        "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                        selected ? "border-cv-green-700" : "border-cv-cream-400"
                      )}
                    >
                      {selected ? (
                        <span className="h-2 w-2 rounded-full bg-cv-green-700" />
                      ) : null}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-cv-green-900">{estado.label}</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-cv-gray-500">
                        {estado.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div>
            <Label className="mb-2 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-cv-green-600" />
              Meses de Disponibilidad
            </Label>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
              {MESES.map((mes) => {
                const active = meses.includes(mes);
                return (
                  <label
                    key={mes}
                    className={cn(
                      "flex cursor-pointer items-center justify-center rounded-lg border px-2 py-2 text-xs font-medium transition-colors sm:text-sm",
                      active
                        ? "border-cv-green-600 bg-cv-green-700 text-white"
                        : "border-cv-cream-300 bg-white text-cv-gray-700 hover:border-cv-green-300"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={() => toggleMes(mes)}
                      className="sr-only"
                    />
                    {mes}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </RegistroFormSection>

      <RegistroFormSection
        title="Origen y Recetario"
        description="Proveedor vinculado y recetas FAN asociadas."
        icon={Link2}
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:max-w-md">
              <Label>Asociación Productora / Proveedor</Label>
              <AnimatedSelect
                value={asociacion}
                onValueChange={setAsociacion}
                placeholder="Seleccionar asociación"
                options={registroData.asociaciones.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-cv-green-600" />
              Ficha Gastronómica
            </Label>
            <div className="flex flex-wrap gap-2">
              {registroData.recetas.map((receta) => {
                const selected = recetas.includes(receta);
                return (
                  <button
                    key={receta}
                    type="button"
                    onClick={() => toggleReceta(receta)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                      selected
                        ? "border-cv-green-600 bg-cv-green-700 text-white"
                        : "border-cv-cream-300 bg-white text-cv-gray-700 hover:border-cv-green-300"
                    )}
                  >
                    {receta}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </RegistroFormSection>

      <RegistroFormSection
        title="Galería de Imágenes"
        description="Fotos macro del insumo y su empaque comercial."
        icon={Package}
      >
        <ImageSelector value={imagenes} onChange={setImagenes} />
      </RegistroFormSection>

      <motion.div
        variants={staggerItem}
        className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
      >
        <Button type="button" variant="outline" className="border-cv-cream-300">
          Guardar borrador
        </Button>
        <Button type="submit" className="bg-cv-green-900 hover:bg-cv-green-800">
          Registrar producto
        </Button>
      </motion.div>
    </motion.form>
  );
}
