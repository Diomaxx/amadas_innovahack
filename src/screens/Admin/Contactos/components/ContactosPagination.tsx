import { ChevronLeft, ChevronRight } from "lucide-react";

type ContactosPaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export function ContactosPagination({
  page,
  totalPages,
  onChange,
}: ContactosPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Paginación de contactos"
      className="mt-8 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Página anterior"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cv-cream-300 bg-white text-cv-gray-600 transition-colors hover:bg-cv-cream-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={
            p === page
              ? "inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg bg-cv-green-700 px-3 text-sm font-semibold text-white"
              : "inline-flex h-9 min-w-[2.25rem] items-center justify-center rounded-lg border border-cv-cream-300 bg-white px-3 text-sm font-medium text-cv-gray-600 transition-colors hover:bg-cv-cream-100"
          }
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Página siguiente"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-cv-cream-300 bg-white text-cv-gray-600 transition-colors hover:bg-cv-cream-100 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
