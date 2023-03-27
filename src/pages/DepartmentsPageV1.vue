<template>
  <div class="relative flex h-full justify-center items-start">
    <card-z class="h-full w-full" header="Departments">
      <template #tool-buttons>
        <div class="flex p-2 gap-2 border-b shadow-md items-end ">
          <div class="flex gap-2">
            <button-link class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white"
              to="/admin/departments/add" title="add" />
          </div>
          <div class="w-full">
            <input-default class="w-full" />
          </div>
        </div>
      </template>
      <template #body>
        <div class="p-2">
          <div v-for="department in deps" :key="department.id" class="flex flex-col gap-2">
            <div class="flex gap-2 border-b hover:cursor-pointer bg-slate-800 bg-opacity-0 hover:bg-opacity-10"
              @click="gotoOrg(department.id)">
              <div class="w-3/6 px-2 py-1 whitespace-nowrap overflow-hidden">
                {{ department.name }}
              </div>
              <div class="w-2/6 px-2 py-1 whitespace-nowrap overflow-hidden">
                {{ department.orgName }}
              </div>
              <div class="w-1/6  px-2 py-1 text-center">
                {{ department.topLevel ? "Top" : "Ne top" }}
              </div>
            </div>
          </div>
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

import router from '@/router';
import { useDepartmentStore } from '@/stores/DepartmentStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { deps, page, pageRequest } = storeToRefs(useDepartmentStore());

const { fetchDepartments } = useDepartmentStore();

const currentPage = computed(() => pageRequest.value.pageCurrent + 1)

fetchDepartments();

const gotoOrg = (id: Number) => {
  router.push({ path: `/admin/departments/${id}` })
}

const changeAmountPage = async () => {
  pageRequest.value.pageCurrent = 0
  await fetchDepartments()
}

const next = async () => {
  pageRequest.value.pageCurrent += 1
  await fetchDepartments()
}

const previos = async () => {
  pageRequest.value.pageCurrent -= 1
  await fetchDepartments()
}


</script>