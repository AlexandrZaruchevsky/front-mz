<template>
  <div class="sidebar">
    <div>
      <div class="sidebar-header">
        <router-link to="/">
          {{ title }}
        </router-link>
      </div>
      <div class="menu">
        <router-link class="menu-item" to="/admin/organizations">Organizations</router-link>
        <router-link class="menu-item" to="/admin/departments">Departments</router-link>
        <router-link class="menu-item" to="/admin/point-of-presences">Point of presence</router-link>
        <router-link class="menu-item" to="/admin/positions">Positions</router-link>
        <router-link class="menu-item" to="/admin/users">Users</router-link>
        <router-link class="menu-item" to="/admin/roles">Roles</router-link>
      </div>
    </div>
    <div class="p-2">{{ shortFIO }}</div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';

const title = import.meta.env.VITE_APP_NAME
const { shortFIO } = storeToRefs(useAuthStore())

</script>

<style lang="scss" scoped>
.sidebar {
  height: 100vh;
  @apply flex flex-col justify-between bg-white bg-opacity-80;
}

.sidebar-header {
  @apply text-2xl font-bold py-2 px-4 text-teal-800 bg-white shadow-lg mb-4;
}

.menu {
  @apply flex flex-col gap-2 p-2;
}

.menu-item {
  @apply bg-teal-800 px-2 py-1 rounded bg-opacity-20 text-center whitespace-nowrap;
}

.menu-item:hover {
  @apply bg-opacity-90 text-white;
}
</style>