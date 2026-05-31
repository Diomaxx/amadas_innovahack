import type { Receta } from "@/screens/Recetas/recetas.types";
import {
  COLLECTIONS,
  getById,
  listAll,
  orderBy,
  remove,
  subscribeAll,
  upsert,
  type FromDoc,
} from "./repository";

/**
 * El id de dominio de `Receta` es numérico, pero el id del documento es string.
 * Usamos `String(id)` como id del documento y restauramos el número al leer.
 */
const fromDoc: FromDoc<Receta> = (snap) => {
  const data = snap.data() as Omit<Receta, "id">;
  return { ...data, id: Number.parseInt(snap.id, 10) };
};

const ORDER = [orderBy("nombre")];

export function subscribeRecetas(
  onData: (items: Receta[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.recetas, fromDoc, onData, onError, ORDER);
}

export function listRecetas() {
  return listAll(COLLECTIONS.recetas, fromDoc, ORDER);
}

export function saveReceta(receta: Receta) {
  const { id, ...rest } = receta;
  return upsert(COLLECTIONS.recetas, String(id), { ...rest, id });
}

export function deleteReceta(id: number) {
  return remove(COLLECTIONS.recetas, String(id));
}

export function getRecetaById(id: string | number) {
  return getById<Receta>(COLLECTIONS.recetas, String(id), (docId, data) => ({
    ...(data as Omit<Receta, "id">),
    id: Number.parseInt(docId, 10),
  }));
}
