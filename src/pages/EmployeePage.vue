<template>
  <overlay-z>
    <card-default :header="header" class="border">
      <template v-slot:body>
        <form @submit.prevent="">
          <div class="flex flex-col gap-2">
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Фамилия:</span>
                <input-default :inP="empl.lastName" v-model="empl.lastName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Имя:</span>
                <input-default :inP="empl.firstName" v-model="empl.firstName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Отчество:</span>
                <input-default :inP="empl.middleName" v-model="empl.middleName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">email:</span>
                <input-default :inP="empl.email" v-model="empl.email" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Телефон:</span>
                <input-default :inP="empl.phone" v-model="empl.phone" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">КСПД:</span>
                <input-default :inP="empl.kspd" v-model="empl.kspd" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Организация:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="orgId">
                  <option value="-1"></option>
                  <option v-for="org in orgs" :value="org.id">
                    {{ org.shortName }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Отдел:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="empl.depId">
                  <option value="-1"></option>
                  <option v-for="dep in deps" :value="dep.id">
                    {{ dep.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Отдел:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="empl.posId">
                  <option value="-1"></option>
                  <option v-for="position in positions" :value="position.id">
                    {{ position.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="buttons flex justify-between mt-4">
              <div class="flex flex-row gap-2">
                <button-z title="Save" />
                <button-z title="Delete" @submit.stop="" />
              </div>
              <button-link to="/admin/employees" title="Cancel" />
            </div>
          </div>
        </form>
      </template>
    </card-default>
  </overlay-z>
</template>
  
<script setup lang="ts">

import router from '@/router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useEmployeeStore } from '@/stores/EmployeeStore';

const header = computed(() => {
  return serviceRequest.value.isAdd() ? "Employee | Add" : "Employee | Update"
})

// const orgId = ref<number>(-1);

const { empl, serviceRequest, orgs, orgId, deps, positions } = storeToRefs(useEmployeeStore());
const { fetchEmployee, setAdd, fetchOrgs, fetchDepsByOrgId, fetchPositionsByOrgId } = useEmployeeStore();

fetchOrgs();

watch(orgId, ()=>{
  fetchDepsByOrgId(orgId.value)  
  fetchPositionsByOrgId(orgId.value)
})

const route = useRoute();
const paramId = route.params.id as string;

if (!parseInt(paramId)) {
  if (paramId === "add") {
    setAdd();
  } else {
    setAdd(false);
    router.push({ name: "Employees" })
  }
}
else {
  setAdd(false);
  fetchEmployee(parseInt(paramId))
  // fetchPosition(parseInt(paramId));
}

</script>