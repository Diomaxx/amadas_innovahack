"use client";

import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Infinite, seamless horizontal marquee. Renders its children twice and
 * translates -50% so the loop is gapless. Pauses on hover.
 */
export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className={`marquee-pause group/marquee overflow-hidden ${className ?? ""}`}>
      <div className="marquee-track flex w-max items-center">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
