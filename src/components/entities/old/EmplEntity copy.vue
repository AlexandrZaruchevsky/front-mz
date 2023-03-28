<template>
  <!-- <div class="empl-row lg:flex-col">
      <div class="w-2/12 border">
        {{ empl?.lastName }}
      </div>
      <div class="w-2/12 border">
        {{ empl?.firstName }}
      </div>
      <div class="w-2/12 border">
        {{ empl?.middleName }}
      </div>
      <div class="w-1/12 border">
        {{ empl?.kspd }}
      </div>
      <div class="w-3/12 border">
        {{ empl?.posName }}
      </div>
      <div class="w-full lg:w-2/12 border">
        {{ empl?.depName }}
      </div>
  </div> -->
  <div class="empl-row">
    <div class="flex flex-col gap-2 w-full lg:flex-row lg:w-1/2">
      <div class="w-full lg:w-1/4">
        {{ empl?.lastName }}
      </div>
      <div class="w-full lg:w-1/4">
        {{ empl?.firstName }}
      </div>
      <div class="w-full lg:w-1/4">
        {{ empl?.middleName }}
      </div>
      <div class="w-full lg:w-1/4">
        {{ empl?.kspd }}
      </div>
    </div>
    <div class="w-full flex flex-col gap-2 lg:flex-row lg:w-1/2">
      <div class="w-full lg:w-1/2">
        {{ empl?.posName }}
      </div>
      <div class="w-full lg:w-1/2">
        {{ empl?.depName }}
      </div>
    </div>
  </div>
  <!-- <div class="lg:hidden flex flex-col">
    <div class="flex flex-row">
      <span class="w-1/3">Фамилия:</span>
      <span class="w-full">{{ empl?.lastName }}</span>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import type { Employee } from '@/model/Employee';
import type { PropType } from 'vue';

defineProps({
  empl: Object as PropType<Employee>
})

</script>

<style lang="scss">
.empl-row {
  @apply flex flex-col shadow-lg lg:border-b rounded-xl lg:shadow-none lg:flex-row lg:w-full bg-slate-500 bg-opacity-0;
  div {
    @apply px-1 py-0.5 whitespace-nowrap overflow-hidden;
  }
}

.empl-row:hover {
  @apply bg-opacity-10 cursor-pointer
}
</style>