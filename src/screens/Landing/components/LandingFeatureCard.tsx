"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type LandingFeatureCardProps = {
  backgroundImage: string;
  overlayClassName: string;
  icon: ReactNode;
  iconClassName: string;
  title: ReactNode;
  dividerClassName: string;
  description: string;
  buttonLabel: string;
  buttonClassName: string;
  buttonHref: string;
  index?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

export default function LandingFeatureCard({
  backgroundImage,
  overlayClassName,
  icon,
  iconClassName,
  title,
  dividerClassName,
  description,
  buttonLabel,
  buttonClassName,
  buttonHref,
  index = 0,
}: LandingFeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      whileHover={{ y: -6 }}
      className="bg-grain group relative min-h-[360px] overflow-hidden rounded-3xl shadow-xl shadow-cv-green-900/15"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />
      <div className={`absolute inset-0 ${overlayClassName}`} />

      <div className="relative z-10 flex h-full max-w-md flex-col px-8 py-9 text-white md:py-11">
        <div className={`${iconClassName} transition-transform duration-500 group-hover:-translate-y-1`}>
          {icon}
        </div>
        <h2 className="font-display text-4xl font-semibold leading-tight">{title}</h2>
        <div className={`${dividerClassName} origin-left transition-all duration-500 group-hover:w-40`} />
        <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/90">{description}</p>
        <Link
          href={buttonHref}
          className={`group/btn mt-auto inline-flex items-center gap-2 ${buttonClassName}`}
        >
          {buttonLabel}
          <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}
