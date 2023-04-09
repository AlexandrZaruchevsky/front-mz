<template>
  <div class="dashboard">
    <div class="dashboard-header">
      Dashboard Guest
    </div>
    <div class="dashboard-body">
      <card-z-v2 class="h-full w-full border" header="Employees" :cardData="cardData" navigation searchable footer
        :chSort="false">
        <template #body>
          <div class="p-2 flex flex-col gap-0.5">
            <empl-entity v-for="empl in employees" :key="empl.id" :empl="empl" />
          </div>
        </template>
      </card-z-v2>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import EmplEntity from '@/components/entities/EmplEntity.vue';
import { useGuestEmployeeStore } from '@/stores/guest/GuestEmployeeStore';
const { cardData, employees } = storeToRefs(useGuestEmployeeStore());
const { fetchEntities } = useGuestEmployeeStore()
fetchEntities();
</script>
<style lang="scss">
.dashboard {
  @apply h-full;
}

.dashboard-header {
  @apply p-2 text-2xl font-bold border-b-2 border-primary-600;
}

.dashboard-body {
  height: calc(100vh - 132px);
  @apply p-2;
}
</style>