"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { User } from "@supabase/supabase-js";
import { observeAuthState } from "@/lib/supabase/auth";
import { getMe, type AppUser } from "@/lib/api/endpoints";

/**
 * Sesión global de la app.
 * - `user`: usuario de Supabase Auth (identidad; null si no hay sesión).
 * - `appUser`: registro de la tabla `users` del backend — fuente de verdad
 *   del rol (`admin`) y del perfil. Se carga vía GET /auth/me al haber sesión.
 * - `isAdmin`: derivado de `appUser.role` (ya no de emails en el cliente).
 */
type AuthContextValue = {
  user: User | null;
  appUser: AppUser | null;
  isAdmin: boolean;
  loading: boolean;
  refreshAppUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  appUser: null,
  isAdmin: false,
  loading: true,
  refreshAppUser: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAppUser = useCallback(async () => {
    try {
      const { user: me } = await getMe();
      setAppUser(me);
    } catch {
      // Backend caído o token aún no listo: la sesión sigue siendo válida,
      // solo queda sin datos de rol/perfil (isAdmin=false por defecto).
      setAppUser(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = observeAuthState((nextUser) => {
      setUser(nextUser);

      if (!nextUser) {
        setAppUser(null);
        setLoading(false);
        return;
      }

      void (async () => {
        await refreshAppUser();
        setLoading(false);
      })();
    });

    return unsubscribe;
  }, [refreshAppUser]);

  const value = useMemo(
    () => ({
      user,
      appUser,
      isAdmin: appUser?.role === "admin",
      loading,
      refreshAppUser,
    }),
    [user, appUser, loading, refreshAppUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
