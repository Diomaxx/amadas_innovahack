"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

type CounterProps = {
  to: number;
  className?: string;
  duration?: number;
};

/**
 * Counts up from 0 to `to` once it scrolls into view.
 */
export function Counter({ to, className, duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const value = useMotionValue(0);
  const spring = useSpring(value, {
    duration: duration * 1000,
    bounce: 0,
  });
  const display = useTransform(spring, (latest) =>
    Math.round(latest).toLocaleString("es-BO"),
  );

  useEffect(() => {
    if (inView) value.set(to);
  }, [inView, to, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
