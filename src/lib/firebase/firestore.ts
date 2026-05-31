import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./client";

/**
 * Roles de la red. `user`/`admin` provienen del login básico; `productor` y
 * `restaurante` se asignan al completar cada wizard de registro.
 */
export type AppRole = "user" | "admin" | "productor" | "restaurante";

export type AppUserProfile = {
  uid: string;
  email: string;
  role: AppRole;
  createdAt?: Timestamp;
};

/** Quita claves con valor `undefined`: Firestore las rechaza. */
function stripUndefined(data: Record<string, unknown>) {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) out[key] = value;
  }
  return out;
}

/**
 * Crea o actualiza (merge) el perfil de un usuario recién registrado con su
 * rol (`productor`/`restaurante`) y los datos recogidos en el wizard. Usa
 * `merge` para no pisar campos previos si el documento ya existía (ej. un
 * perfil creado antes por el login). Los nombres de campo (`nombre`, `tipo`,
 * `telefono`, `email`, `ubicacion`, `productos`...) coinciden con los que lee
 * `users.repo.ts`, para que el registro aparezca también en el panel de
 * Contactos del admin.
 */
export async function createRegistrationProfile(
  uid: string,
  profile: { email: string; role: AppRole } & Record<string, unknown>,
) {
  const userRef = doc(db, "users", uid);
  await setDoc(
    userRef,
    stripUndefined({ uid, createdAt: serverTimestamp(), ...profile }),
    { merge: true },
  );
}

export async function createUserProfile(uid: string, email: string) {
  const userRef = doc(db, "users", uid);

  await setDoc(
    userRef,
    {
      uid,
      email,
      role: "user",
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
}

export async function getUserProfile(uid: string) {
  const userRef = doc(db, "users", uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as AppUserProfile;
}

/**
 * Crea el perfil del usuario solo si aún no existe. A diferencia de
 * `createUserProfile`, no reescribe campos (no degrada un `role: "admin"`
 * a `"user"` en logins repetidos). Pensado para flujos donde el mismo
 * método sirve para alta y reingreso, como el login con Google.
 */
export async function ensureUserProfile(uid: string, email: string) {
  const existing = await getUserProfile(uid);
  if (existing) {
    return existing;
  }

  const userRef = doc(db, "users", uid);
  await setDoc(userRef, {
    uid,
    email,
    role: "user",
    createdAt: serverTimestamp(),
  });

  return null;
}
