import { CalendarDays } from "lucide-react";

type AdminPageHeaderProps = {
  title: string;
  subtitle?: string;
  /** Etiqueta del selector de periodo (decorativo por ahora). */
  period?: string;
};

export function AdminPageHeader({
  title,
  subtitle,
  period = "Octubre 2024",
}: AdminPageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold text-cv-green-900">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1.5 text-sm text-cv-gray-600">{subtitle}</p>
        ) : null}
      </div>

      <span className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-cv-cream-300 bg-white px-3.5 py-2 text-sm font-medium text-cv-gray-700 shadow-sm">
        <CalendarDays className="h-4 w-4 text-cv-gray-500" />
        {period}
      </span>
    </header>
  );
}
