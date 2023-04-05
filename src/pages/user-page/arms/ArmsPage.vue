<template>
  <div class="relative flex h-full justify-center items-start">
    <card-z-v2 class="h-full w-full" header="Arms" :cardData="cardData" navigation searchable footer editFloat >
      <template #body>
        <div class="p-2 flex flex-col gap-1">
          <div 
            v-for="entity in entities" 
            :key="entity.id" 
            class="flex flex-row border-b-2 border-dotted hover:cursor-pointer hover:bg-slate-200 rounded items-center"
            @click="$router.push({path:`/arms/${entity.id}`})"
          >
            <div class="px-2 py-1 w-1/3 whitespace-nowrap overflow-hidden">
              {{ entity.name }}
            </div>
            <div class="px-2 py-1 whitespace-nowrap overflow-hidden w-1/3">
              {{ entity.molFio }}
            </div>
            <div class="px-2 py-1 whitespace-nowrap overflow-hidden w-1/3">
              {{ entity.popName }}
            </div>
          </div>
        </div>
      </template>
    </card-z-v2>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useArmStore } from '@/stores/ArmStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const { cardData, entities } = storeToRefs(useArmStore());
const { fetchEntities  } = useArmStore()

onMounted(async () => {
  await fetchEntities();
});

</script>