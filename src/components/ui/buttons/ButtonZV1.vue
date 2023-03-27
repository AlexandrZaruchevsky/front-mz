<template>
  <button
    :class="disabled ? 'px-2 py-1 font-semibold rounded text-slate-400 bg-opacity-10 cursor-default ' : 'px-2 py-1 bg-opacity-50 font-semibold rounded hover:bg-opacity-90 hover:text-white'">
    {{ title }}
  </button>
</template>

<script lang="ts">
export default {
  name: "ButtonZV1",
  props: {
    title: {
      type: String,
      required: false,
      default: "Title"
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    color: String
  }
}
</script>