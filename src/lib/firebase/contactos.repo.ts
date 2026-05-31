import type { Contacto } from "@/screens/Admin/Contactos/contactos.types";
import {
  COLLECTIONS,
  listAll,
  orderBy,
  remove,
  subscribeAll,
  upsert,
  type FromDoc,
} from "./repository";

const fromDoc: FromDoc<Contacto> = (snap) => {
  const data = snap.data();
  return { ...(data as Omit<Contacto, "id">), id: snap.id };
};

const ORDER = [orderBy("nombre")];

export function subscribeContactos(
  onData: (items: Contacto[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.contactos, fromDoc, onData, onError, ORDER);
}

export function listContactos() {
  return listAll(COLLECTIONS.contactos, fromDoc, ORDER);
}

export function saveContacto(contacto: Contacto) {
  const { id, ...rest } = contacto;
  return upsert(COLLECTIONS.contactos, id, rest);
}

export function deleteContacto(id: string) {
  return remove(COLLECTIONS.contactos, id);
}
