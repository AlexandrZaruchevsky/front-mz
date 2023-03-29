<template>
  <div class="p-2 flex justify-between items-center">
    <div class="flex items-baseline">
      <div class="mr-4 text-2xl font-semibold">
        <router-link to="/">
          {{ appName }}
        </router-link>
      </div>
      <div class="app-menu flex flex-row gap-2">
        <router-link v-for="item in mainMenu" :to="item.link" :key="item.id" class="pr-2 border-r">
          {{item.title}}
        </router-link>
      </div>
    </div>
    <div v-if="isAuth" @click="logout">
      {{ shortFIO }}
    </div>
    <div v-else>
      <router-link to="/auth/login">Sign In</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '@/stores/AuthStore';
import { useMenuStore } from '@/stores/MenuStore';
import { storeToRefs } from 'pinia';
export default {
  name: "AppBar",
  setup() {
    const appName = import.meta.env.VITE_APP_NAME;
    const store = useAuthStore();
    const { isAuth, shortFIO } = storeToRefs(store);
    const { logout } = store
    const { mainMenu } = storeToRefs(useMenuStore());
    return {
      appName,
      isAuth,
      shortFIO,
      mainMenu,
      logout
    }
  }
}
</script>