"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type LandingFeatureCardProps = {
  backgroundImage: string;
  overlayClassName: string;
  icon: string;
  iconClassName: string;
  title: ReactNode;
  dividerClassName: string;
  description: string;
  buttonLabel: string;
  buttonClassName: string;
  buttonHref: string;
};

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
}: LandingFeatureCardProps) {
  return (
    <article
      className="relative min-h-[320px] overflow-hidden rounded-2xl"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 ${overlayClassName}`} />
      <div className="relative z-10 flex h-full max-w-md flex-col px-8 py-8 text-white md:py-10">
        <div className={iconClassName}>{icon}</div>
        <h2 className="text-3xl font-extrabold leading-tight">{title}</h2>
        <div className={dividerClassName} />
        <p className="mt-4 text-lg text-white/90">{description}</p>
        <Link href={buttonHref} className={buttonClassName}>
          {buttonLabel}
        </Link>
      </div>
    </article>
  );
}
