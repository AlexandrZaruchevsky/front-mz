<template>
  <div class="absolute w-full z-10 h-full rounded bg-white bg-opacity-40">
    <div class="relative flex justify-center pt-4">
      <card-default header="User page" class="w-1/4 border">
        <template v-slot:body>
          <div>
            <div class="flex flex-col gap-2">
              <input-with-label label="username:" :inP="user.username" v-model="user.username" />
              <input-with-label v-if="isAdd" type="password" label="password:" :inP="user.password"
                v-model="user.password" />
              <input-with-label label="Фамилия:" :inP="user.lastName" v-model="user.lastName" />
              <input-with-label label="Имя:" :inP="user.firstName" v-model="user.firstName" />
              <input-with-label label="Отчетсво:" :inP="user.middleName" v-model="user.middleName" />
              <input-with-label label="email:" :inP="user.email" v-model="user.email" />
              <div class="bg-teal-800 bg-opacity-10 rounded">
                <div class="border-b p-2 border-teal-800 font-bold">Roles</div>
                <div class="p-2 flex justify-between">
                  <select class="py-1 px-2 bg-white rounded" v-model="roleId">
                    <option value="-1"></option>
                    <option v-for="role in roles" :value="role.id" :key="role.id">{{ role.name }}</option>
                  </select>
                  <button-z title="Add Role" @click="addRoleLocal(currentRole)" />
                  <!-- <button-z title="Add Role" @click="addRole" /> -->
                </div>
                <div class="flex flex-col gap-2 p-4">
                  <div v-for="role in userRoles" :key="role.id" class="flex justify-between">
                    <span class="underline underline-offset-4">
                      {{ role.name }}
                    </span>
                    <button-z title="delete" @click="deleteRoleLocal(role)" />
                  </div>
                </div>
              </div>
            </div>
            <div class="buttons mt-4 flex justify-between">
              <button-z title="Save" @click="saveUser" />
              <button-link to="/admin/users" title="Cancel" />
            </div>
          </div>
        </template>
      </card-default>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/UserStore';
import { useRoleStore } from '@/stores/RoleStore';
import { storeToRefs } from 'pinia';
import router from '@/router';
import { ref, watch, computed } from 'vue';
import { Role } from '@/model/Role';

const route = useRoute();

const { user, isAdd } = storeToRefs(useUserStore());
const { fetchUser, setAdd, addRoleLocal, deleteRoleLocal, saveUser } = useUserStore();

const userRoles = computed<Array<Role>>(() => {
  return [...user.value.roles
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1
      } else if (a.name < b.name) return -1
      return 0
    })]
}
)

const { roles } = storeToRefs(useRoleStore());
const { fetchRoles } = useRoleStore();

const roleId = ref<Number>(-1)
const currentRole = ref<Role>(new Role());

fetchRoles();

const paramId = route.params.id as string;

if (!parseInt(paramId)) {
  if (paramId === "add") {
    setAdd();
  } else {
    router.push({ name: "Users" })
  }
}
else {
  setAdd(false);
  fetchUser(parseInt(paramId));
}

// const addRole = () => {
//   addRoleLocal(currentRole.value);
// }

watch(roleId, () => {
  currentRole.value = roles.value.filter(r => r.id === roleId.value)[0];
})

</script>