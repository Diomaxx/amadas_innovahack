import type { APIRequestContext } from "@playwright/test";
import { ADMIN, USER, buildAccessToken } from "./auth";

/**
 * Helpers para hablar con la API del backend directamente desde los tests
 * (verificación de efectos y cleanup), usando los tokens de test "e2e.*".
 */
export const API_BASE = "http://localhost:3001/api";

export const adminToken = () => buildAccessToken(ADMIN);
export const userToken = () => buildAccessToken(USER);

const authHeader = (token: string) => ({ Authorization: `Bearer ${token}` });

/** Primer producto del catálogo (para navegar a su detalle). */
export async function firstProducto(request: APIRequestContext) {
  const res = await request.get(`${API_BASE}/productos?limit=1`);
  const body = await res.json();
  return body.data[0] as { id: string; slug: string; nombre: string };
}

/** Borra (admin) todas las recetas cuyo nombre contenga `marca`. */
export async function deleteRecetasByMarca(
  request: APIRequestContext,
  marca: string,
) {
  const res = await request.get(
    `${API_BASE}/recetas?search=${encodeURIComponent(marca)}&limit=100`,
  );
  const body = await res.json();
  for (const receta of body.data ?? []) {
    await request.delete(`${API_BASE}/recetas/${receta.id}`, {
      headers: authHeader(adminToken()),
    });
  }
}

/** Borra las suscripciones del usuario de test. */
export async function clearSuscripciones(request: APIRequestContext) {
  const res = await request.get(`${API_BASE}/suscripciones`, {
    headers: authHeader(userToken()),
  });
  const body = await res.json();
  for (const sub of body.data ?? body ?? []) {
    await request.delete(`${API_BASE}/suscripciones/${sub.id}`, {
      headers: authHeader(userToken()),
    });
  }
}
