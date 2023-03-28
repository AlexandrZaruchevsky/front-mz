<template>
  <overlay-z>
    <card-entity 
      :header="header" 
      class="w-1/2"
      editable 
      :cardFunc="cardFunction"
    >
      <template #body>
        <form @submit.prevent="saveEntity">
          <div class="flex flex-col gap-1">
            <div class="p-2 flex justify-between">
              <select class="py-1 px-2 bg-white rounded w-full border-b-2" v-model="entity.orgId">
                <option value="-1"></option>
                <option v-for="org in orgList" :value="org.id" :key="org.id">{{ org.shortName }}</option>
              </select>
            </div>
            <div class="p-2">
              <input-default class="p-2" :inP="entity.name" v-model="entity.name" />
            </div>
            <div class="p-2 flex gap-2 py-0.5">
              <label class="w-1/4">Top Level</label>
              <input type="checkbox" v-model="entity.topLevel" />
            </div>
            <div class="p-2 flex justify-between" v-if="!entity.topLevel">
              <select class="py-1 px-2 border-b-2 w-full bg-white rounded" v-model="entity.parentId">
                <option value="-1"></option>
                <option v-for="dep in depList" :value="dep.id" :key="dep.id">{{ dep.name }}</option>
              </select>
            </div>
          </div>
        </form>
      </template>
    </card-entity>
  </overlay-z>
</template>

<script setup lang="ts">

import router from '@/router';
import { useDepStore } from '@/stores/DepStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const { serviceRequest, entity, orgList, depList, cardFunction } = storeToRefs(useDepStore());
const { fetchEntity, fetchAllOrgs, setAdd, saveEntity } = useDepStore();

const header = computed(() => {
  return serviceRequest.value.isAdd() ? "Department | Add" : "Department | Update"
})

fetchAllOrgs();

const route = useRoute()

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