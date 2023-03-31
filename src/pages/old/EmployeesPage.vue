<template>
  <div class="relative flex h-full justify-center items-start">
    <card-z class="h-full w-full" header="Employees">
      <template #tool-buttons>
        <div class="flex gap-2 border-b shadow-md ">
          <div class="p-2 flex gap-2">
            <button-link class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white"
              to="/admin/employees/add" title="add" />
          </div>
          <div class="px-2 py-1 flex flex-row gap-2 items-center w-full">
            <select class="px-2 py-1 bg-white rounded border-2" v-model="pageRequest.sortBy" @change="changeSort">
              <option selected value="fio">Поиск по ФИО</option>
              <option selected value="kspd">Поиск по Телефону</option>
            </select>
            <input-default :inP="pageRequest.search" v-model="pageRequest.search" @keyup.enter="fetchBy" />
          </div>
        </div>
      </template>
      <template #body>
        <div class="p-2 flex flex-col gap-2">
          <empl-entity v-for="empl in empls" :key="empl.id" @click="gotoEmpl(empl.id)" :empl="empl" />
        </div>
      </template>
      <template #tool-pagination>
        <div class="p-2 border-t flex justify-between items-center">
          <select class="px-2 py-1 bg-white rounded border-2" v-model="pageRequest.pageSize" @change="changeAmountPage">
            <option selected value="10">10</option>
            <option selected value="20">20</option>
            <option selected value="50">50</option>
          </select>
          <div class="flex justify-center items-center gap-2">
            <button-z title="Previos" :disabled="page.first" @click="previos" />
            <button-z title="Next" :disabled="page.last" @click="next" />
          </div>
          <div class="px-8"></div>
        </div>
      </template>
      <template #footer>
        <div class="p-2 text-sm flex flex-row gap-2 border-t">
          <div class="border-r pr-2">Записей всего - {{ page.totalElements }}</div>
          <div class="border-r pr-2">Страница - {{ currentPage }} из {{ page.totalPages }}</div>
        </div>
      </template>
    </card-z>
    <router-view />
  </div>
</template>
    
<script setup lang="ts">

import { useEmployeeStore } from '@/stores/EmployeeStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

import EmplEntity from '@/components/entities/EmplEntity.vue';
import { computed } from 'vue';


const { empls, pageRequest, page } = storeToRefs(useEmployeeStore());
const { fetchEmployees } = useEmployeeStore();

const currentPage = computed(() => pageRequest.value.pageCurrent + 1)

fetchEmployees();

const changeSort = async () => {
  pageRequest.value.search = "";
  await fetchEmployees()
}

const fetchBy = async () => {
  pageRequest.value.pageCurrent = 0
  await fetchEmployees()
}

const changeAmountPage = async () => {
  pageRequest.value.pageCurrent = 0
  await fetchEmployees()
}

const gotoEmpl = (id: Number) => {
  router.push({ path: `/admin/employees/${id}` })
}

const next = async () => {
  pageRequest.value.pageCurrent += 1
  await fetchEmployees()
}

const previos = async () => {
  pageRequest.value.pageCurrent -= 1
  await fetchEmployees()
}

</script>

<style lang="scss"></style>