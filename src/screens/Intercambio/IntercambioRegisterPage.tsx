"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Package, Wrench } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { useUnifiedLoading } from "@/hooks/useUnifiedLoading";
import { RegistroProductoForm } from "./components/RegistroProductoForm";
import { RegistroServicioForm } from "./components/RegistroServicioForm";
import { IntercambioRegisterSkeleton } from "./components/IntercambioRegisterSkeleton";
import {
  pageTransition,
  staggerContainer,
  staggerItem,
  tabContentVariants,
} from "./components/intercambioAnimations";

export default function IntercambioRegisterPage() {
  const [activeTab, setActiveTab] = useState<"producto" | "servicio">("producto");
  const isLoading = useUnifiedLoading();
  const directionRef = useRef(1);

  const handleTabChange = (value: string) => {
    const next = value as "producto" | "servicio";
    directionRef.current = next === "servicio" ? 1 : -1;
    setActiveTab(next);
  };

  if (isLoading) {
    return <IntercambioRegisterSkeleton />;
  }

  return (
    <motion.div className="w-full pb-12" {...pageTransition}>
      <motion.div variants={staggerContainer} initial="hidden" animate="show">
        <motion.div variants={staggerItem}>
          <Link
            href="/conexiones"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-cv-gray-600 transition-colors hover:text-cv-green-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a conexiones
          </Link>
        </motion.div>

        <motion.header variants={staggerItem} className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-cv-green-900 sm:text-4xl">
            Registrar Conexión
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-cv-gray-600">
            Publique materia prima o capacidad operativa en la red B2B del territorio boliviano.
            Complete el formulario correspondiente para conectar con chefs, empresas e industria.
          </p>
        </motion.header>

        <motion.div variants={staggerItem}>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="mb-6 h-auto w-auto justify-start gap-1 rounded-xl border border-cv-cream-300 bg-cv-cream-100 p-1">
              <TabsTrigger
                value="producto"
                className="gap-2 rounded-lg px-5 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-cv-green-900 data-[state=active]:shadow-sm"
              >
                <Package className="h-4 w-4" />
                Producto
              </TabsTrigger>
              <TabsTrigger
                value="servicio"
                className="gap-2 rounded-lg px-5 py-2.5 transition-all data-[state=active]:bg-white data-[state=active]:text-cv-green-900 data-[state=active]:shadow-sm"
              >
                <Wrench className="h-4 w-4" />
                Servicio
              </TabsTrigger>
            </TabsList>

            <div className="relative min-h-[480px] overflow-hidden">
              <AnimatePresence mode="wait" custom={directionRef.current}>
                {activeTab === "producto" ? (
                  <motion.div
                    key="producto"
                    custom={directionRef.current}
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <RegistroProductoForm
                      onSubmit={(data) => {
                        console.log("Producto registrado:", data);
                      }}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="servicio"
                    custom={directionRef.current}
                    variants={tabContentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <RegistroServicioForm
                      onSubmit={(data) => {
                        console.log("Servicio registrado:", data);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
