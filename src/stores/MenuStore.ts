import { LinkItem } from "@/model/Menu";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./AuthStore";

export const useMenuStore = defineStore('menuStore', () => {

  const sideBarAdminMenu = ref<Array<LinkItem>>([
    new LinkItem(0, "/admin/organizations", "Organizations", false, "admin"),
    new LinkItem(1, "/admin/departments", "Departments", false, "admin"),
    new LinkItem(2, "/admin/point-of-presences", "PointOfPresences", false, "admin"),
    new LinkItem(3, "/admin/positions", "Positions", false, "admin"),
    new LinkItem(4, "/admin/employees", "Employees", false, "admin"),
    new LinkItem(5, "/admin/users", "Users", false, "security"),
    new LinkItem(6, "/admin/roles", "Roles", false, "security"),
    new LinkItem(7, "/admin/upload", "Upload", false, "security")
  ]);

  const mainMenuList = ref<Array<LinkItem>>([
    new LinkItem(0, "/admin", "Setting", false, "admin"),
    new LinkItem(1, "/phone", "Phone", false, "all"),
    new LinkItem(2, "/dictionaries", "Dictionaries", false, "all"),
  ])

  const menuDicList = ref<Array<LinkItem>>([
    new LinkItem(0, "/dictionaries/equip-types", "EquipType", false, "all"),
    new LinkItem(1, "/dictionaries/equip-model", "EquipModel", false, "all"),
  ])

  const path = computed<string>(() => useRoute().fullPath);

  const settingMenu = computed<Array<LinkItem>>(() => setItemLinkActive(sideBarAdminMenu.value));

  const menuDics = computed<Array<LinkItem>>(() => setItemLinkActive(menuDicList.value));

  const mainMenu = computed<Array<LinkItem>>(() => {
    if(useAuthStore().isAuth){
      if (!useAuthStore().isAdmin) {
        return setItemLinkActive(mainMenuList.value.filter(item => item.access != "admin"));
      } else {
        return setItemLinkActive(mainMenuList.value);
      }
    }else{
      return []
    }
  })

  function setItemLinkActive(menuList: Array<LinkItem> = []): Array<LinkItem> {
    const itemIndex = menuList
      .findIndex(item => path.value.includes(item.link));
    const linkItem: LinkItem | undefined = itemIndex != -1 ? { ...menuList[itemIndex] } : undefined;
    if (linkItem) {
      linkItem.active = true
    }
    const arr: Array<LinkItem> = itemIndex != -1
      ? [
        ...menuList.slice(0, itemIndex),
        linkItem as LinkItem,
        ...menuList.slice(itemIndex + 1, menuList.length)
      ]
      : [...menuList]
    return arr;
  }

  return {
    settingMenu,
    mainMenu,
    menuDics
  }

})