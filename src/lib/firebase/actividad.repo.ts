import { addDoc, collection } from "firebase/firestore";
import { db } from "./client";
import type {
  ActividadEntry,
  CategoriaActividad,
  TipoAccion,
} from "@/screens/Admin/Actividad/actividad.types";
import {
  COLLECTIONS,
  listAll,
  orderBy,
  subscribeAll,
  type FromDoc,
} from "./repository";

const fromDoc: FromDoc<ActividadEntry> = (snap) => {
  const data = snap.data();
  return { ...(data as Omit<ActividadEntry, "id">), id: snap.id };
};

// Orden por marca temporal numérica (epoch ms) descendente: lo más reciente
// primero, con desempate estable dentro de un mismo día.
const ORDER = [orderBy("createdAt", "desc")];

export function subscribeActividad(
  onData: (items: ActividadEntry[]) => void,
  onError?: (e: Error) => void,
) {
  return subscribeAll(COLLECTIONS.actividad, fromDoc, onData, onError, ORDER);
}

export function listActividad() {
  return listAll(COLLECTIONS.actividad, fromDoc, ORDER);
}

/** Fecha de hoy en formato "YYYY-MM-DD" (zona local). */
function hoyISO(): string {
  const d = new Date();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export type NuevaActividad = {
  titulo: string;
  descripcion: string;
  accion: TipoAccion;
  categoria?: CategoriaActividad;
  autor?: string;
};

/**
 * Registra una entrada de actividad. Pensado para llamarse después de cada
 * operación CRUD del panel. Tolerante a fallos: si Firestore rechaza la
 * escritura, no interrumpe la acción principal (solo loguea el error).
 */
export async function logActividad(entrada: NuevaActividad): Promise<void> {
  try {
    await addDoc(collection(db, COLLECTIONS.actividad), {
      titulo: entrada.titulo,
      descripcion: entrada.descripcion,
      accion: entrada.accion,
      categoria: entrada.categoria ?? "sistema",
      autor: entrada.autor ?? "Admin",
      fecha: hoyISO(),
      createdAt: Date.now(),
    });
  } catch (error) {
    console.error("No se pudo registrar la actividad:", error);
  }
}
