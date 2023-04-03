<template>
  <div class="relative flex h-full justify-center items-start bg-white rounded-r-lg">
    <card-z-v2 
      class="h-full w-full" 
      :cardData="cardData"
      navigation 
      searchable 
      editFloat 
      footer 
    >
      <template #body>
        <div class="p-2 flex flex-col gap-0.5">
          <div v-for="entity in entities" :key="entity.id"
          class="flex px-2 rounded hover:bg-slate-200 hover:cursor-pointer border-b-2 border-dotted"
          @click="$router.push({path:`/dictionaries/equip-types/${entity.id}`})"
          >{{ entity.name }}</div>
        </div>
      </template>
    </card-z-v2>
    <router-view />
  </div>
</template>
    
<script setup lang="ts">
import { useEquipTypeStore } from '@/stores/EquipTypeStore';
import { storeToRefs } from 'pinia';

const { cardData, entities } = storeToRefs(useEquipTypeStore());
const { fetchEntities } = useEquipTypeStore()

fetchEntities();

</script>
