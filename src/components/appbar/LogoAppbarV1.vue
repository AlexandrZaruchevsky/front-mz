<template>
  <div class="appbar-logo">{{appName}}</div>
</template>

<script lang="ts">
export default {
  name: "LogoAppbarV1",
  setup() {
    const appName = import.meta.env.VITE_APP_NAME;
    return{
      appName
    }
  }
}
</script>
<style lang="scss">
.appbar-logo{
  @apply text-4xl font-extrabold;
}
</style>