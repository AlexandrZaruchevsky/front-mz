<template>
  <div class="card">
    <div class="card-header">{{ header }}</div>
    <div class="tool-buttons">
      <slot name="tool-buttons" />
    </div>
    <div class="card-body">
      <slot name="body" />
    </div>
    <div class="tool-pagination">
      <slot name="tool-pagination" />
    </div>
    <div class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props{
  header?: string
}
withDefaults(defineProps<Props>(), {
  header: "Card header"
})
</script>

<style scoped lang="scss">
.card {
  @apply bg-white rounded-lg shadow-xl  flex flex-col text-slate-800;

  .card-header {
    @apply p-2 border-b text-xl font-semibold bg-stone-200 rounded-t;
  }

  .card-body {
    @apply h-full overflow-auto;
  }
}
</style>
  