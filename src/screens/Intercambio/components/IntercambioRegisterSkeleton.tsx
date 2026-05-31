"use client";

import { motion } from "framer-motion";

const pulse = (delay = 0) => ({
  animate: { opacity: [0.5, 1, 0.5] as number[] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export function IntercambioRegisterSkeleton() {
  return (
    <div className="w-full pb-12">
      <motion.div className="mb-6 h-5 w-40 rounded bg-cv-cream-200" {...pulse()} />

      <section className="mb-8 space-y-3">
        <motion.div className="h-10 w-2/3 max-w-lg rounded-lg bg-cv-cream-200" {...pulse(0.1)} />
        <motion.div className="h-14 w-full max-w-2xl rounded-lg bg-cv-cream-100" {...pulse(0.2)} />
      </section>

      <motion.div
        className="mb-6 flex h-12 w-full max-w-xs gap-1 rounded-xl border border-cv-cream-200 bg-cv-cream-100 p-1"
        {...pulse(0.25)}
      >
        <div className="h-full flex-1 rounded-lg bg-white" />
        <div className="h-full flex-1 rounded-lg bg-cv-cream-200/60" />
      </motion.div>

      <div className="space-y-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="overflow-hidden rounded-xl border border-cv-cream-200 bg-white shadow-sm"
            {...pulse(0.3 + i * 0.1)}
          >
            <div className="flex items-start gap-3 border-b border-cv-cream-200 bg-cv-cream-50/60 p-6">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-cv-cream-200" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-48 rounded bg-cv-cream-200" />
                <div className="h-3 w-full max-w-md rounded bg-cv-cream-100" />
              </div>
            </div>
            <div className="space-y-4 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="h-10 rounded-md bg-cv-cream-100" />
                <div className="h-10 rounded-md bg-cv-cream-100" />
              </div>
              {i === 2 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {[...Array(12)].map((_, j) => (
                    <div key={j} className="h-9 rounded-lg bg-cv-cream-100" />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <motion.div className="h-10 w-32 rounded-md bg-cv-cream-200" {...pulse(0.8)} />
        <motion.div className="h-10 w-40 rounded-md bg-cv-cream-200" {...pulse(0.9)} />
      </div>
    </div>
  );
}
