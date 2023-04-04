<template>
  <overlay-z>
    <card-entity header="Employee Detail" class="w-full lg:w-5/6 xl:w-8/12 2xl:w-1/2" :cardFunc="cardFunctionPhone">
      <template #body>
        <form>
          <div class="flex flex-col gap-2 p-4">
            <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Фамилия:</span>
                <input-default :inP="entity.lastName" v-model="entity.lastName" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Имя:</span>
                <input-default :inP="entity.firstName" v-model="entity.firstName" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Отчество:</span>
                <input-default :inP="entity.middleName" v-model="entity.middleName" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">email:</span>
                <input-default :inP="entity.email" v-model="entity.email" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Телефон:</span>
                <input-default :inP="entity.phone" v-model="entity.phone" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">КСПД:</span>
                <input-default :inP="entity.kspd" v-model="entity.kspd" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Acoount name:</span>
                <input-default :inP="entity.accountName" v-model="entity.accountName" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Principal name:</span>
                <input-default :inP="entity.principalName" v-model="entity.principalName" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">WorkStation:</span>
                <input-default :inP="entity.wsName" v-model="entity.wsName" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Description:</span>
                <input-default :inP="entity.description" v-model="entity.description" readonly />
              </div>
              <div class="flex flex-row gap-2 items-center pb-0.5 border-b-2 border-dotted">
                <span class="w-1/5" style="min-width: 150px;">Организация:</span>
                <select
                  class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60"
                  v-model="orgId" disabled>
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
                  v-model="entity.pofId" disabled>
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
                  v-model="entity.depId" disabled>
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
                  v-model="entity.posId" disabled>
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
  </overlay-z>
</template>
  
<script setup lang="ts">

import router from '@/router';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useEmplStore } from '@/stores/EmplStore';

const { entity, orgId, orgList, depList, popList, posList, cardFunctionPhone } = storeToRefs(useEmplStore());
const { fetchEntity, fetchAllOrgs } = useEmplStore();

fetchAllOrgs();

const route = useRoute();
const paramId = route.params.id as string;

if (!parseInt(paramId)) {
  router.push({ name: "Phone" })
}
else {
  fetchEntity(parseInt(paramId))
}

</script>