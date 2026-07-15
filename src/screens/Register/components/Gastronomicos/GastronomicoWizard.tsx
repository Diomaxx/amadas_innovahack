"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  CircleHelp,
  CalendarDays,
  ChefHat,
  BellOff,
  Eye,
  EyeOff,
  Mail,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { mensajeErrorSupabase, registerWithEmail } from "@/lib/supabase/auth";
import { registerProfile } from "@/lib/api/endpoints";
import { StyledSelect } from "@/components/UI/StyledSelect";

type StepId = 1 | 2 | 3 | 4;

type IdentityField =
  | "name"
  | "actorType"
  | "contactName"
  | "phone"
  | "email"
  | "city"
  | "restaurant";

const ACTOR_TYPES = [
  "Restaurante",
  "Chef / Cocinero",
  "Catering",
  "Emprendimiento gastronómico",
  "Otro",
];

const CUISINE_TYPES = ["Cocina Salada", "Cocina Dulce", "Mixología", "Conservas y Fermentos", "Panadería"];

const PRODUCT_CATEGORIES = [
  "Frutos Silvestres",
  "Mieles y Néctares",
  "Semillas y Granos",
  "Raíces",
  "Hierbas Aromáticas",
];

const COMMUNICATION_CHANNELS = ["WhatsApp", "Correo", "Sin alertas"] as const;

const PRODUCTS = [
  { id: "almendra", label: "Almendra Chiquitana", icon: Sparkles },
  { id: "miel", label: "Miel de Abeja Melipona", icon: ShieldCheck },
  { id: "achachairu", label: "Fruto de Achachairú", icon: CircleHelp },
  { id: "harina", label: "Harina de Algarrobo", icon: BookOpenText },
  { id: "vainilla", label: "Vainilla de Bosque", icon: CalendarDays },
  { id: "copoazu", label: "Copoazú", icon: ChefHat },
  { id: "totai", label: "Totai", icon: Sparkles },
  { id: "motacu", label: "Motacú", icon: UtensilsCrossed },
  { id: "cusi", label: "Cusi", icon: CircleHelp },
];

const REVIEW_STEPS = [
  {
    title: "Se acerca",
    description: "Aviso preventivo 3 días antes de un hito estacional o de cosecha.",
  },
  {
    title: "Ya inició",
    description: "Confirmación inmediata cuando el ciclo natural ha comenzado oficialmente.",
  },
  {
    title: "Está por terminar",
    description: "Último recordatorio antes de que la ventana de oportunidad se cierre.",
  },
];

const identityDefaults = {
  name: "",
  actorType: "",
  contactName: "",
  phone: "",
  email: "",
  city: "",
  restaurant: "",
};

function fieldError(value: string, label: string) {
  return value.trim() ? "" : `Completa ${label.toLowerCase()}.`;
}

/** Traduce los errores de Supabase/backend durante el registro. */
function mensajeErrorRegistro(err: unknown): string {
  return (
    mensajeErrorSupabase(err) ??
    "No se pudo completar el registro. Intenta nuevamente."
  );
}

function stepDelay(index: number) {
  return 0.08 + index * 0.03;
}

