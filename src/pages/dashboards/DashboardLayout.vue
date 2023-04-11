<template>
  <div class="bg-white h-full rounded lg shadow-xl">
    <template v-if="!isAuth">
      <DashboardGuest />
    </template>
    <template v-else>
      <template v-if="true">
        <DashboardAdmin />
      </template>
      <template v-else>
        <div>
          Dashboard for authorize user
        </div>
      </template>
    </template>
  </div>
</template>
<script setup lang="ts">
import DashboardGuest from './DashboardGuest.vue';
import DashboardAdmin from './DashboardAdmin.vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/AuthStore';

const { isAuth } = storeToRefs(useAuthStore());
</script>