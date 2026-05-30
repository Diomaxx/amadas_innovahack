"use client";

import { motion } from "framer-motion";

export function CatalogoDetailSkeleton() {
  return (
    <div className="w-full pb-12">
      {/* ── Top Hero Section Skeleton ── */}
      <div className="flex flex-col gap-6">
        <motion.div
          className="h-5 w-32 rounded bg-cv-cream-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* Left: Image Skeleton */}
          <motion.div
            className="w-full aspect-[4/3] lg:aspect-auto lg:h-full rounded-[2rem] bg-cv-cream-200"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
          />

          {/* Right: Info Skeleton */}
          <div className="flex flex-col">
            <motion.div
              className="mb-4 h-4 w-1/3 rounded bg-cv-cream-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.div
              className="mb-4 h-6 w-1/4 rounded-full bg-cv-cream-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.div
              className="mb-10 h-16 w-3/4 rounded bg-cv-cream-200"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            />

            {/* Calendar Card Skeleton */}
            <motion.div
              className="rounded-3xl border border-[#E8E8E8] bg-white p-6 shadow-sm sm:p-8"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <div className="mb-6 h-6 w-1/2 rounded bg-cv-cream-200" />
              <div className="mb-6 h-12 w-full rounded bg-cv-cream-100" />
              <div className="mb-6 h-4 w-1/3 rounded bg-cv-cream-200" />
              <div className="mb-6 h-8 w-full rounded bg-cv-cream-100" />
              <div className="h-16 w-full rounded-xl bg-cv-cream-200" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Info Cards Skeleton ── */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="flex h-64 flex-col rounded-3xl bg-cv-cream-100 p-8 shadow-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 + i * 0.1 }}
          />
        ))}
      </div>

      {/* ── Availability Skeleton ── */}
      <motion.div
        className="mt-12 h-48 rounded-2xl bg-cv-cream-100"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
      />

      {/* ── Subscription Skeleton ── */}
      <motion.div
        className="mt-8 h-96 rounded-3xl bg-[#1B3A2D] opacity-80"
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}
