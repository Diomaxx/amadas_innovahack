import type { ProductoTemporada } from "@/screens/Admin/Temporada/temporada.types";
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

const fromDoc: FromDoc<ProductoTemporada> = (snap) => {
  const data = snap.data();
  return { ...(data as Omit<ProductoTemporada, "id">), id: snap.id };
};

const ORDER = [orderBy("nombre")];

export function subscribeProductos(
  onData: (items: ProductoTemporada[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.productos, fromDoc, onData, onError, ORDER);
}

export function listProductos() {
  return listAll(COLLECTIONS.productos, fromDoc, ORDER);
}

export function saveProducto(producto: ProductoTemporada) {
  const { id, ...rest } = producto;
  return upsert(COLLECTIONS.productos, id, rest);
}

export function deleteProducto(id: string) {
  return remove(COLLECTIONS.productos, id);
}

export function getProductoById(id: string) {
  return getById<ProductoTemporada>(COLLECTIONS.productos, id, (docId, data) => ({
    ...(data as Omit<ProductoTemporada, "id">),
    id: docId,
  }));
}
