<template>
  <div class="relative flex h-full">
    <card-default header="Users" footer="footer-card" class="w-full">
      <template v-slot:body>
        <div class="flex flex-col">
          <div class=" mb-2 flex gap-2">
            <button-link 
              class="px-2 py-1 rounded bg-teal-800 bg-opacity-30 hover:bg-opacity-90 hover:text-white" 
              to="/admin/users/add"
              title="add"
            />
          </div>
          <div class="flex flex-col w-full">
            <div 
              v-for="user in users"
              :key="user.id"
              class="row flex w-full hover:bg-teal-900 border-b hover:bg-opacity-20 hover:cursor-pointer"
              @click="gotoUser(user.id)"
            >
              <div class="w-1/12 px-2 py-1 text-center">{{ user.id }}</div>
              <div class="w-2/12 px-2 py-1 text-center">{{ user.username }}</div>
              <div class="w-2/12 px-2 py-1 text-center">{{ user.lastName }}</div>
              <div class="w-2/12 px-2 py-1 text-center">{{ user.firstName }}</div>
              <div class="w-2/12 px-2 py-1 text-center">{{ user.middleName }}</div>
              <div class="w-3/12 px-2 py-1 text-center">{{ user.email }}</div>
            </div>
          </div>
        </div>
      </template>
    </card-default>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import router from "@/router";

const userStore = useUserStore();
const { users } = storeToRefs(userStore);
const { fetchUsers } = userStore;

const gotoUser = (id:Number)=>{
  router.push({path:`/admin/users/${id}`})
}

onMounted(() => {
  fetchUsers();
})

</script>