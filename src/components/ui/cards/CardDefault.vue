<template>
  <div class="card">
    <!-- <div class="card-header">{{ header }}</div> -->
    <div class="card-body">
      <slot name="body"></slot>
    </div>
    <div class="card-footer" v-if="footer">{{ footer }}</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CardDefault",
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
  @apply bg-white rounded-lg shadow-lg;

  .card-header {
    @apply p-2 text-lg font-bold border-b;
  }

  .card-body {
    @apply text-teal-900 h-full flex flex-col p-2;
  }

  .card-footer {
    @apply px-2 py-1 text-sm border-t;
  }

}
</style>