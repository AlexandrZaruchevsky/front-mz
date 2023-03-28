<template>
  <div class="sidebar">
    <div>
      <div class="sidebar-header">
        <router-link to="/">
          {{ title }}
        </router-link>
      </div>
      <div class="menu">
        <router-link v-for="item in menu" :key="item.id" class="menu-item" :class="isActive(item.id)?'menu-item-active':'menu-item-not-active'" :to="item.link"
          @click="clickItem(item.id)">
          {{ item.title }}
        </router-link>
      </div>
    </div>
    <div class="p-2">{{ shortFIO }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

interface IMenuLink {
  id: number,
  link: string,
  title: string,
  active: boolean
}

const menu = ref<Array<IMenuLink>>([
  {
    id: 0,
    link: "/admin/organizations",
    title: "Organizations",
    active: true
  },
  {
    id: 1,
    link: "/admin/departments",
    title: "Departments",
    active: false
  },
  {
    id: 2,
    link: "/admin/point-of-presences",
    title: "Point of presence",
    active: false
  },
  {
    id: 3,
    link: "/admin/positions",
    title: "Positions",
    active: false
  },
  {
    id: 4,
    link: "/admin/employees",
    title: "Employees",
    active: false
  },
  {
    id: 5,
    link: "/admin/users",
    title: "Users",
    active: false
  },
  {
    id: 6,
    link: "/admin/roles",
    title: "Roles",
    active: false
  },
  {
    id: 7,
    link: "/admin/upload",
    title: "Upload",
    active: false
  }
])

const title = import.meta.env.VITE_APP_NAME
const { shortFIO } = storeToRefs(useAuthStore())

const currentItem = ref<number>(0);

const clickItem = (id: number) => {
  currentItem.value = id
}

const isActive = (id: number) => menu.value.filter(item => item.id == id)[0]?.active

watch(currentItem, () => {
  menu.value.forEach(item => item.active = false)
  menu.value.filter(item => item.id == currentItem.value)
    .forEach(item => item.active = true)
})

</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  @apply flex flex-col justify-between bg-white bg-opacity-80;
}

.sidebar-header {
  @apply text-2xl font-bold py-2 px-4 text-slate-800 bg-white shadow-lg mb-4;
}

.menu {
  @apply flex flex-col gap-2 p-2;
}

.menu-item {
  @apply px-2 py-1 rounded  text-center whitespace-nowrap;
}

.menu-item-active {
  @apply bg-slate-500 text-white;
}

.menu-item-not-active{
  @apply bg-slate-400 bg-opacity-20;
}

.menu-item:hover {
  @apply bg-opacity-90 text-white;
}
</style>