"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  CircleHelp,
  Eye,
  EyeOff,
  Leaf,
  Search,
  ShieldCheck,
  Sprout,
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
  | "municipality"
  | "community";

const ACTOR_TYPES = [
  "Asociación",
  "Productor individual",
  "Comunidad",
  "Cooperativa",
  "Otro",
];

const PRODUCTS = [
  { id: "almendra", label: "Almendra chiquitana", icon: Leaf },
  { id: "totai", label: "Totai", icon: Sprout },
  { id: "motacu", label: "Motacú", icon: Leaf },
  { id: "pejibaye", label: "Pejibaye", icon: Sprout },
  { id: "copoazu", label: "Copoazú", icon: Leaf },
  { id: "miel", label: "Miel de abeja nativa", icon: BadgeCheck },
  { id: "paja", label: "Paja cedrón", icon: Sprout },
  { id: "yuca", label: "Yuca", icon: Leaf },
  { id: "asai", label: "Asaí", icon: Leaf },
  { id: "albahaca", label: "Albahaca silvestre", icon: Sprout },
  { id: "flor", label: "Flor de azahar", icon: BadgeCheck },
  { id: "cusi", label: "Cusi", icon: Leaf },
  { id: "sujo", label: "Sujo", icon: BadgeCheck },
  { id: "cupesi", label: "Cupesí", icon: Sprout },
  { id: "otro", label: "Otro producto", icon: CircleHelp },
];

const USES = [
  "Produzco o recolecto",
  "Transformo o proceso",
  "Distribuyo o comercializo",
  "Ofrezco servicios",
  "Otro rol en la cadena",
];

const identityDefaults = {
  name: "",
  actorType: "",
  contactName: "",
  phone: "",
  email: "",
  municipality: "",
  community: "",
};

const progressLabel = {
  1: "33%",
  2: "66% completado",
  3: "99%",
  4: "100%",
} as const;

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

function stepCardDelay(step: StepId) {
  return step === 1 ? 0.08 : 0.12;
}

