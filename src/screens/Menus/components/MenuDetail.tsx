"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Leaf,
  Sparkle,
  Quotes,
  SealCheck,
  CalendarBlank,
  ForkKnife,
} from "@phosphor-icons/react";
import type {
  Menu,
  MenuCourse,
  MenuCreation,
  MenuTraceability,
} from "../menus.types";

const SERIF = "font-[family-name:var(--font-fraunces)]";

export function MenuDetail({ menu }: { menu: Menu }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-14 pb-10"
    >
      <Link
        href="/menus"
        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-cv-green-700/80 transition-colors hover:text-cv-green-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a menús
      </Link>

      {/* 1 — Hero */}
      <MenuHero menu={menu} />

      {/* 2 — Conceptos + Narrativa */}
      {(menu.concepts?.length || menu.narrative) && (
        <NarrativeBlock concepts={menu.concepts} narrative={menu.narrative} />
      )}

      {/* 3 — Creaciones de Autor */}
      {menu.signatureCreations?.length ? (
        <SignatureCreations creations={menu.signatureCreations} />
      ) : null}

      {/* 4 — Menú de Temporada + Trazabilidad */}
      {menu.seasonalMenu ? (
        <SeasonalMenu
          restaurant={menu.restaurant}
          traceability={menu.traceability}
          seasonal={menu.seasonalMenu}
        />
      ) : null}
    </motion.article>
  );
}

/* ───────────────────────── 1. Hero ───────────────────────── */

