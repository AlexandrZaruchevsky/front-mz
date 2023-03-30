<template>
  <div class="absolute w-full z-10 h-full rounded bg-slate-300 bg-opacity-60" @click="$router.go(-1)">
    <div class="relative flex justify-center pt-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default{
  name:"OverlayZ"
}
</script>