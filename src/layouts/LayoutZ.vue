<template>
  <div class="flex flex-col bg-slate-800 bg-opacity-40 shadow-xl">
    <app-bar class="shadow-lg bg-white"/>
    <div class="content flex h-full p-4">
      <div class="">
        <RouterView name="Sidebar" />
      </div>
      <div class="w-full">
        <RouterView name="Content" />
      </div>
    </div>
  </div>
</template>
  
<script lang="ts">
import AppBar from '../components/AppBar.vue';
export default {
  name: "LayoutZ",
  components:{
    AppBar
  }
};
</script>
  
<style lang="scss" scoped>
.content {
  height: calc(100vh - 50px);
  @apply p-4;

}
</style>