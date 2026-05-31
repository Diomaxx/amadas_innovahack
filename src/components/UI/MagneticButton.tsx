"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** @deprecated kept for compatibility; no longer used. */
  strength?: number;
};

/**
 * Link with a subtle, contained hover response — a small lift on hover and a
 * gentle press on tap. No cursor tracking.
 */
export function MagneticButton({ href, children, className }: MagneticButtonProps) {
  return (
    <motion.div
      className="inline-flex"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      <Link href={href} className={className}>
        {children}
      </Link>
    </motion.div>
  );
}
