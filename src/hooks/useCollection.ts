"use client";

import { useEffect, useState } from "react";

type SubscribeFn<T> = (
  onData: (items: T[]) => void,
  onError: (error: Error) => void,
) => () => void;

export type UseCollectionResult<T> = {
  data: T[];
  loading: boolean;
  error: Error | null;
};

/**
 * Suscribe un componente a una colección de Firestore en tiempo real.
 * `subscribe` debe ser una referencia estable (las funciones `subscribeX`
 * de los repositorios lo son, al estar definidas a nivel de módulo).
 */
export function useCollection<T>(
  subscribe: SubscribeFn<T>,
): UseCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribe(
      (items) => {
        setData(items);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [subscribe]);

  return { data, loading, error };
}
