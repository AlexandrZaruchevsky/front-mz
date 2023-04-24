<template>
  <div class="entity">
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 180px;">Краткое наименование:</span>
      <input-field v-model="equip.shortName" v-focus placeHolder="shortName" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 180px;">Полное наименование:</span>
      <input-field v-model="equip.fullName" placeHolder="fullName" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 180px;">Инвентарный номер:</span>
      <input-field v-model="equip.inventoryNumber" placeHolder="inventoryNumber" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 180px;">Серийный номер:</span>
      <input-field v-model="equip.serialNumber" placeHolder="serialNumber" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 180px;">Изготовитель:</span>
      <input-field v-model="equip.manufacturer" placeHolder="manufacturer" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 180px;">Дата производства:</span>
      <input-field type="date" v-model="equip.dateOfManufacture" placeHolder="dateOfManufacture" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { Equip } from '@/model/Equip';
import { computed, type PropType } from 'vue';


const props = defineProps({
  modelValue: {
    type: Object as PropType<Equip>,
    required: false,
    default: () => new Equip()
  },
  editable: {
    type: Boolean,
    required: false,
    default: () => false
  }
})

// const equip = ref<Equip>(new Equip())
const equip = computed<Equip>(() => props.modelValue)

</script>