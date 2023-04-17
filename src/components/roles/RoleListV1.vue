<template>
  <div class="h-full p-2 relative">
    <card-z-v3 class="h-full border" navigation editFloat searchable :cardData="cardData">
      <template #body>
        <div class="flex flex-col gap-1">
          <div class="flex flex-row items-center gap-2 pb-1 border-b border-dotted border-secondary-500 px-2" v-for="role of roles" :key="role.id">
            <div class="w-1/3">{{ role.id }}</div>
            <div class="w-1/3">{{ role.name }}</div>
            <div class="w-1/3 flex flex-row gap-2 flex-wrap">
              <template v-if="role.permissions?.length > 0">
                <span v-for="permission of role.permissions" :key="permission" class="border rounded px-2 py-1">{{ permission }}</span>
              </template>
            </div>
          </div>
        </div>
      </template>
    </card-z-v3>
  </div>
</template>
<script setup lang="ts">
import { useRoleStoreV1 } from '@/stores/RoleStoreV1';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';


const { cardData, roles } = storeToRefs(useRoleStoreV1());
const { fetchRoles } = useRoleStoreV1();

const isLoading = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  await fetchRoles()
    .then(() => isLoading.value = false)
    .catch(() => isLoading.value = false)
})

</script>