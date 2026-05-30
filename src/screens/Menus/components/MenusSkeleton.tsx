"use client";

import { motion } from "framer-motion";

export function MenusSkeleton() {
  return (
    <section className="space-y-8 pb-4">
      <header className="rounded-3xl border border-cv-cream-300 bg-gradient-to-br from-cv-cream-100 via-cv-cream-50 to-cv-green-50 p-6 shadow-sm sm:p-8">
        <motion.div
          className="h-3 w-44 rounded bg-cv-cream-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="mt-4 h-10 w-3/4 rounded-lg bg-cv-cream-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        />
        <motion.div
          className="mt-4 h-5 w-full max-w-3xl rounded bg-cv-cream-100"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        />
      </header>

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <motion.article
          className="overflow-hidden rounded-3xl border border-cv-cream-200 bg-white shadow-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        >
          <div className="h-72 w-full bg-cv-cream-200" />
          <div className="space-y-3 p-6 sm:p-8">
            <div className="h-4 w-1/2 rounded bg-cv-cream-200" />
            <div className="h-7 w-2/3 rounded bg-cv-cream-200" />
            <div className="h-4 w-full rounded bg-cv-cream-100" />
            <div className="h-4 w-4/5 rounded bg-cv-cream-100" />
          </div>
        </motion.article>

        <motion.article
          className="overflow-hidden rounded-3xl border border-cv-cream-200 bg-white shadow-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <div className="h-64 w-full bg-cv-cream-200" />
          <div className="space-y-3 p-5">
            <div className="h-4 w-1/2 rounded bg-cv-cream-200" />
            <div className="h-6 w-3/4 rounded bg-cv-cream-200" />
            <div className="h-4 w-full rounded bg-cv-cream-100" />
            <div className="h-4 w-2/3 rounded bg-cv-cream-100" />
          </div>
        </motion.article>
      </div>

      <div className="space-y-4">
        <motion.div
          className="h-8 w-56 rounded bg-cv-cream-200"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <motion.article
              key={index}
              className="overflow-hidden rounded-2xl border border-cv-cream-200 bg-white shadow-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.1,
              }}
            >
              <div className="h-48 w-full bg-cv-cream-200" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-1/3 rounded bg-cv-cream-100" />
                <div className="h-6 w-3/4 rounded bg-cv-cream-200" />
                <div className="h-4 w-full rounded bg-cv-cream-100" />
                <div className="h-4 w-4/5 rounded bg-cv-cream-100" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
