<template>
  <overlay-z>
    <card-entity class="w-1/2" :cardFunc="cardFunction" :header="header" editable>
      <template #body>
        <form @submit.prevent="saveEntity">
          <div class="flex flex-col gap-2 p-2">
            <div class="py-1 border-b-2 border-dotted flex flex-row gap-2 items-baseline">
              <span class="w-1/4" style="min-width: 188px;">Организация:</span>
              <select
                class="py-1 px-2 bg-white rounded w-full border-b-2 focus:outline-none border-teal-800 border-opacity-20 focus:border-opacity-60 hover:cursor-pointer"
                v-model="entity.orgId">
                <option value="-1"></option>
                <option v-for="org in orgList" :value="org.id" :key="org.id">
                  {{ org.shortName }}
                </option>
              </select>
            </div>
            <div class="py-1 border-b-2 border-dotted flex flex-row gap-2 items-baseline">
              <span class="w-1/4" style="min-width: 188px;">Наименование(краткое):</span>
              <input-default :inP="entity.shortName" v-model="entity.shortName" />
            </div>
            <div class="py-1 border-b-2 border-dotted flex flex-row gap-2 items-baseline">
              <span class="w-1/4" style="min-width: 188px;">Наименование(полное):</span>
              <input-default :inP="entity.fullName" v-model="entity.fullName" />
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

import { usePopStore } from '@/stores/POPStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const { entity, orgList, cardFunction, serviceRequest } = storeToRefs(usePopStore())
const { fetchAllOrgs, fetchEntity, setAdd, saveEntity } = usePopStore();

fetchAllOrgs();

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
  fetchEntity(parseInt(paramId));
}


</script>