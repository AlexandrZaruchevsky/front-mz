<template>
  <div class="relative flex h-full justify-center items-start">
    <card-default header="Positions" class="w-full h-full">
      <template v-slot:body>
        <div class=" mb-2 flex gap-2">
          <button-link class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white"
            to="/admin/employees/add" title="add" />
        </div>
        <div
          class="flex flex-row gap-2 hover:cursor-pointer bg-slate-800 bg-opacity-0 hover:bg-opacity-10"
          v-for="empl in empls"
          :key="empl.id"
          @click="gotoEmpl(empl.id)"
        >
          <div class="px-2 py-1">{{ empl.lastName }}</div>
          <div class="px-2 py-1">{{ empl.firstName }}</div>
          <div class="px-2 py-1">{{ empl.middleName }}</div>
          <div class="px-2 py-1">{{ empl.email }}</div>
          <div class="px-2 py-1">{{ empl.depName }}</div>
          <div class="px-2 py-1">{{ empl.pofName }}</div>
          <div class="px-2 py-1">{{ empl.posName }}</div>
        </div>
        <!-- <div v-for="position in positions" :key="position.id" class="flex flex-col gap-2">
          <div class="flex gap-2 border-b hover:cursor-pointer bg-slate-800 bg-opacity-0 hover:bg-opacity-10"
            @click="gotoOrg(position.id)">
            <div class="w-3/6 px-2 py-1 whitespace-nowrap overflow-hidden">
              {{ position.name }}
            </div>
            <div class="w-3/6 px-2 py-1 whitespace-nowrap overflow-hidden">
              {{ position.orgName }}
            </div>
          </div>
        </div> -->
      </template>
    </card-default>
    <router-view />
  </div>
</template>
    
<script setup lang="ts">

import { useEmployeeStore } from '@/stores/EmployeeStore';
import { storeToRefs } from 'pinia';
import router from '@/router';


const { empls } = storeToRefs(useEmployeeStore());
const { fetchEmployees } = useEmployeeStore();

fetchEmployees();

// import { usePositionStore } from '@/stores/PostionStore';
// import { storeToRefs } from 'pinia';

// const { positions } = storeToRefs(usePositionStore());
// const { fetchPositions } = usePositionStore();

// fetchPositions();

const gotoEmpl = (id: Number) => {
  router.push({ path: `/admin/employees/${id}` })
}

</script>