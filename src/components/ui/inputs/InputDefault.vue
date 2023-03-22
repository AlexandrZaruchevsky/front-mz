<template>
  <input 
    class="input" :type="type" 
    :value="inP" 
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :placeholder="placeHolder"
    @keypress.enter="$emit('enter')"
  />
</template>
  
<script lang="ts">
export default {
  name: "InputDefault",
  props: {
    inP: String,
    type: {
      type: String,
      default: "text"
    },
    placeHolder: {
      type: String,
      default: ""
    }
  },
}

</script>
  
<style scoped lang="scss">
.input {
  @apply px-2 py-0.5 w-full border-b-2 border-teal-800 border-opacity-20;
}

.input:focus {
  @apply border-opacity-60 outline-none;
}
</style>