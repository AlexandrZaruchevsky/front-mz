<template>
  <div class="p-2">
    <div class="bg-secondary-200 rounded-lg h-full flex flex-col">
      <div class="flex justify-end border-b bg-secondary-300 border-secondary-400 rounded-t-lg"><x-icon @click="$emit('close')" /></div>
      <div class="flex flex-col gap-0.5 p-2 h-full overflow-auto">
        <div class="flex flex-row w-full border-b-2 border-primary-800 px-2 border-dotted items-center">
          <span class="w-1/2">Наименование</span>
          <strong class="w-1/2">{{ armDetail?.name }}</strong>
        </div>
        <div class="flex flex-row w-full border-b-2 border-primary-800 px-2 border-dotted">
          <span class="w-1/2">Сетевое имя</span>
          <strong class="w-1/2">{{ armDetail?.domainName }}</strong>
        </div>
        <div class="flex flex-row w-full border-b-2 border-primary-800 px-2 border-dotted">
          <span class="w-1/2">ip-address</span>
          <strong class="w-1/2">{{ armDetail?.ipV4 }}</strong>
        </div>
        <div class="flex flex-row w-full border-b-2 border-primary-800 px-2 border-dotted">
          <span class="w-1/2">Инвентарный №</span>
          <strong class="w-1/2">{{ armDetail?.equip?.inventoryNumber }}</strong>
        </div>
        <div class="flex flex-row w-full border-b-2 border-primary-800 px-2 border-dotted">
          <span class="w-1/2">Серийный №</span>
          <strong class="w-1/2">{{ armDetail?.equip?.serialNumber }}</strong>
        </div>
        <div class="flex flex-row w-full border-b-2 border-primary-800 px-2 border-dotted">
          <span class="w-1/2">МОЛ</span>
          <strong class="w-1/2">{{ armDetail?.equip?.employeeMol }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { ArmDetailInfo } from '@/model/Info';
import type { PropType } from 'vue';

defineProps({
  armDetail: {
    type: Object as PropType<ArmDetailInfo>,
    required: false
  }
})

</script>