"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Package, Wrench } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/UI/tabs";
import { useUnifiedLoading } from "@/hooks/useUnifiedLoading";
import { useAuth } from "@/context/AuthContext";
import { createIntercambioApi } from "@/lib/api/intercambios";
import type { Intercambio } from "./intercambio.types";
import { RegistroProductoForm } from "./components/RegistroProductoForm";
import { RegistroServicioForm } from "./components/RegistroServicioForm";
import { IntercambioRegisterSkeleton } from "./components/IntercambioRegisterSkeleton";
import {
  pageTransition,
  staggerContainer,
  staggerItem,
  tabContentVariants,
} from "./components/intercambioAnimations";

const MESES_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const IMG_PRODUCTO =
  "https://images.unsplash.com/photo-1712143525667-717b146a141f?auto=format&fit=crop&w=800&q=80";
const IMG_SERVICIO =
  "https://images.unsplash.com/photo-1532092823327-aecb965e5be5?auto=format&fit=crop&w=800&q=80";

function productoToIntercambio(
  data: Record<string, unknown>,
  email: string,
): Omit<Intercambio, "id"> {
  const meses = (data.meses as string[]) ?? [];
  const mesActual = MESES_ES[new Date().getMonth()];
  const nombre = String(data.nombreComercial || "Producto");
  const volumen = String(data.volumenOferta || "");
  const unidad = String(data.unidadMedida || "");
  const titulo = `Tengo: ${[volumen, unidad, nombre].filter(Boolean).join(" ")}`.trim();
  return {
    titulo: titulo || `Oferta: ${nombre}`,
    tipo: "RAW_MATERIAL",
    estado: meses.includes(mesActual) ? "En Temporada" : "Disponible",
    busca: "Disponible para venta o procesamiento.",
    rango: "A convenir",
    productor: String(data.asociacion || "Productor independiente"),
    rolProductor: "Vendedor",
    ubicacion: "No especificada",
    categoria: "Semillas y Frutos",
    accion: "Proponer Trato",
    imagen: String(data.imagenUrl || "") || IMG_PRODUCTO,
    createdAt: Date.now(),
    creadoPor: email,
    raw: data,
  };
}

function servicioToIntercambio(
  data: Record<string, unknown>,
  email: string,
): Omit<Intercambio, "id"> {
  const cap = String(data.capacidad || "");
  const unidad = String(data.unidadCapacidad || "");
  const titulo = `Servicio: ${[cap, unidad].filter(Boolean).join(" / ")}`.trim();
  return {
    titulo: titulo || "Servicio disponible",
    tipo: "SERVICIOS",
    estado: "Disponible",
    busca: String(data.maquinaria || "Servicio de procesamiento disponible."),
    rango: "A convenir",
    productor: String(data.comunidad || "Proveedor de servicios"),
    rolProductor: "Socio estratégico",
    ubicacion: "No especificada",
    categoria: "Servicios",
    accion: "Enviar Consulta",
    imagen: String(data.imagenUrl || "") || IMG_SERVICIO,
    createdAt: Date.now(),
    creadoPor: email,
    raw: data,
  };
}

export default function IntercambioRegisterPage() {
  const [activeTab, setActiveTab] = useState<"producto" | "servicio">("producto");
  const [enviando, setEnviando] = useState(false);
  const isLoading = useUnifiedLoading();
  const directionRef = useRef(1);
  const router = useRouter();
  const { user } = useAuth();

  const handleTabChange = (value: string) => {
    const next = value as "producto" | "servicio";
    directionRef.current = next === "servicio" ? 1 : -1;
    setActiveTab(next);
  };

  async function publicar(intercambio: Omit<Intercambio, "id">) {
    if (!user) {
      router.push("/auth");
      return;
    }
    setEnviando(true);
    try {
      await createIntercambioApi(intercambio);
      router.push("/intercambio");
    } catch (error) {
      console.error("No se pudo publicar el intercambio:", error);
      setEnviando(false);
    }
  }

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

        {enviando && (
          <motion.div
            variants={staggerItem}
            className="mb-4 rounded-lg border border-cv-green-200 bg-cv-green-50 px-4 py-2.5 text-sm font-medium text-cv-green-800"
          >
            Publicando tu intercambio…
          </motion.div>
        )}

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
                        if (!user) {
                          router.push("/auth");
                          return;
                        }
                        void publicar(productoToIntercambio(data, user.email ?? ""));
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
                        if (!user) {
                          router.push("/auth");
                          return;
                        }
                        void publicar(servicioToIntercambio(data, user.email ?? ""));
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
