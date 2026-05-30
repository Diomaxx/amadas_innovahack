import menusMock from "@/mocks/menus.json";
import type { Menu } from "@/screens/Menus/menus.types";

const NETWORK_DELAY_MS = 120;

async function simulateFirestoreConnection(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));
}

function sortMenusByBusinessRules(menus: Menu[]): Menu[] {
  return [...menus].sort((a, b) => {
    if (a.featured !== b.featured) {
      return a.featured ? -1 : 1;
    }

    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

export async function getMenus(): Promise<Menu[]> {
  await simulateFirestoreConnection();
  return sortMenusByBusinessRules(menusMock as Menu[]);
}
