"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageIcon, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/UI/button";

interface ImageSelectorProps {
  value: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
  hint?: string;
}

export function ImageSelector({
  value,
  onChange,
  maxFiles = 6,
  accept = "image/jpeg,image/png,image/webp",
  className,
  hint = "Arrastra imágenes aquí o haz clic para seleccionar",
}: ImageSelectorProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const previews = useMemo(
    () => value.map((file) => ({ file, url: URL.createObjectURL(file) })),
    [value]
  );

  useEffect(() => {
    return () => {
      previews.forEach(({ url }) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const next = [...value];
      const allowed = Array.from(incoming).filter((file) => file.type.startsWith("image/"));

      for (const file of allowed) {
        if (next.length >= maxFiles) break;
        next.push(file);
      }

      onChange(next);
    },
    [maxFiles, onChange, value]
  );

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files.length > 0) {
      addFiles(event.dataTransfer.files);
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors",
          isDragging
            ? "border-cv-green-500 bg-cv-green-50"
            : "border-cv-cream-300 bg-cv-cream-50 hover:border-cv-green-300 hover:bg-cv-green-50/40"
        )}
      >
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cv-cream-200">
          <Upload className="h-5 w-5 text-cv-green-600" />
        </div>
        <p className="text-sm font-medium text-cv-green-900">{hint}</p>
        <p className="mt-1 text-xs text-cv-gray-500">
          JPG, PNG o WEBP · Máximo {maxFiles} imágenes
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple
          className="hidden"
          onChange={(event) => {
            if (event.target.files) {
              addFiles(event.target.files);
              event.target.value = "";
            }
          }}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {previews.map(({ file, url }, index) => (
            <div
              key={`${file.name}-${index}`}
              className="group relative aspect-square overflow-hidden rounded-lg border border-cv-cream-300 bg-cv-cream-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={file.name} className="h-full w-full object-cover" />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2 h-7 w-7 rounded-full bg-white/90 opacity-0 shadow transition-opacity group-hover:opacity-100"
                onClick={(event) => {
                  event.stopPropagation();
                  removeFile(index);
                }}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}

          {value.length < maxFiles && (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-cv-cream-300 bg-white text-cv-gray-500 transition-colors hover:border-cv-green-300 hover:text-cv-green-700"
            >
              <ImageIcon className="h-5 w-5" />
              <span className="text-xs font-medium">Agregar</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
