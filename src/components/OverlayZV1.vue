<template>
  <div class="absolute left-0 top-0 w-full h-full flex p-2 justify-center z-20 bg-opacity-50 bg-secondary-50">
    <div class="flex flex-col pt-20">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "OverlayZV1"
}
</script>