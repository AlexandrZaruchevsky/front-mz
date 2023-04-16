<template>
  <div class="card">
    <div class="card-header">{{ header }}</div>
    <div class="card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-footer" v-if="footer">{{ footer }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CardAuth",
  props: {
    header: {
      type: String,
      default: "Header"
    },
    footer: String
  }
}
</script>

<style lang="scss" scoped>
.card {
  @apply bg-white rounded-lg;

  .card-header {
    @apply px-4 py-2 text-lg font-bold border-b;
  }

  .card-body {
    @apply p-4;
  }

  .card-footer {
    @apply text-sm border-t;
  }

}
</style>