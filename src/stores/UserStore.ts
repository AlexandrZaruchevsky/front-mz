import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { User, UserPage } from '@/model/User'
import UserService from '@/services/UserService';
import { Role } from '@/model/Role';
import router from '@/router';

export const useUserStore = defineStore('userStore', () => {
  const pageUser = ref<UserPage>(new UserPage());

  const isLoading = ref<Boolean>(false);
  const isError = ref<Boolean>(false);
  const errorMessage = ref<String>("");

  const user = ref<User>(new User());
  const isAdd = ref<Boolean>(false);

  const users = computed<Array<User>>(() => pageUser.value.content);

  async function fetchUsers() {
    isLoading.value = true;
    isError.value = false;
    errorMessage.value = "";
    await UserService.getUsers().then(response => {
      pageUser.value = response
      isLoading.value = false;
    }).catch(err => {
      console.log(err);
      isError.value = true;
      errorMessage.value = "Error fetch Users";
      isLoading.value = false;
    })
  }

  function setAdd(val: Boolean = true) {
    isAdd.value = val;
    if (isAdd.value) {
      user.value = new User();
    }
  }

  async function fetchUser(id: Number) {
    isLoading.value = true;
    isError.value = false;
    errorMessage.value = "";
    await UserService.fetchUser(id).then(response => {
      user.value = response
      isLoading.value = false;
    }).catch(err => {
      console.log(err);
      isError.value = true;
      errorMessage.value = "Error fetch Users";
      isLoading.value = false;
    })
  }

  async function saveUser() {
    let flag = false;
    if (
      user.value.username.trim().length === 0 ||
      user.value.roles.length === 0
    ) {
      console.log("Bad User params");
      return;
    }
    if (isAdd.value) {
      if (user.value.password.trim().length === 0) return;
      await UserService.addUser(user.value).then(response => {
        user.value = response
        flag = true;
      })
    } else {
      await UserService.updateUser(user.value).then(response => {
        user.value = response
        flag = true;
      })
    }
    if (flag) {
      await fetchUsers()
      router.push({ name: 'Users' })
    }
  }

  function addRoleLocal(role: Role = new Role()) {
    if (role.id < 1) {
      console.log(role);
    } else {
      const roles1 = user.value.roles.filter(r => r.id !== role.id)
      user.value.roles = [...roles1, role]
    }
  }

  function deleteRoleLocal(role: Role = new Role) {
    if (role.id < 1) {
      console.log(role);
    } else {
      user.value.roles = [...user.value.roles.filter(r => r.id !== role.id)]
    }
  }

  return {
    users,
    user,
    isAdd,
    isLoading,
    isError,
    errorMessage,
    setAdd,
    fetchUsers,
    fetchUser,
    addRoleLocal,
    deleteRoleLocal,
    saveUser
  }

})
