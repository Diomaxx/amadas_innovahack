"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ActividadEntry } from "../actividad.types";
import { ActividadHeader } from "./ActividadHeader";
import { FiltroFechas } from "./FiltroFechas";
import { ActividadStatsBar } from "./ActividadStatsBar";
import { ActividadExplorer } from "./ActividadExplorer";

export function ActividadDashboard({
  actividades,
}: {
  actividades: ActividadEntry[];
}) {
  const [filterOpen, setFilterOpen]     = useState(false);
  const [fechaInicio, setFechaInicio]   = useState("");
  const [fechaFin, setFechaFin]         = useState("");

  const handleToggle = useCallback(() => setFilterOpen((p) => !p), []);

  const handleLimpiar = useCallback(() => {
    setFechaInicio("");
    setFechaFin("");
  }, []);

  const actividadesFiltradas = useMemo(() => {
    if (!fechaInicio && !fechaFin) return actividades;
    return actividades.filter((a) => {
      if (fechaInicio && a.fecha < fechaInicio) return false;
      if (fechaFin   && a.fecha > fechaFin)     return false;
      return true;
    });
  }, [actividades, fechaInicio, fechaFin]);

  return (
    <div className="space-y-8">
      <ActividadHeader filterOpen={filterOpen} onToggle={handleToggle} />

      {/* Animated date filter panel */}
      <AnimatePresence initial={false}>
        {filterOpen && (
          <motion.div
            key="filtro-fechas"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <FiltroFechas
              fechaInicio={fechaInicio}
              fechaFin={fechaFin}
              onChangeInicio={setFechaInicio}
              onChangeFin={setFechaFin}
              onLimpiar={handleLimpiar}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <ActividadStatsBar actividades={actividadesFiltradas} />
      <ActividadExplorer actividades={actividadesFiltradas} />
    </div>
  );
}
