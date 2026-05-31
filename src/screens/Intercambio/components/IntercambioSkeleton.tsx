"use client";

import { motion } from "framer-motion";

const pulse = (delay = 0) => ({
  animate: { opacity: [0.5, 1, 0.5] as number[] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export function IntercambioSkeleton() {
  return (
    <div className="w-full">
      {/* Header */}
      <section className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            <motion.div
              className="h-10 w-3/4 max-w-md rounded-lg bg-cv-cream-200"
              {...pulse()}
            />
            <motion.div
              className="h-14 w-full max-w-2xl rounded-lg bg-cv-cream-100"
              {...pulse(0.15)}
            />
          </div>
          <motion.div
            className="h-11 w-32 shrink-0 rounded-xl bg-cv-cream-200"
            {...pulse(0.1)}
          />
        </div>
      </section>

      {/* Market stability card */}
      <motion.div
        className="mb-8 rounded-2xl border border-cv-cream-200 bg-white p-6"
        {...pulse(0.2)}
      >
        <div className="mb-6 flex items-start gap-4">
          <div className="h-11 w-11 rounded-lg bg-cv-cream-200" />
          <div className="flex-1 space-y-2">
            <div className="h-5 w-64 rounded bg-cv-cream-200" />
            <div className="h-3 w-40 rounded bg-cv-cream-100" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-3/4 rounded bg-cv-cream-100" />
              <div className="h-7 w-1/2 rounded bg-cv-cream-200" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Two-column layout */}
      <div className="flex gap-10 lg:gap-14">
        {/* Filters sidebar */}
        <div className="hidden w-44 shrink-0 md:block lg:w-48">
          <motion.div className="mb-4 h-4 w-32 rounded bg-cv-cream-200" {...pulse(0.1)} />
          <motion.div className="mb-6 h-48 w-full rounded-xl bg-cv-cream-100" {...pulse(0.2)} />
          <motion.div className="h-36 w-full rounded-xl bg-cv-cream-100" {...pulse(0.3)} />
        </div>

        {/* Cards */}
        <div className="flex-1 min-w-0 space-y-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="flex overflow-hidden rounded-2xl border border-cv-cream-200 bg-white shadow-sm"
              {...pulse(i * 0.12)}
            >
              <div className="h-72 w-64 shrink-0 bg-cv-cream-200" />
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div className="h-5 w-3/4 rounded bg-cv-cream-200" />
                <div className="h-10 w-full rounded bg-cv-cream-100" />
                <div className="h-24 w-full rounded-xl bg-cv-cream-100" />
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-cv-cream-200" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-28 rounded bg-cv-cream-200" />
                      <div className="h-2 w-20 rounded bg-cv-cream-100" />
                    </div>
                  </div>
                  <div className="h-9 w-28 rounded-lg bg-cv-cream-200" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Protection card */}
          <motion.div
            className="mt-6 h-64 rounded-[28px] bg-cv-green-800/20"
            {...pulse(0.5)}
          />
        </div>
      </div>
    </div>
  );
}
