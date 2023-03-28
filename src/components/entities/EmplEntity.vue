<template>
  <div>
    <div class="empl-row hidden">
      <div class="flex w-1/2">
      <div class="w-1/4">
        {{ empl?.lastName }}
      </div>
      <div class="w-1/4">
        {{ empl?.firstName }}
      </div>
      <div class="w-1/4">
        {{ empl?.middleName }}
      </div>
      <div class="w-1/4">
        {{ empl?.kspd }}
      </div>
    </div>
    <div class="flex gap-2 w-1/2">
      <div class="w-1/2">
        {{ empl?.posName }}
      </div>
      <div class="w-1/2">
        {{ empl?.depName }}
      </div>
    </div>
  </div>
  <div class="lg:hidden flex flex-col border rounded p-2 shadow-lg bg-slate-500 bg-opacity-0 hover:bg-opacity-10 hover:cursor-pointer">
    <div class="flex flex-row">
      <span class="w-1/4" style="min-width: 140px;">Фамилия:</span>
      <span class="w-full border-b">{{ empl?.lastName }}</span>
    </div>
    <div class="flex flex-row">
      <span class="w-1/4" style="min-width: 140px;">Имя:</span>
      <span class="w-full border-b">{{ empl?.firstName }}</span>
    </div>
    <div class="flex flex-row">
      <span class="w-1/4" style="min-width: 140px;">Отчество:</span>
      <span class="w-full border-b">{{ empl?.middleName }}</span>
    </div>
    <div class="flex flex-row">
      <span class="w-1/4" style="min-width: 140px;">Телефон:</span>
      <span class="w-full border-b">{{ empl?.kspd }}</span>
    </div>
    <div class="flex flex-row">
      <span class="w-1/4" style="min-width: 140px;">Должность:</span>
      <span class="w-full border-b">{{ empl?.posName }}</span>
    </div>
    <div class="flex flex-row">
      <span class="w-1/4" style="min-width: 140px;">Подразделение:</span>
      <span class="w-full border-b">{{ empl?.depName }}</span>
    </div>
  </div>
</div>
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
  @apply hidden lg:flex flex-col shadow-lg lg:border-b rounded-xl lg:shadow-none lg:flex-row lg:w-full bg-slate-500 bg-opacity-0;
  div {
    @apply px-1 py-0.5 whitespace-nowrap overflow-hidden;
  }
}

.empl-row:hover {
  @apply bg-opacity-10 cursor-pointer
}
</style>