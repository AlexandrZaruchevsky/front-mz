<template>
  <div class="button" @click="authPage">
    <IconLogin size ="xs"/>
    <span>
      {{ title }}
    </span>
  </div>
</template>
<script lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
export default {
  name: 'LoginButton',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Title'
    }
  },
  setup() {
    const { authPage } = useAuthStore();
    return {
      authPage
    }
  }
}
</script>
<style lang="scss">
.button {
  @apply cursor-pointer flex items-center gap-2 font-semibold border border-secondary-500 px-2 py-1 rounded;
}

.button:hover {
  @apply border-primary-800 bg-secondary-200 bg-opacity-50;
}
</style>