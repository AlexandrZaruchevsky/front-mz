<template>
  <div class="relative flex h-full justify-center items-start">
    <card-default header="Positions" class="w-full h-full">
      <template v-slot:body>
        <div class=" mb-2 flex gap-2">
          <button-link class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white"
            to="/admin/positions/add" title="add" />
        </div>
        <div 
          v-for="position in positions" :key="position.id" class="flex flex-col gap-2"
        >
          <div class="flex gap-2 border-b hover:cursor-pointer bg-slate-800 bg-opacity-0 hover:bg-opacity-10"
            @click="gotoOrg(position.id)">
            <div class="w-3/6 px-2 py-1 whitespace-nowrap overflow-hidden">
              {{ position.name }}
            </div>
            <div class="w-3/6 px-2 py-1 whitespace-nowrap overflow-hidden">
              {{ position.orgName }}
            </div>
          </div>
        </div>
      </template>
    </card-default>
    <router-view />
  </div>
</template>
  
<script setup lang="ts">

import router from '@/router';
import { usePositionStore } from '@/stores/old/PostionStore';
import { storeToRefs } from 'pinia';

const { positions } = storeToRefs(usePositionStore());
const { fetchPositions } = usePositionStore();

fetchPositions();

const gotoOrg = (id: Number) => {
  router.push({ path: `/admin/positions/${id}` })
}

</script>