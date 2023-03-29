<template>
  <div>
    <div>
      Main page
    </div>
    <div v-for="item in menu" :key="item.id">
      {{ item.title }} -==- {{ item.active }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMenuStore } from '@/stores/MenuStore';
import { storeToRefs } from 'pinia';

const { menu } = storeToRefs(useMenuStore());

</script>