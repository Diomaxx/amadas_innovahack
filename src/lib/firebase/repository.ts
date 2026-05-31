import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  type QueryConstraint,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./client";

/** Nombres de las colecciones de Firestore (fuente única de verdad). */
export const COLLECTIONS = {
  publicaciones: "publicaciones",
  contactos: "contactos",
  productos: "productos",
  recetas: "recetas",
  actividad: "actividad",
  menus: "menus",
  intercambios: "intercambios",
  users: "users",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

/** Mapea un snapshot de documento al tipo de dominio (incluye el id del doc). */
export type FromDoc<T> = (snap: QueryDocumentSnapshot<DocumentData>) => T;

/**
 * Lee todos los documentos de una colección (una sola vez).
 * `constraints` permite ordenar/filtrar (ej. `orderBy("fecha", "desc")`).
 */
export async function listAll<T>(
  name: CollectionName,
  fromDoc: FromDoc<T>,
  constraints: QueryConstraint[] = [],
): Promise<T[]> {
  const ref = collection(db, name);
  const snap = await getDocs(
    constraints.length ? query(ref, ...constraints) : query(ref),
  );
  return snap.docs.map(fromDoc);
}

/**
 * Suscripción en tiempo real a una colección. Devuelve la función para
 * cancelar la suscripción (`unsubscribe`).
 */
export function subscribeAll<T>(
  name: CollectionName,
  fromDoc: FromDoc<T>,
  onData: (items: T[]) => void,
  onError?: (error: Error) => void,
  constraints: QueryConstraint[] = [],
): () => void {
  const ref = collection(db, name);
  const q = constraints.length ? query(ref, ...constraints) : query(ref);
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map(fromDoc)),
    (error) => onError?.(error),
  );
}

/**
 * Elimina recursivamente las claves con valor `undefined`. Firestore rechaza
 * documentos con campos `undefined`, y muchos de nuestros tipos los tienen
 * como opcionales (ej. `imageSrc?`, `organizacion?`).
 */
function stripUndefined<V>(value: V): V {
  if (Array.isArray(value)) {
    return value.map((item) => stripUndefined(item)) as unknown as V;
  }
  if (value && typeof value === "object") {
    const out: DocumentData = {};
    for (const [key, val] of Object.entries(value as DocumentData)) {
      if (val !== undefined) out[key] = stripUndefined(val);
    }
    return out as unknown as V;
  }
  return value;
}

/**
 * Crea o actualiza (merge) un documento con id explícito. Se usa el id de
 * dominio como id del documento para conservar referencias entre datos.
 */
export async function upsert(
  name: CollectionName,
  id: string,
  data: DocumentData,
): Promise<void> {
  await setDoc(doc(db, name, id), stripUndefined(data), { merge: true });
}

/** Elimina un documento por id. */
export async function remove(name: CollectionName, id: string): Promise<void> {
  await deleteDoc(doc(db, name, id));
}

/**
 * Lee un documento por id (una sola vez). Devuelve `null` si no existe.
 * `map` recibe el id del documento y sus datos crudos para construir el tipo.
 */
export async function getById<T>(
  name: CollectionName,
  id: string,
  map: (docId: string, data: DocumentData) => T,
): Promise<T | null> {
  const snap = await getDoc(doc(db, name, id));
  if (!snap.exists()) return null;
  return map(snap.id, snap.data());
}

export { orderBy };
