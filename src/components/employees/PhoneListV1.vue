<template>
  <div class="h-full p-2 relative">
    <card-z-v3 class="h-full shadow shadow-secondary-800" navigation searchable :chSort="false" :cardData="cardDataV1">
      <template #body>
        <template v-if="!isLoading">
          <div class="flex flex-col p-2 w-full gap-1">
            <EmplEntityListV1 
              v-for="employee of employees"
              :key="employee.id"
              :employee="employee"
            />
          </div>
        </template>
        <template v-else>
          <div class="h-full flex items-center justify-center">
            <icon-spiner-refresh />
          </div>
        </template>
      </template>
    </card-z-v3>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { useGuestEmployeeStore } from '@/stores/guest/GuestEmployeeStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import EmplEntityListV1 from './EmplEntityListV1.vue';

const { cardDataV1, employees } = storeToRefs(useGuestEmployeeStore())

const { fetchEntities } = useGuestEmployeeStore();

fetchEntities()

const isLoading = ref<boolean>(false);

</script>