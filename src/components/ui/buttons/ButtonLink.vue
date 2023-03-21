<template>
  <router-link
    :to="to"
    class="px-2 py-1 focus:outline-none bg-teal-800 bg-opacity-10 hover:text-white hover:bg-opacity-80 rounded"
  >
    {{ title }}
  </router-link>
</template>
  
<script lang="ts">
export default {
  name: "ButtonLink",
  props: {
    title: {
      type: String,
      default: "Title"
    },
    to: {
      type: String,
      default: "#"
    }
  }
}
</script>