<template>
  <div class="main-layout">
    <header>
      <RouterView name="header"/>
    </header>
    <div class="flex content">
      <div class="sidebar">
        <RouterView name="sidebar" />
      </div>
      <main class="p-2">
        <RouterView />
      </main>
    </div>
  </div>
</template>
  
<script lang="ts">
export default {
  name: "MainLayout",
};
</script>
  
<style lang="scss" scoped>
.main-layout{
  height: 100vh;
}

header{
  @apply shadow;
}

.content{
  height: calc(100vh - 50px);
}

main{
  @apply w-full;
}
</style>