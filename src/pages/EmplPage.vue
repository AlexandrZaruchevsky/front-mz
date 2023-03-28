<template>
  <overlay-z>
    <card-entity :header="header" class="w-1/2" editable :cardFunc="cardFunction">
      <template #body>
        <form>
          <div class="flex flex-col gap-2 p-2">
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Фамилия:</span>
                <input-default :inP="entity.lastName" v-model="entity.lastName" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Имя:</span>
                <input-default :inP="entity.firstName" v-model="entity.firstName" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Отчество:</span>
                <input-default :inP="entity.middleName" v-model="entity.middleName" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">email:</span>
                <input-default :inP="entity.email" v-model="entity.email" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Телефон:</span>
                <input-default :inP="entity.phone" v-model="entity.phone" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">КСПД:</span>
                <input-default :inP="entity.kspd" v-model="entity.kspd" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Acoount name:</span>
                <input-default :inP="entity.accountName" v-model="entity.accountName" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Principal name:</span>
                <input-default :inP="entity.principalName" v-model="entity.principalName" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">WorkStation:</span>
                <input-default :inP="entity.wsName" v-model="entity.wsName" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Description:</span>
                <input-default :inP="entity.description" v-model="entity.description" />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Организация:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="orgId"
                  >
                  <option value="-1"></option>
                  <option v-for="org in orgList" :value="org.id" :key="org.id">
                    {{ org.shortName }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Точка присутствия:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="entity.pofId">
                  <option value="-1"></option>
                  <option v-for="pof in popList" :value="pof.id" :key="pof.id">
                    {{ pof.shortName }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Отдел:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="entity.depId">
                  <option value="-1"></option>
                  <option v-for="dep in depList" :value="dep.id" :key="dep.id">
                    {{ dep.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Должность:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="entity.posId">
                  <option value="-1"></option>
                  <option v-for="position in posList" :value="position.id" :key="position.id">
                    {{ position.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </template>
    </card-entity>
    <!-- <card-default :header="header" class="border w-1/2">
      <template v-slot:body>
        <form @submit.prevent="saveEmployee">
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
                <span class="w-1/3">Acoount name:</span>
                <input-default :inP="empl.accountName" v-model="empl.accountName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Principal name:</span>
                <input-default :inP="empl.principalName" v-model="empl.principalName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">WorkStation:</span>
                <input-default :inP="empl.wsName" v-model="empl.wsName" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Description:</span>
                <input-default :inP="empl.description" v-model="empl.description" />
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Организация:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="orgId">
                  <option value="-1"></option>
                  <option v-for="org in orgs" :value="org.id" :key="org.id">
                    {{ org.shortName }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Точка присутствия:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="empl.pofId">
                  <option value="-1"></option>
                  <option v-for="pof in pofs" :value="pof.id" :key="pof.id">
                    {{ pof.shortName }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Отдел:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="empl.depId">
                  <option value="-1"></option>
                  <option v-for="dep in deps" :value="dep.id" :key="dep.id">
                    {{ dep.name }}
                  </option>
                </select>
              </div>
              <div class="flex flex-row gap-2 items-center">
                <span class="w-1/3">Должность:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="empl.posId">
                  <option value="-1"></option>
                  <option v-for="position in positions" :value="position.id" :key="position.id">
                    {{ position.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="buttons flex justify-between mt-4">
              <div class="flex flex-row gap-2">
                <button-z title="Save" />
                <button-z title="Delete" @click="deleteEmployee(empl.id)" />
              </div>
              <button-link to="/admin/employees" title="Cancel" />
            </div>
          </div>
        </form>
      </template>
    </card-default> -->
  </overlay-z>
</template>
  
<script setup lang="ts">

import router from '@/router';
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useEmplStore } from '@/stores/EmplStore';

const { serviceRequest, entity, orgId, orgList, depList, popList, posList, cardFunction } = storeToRefs(useEmplStore());
const { fetchEntity, fetchAllOrgs, setAdd, saveEntity } = useEmplStore();

const header = computed(() => {
  return serviceRequest.value.isAdd() ? "Employee | Add" : "Employee | Update"
})

fetchAllOrgs();

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
  fetchEntity(parseInt(paramId))
}

</script>