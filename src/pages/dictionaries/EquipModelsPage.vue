<template>
  <div class="relative flex flex-col h-full justify-center items-start bg-white rounded-r-lg">
    <card-z-v2 
      class="h-full w-full" 
      :cardData="cardData"
      navigation 
      searchable 
      editable 
      footer 
    >
      <template #tool-additional>
        <div class="p-2">
          <select class="py-1 px-2 bg-white rounded w-full border-b-2" v-model="pageRequest.parentId">
            <option value="-1">Все типы оборудования</option>
            <option 
              v-for="opt in equipTypeList" 
              :key="opt.id" 
              :value="opt.id"
            >
              {{ opt.name }}
            </option>
          </select>
        </div>
      </template>
      <template #body>
        <div class="p-2 flex flex-col gap-0.5">
          <div v-for="entity in entities" :key="entity.id"
          class="flex px-2 rounded hover:bg-slate-200 hover:cursor-pointer border-b-2 border-dotted"
          @click="$router.push({path:`/dictionaries/equip-models/${entity.id}`})"
        >
          <div class="w-1/2">{{ entity.name }}</div>
          <div class="w-1/2">{{ entity.equipTypeName }}</div>
        </div>
        </div>
      </template>
    </card-z-v2>
    <router-view />
  </div>
</template>
    
<script setup lang="ts">
import { useEquipModelStore } from '@/stores/EquipModelStore';
import { storeToRefs } from 'pinia';

const { cardData, entities, equipTypeList, pageRequest } = storeToRefs(useEquipModelStore());
const { fetchEntities } = useEquipModelStore()

fetchEntities();

</script>