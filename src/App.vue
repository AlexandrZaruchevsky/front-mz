<template>
  <div>
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import AdminLayout from "./layouts/AdminLayout.vue";

export default {
  components: {
    DefaultLayout,
    AuthLayout,
    AdminLayout
  },
  setup() {
    const layout = computed(() => {
      return useRoute().meta.layout;
    });
    // const router = useRouter();
    
    const store = useAuthStore();

    onMounted( async ()=>{
      await store.init();
      // store.login({
      //   username:"admin",
      //   password:"12345678"
      // })
    })

    return {
      layout,
    };
  },
};
</script>

<!-- <script setup lang="ts">
import { computed } from '@vue/runtime-core';
import { RouterView, useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue';

const layout = computed(() => {
  return useRoute().meta.layout
})
</script> -->

<style scoped></style>
