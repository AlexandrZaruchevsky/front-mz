<template>
  <div class="entity">
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">Наименование:</span>
      <input-field v-model="arm.name" v-focus placeHolder="Наименование" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">Description:</span>
      <input-field v-model="arm.description" placeHolder="Описание" :disabled="!editable" />
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">МОЛ:</span>
      <input-field v-model="arm.molFio" placeHolder="МОЛ" :disabled="true" />
      <button v-if="editable" class="btn-choice" @click="$emit('changeMol')">CHOICE</button>
    </div>
    <div class="entity-row">
      <span class="whitespace-nowrap" style="min-width: 140px;">Точка присутствия:</span>
      <input-field v-model="arm.popName" placeHolder="Точка присутствия" :disabled="true" />
      <button v-if="editable" class="btn-choice" @click="$emit('changePop')">CHOICE</button>
    </div>
  </div>
</template>
<!-- <script setup lang="ts">
import { Arm } from '@/model/Arm';
import { computed, type PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<Arm>,
    required: false,
    default: () => new Arm()
  },
  editable: {
    type: Boolean,
    required: false,
    default: () => false
  }
})

const arm = computed<Arm>(() => props.modelValue)

defineEmits(["changeMol", "changePop"])
</script> -->

<script lang="ts">
import { Arm } from '@/model/Arm';
import { computed, type PropType } from 'vue';


export default {
  name: 'ArmEntityV1',
  props: {
    modelValue: {
      type: Object as PropType<Arm>,
      required: false,
      default: () => new Arm()
    },
    editable: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  emits: ["update:modelValue", "changeMol", "changePop"],
  setup(props, { emit }) {
    const arm = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })
    return { arm }
  }
}

</script>