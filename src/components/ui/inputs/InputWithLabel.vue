<template>
  <div class="flex gap-2 items-center">
    <label class="w-1/3">{{ label }}</label>
    <input 
      class="input" 
      :type="type" 
      :value="inP" 
      @input="$emit('update:modelValue', $event.target.value)" 
      @keypress.enter="$emit('enter')"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "InputWithLabel",
  props: {
    inP: String,
    type:{
      type:String,
      default:"text"
    },
    label:{
      type:String,
      default:"Label"
    }
  },
}

</script>

<style scoped lang="scss">
.input{
  @apply px-2 py-0.5 w-full border-b-2 border-teal-800 border-opacity-20;
}
.input:focus{
  @apply border-opacity-60 outline-none;
}
</style>