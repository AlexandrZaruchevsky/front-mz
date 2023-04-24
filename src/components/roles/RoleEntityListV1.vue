<template>
  <!-- <div class="flex flex-col gap-0.5"> -->
  <div
    class="list-row">
    <!-- class="cursor-pointer flex flex-row items-center gap-2 p-1 border-b border-dotted border-secondary-500 px-2 hover:bg-secondary-100"> -->
    <!-- v-for="role of roles" :key="role.id" @click="$router.push({ path: `/v1/security/roles/${role.id}` })"> -->
    <div class="list-cell w-1/6">{{ role.id }}</div>
    <div class="list-cell w-2/6">{{ role.name }}</div>
    <div class="list-cell w-3/6 flex flex-row gap-2 flex-wrap items-center">
      <template v-if="role.permissions?.length > 0">
        <div v-for="permission of role.permissions" :key="permission"
          class="flex flex-row flex-nowrap gap-2 border border-secondary-500 rounded px-2 py-1">
          <span>
            {{ permission }}
          </span>
          <IconTrash size="sm" @click.stop="$emit('deletePermission', role.id, permission)" />
        </div>
      </template>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { Role } from '@/model/Role';
import type { PropType } from 'vue';

export default {
  name: "RoleEntityListV1",
  props: {
    role: {
      type: Object as PropType<Role>,
      required: false,
      default: () => new Role()
    }
  }
}

</script>