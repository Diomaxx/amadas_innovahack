"use client";

import { motion } from "framer-motion";

export function CatalogoSkeleton() {
  return (
    <div className="w-full">
      {/* ── Hero header Skeleton ── */}
      <section className="mb-8">
        <motion.div
          className="mb-4 h-10 w-3/4 max-w-sm rounded-lg bg-cv-cream-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="h-16 w-full max-w-xl rounded-lg bg-cv-cream-100"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </section>

      {/* ── Filtros (toolbar) Skeleton ── */}
      <motion.div
        className="h-32 w-full rounded-2xl bg-cv-cream-100"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
      />

      {/* ── Grid Skeleton ── */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="flex flex-col overflow-hidden rounded-xl border border-cv-cream-200 bg-white shadow-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
          >
            {/* Image Placeholder */}
            <div className="w-full bg-cv-cream-200" style={{ aspectRatio: "4/3" }} />
            {/* Content Placeholder */}
            <div className="flex flex-col p-4">
              <div className="mb-2 h-4 w-3/4 rounded bg-cv-cream-200" />
              <div className="h-3 w-1/2 rounded bg-cv-cream-100" />
              <div className="my-3 h-px w-full bg-cv-cream-100" />
              <div className="flex items-center justify-between">
                <div className="h-3 w-1/3 rounded bg-cv-cream-200" />
                <div className="h-5 w-5 rounded-full bg-cv-cream-200" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Otros Recursos Skeleton */}
      <section className="mt-12">
        <motion.div
          className="mb-4 h-6 w-48 rounded bg-cv-cream-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex flex-col gap-2.5">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 rounded-xl border border-cv-cream-200 bg-white px-4 py-3.5"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
            >
              <div className="h-10 w-10 shrink-0 rounded-full bg-cv-cream-200" />
              <div className="flex-1">
                <div className="mb-1.5 h-3 w-1/3 rounded bg-cv-cream-200" />
                <div className="h-2 w-1/4 rounded bg-cv-cream-100" />
              </div>
              <div className="h-5 w-20 rounded-full bg-cv-cream-200" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
