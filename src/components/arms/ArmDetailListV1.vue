<template>
  <div class="p-2">
    <div class="list-row" v-for="armDetail of armDetails" :key="armDetail.id" @click="$emit('armDetailEdit', armDetail.id)">
      <span class="list-cell w-6/12">{{ armDetail.name }}</span>
      <span class="list-cell w-3/12">{{ armDetail.domainName }}</span>
      <span class="list-cell w-3/12">{{ armDetail.ipV4 }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import type { ArmDetail } from '@/model/Arm';

export default {
  name: 'ArmDetailListV1',
  props: {
    armDetails: {
      type: Array<ArmDetail>,
      required: false,
      default: ()=> new Array()
    }
  },
  emits:["armDetailEdit"]
}
</script>