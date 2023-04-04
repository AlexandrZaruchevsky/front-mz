<template>
  <div class="h-full text-primary-900">
    <component :is="layout">
      <RouterView />
    </component>
  </div>
</template>

<script lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "./stores/AuthStore";

import DefaultLayout from "./layouts/DefaultLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";
import AdminLayout from "./layouts/AdminLayout.vue";
import LayoutZ from "./layouts/LayoutZ.vue";

export default {
  components: {
    DefaultLayout,
    AuthLayout,
    AdminLayout,
    LayoutZ
  },
  setup() {
    const layout = computed(() => {
      return useRoute().meta.layout || "default-layout";
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
