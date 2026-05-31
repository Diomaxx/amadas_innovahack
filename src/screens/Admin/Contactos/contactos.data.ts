import type { Contacto, TipoContacto } from "./contactos.types";

export const TIPO_LABEL: Record<TipoContacto, string> = {
  productor: "Productor",
  asociacion: "Asociación",
  tienda: "Tienda",
  proveedor: "Proveedor",
};

export const TIPO_PLURAL: Record<TipoContacto, string> = {
  productor: "Productores",
  asociacion: "Asociaciones",
  tienda: "Tiendas",
  proveedor: "Proveedores",
};

export const TIPO_VISUAL: Record<
  TipoContacto,
  { color: string; bg: string; dot: string; avatarBg: string; avatarText: string }
> = {
  productor: {
    color: "#166534",
    bg: "#dcfce7",
    dot: "#22c55e",
    avatarBg: "#22c55e",
    avatarText: "#ffffff",
  },
  asociacion: {
    color: "#1e3a8a",
    bg: "#dbeafe",
    dot: "#3b82f6",
    avatarBg: "#2563eb",
    avatarText: "#ffffff",
  },
  tienda: {
    color: "#9a3412",
    bg: "#ffedd5",
    dot: "#f97316",
    avatarBg: "#ea580c",
    avatarText: "#ffffff",
  },
  proveedor: {
    color: "#451a03",
    bg: "#fef3c7",
    dot: "#92400e",
    avatarBg: "#78350f",
    avatarText: "#ffffff",
  },
};

export const CONTACTOS_MOCK: Contacto[] = [
  {
    id: "1",
    nombre: "María Fernández",
    tipo: "productor",
    organizacion: "Asociación de Productores del Bosque",
    telefono: "+591 7123-4567",
    email: "maria.fernandez@ejemplo.com",
    ubicacion: "San Ignacio de Velasco",
    productos: ["Almendra Chiquitana", "Miel de Monte"],
    descripcion:
      "Producción certificada orgánica. Disponible para visitas de chefs.",
  },
  {
    id: "2",
    nombre: "Asociación de Productores del Bosque",
    tipo: "asociacion",
    telefono: "+591 3-982-1234",
    email: "contacto@productoresbosque.org",
    ubicacion: "San Ignacio de Velasco",
    productos: ["Almendra Chiquitana", "Motacú", "Totaí"],
    descripcion:
      "Agrupan a 45 productores de la región. Tienen centro de acopio.",
  },
  {
    id: "3",
    nombre: "Tienda Sabores del Monte",
    tipo: "tienda",
    telefono: "+591 3-338-7890",
    email: "ventas@saboresdelmonte.com",
    ubicacion: "Santa Cruz",
    productos: ["Almendra Chiquitana", "Miel de Monte", "Coquito", "Asaí"],
    descripcion:
      "Punto de venta principal en Santa Cruz. Abierto de lunes a sábado.",
  },
  {
    id: "4",
    nombre: "Carlos Gutiérrez",
    tipo: "productor",
    organizacion: "Comunidad Agroforestal El Motacú",
    telefono: "+591 7234-5678",
    email: "carlos.gutierrez@ejemplo.com",
    ubicacion: "Concepción",
    productos: ["Motacú", "Totaí"],
    descripcion:
      "Especialista en productos de palmera. Entrega a domicilio.",
  },
  {
    id: "5",
    nombre: "Restaurante El Fogón Silvestre",
    tipo: "tienda",
    telefono: "+591 3-445-6789",
    email: "reservas@elfogon.bo",
    ubicacion: "Santa Cruz",
    productos: ["Asaí", "Coquito", "Almendra Chiquitana"],
    descripcion:
      "Cocina de autor con ingredientes del bosque chiquitano. Reservas abiertas.",
  },
  {
    id: "6",
    nombre: "Red de Mujeres Productoras CHIQUITANIA",
    tipo: "asociacion",
    telefono: "+591 3-671-2345",
    email: "redmujeres.chiquitania@gmail.com",
    ubicacion: "San Rafael de Velasco",
    productos: ["Miel de Monte", "Cera de Abejas", "Almendra Chiquitana"],
    descripcion:
      "Cooperativa de 30 familias productoras. Certificación en proceso.",
  },
  {
    id: "7",
    nombre: "AgroPyme Bolivia",
    tipo: "proveedor",
    telefono: "+591 3-220-9988",
    email: "ventas@agropyme.bo",
    ubicacion: "Santa Cruz",
    productos: ["Insumos agrícolas", "Empaques biodegradables"],
    descripcion:
      "Proveedor certificado de insumos para producción orgánica.",
  },
  {
    id: "8",
    nombre: "Ana Luz Vásquez",
    tipo: "productor",
    organizacion: "Finca Agroecológica Vásquez",
    telefono: "+591 7890-1234",
    email: "analuz.vasquez@ejemplo.com",
    ubicacion: "San Javier",
    productos: ["Asaí", "Copoazú", "Cacao silvestre"],
    descripcion:
      "Finca familiar con certificación orgánica vigente.",
  },
  {
    id: "9",
    nombre: "Cooperativa Semilla Verde",
    tipo: "asociacion",
    telefono: "+591 3-556-7890",
    email: "info@semillaverde.coop",
    ubicacion: "Concepción",
    productos: ["Cacao silvestre", "Miel de Monte", "Motacú"],
    descripcion:
      "Exportan a mercados de Europa y América del Norte.",
  },
  {
    id: "10",
    nombre: "Distribuidora NaturalMart",
    tipo: "proveedor",
    telefono: "+591 3-775-4321",
    email: "pedidos@naturalmart.bo",
    ubicacion: "Santa Cruz",
    productos: ["Empaques ecológicos", "Logística cadena de frío"],
    descripcion:
      "Logística y distribución para productos forestales no maderables.",
  },
  {
    id: "11",
    nombre: "Jorge Mendoza Roca",
    tipo: "productor",
    organizacion: "Comunidad Indígena Turubó",
    telefono: "+591 7012-3456",
    email: "jorge.mendoza@ejemplo.com",
    ubicacion: "San Ignacio de Velasco",
    productos: ["Totaí", "Almendra Chiquitana"],
    descripcion:
      "Recolección sostenible con prácticas ancestrales.",
  },
  {
    id: "12",
    nombre: "Mercado Orgánico Chiquitano",
    tipo: "tienda",
    telefono: "+591 3-882-4567",
    email: "mercado@chiquitano.bo",
    ubicacion: "San Ignacio de Velasco",
    productos: ["Almendra Chiquitana", "Miel de Monte", "Asaí", "Coquito"],
    descripcion:
      "Feria permanente con más de 20 productores locales. Abierto viernes y sábados.",
  },
];
