<template>
  <div class="p-2 flex justify-between items-center">
    <div class="flex items-baseline">
      <div class="mr-4 text-2xl font-semibold">
        <router-link to="/">
          {{ appName }}
        </router-link>
      </div>
      <div class="app-menu">
        <router-link to="/admin">
          Users
        </router-link>
      </div>
    </div>
    <div v-if="isAuth" @click="logout">
      {{shortFIO}}
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { storeToRefs } from 'pinia';
export default {
  name: "AppBar",
  setup() {
    const appName = import.meta.env.VITE_APP_NAME;
    const store = useAuthStore();
    const {isAuth, shortFIO} = storeToRefs(store);
    const {logout} = store
    return {
      appName,
      isAuth,
      shortFIO,
      logout
    }
  }
}
</script>