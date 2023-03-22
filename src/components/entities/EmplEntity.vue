<template>
  <div class="empl-row">
    <div class="w-1/2 flex">
      <div class="w-1/3">
        {{ empl?.lastName }}
      </div>
      <div class="w-1/3">
        {{ empl?.firstName }}
      </div>
      <div class="w-1/3">
        {{ empl?.middleName }}
      </div>
    </div>
    <div class="w-1/2 flex">
      <div class="w-1/2">
        {{ empl?.posName }}
      </div>
      <div class="w-1/2">
        {{ empl?.depName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Employee } from '@/model/Employee';
import type { PropType } from 'vue';

const props = defineProps({
  empl: Object as PropType<Employee>
})

</script>

<style lang="scss">
.empl-row {
  @apply border-b flex flex-row gap-2 bg-slate-500 bg-opacity-0;

  div {
    @apply px-2 py-1 whitespace-nowrap overflow-hidden;
  }
}

.empl-row:hover {
  @apply bg-opacity-10 cursor-pointer
}
</style>