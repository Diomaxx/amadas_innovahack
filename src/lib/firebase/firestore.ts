import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type Timestamp,
} from "firebase/firestore";
import { db } from "./client";

export type AppUserProfile = {
  uid: string;
  email: string;
  role: "user" | "admin";
  createdAt?: Timestamp;
};

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
