<template>
  <div class="relative flex h-full justify-center items-start">
    <card-z-v2 
      class="h-full w-full" 
      header="Employees" 
      :cardData="cardData"
      navigation 
      searchable 
      editFloat 
      footer 
    >
      <template #body>
        <div class="p-2 flex flex-col gap-0.5">
          <empl-entity 
            v-for="empl in entities" 
            :key="empl.id" 
            @click="$router.push(`/admin/employees/${empl.id}`)" 
            :empl="empl" 
          />
        </div>
      </template>
    </card-z-v2>
    <router-view />
  </div>
</template>
    
<script setup lang="ts">

import { useEmplStore } from '@/stores/EmplStore';
import { storeToRefs } from 'pinia';
import EmplEntity from '@/components/entities/EmplEntity.vue';

const { cardData, entities } = storeToRefs(useEmplStore());
const { fetchEntities } = useEmplStore()

fetchEntities();

</script>
