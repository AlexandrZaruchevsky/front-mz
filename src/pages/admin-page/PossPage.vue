<template>
  <div class="relative flex h-full justify-center items-start">
    <card-z-v2 class="w-full h-full" :cardData="cardData" header="Positions" navigation searchable editFloat footer>
      <template #body>
        <div class="p-2 flex flex-col gap-0.5">
          <div v-for="dep in entities" :key="dep.id"
            class="flex px-2 rounded hover:bg-slate-200 hover:cursor-pointer border-b-2 border-dotted"
            @click="$router.push(`/admin/positions/${dep.id}`)">
            <div class="py-1 w-1/2 whitespace-nowrap">{{ dep.name }}</div>
            <div class="py-1 w-1/2 whitespace-nowrap">{{ dep.orgName }}</div>
          </div>
        </div>
      </template>
    </card-z-v2>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { usePosStore } from '@/stores/PosStore';
import { storeToRefs } from 'pinia';

const { cardData, entities } = storeToRefs(usePosStore());
const { fetchEntities } = usePosStore();

fetchEntities()

</script>