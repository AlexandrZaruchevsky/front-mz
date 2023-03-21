<template>
  <div class="relative flex justify-center">
    <card-default header="Roles" class="w-1/3">
      <template v-slot:body>
        <div>
          <div  class="mb-2 pb-2 border-b flex gap-2">
            <button-link 
              class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white" 
              title="add"
            />
          </div>
          <div class="flex flex-col gap-2">
            <div v-for="role in roles"
              class="bg-teal-800 bg-opacity-10 px-2 py-1.5 hover:bg-opacity-70 hover:text-white hover:cursor-pointer flex justify-between items-center">
              <span>
                {{ role.name }}
              </span>
              <button-z title="Delete" />
            </div>
          </div>
        </div>
      </template>
    </card-default>
  </div>
</template>

<script setup lang="ts">

import { useRoleStore } from '@/stores/RoleStore';
import { storeToRefs } from 'pinia';

const { roles } = storeToRefs(useRoleStore());

const { fetchRoles } = useRoleStore();

fetchRoles();

</script>