function MenuHero({ menu }: { menu: Menu }) {
  return (
    <header>
      <p className="text-center text-xs font-semibold uppercase tracking-[0.32em] text-cv-gold-600">
        Restaurante
      </p>

      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-3xl sm:aspect-[16/7]">
        <img
          src={menu.coverImage}
          alt={menu.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cv-green-900/85 via-cv-green-900/25 to-transparent" />
        <div className="absolute bottom-0 left-0 max-w-2xl p-6 sm:p-10">
          <h1 className={`${SERIF} text-4xl font-semibold text-cv-cream-50 sm:text-5xl`}>
            {menu.title}
          </h1>
          {menu.tagline ? (
            <p className="mt-3 text-sm italic leading-relaxed text-cv-cream-200 sm:text-base">
              {menu.tagline}
            </p>
          ) : null}
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-cv-gold-400">
            Chef {menu.chef} · {menu.restaurant}
          </p>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────── 2. Conceptos + Narrativa ─────────────────── */

function NarrativeBlock({
  concepts,
  narrative,
}: {
  concepts?: string[];
  narrative?: string;
}) {
  return (
    <section className="mx-auto max-w-3xl text-center">
      {concepts?.length ? (
        <div className="flex flex-wrap justify-center gap-2">
          {concepts.map((concept) => (
            <span
              key={concept}
              className="inline-flex items-center gap-1.5 rounded-full bg-cv-green-50 px-3 py-1 text-xs font-medium text-cv-green-800"
            >
              <Leaf weight="fill" className="h-3 w-3 text-cv-green-500" />
              {concept}
            </span>
          ))}
        </div>
      ) : null}

      {narrative ? (
        <>
          <h2 className={`${SERIF} mt-7 text-2xl font-semibold text-cv-green-900 sm:text-3xl`}>
            La Narrativa del Bosque en un Plato
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-cv-gray-700 sm:text-base">
            {narrative}
          </p>
        </>
      ) : null}
    </section>
  );
}

/* ─────────────────── 3. Creaciones de Autor ─────────────────── */

function SignatureCreations({ creations }: { creations: MenuCreation[] }) {
  return (
    <section>
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
            Cosecha Actual
          </p>
          <h2 className={`${SERIF} mt-1 text-2xl font-semibold text-cv-green-900 sm:text-3xl`}>
            Creaciones de Autor
          </h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {creations.map((creation) => (
          <CreationCard key={creation.name} creation={creation} />
        ))}
      </div>
    </section>
  );
}

function CreationCard({ creation }: { creation: MenuCreation }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-cv-cream-300 bg-card transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cv-green-900/10">
      <div className="h-44 overflow-hidden">
        <img
          src={creation.image}
          alt={creation.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`${SERIF} text-lg font-semibold text-cv-green-900`}>
            {creation.name}
          </h3>
          <span className="shrink-0 rounded-full bg-cv-gold-300/40 px-2.5 py-1 text-xs font-semibold text-cv-gold-600">
            {creation.price}
          </span>
        </div>
        <p className="text-sm leading-relaxed text-cv-gray-600">
          {creation.description}
        </p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-cv-green-700">
          <MapPin weight="fill" className="h-3.5 w-3.5 text-cv-green-500" />
          Origen: {creation.origin}
        </p>
      </div>
    </article>
  );
}

/* ─────────────────── 4. Menú de Temporada ─────────────────── */

function SeasonalMenu({
  restaurant,
  traceability,
  seasonal,
}: {
  restaurant: string;
  traceability?: MenuTraceability;
  seasonal: NonNullable<Menu["seasonalMenu"]>;
}) {
  return (
    <section className="rounded-3xl border border-cv-cream-300 bg-cv-cream-100 p-6 sm:p-10">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        {/* Sidebar trazabilidad (sticky en desktop) */}
        {traceability ? (
          <TraceabilitySidebar restaurant={restaurant} traceability={traceability} />
        ) : null}

        {/* Bloque principal */}
        <div>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
              {seasonal.eyebrow}
            </p>
            <h2 className={`${SERIF} mt-1 text-3xl font-semibold text-cv-green-900 sm:text-4xl`}>
              {seasonal.title}
            </h2>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-cv-green-700">
              <Sparkle weight="fill" className="h-3.5 w-3.5 text-cv-gold-500" />
              Ingrediente Estrella: {seasonal.starIngredient}
            </p>
          </div>

          {/* Ingrediente estrella: imagen + cita */}
          <div className="relative mt-6 aspect-[21/9] overflow-hidden rounded-2xl">
            <img
              src={seasonal.starImage}
              alt={seasonal.starIngredient}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-cv-green-900/45" />
            <p
              className={`${SERIF} absolute bottom-4 left-4 right-4 flex items-start gap-2 text-base italic text-cv-cream-50 sm:text-lg`}
            >
              <Quotes weight="fill" className="mt-1 h-4 w-4 shrink-0 text-cv-gold-400" />
              {seasonal.quote}
            </p>
          </div>

          {/* Cursos */}
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {seasonal.courses.map((course) => (
              <CourseColumn key={course.title} course={course} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TraceabilitySidebar({
  restaurant,
  traceability,
}: {
  restaurant: string;
  traceability: MenuTraceability;
}) {
  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <p className={`${SERIF} text-xl font-semibold text-cv-green-900`}>{restaurant}</p>
      <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
        Gastronomy
      </p>

      <div className="mt-6 space-y-5 border-t border-cv-cream-300 pt-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-cv-gray-500">
            Trazabilidad
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium text-cv-green-800">
            <SealCheck weight="fill" className="h-4 w-4 text-cv-green-500" />
            {traceability.farmToTablePct}% Farm-to-Table
          </p>
          <p className="mt-1 text-xs leading-relaxed text-cv-gray-600">
            {traceability.note}
          </p>
        </div>

        <div className="border-t border-cv-cream-300 pt-4">
          <p className="flex items-center gap-2 text-sm font-medium text-cv-green-800">
            <CalendarBlank weight="fill" className="h-4 w-4 text-cv-green-500" />
            Calendario Vivo
          </p>
          <p className="mt-1 text-xs leading-relaxed text-cv-gray-600">
            {traceability.cycle}
          </p>
        </div>
      </div>
    </aside>
  );
}

function CourseColumn({ course }: { course: MenuCourse }) {
  return (
    <div>
      <h3 className="flex items-center gap-2 border-b border-cv-green-200 pb-2 text-sm font-semibold uppercase tracking-wide text-cv-green-800">
        <ForkKnife weight="fill" className="h-4 w-4 text-cv-gold-500" />
        {course.title}
      </h3>
      <ul className="mt-4 space-y-4">
        {course.dishes.map((dish) => (
          <li key={dish.name}>
            <p className={`${SERIF} text-base font-semibold text-cv-green-900`}>
              {dish.name}
            </p>
            <p className="mt-1 text-xs italic leading-relaxed text-cv-gray-600">
              {dish.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
