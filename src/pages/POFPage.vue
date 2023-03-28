<template>
  <overlay-z>
    <card-default :header="header" class="border w-1/2">
      <template v-slot:body>
        <form @submit.prevent="savePOF">
          <div class="flex flex-col gap-2">
            <div class="p-2 flex flex-col gap-2">
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Головная организация:</span>
                <select 
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="pOF.orgId"
                >
                  <option value="-1"></option>
                  <option 
                    v-for="org in orgs"
                    :key="org.id"
                    :value="org.id"
                  >
                    {{ org.shortName }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Наименование(краткое):</span>
                <input-default :inP="pOF.shortName" v-model="pOF.shortName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Наименование(полное):</span>
                <input-default :inP="pOF.fullName" v-model="pOF.fullName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Руководитель:</span>
                <select 
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="pOF.bossId"
                >
                  <option value="-1"></option>
                </select>
              </div>
            </div>
            <div class="mt-2 flex flex-col border rounded">
              <header class="font-semibold text-center shadow bg-slate-100">Адрес</header>
              <div class="flex flex-col gap-2 p-2">
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Индекс:</span>
                  <input-default :inP="pOF.postcode" v-model="pOF.postcode" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Регион:</span>
                  <input-default :inP="pOF.region" v-model="pOF.region" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Район:</span>
                  <input-default :inP="pOF.district" v-model="pOF.district" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Город:</span>
                  <input-default :inP="pOF.city" v-model="pOF.city" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Населённый пункт:</span>
                  <input-default :inP="pOF.village" v-model="pOF.village" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Улица:</span>
                  <input-default :inP="pOF.street" v-model="pOF.street" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Дом:</span>
                  <input-default :inP="pOF.house" v-model="pOF.house" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Корпус:</span>
                  <input-default :inP="pOF.corpus" v-model="pOF.corpus" />
                </div>
                <div class="flex flex-row gap-2 items-center">
                  <span class="w-1/3">Квратира:</span>
                  <input-default :inP="pOF.apartment" v-model="pOF.apartment" />
                </div>
              </div>
            </div>
          </div>
          <div class="buttons flex justify-between mt-4">
            <button-z title="Save" />
            <button-link to="/admin/point-of-presences" title="Cancel" />
          </div>
        </form>
      </template>
    </card-default>
  </overlay-z>
</template>

<script setup lang="ts">

import router from '@/router';
import { useRoute } from 'vue-router';

import { usePOFStore } from '@/stores/POFStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { pOF, orgs, serviceRequest } = storeToRefs(usePOFStore());
const { setAdd, fetchPOF, fetchOrgs, savePOF} = usePOFStore()

fetchOrgs();

const header = computed(() => {
  return serviceRequest.value.isAdd() ? "Point of presence | Add" : "Point of presence | Update"
})

const route = useRoute();
const paramId = route.params.id as string;

if (!parseInt(paramId)) {
  if (paramId === "add") {
    setAdd();
  } else {
    setAdd(false);
    router.push({ name: "Users" })
  }
}
else {
  setAdd(false);
  fetchPOF(parseInt(paramId));
}



// import { useDepartmentStore } from '@/stores/DepartmentStore'
// import { storeToRefs } from 'pinia';
// import { computed, watch } from 'vue';

// const header = computed(() => {
//   return serviceRequest.value.isAdd() ? "Point of presence | Add" : "Department | Update"
// })


// const { orgs, dep, depList, serviceRequest } = storeToRefs(useDepartmentStore())
// const { fetchDepartment, fetchOrganizations, depsClear, fetchDeps, setAdd, saveDepartment } = useDepartmentStore();

// const isTopLevel = computed(() => dep.value.topLevel)


</script>