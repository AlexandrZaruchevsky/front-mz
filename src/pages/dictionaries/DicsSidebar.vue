<template>
  <div class="bg-white h-full flex flex-col rounded-l-lg border-r border-slate-600 justify-between">
    <div>
      <div class="px-2 py-1 text-xl font-semibold border-b border-slate-600 bg-slate-100 rounded-tl-lg">Dictionaries</div>
      <div class="px-2 pt-4 flex flex-col gap-2">
        <router-link 
          v-for="item in menuDics" 
          :key="item.id" 
          :to="item.link"
          class="menu-item"
          :class="item.active ? 'menu-item-active' : 'menu-item-not-active'"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
    <!-- <div class="px-2 py-1 border-t border-slate-600">Footer</div> -->
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/MenuStore';
import { storeToRefs } from 'pinia';

const { menuDics } = storeToRefs(useMenuStore());

</script>

<style lang="scss">
.menu-item {
  @apply px-2 py-1 rounded text-center whitespace-nowrap bg-slate-500 bg-opacity-10;
}

.menu-item-active {
  @apply bg-slate-500 text-white;
}

.menu-item-not-active {
  @apply bg-slate-400 bg-opacity-20;
}

.menu-item:hover {
  @apply bg-opacity-90 text-white;
}
</style>