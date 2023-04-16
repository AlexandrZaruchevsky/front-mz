<template>
  <div class="app-bar">
    <div class="">
      <LogoAppbarV1 />
    </div>
    <div class="border">
      <MenuAppbarV1 />
    </div>
    <div class="">
      <ProfileAppbarV1 />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: "AppBarV1",
  setup() {
    const appName = import.meta.env.VITE_APP_NAME;
    return {
      appName,
    };
  }
}
</script>

<style scoped lang="scss">
.app-bar {
  height: 50px;
  @apply p-2 flex justify-between items-center;
}</style>