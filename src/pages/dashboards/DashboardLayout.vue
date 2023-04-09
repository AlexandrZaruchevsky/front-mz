<template>
  <div class="bg-white h-full rounded lg shadow-xl">
    <template v-if="!isAuth">
      <DashboardGuest />
    </template>
    <template v-else>
      Dashboard for authorize user
    </template>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import DashboardGuest from './DashboardGuest.vue';
import { useAuthStore } from '@/stores/AuthStore';

const { isAuth } = storeToRefs(useAuthStore());
</script>