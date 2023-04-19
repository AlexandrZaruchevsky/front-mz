<template>
  <div class="sidebar-menu">
    <div class="sidebar-menu__header" @click="collapse = !collapse">
      <span class="pl-2 font-bold">
        SECURITY
      </span>
      <IconAngelLeft color="gray" v-if="collapse" class="p-1" size="sm" />
      <IconAngelDown color="gray" v-else class="p-1" size="sm" />
    </div>
    <div v-if="!collapse" class="sidebar-menu__body">
      <div 
        class="flex border-l border-secondary-500 border-dotted border-opacity-0 hover:border-opacity-80" 
        v-for="item of menuSecurity" 
        :key="item.id"
      >
        <RouterLink 
          class="px-2 py-1 border-l-4 border-opacity-0 border-primary-800 w-full"
          :class="item.active ? 'border-opacity-80' : ''" :to="item.link"
        >
          {{ item.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useMenuStore } from '@/stores/MenuStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

export default {
  name: 'SidebarMenuGuardian',
  setup() {
    const collapse = ref<boolean>(false);
    const { menuSecurity } = storeToRefs(useMenuStore());
    return {
      collapse,
      menuSecurity
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-menu {
  @apply flex flex-col;
}

.sidebar-menu__header {
  @apply cursor-pointer rounded-t text-center text-xl flex flex-row flex-nowrap gap-4 justify-end items-center;
}

.sidebar-menu__body {
  @apply p-2 flex flex-col gap-2;
}
</style>