<template>
  <overlay-z-v1>
    <card-entity-v1 class="card-shadow" style="min-width: 400px;" :cardFunc="cardFunction">
      <template #body>
        <div class="flex flex-col">
          <UserEntity v-model="user" :editable="true" :update="!isAdd" />
          <div class="flex flex-col mt-4 gap-1">
            <div class="border-b-2 border-secondary-400 border-dotted text-center font-bold">Roles</div>
            <div class="flex flex-row justify-between items-center py-1 border-b">
              <select class="border px-2 py-0.5 bg-secondary-50 border-primary-800 rounded" v-model="currentRole">
                <option v-for="role of roles" :key="role.id" :value="role">{{ role.name }}</option>
              </select>
              <div class="mr-2 rounded hover:shadow hover:shadow-secondary-500 p-0.5 cursor-pointer" @click="addRole(currentRole)">
                <IconShopBagAdd size="sm" />
              </div>
            </div>
            <div v-if="user.roles.length > 0"
              class="flex flex-col shadow-inner shadow-secondary-400 p-1 py-2 gap-1 h-full overflow-auto"
              style="max-height: 100px;">
              <div v-for="role of user.roles" :key="role.id"
                class="flex flex-row justify-between items-center p-1 rounded hover:bg-secondary-200 border-b border-dotted border-secondary-500">
                <span>{{ role.name }}</span>
                <IconTrash size="sm" @click="deleteRole(role)"/>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
      </template>
    </card-entity-v1>
  </overlay-z-v1>
</template>
<script setup lang="ts">
import UserEntity from './UserEntity.vue';
import { storeToRefs } from 'pinia';
import { useUserStoreV1 } from '@/stores/v1/UserStoreV1';
import { onMounted, onUpdated, ref } from 'vue';
import { Role } from '@/model/Role';

const currentRole = ref<Role>(new Role());

const { user } = storeToRefs(useUserStoreV1());

const { cardFunction, isAdd, roles } = storeToRefs(useUserStoreV1())
const { initForm, addRole, deleteRole } = useUserStoreV1();

onMounted(async () => {
  await initForm();
})

onUpdated(async ()=>{
  await initForm();
})

</script>