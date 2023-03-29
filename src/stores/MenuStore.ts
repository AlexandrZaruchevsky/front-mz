import { LinkItem } from "@/model/Menu";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

export const useMenuStore = defineStore('menuStore', () => {
  const sideBarAdminMenu = ref<Array<LinkItem>>([
    new LinkItem(0, "/admin/organizations", "Organizations", false),
    new LinkItem(1, "/admin/departments", "Departments", false),
    new LinkItem(2, "/admin/point-of-presences", "PointOfPresences", false),
    new LinkItem(3, "/admin/positions", "Positions", false),
    new LinkItem(4, "/admin/employees", "Employees", false),
    new LinkItem(5, "/admin/users", "Users", false),
    new LinkItem(6, "/admin/roles", "Roles", false),
    new LinkItem(7, "/admin/upload", "Upload", false)
  ]);

  const path = computed<string>(() => useRoute().fullPath);

  const menu = computed<Array<LinkItem>>(() => {
    const itemIndex = sideBarAdminMenu.value
      .findIndex(item => path.value.includes(item.link));
    const linkItem: LinkItem | undefined = itemIndex != -1 ? { ...sideBarAdminMenu.value[itemIndex] } : undefined;
    if (linkItem) {
      linkItem.active = true
    }
    const arr: Array<LinkItem> = itemIndex != -1
      ? [
        ...sideBarAdminMenu.value.slice(0, itemIndex),
        linkItem as LinkItem,
        ...sideBarAdminMenu.value.slice(itemIndex + 1, sideBarAdminMenu.value.length)
      ]
      : [...sideBarAdminMenu.value]
    return arr;
  })

  return {
    menu
  }

})