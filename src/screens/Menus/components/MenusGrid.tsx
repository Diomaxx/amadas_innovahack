import type { Menu } from "../menus.types";

type MenusGridProps = {
  menus: Menu[];
};

function MenuTags({ tags }: { tags: string[] }) {
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

function MenuCard({ menu }: { menu: Menu }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-cv-cream-300 bg-card transition hover:-translate-y-1 hover:shadow-lg hover:shadow-cv-green-900/10">
      <div className="h-48 overflow-hidden">
        <img
          src={menu.coverImage}
          alt={menu.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="space-y-3 p-5">
        <p className="text-sm font-medium text-cv-gold-600">{menu.restaurant}</p>

        <h3 className="text-xl font-semibold text-cv-green-900">{menu.title}</h3>

        <p className="text-sm leading-relaxed text-cv-gray-600">{menu.summary}</p>

        <MenuTags tags={menu.tags} />

        <a href="#" className="inline-flex text-sm font-medium text-cv-green-700 underline-offset-4 hover:underline">
          Explorar menu
        </a>
      </div>
    </article>
  );
}

export function MenusGrid({ menus }: MenusGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </div>
  );
}
