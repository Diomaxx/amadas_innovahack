"use client";

import { useState } from "react";
import { FileDown, Loader2 } from "lucide-react";
import { listProductosUi } from "@/lib/api/productos";
import { listRecetasUi } from "@/lib/api/recetas";
import { listPublicacionesUi } from "@/lib/api/publicaciones";
import { listContactosUi } from "@/lib/api/contactos";
import { generarReportePDF } from "@/screens/Admin/Reportes/generarReportePDF";

/**
 * Botón de la pestaña de métricas que **descarga** un PDF vectorial con el
 * estado de la plataforma. Trae los datos en vivo del backend al pulsar y
 * genera el archivo con jsPDF.
 */
export function ReporteButton() {
  const [generando, setGenerando] = useState(false);

  const handleClick = async () => {
    setGenerando(true);
    try {
      const [productos, recetas, publicaciones, contactos] = await Promise.all([
        listProductosUi(),
        listRecetasUi(),
        listPublicacionesUi(),
        listContactosUi(),
      ]);
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
