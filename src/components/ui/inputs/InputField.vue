<template>
  <input 
    class="input-field" 
    :type="type" 
    :placeholder="placeHolder" 
    v-model="value" 
    @keypress.enter="$emit('enter')" 
  />
</template>
<script lang="ts">
import { computed } from 'vue';
export default {
  name: "InputField",
  props: {
    modelValue: {
      type: String,
      default: () => ""
    },
    type: {
      type: String,
      required: false,
      default: () => "text"
    },
    placeHolder: {
      type: String,
      required: false,
      default: () => ""
    }
  },
  emits: ["update:modelValue", "enter"],
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
<style lang="scss" scoped>
.input-field {
  @apply outline-none border-b-2 border-secondary-900 border-opacity-40 focus:border-opacity-90;
  @apply text-current px-1 py-0.5 w-full;
}
</style>