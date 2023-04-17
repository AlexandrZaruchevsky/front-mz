<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <RouterLink to="/v1/dashboard">Dashboard</RouterLink>
    </div>
    <div class="sidebar-body">
      <SidebarMenuGuardian v-if="isGuardian" class="border rounded"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';


const {isGuardian} = storeToRefs(useAuthStore())

</script>

<style lang="scss">
.sidebar {
  @apply p-2;
}

.sidebar-header {
  @apply text-2xl whitespace-nowrap font-semibold;
}

.sidebar-body{
  @apply pt-4;
}
</style>