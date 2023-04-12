<template>
  <template v-if="isRow">
    <div
      class="flex flex-row py-0.5 border-b-2 border-secondary-300 border-dotted cursor-pointer w-full hover:bg-secondary-200"
      @click="isRow = !isRow">
      <div class="flex flex-row w-1/2 gap-2 pl-2">
        <div class="w-1/3">{{ empl?.lastName }}</div>
        <div class="w-1/3">{{ empl?.firstName }}</div>
        <div class="w-1/3">{{ empl?.middleName }}</div>
      </div>
      <div class="flex flex-row w-1/2 gap-2 justify-between items-start">
        <div class="w-10/12 flex">
          <div class="w-3/4 whitespace-nowrap overflow-hidden">{{ empl?.posName }}</div>
          <div class="w-1/4">{{ empl?.kspd ?? '' }}</div>
        </div>
        <div class="w-2/12 flex justify-end items-start">
          <icon-angel-left size="sm" />
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="w-full flex flex-col gap-2 text-xl border-b-2 border-dotted border-secondary-300">
      <div class="relative flex flex-row justify-center items-start" @click="isRow = !isRow">
        <div
          class="flex flex-col justify-center bg-secondary-100 rounded-lg m-2 p-4 shadow-md shadow-secondary-700 border-2 border-secondary-500"
          @click.stop style="min-width: 800px; max-width: 800px;">
          <div class="flex flex-col gap-0.5 w-full">
            <div class="field-row">
              <span>Фамилия:</span>
              <strong>{{ empl?.lastName }}</strong>
            </div>
            <div class="field-row">
              <span>Имя:</span>
              <strong>{{ empl?.firstName }}</strong>
            </div>
            <div class="field-row">
              <span>Отчество:</span>
              <strong>{{ empl?.middleName }}</strong>
            </div>
            <div class="field-row">
              <span>Должность:</span>
              <strong>{{ empl?.posName }}</strong>
            </div>
            <div class="field-row">
              <span>Подразделение:</span>
              <strong>{{ empl?.depName }}</strong>
            </div>
            <div class="field-row">
              <span>Телефон (ВТС):</span>
              <strong>{{ empl?.kspd }}</strong>
            </div>
            <div class="field-row">
              <span>Телефон:</span>
              <strong>{{ empl?.phone }}</strong>
            </div>
            <div class="field-row">
              <span>Email:</span>
              <strong>{{ empl?.email }}</strong>
            </div>
            <div class="field-row">
              <span>Workstation:</span>
              <strong>{{ empl?.wsName }}</strong>
            </div>
          </div>
          <div class="buttons pt-4 text-base">
            <button-z-v1 class="bg-info-800" title="info" @click="isEmplInfo = true" />
          </div>
        </div>
        <EmployeeInfo style="min-width: 800px; max-width: 800px; min-height: 370px;" v-if="isEmplInfo"
          @close="isEmplInfo = false" :empl="empl" />
        <!-- </div> -->
        <div class="absolute right-0">
          <icon-angel-down class="cursor-pointer" size="sm" />
        </div>
      </div>
    </div>
  </template>
</template>
<script setup lang="ts">
import type { Employee } from '@/model/Employee';
import { ref, type PropType } from 'vue';
import EmployeeInfo from './EmployeeInfo.vue'
defineProps({
  empl: {
    type: Object as PropType<Employee>,
    required: false
  }
})
const isRow = ref<boolean>(true);

const isEmplInfo = ref<boolean>(false)

</script>

<style lang="scss" scoped>
strong {
  @apply w-full text-left whitespace-nowrap overflow-y-scroll;
}

span {
  min-width: 180px;
  max-width: 180px;
}

strong::-webkit-scrollbar {
  display: none;
}

strong {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.field-row {
  @apply flex flex-row gap-1 w-full border-b-2 border-dotted border-secondary-500;
}
</style>