export default function GastronomicoWizard() {
  const [step, setStep] = useState<StepId>(1);
  const [identity, setIdentity] = useState(identityDefaults);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedCuisine, setSelectedCuisine] = useState<string[]>(["Cocina Salada"]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["almendra", "miel"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [communication, setCommunication] = useState<Array<(typeof COMMUNICATION_CHANNELS)[number]>>(["WhatsApp"]);
  const [alerts, setAlerts] = useState<string[]>(["Ciclos de Siembra", "Periodos de Cosecha"]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const visibleProducts = PRODUCTS.filter((product) =>
    product.label.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function setIdentityField(field: IdentityField, value: string) {
    setIdentity((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function toggleValue(setter: React.Dispatch<React.SetStateAction<string[]>>, value: string, key?: string) {
    setter((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
    );
    if (key) {
      setErrors((current) => {
        if (!current[key]) return current;
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  function toggleCommunication(option: (typeof COMMUNICATION_CHANNELS)[number]) {
    setCommunication((current) => {
      if (option === "Sin alertas") {
        return current.length === 1 && current[0] === "Sin alertas" ? [] : ["Sin alertas"];
      }

      const withoutMuted = current.filter((value) => value !== "Sin alertas");
      return withoutMuted.includes(option)
        ? withoutMuted.filter((value) => value !== option)
        : [...withoutMuted, option];
    });

    setErrors((current) => {
      if (!current.communication) return current;
      const next = { ...current };
      delete next.communication;
      return next;
    });
  }

  async function goNext() {
    if (step === 1) {
      const nextErrors = {
        name: fieldError(identity.name, "el nombre completo"),
        actorType: fieldError(identity.actorType, "el tipo de perfil"),
        contactName: fieldError(identity.contactName, "la persona de contacto"),
        phone: fieldError(identity.phone, "el teléfono"),
        email: fieldError(identity.email, "el correo electrónico profesional"),
        password: !password.trim()
          ? "Crea una contraseña."
          : password.length < 6
            ? "La contraseña debe tener al menos 6 caracteres."
            : "",
      };

      const cleanErrors = Object.fromEntries(Object.entries(nextErrors).filter(([, value]) => value));
      setErrors(cleanErrors);

      if (Object.keys(cleanErrors).length === 0) setStep(2);
      return;
    }

    if (step === 2) {
      const nextErrors: Record<string, string> = {};
      if (selectedCuisine.length === 0) nextErrors.cuisine = "Selecciona al menos un uso gastronómico.";
      if (selectedCategories.length === 0) nextErrors.categories = "Selecciona al menos una categoría de producto.";
      if (selectedProducts.length === 0) nextErrors.products = "Selecciona al menos un producto de interés.";
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length === 0) setStep(3);
      return;
    }

    if (step === 3) {
      const nextErrors: Record<string, string> = {};
      if (communication.length === 0) nextErrors.communication = "Selecciona un canal de comunicación.";
      if (alerts.length === 0) nextErrors.alerts = "Selecciona al menos una alerta.";
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length === 0) await submitRegistration();
    }
  }

  async function submitRegistration() {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // 1) Cuenta en Supabase Auth; 2) perfil en Postgres vía backend.
      await registerWithEmail(identity.email, password);
      await registerProfile({
        perfil: "gastronomico",
        nombre: identity.name,
        organizacion: identity.restaurant || undefined,
        actorType: identity.actorType,
        contactName: identity.contactName,
        telefono: identity.phone || undefined,
        ubicacion: identity.city || undefined,
        productos: selectedProducts,
        cocina: selectedCuisine,
        categorias: selectedCategories,
        comunicacion: communication,
        alertas: alerts,
      });
      setStep(4);
    } catch (err) {
      setSubmitError(mensajeErrorRegistro(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-cv-cream-100 text-cv-gray-800">
      <header className="border-b border-cv-cream-300/80 bg-cv-cream-100/95">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-xl font-bold text-cv-green-900 transition-colors hover:text-cv-green-700">
            Calendario Vivo
          </Link>
          <Link href="/" className="text-sm font-medium text-cv-gray-600 transition-colors hover:text-cv-green-800">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(141,195,164,0.14),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(200,169,110,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_38%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section key="step-1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="mx-auto w-full max-w-5xl overflow-hidden rounded-[18px] border border-cv-gray-200 bg-white shadow-[0_16px_38px_rgba(20,41,31,0.08)]">
                <div className="flex flex-col border-b border-cv-gray-200 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="max-w-2xl">
                    <h1 className="font-display text-3xl font-bold leading-tight text-cv-green-900 sm:text-4xl">Crea tu perfil gastronómico</h1>
                    <p className="mt-1 text-sm text-cv-gray-600">Únete a la red que preserva los ciclos naturales y la excelencia en la trazabilidad del producto.</p>
                  </div>
                  <div className="mt-6 w-full max-w-[210px] lg:mt-1">
                    <ProgressLabel label="Paso 1 de 3" value="33% completado" progress={33} />
                  </div>
                </div>

                <div className="grid lg:grid-cols-[0.95fr_1.3fr]">
                  <div className="border-b border-cv-gray-200 bg-cv-cream-100/70 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="space-y-4">
                      <InfoCard icon={CalendarDays} title="Temporadas precisas">Accede a calendarios reales de cosecha ajustados a tu microclima local.</InfoCard>
                      <InfoCard icon={Sparkles} title="Inspiración técnica">Documentación detallada sobre variedades nativas y preparación orgánica.</InfoCard>
                      <InfoCard icon={UtensilsCrossed} title="Alertas de ciclo">Notificaciones preventivas sobre el momento óptimo de recolección.</InfoCard>
                      <figure className="overflow-hidden rounded-[16px] border border-cv-gray-200 bg-[linear-gradient(180deg,rgba(20,41,31,0.16),rgba(20,41,31,0.52)),url('https://images.unsplash.com/photo-1712143525667-717b146a141f?w=900&auto=format&fit=crop&q=60')] bg-cover bg-center shadow-sm">
                        <div className="flex min-h-[150px] items-end p-4">
                          <figcaption className="max-w-[16ch] text-sm font-medium text-cv-cream-50">Sabores del bosque para cocinas con identidad.</figcaption>
                        </div>
                      </figure>
                    </div>
                  </div>

                  <form className="p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Nombre completo *" error={errors.name} fullWidth>
                        <input value={identity.name} onChange={(event) => setIdentityField("name", event.target.value)} placeholder="Ej. Ana García" className={fieldInputClassName(Boolean(errors.name))} />
                      </Field>
                      <Field label="Nombre del restaurante *" error={errors.restaurant}>
                        <input value={identity.restaurant} onChange={(event) => setIdentityField("restaurant", event.target.value)} placeholder="Ej. El Huerto Vivo" className={fieldInputClassName(Boolean(errors.restaurant))} />
                      </Field>
                      <Field label="Tipo de perfil *" error={errors.actorType}>
                        <StyledSelect value={identity.actorType} onValueChange={(value) => setIdentityField("actorType", value)} options={ACTOR_TYPES} placeholder="Selecciona una opción" error={Boolean(errors.actorType)} />
                      </Field>
                      <Field label="Ciudad *" error={errors.city}>
                        <input value={identity.city} onChange={(event) => setIdentityField("city", event.target.value)} placeholder="Ej. Barcelona" className={fieldInputClassName(Boolean(errors.city))} />
                      </Field>
                      <Field label="Correo electrónico profesional *" error={errors.email} fullWidth>
                        <input value={identity.email} onChange={(event) => setIdentityField("email", event.target.value)} placeholder="ana.garcia@restaurante.com" className={fieldInputClassName(Boolean(errors.email))} />
                      </Field>
                      <Field label="Contraseña *" error={errors.password} fullWidth>
                        <PasswordField
                          value={password}
                          error={Boolean(errors.password)}
                          onChange={(value) => {
                            setPassword(value);
                            setErrors((current) => {
                              if (!current.password) return current;
                              const next = { ...current };
                              delete next.password;
                              return next;
                            });
                          }}
                        />
                      </Field>
                      <Field label="Teléfono (Opcional)" error={errors.phone} fullWidth>
                        <input value={identity.phone} onChange={(event) => setIdentityField("phone", event.target.value)} placeholder="+34 000 000 000" className={fieldInputClassName(Boolean(errors.phone))} />
                      </Field>
                      <Field label="Persona de contacto *" error={errors.contactName} fullWidth>
                        <input value={identity.contactName} onChange={(event) => setIdentityField("contactName", event.target.value)} placeholder="Nombre completo" className={fieldInputClassName(Boolean(errors.contactName))} />
                      </Field>
                    </div>

                    <div className="mt-6 flex items-center justify-end border-t border-cv-gray-200 pt-6">
                      <WizardButton onClick={goNext}>Siguiente <ArrowRight className="h-4 w-4" /></WizardButton>
                    </div>
                  </form>
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section key="step-2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="mx-auto w-full max-w-5xl overflow-hidden rounded-[18px] border border-cv-gray-200 bg-white shadow-[0_16px_38px_rgba(20,41,31,0.08)]">
                <div className="flex flex-col border-b border-cv-gray-200 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="max-w-2xl">
                    <h1 className="font-display text-3xl font-bold leading-tight text-cv-green-900 sm:text-4xl">Tu esencia culinaria</h1>
                    <p className="mt-1 text-sm text-cv-gray-600">Cuéntanos qué te apasiona para personalizar tu experiencia estacional.</p>
                  </div>
                  <div className="mt-6 w-full max-w-[210px] lg:mt-1">
                    <ProgressLabel label="Paso 2 de 3" value="66% completado" progress={66} />
                  </div>
                </div>

                <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                  <aside className="border-b border-cv-gray-200 bg-cv-cream-100/70 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="space-y-4">
                      <InfoCard icon={CalendarDays} title="Temporadas precisas">Accede a calendarios reales de cosecha ajustados a tu microclima local.</InfoCard>
                      <InfoCard icon={Sparkles} title="Inspiración técnica">Documentación detallada sobre variedades nativas y preparación orgánica.</InfoCard>
                      <InfoCard icon={UtensilsCrossed} title="Alertas de ciclo">Notificaciones preventivas sobre el momento óptimo de recolección.</InfoCard>
                      <figure className="overflow-hidden rounded-[16px] border border-cv-gray-200 bg-[linear-gradient(180deg,rgba(20,41,31,0.16),rgba(20,41,31,0.52)),url('https://images.unsplash.com/photo-1532092823327-aecb965e5be5?w=900&auto=format&fit=crop&q=60')] bg-cover bg-center shadow-sm">
                        <div className="flex min-h-[150px] items-end p-4">
                          <figcaption className="max-w-[16ch] text-sm font-medium text-cv-cream-50">Ingredientes silvestres, cocina honesta.</figcaption>
                        </div>
                      </figure>
                    </div>
                  </aside>

                  <div className="p-6 sm:p-8">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cv-gray-500">Usos gastronómicos</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {CUISINE_TYPES.map((item) => (
                          <Chip key={item} active={selectedCuisine.includes(item)} onClick={() => toggleValue(setSelectedCuisine, item, "cuisine")}>{item}</Chip>
                        ))}
                      </div>
                      {errors.cuisine ? <p className="mt-3 text-xs text-cv-error">{errors.cuisine}</p> : null}
                    </div>

                    <div className="mt-7">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cv-gray-500">Categorías de producto</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {PRODUCT_CATEGORIES.map((item) => (
                          <Chip key={item} active={selectedCategories.includes(item)} onClick={() => toggleValue(setSelectedCategories, item, "categories")}>{item}</Chip>
                        ))}
                      </div>
                      {errors.categories ? <p className="mt-3 text-xs text-cv-error">{errors.categories}</p> : null}
                    </div>

                    <div className="mt-7">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-cv-gray-500">Productos de interés</p>
                        <div className="relative w-full sm:max-w-[210px]">
                          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cv-gray-500" />
                          <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar ingrediente..." className="h-9 w-full rounded-full border border-cv-gray-200 bg-cv-cream-50/80 pl-9 pr-3 text-sm text-cv-gray-700 outline-none focus:border-cv-green-300 focus:ring-2 focus:ring-cv-green-100" />
                        </div>
                      </div>

                      {visibleProducts.length === 0 ? (
                        <div className="mt-3 rounded-2xl border border-dashed border-cv-gray-300 bg-cv-cream-50/60 px-5 py-10 text-center text-sm text-cv-gray-500">No encontramos ingredientes para esa búsqueda.</div>
                      ) : (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {visibleProducts.map((product, index) => {
                            const active = selectedProducts.includes(product.id);
                            const Icon = product.icon;
                            return (
                              <motion.button key={product.id} type="button" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: stepDelay(index) }} onClick={() => toggleValue(setSelectedProducts, product.id, "products")} className={cn("inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200", active ? "border-cv-green-800 bg-cv-green-800 text-white" : "border-cv-gray-300 bg-white text-cv-gray-700 hover:border-cv-green-300 hover:bg-cv-cream-50")}>
                                <Icon className="h-4 w-4" />
                                {product.label}
                                {active ? <span>×</span> : null}
                              </motion.button>
                            );
                          })}
                        </div>
                      )}
                      {errors.products ? <p className="mt-3 text-xs text-cv-error">{errors.products}</p> : null}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-cv-gray-200 pt-6">
                      <BackButton onClick={() => setStep(1)} />
                      <WizardButton onClick={goNext}>Siguiente <ArrowRight className="h-4 w-4" /></WizardButton>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section key="step-3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }} className="mx-auto w-full max-w-5xl overflow-hidden rounded-[18px] border border-cv-gray-200 bg-white shadow-[0_16px_38px_rgba(20,41,31,0.08)]">
                <div className="flex flex-col border-b border-cv-gray-200 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="max-w-2xl">
                    <h1 className="font-display text-3xl font-bold leading-tight text-cv-green-900 sm:text-4xl">Entiende tus ritmos</h1>
                    <p className="mt-1 text-sm text-cv-gray-600">Configuramos notificaciones precisas para que nunca pierdas el contacto con la tierra y sus ciclos.</p>
                  </div>
                  <div className="mt-6 w-full max-w-[210px] lg:mt-1">
                    <ProgressLabel label="Progreso" value="99%" progress={99} />
                  </div>
                </div>

                <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                  <aside className="border-b border-cv-gray-200 bg-cv-cream-100/70 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="space-y-4">
                      <TimelineCard />
                      <InfoCard icon={ShieldCheck} title="No es una plataforma de venta">Calendario Vivo es una herramienta de visibilización y gestión del conocimiento. Las transacciones comerciales se gestionan de forma externa a este portal.</InfoCard>
                      <figure className="overflow-hidden rounded-[16px] border border-cv-gray-200 bg-[linear-gradient(180deg,rgba(20,41,31,0.12),rgba(20,41,31,0.56)),url('https://images.unsplash.com/photo-1712143525667-717b146a141f?w=900&auto=format&fit=crop&q=60')] bg-cover bg-center shadow-sm">
                        <div className="flex min-h-[150px] items-end p-4">
                          <figcaption className="max-w-[17ch] text-sm font-medium text-cv-cream-50">Cuidando el pulso de la cocina y la cosecha.</figcaption>
                        </div>
                      </figure>
                    </div>
                  </aside>

                  <div className="p-6 sm:p-8">
                    <h2 className="font-display text-2xl font-bold text-cv-green-900">Canal de comunicación</h2>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      {COMMUNICATION_CHANNELS.map((option) => {
                        const active = communication.includes(option);
                        const ChannelIcon =
                          option === "WhatsApp"
                            ? MessageSquareText
                            : option === "Correo"
                              ? Mail
                              : BellOff;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleCommunication(option)}
                            className={cn(
                              "flex min-h-[82px] flex-col items-center justify-center gap-2 rounded-xl border px-4 py-4 text-center text-sm transition-all",
                              active
                                ? "border-cv-green-700 bg-cv-cream-50 text-cv-green-900 shadow-[0_8px_20px_rgba(27,58,45,0.08)] ring-1 ring-cv-green-200"
                                : "border-cv-gray-200 bg-white text-cv-gray-700 hover:border-cv-green-300 hover:bg-cv-cream-50",
                            )}
                          >
                            <span
                              className={cn(
                                "inline-flex h-8 w-8 items-center justify-center rounded-full border",
                                active
                                  ? "border-cv-green-700 bg-cv-green-700 text-white"
                                  : "border-cv-gray-200 bg-cv-cream-50 text-cv-gray-500",
                              )}
                            >
                              <ChannelIcon className="h-4 w-4" />
                            </span>
                            <span className="font-medium">{option}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.communication ? <p className="mt-3 text-xs text-cv-error">{errors.communication}</p> : null}

                    <div className="mt-7">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cv-gray-500">Tipos de alerta</p>
                      <div className="mt-3 space-y-3">
                        {["Ciclos de Siembra", "Periodos de Cosecha", "Eventos de la Comunidad"].map((item) => {
                          const active = alerts.includes(item);
                          return (
                            <label key={item} className={cn("flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors", active ? "border-cv-green-800 bg-cv-green-50 text-cv-green-900" : "border-cv-gray-200 bg-cv-cream-50/80 text-cv-gray-700 hover:border-cv-green-300")}>
                              <span className={cn("mt-0.5 flex h-4 w-4 items-center justify-center rounded border", active ? "border-cv-green-800 bg-cv-green-800 text-white" : "border-cv-gray-300 bg-white text-transparent")}><Check className="h-3 w-3" /></span>
                              <span className="flex-1">
                                <span className="block leading-relaxed">{item}</span>
                                <span className="mt-1 block text-xs text-cv-gray-500">{item === "Ciclos de Siembra" ? "Alertas sobre los mejores momentos para plantar según tu zona." : item === "Periodos de Cosecha" ? "Notificaciones cuando los frutos estén listos para recolectar." : "Encuentros locales de intercambio de semillas y saberes."}</span>
                              </span>
                              <input type="checkbox" checked={active} onChange={(event) => {
                                setAlerts((current) => event.target.checked ? [...current, item] : current.filter((value) => value !== item));
                              }} className="sr-only" />
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {errors.alerts ? <p className="mt-3 text-xs text-cv-error">{errors.alerts}</p> : null}

                    <div className="mt-7 rounded-2xl border border-cv-gray-200 bg-cv-cream-100/80 px-4 py-4 text-sm text-cv-gray-600">
                      Las alertas son informativas. No compartiremos tus datos con terceros ni enviaremos publicidad comercial. Puedes cambiar estas preferencias en cualquier momento desde tu perfil.
                    </div>

                    {submitError ? (
                      <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {submitError}
                      </p>
                    ) : null}

                    <div className="mt-6 flex items-center justify-between border-t border-cv-gray-200 pt-6">
                      <BackButton onClick={() => setStep(2)} />
                      <WizardButton onClick={goNext} disabled={isSubmitting}>
                        {isSubmitting ? "Registrando..." : "Finalizar registro"}
                        {isSubmitting ? null : <ArrowRight className="h-4 w-4" />}
                      </WizardButton>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {step === 4 && (
              <motion.section
                key="step-4"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="mx-auto w-full max-w-5xl overflow-hidden rounded-[18px] border border-cv-gray-200 bg-white shadow-[0_16px_38px_rgba(20,41,31,0.08)]"
              >
                <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
                  <div className="min-h-[340px] bg-[linear-gradient(180deg,rgba(20,41,31,0.15),rgba(20,41,31,0.16)),url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center p-6 sm:p-8 lg:min-h-[520px]">
                    <div className="flex h-full min-h-[270px] items-end rounded-[16px] bg-[linear-gradient(180deg,rgba(7,17,12,0.06),rgba(7,17,12,0.4))] p-4 text-cv-cream-50">
                      <p className="max-w-[14ch] font-display text-3xl font-bold leading-tight drop-shadow-sm">El bosque te acompaña.</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cv-green-100 text-cv-green-800">
                      <ChefHat className="h-7 w-7" />
                    </div>

                    <h1 className="mt-6 text-center font-display text-4xl font-bold text-cv-green-900 sm:text-5xl">¡Tu perfil está listo!</h1>
                    <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-cv-gray-600 sm:text-base">
                      Bienvenido a la red de preservación gastronómica. Ahora formas parte del pulso vital del bosque chiquitano. Juntos registraremos los ciclos que sostienen nuestra identidad culinaria.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <ActionCard
                        title="Productos"
                        icon={Sparkles}
                        description="Descubre los frutos silvestres que el bosque ofrece este mes."
                        cta="Explorar productos"
                        href="/catalogo"
                        solid
                      />
                      <ActionCard
                        title="Saberes"
                        icon={BookOpenText}
                        description="Accede a la documentación completa de especies y técnicas regionales."
                        cta="Ver catálogo completo"
                        href="/catalogo"
                      />
                    </div>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>

          <footer className="mt-10 border-t border-cv-cream-300/80 py-5 text-sm text-cv-gray-600">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2024 Calendario Vivo - Gestión Sostenible del Bosque Chiquitano</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/" className="transition-colors hover:text-cv-green-800">Políticas de Privacidad</Link>
                <Link href="/" className="transition-colors hover:text-cv-green-800">Términos de Uso</Link>
                <Link href="/" className="transition-colors hover:text-cv-green-800">Contacto FAN</Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

function ProgressLabel({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-cv-gray-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cv-gray-200">
        <div className="h-full rounded-full bg-cv-green-800" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

function fieldInputClassName(hasError: boolean) {
  return cn(
    "h-12 w-full rounded-xl border border-cv-cream-300 bg-cv-cream-50/70 px-4 text-sm text-cv-gray-800 shadow-sm outline-none transition-all duration-200 placeholder:text-cv-gray-400 hover:border-cv-green-300 focus:border-cv-green-500 focus:bg-white focus:ring-4 focus:ring-cv-green-100/70",
    hasError &&
      "border-cv-error bg-cv-error/5 hover:border-cv-error focus:border-cv-error focus:ring-cv-error/10",
  );
}

/** Input de contraseña con toggle de visibilidad. */
function PasswordField({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Mínimo 6 caracteres"
        className={cn(fieldInputClassName(Boolean(error)), "pr-11")}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cv-gray-400 transition-colors hover:text-cv-gray-600"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function Field({ label, error, children, fullWidth }: { label: string; error?: string; children: React.ReactNode; fullWidth?: boolean }) {
  return (
    <label className={cn("block", fullWidth && "sm:col-span-2")}>
      <span className="mb-2 block text-sm font-semibold text-cv-gray-700">{label}</span>
      {children}
      {error ? <p className="mt-2 text-xs text-cv-error">{error}</p> : null}
    </label>
  );
}

function InfoCard({ icon: Icon, title, children }: { icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode; }) {
  return (
    <div className="rounded-[14px] border border-cv-cream-300 bg-cv-cream-50 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cv-gray-200 bg-white text-cv-gray-600"><Icon className="h-3.5 w-3.5" /></span>
        <div>
          <h3 className="text-sm font-semibold text-cv-gray-800">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-cv-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode; }) {
  return (
    <button type="button" onClick={onClick} className={cn("inline-flex items-center rounded-full border px-4 py-1.5 text-sm transition-all", active ? "border-cv-green-800 bg-cv-green-800 text-white" : "border-cv-gray-300 bg-white text-cv-gray-700 hover:border-cv-green-300 hover:bg-cv-cream-50")}>
      {children}
    </button>
  );
}

function TimelineCard() {
  return (
    <div className="rounded-[14px] border border-cv-cream-300 bg-cv-cream-50 p-4 shadow-sm">
      <p className="text-sm font-semibold text-cv-green-900">¿Cómo funciona la publicación?</p>
      <div className="mt-4 space-y-4">
        {REVIEW_STEPS.map((item, index) => (
          <div key={item.title} className="relative pl-8">
            <span className="absolute left-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cv-green-900 text-[10px] font-bold text-white">{index + 1}</span>
            <h4 className="text-sm font-semibold text-cv-gray-800">{item.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-cv-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WizardButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; }) {
  return <button type="button" onClick={onClick} disabled={disabled} className="inline-flex h-11 min-w-[154px] items-center justify-center gap-2 rounded-lg bg-cv-green-800 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-cv-green-700 hover:shadow-md active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-cv-green-800 disabled:hover:shadow-sm">{children}</button>;
}

function BackButton({ onClick }: { onClick: () => void }) {
  return <button type="button" onClick={onClick} className="inline-flex items-center gap-1.5 text-sm font-medium text-cv-gray-600 transition-colors hover:text-cv-green-800"><ArrowLeft className="h-4 w-4" />Volver</button>;
}

function ActionCard({ title, icon: Icon, description, cta, href, solid }: { title: string; icon: React.ComponentType<{ className?: string }>; description: string; cta: string; href: string; solid?: boolean; }) {
  return (
    <div className={cn("rounded-[16px] border p-4 text-left shadow-sm", solid ? "border-cv-cream-300 bg-white" : "border-cv-cream-300 bg-cv-cream-50/80")}>
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cv-cream-100 text-cv-green-800"><Icon className="h-4 w-4" /></div>
      <h2 className="mt-4 text-2xl font-bold text-cv-green-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-cv-gray-600">{description}</p>
      <Link href={href} className={cn("mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors", solid ? "border-cv-green-800 bg-cv-green-800 text-white hover:bg-cv-green-700" : "border-cv-gold-400 text-cv-gray-700 hover:border-cv-green-300 hover:bg-cv-cream-50")}>
        {cta}
      </Link>
    </div>
  );
}

