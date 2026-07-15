import { getAccessToken } from "@/lib/supabase/client";

/**
 * Cliente HTTP para hablar con la API de NestJS (alma-platform-backend).
 *
 * - Base URL desde `NEXT_PUBLIC_API_URL` (ej. http://localhost:3001/api).
 * - Adjunta automáticamente `Authorization: Bearer <supabase access token>`
 *   cuando hay sesión, salvo que se pase `auth: false`.
 * - Parsea JSON y lanza `ApiError` con el status y el cuerpo del error.
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Falta la variable de entorno NEXT_PUBLIC_API_URL.");
}

/** Base sin barra final, para concatenar rutas de forma predecible. */
const BASE_URL = API_URL.replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly body?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  /** Cuerpo JSON; se serializa y setea el Content-Type automáticamente. */
  json?: unknown;
  /** Adjuntar el token de Supabase. Por defecto `true`. */
  auth?: boolean;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { json, auth = true, headers, ...rest } = options;

  const finalHeaders = new Headers(headers);

  if (json !== undefined) {
    finalHeaders.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = await getAccessToken();
    if (token) {
      finalHeaders.set("Authorization", `Bearer ${token}`);
    }
  }

  const url = `${BASE_URL}/${path.replace(/^\/+/, "")}`;

  const response = await fetch(url, {
    ...rest,
    headers: finalHeaders,
    body: json !== undefined ? JSON.stringify(json) : undefined,
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      (isJson &&
        payload &&
        typeof payload === "object" &&
        "message" in payload &&
        String((payload as { message: unknown }).message)) ||
      `Error ${response.status} en ${path}`;
    throw new ApiError(response.status, message, payload);
  }

  return payload as T;
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(path: string, json?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "POST", json }),
  put: <T>(path: string, json?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PUT", json }),
  patch: <T>(path: string, json?: unknown, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "PATCH", json }),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>(path, { ...options, method: "DELETE" }),
};
