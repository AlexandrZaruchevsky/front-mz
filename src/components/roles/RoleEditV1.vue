<template>
  <overlay-z-v1>
    <card-entity-v1 style="min-width: 400px;" :cardFunc="cardFunction">
      <template #body>
        <div>
          <div class="flex flex-row gap-2 items-center border-b border-dotted border-secondary-500 py-0.5">
            <span class="whitespace-nowrap">Имя роли:</span>
            <input-field v-model="role.name" v-focus />
          </div>
          <div class="mt-2">
            <div class="text-center px-0.5 border-b-2 border-dotted border-secondary-500">Permissions</div>
            <div class="flex flex-row justify-between items-center py-1 border-b">
              <select class="border px-2 py-0.5 bg-secondary-50 border-primary-800 rounded" v-model="currentPermission">
                <option v-for="permission of permissions" :key="permission" :value="permission">{{ permission }}</option>
              </select>
              <div class="mr-2 rounded hover:shadow hover:shadow-secondary-500 p-0.5 cursor-pointer"
                @click="addPermission(currentPermission)">
                <IconShopBagAdd size="sm" />
              </div>
            </div>
            <div v-if="role.permissions.length > 0"
              class="flex flex-col shadow-inner shadow-secondary-400 p-1 py-2 gap-1 h-full overflow-auto"
              style="max-height: 100px;">
              <div v-for="permission of role.permissions.sort()" :key="permission"
                class="flex flex-row justify-between items-center p-1 rounded hover:bg-secondary-200 border-b border-dotted border-secondary-500">
                <span>{{ permission }}</span>
                <IconTrash size="sm" @click="deletePermission(permission)"/>
              </div>
            </div>
          </div>
        </div>
      </template>
    </card-entity-v1>
  </overlay-z-v1>
</template>

<script setup lang="ts">
import { useRoleStoreV1 } from '@/stores/RoleStoreV1';
import { storeToRefs } from 'pinia';
import { onMounted, onUpdated, ref } from 'vue';


const { role, cardFunction, permissions } = storeToRefs(useRoleStoreV1());
const { initForm, addPermission, deletePermission } = useRoleStoreV1();

const currentPermission = ref<string>("")


onMounted(async () => {
  await initForm();
})

onUpdated(async () => {
  await initForm();
})

</script>