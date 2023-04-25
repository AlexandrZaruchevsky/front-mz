<template>
  <div>
    <div class="list-row" @click="$emit('onClick', arm.id)">
      <div class="list-cell w-4/12">{{ arm.name }}</div>
      <div class="list-cell w-4/12 text-center">{{ arm.molFio }}</div>
      <div class="list-cell w-4/12 text-center">{{ arm.popName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Arm } from '@/model/Arm';
import type { PropType } from 'vue';

defineProps({
  arm: {
    type: Object as PropType<Arm>,
    required: false,
    default: () => new Arm()
  }
})
</script>
