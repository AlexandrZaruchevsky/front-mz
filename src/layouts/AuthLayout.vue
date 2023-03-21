<template>
  <div class="layout">
      <slot />
  </div>
</template>
  
<script lang="ts">
export default {
  name: "AuthLayout",
};
</script>
  
<style lang="scss" scoped>
.layout{
  height: 100vh;
  @apply bg-teal-800 bg-opacity-20 flex pt-20 items-start justify-center;
}
</style>