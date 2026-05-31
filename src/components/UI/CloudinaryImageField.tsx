"use client";

import { useId, useRef, useState } from "react";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import { uploadFileToCloudinary } from "@/lib/cloudinary/client";

type Props = {
  /** URL actual de la imagen (secure_url de Cloudinary o cualquier URL). */
  value?: string;
  /** Devuelve la nueva URL subida, o "" al quitarla. */
  onChange: (url: string) => void;
  /** Carpeta destino en Cloudinary (ej. "alma/recetas"). */
  folder?: string;
  /** Etiqueta superior. */
  label?: string;
};

const MAX_MB = 8;

export function CloudinaryImageField({ value, onChange, folder, label }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // Permite volver a elegir el mismo archivo después de un error.
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen.");
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setError(`La imagen supera el máximo de ${MAX_MB} MB.`);
      return;
    }

    setError(null);
    setSubiendo(true);
    try {
      const result = await uploadFileToCloudinary(file, {
        folder,
        resourceType: "image",
      });
      onChange(result.secureUrl);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "No se pudo subir la imagen.",
      );
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wide text-cv-gray-600">
          {label}
        </p>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="sr-only"
      />

      {value ? (
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Vista previa"
            className="h-24 w-24 rounded-xl object-cover shadow-sm"
          />
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={subiendo}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cv-cream-300 bg-white px-3 py-1.5 text-xs font-medium text-cv-gray-700 transition-colors hover:bg-cv-cream-100 disabled:opacity-60"
            >
              {subiendo ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              {subiendo ? "Subiendo…" : "Cambiar"}
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              disabled={subiendo}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-[#A6452F] transition-colors hover:bg-[#FBEEEB] disabled:opacity-60"
            >
              <X className="h-3.5 w-3.5" />
              Quitar
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={subiendo}
          className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cv-cream-300 bg-cv-cream-50 text-cv-gray-400 transition-colors hover:border-cv-green-300 hover:text-cv-green-600 disabled:opacity-60"
        >
          {subiendo ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-xs font-medium">Subiendo imagen…</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-6 w-6" />
              <span className="text-xs font-medium">Subir imagen</span>
            </>
          )}
        </button>
      )}

      {error && <p className="text-xs text-[#A6452F]">{error}</p>}
    </div>
  );
}
