import { PUBLICACIONES_MOCK } from "@/screens/Admin/Publicaciones/publicaciones.data";
import { CONTACTOS_MOCK } from "@/screens/Admin/Contactos/contactos.data";
import type { Contacto } from "@/screens/Admin/Contactos/contactos.types";
import { PRODUCTOS_INICIALES } from "@/screens/Admin/Temporada/temporada.data";
import { RECETAS } from "@/screens/Recetas/recetas.data";
import { ACTIVIDADES_MOCK } from "@/screens/Admin/Actividad/actividad.data";
import menusData from "@/mocks/menus.json";
import type { Menu } from "@/screens/Menus/menus.types";
import intercambioData from "@/mocks/intercambioData.json";
import type { Intercambio } from "@/screens/Intercambio/intercambio.types";

import { savePublicacion } from "./publicaciones.repo";
import { saveProducto } from "./productos.repo";
import { saveReceta } from "./recetas.repo";
import { saveMenu } from "./menus.repo";
import { saveIntercambio } from "./intercambios.repo";
import { COLLECTIONS, upsert } from "./repository";

export type SeedResult = Record<string, number>;

/**
 * Usuarios de la red. Se construyen a partir de los contactos mock (cada
 * contacto es un usuario) más algunos sumados a mano. Se siembran en la
 * colección `users` (la misma de Firebase Auth); la pantalla de Contactos
 * del panel lee de ahí.
 */
const DONA_ROSA: Contacto = {
  id: "donia-rosa",
  nombre: "Doña Rosa",
  tipo: "productor",
  organizacion: "Productora independiente",
  telefono: "+591 7654-3210",
  email: "dona.rosa@ejemplo.com",
  ubicacion: "Concepción",
  direccion: "Comunidad rural, camino a Concepción",
  productos: ["Almendra Chiquitana"],
  descripcion:
    "Productora de almendra chiquitana. Recolección artesanal y sostenible.",
};

const USUARIOS_SEED: Contacto[] = [...CONTACTOS_MOCK, DONA_ROSA];

/**
 * Genera un uid válido (estilo Firebase: 28 caracteres alfanuméricos) y
 * determinista a partir de una clave. Determinista = re-sembrar no duplica.
 */
function uidFor(key: string): string {
  const base = `almaseed${key}`.replace(/[^a-zA-Z0-9]/g, "");
  return (base + "0".repeat(28)).slice(0, 28);
}

/**
 * Siembra las colecciones de Firestore con los datos mock del proyecto.
 * Se ejecuta desde el navegador con un usuario administrador autenticado, de
 * modo que las reglas de seguridad permitan la escritura (no requiere
 * service-account). Es idempotente: usa los ids existentes y hace merge.
 */
export async function seedAll(): Promise<SeedResult> {
  await Promise.all(PUBLICACIONES_MOCK.map((p) => savePublicacion(p)));
  await Promise.all(
    USUARIOS_SEED.map((u) => {
      const uid = uidFor(u.id);
      const { id: _id, ...rest } = u;
      return upsert(COLLECTIONS.users, uid, { ...rest, uid, role: "user" });
    }),
  );
  await Promise.all(PRODUCTOS_INICIALES.map((p) => saveProducto(p)));
  await Promise.all(RECETAS.map((r) => saveReceta(r)));
  await Promise.all((menusData as Menu[]).map((m) => saveMenu(m)));

  const intercambios = (intercambioData.intercambios as Intercambio[]);
  await Promise.all(
    intercambios.map((it, index) =>
      saveIntercambio({ ...it, createdAt: 1_700_000_000_000 + (intercambios.length - index) }),
    ),
  );

  // La actividad necesita una marca temporal numérica para ordenar. La
  // derivamos de la fecha del mock y desempatamos por la posición original
  // (el mock viene del más reciente al más antiguo).
  const total = ACTIVIDADES_MOCK.length;
  await Promise.all(
    ACTIVIDADES_MOCK.map((a, index) => {
      const { id, ...rest } = a;
      const createdAt =
        Date.parse(`${a.fecha}T00:00:00`) + (total - index);
      return upsert(COLLECTIONS.actividad, id, { ...rest, createdAt });
    }),
  );

  return {
    publicaciones: PUBLICACIONES_MOCK.length,
    usuarios: USUARIOS_SEED.length,
    productos: PRODUCTOS_INICIALES.length,
    recetas: RECETAS.length,
    actividad: ACTIVIDADES_MOCK.length,
    menus: (menusData as Menu[]).length,
    intercambios: intercambios.length,
  };
}
