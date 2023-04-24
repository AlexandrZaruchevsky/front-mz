<template>
  <div class="sidebar h-full">
    <div class="sidebar-header">
      <RouterLink class="bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-danger-700" to="/v1/dashboard">Dashboard</RouterLink>
    </div>
    <div class="sidebar-body">
        <SidebarMenu v-if="isAuth" header="USER MENU" :isCollapse="false" :items="menuAll" class="card-shadow" />
        <SidebarMenu v-if="isAuth" header="ADMIN MENU" :items="menuAdmin" class="card-shadow" />
        <SidebarMenu v-if="isGuardian" header="SECURITY" :items="menuSecurity" class="card-shadow" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useMenuStore } from '@/stores/MenuStore';
import { storeToRefs } from 'pinia';

const { isGuardian, isAuth } = storeToRefs(useAuthStore())

const { menuAdmin, menuSecurity, menuAll } = storeToRefs(useMenuStore());

</script>

<style lang="scss">
.sidebar {
  @apply  flex flex-col font-extrabold ;
}

.sidebar-header {
  @apply text-center text-3xl whitespace-nowrap p-2 mb-2;
}

.sidebar-body {
  @apply  px-4 py-2 flex flex-col gap-2 pt-4 h-full overflow-y-auto;
}
</style>