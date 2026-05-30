import { getMenus } from "@/server/menus/menus.repository";
import { FeaturedMenuCard, MenusHero, SideMenuCard } from "./components/MenusHero";
import { MenusGrid } from "./components/MenusGrid";

export default async function MenusPage() {
  const menus = await getMenus();
  const featuredMenu = menus.find((menu) => menu.featured) ?? null;
  const nonFeaturedMenus = menus.filter((menu) => !menu.featured);
  const topSideMenu = nonFeaturedMenus[0] ?? null;
  const regularMenus = topSideMenu ? nonFeaturedMenus.slice(1) : nonFeaturedMenus;

  return (
    <section className="space-y-8 pb-4">
      <MenusHero totalMenus={menus.length} />

      {featuredMenu ? (
        <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
          <FeaturedMenuCard menu={featuredMenu} />
          {topSideMenu ? <SideMenuCard menu={topSideMenu} /> : null}
        </div>
      ) : null}

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-cv-green-900">Mas propuestas</h2>
        <MenusGrid menus={regularMenus} />
      </div>
    </section>
  );
}