export default function ProductorWizard() {
  const [step, setStep] = useState<StepId>(1);
  const [identity, setIdentity] = useState(identityDefaults);
  const [password, setPassword] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["almendra"]);
  const [selectedUses, setSelectedUses] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [auth, setAuth] = useState({
    truth: false,
    contactFan: false,
    publicReview: false,
    editorial: false,
    shareContact: false,
  });
  const [message, setMessage] = useState("");
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
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function toggleProduct(productId: string) {
    setSelectedProducts((current) =>
      current.includes(productId)
        ? current.filter((value) => value !== productId)
        : [...current, productId],
    );
    setErrors((current) => {
      if (!current.products) {
        return current;
      }
      const next = { ...current };
      delete next.products;
      return next;
    });
  }

  function toggleUse(use: string) {
    setSelectedUses((current) =>
      current.includes(use)
        ? current.filter((value) => value !== use)
        : [...current, use],
    );
    setErrors((current) => {
      if (!current.uses) {
        return current;
      }
      const next = { ...current };
      delete next.uses;
      return next;
    });
  }

  async function goNext() {
    if (step === 1) {
      const nextErrors = {
        name: fieldError(identity.name, "el nombre del productor o asociación"),
        actorType: fieldError(identity.actorType, "el tipo de actor"),
        contactName: fieldError(identity.contactName, "la persona de contacto"),
        phone: fieldError(identity.phone, "el teléfono o WhatsApp"),
        email: fieldError(identity.email, "el correo electrónico"),
        password: !password.trim()
          ? "Crea una contraseña."
          : password.length < 6
            ? "La contraseña debe tener al menos 6 caracteres."
            : "",
      };

      const cleanErrors = Object.fromEntries(
        Object.entries(nextErrors).filter(([, value]) => value),
      );

      setErrors(cleanErrors);

      if (Object.keys(cleanErrors).length === 0) {
        setStep(2);
      }
      return;
    }

    if (step === 2) {
      const nextErrors: Record<string, string> = {};

      if (selectedProducts.length === 0) {
        nextErrors.products = "Selecciona al menos un producto.";
      }

      if (selectedUses.length === 0) {
        nextErrors.uses = "Selecciona al menos una actividad.";
      }

      setErrors(nextErrors);

      if (Object.keys(nextErrors).length === 0) {
        setStep(3);
      }
      return;
    }

    if (step === 3) {
      const nextErrors: Record<string, string> = {};

      if (!auth.truth) {
        nextErrors.truth = "Confirma que la información es verdadera.";
      }

      if (!auth.contactFan) {
        nextErrors.contactFan = "Autoriza el contacto de FAN.";
      }

      if (!auth.publicReview) {
        nextErrors.publicReview = "Acepta la revisión previa a publicación.";
      }

      if (!auth.editorial) {
        nextErrors.editorial = "Autoriza la edición institucional del contenido.";
      }

      setErrors(nextErrors);

      if (Object.keys(nextErrors).length === 0) {
        await submitRegistration();
      }
    }
  }

  async function submitRegistration() {
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      // 1) Cuenta en Supabase Auth; 2) perfil en Postgres vía backend.
      await registerWithEmail(identity.email, password);
      await registerProfile({
        perfil: "productor",
        nombre: identity.name,
        actorType: identity.actorType,
        contactName: identity.contactName,
        telefono: identity.phone,
        ubicacion: identity.municipality || undefined,
        comunidad: identity.community || undefined,
        productos: selectedProducts,
        usos: selectedUses,
        autorizaciones: auth,
        compartirContacto: auth.shareContact,
        mensaje: message || undefined,
      });
      setStep(4);
    } catch (err) {
      setSubmitError(mensajeErrorRegistro(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  function goBack() {
    setStep((current) => Math.max(1, current - 1) as StepId);
  }

  return (
    <div className="min-h-screen bg-cv-cream-100 text-cv-gray-800">
      <header className="border-b border-cv-cream-300/80 bg-cv-cream-100/95">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="font-display text-xl font-bold text-cv-green-900 transition-colors hover:text-cv-green-700"
          >
            Calendario Vivo
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-cv-gray-600 transition-colors hover:text-cv-green-800"
          >
            Volver al inicio
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(141,195,164,0.14),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(200,169,110,0.1),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0)_38%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,rgba(20,41,31,0.03))]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.section
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="mx-auto w-full max-w-5xl overflow-hidden rounded-[18px] border border-cv-gray-200 bg-white shadow-[0_16px_38px_rgba(20,41,31,0.08)]"
              >
                <div className="flex flex-col border-b border-cv-gray-200 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="max-w-2xl">
                    <h1 className="font-display text-3xl font-bold leading-tight text-cv-green-900 sm:text-4xl">
                      Cuéntanos quién eres
                    </h1>
                    <p className="mt-1 text-sm text-cv-gray-600">Datos de identidad</p>
                  </div>

                  <div className="mt-6 w-full max-w-[210px] lg:mt-1">
                    <ProgressLabel label="Progreso" value={progressLabel[step]} progress={33} />
                  </div>
                </div>

                <div className="grid lg:grid-cols-[0.95fr_1.3fr]">
                  <div className="min-h-[420px] border-b border-cv-gray-200 bg-[linear-gradient(180deg,rgba(20,41,31,0.14),rgba(20,41,31,0.2)),url('https://res.cloudinary.com/dfzi3onqf/image/upload/v1780207304/BIGFRONT_k9tvxu.png')] bg-cover bg-center p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="flex h-full min-h-[330px] flex-col justify-end rounded-[16px] bg-[linear-gradient(180deg,rgba(7,17,12,0.04),rgba(7,17,12,0.4))] p-4 text-cv-cream-50">
                      <p className="max-w-[14ch] font-display text-2xl font-bold leading-tight drop-shadow-sm">
                        Cosechas visibles, procesos claros y una red que te acompaña.
                      </p>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-cv-cream-100/95">
                        Completa tus datos para que FAN valide tu perfil y pueda
                        revisar la trazabilidad de tus productos.
                      </p>
                    </div>
                  </div>

                  <form className="p-6 sm:p-8" onSubmit={(event) => event.preventDefault()}>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field
                        label="Nombre del productor o Asociación *"
                        error={errors.name}
                        fullWidth
                      >
                        <input
                          value={identity.name}
                          onChange={(event) => setIdentityField("name", event.target.value)}
                          placeholder="Ej. Asociación de Recolectores de Cusi"
                          className={fieldInputClassName(Boolean(errors.name))}
                        />
                      </Field>

                      <Field label="Tipo de actor *" error={errors.actorType}>
                        <StyledSelect
                          value={identity.actorType}
                          onValueChange={(value) => setIdentityField("actorType", value)}
                          options={ACTOR_TYPES}
                          placeholder="Seleccionar..."
                          error={Boolean(errors.actorType)}
                        />
                      </Field>

                      <Field label="Persona de contacto *" error={errors.contactName}>
                        <input
                          value={identity.contactName}
                          onChange={(event) => setIdentityField("contactName", event.target.value)}
                          placeholder="Nombre completo"
                          className={fieldInputClassName(Boolean(errors.contactName))}
                        />
                      </Field>

                      <Field label="Teléfono / WhatsApp *" error={errors.phone}>
                        <input
                          value={identity.phone}
                          onChange={(event) => setIdentityField("phone", event.target.value)}
                          placeholder="+591 ..."
                          className={fieldInputClassName(Boolean(errors.phone))}
                        />
                      </Field>

                      <Field label="Correo electrónico *" error={errors.email}>
                        <input
                          value={identity.email}
                          onChange={(event) => setIdentityField("email", event.target.value)}
                          placeholder="contacto@ejemplo.com"
                          className={fieldInputClassName(Boolean(errors.email))}
                        />
                      </Field>

                      <Field label="Contraseña *" error={errors.password}>
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

                      <Field label="Municipio (Opcional)">
                        <input
                          value={identity.municipality}
                          onChange={(event) => setIdentityField("municipality", event.target.value)}
                          placeholder="Ej. San Ignacio de Velasco"
                          className={fieldInputClassName(false)}
                        />
                      </Field>

                      <Field label="Comunidad / Zona (Opcional)">
                        <input
                          value={identity.community}
                          onChange={(event) => setIdentityField("community", event.target.value)}
                          placeholder="Localidad específica"
                          className={fieldInputClassName(false)}
                        />
                      </Field>
                    </div>

                    <div className="mt-6 flex items-center justify-end border-t border-cv-gray-200 pt-6">
                      <WizardButton type="button" onClick={goNext}>
                        Siguiente
                        <ArrowRight className="h-4 w-4" />
                      </WizardButton>
                    </div>
                  </form>
                </div>
              </motion.section>
            )}

            {step === 2 && (
              <motion.section
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="mx-auto w-full max-w-5xl overflow-hidden rounded-[18px] border border-cv-gray-200 bg-white shadow-[0_16px_38px_rgba(20,41,31,0.08)]"
              >
                <div className="flex flex-col border-b border-cv-gray-200 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="max-w-2xl">
                    <h1 className="font-display text-3xl font-bold leading-tight text-cv-green-900 sm:text-4xl">
                      ¿Con qué productos trabajas?
                    </h1>
                    <p className="mt-1 text-sm text-cv-gray-600">
                      Identifica las especies y derivados que forman parte de tu ciclo productivo anual para personalizar tu calendario de aprovechamiento.
                    </p>
                  </div>

                  <div className="mt-6 w-full max-w-[210px] lg:mt-1">
                    <ProgressLabel label="Paso 2 de 3" value={progressLabel[step]} progress={66} />
                  </div>
                </div>

                <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                  <aside className="border-b border-cv-gray-200 bg-cv-cream-100/70 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="space-y-4">
                      <InfoCard
                        title="Información importante"
                        icon={CircleHelp}
                        tone="light"
                      >
                        Esta sección te ayuda a conocer mejor tu actividad dentro de la red productiva.
                      </InfoCard>

                      <InfoCard
                        title="Nota institucional"
                        icon={ShieldCheck}
                        tone="muted"
                      >
                        Toda información técnica será revisada por la Fundación Amigos de la Naturaleza (FAN) para asegurar la sostenibilidad del bosque.
                      </InfoCard>

                      <figure className="overflow-hidden rounded-[16px] border border-cv-gray-200 bg-[linear-gradient(180deg,rgba(20,41,31,0.16),rgba(20,41,31,0.52)),url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center shadow-sm">
                        <div className="flex min-h-[150px] items-end p-4">
                          <figcaption className="max-w-[16ch] text-sm font-medium text-cv-cream-50">
                            Preservando el patrimonio natural de la Chiquitanía.
                          </figcaption>
                        </div>
                      </figure>
                    </div>
                  </aside>

                  <div className="p-6 sm:p-8">
                    <div className="relative mb-5">
                      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cv-gray-500" />
                      <input
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        placeholder="Buscar producto o especie..."
                        className="h-11 w-full rounded-full border border-cv-gray-200 bg-cv-cream-50/80 pl-11 pr-4 text-sm text-cv-gray-700 shadow-sm outline-none transition-all placeholder:text-cv-gray-500 focus:border-cv-green-300 focus:ring-2 focus:ring-cv-green-100"
                      />
                    </div>

                    {visibleProducts.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-cv-gray-300 bg-cv-cream-50/60 px-5 py-10 text-center text-sm text-cv-gray-500">
                        No encontramos productos para esa búsqueda.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                        {visibleProducts.map((product, index) => {
                        const active = selectedProducts.includes(product.id);
                        const Icon = product.icon;

                        return (
                          <motion.button
                            key={product.id}
                            type="button"
                            onClick={() => toggleProduct(product.id)}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: stepCardDelay(step) + index * 0.03 }}
                            className={cn(
                              "relative flex min-h-[76px] flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-center text-xs font-medium transition-all duration-200",
                              active
                                ? "border-cv-green-700 bg-cv-green-50 text-cv-green-900 shadow-[0_8px_18px_rgba(27,58,45,0.12)]"
                                : "border-cv-gray-200 bg-white text-cv-gray-700 hover:border-cv-green-300 hover:bg-cv-cream-50",
                            )}
                          >
                            <span
                              className={cn(
                                "absolute right-2 top-2 inline-flex h-4 w-4 items-center justify-center rounded-full border",
                                active
                                  ? "border-cv-green-700 bg-cv-green-700 text-white"
                                  : "border-cv-gray-300 bg-white text-transparent",
                              )}
                            >
                              <Check className="h-2.5 w-2.5" />
                            </span>
                            <Icon className={cn("h-5 w-5", active ? "text-cv-green-700" : "text-cv-gray-500")} />
                            <span className="leading-tight">{product.label}</span>
                          </motion.button>
                        );
                        })}
                      </div>
                    )}

                    <div className="mt-7 border-t border-cv-gray-200 pt-6">
                      <h2 className="font-display text-2xl font-bold text-cv-green-900">
                        ¿Qué haces con estos productos?
                      </h2>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        {USES.map((use, index) => {
                          const active = selectedUses.includes(use);

                          return (
                            <motion.button
                              key={use}
                              type="button"
                              onClick={() => toggleUse(use)}
                              initial={{ opacity: 0, y: 14 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.16 + index * 0.03 }}
                              className={cn(
                                "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                                active
                                  ? "border-cv-green-700 bg-cv-green-50 text-cv-green-900"
                                  : "border-cv-gray-200 bg-cv-cream-50/80 text-cv-gray-700 hover:border-cv-green-300",
                              )}
                            >
                              <span
                                className={cn(
                                  "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                                  active
                                    ? "border-cv-green-700 bg-cv-green-700 text-white"
                                    : "border-cv-gray-300 bg-white text-transparent",
                                )}
                              >
                                <Check className="h-3 w-3" />
                              </span>
                              {use}
                            </motion.button>
                          );
                        })}
                      </div>

                      {errors.products || errors.uses ? (
                        <p className="mt-3 text-xs text-cv-error">
                          {errors.products || errors.uses}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-cv-gray-200 pt-6">
                      <BackButton onClick={goBack} />
                      <WizardButton type="button" onClick={goNext}>
                        Siguiente
                        <ArrowRight className="h-4 w-4" />
                      </WizardButton>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {step === 3 && (
              <motion.section
                key="step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
                className="mx-auto w-full max-w-5xl overflow-hidden rounded-[18px] border border-cv-gray-200 bg-white shadow-[0_16px_38px_rgba(20,41,31,0.08)]"
              >
                <div className="flex flex-col border-b border-cv-gray-200 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div className="max-w-2xl">
                    <h1 className="font-display text-3xl font-bold leading-tight text-cv-green-900 sm:text-4xl">
                      Revisión y autorización
                    </h1>
                    <p className="mt-1 text-sm text-cv-gray-600">
                      Estamos a un paso de finalizar. Por favor, revisa cómo gestionaremos tu información y confirma las autorizaciones necesarias para formar parte de la red de FAN.
                    </p>
                  </div>

                  <div className="mt-6 w-full max-w-[210px] lg:mt-1">
                    <ProgressLabel label="Progreso" value={progressLabel[step]} progress={99} />
                  </div>
                </div>

                <div className="grid lg:grid-cols-[0.42fr_0.58fr]">
                  <aside className="border-b border-cv-gray-200 bg-cv-cream-100/70 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                    <div className="space-y-4">
                      <TimelineCard />

                      <InfoCard
                        title="No es una plataforma de venta"
                        icon={ShieldCheck}
                        tone="muted"
                      >
                        Calendario Vivo es una herramienta de visibilización y gestión del conocimiento. Las transacciones comerciales se gestionan de forma externa a este portal.
                      </InfoCard>

                      <figure className="overflow-hidden rounded-[16px] border border-cv-gray-200 bg-[linear-gradient(180deg,rgba(20,41,31,0.1),rgba(20,41,31,0.56)),url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=80')] bg-cover bg-center shadow-sm">
                        <div className="flex min-h-[150px] items-end p-4">
                          <figcaption className="max-w-[17ch] text-sm font-medium text-cv-cream-50">
                            Custodiando el ritmo del bosque.
                          </figcaption>
                        </div>
                      </figure>
                    </div>
                  </aside>

                  <div className="p-6 sm:p-8">
                    <h2 className="font-display text-2xl font-bold text-cv-green-900">
                      Confirma tus autorizaciones
                    </h2>

                    <div className="mt-5 space-y-4">
                      <ConsentBox
                        checked={auth.truth}
                        label="Declaro que toda la información proporcionada sobre mis productos y ciclos de cosecha es veraz y actual."
                        onChange={(checked) => {
                          setAuth((current) => ({ ...current, truth: checked }));
                          setErrors((current) => {
                            if (!current.truth) {
                              return current;
                            }
                            const next = { ...current };
                            delete next.truth;
                            return next;
                          });
                        }}
                        error={errors.truth}
                      />

                      <ConsentBox
                        checked={auth.contactFan}
                        label="Autorizo a la Fundación Amigos de la Naturaleza (FAN) a contactarme para validar los datos técnicos de mi producción."
                        onChange={(checked) => {
                          setAuth((current) => ({ ...current, contactFan: checked }));
                          setErrors((current) => {
                            if (!current.contactFan) {
                              return current;
                            }
                            const next = { ...current };
                            delete next.contactFan;
                            return next;
                          });
                        }}
                        error={errors.contactFan}
                      />

                      <ConsentBox
                        checked={auth.publicReview}
                        label="Entiendo que mi registro pasará por una etapa de revisión técnica antes de ser visible en el calendario público."
                        onChange={(checked) => {
                          setAuth((current) => ({ ...current, publicReview: checked }));
                          setErrors((current) => {
                            if (!current.publicReview) {
                              return current;
                            }
                            const next = { ...current };
                            delete next.publicReview;
                            return next;
                          });
                        }}
                        error={errors.publicReview}
                      />

                      <ConsentBox
                        checked={auth.editorial}
                        label="Autorizo a FAN a realizar ediciones de estilo, corrección gramatical y curaduría fotográfica sobre mi contenido para asegurar la calidad institucional."
                        onChange={(checked) => {
                          setAuth((current) => ({ ...current, editorial: checked }));
                          setErrors((current) => {
                            if (!current.editorial) {
                              return current;
                            }
                            const next = { ...current };
                            delete next.editorial;
                            return next;
                          });
                        }}
                        error={errors.editorial}
                      />
                    </div>

                    <div className="my-6 border-t border-cv-gray-200" />

                    <ConsentBox
                      optional
                      checked={auth.shareContact}
                      label="[Opcional] Autorizo la publicación de mis datos de contacto (teléfono/email) para que interesados puedan contactarme directamente."
                      onChange={(checked) => setAuth((current) => ({ ...current, shareContact: checked }))}
                    />

                    <div className="mt-5">
                      <label className="mb-2 block text-sm font-semibold text-cv-gray-800">
                        Mensaje opcional para el equipo de FAN
                      </label>
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Ej: Me gustaría recibir asesoría sobre la toma de fotografías de mis frutos..."
                        className="min-h-[98px] w-full rounded-[16px] border border-cv-gray-200 bg-white px-4 py-3 text-sm text-cv-gray-700 outline-none transition-all placeholder:text-cv-gray-500 focus:border-cv-green-300 focus:ring-2 focus:ring-cv-green-100"
                      />
                    </div>

                    {submitError ? (
                      <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                        {submitError}
                      </p>
                    ) : null}

                    <div className="mt-6 flex items-center justify-between border-t border-cv-gray-200 pt-6">
                      <BackButton onClick={goBack} />
                      <WizardButton type="button" onClick={goNext} disabled={isSubmitting}>
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
                      <p className="max-w-[14ch] font-display text-3xl font-bold leading-tight drop-shadow-sm">
                        El bosque te acompaña.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cv-green-100 text-cv-green-800">
                      <Leaf className="h-7 w-7" />
                    </div>

                    <h1 className="mt-6 text-center font-display text-4xl font-bold text-cv-green-900 sm:text-5xl">
                      ¡Registro Exitoso!
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-cv-gray-600 sm:text-base">
                      Tu registro se completó con éxito. Ya puedes comenzar a gestionar tus productos y disponibilidad desde tu perfil.
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <SuccessActionCard
                        title="Validación de identidad"
                        icon={ShieldCheck}
                        description="Revisa tu información de productor y completa cualquier ajuste pendiente desde tu perfil."
                        cta="Ir a mi perfil"
                        href="/admin"
                        solid
                      />
                      <SuccessActionCard
                        title="Gestión de disponibilidad"
                        icon={Leaf}
                        description="Actualiza tus productos, temporada y disponibilidad desde el catálogo del bosque."
                        cta="Ir al catálogo"
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
              <p>© 2024 Calendario Vivo del Bosque Chiquitano. Todos los derechos reservados.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/" className="transition-colors hover:text-cv-green-800">
                  Institucional
                </Link>
                <Link href="/" className="transition-colors hover:text-cv-green-800">
                  Privacidad
                </Link>
                <Link href="/" className="transition-colors hover:text-cv-green-800">
                  Términos
                </Link>
                <Link href="/" className="transition-colors hover:text-cv-green-800">
                  Contacto FAN
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

function ProgressLabel({
  label,
  value,
  progress,
}: {
  label: string;
  value: string;
  progress: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-cv-gray-600">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cv-gray-200">
        <div
          className="h-full rounded-full bg-cv-green-800"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
  fullWidth,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <label className={cn("block", fullWidth && "sm:col-span-2")}>
      <span className="mb-2 block text-sm font-semibold text-cv-gray-700">{label}</span>
      {children}
      {error ? <p className="mt-2 text-xs text-cv-error">{error}</p> : null}
    </label>
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

function WizardButton({
  children,
  onClick,
  type = "button",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-11 min-w-[154px] items-center justify-center gap-2 rounded-lg bg-cv-green-800 px-4 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-cv-green-700 hover:shadow-md active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-cv-green-800 disabled:hover:shadow-sm"
    >
      {children}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-cv-gray-600 transition-colors hover:text-cv-green-800"
    >
      <ArrowLeft className="h-4 w-4" />
      Volver
    </button>
  );
}

function SuccessActionCard({
  title,
  icon: Icon,
  description,
  cta,
  href,
  solid,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  cta: string;
  href: string;
  solid?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[16px] border p-4 text-left shadow-sm",
        solid ? "border-cv-cream-300 bg-white" : "border-cv-cream-300 bg-cv-cream-50/80",
      )}
    >
      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cv-cream-100 text-cv-green-800">
        <Icon className="h-4 w-4" />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-cv-green-900">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-cv-gray-600">{description}</p>
      <Link
        href={href}
        className={cn(
          "mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg border px-4 text-sm font-semibold transition-colors",
          solid
            ? "border-cv-green-800 bg-cv-green-800 text-white hover:bg-cv-green-700"
            : "border-cv-gold-400 text-cv-gray-700 hover:border-cv-green-300 hover:bg-cv-cream-50",
        )}
      >
        {cta}
      </Link>
    </div>
  );
}

function InfoCard({
  title,
  icon: Icon,
  children,
  tone,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  tone: "light" | "muted";
}) {
  return (
    <div
      className={cn(
        "rounded-[14px] border p-4 shadow-sm",
        tone === "light"
          ? "border-cv-cream-300 bg-cv-cream-50"
          : "border-cv-gray-200 bg-cv-cream-200/60",
      )}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cv-gray-200 bg-white text-cv-gray-600">
          <Icon className="h-3.5 w-3.5" />
        </span>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-cv-gray-700">
            {title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-cv-gray-600">{children}</p>
        </div>
      </div>
    </div>
  );
}

function TimelineCard() {
  return (
    <div className="rounded-[14px] border border-cv-cream-300 bg-cv-cream-50 p-4 shadow-sm">
      <p className="text-sm font-semibold text-cv-green-900">¿Cómo funciona la publicación?</p>
      <div className="mt-4 space-y-4">
        {[
          {
            step: 1,
            title: "Envías información",
            description:
              "Tus datos de producción y ciclos de cosecha son recibidos por nuestro equipo técnico.",
          },
          {
            step: 2,
            title: "FAN revisa y organiza",
            description:
              "Verificamos la coherencia de la información con el ecosistema y adaptamos el estilo visual para el calendario.",
          },
          {
            step: 3,
            title: "La red consulta",
            description:
              "Tu disponibilidad se vuelve visible para investigadores, gastrónomos y otros productores de la región.",
          },
        ].map((item) => (
          <div key={item.step} className="relative pl-8">
            <span className="absolute left-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-cv-green-900 text-[10px] font-bold text-white">
              {item.step}
            </span>
            <h4 className="text-sm font-semibold text-cv-gray-800">{item.title}</h4>
            <p className="mt-1 text-xs leading-relaxed text-cv-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsentBox({
  checked,
  onChange,
  label,
  optional,
  error,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  optional?: boolean;
  error?: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm transition-colors",
        checked
          ? "border-cv-green-700 bg-cv-green-50 text-cv-green-900"
          : "border-cv-gray-200 bg-cv-cream-50/80 text-cv-gray-700 hover:border-cv-green-300",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border",
          checked
            ? "border-cv-green-700 bg-cv-green-700 text-white"
            : "border-cv-gray-300 bg-white text-transparent",
        )}
      >
        <Check className="h-3 w-3" />
      </span>
      <span className="flex-1">
        <span className="block leading-relaxed">{label}</span>
        {optional ? (
          <span className="mt-1 block text-xs font-medium text-cv-gray-500">Opcional</span>
        ) : null}
        {error ? <span className="mt-2 block text-xs text-cv-error">{error}</span> : null}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
    </label>
  );
}