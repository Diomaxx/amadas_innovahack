import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "./client";
import { ensureUserProfile } from "./firestore";

export function registerWithEmail(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginWithEmail(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

// Provider reutilizable. `select_account` hace que Google muestre siempre el
// selector de cuenta en lugar de reusar la última sesión de forma silenciosa.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

/**
 * Inicia sesión con Google mediante popup y asegura el perfil del usuario en
 * Firestore. La creación del perfil es tolerante a fallos: si Firestore falla
 * no rompe el login (el usuario ya quedó autenticado).
 */
export async function loginWithGoogle() {
  const credential = await signInWithPopup(auth, googleProvider);

  try {
    await ensureUserProfile(
      credential.user.uid,
      credential.user.email ?? "",
    );
  } catch (error) {
    console.error("No se pudo crear el perfil del usuario:", error);
  }

  return credential;
}

export function logout() {
  return signOut(auth);
}

export function observeAuthState(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
