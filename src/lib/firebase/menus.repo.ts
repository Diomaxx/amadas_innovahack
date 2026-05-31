import type { Menu } from "@/screens/Menus/menus.types";
import {
  COLLECTIONS,
  getById,
  listAll,
  remove,
  subscribeAll,
  upsert,
  type FromDoc,
} from "./repository";

const fromDoc: FromDoc<Menu> = (snap) => {
  const data = snap.data();
  return { ...(data as Omit<Menu, "id">), id: snap.id };
};

// Sin orderBy: el orden de negocio (destacados primero, luego por fecha) se
// resuelve en el cliente para no requerir índices compuestos.
export function subscribeMenus(
  onData: (items: Menu[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.menus, fromDoc, onData, onError);
}

export function listMenus() {
  return listAll(COLLECTIONS.menus, fromDoc);
}

export function getMenuById(id: string) {
  return getById<Menu>(COLLECTIONS.menus, id, (docId, data) => ({
    ...(data as Omit<Menu, "id">),
    id: docId,
  }));
}

export function saveMenu(menu: Menu) {
  const { id, ...rest } = menu;
  return upsert(COLLECTIONS.menus, id, rest);
}

export function deleteMenu(id: string) {
  return remove(COLLECTIONS.menus, id);
}
