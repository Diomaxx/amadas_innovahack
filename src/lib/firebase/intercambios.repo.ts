import { addDoc, collection } from "firebase/firestore";
import { db } from "./client";
import type { Intercambio } from "@/screens/Intercambio/intercambio.types";
import {
  COLLECTIONS,
  getById,
  listAll,
  remove,
  subscribeAll,
  upsert,
  type FromDoc,
} from "./repository";

const fromDoc: FromDoc<Intercambio> = (snap) => {
  const data = snap.data();
  return { ...(data as Omit<Intercambio, "id">), id: snap.id };
};

// Sin orderBy: el orden (más recientes primero) se resuelve en el cliente
// para no exigir que todos los documentos tengan el campo createdAt.
export function subscribeIntercambios(
  onData: (items: Intercambio[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.intercambios, fromDoc, onData, onError);
}

export function listIntercambios() {
  return listAll(COLLECTIONS.intercambios, fromDoc);
}

export function getIntercambioById(id: string) {
  return getById<Intercambio>(COLLECTIONS.intercambios, id, (docId, data) => ({
    ...(data as Omit<Intercambio, "id">),
    id: docId,
  }));
}

/** Upsert con id fijo (usado por el seeding). */
export function saveIntercambio(intercambio: Intercambio) {
  const { id, ...rest } = intercambio;
  return upsert(COLLECTIONS.intercambios, id, rest);
}

/** Crea una publicación nueva con id autogenerado. Devuelve el id creado. */
export async function createIntercambio(
  intercambio: Omit<Intercambio, "id">,
): Promise<string> {
  const ref = await addDoc(collection(db, COLLECTIONS.intercambios), intercambio);
  return ref.id;
}

export function deleteIntercambio(id: string) {
  return remove(COLLECTIONS.intercambios, id);
}
