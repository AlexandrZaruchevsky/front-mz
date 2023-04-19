<template>
  <div class="h-full p-2 relative">
    <card-z-v3 class="h-full border" navigation editFloat searchable :cardData="cardDataV1">
      <template #body>
        <template v-if="!isLoading">
          <div class="flex flex-col p-2 w-full gap-1">
            <UserEntityList 
              v-for="user of users" 
              :key="user.id" 
              :user="user" 
              class="" 
              @click="$router.push({path:`/v1/security/users/${user.id}`})"
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
import { storeToRefs } from 'pinia';
import { useUserStoreV1 } from '@/stores/UserStoreV1';
import { onMounted, ref } from 'vue';
import UserEntityList from './UserEntityList.vue';

const { cardDataV1, users } = storeToRefs(useUserStoreV1());
const { fetchUsers } = useUserStoreV1();

const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  await fetchUsers()
    .then(() => isLoading.value = false)
    .catch(() => isLoading.value = false)
})

</script>