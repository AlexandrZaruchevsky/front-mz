<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <RouterLink to="/v1/dashboard">Dashboard</RouterLink>
    </div>
    <div class="sidebar-body">
      <SidebarMenu v-if="isAuth" header="ADMIN MENU" :items="menuAdmin" class="border border-secondary-500 rounded shadow-sm shadow-secondary-500" />
      <SidebarMenu v-if="isGuardian" header="SECURITY" :items="menuSecurity" class="border border-secondary-500 rounded shadow-sm shadow-secondary-500" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useMenuStore } from '@/stores/MenuStore';
import { storeToRefs } from 'pinia';

const { isGuardian, isAuth } = storeToRefs(useAuthStore())

const { menuAdmin, menuSecurity } = storeToRefs(useMenuStore());

</script>

<style lang="scss">
.sidebar {
  @apply p-2;
}

.sidebar-header {
  @apply text-2xl whitespace-nowrap font-semibold;
}

.sidebar-body {
  @apply flex flex-col gap-2 pt-4;
}
</style>