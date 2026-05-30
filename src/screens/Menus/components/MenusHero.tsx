import type { Menu } from "../menus.types";

type MenusHeroProps = {
  totalMenus: number;
};

function TagsRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-cv-cream-100 px-2.5 py-1 text-xs font-medium text-cv-gray-700"
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}

export function MenusHero({ totalMenus }: MenusHeroProps) {
  return (
    <header className="rounded-3xl border border-cv-cream-300 bg-gradient-to-br from-cv-cream-100 via-cv-cream-50 to-cv-green-50 p-6 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cv-gold-600">
        Vitrina del Bosque Chiquitano
      </p>
      <h1 className="mt-3 text-3xl font-bold text-cv-green-900 sm:text-5xl">Menus de Temporada</h1>
      <p className="mt-4 max-w-3xl text-base leading-relaxed text-cv-gray-700 sm:text-lg">
        Exploramos propuestas gastronomicas activas conectadas a productos del bosque.
      </p>
      <div className="mt-6 inline-flex rounded-full border border-cv-green-300 bg-cv-green-50 px-4 py-2 text-sm font-medium text-cv-green-800">
        {totalMenus} menus disponibles
      </div>
    </header>
  );
}

type FeaturedMenuCardProps = {
  menu: Menu;
};

export function FeaturedMenuCard({ menu }: FeaturedMenuCardProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-cv-green-200 bg-card shadow-lg shadow-cv-green-900/10">
      <div className="relative h-72">
        <img src={menu.coverImage} alt={menu.title} className="h-full w-full object-cover" />
        <div className="absolute left-4 top-4 rounded-full bg-cv-green-100 px-3 py-1 text-xs font-semibold text-cv-green-900">
          Cosecha actual
        </div>
      </div>
      <div className="space-y-4 p-6 sm:p-8">
        <p className="text-sm font-medium text-cv-gold-600">
          Chef {menu.chef} | {menu.restaurant}
        </p>
        <h2 className="text-2xl font-semibold text-cv-green-900">{menu.title}</h2>
        <p className="text-cv-gray-700">{menu.summary}</p>
        <div className="border-t border-cv-cream-300 pt-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-cv-gold-600">
            Productos del bosque utilizados
          </p>
          <TagsRow tags={menu.tags} />
        </div>
      </div>
    </article>
  );
}

type SideMenuCardProps = {
  menu: Menu;
};

export function SideMenuCard({ menu }: SideMenuCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-cv-cream-300 bg-card shadow-sm">
      <div className="h-64">
        <img src={menu.coverImage} alt={menu.title} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-5">
        <p className="text-sm font-medium text-cv-gold-600">Restaurante {menu.restaurant}</p>
        <h3 className="text-2xl font-semibold leading-tight text-cv-green-800">{menu.title}</h3>
        <p className="text-sm leading-relaxed text-cv-gray-700">{menu.summary}</p>
        <div className="pt-2">
          <TagsRow tags={menu.tags} />
        </div>
      </div>
    </article>
  );
}
