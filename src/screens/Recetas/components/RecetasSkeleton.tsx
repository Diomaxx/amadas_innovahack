"use client";

import { motion } from "framer-motion";

const pulse = (delay = 0) => ({
  animate: { opacity: [0.5, 1, 0.5] as number[] },
  transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

export function RecetasSkeleton() {
  return (
    <section className="space-y-10">
      <motion.div className="h-72 rounded-3xl bg-[#e9e2d4]" {...pulse()} />

      <div className="space-y-6">
        <motion.div className="h-28 rounded-2xl bg-[#f0ebdf]" {...pulse(0.1)} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(8)].map((_, index) => (
            <motion.article
              key={index}
              className="overflow-hidden rounded-2xl border border-[#e8e0d0] bg-white"
              {...pulse(index * 0.08)}
            >
              <div className="h-40 bg-[#e9e2d4]" />
              <div className="space-y-3 p-5">
                <div className="h-5 w-2/3 rounded bg-[#e9e2d4]" />
                <div className="h-3 w-3/4 rounded bg-[#f0ebdf]" />
                <div className="h-10 w-full rounded bg-[#f0ebdf]" />
                <div className="h-4 w-1/3 rounded bg-[#e9e2d4]" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
