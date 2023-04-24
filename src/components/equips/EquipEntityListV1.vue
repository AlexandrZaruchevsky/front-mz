<template>
  <div>
    <div class="list-row" @click="$emit('onClick', equip.id)">
      <div class="list-cell w-4/12">{{ equip.shortName }}</div>
      <div class="list-cell w-2/12 text-center">{{ equip.groupAccounting ? 'Групповой учёт' : 'Одинарный учёт' }}</div>
      <div class="list-cell w-3/12 text-center">{{ equip.inventoryNumber }}</div>
      <div class="list-cell w-3/12 text-center">{{ equip.serialNumber }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Equip } from '@/model/Equip';
import type { PropType } from 'vue';

defineProps({
  equip: {
    type: Object as PropType<Equip>,
    required: false,
    default: () => new Equip()
  }
})
</script>
