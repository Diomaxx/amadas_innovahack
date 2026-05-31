"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { useCollection } from "@/hooks/useCollection";
import { subscribeProductos } from "@/lib/firebase/productos.repo";
import { subscribeUsuarios } from "@/lib/firebase/users.repo";
import { subscribeRecetas } from "@/lib/firebase/recetas.repo";
import { subscribePublicaciones } from "@/lib/firebase/publicaciones.repo";
import type { ProductoTemporada } from "@/screens/Admin/Temporada/temporada.types";
import type { Contacto } from "@/screens/Admin/Contactos/contactos.types";
import type { Receta } from "@/screens/Recetas/recetas.types";
import type { Publicacion } from "@/screens/Admin/Publicaciones/publicaciones.types";
import { generarReportePDF } from "@/screens/Admin/Reportes/generarReportePDF";

/**
 * Botón de la pestaña de métricas que **descarga** un PDF vectorial con el
 * estado de la plataforma. No usa el diálogo de impresión: genera el archivo
 * con jsPDF a partir de los datos en vivo de Firestore.
 */
export function ReporteButton() {
  const { data: productos } = useCollection<ProductoTemporada>(subscribeProductos);
  const { data: contactos } = useCollection<Contacto>(subscribeUsuarios);
  const { data: recetas } = useCollection<Receta>(subscribeRecetas);
  const { data: publicaciones } = useCollection<Publicacion>(subscribePublicaciones);

  const [generando, setGenerando] = useState(false);

  const handleClick = async () => {
    setGenerando(true);
    try {
      // Cede un frame para que el spinner pinte antes del trabajo síncrono.
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      generarReportePDF({ productos, contactos, recetas, publicaciones });
    } finally {
      setGenerando(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={generando}
      className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-br from-cv-green-800 to-cv-green-900 px-4 py-2.5 text-sm font-semibold text-cv-cream-50 shadow-[0_14px_28px_-18px_rgba(20,41,31,0.9)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_-18px_rgba(20,41,31,1)] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {generando ? (
        <Loader2 className="h-4 w-4 animate-spin text-cv-gold-300" />
      ) : (
        <FileDown className="h-4 w-4 text-cv-gold-300 transition-transform duration-200 group-hover:scale-110" />
      )}
      {generando ? "Generando…" : "Descargar reporte PDF"}
    </button>
  );
}
