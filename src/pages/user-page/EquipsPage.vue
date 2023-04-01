<template>
  <div class="relative flex h-full justify-center items-start">
    <card-z-v2 class="h-full w-full" header="Equips" :cardData="cardData" navigation searchable footer editable >
      <template #tool-buttons>
        <div class="">
          <div class="flex flex-row gap-2">
            <select style="max-width: 180px; min-width: 180px;" class="border-slate-500 border-2 px-2 py-1 rounded bg-white" v-model="pageRequest.equipTypeId">
              <option value="-1">All types</option>
              <option v-for="opt in equipTypeList" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
            </select>
            <select style="max-width: 180px; min-width: 180px;" class="border-slate-500 border-2 px-2 py-1 rounded bg-white" v-model="pageRequest.equipModelId">
              <option value="-1">All models</option>
              <option v-for="opt in equipModelList" :key="opt.id" :value="opt.id">{{ opt.name }}</option>
            </select>
          </div>
        </div>
      </template>
      <template #body>
        <div class="p-2 flex flex-col gap-1">
          <div 
            v-for="entity in entities" 
            :key="entity.id" 
            class="flex flex-row border-b-2 border-dotted hover:cursor-pointer hover:bg-slate-200 rounded items-center"
            @click="$router.push({path:`/equips/${entity.id}`})"
          >
            <div class="px-2 py-1 w-3/6 whitespace-nowrap overflow-hidden">
              {{ entity.shortName }}
            </div>
            <div class="px-2 py-1 whitespace-nowrap overflow-hidden w-1/6 text-center">
              {{ entity.inventoryNumber }}
            </div>
            <div class="px-2 py-1 whitespace-nowrap overflow-hidden w-1/6 text-center">
              {{ entity.serialNumber }}
            </div>
            <div class="px-2 py-1 whitespace-nowrap overflow-hidden w-1/6 text-center">
              {{ entity.equipTypeName }}
            </div>
          </div>
        </div>
      </template>
    </card-z-v2>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useEquipStore } from '@/stores/EquipStore';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
const { cardData, entities, equipTypeList, equipModelList, pageRequest } = storeToRefs(useEquipStore());
const { fetchEntities, fetchEquipParents } = useEquipStore()

onMounted(async () => {
  await fetchEntities();
  await fetchEquipParents();
});

</script>