"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type StyledSelectOption = string | { value: string; label: string };

function normalize(option: StyledSelectOption): { value: string; label: string } {
  return typeof option === "string" ? { value: option, label: option } : option;
}

/**
 * Dropdown estilizado sobre Radix con la paleta crema/verde del proyecto.
 * Reemplaza al `<select>` nativo, cuyo menú desplegado no se puede estilizar
 * (bordes cuadrados y resaltado azul del sistema operativo). El menú abierto
 * comparte la identidad visual: esquinas redondeadas, hover verde, check del
 * ítem activo y animación de entrada.
 *
 * El trigger trae un estilo por defecto alto (para formularios). Pásale
 * `className` para adaptarlo a barras de filtros más compactas: `tailwind-merge`
 * resuelve los conflictos (alto, fondo, color) de forma limpia.
 */
export function StyledSelect({
  value,
  onValueChange,
  options,
  placeholder = "Seleccionar...",
  error,
  className,
  "aria-label": ariaLabel,
}: {
  value: string;
  onValueChange: (value: string) => void;
  options: StyledSelectOption[];
  placeholder?: string;
  error?: boolean;
  className?: string;
  "aria-label"?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const items = options.map(normalize);

  // Red de seguridad: Radix Select bloquea `pointer-events` del `<body>`
  // mientras está abierto (vía `disableOutsidePointerEvents`) y lo restaura al
  // cerrar. Si el componente se desmonta estando abierto (p. ej. al cambiar de
  // paso del wizard), esa restauración puede no ejecutarse y la página entera
  // queda sin poder hacer clic. Al desmontar, limpiamos el candado si quedó.
  React.useEffect(() => {
    return () => {
      if (document.body.style.pointerEvents === "none") {
        document.body.style.pointerEvents = "";
      }
    };
  }, []);

  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      open={open}
      onOpenChange={setOpen}
    >
      <SelectPrimitive.Trigger
        aria-label={ariaLabel}
        className={cn(
          "flex h-12 w-full items-center justify-between gap-2 rounded-xl border border-cv-cream-300 bg-cv-cream-50/70 px-4 text-sm text-cv-gray-800 shadow-sm outline-none transition-all duration-200 hover:border-cv-green-300 focus:border-cv-green-500 focus:bg-white focus:ring-4 focus:ring-cv-green-100/70 data-[state=open]:border-cv-green-500 data-[state=open]:bg-white data-[placeholder]:text-cv-gray-400",
          error &&
            "border-cv-error bg-cv-error/5 hover:border-cv-error focus:border-cv-error focus:ring-cv-error/10 data-[state=open]:border-cv-error",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="ml-2 shrink-0"
        >
          <ChevronDown className="h-4 w-4 text-cv-gray-500" />
        </motion.span>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content asChild position="popper" sideOffset={6}>
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border border-cv-cream-300 bg-white p-1.5 shadow-xl shadow-cv-green-900/10"
          >
            <SelectPrimitive.Viewport>
              {items.map((item) => (
                <SelectPrimitive.Item
                  key={item.value}
                  value={item.value}
                  className="relative flex cursor-pointer select-none items-center rounded-lg py-2.5 pl-3.5 pr-9 text-sm text-cv-gray-700 outline-none transition-colors data-[highlighted]:bg-cv-green-50 data-[highlighted]:text-cv-green-900 data-[state=checked]:font-semibold data-[state=checked]:text-cv-green-800"
                >
                  <SelectPrimitive.ItemText>{item.label}</SelectPrimitive.ItemText>
                  <span className="absolute right-3 flex items-center">
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-4 w-4 text-cv-green-700" />
                    </SelectPrimitive.ItemIndicator>
                  </span>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </motion.div>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
