<template>
  <select v-model="value" @change="$emit('change')">
    <option v-if="defaultOption" :value="defaultOption.key">{{ defaultOption.value }}</option>
    <option v-for="option of options" :key="option.key" :value="option.key">
      {{ option.value }}
    </option>
  </select>
</template>
<script lang="ts">
import { SelectOption } from '@/model/Page';
import { computed, type PropType } from 'vue';
export default {
  name: 'SelectZV1',
  props: {
    options: {
      type: Array<SelectOption>,
      required: false,
      default: () => new Array()
    },
    modelValue: {
      type: [Number, String],
      required: false,
      default: () => -1
    },
    defaultOption: {
      type: Object as PropType<SelectOption>,
      required: false,
      default: () => new SelectOption(-1, "Nooo")
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const value = computed({
      get: () => props.modelValue,
      set: (val) => emit("update:modelValue", val)
    })
    return {
      value
    }
  }
}
</script>