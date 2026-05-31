import type { Contacto, TipoContacto } from "@/screens/Admin/Contactos/contactos.types";
import {
  COLLECTIONS,
  listAll,
  remove,
  subscribeAll,
  upsert,
  type FromDoc,
} from "./repository";

/**
 * La pantalla de Contactos se nutre de la colección `users` (la misma que
 * gestiona Firebase Auth). Un "contacto" es la vista de un usuario de la red.
 *
 * Los documentos creados por login real solo traen { uid, email, role }, así
 * que mapeamos con valores por defecto para que también se muestren sin
 * romper las tarjetas. Los perfiles sembrados traen los campos completos.
 *
 * No se usa `orderBy("nombre")` a propósito: Firestore excluiría los
 * documentos que no tienen ese campo (los de login real).
 */
const TIPOS_VALIDOS: TipoContacto[] = [
  "productor",
  "asociacion",
  "tienda",
  "proveedor",
];

const fromDoc: FromDoc<Contacto> = (snap) => {
  const data = snap.data() as Record<string, unknown>;
  const email = typeof data.email === "string" ? data.email : undefined;
  const tipoRaw = data.tipo as TipoContacto | undefined;
  const tipo = tipoRaw && TIPOS_VALIDOS.includes(tipoRaw) ? tipoRaw : "productor";
  const nombre =
    (typeof data.nombre === "string" && data.nombre) ||
    (email ? email.split("@")[0] : "Usuario");

  return {
    id: snap.id,
    nombre,
    tipo,
    organizacion: data.organizacion as string | undefined,
    telefono: data.telefono as string | undefined,
    email,
    ubicacion: data.ubicacion as string | undefined,
    direccion: data.direccion as string | undefined,
    productos: data.productos as string[] | undefined,
    descripcion: data.descripcion as string | undefined,
  };
};

export function subscribeUsuarios(
  onData: (items: Contacto[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.users, fromDoc, onData, onError);
}

export function listUsuarios() {
  return listAll(COLLECTIONS.users, fromDoc);
}

/** Upsert (merge) de un perfil de usuario con los campos de contacto. */
export function saveUsuario(usuario: Contacto) {
  const { id, ...rest } = usuario;
  return upsert(COLLECTIONS.users, id, rest);
}

export function deleteUsuario(id: string) {
  return remove(COLLECTIONS.users, id);
}
