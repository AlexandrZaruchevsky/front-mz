<template>
  <div class="relative flex h-full justify-center items-start">
    <card-default header="Points of presence" class="w-full h-full">
      <template v-slot:body>
        <div class=" mb-2 flex gap-2">
          <button-link class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white"
            to="/admin/point-of-presences/add" title="add" />
        </div>
        <div>
          <div 
            v-for="pOF in pOFs" :key="pOF.id"
            class="flex gap-2 hover:cursor-pointer bg-slate-800 bg-opacity-0 hover:bg-opacity-10"
            @click="gotoEntity(pOF.id)"
          >
            <div class="w-1/2 whitespace-nowrap px-2 py-1">{{ pOF.shortName }}</div>
            <div class="w-1/2 whitespace-nowrap px-2 py-1">{{ pOF.orgName }}</div>
          </div>
        </div>
      </template>
    </card-default>
    <router-view />
  </div>
</template>

<script setup lang="ts">

import { usePOFStore } from '@/stores/POFStore';
import { storeToRefs } from 'pinia';
import router from '@/router';

const { pOFs } = storeToRefs(usePOFStore());
const { fetchPOFs } = usePOFStore();

fetchPOFs();

const gotoEntity = (id: Number) => {
  router.push({ path: `/admin/point-of-presences/${id}` })
}

</script>