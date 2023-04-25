<template>
  <div class="h-full p-2 relative">
    <card-z-v3 class="h-full" navigation editFloat searchable :cardData="cardDataV1">
      <template #body>
        <template v-if="!isLoading">
          <div class="p-2">
            <div class="flex flex-col gap-0.5">
              <ArmEntityListV1 v-for="arm of arms" :key="arm.id" :arm="arm" @onClick="gotoArmEdit" />
            </div>
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
import { useArmStoreV1 } from '@/stores/v1/ArmStoreV1';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import ArmEntityListV1 from './ArmEntityListV1.vue'
import router from '@/router';

const { arms, cardDataV1 } = storeToRefs(useArmStoreV1());
const { fetchArms } = useArmStoreV1();

const isLoading = ref<boolean>(false);

const gotoArmEdit = (id: number = -1) => {
  if (id > 0) {
    router.push({ path: `/v1/arms/${id}` });
  }
}

onMounted(async () => {
  isLoading.value = true;
  await fetchArms().then(() => {
    isLoading.value = false;
  });
})


</script>