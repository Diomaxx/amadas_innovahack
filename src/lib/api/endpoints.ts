import { api } from "./client";

/**
 * Helpers tipados sobre los endpoints que expone el backend NestJS.
 * A medida que el backend crezca (productos, contactos, menús, etc.) se van
 * agregando funciones aquí, agrupadas por recurso.
 */

// ---------------------------------------------------------------------------
// Health / info (públicos)
// ---------------------------------------------------------------------------

export type HealthResponse = {
  status: "ok";
  service: string;
  database: "connected";
  timestamp: string;
};

/** GET /api/health — verifica que el backend y la DB responden. */
export function getHealth() {
  return api.get<HealthResponse>("/health", { auth: false });
}

// ---------------------------------------------------------------------------
// Auth / usuario (protegidos con Bearer de Supabase)
// ---------------------------------------------------------------------------

export type AppRole = "user" | "admin";

export type ProducerProfile = {
  user_id: string;
  actor_type: string;
  contact_name: string;
  community: string | null;
  message: string | null;
  selected_product_keys: string[];
  truth_confirmed: boolean;
  fan_contact_authorized: boolean;
  public_review_authorized: boolean;
  editorial_authorized: boolean;
  share_contact_authorized: boolean;
};

export type GastronomicProfile = {
  user_id: string;
  actor_type: string;
  contact_name: string;
  restaurant_name: string | null;
  city: string | null;
  selected_product_keys: string[];
  cuisine_types: string[];
  product_categories: string[];
  communication_channels: string[];
  alert_types: string[];
};

/** Registro de la tabla `users` (fuente de verdad del rol) + relaciones. */
export type AppUser = {
  id: string;
  email: string;
  nombre: string | null;
  telefono: string | null;
  role: AppRole;
  contacto_id: string | null;
  acepta_editorial: boolean;
  acepta_revision_publica: boolean;
  acepta_veracidad: boolean;
  compartir_contacto: boolean;
  contactar_fan: boolean;
  producer_profile: ProducerProfile | null;
  gastronomic_profile: GastronomicProfile | null;
  contacto: Record<string, unknown> | null;
  usos_perfil: Array<{ uso: { id: number; nombre: string } }>;
};

/** GET /api/auth/me — usuario de la DB con rol y perfil. */
export function getMe() {
  return api.get<{ user: AppUser | null }>("/auth/me");
}

/** Payload de POST /api/auth/register (calza con los wizards). */
export type RegisterPayload = {
  perfil: "productor" | "gastronomico";
  nombre: string;
  actorType: string;
  contactName: string;
  telefono?: string;
  organizacion?: string;
  ubicacion?: string;
  comunidad?: string;
  mensaje?: string;
  productos?: string[];
  usos?: string[];
  autorizaciones?: {
    truth?: boolean;
    contactFan?: boolean;
    publicReview?: boolean;
    editorial?: boolean;
    shareContact?: boolean;
  };
  compartirContacto?: boolean;
  cocina?: string[];
  categorias?: string[];
  comunicacion?: string[];
  alertas?: string[];
};

/** POST /api/auth/register — persiste el perfil del wizard en Postgres. */
export function registerProfile(payload: RegisterPayload) {
  return api.post<{ user: AppUser }>("/auth/register", payload);
}

/** PATCH /api/users/me — edición del perfil propio. */
export function updateMe(payload: {
  nombre?: string;
  telefono?: string;
  aceptaEditorial?: boolean;
  aceptaRevisionPublica?: boolean;
  aceptaVeracidad?: boolean;
  compartirContacto?: boolean;
  contactarFan?: boolean;
}) {
  return api.patch<{ user: AppUser }>("/users/me", payload);
}
