"use client";

import { useCallback, useEffect, useState } from "react";

export type UseApiCollectionResult<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
  /** Vuelve a pedir los datos (tras crear/editar/borrar). */
  refetch: () => Promise<void>;
};

/**
 * Reemplazo de `useCollection` (Firestore realtime) para la API del backend:
 * fetch al montar + `refetch()` manual tras cada mutación.
 *
 * `fetcher` debe ser una referencia estable (función a nivel de módulo o
 * memoizada), igual que se exigía con los `subscribeX` de Firestore.
 */
export function useApiCollection<T>(
  fetcher: () => Promise<T[]>,
): UseApiCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    try {
      const items = await fetcher();
      setData(items);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    // En microtask para cumplir react-hooks/set-state-in-effect (los
    // setState de `load` ocurren tras el await, nunca síncronos).
    void Promise.resolve().then(load);
  }, [load]);

  return { data, loading, error, refetch: load };
}
