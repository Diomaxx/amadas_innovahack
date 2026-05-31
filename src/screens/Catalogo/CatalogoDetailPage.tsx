"use client";

import { useMemo, useState, useEffect } from "react";
import catalogoData from "@/mocks/catalogoData.json";
import { motion } from "framer-motion";
import { CatalogoDetailSkeleton } from "./components/CatalogoDetailSkeleton";
import { ProductHero } from "./components/ProductHero";
import { ProductInfoCards } from "./components/ProductInfoCards";
import { DisponibilidadProductor } from "./components/DisponibilidadProductor";
import { SuscripcionModal } from "./components/SuscripcionModal";
import { OtrosRecursos } from "./components/OtrosRecursos";
import { Trees } from "lucide-react";
import Link from "next/link";

interface CatalogoDetailPageProps {
  id: string;
}

export default function CatalogoDetailPage({ id }: CatalogoDetailPageProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const especie = useMemo(() => {
    return catalogoData.especies.find((e) => e.id === id);
  }, [id]);

  if (!especie) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-cv-cream-300 py-24 text-center">
        <Trees className="mb-4 h-12 w-12 text-cv-green-300" />
        <h1 className="text-xl font-bold text-cv-green-900">Especie no encontrada</h1>
        <p className="mt-2 text-sm text-cv-gray-600">
          No pudimos encontrar la especie que estás buscando en nuestro catálogo.
        </p>
        <Link
          href="/catalogo"
          className="mt-6 rounded-full bg-cv-green-800 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-cv-green-700"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <CatalogoDetailSkeleton />;
  }

  return (
    <motion.div 
      className="w-full pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top Hero Section */}
      <ProductHero
        nombre={especie.nombre}
        nombreCientifico={especie.nombreCientifico}
        temporada={especie.temporada}
        calendarioCosecha={especie.calendarioCosecha}
        imageSrc={especie.imageSrc}
      />

      {/* Info Cards Section */}
      <ProductInfoCards
        esencia={especie.esencia}
        propiedades={especie.propiedades}
        usosGastronomicos={especie.usosGastronomicos}
      />

      {/* Availability Section */}
      <DisponibilidadProductor disponibilidad={especie.disponibilidad} />

      {/* Subscription (button + modal) */}
      <SuscripcionModal
        nombreProducto={especie.nombre}
        categoria={especie.categoria}
      />

      {/* Otros Recursos del Bosque */}
      <OtrosRecursos excludeId={especie.id} />
    </motion.div>
  );
}
