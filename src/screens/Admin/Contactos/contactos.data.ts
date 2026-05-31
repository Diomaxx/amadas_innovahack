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
  {
    color: string;
    bg: string;
    dot: string;
    avatarBg: string;
    avatarText: string;
    headerBg: string;
  }
> = {
  productor: {
    color: "#2D6A4A",
    bg: "#E3F2E9",
    dot: "#3A7D5C",
    avatarBg: "#3A7D5C",
    avatarText: "#ffffff",
    headerBg: "#3A7D5C",
  },
  asociacion: {
    color: "#2B6A93",
    bg: "#E3ECF3",
    dot: "#2980B9",
    avatarBg: "#2B6A93",
    avatarText: "#ffffff",
    headerBg: "#2B6A93",
  },
  tienda: {
    color: "#9A5A33",
    bg: "#F2E6DA",
    dot: "#B06A3F",
    avatarBg: "#B06A3F",
    avatarText: "#ffffff",
    headerBg: "#B06A3F",
  },
  proveedor: {
    color: "#6B4E2E",
    bg: "#EBE2D2",
    dot: "#8A6A3F",
    avatarBg: "#8A6A3F",
    avatarText: "#ffffff",
    headerBg: "#8A6A3F",
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
    direccion: "Barrio Norte, Calle Principal #123",
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
    direccion: "Av. Central s/n, Parque Industrial Zona Norte",
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
    direccion: "Calle Bolívar #456, Barrio El Palmar, 3er Anillo",
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
    direccion: "Comunidad El Motacú, km 12 carretera a San Ramón",
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
    direccion: "Av. Las Palmas #890, Urb. Los Mangales, 4to Anillo",
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
    direccion: "Plaza Principal s/n, oficina municipal piso 2",
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
    direccion: "Parque Industrial Latinoamericano, Módulo 14-B",
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
    direccion: "Finca Agroecológica Vásquez, km 5 vía San Javier–Concepción",
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
    direccion: "Calle Sucre #12, Barrio San Martín",
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
    direccion: "Av. Roca y Coronado #320, Barrio Industrial",
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
    direccion: "Comunidad Turubó Este, acceso por km 28 ruta San Ignacio",
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
    direccion: "Plaza 31 de Julio s/n, frente a la Catedral",
    productos: ["Almendra Chiquitana", "Miel de Monte", "Asaí", "Coquito"],
    descripcion:
      "Feria permanente con más de 20 productores locales. Abierto viernes y sábados.",
  },
];
