<template>
  <div class="h-full p-2 relative">
    <card-z-v3 class="h-full border" navigation editFloat searchable :cardData="cardData">
      <template #body>
        <template v-if="!isLoading">
          <div class="p-2">
            <div class="flex flex-col gap-0.5">
              <RoleEntityListV1 
                v-for="role of roles" 
                :key="role.id" 
                :role="role"
                @click="$router.push({ path: `/v1/security/roles/${role.id}` })"
                @deletePermission="deletePermissionFromRole" 
              />
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
import { useRoleStoreV1 } from '@/stores/RoleStoreV1';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import RoleEntityListV1 from './RoleEntityListV1.vue';

const { cardData, roles } = storeToRefs(useRoleStoreV1());
const { fetchRoles, deletePermissionFromRole } = useRoleStoreV1();

const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  await fetchRoles()
    .then(() => isLoading.value = false)
    .catch(() => isLoading.value = false)
})

</script>