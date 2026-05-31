"use client";

import { useEffect, useState } from "react";
import { UNIFIED_LOADING_MS } from "@/lib/loading";

export function useUnifiedLoading(delayMs: number = UNIFIED_LOADING_MS): boolean {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [delayMs]);

  return isLoading;
}
