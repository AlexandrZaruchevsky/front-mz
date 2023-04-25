<template>
  <div class="entity">
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">Оборудование:</span>
      <input-field v-model="armDetail.equipName" placeHolder="Оборудование" :disabled="true" />
      <button v-if="editable" class="btn-choice" @click="$emit('changeEquip')">CHOICE</button>
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">Наименование:</span>
      <input-field v-model="armDetail.name" v-focus placeHolder="Наименование" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">DomainName:</span>
      <input-field v-model="armDetail.domainName" placeHolder="DomainName" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">ip-address:</span>
      <input-field v-model="armDetail.ipV4" placeHolder="ip-address" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">Description:</span>
      <input-field v-model="armDetail.description" placeHolder="Описание" :disabled="!editable" />
    </div>
  </div>
</template>
<script lang="ts">
import { Arm, ArmDetail } from '@/model/Arm';
import { computed, type PropType } from 'vue';


export default {
  name: 'ArmEntityV1',
  props: {
    modelValue: {
      type: Object as PropType<ArmDetail>,
      required: false,
      default: () => new ArmDetail()
    },
    editable: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  emits: ["update:modelValue", "changeEquip"],
  setup(props, { emit }) {
    const armDetail = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })
    return { armDetail }
  }
}

</script>