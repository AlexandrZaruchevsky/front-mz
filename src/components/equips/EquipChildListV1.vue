<template>
  <div class="relative flex flex-col p-2 border-l h-full">
    <div class="border h-full overflow-auto p-2 shadow-inner shadow-secondary-500">
      <div class="list-row justify-between items-center" v-for="equip of equips" :key="equip.id" @click="$emit('equipEdit', equip.id)">
        <span class="list-cell truncate">
          {{ equip.shortName }} ( {{ equip.serialNumber }} )
        </span>
        <IconTrash size="sm" @click.stop="$emit('equipDelete',equip.id)" />
      </div>
    </div>
    <div class="absolute right-4 bottom-4" @click="$emit('equipAdd')">
      <icon-plus class="bg-primary-600" size="md" />
    </div>
  </div>
</template>

<script lang="ts">
import type { Equip } from '@/model/Equip';

export default {
  name: 'EquipChildListV1',
  props: {
    equips: {
      type: Array<Equip>,
      required: false,
      default: () => new Array()
    }
  },
  setup() {

  }
}
</script>
