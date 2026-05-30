"use client";

import { CircleDollarSign, ReceiptText, Store } from "lucide-react";
import { motion } from "framer-motion";
import { Counter } from "@/components/UI/Counter";
import { stats } from "./landingProductores.data";

const icons = [Store, ReceiptText, CircleDollarSign];
const EASE = [0.22, 1, 0.36, 1] as const;

/** Splits "120+ restaurantes..." into { num: 120, rest: "+ restaurantes..." }. */
function parseStat(text: string) {
  const match = text.match(/^(\d[\d.,]*)(.*)$/);
  if (!match) return { num: null as number | null, rest: text };
  return { num: Number(match[1].replace(/[.,]/g, "")), rest: match[2] };
}

export function LandingProductoresStats() {
  return (
    <section className="border-y border-cv-cream-300 bg-cv-cream-100">
      <div className="mx-auto grid max-w-6xl gap-px overflow-hidden px-4 py-2 sm:grid-cols-3 sm:px-6 lg:px-8">
        {stats.map((item, index) => {
          const Icon = icons[index] ?? Store;
          const { num, rest } = parseStat(item);

          return (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: EASE }}
              className="flex items-center gap-4 px-2 py-6 sm:justify-center sm:px-6"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cv-green-100 ring-1 ring-cv-green-300">
                <Icon className="h-5 w-5 text-cv-gold-600" />
              </span>
              <p className="text-sm font-semibold text-cv-green-900">
                {num !== null && (
                  <span className="font-display mr-1 text-2xl font-semibold text-cv-green-800">
                    <Counter to={num} />
                  </span>
                )}
                <span className={num !== null ? "text-cv-gray-700" : "text-cv-green-900"}>
                  {rest}
                </span>
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
