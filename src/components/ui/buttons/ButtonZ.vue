<template>
  <button class="px-2 py-1 focus:outline-none bg-teal-800 bg-opacity-10 hover:text-white hover:bg-opacity-80 rounded"
    @click="$emit('clickb')"
    >
    {{ title }}
  </button>
</template>

<script lang="ts">
export default {
  name: "ButtonZ",
  props: {
    title: {
      type: String,
      default: "Title"
    }
  }
}
</script>