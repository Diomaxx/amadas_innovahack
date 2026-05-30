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
