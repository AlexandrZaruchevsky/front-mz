<template>
  <div class="relative flex h-full justify-center items-start">
    <card-default header="Departments" class="w-full h-full">
      <template v-slot:body>
        <div class=" mb-2 flex gap-2">
          <button-link class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white"
            to="/admin/departments/add" title="add" />
        </div>
        <div 
          v-for="department in deps" 
          :key="department.id"
          class="flex flex-col gap-2"
        >
          <div 
            class="flex gap-2 border-b hover:cursor-pointer bg-slate-800 bg-opacity-0 hover:bg-opacity-10"
            @click="gotoOrg(department.id)"
          >
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
        <!---                <div class="flex flex-col">
          <div></div>
          <div 
            v-for="org in orgs" 
            class="flex flex-row items-center border-b hover:cursor-pointer bg-teal-800 bg-opacity-0 hover:bg-opacity-10"
            @click="gotoOrg(org.id)"
          >
            <div class="px-4 py-1">{{ org.id }}</div>
            <div class="px-4 py-1 whitespace-nowrap">{{ org.shortName }}</div>
            <div class="px-4 py-1 w-full">{{ org.fullName }}</div>
            <div class="px-4 py-1">{{ org.inn }}</div>
            <div class="px-4 py-1">{{ org.kpp }}</div>
          </div>
        </div> -->
      </template>
    </card-default>
    <router-view />
  </div>
</template>

<script setup lang="ts">

import router from '@/router';
import { useDepartmentStore } from '@/stores/DepartmentStore';
import { storeToRefs } from 'pinia';

const { deps } = storeToRefs(useDepartmentStore());

const { fetchDepartments } = useDepartmentStore();

fetchDepartments();

const gotoOrg = (id: Number) => {
  router.push({ path: `/admin/departments/${id}` })
}

</script>