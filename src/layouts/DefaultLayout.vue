<template>
  <div class="h-full">
    <app-bar class="shadow-xl"/>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
  
<script lang="ts">
import AppBar from '../components/AppBar.vue';
export default {
  components: { AppBar },
  name: "DefaultLayout",
};
</script>
  
<style lang="scss" scoped>
.content {
  height: calc(100vh - 50px);
  @apply p-4 bg-slate-800 bg-opacity-40;

}
</style>