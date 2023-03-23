<template>
  <div class="relative flex h-full justify-center items-start">
    <card-default header="Employees" class="w-full h-full">
      <template v-slot:body>
        <div class="h-full flex flex-col">
          <div class="text-xl font-semibold">Employees</div>
          <div>
            <div class="p-2 flex gap-2">
              <button-link class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white"
                to="/admin/employees/add" title="add" />
            </div>
            <div class="p-2 flex flex-row gap-2 items-center">
              <select 
                class="px-2 py-1 bg-white rounded border-2"
                v-model="pageRequest.pageSize"
                @change="fetchEmployees"
              >
                <option selected value="10">10</option>
                <option selected value="20">20</option>
                <option selected value="50">50</option>
              </select>
              <select 
                class="px-2 py-1 bg-white rounded border-2"
                v-model="pageRequest.sortBy"
                @change="changeSort"
              >
                <option selected value="fio">Поиск по ФИО</option>
                <option selected value="kspd">Поиск по Телефону</option>
              </select>
              <input-default :inP="pageRequest.search" v-model="pageRequest.search" @keyup.enter="fetchEmployees"/>
            </div>
          </div>
          <div class="relative p-2 gap-4 lg:gap-0 flex flex-col border scroll-auto overflow-x-auto">
            <empl-entity 
              v-for="empl in empls"
              :key="empl.id"
              @click="gotoEmpl(empl.id)"
              :empl="empl" 
            />
          </div>
        </div>
      </template>
    </card-default>
    <router-view />
  </div>
</template>
    
<script setup lang="ts">

import { useEmployeeStore } from '@/stores/EmployeeStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

import EmplEntity from '@/components/entities/EmplEntity.vue';


const { empls, pageRequest } = storeToRefs(useEmployeeStore());
const { fetchEmployees } = useEmployeeStore();

fetchEmployees();

const changeSort = async ()=>{
  pageRequest.value.search="";
  await fetchEmployees()
}

const gotoEmpl = (id: Number) => {
  router.push({ path: `/admin/employees/${id}` })
}

</script>

<style lang="scss">
.empl-list{
  // height: 100vh ;
  // @apply border;
}
</style>