<template>
  <div class="w-full flex flex-row gap-2 py-1 border-b border-dotted border-secondary-500">
    <div class="w-1/2 flex flex-row">
      <div class="whitespace-nowrap px-2 overflow-hidden w-1/3">{{ employee.lastName }}</div>
      <div class="whitespace-nowrap px-2 overflow-hidden w-1/3">{{ employee.firstName }}</div>
      <div class="whitespace-nowrap px-2 overflow-hidden w-1/3">{{ employee.middleName }}</div>
    </div>
    <div class="w-1/2 flex flex-row">
      <div class="whitespace-nowrap px-2 overflow-hidden w-1/4">{{ employee.kspd }}</div>
      <div class="whitespace-nowrap px-2 overflow-hidden w-3/4">{{ employee.email }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Employee } from '@/model/Employee';
import type { PropType } from 'vue';

export default {
  name: "EmplEntityListV1",
  props: {
    employee: {
      type: Object as PropType<Employee>,
      required: false,
      default: () => new Employee()
    }
  }
}
</script>