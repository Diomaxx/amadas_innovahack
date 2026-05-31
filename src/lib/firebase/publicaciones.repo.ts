import type {
  Publicacion,
  EstadoPublicacion,
} from "@/screens/Admin/Publicaciones/publicaciones.types";
import {
  COLLECTIONS,
  listAll,
  orderBy,
  remove,
  subscribeAll,
  upsert,
  type FromDoc,
} from "./repository";

const fromDoc: FromDoc<Publicacion> = (snap) => {
  const data = snap.data();
  return { ...(data as Omit<Publicacion, "id">), id: snap.id };
};

const ORDER = [orderBy("fecha", "desc")];

export function subscribePublicaciones(
  onData: (items: Publicacion[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.publicaciones, fromDoc, onData, onError, ORDER);
}

export function listPublicaciones() {
  return listAll(COLLECTIONS.publicaciones, fromDoc, ORDER);
}

export function savePublicacion(pub: Publicacion) {
  const { id, ...rest } = pub;
  return upsert(COLLECTIONS.publicaciones, id, rest);
}

export function setEstadoPublicacion(id: string, estado: EstadoPublicacion) {
  return upsert(COLLECTIONS.publicaciones, id, { estado });
}

export function deletePublicacion(id: string) {
  return remove(COLLECTIONS.publicaciones, id);
}
