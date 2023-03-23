<template>
  <div class="layout">
    <div class="sidebar">
      <SidebarAdmin />
    </div>
    <div class="content">
      <slot />
    </div>
  </div>
</template>
    
<script lang="ts">
import SidebarAdmin from '@/components/SidebarAdmin.vue';
export default {
  name: "AdminLayout",
  components:{
    SidebarAdmin
  }
};
</script>
    
<style lang="scss" scoped>
.layout {
  height: 100vh;
  @apply bg-teal-800 bg-opacity-20 flex;
}
.content{
  @apply w-full h-full p-4;
}
</style>