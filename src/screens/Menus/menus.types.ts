/** Plato de autor del bloque "Creaciones de Autor" (data propia del menú). */
export type MenuCreation = {
  name: string;
  price: string;
  description: string;
  origin: string;
  image: string;
};

/** Plato individual dentro de un curso del menú de temporada. */
export type MenuDish = {
  name: string;
  description: string;
};

/** Curso del menú de temporada (Entradas / Fuertes / Dulce Final). */
export type MenuCourse = {
  title: string;
  dishes: MenuDish[];
};

/** Datos de trazabilidad mostrados en el sidebar del menú de temporada. */
export type MenuTraceability = {
  farmToTablePct: number;
  cycle: string;
  note: string;
};

/** Bloque "Menú de Temporada" con ingrediente estrella y cursos. */
export type MenuSeasonal = {
  eyebrow: string;
  title: string;
  starIngredient: string;
  starImage: string;
  quote: string;
  courses: MenuCourse[];
};

export type Menu = {
  id: string;
  title: string;
  restaurant: string;
  chef: string;
  summary: string;
  category: string;
  coverImage: string;
  featured: boolean;
  tags: string[];
  updatedAt: string;

  /** Secciones enriquecidas del detalle (opcionales: degradan si faltan). */
  tagline?: string;
  concepts?: string[];
  narrative?: string;
  signatureCreations?: MenuCreation[];
  traceability?: MenuTraceability;
  seasonalMenu?: MenuSeasonal;
};
