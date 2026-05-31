"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Cog,
  Factory,
  ImageIcon,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import { Button } from "@/components/UI/button";
import { AnimatedSelect } from "@/components/UI/AnimatedSelect";
import { CloudinaryImageField } from "@/components/UI/CloudinaryImageField";
import { RegistroFormSection } from "./RegistroFormSection";
import { staggerContainer, staggerItem } from "./intercambioAnimations";
import registroData from "@/mocks/registroConexionesData.json";

const TIPOS_SERVICIO = [
  {
    id: "prensado",
    label: "Capacidad de Prensado / Extracción",
    description: "Aceites esenciales o comestibles.",
  },
  {
    id: "maquinaria",
    label: "Maquinaria de Cosecha / Despulpado / Molienda",
    description: "Línea de producción física.",
  },
  {
    id: "mano-obra",
    label: "Mano de Obra Calificada",
    description: "Recolección sostenible y BPM.",
  },
] as const;

interface RegistroServicioFormProps {
  onSubmit?: (data: Record<string, unknown>) => void;
}

export function RegistroServicioForm({ onSubmit }: RegistroServicioFormProps) {
  const [tiposServicio, setTiposServicio] = useState<string[]>([]);
  const [capacidad, setCapacidad] = useState("");
  const [unidadCapacidad, setUnidadCapacidad] = useState("");
  const [maquinaria, setMaquinaria] = useState("");
  const [certificaciones, setCertificaciones] = useState<string[]>([]);
  const [tiempoRespuesta, setTiempoRespuesta] = useState("");
  const [comunidad, setComunidad] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");

  const toggleTipo = (id: string) => {
    setTiposServicio((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleCertificacion = (cert: string) => {
    setCertificaciones((prev) =>
      prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.({
      tiposServicio,
      capacidad,
      unidadCapacidad,
      maquinaria,
      certificaciones,
      tiempoRespuesta,
      comunidad,
      imagenUrl,
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
        title="Categorización Técnica"
        description="Capacidades operativas disponibles en el territorio."
        icon={Factory}
      >
        <div className="grid gap-3 md:grid-cols-3">
          {TIPOS_SERVICIO.map((tipo) => {
            const selected = tiposServicio.includes(tipo.id);
            return (
              <label
                key={tipo.id}
                className={cn(
                  "flex cursor-pointer gap-2.5 rounded-xl border-2 p-3.5 transition-all",
                  selected
                    ? "border-cv-green-600 bg-cv-green-50 shadow-sm"
                    : "border-cv-cream-300 bg-white hover:border-cv-green-300"
                )}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleTipo(tipo.id)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-cv-green-700"
                />
                <div>
                  <p className="text-sm font-semibold text-cv-green-900">{tipo.label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-cv-gray-500">
                    {tipo.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>
      </RegistroFormSection>

      <RegistroFormSection
        title="Capacidad Operativa"
        description="Volumen de procesamiento y equipamiento disponible."
        icon={Cog}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="capacidad">Capacidad de Procesamiento</Label>
            <Input
              id="capacidad"
              type="number"
              min={0}
              placeholder="50"
              value={capacidad}
              onChange={(e) => setCapacidad(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Unidad de tiempo</Label>
            <AnimatedSelect
              value={unidadCapacidad}
              onValueChange={setUnidadCapacidad}
              placeholder="Seleccionar unidad"
              options={registroData.unidadesCapacidad.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </div>
          <div className="space-y-2 lg:col-span-2">
            <Label htmlFor="maquinaria" className="flex items-center gap-2">
              <Wrench className="h-4 w-4 text-cv-green-600" />
              Maquinaria / Equipamiento Utilizado
            </Label>
            <textarea
              id="maquinaria"
              rows={3}
              placeholder="Prensa extractora hidráulica en frío, secadora solar comunitaria..."
              value={maquinaria}
              onChange={(e) => setMaquinaria(e.target.value)}
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </RegistroFormSection>

      <RegistroFormSection
        title="Estándares y Comunidad"
        description="Certificaciones, tiempos de respuesta y responsable del servicio."
        icon={Award}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Certificaciones del Servicio</Label>
            <div className="flex flex-wrap gap-2">
              {registroData.certificaciones.map((cert) => {
                const selected = certificaciones.includes(cert);
                return (
                  <button
                    key={cert}
                    type="button"
                    onClick={() => toggleCertificacion(cert)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-colors sm:text-sm",
                      selected
                        ? "border-cv-gold-500 bg-cv-gold-300 text-cv-gray-900"
                        : "border-cv-cream-300 bg-white text-cv-gray-700 hover:border-cv-gold-400"
                    )}
                  >
                    {cert}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-cv-green-600" />
                Tiempo de Respuesta
              </Label>
              <AnimatedSelect
                value={tiempoRespuesta}
                onValueChange={setTiempoRespuesta}
                placeholder="Seleccionar tiempo"
                options={registroData.tiemposRespuesta.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4 text-cv-green-600" />
                Comunidad Responsable
              </Label>
              <AnimatedSelect
                value={comunidad}
                onValueChange={setComunidad}
                placeholder="Seleccionar comunidad"
                options={registroData.asociaciones.map((item) => ({
                  value: item,
                  label: item,
                }))}
              />
            </div>
          </div>
        </div>
      </RegistroFormSection>

      <RegistroFormSection
        title="Imagen del servicio"
        description="Foto del equipamiento, taller o instalación (opcional)."
        icon={ImageIcon}
      >
        <CloudinaryImageField
          value={imagenUrl}
          onChange={setImagenUrl}
          folder="alma/intercambios"
        />
      </RegistroFormSection>

      <motion.div
        variants={staggerItem}
        className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"
      >
        <Button type="button" variant="outline" className="border-cv-cream-300">
          Guardar borrador
        </Button>
        <Button type="submit" className="bg-cv-green-900 hover:bg-cv-green-800">
          Registrar servicio
        </Button>
      </motion.div>
    </motion.form>
  );
}
