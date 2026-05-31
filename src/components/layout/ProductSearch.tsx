"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Leaf, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buscarCatalogo } from "@/screens/Catalogo/catalogo.data";

/**
 * Buscador de productos del catálogo para el topbar.
 *
 * Es un único elemento (la píldora) que se extiende y se retrae animando su
 * ancho — nunca se intercambia por otro componente. Cerrado muestra
 * "Buscar productos..."; al hacer clic se estira sobre los tabs y abre el
 * panel de resultados. Sigue el patrón ARIA 1.2 combobox.
 */
export function ProductSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [animating, setAnimating] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listboxId = useId();

  const results = useMemo(() => buscarCatalogo(query), [query]);

  // Reinicia el resaltado cuando cambian los resultados.
  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  // Enfoca el input al abrir.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Cierra al hacer clic fuera.
  useEffect(() => {
    if (!open) return;
    function handleOutside(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open]);

  function close() {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }

  function goTo(id: string) {
    close();
    router.push(`/catalogo/${id}`);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      if (activeIndex > -1 && results[activeIndex]) {
        goTo(results[activeIndex].id);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  }

  const showPanel = open && query.trim().length > 0;

  return (
    <>
      {/* Píldora única: en reposo va en el flujo (a la derecha, sin tapar los
          tabs); al abrir pasa a capa absoluta que se extiende hasta "Inicio".
          `layout` (FLIP) anima el cambio de ancho/posición suavemente. */}
      <motion.div
        ref={wrapperRef}
        layout
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        style={{ width: open ? undefined : 210 }}
        onLayoutAnimationStart={() => setAnimating(true)}
        onLayoutAnimationComplete={() => setAnimating(false)}
        className={cn(
          "max-w-full",
          open
            ? "absolute inset-y-0 left-0 right-0 z-40 my-auto h-fit"
            : "relative ml-auto",
        )}
      >
        <div
          onClick={() => !open && setOpen(true)}
          className={cn(
            "relative flex items-center gap-2 overflow-hidden rounded-full border bg-white px-3 py-2 transition-colors",
            open
              ? "border-cv-green-300 shadow-sm ring-2 ring-cv-green-100"
              : "cursor-pointer border-cv-cream-300 text-cv-gray-500 hover:border-cv-green-300 hover:text-cv-green-700",
          )}
        >
          <Search
            className={cn(
              "h-4 w-4 shrink-0",
              open ? "text-cv-green-600" : "text-current",
            )}
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              showPanel && activeIndex > -1
                ? `${listboxId}-opt-${activeIndex}`
                : undefined
            }
            aria-label="Buscar productos del catálogo"
            value={query}
            readOnly={!open}
            onFocus={() => setOpen(true)}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className={cn(
              "peer w-full min-w-0 truncate bg-transparent text-sm outline-none",
              open ? "cursor-text text-cv-gray-900" : "cursor-pointer",
            )}
          />
          {/* Placeholder propio: desaparece al instante cuando arranca la
              animación de ancho (el placeholder nativo se deforma con el scale
              del `layout`) y reaparece con fade-in al terminar. */}
          {!animating && !query && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              aria-hidden
              className="pointer-events-none absolute left-10 truncate text-sm text-cv-gray-400"
            >
              Buscar productos...
            </motion.span>
          )}
          {open && (
            <button
              type="button"
              aria-label="Cerrar buscador"
              onClick={close}
              className="shrink-0 rounded-full p-1 text-cv-gray-400 transition-colors hover:bg-cv-cream-100 hover:text-cv-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Panel de resultados */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-cv-cream-300 bg-white shadow-xl shadow-cv-green-900/10"
            >
              {results.length > 0 ? (
                <ul
                  role="listbox"
                  id={listboxId}
                  className="max-h-96 overflow-y-auto p-2"
                >
                  {results.map((item, index) => {
                    const active = index === activeIndex;
                    return (
                      <li
                        key={item.id}
                        id={`${listboxId}-opt-${index}`}
                        role="option"
                        aria-selected={active}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => goTo(item.id)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors",
                          active ? "bg-cv-green-50" : "hover:bg-cv-cream-100",
                        )}
                      >
                        {/* Imagen / placeholder */}
                        <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cv-cream-100">
                          {item.imageSrc ? (
                            <Image
                              src={item.imageSrc}
                              alt={item.nombre}
                              fill
                              className="object-cover"
                              sizes="44px"
                            />
                          ) : (
                            <Leaf className="h-5 w-5 text-cv-green-400" />
                          )}
                        </div>

                        {/* Texto */}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-cv-gray-900">
                            {item.nombre}
                          </p>
                          <p className="truncate text-xs italic text-cv-gray-500">
                            {item.nombreCientifico}
                          </p>
                        </div>

                        <span className="shrink-0 rounded-full bg-cv-cream-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cv-gray-500">
                          {item.categoria}
                        </span>

                        {active && (
                          <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-cv-green-500" />
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-cv-gray-500">
                    No se encontraron productos para{" "}
                    <span className="font-medium text-cv-gray-700">
                      “{query}”
                    </span>
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
