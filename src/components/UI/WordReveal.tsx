"use client";

import { motion } from "framer-motion";

type WordRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Reveals a headline word-by-word with a clipped upward slide.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = "h1",
}: WordRevealProps) {
  const words = text.split(" ");
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.28em" }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              visible: { y: 0, transition: { duration: 0.85, ease: EASE } },
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
