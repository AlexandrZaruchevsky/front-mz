<template>
  <div class="sidebar-menu">
    <div class="sidebar-menu__header  bg-secondary-200" @click="collapse = !collapse">
      <span class="pl-2 font-bold whitespace-nowrap">
        {{ header }}
      </span>
      <IconAngelLeft color="gray" v-if="collapse" class="p-1" size="sm" />
      <IconAngelDown color="gray" v-else class="p-1" size="sm" />
    </div>
    <div v-if="!collapse" class="sidebar-menu__body">
      <div class="flex border-l-2 border-secondary-600 border-dotted border-opacity-0 hover:border-opacity-80"
        v-for="item of items" :key="item.id">
        <RouterLink class="px-2 py-1 border-l-4 border-opacity-0 border-primary-800 w-full font-semibold"
          :class="item.active ? 'border-opacity-80' : ''" :to="item.link">
          {{ item.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import type { LinkItem } from '@/model/Menu';
import { ref } from 'vue';

export default {
  name: 'SidebarMenu',
  props: {
    header: {
      type: String,
      required: false,
      default: () => "Title"
    },
    items: {
      type: Array<LinkItem>,
      required: false,
      default: () => new Array()
    },
    isCollapse: {
      type: Boolean,
      requred: false,
      default: () => true
    }
  },
  setup(props) {
    const collapse = ref<boolean>(props.isCollapse);
    return {
      collapse,
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-menu {
  @apply flex flex-col rounded;
}

.sidebar-menu__header {
  @apply cursor-pointer rounded-t text-center text-xl flex flex-row flex-nowrap gap-4 justify-between items-center;
}

.sidebar-menu__body {
  @apply p-2 flex flex-col gap-2;
}
</style>