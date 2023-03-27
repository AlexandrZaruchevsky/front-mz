<template>
  <div class="relative flex h-full justify-center items-start">
    <card-z-v2 class="w-full h-full" :cardData="cardData" header="Organizations" navigation searchable editable footer>
      <template #body>
        <div class="p-2 flex flex-col gap-0.5">
          <org-entity
            v-for="org in entities" :key="org.id"
            :org="org"
            @click="$router.push(`/admin/organizations/${org.id}`)"
          />
        </div>
      </template>
    </card-z-v2>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useOrgStore } from '@/stores/OrgStore';
import { storeToRefs } from 'pinia';

import OrgEntity from '@/components/entities/OrgEntity.vue'

const { cardData, entities } = storeToRefs(useOrgStore());
const { fetchEntities } = useOrgStore();

fetchEntities();

</script>