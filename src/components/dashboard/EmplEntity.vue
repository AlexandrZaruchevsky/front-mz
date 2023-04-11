<template>
  <template v-if="isRow">
    <div class="flex flex-row py-0.5 border-b-2 border-secondary-300 border-dotted w-full">
      <div class="flex flex-row w-1/2 gap-2">
        <div class="w-1/3">{{ empl?.lastName }}</div>
        <div class="w-1/3">{{ empl?.firstName }}</div>
        <div class="w-1/3">{{ empl?.middleName }}</div>
      </div>
      <div class="flex flex-row w-1/2 gap-2 justify-between">
          <div class="w-10/12 flex">
            <div class="w-3/4 whitespace-nowrap overflow-hidden">{{ empl?.posName }}</div>
            <div class="w-1/4">{{ empl?.kspd ?? '' }}</div>
          </div>
          <div class="w-2/12 flex justify-end">
            <icon-angel-left class="hover:cursor-pointer" size="sm"  @click="isRow=!isRow"/>
          </div>
        </div>
    </div>
  </template>
  <template v-else>
    <div class="w-full flex flex-col border rounded p-2 gap-2">
      <div class="flex flex-row py-0.5 border-b-2 border-secondary-300 border-dotted w-full">
        <div class="flex flex-row w-1/2 gap-2">
          <div class="w-1/3">{{ empl?.lastName }}</div>
          <div class="w-1/3">{{ empl?.firstName }}</div>
          <div class="w-1/3">{{ empl?.middleName }}</div>
        </div>
        <div class="flex flex-row w-1/2 gap-2 justify-between">
          <div class="w-10/12 flex">
            <div class="w-3/4 whitespace-nowrap overflow-hidden">{{ empl?.posName }}</div>
            <div class="w-1/4">{{ empl?.kspd ?? '' }}</div>
          </div>
          <div class="w-2/12 flex justify-end">
            <icon-angel-down class="hover:cursor-pointer" size="sm"  @click="isRow=!isRow"/>
          </div>
        </div>
      </div>
      <div>
        {{ empl?.wsName }}
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import type { Employee } from '@/model/Employee';
import { ref, type PropType } from 'vue';
defineProps({
  empl: {
    type: Object as PropType<Employee>,
    required: false
  }
})
const isRow = ref<boolean>(true);
</script>